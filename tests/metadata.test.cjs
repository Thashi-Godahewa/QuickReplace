const assert = require('node:assert/strict')
const fs = require('node:fs')
const Module = require('node:module')
const path = require('node:path')
const test = require('node:test')
const esbuild = require('esbuild')

const projectRoot = path.resolve(__dirname, '..')
const testOrigin = 'https://seo-validation.example'

// Compile the same source CRA uses, with isolated build-time settings. Nothing
// is written to disk and the real project environment/data remain untouched.
function compile(options = {}, entry = {}) {
  const siteUrl = Object.prototype.hasOwnProperty.call(options, 'siteUrl') ? options.siteUrl : testOrigin
  const result = esbuild.buildSync({
    absWorkingDir: projectRoot,
    entryPoints: ['src/seo/metadata.js'],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    define: {
      'process.env.REACT_APP_SITE_URL': siteUrl === undefined ? 'undefined' : JSON.stringify(siteUrl),
      'process.env.REACT_APP_SEO_NOINDEX': JSON.stringify(options.noindex || 'false'),
    },
    ...entry,
  })
  const filename = path.join(projectRoot, 'tests', 'metadata-in-memory.cjs')
  const compiled = new Module(filename, module)
  compiled.filename = filename
  compiled.paths = Module._nodeModulePaths(projectRoot)
  compiled._compile(result.outputFiles[0].text, filename)
  return compiled.exports
}

function readStructuredData(head) {
  const scripts = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  return scripts.map((match) => JSON.parse(match[1]))
}

test('all 29 public pages have distinct search text, canonical URLs and usable share images', () => {
  const seo = compile()
  const routes = seo.getPublicRoutes()
  assert.equal(routes.length, 29)
  assert.equal(new Set(routes).size, 29)
  assert.equal(routes.filter((route) => route.startsWith('/services/')).length, 21)

  const titles = new Set()
  const descriptions = new Set()
  for (const route of routes) {
    const page = seo.getPageSeo(route)
    const head = seo.renderSeoHead(page)
    assert.equal(page.isNotFound, false, route)
    assert.doesNotMatch(page.robots, /noindex/, route)
    assert.equal(page.canonical, `${testOrigin}${route}`)
    assert.ok(page.title.endsWith(' | Quick Replace'), route)
    assert.ok(page.description.length > 50, route)
    titles.add(page.title)
    descriptions.add(page.description)

    assert.equal((head.match(/<title\b/g) || []).length, 1, route)
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1, route)
    assert.match(head, /property="og:url"/, route)
    assert.match(head, /name="twitter:card" content="summary_large_image"/, route)
    assert.ok(page.image.alt, route)
    const imageUrl = new URL(page.image.url)
    assert.equal(imageUrl.origin, testOrigin)
    assert.ok(fs.existsSync(path.join(projectRoot, 'public', imageUrl.pathname)), `${route}: share image exists`)
    assert.equal(readStructuredData(head).length, 1, route)
  }
  assert.equal(titles.size, 29)
  assert.equal(descriptions.size, 29)
})

test('service schema identifies the real business and a Home > Services > Plumbing breadcrumb', () => {
  const seo = compile()
  const [schema] = readStructuredData(seo.renderSeoHead(seo.getPageSeo('/services/plumbing')))
  assert.equal(schema['@context'], 'https://schema.org')
  const graph = schema['@graph']
  const organization = graph.find((node) => node['@type'] === 'Organization')
  assert.equal(organization.name, 'Quick Replace')
  assert.equal(organization.legalName, 'Quick Replace Pty Ltd')
  assert.equal(organization.telephone, '0401 411 636')
  assert.equal(organization.email, 'info@quickreplace.com.au')
  assert.equal(organization.url, `${testOrigin}/`)
  // This legal name is already displayed in the source, not an invented claim.
  assert.match(fs.readFileSync(path.join(projectRoot, 'src/components/Footer.jsx'), 'utf8'), /Quick Replace Pty Ltd/)

  const service = graph.find((node) => node['@type'] === 'Service')
  assert.equal(service.serviceType, 'Plumbing')
  assert.equal(service.provider['@id'], organization['@id'])
  assert.equal(service.areaServed.name, 'Melbourne')
  assert.equal(service.url, `${testOrigin}/services/plumbing`)
  const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList')
  assert.deepEqual(breadcrumb.itemListElement.map(({ position, name, item }) => ({ position, name, item })), [
    { position: 1, name: 'Home', item: `${testOrigin}/` },
    { position: 2, name: 'Services', item: `${testOrigin}/services` },
    { position: 3, name: 'Plumbing', item: `${testOrigin}/services/plumbing` },
  ])
  assert.doesNotMatch(JSON.stringify(schema), /"(?:aggregateRating|review|address|geo|openingHours|priceRange)":/)

  const [home] = readStructuredData(seo.renderSeoHead(seo.getPageSeo('/')))
  assert.ok(home['@graph'].some((node) => node['@type'] === 'WebSite'))
  assert.ok(!home['@graph'].some((node) => node['@type'] === 'Service'))
  assert.ok(!home['@graph'].some((node) => node['@type'] === 'BreadcrumbList'))
})

test('ordinary pages receive their own two-level breadcrumbs', () => {
  const seo = compile()
  const [schema] = readStructuredData(seo.renderSeoHead(seo.getPageSeo('/contact')))
  const breadcrumb = schema['@graph'].find((node) => node['@type'] === 'BreadcrumbList')
  assert.deepEqual(breadcrumb.itemListElement.map((node) => node.name), ['Home', 'Contact Us'])
  assert.equal(breadcrumb.itemListElement[1].item, `${testOrigin}/contact`)
})

test('tracking parameters, fragments and trailing slashes share the clean canonical URL', () => {
  const seo = compile({ siteUrl: ` ${testOrigin}/ ` })
  const expected = `${testOrigin}/services/plumbing`
  assert.equal(seo.getPageSeo('/services/plumbing/?campaign=mail#repairs').canonical, expected)
  assert.equal(seo.getPageSeo('/services/plumbing').canonical, expected)
  assert.equal(seo.getPageSeo('/?campaign=mail').canonical, `${testOrigin}/`)
})

test('missing origin and explicit preview mode prevent indexing and production URL tags', () => {
  const configurations = [
    { siteUrl: undefined },
    { siteUrl: '' },
    { siteUrl: testOrigin, noindex: 'true' },
    { siteUrl: testOrigin, noindex: ' TRUE ' },
  ]
  for (const configuration of configurations) {
    const seo = compile(configuration)
    const page = seo.getPageSeo('/services/plumbing')
    const head = seo.renderSeoHead(page)
    assert.match(page.robots, /\bnoindex\b/)
    assert.equal(page.isNotFound, false)
    assert.equal(page.canonical, null)
    assert.equal(page.structuredData, null)
    assert.doesNotMatch(head, /rel="canonical"|application\/ld\+json|property="og:|name="twitter:/)
    assert.ok(!head.includes(testOrigin))
    assert.match(head, /Plumbing Repairs Melbourne/)
  }
})

test('unknown URLs describe a missing page and omit canonical, social and structured data', () => {
  const seo = compile()
  for (const route of ['/missing-page', '/services/not-a-service', '/services/toString', '/services/__proto__', '/ABOUT']) {
    const page = seo.getPageSeo(route)
    const head = seo.renderSeoHead(page)
    assert.equal(page.isNotFound, true, route)
    assert.equal(page.title, 'Page Not Found | Quick Replace', route)
    assert.match(page.robots, /\bnoindex\b/, route)
    assert.equal(page.canonical, null, route)
    assert.equal(page.structuredData, null, route)
    assert.doesNotMatch(head, /rel="canonical"|application\/ld\+json|property="og:|name="twitter:/, route)
  }
})

test('configured site URLs must be HTTP(S) origins without credentials or extra URL components', () => {
  const invalidOrigins = [
    'example.com',
    'javascript:alert(1)',
    'ftp://example.com',
    'https://example.com/path',
    'https://user:password@example.com',
    'https://example.com?campaign=x',
    'https://example.com?',
    'https://example.com#section',
    'https://example.com#',
    'https://example.com/.',
    'https://example.com\\',
  ]
  for (const siteUrl of invalidOrigins) {
    assert.throws(() => compile({ siteUrl }), /REACT_APP_SITE_URL/, siteUrl)
  }
  assert.equal(compile({ siteUrl: 'http://localhost:3000/' }).SEO_CONFIG.siteUrl, 'http://localhost:3000')
})

test('stored page text cannot break HTML attributes, title tags or JSON-LD script boundaries', async () => {
  const text = `Repair </title></script><script>alert("unexpected")</script><img src=x onerror='unexpected'> & details`
  // Load a private copy of the real service data, change its content, then
  // initialize SEO. This simulates unsafe stored text without editing files.
  const fixture = compile({}, {
    entryPoints: [],
    stdin: {
      sourcefile: 'seo-content-fixture.js',
      resolveDir: projectRoot,
      contents: `
        import { serviceDetails } from './src/data/serviceDetails'
        serviceDetails.plumbing.pageTitle = ${JSON.stringify(text)}
        serviceDetails.plumbing.title = ${JSON.stringify(text)}
        serviceDetails.plumbing.hero.description = ${JSON.stringify(text)}
        serviceDetails.plumbing.hero.imageAlt = ${JSON.stringify(text)}
        export const seo = import('./src/seo/metadata')
      `,
    },
  })
  const seo = await fixture.seo
  const head = seo.renderSeoHead(seo.getPageSeo('/services/plumbing'))
  assert.equal((head.match(/<script\b/g) || []).length, 1)
  assert.equal((head.match(/<\/script>/g) || []).length, 1)
  assert.equal((head.match(/<title\b/g) || []).length, 1)
  assert.equal((head.match(/<\/title>/g) || []).length, 1)
  assert.doesNotMatch(head, /<img\b/)
  assert.match(head, /&quot;unexpected&quot;/)
  assert.match(head, /&#39;unexpected&#39;/)
  assert.match(head, /&amp; details/)
  const [schema] = readStructuredData(head)
  assert.equal(schema['@graph'].find((node) => node['@type'] === 'Service').name, text)
})
