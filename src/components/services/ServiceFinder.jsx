import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, LoaderCircle, Search, Sparkles, X } from 'lucide-react'
import { contact } from '../../data/siteData'
import { allServices, popularSearches } from '../../data/servicesData'
import { servicePath } from '../../data/serviceDetails'
import { buildIndex, isConfidentMatch, searchServices } from '../../utils/serviceSearch'
import { loadAiSearch } from '../../utils/aiServiceSearch'
import { Accent, ArrowDot, Container } from '../ui'

// Built once, so typing stays fast
const searchIndex = buildIndex(allServices)

function ServiceCard({ service }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-xl border border-brand-line bg-white shadow-card transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(0,27,51,0.35)]">
      <div className="relative aspect-[382/224] overflow-hidden bg-brand-mist">
        <img
          alt={`${service.title} work by Quick Replace`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          src={`/images/service-${service.slug}.jpg`}
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-9 pt-6">
        <h3 className="text-[22px] font-semibold tracking-tight text-brand-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-muted">{service.description}</p>
        <Link
          className="mt-6 inline-flex items-center gap-2 self-start text-[15px] font-semibold text-brand-sky transition-colors hover:text-brand-skyHover"
          to={servicePath(service.slug)}
        >
          Learn More <span className="sr-only">about {service.title}</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </li>
  )
}

export default function ServiceFinder() {
  const [query, setQuery] = useState('')
  const resultsRef = useRef(null)

  // AI search: 'idle' until someone uses the search box, then 'loading',
  // then 'ready' (or 'failed', which quietly keeps the keyword search)
  const [aiState, setAiState] = useState('idle')
  const aiRank = useRef(null)
  const [aiResult, setAiResult] = useState({ query: '', services: [] })
  // Loading progress shown under the search box
  const [aiProgress, setAiProgress] = useState({ stage: 'downloading', percent: 0 })
  // Shows "Smart search is ready" for a few seconds after loading
  const [justReady, setJustReady] = useState(false)

  const startAi = () => {
    if (aiState !== 'idle') return
    setAiState('loading')
    loadAiSearch(allServices, setAiProgress)
      .then((rank) => {
        aiRank.current = rank
        setAiState('ready')
        setJustReady(true)
      })
      .catch(() => setAiState('failed'))
  }

  useEffect(() => {
    if (!justReady) return undefined
    const timer = setTimeout(() => setJustReady(false), 4000)
    return () => clearTimeout(timer)
  }, [justReady])

  const trimmed = query.trim()
  // Keyword search handles service names and known problems instantly.
  // Anything else ("water dripping through the roof") goes to the AI.
  const confident = useMemo(() => isConfidentMatch(searchIndex, trimmed), [trimmed])
  const keywordResults = useMemo(() => searchServices(searchIndex, trimmed), [trimmed])
  const askAi = trimmed.length >= 3 && !confident

  useEffect(() => {
    if (!askAi || aiState !== 'ready') return undefined
    let cancelled = false
    const timer = setTimeout(() => {
      aiRank
        .current(trimmed)
        .then((services) => {
          if (!cancelled) setAiResult({ query: trimmed, services })
        })
        .catch(() => {})
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [askAi, aiState, trimmed])

  const aiAnswered = askAi && aiState === 'ready' && aiResult.query === trimmed
  const aiThinking = askAi && (aiState === 'loading' || (aiState === 'ready' && !aiAnswered))
  const usingAi = aiAnswered && aiResult.services.length > 0

  // Best match first
  let shown = keywordResults
  if (aiAnswered) shown = aiResult.services

  const scrollToResults = () => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const onSubmit = (e) => {
    e.preventDefault()
    scrollToResults()
  }

  const viewAll = () => {
    setQuery('')
    scrollToResults()
  }

  return (
    <section aria-labelledby="finder-heading" className="bg-brand-mist py-14" id="all-services">
      <Container wide>
        <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card sm:p-8">
          <h2
            className="border-b border-brand-line pb-5 text-3xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-[42px]"
            id="finder-heading"
          >
            Find the <Accent>Right Service</Accent> for Your Property
          </h2>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
            <form className="relative flex-1" onSubmit={onSubmit} role="search">
              <label className="sr-only" htmlFor="service-search">
                Search by service name
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <input
                className="h-12 w-full rounded-lg border border-brand-line bg-brand-mist pl-12 pr-10 text-[15px] text-brand-ink placeholder:text-brand-muted focus:border-brand-sky focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky/25 [&::-webkit-search-cancel-button]:appearance-none"
                id="service-search"
                onChange={(e) => {
                  setQuery(e.target.value)
                  startAi()
                }}
                onFocus={startAi}
                placeholder="Search by service name"
                type="search"
                autoComplete="off"
                value={query}
              />
              {query && (
                <button
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-muted hover:bg-white hover:text-brand-ink"
                  onClick={() => setQuery('')}
                  type="button"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </form>

            <button
              className="group inline-flex h-12 items-center justify-center gap-3 self-start rounded-full bg-brand-navy py-2.5 pl-5 pr-2.5 text-base font-medium text-white shadow-card transition-colors hover:bg-brand-navyLight lg:self-auto"
              onClick={viewAll}
              type="button"
            >
              <span>View All Services</span>
              <ArrowDot />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold text-brand-ink">Popular:</span>
            {popularSearches.map((p) => (
              <button
                className={`rounded-md px-2.5 py-1 text-[13px] transition-colors ${
                  query === p ? 'bg-brand-navy text-white' : 'bg-brand-mist text-brand-ink/75 hover:bg-brand-skySoft hover:text-brand-sky'
                }`}
                key={p}
                onClick={() => setQuery(query === p ? '' : p)}
                type="button"
              >
                {p}
              </button>
            ))}
          </div>

          <div aria-live="polite">
            {aiState === 'loading' && (
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-brand-ink/80">
                <LoaderCircle aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin text-brand-sky" />
                {aiProgress.stage === 'preparing' ? (
                  <span>Almost ready...</span>
                ) : (
                  <>
                    <span>Loading smart search... {aiProgress.percent > 0 && `${aiProgress.percent}%`}</span>
                    <span aria-hidden="true" className="h-1.5 w-32 overflow-hidden rounded-full bg-brand-mist">
                      <span
                        className="block h-full rounded-full bg-brand-sky transition-[width] duration-300"
                        style={{ width: `${Math.max(aiProgress.percent, 4)}%` }}
                      />
                    </span>
                  </>
                )}
              </div>
            )}

            {aiState === 'ready' && (usingAi || aiThinking) && (
              <p className="mt-4 flex items-center gap-2 text-[14px] text-brand-ink/80">
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-sky" />
                {usingAi ? (
                  <span>
                    Smart match: we think this is a job for{' '}
                    <span className="font-semibold text-brand-ink">
                      {aiResult.services.map((s) => s.title).join(' or ')}
                    </span>
                  </span>
                ) : (
                  <span>Finding the right service...</span>
                )}
              </p>
            )}

            {aiState === 'ready' && justReady && !usingAi && !aiThinking && (
              <p className="mt-4 flex items-center gap-2 text-[14px] text-brand-ink/80">
                <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-sky" />
                <span>Smart search is ready. Describe the problem, for example &ldquo;water leaking through the ceiling&rdquo;.</span>
              </p>
            )}
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {shown.length} {shown.length === 1 ? 'service' : 'services'} shown
        </p>

        <div className="scroll-mt-28" ref={resultsRef} />

        {shown.length > 0 || aiThinking ? (
          <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </ul>
        ) : (
          <div className="mx-auto mt-14 max-w-md text-center">
            <p className="text-lg font-semibold text-brand-ink">No services match &ldquo;{query}&rdquo;</p>
            <p className="mt-2 text-[15px] text-brand-muted">
              We may still be able to help. Give us a call on{' '}
              <a className="font-semibold text-brand-sky underline" href={contact.phoneHref}>
                {contact.phone}
              </a>{' '}
              or <Link className="font-semibold text-brand-sky underline" to="/contact">send us an enquiry</Link>.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
