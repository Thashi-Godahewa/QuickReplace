import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpDown, Phone, Search, X } from 'lucide-react'
import { contact } from '../../data/siteData'
import { allServices, popularSearches } from '../../data/servicesData'
import { servicePath } from '../../data/serviceDetails'
import { Accent, Container } from '../ui'

const SORTS = [
  { id: 'default', label: 'Sort by' },
  { id: 'az', label: 'A - Z' },
  { id: 'za', label: 'Z - A' },
]

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
        {service.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-brand-ink/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {service.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6">
        <h3 className="text-[22px] font-semibold tracking-tight text-brand-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-muted">{service.description}</p>
      </div>
      <div className="mt-5 border-t border-brand-line bg-brand-mist/60 px-6 pb-6 pt-3">
        <Link
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-sky transition-colors hover:text-brand-skyHover"
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
  const [sort, setSort] = useState('default')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? allServices.filter((s) => `${s.title} ${s.description}`.toLowerCase().includes(q))
      : [...allServices]
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'za') list.sort((a, b) => b.title.localeCompare(a.title))
    return list
  }, [query, sort])

  const nextSort = () => {
    const i = SORTS.findIndex((s) => s.id === sort)
    setSort(SORTS[(i + 1) % SORTS.length].id)
  }
  const sortLabel = SORTS.find((s) => s.id === sort).label

  return (
    <section aria-labelledby="finder-heading" className="bg-brand-mist py-14" id="all-services">
      <Container wide>
        <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card sm:p-8">
          <h2
            className="border-b border-brand-line pb-5 text-3xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-[42px]"
            id="finder-heading"
          >
            Explore our comprehensive
            <br />
            <Accent>Quick Fix</Accent> solutions
          </h2>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <label className="sr-only" htmlFor="service-search">
                Search by service name
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <input
                className="h-12 w-full rounded-lg border border-brand-line bg-brand-mist pl-12 pr-10 text-[15px] text-brand-ink placeholder:text-brand-muted focus:border-brand-sky focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky/25"
                id="service-search"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by service name"
                type="search"
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
            </div>

            <div className="flex items-center gap-3 sm:gap-4 lg:gap-7">
              <button
                aria-label={`Sort services: ${sortLabel === 'Sort by' ? 'default order' : sortLabel}`}
                className={`inline-flex h-12 items-center gap-2 rounded-lg border px-4 text-[15px] transition-colors ${
                  sort === 'default'
                    ? 'border-brand-line bg-brand-mist text-brand-ink/80'
                    : 'border-brand-sky bg-brand-skySoft text-brand-ink'
                }`}
                onClick={nextSort}
                type="button"
              >
                {sortLabel}
                <ArrowUpDown aria-hidden="true" className="h-4 w-4" />
              </button>
              <span className="font-medium text-brand-ink">OR</span>
              <a
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-navy px-5 text-[15px] sm:gap-3 sm:px-7 font-medium text-white transition-colors hover:bg-brand-navyLight lg:flex-none"
                href={contact.phoneHref}
              >
                <Phone aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                {contact.phone}
              </a>
            </div>
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
        </div>

        <p aria-live="polite" className="sr-only">
          {shown.length} {shown.length === 1 ? 'service' : 'services'} shown
        </p>

        {shown.length > 0 ? (
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
