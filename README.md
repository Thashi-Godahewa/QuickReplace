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

## Page sections (in order)

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
