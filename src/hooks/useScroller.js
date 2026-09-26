import { useCallback, useEffect, useRef, useState } from 'react'

// Tracks a horizontally scrolling row so carousel arrows can move it
// by one card and disable themselves at either end.
export default function useScroller() {
  const ref = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return undefined
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = (direction) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width : el.clientWidth * 0.8
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return { ref, atStart, atEnd, prev: () => scrollByCard(-1), next: () => scrollByCard(1) }
}
