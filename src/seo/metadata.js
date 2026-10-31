import { serviceDetails } from '../data/serviceDetails'
import { contact } from '../data/siteData'

const SITE_NAME = 'Quick Replace'

// A production origin is an explicit deployment setting, never inferred from
// an email address or the browser's current hostname.
function readSiteUrl(value) {
  const configured = (value || '').trim()
  if (!configured) return null

  let url
  try {
    url = new URL(configured)
  } catch {
    throw new Error('REACT_APP_SITE_URL must be an HTTP(S) origin, for example https://your-domain.com.')
  }

  if (
    !/^https?:$/.test(url.protocol) ||
    !/^https?:\/\/[^/?#\\\s]+\/?$/i.test(configured) ||
    url.username || url.password ||
    url.pathname !== '/' || url.search || url.hash
  ) {
    throw new Error('REACT_APP_SITE_URL must contain only an HTTP(S) origin, without credentials, a path, query or fragment.')
  }

  return url.origin
}

const siteUrl = readSiteUrl(process.env.REACT_APP_SITE_URL)

export const SEO_CONFIG = Object.freeze({
  siteUrl,
  noindex: !siteUrl || String(process.env.REACT_APP_SEO_NOINDEX).trim().toLowerCase() === 'true',
  siteName: SITE_NAME,
})

const mainPages = [
  {
    path: '/',
    label: 'Home',
    type: 'home',
    title: 'Property Maintenance & Building Repairs Melbourne',
    description: 'Quick Replace provides property maintenance, building repairs and emergency make-safe services across Melbourne for property managers, real estate agencies, strata managers and commercial properties.',
    image: '/images/hero-team.jpg',
    imageAlt: 'The Quick Replace team in uniform beside their work vans',
  },
  {
    path: '/services',
    label: 'Services',
    type: 'listing',
    title: 'Property Maintenance Services Melbourne',
    description: 'Explore plumbing, electrical, glazing, painting, carpentry and other property maintenance services coordinated by Quick Replace across Melbourne.',
    image: '/images/services-hero.jpg',
    imageAlt: 'Quick Replace property maintenance services',
  },
  {
    path: '/our-work',
    label: 'Our Work',
    type: 'listing',
    title: 'Our Property Repairs & Maintenance Work Melbourne',
    description: 'Explore Quick Replace repair and maintenance projects across Melbourne, with photos showing property problems, completed work and the finished results.',
    image: '/images/our-work-hero.jpg',
    imageAlt: 'Glazier fitting a large glass panel to a commercial building shopfront',
  },
  {
    path: '/about',
    label: 'About Us',
    type: 'about',
    title: 'About Our Melbourne Property Maintenance Team',
    description: 'Meet Quick Replace, a Melbourne property maintenance team coordinating multiple trades through one contact, with clear communication from start to finish.',
    image: '/images/contact-hero-team.jpg',
    imageAlt: 'The Quick Replace team standing outside a commercial building',
  },
  {
    path: '/clients',
    label: 'Clients',
    type: 'listing',
    title: 'Property Maintenance for Managers, Owners & Businesses',
    description: 'Quick Replace coordinates Melbourne property repairs and maintenance for property managers, owners, businesses, strata managers and aged care facilities.',
    image: '/images/clients-hero.jpg',
    imageAlt: 'Quick Replace technicians inspecting water damage on a ceiling',
  },
  {
    path: '/contact',
    label: 'Contact Us',
    type: 'contact',
    title: 'Contact Us for Property Repairs in Melbourne',
    description: 'Contact Quick Replace to discuss a Melbourne property repair or maintenance job. Send your enquiry, describe the problem and request a quote from the team.',
    image: '/images/contact-hero-meeting.jpg',
    imageAlt: 'Quick Replace staff in hi-vis vests planning a job around a meeting table',
  },
  {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    type: 'legal',
    title: 'Privacy Policy',
    description: 'Read the Quick Replace privacy policy, including how personal information is collected and used, security practices and how to make a privacy enquiry.',
    image: '/images/privacy-hero.jpg',
    imageAlt: 'The Quick Replace team outside a residential apartment building',
  },
  {
    path: '/terms-and-conditions',
    label: 'Terms & Conditions',
    type: 'legal',
    title: 'Terms & Conditions',
    description: 'Read the Quick Replace terms and conditions for property maintenance services, including service terms and contact details for enquiries and complaints.',
    image: '/images/privacy-hero.jpg',
    imageAlt: 'The Quick Replace team outside a residential apartment building',
  },
]

// Adding a detail entry creates its SEO metadata and prerender/sitemap route.
const servicePages = Object.entries(serviceDetails).map(([slug, service]) => ({
  path: `/services/${slug}`,
  label: service.title,
  type: 'service',
  serviceSlug: slug,
  title: service.pageTitle,
  description: service.hero.description,
  image: service.hero.image,
  imageAlt: service.hero.imageAlt,
}))

const pages = new Map([...mainPages, ...servicePages].map((page) => [page.path, page]))

export function getPublicRoutes() {
  return [...pages.keys()]
}

function normalizePath(pathname) {
  const path = String(pathname || '/').split(/[?#]/)[0]
  return path === '/' ? '/' : path.replace(/\/+$/, '')
}

function buildStructuredData(page, canonical, image) {
  const homeUrl = `${siteUrl}/`
  const organizationId = `${homeUrl}#organization`
  const websiteId = `${homeUrl}#website`
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      legalName: 'Quick Replace Pty Ltd',
      url: homeUrl,
      logo: `${siteUrl}/images/quick-replace-logo.png`,
      telephone: contact.phone,
      email: contact.email,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: homeUrl,
      publisher: { '@id': organizationId },
      inLanguage: 'en-AU',
    },
  ]

  const pageSchema = {
    '@type': page.type === 'about' ? 'AboutPage' : page.type === 'contact' ? 'ContactPage' : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    isPartOf: { '@id': websiteId },
    inLanguage: 'en-AU',
  }

  if (page.path !== '/') {
    const crumbs = [{ name: 'Home', item: homeUrl }]
    if (page.type === 'service') crumbs.push({ name: 'Services', item: `${siteUrl}/services` })
    crumbs.push({ name: page.label, item: canonical })
    pageSchema.breadcrumb = { '@id': `${canonical}#breadcrumb` }
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })),
    })
  }

  if (page.type === 'service') {
    pageSchema.mainEntity = { '@id': `${canonical}#service` }
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.title,
      serviceType: page.label,
      description: page.description,
      url: canonical,
      provider: { '@id': organizationId },
      areaServed: { '@type': 'City', name: 'Melbourne' },
      ...(image ? { image: image.url } : {}),
    })
  }

  graph.push(pageSchema)
  return { '@context': 'https://schema.org', '@graph': graph }
}

const meta = (key, value, property = false) => ({
  key,
  tagName: 'meta',
  attributes: { [property ? 'property' : 'name']: key, content: value },
})

// Escape JSON for inline script context, including a literal </script> in text.
function serializeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}

export function getPageSeo(pathname) {
  const path = normalizePath(pathname)
  const page = pages.get(path)
  const isNotFound = !page
  const noindex = SEO_CONFIG.noindex || isNotFound
  const title = `${page ? page.title : 'Page Not Found'} | ${SITE_NAME}`
  const description = page ? page.description : 'This Quick Replace page could not be found. Explore our property maintenance services or contact our team for help.'
  const robots = noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
  const canonical = noindex ? null : `${siteUrl}${page.path}`
  const image = canonical && page.image ? { url: `${siteUrl}${page.image}`, alt: page.imageAlt } : null
  const structuredData = canonical ? buildStructuredData(page, canonical, image) : null
  const tags = [
    { key: 'title', tagName: 'title', attributes: {}, text: title },
    meta('description', description),
    meta('robots', robots),
  ]

  if (canonical) {
    tags.push(
      { key: 'canonical', tagName: 'link', attributes: { rel: 'canonical', href: canonical } },
      meta('og:type', 'website', true),
      meta('og:site_name', SITE_NAME, true),
      meta('og:locale', 'en_AU', true),
      meta('og:title', title, true),
      meta('og:description', description, true),
      meta('og:url', canonical, true),
      meta('twitter:card', image ? 'summary_large_image' : 'summary'),
      meta('twitter:title', title),
      meta('twitter:description', description),
    )
    if (image) {
      tags.push(
        meta('og:image', image.url, true),
        meta('og:image:alt', image.alt, true),
        meta('twitter:image', image.url),
        meta('twitter:image:alt', image.alt),
      )
    }
    tags.push({ key: 'structured-data', tagName: 'script', attributes: { type: 'application/ld+json' }, text: serializeJson(structuredData) })
  }

  return {
    pathname: path,
    route: page ? { path: page.path, label: page.label, type: page.type, ...(page.serviceSlug ? { serviceSlug: page.serviceSlug } : {}) } : null,
    isNotFound, noindex, title, description, robots, canonical, image, structuredData, tags,
  }
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// The build script and the browser updater consume the exact same tag model.
export function renderSeoHead(metadata) {
  return metadata.tags.map(({ key, tagName, attributes, text = '' }) => {
    const attrs = Object.entries({ 'data-seo-managed': key, ...attributes })
      .map(([name, value]) => `${name}="${escapeHtml(value)}"`).join(' ')
    if (tagName === 'meta' || tagName === 'link') return `<${tagName} ${attrs} />`
    return `<${tagName} ${attrs}>${tagName === 'script' ? text : escapeHtml(text)}</${tagName}>`
  }).join('\n')
}
