const fs = require('fs')
const path = require('path')
const express = require('express')

const DEFAULT_BUILD_DIR = path.join(__dirname, '..', 'build')
const HTML_CACHE_CONTROL = 'public, max-age=0, must-revalidate'
const NOINDEX = 'noindex, follow'

function isWithin(root, filename) {
  const relative = path.relative(root, filename)
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
}

function isCanonicalRoute(route) {
  return (
    typeof route === 'string' &&
    route.startsWith('/') &&
    route === route.toLowerCase() &&
    (route === '/' || !route.endsWith('/')) &&
    !/[\\%?#\s\u0000-\u001f\u007f]/.test(route) &&
    !route.includes('//') &&
    !route.split('/').some((segment) => segment.startsWith('.'))
  )
}

/**
 * Serve a generated SEO build. Register enquiry/API handlers before calling this.
 * The manifest is the allowlist of public pages; unknown URLs never receive a
 * successful SPA fallback. siteUrl is deliberately not used for host redirects.
 */
function attachSite(app, { buildDir = DEFAULT_BUILD_DIR } = {}) {
  let root
  let manifest
  const pageFiles = new Map()
  let notFoundFile

  function buildFile(relativePath) {
    const filename = fs.realpathSync(path.resolve(root, relativePath))
    if (!isWithin(root, filename) || !fs.statSync(filename).isFile()) {
      throw new Error(`Invalid generated file: ${relativePath}`)
    }
    return filename
  }

  try {
    root = fs.realpathSync(path.resolve(buildDir))
    manifest = JSON.parse(fs.readFileSync(buildFile('seo-routes.json'), 'utf8'))
    if (
      manifest.version !== 1 ||
      typeof manifest.siteUrl !== 'string' ||
      typeof manifest.noindex !== 'boolean' ||
      !Array.isArray(manifest.routes) ||
      !manifest.routes.length ||
      !manifest.routes.every(isCanonicalRoute) ||
      !manifest.routes.includes('/')
    ) {
      throw new Error('seo-routes.json must contain a version 1 SEO route manifest.')
    }
    for (const route of manifest.routes) {
      pageFiles.set(route, buildFile(route === '/' ? 'index.html' : `${route.slice(1)}/index.html`))
    }
    notFoundFile = buildFile('404.html')
  } catch (error) {
    throw new Error(`Cannot serve the frontend build at ${buildDir}. Run npm run build first. ${error.message}`)
  }

  function sendHtml(req, res, next, filename, status) {
    res.status(status)
    res.set('Cache-Control', HTML_CACHE_CONTROL)
    if (manifest.noindex || status === 404) res.set('X-Robots-Tag', NOINDEX)
    res.sendFile(filename, { cacheControl: false }, (error) => {
      if (!error) return
      if (res.headersSent) return next(error)
      res.set('X-Robots-Tag', NOINDEX)
      res.status(error.status === 404 ? 404 : 500).type('html').send(
        '<!doctype html><html lang="en"><head><meta name="robots" content="noindex, follow"><title>Page unavailable</title></head><body><h1>Page unavailable</h1><p>Please try again later.</p></body></html>',
      )
    })
  }

  function notFound(req, res, next) {
    return sendHtml(req, res, next, notFoundFile, 404)
  }

  function apiNotFound(req, res) {
    res.set('X-Robots-Tag', NOINDEX)
    return res.status(404).json({ ok: false, error: 'API endpoint not found.' })
  }

  const decodedPathKey = Symbol('decodedSitePath')

  app.use((req, res, next) => {
    // Reserve /api even when a malformed escape appears later in its URL.
    if (/^\/api(?:\/|$)/i.test(req.path)) return apiNotFound(req, res)

    let decodedPath
    try {
      decodedPath = decodeURIComponent(req.path)
    } catch {
      return notFound(req, res, next)
    }

    // This fallback also protects a standalone preview, which has no API server.
    if (/^\/api(?:\/|$)/i.test(decodedPath)) {
      return apiNotFound(req, res)
    }

    if (
      !['GET', 'HEAD'].includes(req.method) ||
      !decodedPath.startsWith('/') ||
      /[\\\u0000-\u001f\u007f]/.test(decodedPath) ||
      decodedPath.split('/').some((segment) => segment.startsWith('.'))
    ) {
      return notFound(req, res, next)
    }

    let canonicalRoute = decodedPath.toLowerCase().replace(/\/+$/, '') || '/'
    if (canonicalRoute.endsWith('/index.html')) {
      canonicalRoute = canonicalRoute.slice(0, -'/index.html'.length) || '/'
    }

    if (pageFiles.has(canonicalRoute)) {
      if (req.path !== canonicalRoute) {
        const queryIndex = req.originalUrl.indexOf('?')
        const query = queryIndex === -1 ? '' : req.originalUrl.slice(queryIndex)
        res.set('Cache-Control', HTML_CACHE_CONTROL)
        if (manifest.noindex) res.set('X-Robots-Tag', NOINDEX)
        return res.redirect(301, `${canonicalRoute}${query}`)
      }
      return sendHtml(req, res, next, pageFiles.get(canonicalRoute), 200)
    }

    // HTML is served only through the known route map above. In particular,
    // /404.html and unknown /services/<slug>/index.html keep a real 404 status.
    if (/\.html?$/i.test(decodedPath.replace(/\/+$/, ''))) return notFound(req, res, next)

    req[decodedPathKey] = decodedPath
    next()
  })

  // express.static handles ranges, conditional requests and asset MIME types.
  // Check real paths first so an accidental symlink cannot expose another folder.
  app.use(async (req, res, next) => {
    const candidate = path.resolve(root, `.${req[decodedPathKey]}`)
    if (!isWithin(root, candidate)) return notFound(req, res, next)
    try {
      const realFilename = await fs.promises.realpath(candidate)
      if (
        !isWithin(root, realFilename) ||
        path.relative(root, realFilename).split(path.sep).some((segment) => segment.startsWith('.'))
      ) {
        return notFound(req, res, next)
      }
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return notFound(req, res, next)
      return next(error)
    }
    next()
  })

  app.use(express.static(root, {
    dotfiles: 'deny',
    index: false,
    redirect: false,
    fallthrough: true,
    maxAge: 0,
    setHeaders(res, filename) {
      const relative = path.relative(root, filename)
      const hashedAsset = relative.startsWith(`static${path.sep}`) && /\.[a-f0-9]{8,}\./i.test(path.basename(filename))
      res.setHeader('Cache-Control', hashedAsset ? 'public, max-age=31536000, immutable' : HTML_CACHE_CONTROL)
    },
  }))

  app.use(notFound)
  return app
}

module.exports = { attachSite }
