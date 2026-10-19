import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Reuse the HTML generated at build time. A host's custom 404 document may be
// served at any unknown URL, so only hydrate when the document matches the URL.
if (container.dataset.prerenderedPath === window.location.pathname) {
  ReactDOM.hydrateRoot(container, application)
} else {
  ReactDOM.createRoot(container).render(application)
}
