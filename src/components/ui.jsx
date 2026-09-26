import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react'

// Shared building blocks used across the landing page sections.

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-12 ${className}`}>{children}</div>
}

export function SectionBadge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-skySoft px-4 py-1.5 text-lg font-medium text-brand-sky sm:text-[22px] ${className}`}
    >
      <Wrench aria-hidden="true" className="h-5 w-5 -scale-x-100" fill="currentColor" strokeWidth={1.5} />
      {children}
    </span>
  )
}

// Italic sky-blue highlight used inside headings
export function Accent({ children }) {
  return <em className="font-bold italic text-brand-sky">{children}</em>
}

export function ArrowDot({ tone = 'dark' }) {
  const styles = tone === 'dark' ? 'bg-white/10 text-white' : 'bg-brand-navy text-white'
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 ${styles}`}
    >
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
    </span>
  )
}

// Navy pill button with the round arrow on the right
export function PillLink({ href, children, className = '' }) {
  return (
    <a
      className={`group inline-flex items-center gap-3 rounded-full bg-brand-navy py-2.5 pl-5 pr-2.5 text-base font-medium text-white shadow-card transition-colors hover:bg-brand-navyLight ${className}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowDot />
    </a>
  )
}

export function CarouselArrows({ onPrev, onNext, prevDisabled, nextDisabled, label }) {
  const base =
    'flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-sky disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-navy'
  return (
    <div className="flex items-center gap-3">
      <button aria-label={`Previous ${label}`} className={base} disabled={prevDisabled} onClick={onPrev} type="button">
        <ArrowLeft aria-hidden="true" className="h-5 w-5" />
      </button>
      <button aria-label={`Next ${label}`} className={base} disabled={nextDisabled} onClick={onNext} type="button">
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  )
}
