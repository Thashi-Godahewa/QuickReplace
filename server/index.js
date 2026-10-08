// Quick Replace enquiry server.
//
// Receives the Contact page form (text fields + photos/videos) and emails it,
// with the files attached, to the address in ENQUIRY_TO.
//
// Settings come from a .env file in the project root (see .env.example).
// Run on its own with:  npm run server
// Run with the React app: npm run dev

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true })

const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')

// ENQUIRY_PORT, not PORT: the React dev server also reads PORT from .env and would
// start on the same port. Hosting platforms that set PORT themselves still work.
const PORT = process.env.ENQUIRY_PORT || process.env.PORT || 5000
const MAX_FILES = 5
// Gmail rejects emails over 25MB. Attachments grow by about a third when
// emailed, so 18MB of files is the most that fits safely in one email.
const MAX_TOTAL_BYTES = 18 * 1024 * 1024

const ALLOWED_TYPES = /^(image\/(jpeg|png|heic|heif)|application\/pdf|video\/(mp4|quicktime|webm|3gpp|x-m4v))$/
const ALLOWED_EXT = /\.(jpe?g|png|heic|heif|pdf|mp4|mov|m4v|webm|3gp)$/i

const required = ['SMTP_USER', 'SMTP_PASS', 'ENQUIRY_TO']
const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`[enquiry-server] Missing settings in .env: ${missing.join(', ')}`)
  console.error('[enquiry-server] Copy .env.example to .env and fill it in.')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: MAX_FILES, fileSize: MAX_TOTAL_BYTES, fields: 20, fieldSize: 20000 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.test(file.mimetype) || ALLOWED_EXT.test(file.originalname)) cb(null, true)
    else cb(new UploadError(`${file.originalname} is not a supported file type.`))
  },
})

class UploadError extends Error {}

const app = express()

// Lets the site call this server when the two are hosted on different domains.
// Set ALLOWED_ORIGIN in .env to the live site address, e.g. https://quickreplace.com.au
app.use((req, res, next) => {
  const origin = process.env.ALLOWED_ORIGIN
  if (origin) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/api/health', (req, res) => res.json({ ok: true }))

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`

function validate(body) {
  const errors = []
  if (!body.fullName || !body.fullName.trim()) errors.push('Name is required.')
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('A valid email is required.')
  const digits = (body.phone || '').replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 12) errors.push('A valid phone number is required.')
  if (!body.address || !body.address.trim()) errors.push('Property address or post code is required.')
  return errors
}

function buildEmail(body, files) {
  const customerName = body.fullName.trim().replace(/["<>\r\n]/g, '').slice(0, 80)
  const rows = [
    ['Full name', body.fullName],
    ['Email', body.email],
    ['Contact number', body.phone],
    ['Property address / post code', body.address],
    ['Job description', body.description || '(none given)'],
    ['Attachments', files.length ? files.map((f) => `${f.originalname} (${formatSize(f.size)})`).join('\n') : 'None'],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0b1b33;max-width:640px">
      <h2 style="margin:0 0 4px">New enquiry from the website</h2>
      <p style="margin:0 0 16px;color:#5b6b80">Submitted ${escapeHtml(new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }))}</p>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="border:1px solid #e3e8ef;background:#f5f8fb;font-weight:bold;width:200px;vertical-align:top">${escapeHtml(label)}</td>
            <td style="border:1px solid #e3e8ef;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <p style="margin-top:16px;color:#5b6b80">Reply to this email to respond to the customer directly.</p>
    </div>`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n')

  return {
    // Gmail only lets an account send as itself, so the customer's NAME is shown as
    // the sender and Reply-To is set to their email. Pressing Reply answers the customer.
    from: `"${customerName} via Quick Replace Website" <${process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_TO,
    replyTo: `"${customerName}" <${body.email.trim()}>`,
    subject: `New enquiry: ${body.fullName.trim()} - ${body.address.trim()}`.slice(0, 200),
    text,
    html,
    attachments: files.map((f) => ({ filename: f.originalname, content: f.buffer, contentType: f.mimetype })),
  }
}

app.post('/api/enquiry', (req, res) => {
  upload.array('photos', MAX_FILES)(req, res, async (err) => {
    if (err) {
      const message =
        err instanceof UploadError
          ? err.message
          : err.code === 'LIMIT_FILE_SIZE'
            ? 'Your files are too large. The total must be under 18MB.'
            : err.code === 'LIMIT_FILE_COUNT'
              ? `You can upload up to ${MAX_FILES} files.`
              : 'The upload could not be processed.'
      return res.status(400).json({ ok: false, error: message })
    }

    const body = req.body || {}
    const files = req.files || []

    // Hidden field that people never fill in, but spam bots usually do
    if (body.website) return res.json({ ok: true })

    const errors = validate(body)
    if (errors.length) return res.status(400).json({ ok: false, error: errors.join(' ') })

    const total = files.reduce((sum, f) => sum + f.size, 0)
    if (total > MAX_TOTAL_BYTES) {
      return res.status(400).json({ ok: false, error: 'Your files are too large. The total must be under 18MB.' })
    }

    try {
      await transporter.sendMail(buildEmail(body, files))
      res.json({ ok: true })
    } catch (sendError) {
      console.error('[enquiry-server] Email failed to send:', sendError.message)
      res.status(502).json({ ok: false, error: 'The email could not be sent.' })
    }
  })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[enquiry-server] Listening on http://localhost:${PORT}`)
    console.log(`[enquiry-server] Enquiries will be emailed to ${process.env.ENQUIRY_TO}`)
  })
}

module.exports = { app, transporter }
