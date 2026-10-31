// Backlog acceptance tests: one or more checks per product backlog item that
// the existing suites did not fully cover (P000469SE Final Product Backlog).
// Same set-up as e2e-browser.test.cjs: production build + API in one Express
// app, sendMail stubbed, outside sites blocked.
// Run: node --test --test-concurrency=1 tests/qa/e2e-backlog.test.cjs
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { after, before, test } = require('node:test')
const { chromium } = require('playwright')

process.env.SMTP_USER = 'sender@example.com'
process.env.SMTP_PASS = 'test-only'
process.env.ENQUIRY_TO = 'inbox@example.com'
process.env.SERVE_FRONTEND = 'true'
const { app, transporter } = require('../../server/index.js')

const evidence = path.resolve(__dirname, '../../../evidence')
const buildImages = path.resolve(__dirname, '../../build/images')
let server, base, browser
before(async () => {
  transporter.sendMail = async () => ({})
  server = await new Promise((r) => { const s = app.listen(0, '127.0.0.1', () => r(s)) })
  base = `http://127.0.0.1:${server.address().port}`
  browser = await chromium.launch()
})
after(async () => { await browser.close(); server.closeAllConnections(); server.close() })

async function open(route, { width = 1280, height = 900 } = {}) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort())
  await page.goto(base + route, { waitUntil: 'load' })
  return { page, context }
}
const PAGES = ['/', '/services', '/services/plumbing', '/our-work', '/about', '/clients', '/contact', '/privacy-policy', '/terms-and-conditions']
const SIX = ['Plumbing', 'Electrical', 'Glazing', 'Locksmith', 'Painting & Plastering', 'Make Safe']

test('BL-01 (PB-09) home page shows exactly the six client-confirmed services, each linking to its own page', async () => {
  const { page, context } = await open('/')
  const section = page.locator('#services')
  const titles = (await section.locator('h3').allInnerTexts()).map((t) => t.trim())
  assert.deepEqual([...titles].sort(), [...SIX].sort())
  const hrefs = await section.locator('a[href^="/services/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  assert.equal(hrefs.length, 6, `service links: ${hrefs.join(', ')}`)
  for (const href of hrefs) {
    const res = await page.goto(base + href)
    assert.equal(res.status(), 200, href)
    assert.equal(await page.locator('h1').count(), 1, href)
  }
  await context.close()
})

test('BL-02 (PB-09) Services page lists all 21 services with an image, a title and a working link', async () => {
  const { page, context } = await open('/services')
  const cards = page.locator('#all-services ul li')
  assert.equal(await cards.count(), 21)
  const problems = await cards.evaluateAll((lis) => lis.flatMap((li, i) => [
    !li.querySelector('img') && `card ${i} has no image`,
    !li.querySelector('h3, h2') && `card ${i} has no title`,
    !li.querySelector('a[href]') && `card ${i} has no link`,
  ]).filter(Boolean))
  assert.deepEqual(problems, [])
  await context.close()
})

test('BL-03 (PB-13) the quote/enquiry options are easy to reach from the landing page', async () => {
  // Client decision (team, 30/10/2026): the hero "Get a Quote" button opens an email to Quick Replace
  // instead of the contact form. The form stays one click away through the Contact link.
  const result = {}
  for (const [name, width, height] of [['desktop', 1280, 800], ['mobile', 375, 812]]) {
    const { page, context } = await open('/', { width, height })
    const quote = page.getByRole('link', { name: /get a quote/i }).first()
    const box = await quote.boundingBox()
    result[name] = { top: Math.round(box.y), viewport: height, href: await quote.getAttribute('href') }
    assert.match(result[name].href, /^mailto:.+@quickreplace\.com\.au/, `${name} Get a Quote should open an email to Quick Replace`)
    await context.close()
  }
  const { page, context } = await open('/', { width: 1280, height: 800 })
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true }).click()
  await page.waitForURL(base + '/contact')
  await page.locator('#fullName').waitFor()
  await context.close()
  fs.writeFileSync(path.join(evidence, 'quote-cta-position.json'), JSON.stringify(result, null, 2))
  assert.ok(result.desktop.top < result.desktop.viewport, `desktop Get a Quote at ${result.desktop.top}px, below the fold`)
})

test('BL-03b (PB-13) on a phone, a quote/enquiry button is visible without scrolling (DEF-09)', { todo: 'DEF-09' }, async () => {
  const { page, context } = await open('/', { width: 375, height: 812 })
  const visible = await page.getByRole('link', { name: /get a quote|enquire|request a quote/i }).evaluateAll((as) =>
    as.some((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight }))
  await page.screenshot({ path: path.join(evidence, 'screenshots', 'mobile-home-first-screen.png') })
  await context.close()
  assert.ok(visible, 'no quote button in the first mobile screen (Get a Quote is about 1025px down on an 812px screen)')
})

test('BL-04 (PB-11) phone and email are shown and clickable on every page (header, footer and contact page)', async () => {
  const problems = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    const footer = page.getByRole('contentinfo')
    if (!(await footer.locator('a[href="tel:0401411636"]').count())) problems.push(`${route} footer phone`)
    if (!(await footer.locator('a[href="mailto:info@quickreplace.com.au"]').count())) problems.push(`${route} footer email`)
    if (!(await page.locator('header a[href="tel:0401411636"]').count())) problems.push(`${route} header phone`)
    await context.close()
  }
  const { page, context } = await open('/contact')
  const text = await page.locator('main').innerText()
  if (!text.includes('0401 411 636')) problems.push('/contact phone text')
  if (!text.includes('info@quickreplace.com.au')) problems.push('/contact email text')
  await context.close()
  assert.deepEqual(problems, [])
})

test('BL-05 (PB-12) header navigation and footer links are identical on every page', async () => {
  let reference
  const problems = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    const nav = await page.getByRole('navigation', { name: 'Main navigation' }).locator('a').evaluateAll((as) => as.map((a) => `${a.textContent.trim()}=${a.getAttribute('href')}`))
    const foot = await page.getByRole('contentinfo').locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
    const sig = JSON.stringify({ nav, foot })
    if (!reference) reference = sig
    else if (sig !== reference) problems.push(route)
    await context.close()
  }
  assert.deepEqual(problems, [], 'pages whose header or footer differ from the home page')
})

test('BL-06 (PB-15) each page has one header, main and footer landmark and no skipped heading levels', async () => {
  const problems = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    for (const role of ['banner', 'main', 'contentinfo']) {
      const n = await page.getByRole(role).count()
      if (n !== 1) problems.push(`${route}: ${n} ${role} landmarks`)
    }
    const skips = await page.evaluate(() => {
      const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
        .filter((h) => h.offsetParent !== null || getComputedStyle(h).position === 'fixed')
        .map((h) => Number(h.tagName[1]))
      const out = []
      for (let i = 1; i < levels.length; i += 1) if (levels[i] > levels[i - 1] + 1) out.push(`h${levels[i - 1]}→h${levels[i]}`)
      return out
    })
    if (skips.length) problems.push(`${route}: ${[...new Set(skips)].join(', ')}`)
    await context.close()
  }
  assert.deepEqual(problems, [])
})

test('BL-07 (PB-17) first-load page weight is under 3MB per page (results saved to page-weight.json)', async () => {
  const report = []
  for (const route of PAGES) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const page = await context.newPage()
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort())
    let bytes = 0
    const byType = {}
    page.on('response', async (res) => {
      try {
        const len = (await res.body()).length
        bytes += len
        const t = res.request().resourceType()
        byType[t] = (byType[t] || 0) + len
      } catch { /* redirects have no body */ }
    })
    await page.goto(base + route, { waitUntil: 'networkidle' })
    const t = await page.evaluate(() => performance.getEntriesByType('navigation')[0])
    report.push({ route, totalKB: Math.round(bytes / 1024), byTypeKB: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, Math.round(v / 1024)])), domContentLoadedMs: Math.round(t.domContentLoadedEventEnd), loadMs: Math.round(t.loadEventEnd) })
    await context.close()
  }
  fs.writeFileSync(path.join(evidence, 'page-weight.json'), JSON.stringify(report, null, 2))
  const heavy = report.filter((r) => r.totalKB > 3072).map((r) => `${r.route} ${r.totalKB}KB`)
  assert.deepEqual(heavy, [])
})

test('BL-08 (PB-18) client photos are web-optimised: each file under 300KB and below-the-fold images lazy-load (DEF-15)', { todo: 'DEF-15' }, async () => {
  const big = fs.readdirSync(buildImages)
    .map((f) => ({ f, kb: Math.round(fs.statSync(path.join(buildImages, f)).size / 1024) }))
    .filter((x) => x.kb > 300).map((x) => `${x.f} ${x.kb}KB`)
  // Files under 20KB (icons, the logo mark) gain nothing from lazy-loading, so they are skipped
  const small = new Set(fs.readdirSync(buildImages).filter((f) => fs.statSync(path.join(buildImages, f)).size < 20 * 1024).map((f) => `/images/${f}`))
  const notLazy = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    // A file already shown near the top (e.g. the logo reused in the footer) is cached, so lazy-loading it saves nothing
    const list = await page.locator('img').evaluateAll((imgs) => {
      const early = new Set(imgs.filter((i) => i.getBoundingClientRect().top <= window.innerHeight * 1.5).map((i) => i.getAttribute('src')))
      return imgs
        .filter((i) => i.getBoundingClientRect().top > window.innerHeight * 1.5 && i.getAttribute('loading') !== 'lazy' && !early.has(i.getAttribute('src')))
        .map((i) => i.getAttribute('src'))
    })
    list.filter((s) => !small.has(s)).forEach((s) => notLazy.push(`${route} ${s}`))
    await context.close()
  }
  fs.writeFileSync(path.join(evidence, 'image-check.json'), JSON.stringify({ over300KB: big, belowFoldNotLazy: notLazy }, null, 2))
  assert.deepEqual(big, [], 'image files over 300KB')
  assert.deepEqual(notLazy, [], 'below-the-fold images without loading="lazy"')
})

test('BL-09 (PB-08) home page main sections are present in the agreed order', async () => {
  const { page, context } = await open('/')
  const ids = await page.locator('main section[id]').evaluateAll((s) => s.map((x) => x.id))
  fs.writeFileSync(path.join(evidence, 'home-sections.json'), JSON.stringify(ids, null, 2))
  for (const id of ['services', 'service-area']) assert.ok(ids.includes(id), `missing #${id}`)
  assert.ok(ids.indexOf('services') < ids.indexOf('service-area'))
  assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1)
  await context.close()
})

// ---- Added 24/10/2026 from the team's Figma vs website review (Changes_in_website.docx) ----

test('BL-10 (PB-12) the footer lists all 21 services, each linking to its own page (DEF-10 fixed)', async () => {
  const { page, context } = await open('/services')
  const services = (await page.locator('#all-services ul li h3, #all-services ul li h2').allInnerTexts()).map((t) => t.trim())
  const footer = (await page.getByRole('contentinfo').locator('nav[aria-label^="Footer services"] a').allInnerTexts()).map((t) => t.trim())
  await context.close()
  const missing = services.filter((s) => !footer.includes(s))
  assert.deepEqual(missing, [], `services missing from the footer: ${missing.join(', ')}`)
})

test('BL-11 (PB-09) every service page has a "What We Can Help With" section (DEF-11 fixed)', async () => {
  const { page, context } = await open('/services')
  const hrefs = await page.locator('#all-services ul li a[href^="/services/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  const missing = []
  for (const href of hrefs) {
    await page.goto(base + href)
    const text = await page.locator('main').innerText()
    if (!/What We Can\s+Help\s+With/i.test(text)) missing.push(href)
  }
  await context.close()
  assert.equal(hrefs.length, 21)
  assert.deepEqual(missing, [])
})
