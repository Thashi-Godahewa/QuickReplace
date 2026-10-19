import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppContent } from './App'

export { getPageSeo, getPublicRoutes, renderSeoHead, SEO_CONFIG } from './seo/metadata'

export function renderPage(pathname) {
  return renderToString(
    <StaticRouter location={pathname}>
      <AppContent />
    </StaticRouter>,
  )
}
