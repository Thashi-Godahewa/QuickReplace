import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

// Leaflet and MapLibre access browser APIs as soon as they are imported. Keep
// those imports in the deferred module so public pages can also render on the
// server. The first client render uses the same coverage section as the server.
export default function ServiceLocator() {
  const containerRef = useRef(null)
  const [MapComponent, setMapComponent] = useState(null)
  const [loadRequest, setLoadRequest] = useState(0)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    const requestMap = () => setLoadRequest((current) => current || 1)

    if (!('IntersectionObserver' in window)) {
      requestMap()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          requestMap()
        }
      },
      { rootMargin: '320px 0px' },
    )
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!loadRequest) return undefined
    let active = true
    setLoadFailed(false)

    import('./ServiceLocatorMap')
      .then(({ default: Component }) => {
        if (active) setMapComponent(() => Component)
      })
      .catch(() => {
        // Keep the coverage text and contact action usable if a chunk fails.
        if (active) setLoadFailed(true)
      })

    return () => {
      active = false
    }
  }, [loadRequest])

  return (
    <div ref={containerRef}>
      {MapComponent ? (
        <MapComponent />
      ) : (
        <section aria-labelledby="locator-heading" className="bg-brand-mist py-16 lg:py-11" id="service-area">
          <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 rounded-3xl border border-brand-line bg-white p-4 sm:p-6 lg:order-1">
              <div className="flex h-[380px] flex-col items-center justify-center rounded-2xl bg-brand-mist px-6 text-center sm:h-[460px] lg:h-[560px]">
                <h3 className="max-w-sm text-xl font-semibold leading-relaxed text-brand-ink">
                  Map of the Quick Replace service area, from Macedon to Frankston and Geelong to Lilydale
                </h3>
                <button
                  className="mt-6 rounded-full bg-brand-navy px-6 py-3 font-medium text-white transition-colors hover:bg-brand-sky disabled:cursor-wait disabled:opacity-70"
                  disabled={loadRequest > 0 && !loadFailed}
                  onClick={() => setLoadRequest((current) => current + 1)}
                  type="button"
                >
                  {loadFailed ? 'Retry service map' : loadRequest ? 'Loading service map...' : 'Load service map'}
                </button>
                {loadFailed && (
                  <p className="mt-4 text-sm text-brand-muted" role="status">
                    The interactive map could not load. Please call us to check your service area.
                  </p>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionBadge>Service Locator</SectionBadge>
              <h2
                className="mt-14 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
                id="locator-heading"
              >
                Do we serve your <br />
                <Accent>Area</Accent>?
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
                Enter your post code to instantly check if you&rsquo;re in our coverage zone. We&rsquo;re expanding regularly
                - if you&rsquo;re close, reach out anyway.
              </p>
              <div className="mt-14 min-h-[168px]">
                <p className="text-xl font-semibold tracking-tight text-brand-ink">Find out your service area</p>
                <p className="mt-5 text-base leading-relaxed text-brand-muted">
                  Call us on{' '}
                  <a className="font-semibold text-brand-ink underline" href={contact.phoneHref}>
                    {contact.phone}
                  </a>{' '}
                  to check your service area.
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
