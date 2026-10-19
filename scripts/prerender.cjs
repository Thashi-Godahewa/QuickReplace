// Generate real HTML for every public React route after the normal CRA build.
// No browser, database, API calls or SMTP credentials are needed at build time.
process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const fs = require('node:fs/promises')
const path = require('node:path')
const esbuild = require('esbuild')

const projectDir = path.resolve(__dirname, '..')
const buildDir = path.join(projectDir, 'build')

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

async function prerender() {
  // Use CRA's environment loader so .env.production(.local), .env.local and
  // REACT_APP_* overrides have identical precedence in HTML and browser code.
  const { raw } = require('react-scripts/config/env')('')
  const workingDir = path.join(projectDir, '.seo-build')
  await fs.mkdir(workingDir, { recursive: true })
  const temporaryDir = await fs.mkdtemp(path.join(workingDir, 'render-'))

  try {
    const bundlePath = path.join(temporaryDir, 'renderer.cjs')
    await esbuild.build({
      absWorkingDir: projectDir,
      entryPoints: ['src/prerender.jsx'],
      outfile: bundlePath,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node18',
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.css': 'empty' },
      define: { 'process.env': JSON.stringify(raw) },
      logLevel: 'warning',
    })

    const { getPublicRoutes, getPageSeo, renderSeoHead, renderPage, SEO_CONFIG } = require(bundlePath)
    const originalTemplate = await fs.readFile(path.join(buildDir, 'index.html'), 'utf8')
    const rootPattern = /<div\b[^>]*\bid=["']root["'][^>]*>\s*<\/div>/i
    if (!rootPattern.test(originalTemplate)) {
      throw new Error('Expected a fresh CRA HTML shell. Run npm run build to regenerate the client bundle first.')
    }

    // These are known placeholders in public/index.html, not user-supplied HTML.
    // Replace them rather than adding a second title/description/robots tag.
    const template = originalTemplate
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta\b[^>]*\bname=["'](?:description|robots)["'][^>]*>/gi, '')

    const makeDocument = (pathname) => template
      .replace(/<\/head>/i, () => `${renderSeoHead(getPageSeo(pathname))}\n</head>`)
      .replace(rootPattern, () => `<div id="root" data-prerendered-path="${escapeHtml(pathname)}">${renderPage(pathname)}</div>`)

    const routes = getPublicRoutes()
    if (!routes.length || new Set(routes).size !== routes.length) {
      throw new Error('The public route registry must contain unique routes.')
    }

    for (const route of routes) {
      if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route)) {
        throw new Error(`Invalid public route: ${route}`)
      }
      const destination = route === '/'
        ? path.join(buildDir, 'index.html')
        : path.join(buildDir, route.slice(1), 'index.html')
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.writeFile(destination, makeDocument(route))
    }

    await fs.writeFile(path.join(buildDir, '404.html'), makeDocument('/404'))

    const indexedRoutes = SEO_CONFIG.noindex ? [] : routes.filter((route) => !getPageSeo(route).noindex)
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...indexedRoutes.map((route) => `  <url><loc>${escapeHtml(getPageSeo(route).canonical)}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n')

    // Crawlers must be allowed to fetch preview HTML to see its noindex tag.
    // robots.txt controls crawling; it is not used as access control.
    const robots = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      ...(SEO_CONFIG.noindex ? [] : [`Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml`, '']),
    ].join('\n')

    await fs.writeFile(path.join(buildDir, 'sitemap.xml'), sitemap)
    await fs.writeFile(path.join(buildDir, 'robots.txt'), robots)
    await fs.writeFile(path.join(buildDir, 'seo-routes.json'), `${JSON.stringify({
      version: 1,
      siteUrl: SEO_CONFIG.siteUrl || '',
      noindex: SEO_CONFIG.noindex,
      routes,
    }, null, 2)}\n`)

    console.log(`[seo] Prerendered ${routes.length} public pages and a custom 404 page.`)
    console.log(SEO_CONFIG.noindex
      ? '[seo] Preview mode: pages are noindex; sitemap has no URLs. Set REACT_APP_SITE_URL and REACT_APP_SEO_NOINDEX=false for a public release.'
      : `[seo] Canonical origin: ${SEO_CONFIG.siteUrl}. Sitemap contains ${indexedRoutes.length} URLs.`)
  } finally {
    await fs.rm(temporaryDir, { recursive: true, force: true })
  }
}

prerender().catch((error) => {
  console.error(`[seo] Build failed: ${error.message}`)
  process.exitCode = 1
})
