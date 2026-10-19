import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageSeo } from '../seo/metadata'

// Only tags owned by this module are changed. The HTML template uses the same
// marker so prerendered tags are adopted instead of duplicated on hydration.
export function updateSeoHead(metadata) {
  const existing = new Map()
  document.head.querySelectorAll('[data-seo-managed]').forEach((element) => {
    const key = element.getAttribute('data-seo-managed')
    if (existing.has(key)) element.remove()
    else existing.set(key, element)
  })

  metadata.tags.forEach(({ key, tagName, attributes, text = '' }) => {
    let element = existing.get(key)
    existing.delete(key)

    if (element && element.tagName.toLowerCase() !== tagName) {
      element.remove()
      element = null
    }

    const isNew = !element
    if (isNew) element = document.createElement(tagName)
    const nextAttributes = { 'data-seo-managed': key, ...attributes }
    Array.from(element.attributes).forEach(({ name }) => {
      if (!(name in nextAttributes)) element.removeAttribute(name)
    })
    Object.entries(nextAttributes).forEach(([name, value]) => {
      if (element.getAttribute(name) !== value) element.setAttribute(name, value)
    })
    if (element.textContent !== text) element.textContent = text
    if (isNew) document.head.appendChild(element)
  })

  // This also removes canonical, sharing and schema tags on an unknown URL.
  existing.forEach((element) => element.remove())
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    updateSeoHead(getPageSeo(pathname))
  }, [pathname])

  return null
}
