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

## Status

This is the initial project scaffold. Page sections are being added incrementally as separate commits/PRs.
