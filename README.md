# Quick Replace — React

React + Create React App (react-scripts) + Tailwind CSS build of the Quick Replace marketing site.

## Stack

- React 18
- Create React App (`react-scripts`)
- Tailwind CSS

## Project structure

```
public/
  index.html          CRA HTML shell (Google Fonts loaded here)
src/
  components/          Section components (added incrementally)
  data/                 Shared content used across components
  App.js                 Assembles all sections
  index.js                React entry point
  index.css                Tailwind directives + base styles
```

## Getting started

```bash
npm install
npm start
```

Runs the dev server at http://localhost:3000.

```bash
npm run build
```

Builds the production bundle into `build/`.

## Pages and routes

| URL | Page | File |
| --- | --- | --- |
| `/` | Home (landing page) | `src/pages/HomePage.jsx` |
| `/services` | Services (all services with search) | `src/pages/ServicesPage.jsx` |
| `/services/:slug` | Service detail (e.g. `/services/painting-plastering`) | `src/pages/ServiceDetailPage.jsx` |
| `/our-work` | Our Work (before & after, FAQ) | `src/pages/OurWorkPage.jsx` |
| `/about` | About Us | `src/pages/AboutPage.jsx` |
| `/clients` | Clients (Who We Serve) | `src/pages/ClientsPage.jsx` |
| `/contact` | Contact Us | `src/pages/ContactPage.jsx` |

Routing uses `react-router-dom` (`BrowserRouter` in `src/App.js`). Inner pages share
`components/PageHero.jsx`. All nav links now open their own page.

When deploying, the host must send every URL to `index.html` (for example a Netlify
`_redirects` rule or a Vercel rewrite), otherwise refreshing `/contact` shows a 404.

Clients page content (sectors, accreditations, case study) lives in `src/data/clientsData.js`.
About Us page content (story, principles, trades, trust stats) lives in `src/data/aboutData.js`.
Our Work page content (projects, filters, FAQ) lives in `src/data/workData.js`.
Services page content (all 16 services, popular searches) lives in `src/data/servicesData.js`.
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
