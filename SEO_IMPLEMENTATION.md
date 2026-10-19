# Quick Replace SEO implementation

Updated: 19 October 2026, Melbourne time.

## What changed

This project uses React 18, Create React App, React Router 6 and an Express enquiry
API. SEO now follows the existing architecture, with complete page HTML generated
at build time. It does not require a framework migration or a running backend
during the build.

The source ZIP is the deliverable. Generated build files and node_modules are not
included. Install dependencies and rebuild after setting the actual public domain.

### Before and after

| Area | Uploaded project | Updated implementation |
| --- | --- | --- |
| Initial page HTML | Empty React root; content appeared after JavaScript ran | Complete HTML for 29 public pages, including all 21 service detail pages |
| Page metadata | Browser titles changed after rendering; one shared description | Unique titles and descriptions in initial HTML and after client navigation |
| Preferred URLs | No canonical tags | Absolute, route-specific canonical URLs from the configured public origin |
| Social sharing | No page-specific card metadata | Open Graph and Twitter card metadata using existing images |
| Structured data | None | Organization, WebSite, WebPage, Service and BreadcrumbList JSON-LD; AboutPage and ContactPage where applicable |
| Discovery | No sitemap or robots file | Generated sitemap.xml and robots.txt on the frontend origin |
| Unknown routes | Homepage fallback, or a service-list redirect | A dedicated not-found page and real HTTP 404 through the included server |
| Map loading | Browser-only map modules loaded with the application | Static coverage information first; interactive map deferred until near the viewport |
| Production serving | Enquiry API only | Optional serving of the complete frontend with correct redirects, statuses and asset caching |

The implementation uses the same React page components for build-time rendering
and browser hydration. Page content remains available without JavaScript; search,
forms, carousels and maps become interactive when JavaScript loads. The main hero
images also receive a high fetch priority.

## Configure the real website

Copy `.env.example` to `.env`, then configure these values:

```dotenv
REACT_APP_SITE_URL=https://your-confirmed-domain.com.au
REACT_APP_SEO_NOINDEX=false
```

Replace the example with the actual public website origin. Include `https://` and
the chosen hostname, such as the preferred www or non-www version. Do not include
a path, query, fragment, username or password. This implementation assumes the
website is deployed at the root of that origin.

The code contains `quickreplace.com.au` as an existing example and email domain.
That is not treated as confirmation of the intended live canonical domain.

These variables are build-time settings. Changing runtime settings alone does
not update the HTML, browser metadata or sitemap. Rebuild and deploy the complete
new build whenever either value changes. CRA's existing environment precedence
is preserved, including `.env.production`, `.env.production.local` and deployment
environment overrides.

### Preview and staging

If `REACT_APP_SITE_URL` is blank, every page is marked `noindex`, URL-based sharing
and schema tags are omitted, and the sitemap contains no URLs.

For a staging deployment with a configured origin, set:

```dotenv
REACT_APP_SEO_NOINDEX=true
```

The generated robots.txt allows pages to be fetched so crawlers can read the
noindex instruction. It excludes the API from crawling. Neither robots.txt nor
noindex is an authentication mechanism.

`npm run preview` adds a noindex HTTP header even when inspecting an otherwise
indexable build. It is a local inspection tool, not the production start command.

## Build and inspect

Use a currently supported Node.js release. This implementation was tested with
Node.js 24.19.0.

```bash
npm ci
npm run build
npm run test:seo
npm run preview
```

Open http://127.0.0.1:4173 after starting the preview. The first two commands do not
need SMTP settings or a running API. The preview also works without SMTP, but it
does not send enquiries. For local development with the enquiry API, retain the
existing `npm run dev` workflow and configure the existing SMTP settings.

`npm run build` runs the existing CRA build followed by the new automatic
`postbuild` script. Use this command rather than invoking react-scripts directly,
which would omit the SEO generation step.

The generated output includes:

```text
build/index.html
build/services/index.html
build/services/plumbing/index.html
build/services/painting-plastering/index.html
build/contact/index.html
build/404.html
build/sitemap.xml
build/robots.txt
build/seo-routes.json
```

Other public routes have the same folder/index.html structure. The route manifest
contains only public routing/configuration information and is used by the server
to distinguish genuine pages from missing URLs. No modification timestamps are
invented for the sitemap.

## Deployment options

### Serve the frontend and enquiry API together

Configure the existing backend settings, including `SMTP_USER`, `SMTP_PASS` and
`ENQUIRY_TO`, and enable frontend serving:

```dotenv
SERVE_FRONTEND=true
```

Build the website, then start the existing server:

```bash
npm ci
npm run build
npm run server
```

Your hosting platform may provide `PORT`. The server also supports `ENQUIRY_PORT`
and otherwise uses port 5000, matching the original project. Connect the real
website domain and HTTPS through the hosting platform or reverse proxy.

Leave `REACT_APP_ENQUIRY_URL` unset for a same-origin deployment so the form uses
`/api/enquiry`. API routes are registered before frontend serving. The existing
enquiry validation, attachments and email behaviour remain in place.

The included route layer returns:

| Request | Response |
| --- | --- |
| An existing public route | Its own prerendered HTML, HTTP 200 |
| `/services/` | HTTP 301 to `/services` |
| `/Services/Plumbing/` | HTTP 301 to `/services/plumbing` |
| `/index.html` | HTTP 301 to `/` |
| `/services/index.html` | HTTP 301 to `/services` |
| An unknown page or service slug | Custom not-found HTML, HTTP 404, noindex |
| `/404.html` directly | HTTP 404, noindex |
| An unknown `/api/...` URL | JSON error, HTTP 404, noindex |

Alias redirects preserve query parameters. The server does not infer trusted
proxy settings or force cross-host redirects. Configure HTTP-to-HTTPS and the
preferred www/non-www hostname at your actual hosting layer.

### Keep the frontend and backend on separate hosts

Build the frontend using the real public origin and the existing enquiry API URL:

```dotenv
REACT_APP_SITE_URL=https://your-confirmed-domain.com.au
REACT_APP_SEO_NOINDEX=false
REACT_APP_ENQUIRY_URL=https://your-api-host.example/api/enquiry
```

Publish the entire `build/` directory on the frontend host. On the backend, retain
the existing SMTP settings and set `ALLOWED_ORIGIN` to the frontend origin. Keep
`SERVE_FRONTEND=false` on an API-only backend.

The frontend host must map extensionless public URLs to their generated
`<route>/index.html` files and return `404.html` with status 404 for unknown routes.
Remove any old catch-all `/* -> /index.html` success rewrite. Configure clean URL
and preferred-host redirects according to that platform's settings. Do not deploy
only the root index.html or place the sitemap solely on the API domain.

The Express deployment path has automated HTTP verification. Platform-specific
static hosting rules remain to be checked against the host you actually use.

## Managing page metadata

`src/seo/metadata.js` is the shared source for metadata and generated public routes.
The eight main pages have their own descriptions and sharing images. Service
metadata is derived from `src/data/serviceDetails.js`, so service pages do not need
a second manually maintained URL list.

When adding a service, add its full detail entry, include it in the relevant
service listing data, provide its image, and rebuild. When adding another main
page, add its React route and main-page SEO entry together. Review the expected
route-count assertions in the tests when intentionally changing the page set.

`src/components/Seo.jsx` updates the same tags after client navigation. Managed
tags use `data-seo-managed`; unrelated head tags are preserved. The former
usePageTitle hook was removed to avoid competing title updates.

Query strings and fragments do not create new canonical URLs. Unknown pages drop
the previous page's canonical, social metadata and structured data. Inline JSON-LD
is escaped safely so stored content cannot close its script tag.

## Business information used

Schema uses the existing displayed business name, legal name, telephone, email,
images and Melbourne service area. It does not introduce a street address,
licence number, opening hours, customer rating or review count.

The original README says that licences, figures and the case study need client
confirmation. Those existing content questions remain open. Full local-business
profile work can follow once the client confirms its public business details and
the appropriate Google Business Profile.

## Verification and remaining launch work

The automated suite contains 17 checks covering route metadata, structured data,
configuration validation, safe escaping, complete generated HTML, sitemap and
robots settings, redirects, real 404 responses, API separation, asset serving and
public internal links, combined frontend/API hosting and clear server startup failures.
The application must be built before running the suite.

The build was checked in both preview mode and with an explicitly configured test
origin. A reserved `.example` domain is used only for tests; it is not a proposed
production URL. Generated test builds are excluded from the deliverable ZIP.

Browser checks also passed in desktop Chromium and at a 390px mobile viewport:

- Service content and canonical metadata remain available with JavaScript disabled.
- Direct unknown service URLs return a visible HTTP 404 page without JavaScript.
- Hydration and client navigation update titles, canonicals and schema without
  duplicate tags or React hydration errors.
- Service search and links to service detail pages remain functional.
- The deferred map module loads near the viewport and the postcode checker
  correctly responds to the existing 3032 coverage data.
- A client-side unknown service route removes old canonical/schema tags and shows
  the not-found UI; returning home restores the correct metadata.
- Mobile navigation and the contact page work without horizontal overflow.

External map tiles, external font delivery and the optional downloaded AI search
model were excluded from the local browser check. Live SMTP delivery was not
attempted. Automated backend checks use placeholder credentials and GET requests
only, with no enquiry submission or outgoing email.

The only added project dependency is the esbuild development/build tool, pinned
in package.json and package-lock.json. Existing dependency versions were preserved.

Before launch:

1. Confirm the canonical public domain and the frontend hosting platform.
2. Set the production build variables, rebuild, and publish the entire build.
3. Check direct requests to the homepage, a service page, contact page, sitemap,
   robots file and a deliberately nonexistent URL on the live host.
4. Confirm production pages have an indexable robots meta tag and no conflicting
   noindex HTTP header from the hosting platform.
5. Verify the domain in Google Search Console and submit the public `/sitemap.xml`.
6. Inspect representative live URLs in Search Console and validate applicable
   structured data with Google's Rich Results Test.
7. Verify real enquiry delivery using the client's configured SMTP account.

Source changes and local verification do not establish live Google indexing,
search rankings, measured field Core Web Vitals or successful SMTP delivery.
Those checks require the deployed website and, where applicable, account access.

## Technical references

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: blocking indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [React: renderToString](https://react.dev/reference/react-dom/server/renderToString)
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [esbuild: build API](https://esbuild.github.io/api/)
