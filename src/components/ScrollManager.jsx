import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the top when the page changes, or to the matching section
// when the link has a hash (e.g. /#services from another page).
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page has rendered before looking for the section
      const id = hash.slice(1)
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
