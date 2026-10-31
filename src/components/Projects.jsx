import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import { projectFilters, projects } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

// Seconds each tile takes to scroll past. The loop time grows with the number of
// tiles, so the speed stays the same however many projects are shown.
// Higher = slower.
const SECONDS_PER_TILE = 9

// The design shows no trade filter row on the home page
const SHOW_FILTERS = false

// A trade filter only shows once it has at least this many photos
const MIN_PHOTOS_FOR_FILTER = 4
// Below this many photos, everything goes in one row instead of two
const MIN_PHOTOS_FOR_TWO_ROWS = 8

const photoCount = (filter) => projects.filter((p) => p.category === filter).length

// "All Works" is always shown; trade filters only when they have enough photos
const visibleFilters = projectFilters.filter(
  (f, i) => i === 0 || photoCount(f) >= MIN_PHOTOS_FOR_FILTER,
)

// Repeat the list so each marquee row is always wide enough to loop smoothly
function fillRow(items, minLength = 6) {
  if (items.length === 0) return []
  const out = []
  while (out.length < minLength) out.push(...items)
  return [...out, ...out]
}

// Small WebP copy of each project photo for the carousel tiles, in /public/images/thumbs.
// The full-size photo is only loaded when it is opened in the viewer.
// A new project without a thumbnail falls back to its full-size photo automatically.
function thumbFor(src) {
  return src.replace('/images/', '/images/thumbs/').replace(/\.(jpe?g|png)$/i, '.webp')
}

function TileImage({ project, eager }) {
  const [src, setSrc] = useState(() => thumbFor(project.src))
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      alt={project.alt}
      className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      onError={() => src !== project.src && setSrc(project.src)}
      onLoad={() => setLoaded(true)}
      src={src}
    />
  )
}

function ProjectTile({ project, hidden, onOpen, eager }) {
  return (
    <figure
      aria-hidden={hidden}
      aria-label={hidden ? undefined : `View larger photo: ${project.title}`}
      className="group relative h-[200px] w-[250px] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-brand-mist outline-none focus-visible:ring-2 focus-visible:ring-brand-sky sm:h-[255px] sm:w-[320px]"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      role={hidden ? undefined : 'button'}
      tabIndex={hidden ? -1 : 0}
    >
      <TileImage eager={eager} project={project} />
      <figcaption className="absolute inset-0 flex items-end bg-gradient-to-br from-[#013a5e] to-brand-navy p-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="border-l-2 border-brand-sky pl-3">
          <p className="text-lg font-semibold tracking-tight text-white">{project.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{project.subtitle}</p>
        </div>
      </figcaption>
    </figure>
  )
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 10) / 10))

// Full-screen photo viewer: zoom with the buttons, mouse wheel or a double-click/tap,
// drag to move around a zoomed photo, arrows or swipe to change photo, Esc to close.
function ProjectLightbox({ items, index, onClose, onChange }) {
  const project = items[index]
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef(null)
  const closeRef = useRef(null)

  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange])
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange])

  const setZoomLevel = useCallback((z) => {
    const value = clampZoom(z)
    setZoom(value)
    if (value === 1) setOffset({ x: 0, y: 0 })
  }, [])

  // Start each photo un-zoomed, and fetch the photos either side so arrows feel instant
  useEffect(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    const neighbours = [index - 1, index + 1]
    neighbours.forEach((i) => {
      const item = items[(i + items.length) % items.length]
      if (item) new Image().src = item.src
    })
  }, [index, items])

  // Keyboard controls, stop the page scrolling behind, and return focus when closed
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      if (previousFocus && previousFocus.focus) previousFocus.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === '+' || e.key === '=') setZoomLevel(zoom + 0.5)
      else if (e.key === '-') setZoomLevel(zoom - 0.5)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, onClose, prev, setZoomLevel, zoom])

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, startX: e.clientX, ox: offset.x, oy: offset.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current || zoom === 1) return
    setOffset({ x: drag.current.ox + (e.clientX - drag.current.x), y: drag.current.oy + (e.clientY - drag.current.y) })
  }
  const onPointerUp = (e) => {
    // A quick sideways swipe on an un-zoomed photo changes the photo
    if (drag.current && zoom === 1) {
      const dx = e.clientX - drag.current.startX
      if (dx > 60) prev()
      else if (dx < -60) next()
    }
    drag.current = null
  }

  const iconButton =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10'

  return (
    <div
      aria-label={`${project.title} photo`}
      aria-modal="true"
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm"
      role="dialog"
    >
      {/* Top bar: counter, zoom controls, close */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6">
        <p className="text-sm text-white/70">
          {index + 1} / {items.length}
        </p>
        <div className="flex items-center gap-2">
          <button aria-label="Zoom out" className={iconButton} disabled={zoom <= MIN_ZOOM} onClick={() => setZoomLevel(zoom - 0.5)} type="button">
            <ZoomOut aria-hidden="true" className="h-5 w-5" />
          </button>
          <span className="w-12 text-center text-sm tabular-nums text-white/80">{Math.round(zoom * 100)}%</span>
          <button aria-label="Zoom in" className={iconButton} disabled={zoom >= MAX_ZOOM} onClick={() => setZoomLevel(zoom + 0.5)} type="button">
            <ZoomIn aria-hidden="true" className="h-5 w-5" />
          </button>
          <button aria-label="Close" className={`${iconButton} ml-2`} onClick={onClose} ref={closeRef} type="button">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Photo area. Clicking the dark space around the photo closes the viewer. */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-16"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onWheel={(e) => setZoomLevel(zoom + (e.deltaY < 0 ? 0.25 : -0.25))}
      >
        <img
          alt={project.alt}
          className={`relative max-h-full max-w-full select-none object-contain transition-transform duration-150 ${
            zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          draggable={false}
          onDoubleClick={() => setZoomLevel(zoom > 1 ? 1 : 2)}
          onPointerCancel={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          src={project.src}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, touchAction: 'none' }}
        />

        {items.length > 1 && (
          <>
            <button
              aria-label="Previous photo"
              className={`${iconButton} absolute left-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
              onClick={prev}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6" />
            </button>
            <button
              aria-label="Next photo"
              className={`${iconButton} absolute right-3 top-1/2 hidden -translate-y-1/2 sm:flex`}
              onClick={next}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Description */}
      <div className="px-4 pb-6 pt-4 sm:px-6">
        <div className="mx-auto max-w-3xl border-l-2 border-brand-sky pl-4">
          <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">{project.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/75 sm:text-base">{project.subtitle}</p>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-xs text-white/50">
          Double-click or use the zoom buttons to zoom, drag to move around. Swipe or use the arrows for the next photo.
        </p>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState(projectFilters[0])
  // Position in `filtered` of the photo open in the viewer, or null when closed
  const [openIndex, setOpenIndex] = useState(null)

  // The rows move sideways, so the browser's lazy loading can leave tiles blank as they
  // slide in. Once the section is close to the screen, load every thumbnail straight away.
  const sectionRef = useRef(null)
  const [nearScreen, setNearScreen] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el || nearScreen) return undefined
    if (!('IntersectionObserver' in window)) {
      setNearScreen(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNearScreen(true)
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [nearScreen])

  const filtered = useMemo(
    () => (filter === projectFilters[0] ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  // With enough photos, split them between the two rows (alternating), so the same
  // photo never shows in both rows. Otherwise use one row. A row can still repeat
  // its own photos to fill the width.
  const twoRows = filtered.length >= MIN_PHOTOS_FOR_TWO_ROWS
  const rowOne = fillRow(twoRows ? filtered.filter((_, i) => i % 2 === 0) : filtered)
  const rowTwo = twoRows ? fillRow(filtered.filter((_, i) => i % 2 === 1)) : []
  // Each row holds its tiles twice, so one loop is half the row
  const speedFor = (row) => ({ animationDuration: `${(row.length / 2) * SECONDS_PER_TILE}s` })

  return (
    <section aria-labelledby="projects-heading" className="border-b border-brand-line bg-white py-16 lg:py-11" id="projects" ref={sectionRef}>
      <Container>
        <div className="text-center">
          <SectionBadge>Our Work</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="projects-heading">
            <Accent>Projects</Accent> we have done
          </h2>
        </div>

        {/* Trade filter buttons are hidden to match the design. Set SHOW_FILTERS to true to bring them back. */}
        {SHOW_FILTERS && (
          <div
            aria-label="Filter projects by trade"
            className="no-scrollbar -mx-6 mt-14 flex gap-3 overflow-x-auto px-6 lg:mx-0 lg:justify-center lg:px-1"
            role="group"
          >
            {visibleFilters.map((f) => (
              <button
                aria-pressed={filter === f}
                className={`shrink-0 rounded-full border px-5 py-2 text-[15px] transition-colors ${
                  filter === f
                    ? 'border-brand-navy bg-brand-navy font-semibold text-white'
                    : 'border-brand-line bg-white text-brand-ink hover:border-brand-sky hover:text-brand-sky'
                }`}
                key={f}
                onClick={() => setFilter(f)}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </Container>

      {filtered.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-6 text-center text-brand-muted">
          We are adding photos for {filter.toLowerCase()} jobs soon. Get in touch to see recent examples.
        </p>
      ) : (
        <div className={`mx-auto ${SHOW_FILTERS ? 'mt-8' : 'mt-14'} max-w-7xl space-y-6 px-6 lg:px-12`}>
          <div className="edge-fade marquee-pause overflow-hidden">
            <div className="flex w-max animate-marquee-slow gap-6" key={`one-${filter}`} style={speedFor(rowOne)}>
              {rowOne.map((p, i) => (
                <ProjectTile
                  eager={nearScreen}
                  hidden={i >= rowOne.length / 2}
                  key={`${p.src}-${i}`}
                  onOpen={() => setOpenIndex(filtered.indexOf(p))}
                  project={p}
                />
              ))}
            </div>
          </div>
          {rowTwo.length > 0 && (
            <div className="edge-fade marquee-pause overflow-hidden">
              <div className="flex w-max animate-marquee-reverse gap-6" key={`two-${filter}`} style={speedFor(rowTwo)}>
                {rowTwo.map((p, i) => (
                  <ProjectTile
                    eager={nearScreen}
                    hidden={i >= rowTwo.length / 2}
                    key={`${p.src}-${i}`}
                    onOpen={() => setOpenIndex(filtered.indexOf(p))}
                    project={p}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {openIndex !== null && filtered[openIndex] && (
        <ProjectLightbox
          index={openIndex}
          items={filtered}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}
