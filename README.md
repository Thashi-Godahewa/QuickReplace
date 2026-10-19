# Quick Replace: React website with SEO

React + Create React App (react-scripts) + Tailwind CSS build of the Quick Replace marketing site.

The production build now generates complete HTML and individual metadata for all
29 public pages, including 21 service pages. It also creates a sitemap, robots.txt,
structured data, social sharing tags and a real 404 page. The React interface and
Express enquiry API remain in place.

Read [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) for the changes, verified
checks and deployment instructions. Configure `REACT_APP_SITE_URL` before a public
release. Builds without this setting intentionally use `noindex`.

## Stack

- React 18
- Create React App (`react-scripts`)
- Tailwind CSS
- Express 5 and Nodemailer for enquiries
- Build-time React rendering with esbuild, followed by browser hydration

## Project structure

```
public/
  index.html          Development shell and production HTML template
src/
  components/          Section components (added incrementally)
  data/                 Shared content used across components
  seo/                   Route metadata, canonical URLs and structured data
  App.js                 Shared route tree for browser and static rendering
  prerender.jsx          React static rendering entry point
  index.js                React entry point
  index.css                Tailwind directives + base styles
scripts/
  prerender.cjs          Produces route HTML, sitemap, robots and 404 after build
server/
  index.js               Enquiry API; optional production frontend serving
  site.js                Static page serving, canonical redirects and HTTP 404
  preview.js             Local frontend preview without SMTP
tests/
  metadata.test.cjs       SEO metadata and safe configuration tests
  serving.test.cjs        Built HTML, routes, sitemap and HTTP response tests
```

## Getting started

```bash
npm ci
npm start
```

Runs the dev server at http://localhost:3000.

```bash
npm run build
```

Builds the browser bundle into `build/`, then automatically prerenders every public
route. Adding a service detail entry also adds its metadata and generated HTML.

```bash
npm run test:seo
npm run preview
```

The tests require a completed build. Preview runs at http://127.0.0.1:4173 and
always sends `X-Robots-Tag: noindex, follow`. It does not provide the enquiry API
and must not be used as the public production server.

## Pages and routes

| URL | Page | File |
| --- | --- | --- |
| `/` | Home (landing page) | `src/pages/HomePage.jsx` |
| `/services` | Services (all services with search) | `src/pages/ServicesPage.jsx` |
| `/services/:slug` | Service detail (e.g. `/services/painting-plastering`) | `src/pages/ServiceDetailPage.jsx` |
| `/our-work` | Our Work (before & after, FAQ) | `src/pages/OurWorkPage.jsx` |
| `/about` | About Us | `src/pages/AboutPage.jsx` |
| `/clients` | Clients (Who We Work With) | `src/pages/ClientsPage.jsx` |
| `/contact` | Contact Us | `src/pages/ContactPage.jsx` |
| `/privacy-policy` | Privacy Policy | `src/pages/PrivacyPolicyPage.jsx` |
| `/terms-and-conditions` | Terms & Conditions | `src/pages/TermsPage.jsx` |
| Any unknown URL | Page not found, HTTP 404 | `src/pages/NotFoundPage.jsx` |

Routing uses `react-router-dom` (`BrowserRouter` in `src/App.js`). Inner pages share
`components/PageHero.jsx`. All nav links now open their own page.

When deploying, serve each generated page from its own HTML file. For example,
`/contact` must serve `build/contact/index.html`. Unknown URLs must serve
`build/404.html` with HTTP status 404. Do not use a catch-all rewrite to the home
page. The included Express server handles this when `SERVE_FRONTEND=true`.

Clients page content (sectors, accreditations, case study) lives in `src/data/clientsData.js`.
Privacy Policy content (intro and clauses) lives in `src/data/privacyData.js`.
Terms & Conditions content lives in `src/data/termsData.js`.
About Us page content (story, principles, trades, trust stats) lives in `src/data/aboutData.js`.
Our Work page content (projects, FAQ) lives in `src/data/workData.js`.
Services page content (all 21 services, popular searches) lives in `src/data/servicesData.js`.
Service detail pages live in `src/data/serviceDetails.js` - add an entry there to give another service its own page.
Licence numbers, figures and the case study come from the design and need confirming with the client.

## Contact form email

The Contact page form emails each enquiry, with the uploaded photos and videos attached,
through a small Node server in `server/index.js` (Express + Nodemailer, sent via Gmail).

1. Turn on 2-Step Verification on the sending Gmail account, then create an App Password at
   https://myaccount.google.com/apppasswords
2. Copy `.env.example` to `.env` and fill in `SMTP_USER`, `SMTP_PASS` (the app password) and
   `ENQUIRY_TO` (the inbox that receives enquiries). `.env` is git-ignored - never commit it.
3. Run `npm install`, then `npm run dev` to start the React app and the enquiry server together.
   (`npm start` alone runs only the React app, so the form cannot send.)

Limits: up to 5 files, 18MB in total (Gmail rejects emails over 25MB once attachments are encoded).
Accepted: JPG, PNG, HEIC, PDF, MP4, MOV, M4V, WEBM, 3GP.

When deploying, host `server/` on a Node host (for example Render or Railway) with the same `.env`
values plus `ALLOWED_ORIGIN` set to the live site address, and build the React app with
`REACT_APP_ENQUIRY_URL` set to the server's `/api/enquiry` address.

## Home page sections (in order)

| Section | Component | Notes |
| --- | --- | --- |
| Navigation | `Navbar.jsx` | Logo, pill nav, Call Now / Email, mobile menu |
| Hero | `Hero.jsx` + `TradesMarquee.jsx` | Headline, quote card, scrolling trades strip |
| Metrics | `Metrics.jsx` | 4 stats |
| Services | `Services.jsx` | 6 service cards + View All |
| About | `About.jsx` | Text + photo |
| CTA (compact) | `CTA.jsx` (`variant="compact"`) | "Quick Replace is here for you!" |
| Industries | `Industries.jsx` | "Who we work with" carousel |
| Projects | `Projects.jsx` | Trade filters + two scrolling photo rows |
| Reviews | `Testimonials.jsx` + `Clients.jsx` | Review cards + client logos |
| Before & After | `BeforeAfter.jsx` | 3 result cards |
| Service Locator | `ServiceLocator.jsx` | Map + postcode checker |
| CTA (emergency) | `CTA.jsx` (`variant="emergency"`) | Urgent repairs banner |
| Footer | `Footer.jsx` | |

Shared pieces: `components/ui.jsx` (Container, SectionBadge, Accent, PillLink, CarouselArrows) and `hooks/useScroller.js`.

All copy lives in `src/data/siteData.js`. Images live in `public/images/`.
Icons come from `lucide-react`.

## Status

Landing page updated to the September 2026 Figma design (node 764-3027).
