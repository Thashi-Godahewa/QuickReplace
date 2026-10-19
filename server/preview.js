// Preview the generated frontend without creating an SMTP transport or sending mail.
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true })

const express = require('express')
const { attachSite } = require('./site')

const app = express()
app.use((req, res, next) => {
  res.set('X-Robots-Tag', 'noindex, follow')
  next()
})
attachSite(app)

if (require.main === module) {
  const port = Number(process.env.PREVIEW_PORT || process.env.PORT || 4173)
  const host = process.env.PREVIEW_HOST || '127.0.0.1'
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error('[site-preview] PREVIEW_PORT or PORT must be a valid TCP port.')
    process.exitCode = 1
  } else {
    const server = app.listen(port, host, (error) => {
      if (error) return // Express 5 also invokes this callback on listen errors.
      const address = server.address()
      const displayHost = host.includes(':') ? `[${host}]` : host
      console.log(`[site-preview] Listening on http://${displayHost}:${address.port}`)
      console.log('[site-preview] API endpoints are unavailable in this frontend preview.')
    })
    server.on('error', (error) => {
      console.error(`[site-preview] Unable to listen: ${error.message}`)
      process.exitCode = 1
    })
  }
}

module.exports = { app }
