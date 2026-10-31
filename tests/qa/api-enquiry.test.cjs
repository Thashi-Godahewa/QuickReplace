// Integration tests for the enquiry API (server/index.js).
// No real email is sent: transporter.sendMail is replaced with a recorder,
// and one test renders the raw MIME message with Nodemailer's stream transport.
// Run: node --test tests/qa/api-enquiry.test.cjs
const assert = require('node:assert/strict')
const { after, before, beforeEach, test } = require('node:test')
const nodemailer = require('nodemailer')

process.env.SMTP_USER = 'sender@example.com'
process.env.SMTP_PASS = 'test-only'
process.env.ENQUIRY_TO = 'inbox@example.com'
process.env.ALLOWED_ORIGIN = 'https://quickreplace.example'
const { app, transporter } = require('../../server/index.js')

let server
let base
let sent = []
let failNext = false
before(async () => {
  transporter.sendMail = async (msg) => {
    if (failNext) { failNext = false; throw new Error('SMTP down') }
    sent.push(msg)
    return { messageId: 'test' }
  }
  server = await new Promise((resolve) => { const s = app.listen(0, '127.0.0.1', () => resolve(s)) })
  base = `http://127.0.0.1:${server.address().port}`
})
after(() => { server.closeAllConnections(); server.close() })
beforeEach(() => { sent = [] })

const valid = { fullName: 'Marcus Vance', email: 'marcus@example.com', phone: '0401 234 567', address: '3000', description: 'Broken window' }
function form(fields = {}, files = []) {
  const fd = new FormData()
  Object.entries({ ...valid, ...fields }).forEach(([k, v]) => v !== undefined && fd.append(k, v))
  files.forEach(({ name, type, size }) => fd.append('photos', new Blob([Buffer.alloc(size, 1)], { type }), name))
  return fd
}
const post = (fd, headers) => fetch(`${base}/api/enquiry`, { method: 'POST', body: fd, headers })
const MB = 1024 * 1024

test('API-01 health check responds ok', async () => {
  const r = await fetch(`${base}/api/health`)
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { ok: true })
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, follow')
})

test('API-02 valid enquiry is emailed to ENQUIRY_TO with Reply-To set to the customer', async () => {
  const r = await post(form())
  assert.equal(r.status, 200)
  assert.deepEqual(await r.json(), { ok: true })
  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'inbox@example.com')
  assert.equal(sent[0].replyTo, '"Marcus Vance" <marcus@example.com>')
  assert.match(sent[0].from, /^"Marcus Vance via Quick Replace Website" <sender@example.com>$/)
  assert.equal(sent[0].subject, 'New enquiry: Marcus Vance - 3000')
  assert.match(sent[0].text, /Job description: Broken window/)
})

test('API-03 missing or blank name is rejected', async () => {
  for (const fullName of [undefined, '', '    ']) {
    const r = await post(form({ fullName }))
    assert.equal(r.status, 400)
    assert.match((await r.json()).error, /Name is required/)
  }
  assert.equal(sent.length, 0)
})

test('API-04 invalid email formats are rejected', async () => {
  for (const email of ['', 'marcus', 'marcus@', 'marcus@example', '@example.com', 'mar cus@example.com']) {
    const r = await post(form({ email }))
    assert.equal(r.status, 400, email)
    assert.match((await r.json()).error, /valid email/)
  }
})

test('API-05 phone boundary values: 7 and 13 digits fail, 8 and 12 digits pass', async () => {
  const cases = { '1234567': 400, '12345678': 200, '123456789012': 200, '1234567890123': 400, '+61 (3) 9000-0000': 200, 'abc': 400 }
  for (const [phone, status] of Object.entries(cases)) {
    const r = await post(form({ phone }))
    assert.equal(r.status, status, phone)
  }
})

test('API-06 missing property address / post code is rejected', async () => {
  const r = await post(form({ address: '  ' }))
  assert.equal(r.status, 400)
  assert.match((await r.json()).error, /address or post code/)
})

test('API-07 several errors are reported together', async () => {
  const r = await post(form({ fullName: '', email: 'x', phone: '1', address: '' }))
  const { error } = await r.json()
  for (const part of ['Name', 'email', 'phone', 'address']) assert.match(error, new RegExp(part))
})

test('API-08 honeypot field filled (spam bot) returns ok but sends nothing', async () => {
  const r = await post(form({ website: 'http://spam.example' }))
  assert.equal(r.status, 200)
  assert.equal(sent.length, 0)
})

test('API-09 accepted photo/video/PDF types are attached to the email', async () => {
  const files = [
    { name: 'a.jpg', type: 'image/jpeg', size: 1000 },
    { name: 'b.png', type: 'image/png', size: 1000 },
    { name: 'c.pdf', type: 'application/pdf', size: 1000 },
    { name: 'd.mp4', type: 'video/mp4', size: 1000 },
    { name: 'e.mov', type: 'video/quicktime', size: 1000 },
  ]
  const r = await post(form({}, files))
  assert.equal(r.status, 200)
  assert.deepEqual(sent[0].attachments.map((a) => a.filename), files.map((f) => f.name))
})

test('API-10 unsupported file type is rejected with a clear message', async () => {
  const r = await post(form({}, [{ name: 'notes.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 100 }]))
  assert.equal(r.status, 400)
  assert.match((await r.json()).error, /notes.docx is not a supported file type/)
})

test('API-11 boundary: 6 files is over the 5-file limit', async () => {
  const six = Array.from({ length: 6 }, (_, i) => ({ name: `p${i}.jpg`, type: 'image/jpeg', size: 10 }))
  const r = await post(form({}, six))
  assert.equal(r.status, 400)
  assert.match((await r.json()).error, /up to 5 files/)
})

test('API-12 boundary: a single file just over 18MB is rejected', async () => {
  const r = await post(form({}, [{ name: 'big.mp4', type: 'video/mp4', size: 18 * MB + 1 }]))
  assert.equal(r.status, 400)
  assert.match((await r.json()).error, /under 18MB/)
})

test('API-13 boundary: several files totalling over 18MB are rejected', async () => {
  const files = [1, 2, 3].map((i) => ({ name: `v${i}.mp4`, type: 'video/mp4', size: 7 * MB }))
  const r = await post(form({}, files))
  assert.equal(r.status, 400)
  assert.match((await r.json()).error, /under 18MB/)
  assert.equal(sent.length, 0)
})

test('API-14 SMTP failure returns 502 with a friendly message', async () => {
  failNext = true
  const r = await post(form())
  assert.equal(r.status, 502)
  assert.equal((await r.json()).error, 'The email could not be sent.')
})

test('API-15 HTML typed into the form is escaped in the email body (no HTML injection)', async () => {
  await post(form({ description: '<img src=x onerror=alert(1)>', fullName: '<b>Bob</b>' }))
  assert.ok(!sent[0].html.includes('<img src=x'))
  assert.ok(sent[0].html.includes('&lt;img src=x onerror=alert(1)&gt;'))
})

test('API-16 CR/LF in name or address cannot inject extra email headers', async () => {
  await post(form({ fullName: 'Eve\r\nBcc: victim@example.com', address: '3000\r\nX-Evil: 1' }))
  const raw = await new Promise((resolve, reject) => {
    nodemailer.createTransport({ streamTransport: true, buffer: true }).sendMail(sent[0], (e, info) => (e ? reject(e) : resolve(info.message.toString())))
  })
  const headers = raw.split('\r\n\r\n')[0]
  assert.doesNotMatch(headers, /^Bcc:/im)
  assert.doesNotMatch(headers, /^X-Evil:/im)
})

test('API-17 CORS pre-flight from the configured origin is allowed', async () => {
  const r = await fetch(`${base}/api/enquiry`, { method: 'OPTIONS', headers: { Origin: 'https://quickreplace.example' } })
  assert.equal(r.status, 204)
  assert.equal(r.headers.get('access-control-allow-origin'), 'https://quickreplace.example')
  assert.match(r.headers.get('access-control-allow-methods'), /POST/)
})

test('API-18 unknown API route returns a JSON 404', async () => {
  const r = await fetch(`${base}/api/nothing-here`)
  assert.equal(r.status, 404)
  assert.equal((await r.json()).ok, false)
})

test('API-19 GET on the enquiry endpoint is not allowed to send', async () => {
  const r = await fetch(`${base}/api/enquiry`)
  assert.equal(r.status, 404)
  assert.equal(sent.length, 0)
})

// ---- Tests that expose defects (recorded as TODO so the suite still passes) ----

test('API-20 an .exe renamed with an image MIME type should be rejected (DEF-02)', { todo: 'DEF-02' }, async () => {
  const r = await post(form({}, [{ name: 'invoice.exe', type: 'image/jpeg', size: 100 }]))
  assert.equal(r.status, 400)
})

test('API-21 a long job description (over 20,000 characters) should be accepted or give a clear message (DEF-03)', { todo: 'DEF-03' }, async () => {
  const r = await post(form({ description: 'x'.repeat(20001) }))
  const body = await r.json()
  assert.ok(r.status === 200 || /description/i.test(body.error), `got ${r.status} "${body.error}"`)
})

test('API-22 repeated rapid submissions from one client should be rate limited (DEF-04)', { todo: 'DEF-04' }, async () => {
  const statuses = []
  for (let i = 0; i < 25; i += 1) statuses.push((await post(form())).status)
  assert.ok(statuses.includes(429), `all ${statuses.length} requests accepted`)
})
