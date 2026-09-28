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
| `/our-work` | Our Work (before & after, FAQ) | `src/pages/OurWorkPage.jsx` |
| `/about` | About Us | `src/pages/AboutPage.jsx` |
| `/clients` | Clients (Who We Serve) | `src/pages/ClientsPage.jsx` |
| `/contact` | Contact Us | `src/pages/ContactPage.jsx` |

Routing uses `react-router-dom` (`BrowserRouter` in `src/App.js`). Inner pages share
`components/PageHero.jsx`. Nav links that point to `/#section` scroll to that section of the
home page until the matching page is built.

When deploying, the host must send every URL to `index.html` (for example a Netlify
`_redirects` rule or a Vercel rewrite), otherwise refreshing `/contact` shows a 404.

Clients page content (sectors, accreditations, case study) lives in `src/data/clientsData.js`.
About Us page content (story, principles, trades, trust stats) lives in `src/data/aboutData.js`.
Our Work page content (projects, filters, FAQ) lives in `src/data/workData.js`.
Licence numbers, figures and the case study come from the design and need confirming with the client.

The contact form does not send anywhere yet. Connect it in `src/services/enquiry.js`.

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
