// End-to-end browser tests (Chromium via Playwright) against the production build.
// The enquiry API and the generated site run together in one Express app
// (SERVE_FRONTEND=true), with sendMail stubbed so no real email is sent.
// External CDNs (AI model, map tiles) are blocked so results are repeatable.
//
// Needs: npm run build, plus `playwright` and `axe-core` resolvable via NODE_PATH.
// Run:   NODE_PATH=<dir>/node_modules node --test --test-concurrency=1 tests/qa/e2e-browser.test.cjs
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { after, before, test } = require('node:test')
const { chromium } = require('playwright')
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

process.env.SMTP_USER = 'sender@example.com'
process.env.SMTP_PASS = 'test-only'
process.env.ENQUIRY_TO = 'inbox@example.com'
process.env.SERVE_FRONTEND = 'true'
const { app, transporter } = require('../../server/index.js')

const shots = path.resolve(__dirname, '../../../evidence/screenshots')
fs.mkdirSync(shots, { recursive: true })

let server, base, browser
const sent = []
let smtpDown = false
before(async () => {
  transporter.sendMail = async (m) => { if (smtpDown) throw new Error('down'); sent.push(m); return {} }
  server = await new Promise((r) => { const s = app.listen(0, '127.0.0.1', () => r(s)) })
  base = `http://127.0.0.1:${server.address().port}`
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
})
after(async () => { await browser.close(); server.closeAllConnections(); server.close() })

async function open(route, { width = 1280, height = 900 } = {}) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && !/ERR_FAILED|net::|Failed to load resource/.test(m.text()) && errors.push(m.text()))
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort())
  await page.goto(base + route, { waitUntil: 'load' })
  return { page, context, errors }
}

const PAGES = ['/', '/services', '/services/plumbing', '/our-work', '/about', '/clients', '/contact', '/privacy-policy', '/terms-and-conditions']
const fixtureDir = path.join(shots, '..', 'fixtures'); fs.mkdirSync(fixtureDir, { recursive: true })
const fixture = (name, bytes) => { const p = path.join(fixtureDir, name); fs.writeFileSync(p, Buffer.alloc(bytes, 7)); return p }

test('E2E-01 every main page loads with one H1, a title and no JavaScript errors', async () => {
  for (const route of PAGES) {
    const { page, context, errors } = await open(route)
    assert.equal(await page.locator('h1').count(), 1, `${route} H1 count`)
    assert.match(await page.title(), /Quick Replace/, route)
    await page.waitForTimeout(300)
    assert.deepEqual(errors, [], `${route} JS errors`)
    await context.close()
  }
})

test('E2E-02 desktop navigation links open the right pages and the logo returns home', async () => {
  const { page, context } = await open('/')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  for (const [label, url] of [['Services', '/services'], ['Clients', '/clients'], ['Our Work', '/our-work'], ['About Us', '/about'], ['Contact', '/contact']]) {
    await nav.getByRole('link', { name: label, exact: true }).click()
    await page.waitForURL(base + url)
  }
  await page.getByRole('link', { name: 'Quick Replace home' }).click()
  await page.waitForURL(base + '/')
  await context.close()
})

test('E2E-03 mobile menu (375px) opens, navigates and closes', async () => {
  const { page, context } = await open('/', { width: 375, height: 812 })
  await page.getByRole('button', { name: 'Open menu' }).click()
  const mnav = page.getByRole('navigation', { name: 'Mobile navigation' })
  await mnav.getByRole('link', { name: 'Contact', exact: true }).click()
  await page.waitForURL(base + '/contact')
  assert.equal(await mnav.count(), 0, 'menu should close after navigating')
  await page.screenshot({ path: path.join(shots, 'mobile-contact.png') })
  await context.close()
})

test('E2E-04 Call Now and Email buttons use tel: and mailto: links', async () => {
  const { page, context } = await open('/')
  const hrefs = await page.locator('a[href^="tel:"], a[href^="mailto:"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  assert.ok(hrefs.includes('tel:0401411636'))
  assert.ok(hrefs.includes('mailto:info@quickreplace.com.au'))
  await context.close()
})

test('E2E-05 unknown URLs show the 404 page with HTTP 404', async () => {
  for (const route of ['/does-not-exist', '/services/not-a-service']) {
    const { page, context } = await open('/')
    const res = await page.goto(base + route)
    assert.equal(res.status(), 404, route)
    await page.getByRole('heading', { name: 'Page not found' }).waitFor()
    await context.close()
  }
})

test('E2E-06 Services search: problem text shows the right service, junk shows the call-us message', async () => {
  const { page, context } = await open('/services')
  const box = page.getByPlaceholder('Search by service name')
  await box.fill('leaking tap')
  await page.getByText('1 service shown').waitFor()
  assert.ok(await page.locator('#all-services ul li').filter({ hasText: 'Plumbing' }).count() >= 1)
  await box.fill('xyzzy')
  await page.getByText('0 services shown').waitFor()
  await page.getByText('We may still be able to help').waitFor()
  await page.getByRole('button', { name: 'Clear search' }).click()
  await page.getByText('21 services shown').waitFor()
  await page.screenshot({ path: path.join(shots, 'services-search.png') })
  await context.close()
})

test('E2E-07 Services search still works when the AI model cannot download (offline/CDN blocked)', async () => {
  const { page, context, errors } = await open('/services')
  const box = page.getByPlaceholder('Search by service name')
  await box.fill('water coming through the roof') // not a confident keyword match, so AI is tried
  await page.waitForTimeout(1500)
  assert.equal(await page.getByText('Loading smart search').count(), 0, 'loader should not hang')
  await box.fill('roof')
  await page.getByText(/service(s)? shown/).waitFor()
  assert.ok(await page.locator('#all-services ul li').filter({ hasText: 'Roofing' }).count() >= 1)
  assert.deepEqual(errors, [])
  await context.close()
})

test('E2E-08 Service card opens its detail page', async () => {
  const { page, context } = await open('/services')
  await page.getByPlaceholder('Search by service name').fill('glazing')
  await page.locator('#all-services ul li a').first().click()
  await page.waitForURL(base + '/services/glazing')
  await context.close()
})

test('E2E-09 Post code checker: covered, not covered, invalid, and letters stripped', async () => {
  const { page, context } = await open('/')
  await page.locator('#service-area').scrollIntoViewIfNeeded()
  const input = page.locator('#postcode')
  await input.waitFor({ timeout: 10000 })
  const check = page.getByRole('button', { name: 'Check post code' })
  await input.fill('3000'); await check.click()
  await page.getByText(/Good news - we cover 3000/).waitFor()
  await input.fill('2000'); await check.click()
  await page.getByText(/2000 is outside our usual area/).waitFor()
  await input.fill('30'); await check.click()
  assert.ok((await page.locator('#postcode-result').innerText()).trim().length > 0, 'invalid message shown')
  await input.fill(''); await input.pressSequentially('ab3c0'); assert.equal(await input.inputValue(), '30')
  await input.fill(''); await input.pressSequentially('300012'); assert.equal(await input.inputValue(), '3000', 'max 4 digits')
  await context.close()
})

test('E2E-09b Post code checker: pasting " 3000" or "VIC 3000" should still find 3000 (DEF-07)', { todo: 'DEF-07' }, async () => {
  const { page, context } = await open('/')
  await page.locator('#service-area').scrollIntoViewIfNeeded()
  const input = page.locator('#postcode')
  await input.waitFor({ timeout: 10000 })
  const results = []
  for (const pasted of [' 3000', 'VIC 3000']) { await input.fill(pasted); results.push(await input.inputValue()) }
  await context.close()
  assert.deepEqual(results, ['3000', '3000'])
})

test('E2E-10 Contact form: empty submit shows every required-field error and focuses the first', async () => {
  const { page, context } = await open('/contact')
  await page.getByRole('button', { name: 'Submit' }).click()
  for (const msg of ['Please enter your name.', 'Please enter your email address.', 'Please enter a contact number.', 'Please enter the property address or post code.']) {
    await page.getByText(msg).waitFor()
  }
  assert.equal(await page.evaluate(() => document.activeElement.id), 'fullName')
  assert.equal(await page.locator('#fullName').getAttribute('aria-invalid'), 'true')
  await page.screenshot({ path: path.join(shots, 'contact-validation.png'), fullPage: false })
  await context.close()
})

test('E2E-11 Contact form: invalid email and short phone number are flagged', async () => {
  const { page, context } = await open('/contact')
  await page.fill('#fullName', 'Marcus Vance')
  await page.fill('#email', 'marcus@example')
  await page.fill('#phone', '1234567')
  await page.fill('#address', '3000')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('Please enter a valid email address.').waitFor()
  await page.getByText('Please enter a valid phone number.').waitFor()
  assert.equal(sent.length, 0)
  await context.close()
})

test('E2E-12 Contact form: file upload accepts a photo, rejects a .txt file and lets the user remove a file', async () => {
  const { page, context } = await open('/contact')
  const input = page.locator('input[type=file]')
  await input.setInputFiles(fixture('notes.txt', 100))
  await page.getByText('notes.txt is not a photo, video or PDF file.').waitFor()
  await input.setInputFiles(fixture('roof.jpg', 2048))
  await page.getByText('roof.jpg').waitFor()
  await page.getByRole('button', { name: 'Remove roof.jpg' }).click()
  assert.equal(await page.getByText('Ready to upload').count(), 0)
  await context.close()
})

test('E2E-13 Contact form: more than 5 files shows the limit message', async () => {
  const { page, context } = await open('/contact')
  const files = Array.from({ length: 6 }, (_, i) => fixture(`p${i}.jpg`, 1000 + i))
  await page.locator('input[type=file]').setInputFiles(files)
  await page.getByText('You can upload up to 5 files.').waitFor()
  assert.equal(await page.getByText('Ready to upload').count(), 5)
  await context.close()
})

test('E2E-14 Contact form: valid enquiry with a photo is sent and a thank-you message appears', async () => {
  sent.length = 0
  const { page, context } = await open('/contact')
  await page.fill('#fullName', 'Marcus Vance')
  await page.fill('#email', 'marcus@example.com')
  await page.fill('#phone', '0401 234 567')
  await page.fill('#address', '142 Collins St, Melbourne 3000')
  await page.fill('#description', 'Broken shopfront glass, need make-safe.')
  await page.locator('input[type=file]').setInputFiles(fixture('shopfront.jpg', 4096))
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('Thanks, Marcus!').waitFor()
  assert.equal(sent.length, 1)
  assert.equal(sent[0].attachments[0].filename, 'shopfront.jpg')
  assert.match(sent[0].subject, /Marcus Vance - 142 Collins St/)
  await page.screenshot({ path: path.join(shots, 'contact-success.png') })
  await page.getByRole('button', { name: 'Send another enquiry' }).click()
  assert.equal(await page.locator('#fullName').inputValue(), '')
  await context.close()
})

test('E2E-15 Contact form: when email sending fails the user sees an error and keeps their answers', async () => {
  smtpDown = true
  const { page, context } = await open('/contact')
  await page.fill('#fullName', 'Marcus Vance')
  await page.fill('#email', 'marcus@example.com')
  await page.fill('#phone', '0401234567')
  await page.fill('#address', '3000')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.getByText('The email could not be sent.').waitFor()
  assert.equal(await page.locator('#fullName').inputValue(), 'Marcus Vance')
  smtpDown = false
  await context.close()
})

test('E2E-16 responsive layout: no horizontal scrolling at 375, 768 and 1280px on any main page', async () => {
  const problems = []
  for (const width of [375, 768, 1280]) {
    for (const route of PAGES) {
      const { page, context } = await open(route, { width, height: 900 })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (overflow > 1) problems.push(`${route} @${width}px overflows by ${overflow}px`)
      if (route === '/' ) await page.screenshot({ path: path.join(shots, `home-${width}.png`) })
      await context.close()
    }
  }
  assert.deepEqual(problems, [])
})

test('E2E-17 images: every <img> has an alt attribute and none are broken', async () => {
  const problems = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } })
    await page.waitForTimeout(500)
    const bad = await page.locator('img').evaluateAll((imgs) => imgs
      .filter((i) => !i.src.startsWith('http') || i.src.includes('127.0.0.1'))
      .flatMap((i) => [!i.hasAttribute('alt') && `no alt: ${i.src}`, i.complete && i.naturalWidth === 0 && `broken: ${i.src}`]).filter(Boolean))
    bad.forEach((b) => problems.push(`${route} ${b}`))
    await context.close()
  }
  assert.deepEqual(problems, [])
})

test('E2E-18 accessibility (axe-core WCAG 2.1 AA): no serious or critical violations (DEF-06)', { todo: 'DEF-06' }, async () => {
  const report = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    await page.addScriptTag({ content: axeSource })
    const result = await page.evaluate(() => window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }))
    for (const v of result.violations) report.push({ route, id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help, sample: v.nodes[0].target.join(' ') })
    await context.close()
  }
  fs.writeFileSync(path.join(shots, '..', 'axe-report.json'), JSON.stringify(report, null, 2))
  const severe = report.filter((v) => ['serious', 'critical'].includes(v.impact))
  assert.deepEqual(severe.map((v) => `${v.route} ${v.id} (${v.impact}, ${v.nodes} nodes)`), [])
})

test('E2E-19 performance: each page loads (load event) in under 3 seconds on a local server', async () => {
  const slow = []
  for (const route of PAGES) {
    const { page, context } = await open(route)
    const ms = await page.evaluate(() => performance.getEntriesByType('navigation')[0].loadEventEnd)
    if (ms > 3000) slow.push(`${route} ${Math.round(ms)}ms`)
    await context.close()
  }
  assert.deepEqual(slow, [])
})
