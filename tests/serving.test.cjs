const assert = require('node:assert/strict')
const { after, before, test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const express = require('express')
const { spawnSync } = require('node:child_process')
const { attachSite } = require('../server/site')

const buildDir = path.resolve(__dirname, '../build')
const manifestFile = path.join(buildDir, 'seo-routes.json')
if (!fs.existsSync(manifestFile)) throw new Error('Run npm run build before npm run test:seo.')
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'))
const assetManifest = JSON.parse(fs.readFileSync(path.join(buildDir, 'asset-manifest.json'), 'utf8'))

let server
let baseUrl
before(async () => {
  const app = express()
  attachSite(app, { buildDir })
  server = await new Promise((resolve, reject) => {
    const instance = app.listen(0, '127.0.0.1', (error) => error ? reject(error) : resolve(instance))
    instance.once('error', reject)
  })
  baseUrl = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  if (!server) return
  server.closeAllConnections()
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

const get = (route) => fetch(`${baseUrl}${route}`, { redirect: 'manual' })
const unescapeXml = (value) => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const getCanonical = (html) => html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]

test('every public URL returns its own complete HTML, with one H1, title and description', async () => {
  assert.ok(manifest.routes.length >= 29)
  const titles = new Set()
  for (const route of manifest.routes) {
    const response = await get(route)
    assert.equal(response.status, 200, route)
    assert.match(response.headers.get('content-type'), /text\/html/, route)
    const html = await response.text()
    assert.ok(html.includes(`data-prerendered-path="${route}"`), `${route} has its own prerendered document`)
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route} has one main heading`)
    assert.equal((html.match(/<title\b/gi) || []).length, 1, `${route} has one title`)
    assert.equal((html.match(/<meta\b[^>]*name="description"/gi) || []).length, 1, `${route} has one description`)
    const title = html.match(/<title\b[^>]*>([^<]+)<\/title>/i)[1]
    assert.ok(!titles.has(title), `${route} has a unique title`)
    titles.add(title)
    assert.match(html, /<main>[\s\S]*<h1\b/, `${route} has content without JavaScript`)

    if (manifest.noindex) {
      assert.match(html, /name="robots"[^>]*content="noindex, follow"/)
      assert.match(response.headers.get('x-robots-tag'), /noindex/)
      assert.equal(getCanonical(html), undefined)
    } else {
      assert.equal(unescapeXml(getCanonical(html)), `${manifest.siteUrl}${route}`)
      assert.doesNotMatch(html, /name="robots"[^>]*content="noindex/)
      const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
      assert.equal(jsonLd.length, 1)
      assert.equal(JSON.parse(jsonLd[0][1])['@context'], 'https://schema.org')
    }
  }
})

test('sitemap and robots describe only this build\'s indexable public URLs', async () => {
  const sitemapResponse = await get('/sitemap.xml')
  assert.equal(sitemapResponse.status, 200)
  assert.match(sitemapResponse.headers.get('content-type'), /xml/)
  const sitemap = await sitemapResponse.text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => unescapeXml(match[1]))
  const expected = manifest.noindex ? [] : manifest.routes.map((route) => `${manifest.siteUrl}${route}`)
  assert.deepEqual(urls, expected)
  assert.ok(!sitemap.includes('<lastmod>'), 'does not invent modification dates')
  const robotsResponse = await get('/robots.txt')
  assert.equal(robotsResponse.status, 200)
  const robots = await robotsResponse.text()
  assert.match(robots, /Allow: \/\n/)
  assert.match(robots, /Disallow: \/api\//)
  if (manifest.noindex) assert.doesNotMatch(robots, /Sitemap:/)
  else assert.ok(robots.includes(`Sitemap: ${manifest.siteUrl}/sitemap.xml`))
})

test('known URL aliases redirect permanently and preserve query parameters', async () => {
  const aliases = [
    ['/index.html', '/'],
    ['/services/', '/services'],
    ['/services/index.html', '/services'],
    ['/Services/Plumbing/?utm_source=test', '/services/plumbing?utm_source=test'],
  ]
  for (const [requested, expected] of aliases) {
    const response = await get(requested)
    assert.equal(response.status, 301, requested)
    assert.equal(response.headers.get('location'), expected, requested)
  }
})

test('missing pages, missing services and direct 404 documents return real noindex 404s', async () => {
  for (const route of ['/not-a-page', '/services/not-a-service', '/services/toString', '/services/__proto__', '/404.html']) {
    const response = await get(route)
    assert.equal(response.status, 404, route)
    assert.match(response.headers.get('x-robots-tag'), /noindex/, route)
    const html = await response.text()
    assert.match(html, /Page not found/i, route)
    assert.equal(getCanonical(html), undefined, route)
  }
})

test('API errors remain JSON and do not fall back to a website page', async () => {
  const response = await get('/api/not-a-route')
  assert.equal(response.status, 404)
  assert.match(response.headers.get('content-type'), /application\/json/)
  assert.match(response.headers.get('x-robots-tag'), /noindex/)
  const data = await response.json()
  assert.ok(data.error)
})

test('hashed application assets load with their correct type and immutable caching', async () => {
  for (const [key, expectedType] of [['main.js', /javascript/], ['main.css', /css/]]) {
    const asset = assetManifest.files[key]
    assert.ok(asset, `${key} was built`)
    const assetPath = new URL(asset, 'http://build.invalid').pathname
    const response = await get(assetPath)
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), expectedType)
    assert.match(response.headers.get('cache-control'), /immutable/)
    await response.arrayBuffer()
  }
})

test('the document root cannot expose project files or traverse outside the build', async () => {
  for (const route of ['/.env', '/../package.json', '/..%2fpackage.json', '/server/index.js']) {
    const response = await get(route)
    assert.equal(response.status, 404, route)
    assert.ok(!(await response.text()).includes('SMTP_PASS='), route)
  }
})

test('public internal links resolve to an existing page or built asset', () => {
  const routes = new Set(manifest.routes)
  for (const route of routes) {
    const htmlFile = route === '/' ? path.join(buildDir, 'index.html') : path.join(buildDir, route.slice(1), 'index.html')
    const html = fs.readFileSync(htmlFile, 'utf8')
    for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
      const href = unescapeXml(match[1])
      if (!href.startsWith('/') || href.startsWith('//')) continue
      const pathname = new URL(href, 'http://build.invalid').pathname
      assert.ok(routes.has(pathname) || fs.existsSync(path.join(buildDir, pathname.slice(1))), `${route} links to ${href}`)
    }
  }
})

test('combined hosting keeps the enquiry API available and reports startup failures correctly', async () => {
  const testSettings = {
    SMTP_USER: 'seo-test@example.invalid',
    SMTP_PASS: 'not-a-real-password',
    ENQUIRY_TO: 'seo-test@example.invalid',
    SERVE_FRONTEND: 'true',
  }
  const previous = Object.fromEntries(Object.keys(testSettings).map((key) => [key, process.env[key]]))
  Object.assign(process.env, testSettings)
  let combined
  let transport
  try {
    const { app, transporter } = require('../server/index')
    transport = transporter
    combined = await new Promise((resolve, reject) => {
      const instance = app.listen(0, '127.0.0.1', (error) => error ? reject(error) : resolve(instance))
      instance.once('error', reject)
    })
    const origin = `http://127.0.0.1:${combined.address().port}`
    const health = await fetch(`${origin}/api/health`)
    assert.equal(health.status, 200)
    assert.deepEqual(await health.json(), { ok: true })
    assert.match(health.headers.get('x-robots-tag'), /noindex/)
    const page = await fetch(`${origin}/services/plumbing`)
    assert.equal(page.status, 200)
    assert.match(await page.text(), /Plumbing/)
    const api404 = await fetch(`${origin}/api/not-a-route`)
    assert.equal(api404.status, 404)
    assert.match(api404.headers.get('content-type'), /application\/json/)
    await api404.json()

    // A conflicting port must not print a successful startup or exit with 0.
    // The blocker listens on all interfaces, like server/index.js does. A port held
    // only on 127.0.0.1 does not block a wildcard bind on Windows.
    const blocker = await new Promise((resolve, reject) => {
      const instance = require('node:net').createServer().listen(0, () => resolve(instance))
      instance.once('error', reject)
    })
    let child
    try {
      child = spawnSync(process.execPath, ['server/index.js'], {
        cwd: path.resolve(__dirname, '..'),
        env: { ...process.env, ...testSettings, ENQUIRY_PORT: String(blocker.address().port) },
        encoding: 'utf8',
        timeout: 10000,
      })
    } finally {
      await new Promise((resolve) => blocker.close(resolve))
    }
    assert.equal(child.status, 1, child.stderr)
    assert.match(child.stderr, /Unable to listen:/)
    assert.doesNotMatch(child.stdout, /Listening on/)
    // Only GET requests were issued. No enquiry was submitted and no email sent.
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    if (combined) {
      combined.closeAllConnections()
      await new Promise((resolve) => combined.close(resolve))
    }
    if (transport) transport.close()
  }
})
