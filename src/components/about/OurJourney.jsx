import { useState } from 'react'
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, ShieldCheck, Wrench, Users } from 'lucide-react'
import { journey } from '../../data/aboutData'
import { Accent, Container, SectionBadge } from '../ui'

// Icons for the three highlights at the bottom of each milestone card
const highlightIcons = [MapPin, Wrench, Users]

export default function OurJourney() {
  const [active, setActive] = useState(0)
  const milestone = journey[active]
  const count = journey.length
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section aria-labelledby="journey-heading" className="bg-white py-16 lg:py-20" id="our-journey">
      <Container wide>
        <SectionBadge>Our Journey</SectionBadge>
        <h2
          className="mt-8 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-brand-ink sm:text-[46px]"
          id="journey-heading"
        >
          From single trade specialist to Victoria&rsquo;s <Accent>Multi-trade Authority</Accent>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
          Over a decade and a half of relentless standards, expanding fleet capabilities, and pioneering single-desk
          accountability across Melbourne.
        </p>

        {/* Timeline */}
        <div className="relative mt-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-5 h-0.5 bg-brand-navy/80" />
          <ol className="relative grid grid-cols-5 gap-2">
            {journey.map((m, i) => {
              const isActive = i === active
              const align = i === 0 ? 'items-start text-left' : i === count - 1 ? 'items-end text-right' : 'items-center text-center'
              return (
                <li className={`flex flex-col ${align}`} key={m.year}>
                  <button
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`${m.year}: ${m.title}`}
                    className={`flex h-10 w-12 items-center justify-center rounded-full text-sm font-medium transition-colors sm:w-14 ${
                      isActive ? 'bg-brand-sky text-white shadow-glow' : 'bg-[#e8f1fd] text-brand-ink hover:bg-brand-skySoft'
                    }`}
                    onClick={() => setActive(i)}
                    type="button"
                  >
                    {m.year}
                  </button>
                  <span
                    className={`mt-2 hidden max-w-[9rem] text-sm leading-snug sm:block ${isActive ? 'font-medium text-brand-sky' : 'text-brand-ink/80'}`}
                  >
                    {m.label}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Milestone card */}
        <article
          aria-live="polite"
          className="mt-10 grid grid-cols-1 gap-8 rounded-2xl bg-gradient-to-br from-[#073a5c] to-brand-footer px-6 py-8 text-white shadow-card sm:px-12 sm:py-12 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-brand-sky px-4 py-1 text-lg font-semibold">{milestone.year}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-sky">
                <BadgeCheck aria-hidden="true" className="h-4 w-4" />
                Milestone {pad(active + 1)}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-[30px]">{milestone.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{milestone.text}</p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/30 pt-5 text-sm sm:text-[15px]">
              {milestone.highlights.map((h, i) => {
                const Icon = highlightIcons[i] || BadgeCheck
                return (
                  <li className={`flex items-center gap-1.5 ${i === 0 ? 'font-medium text-brand-sky' : 'text-white'}`} key={h}>
                    {i > 0 && <span aria-hidden="true" className="mr-2.5 h-1 w-1 rounded-full bg-white/60" />}
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-sky" />
                    {h}
                  </li>
                )
              })}
            </ul>
          </div>

          <aside className="self-center rounded-xl bg-[#eef3fd] px-6 py-6 text-brand-ink lg:col-span-4">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-sky">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              {milestone.boxLabel}
            </p>
            <p className="mt-4 text-lg font-semibold italic leading-snug">&ldquo;{milestone.boxQuote}&rdquo;</p>
          </aside>
        </article>

        {/* Pager */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-ink">
              Milestone <span className="text-brand-sky">{pad(active + 1)}</span> / {pad(count)}
            </p>
            <div aria-hidden="true" className="flex items-center gap-1.5">
              {journey.map((m, i) => (
                <span
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-brand-sky' : 'w-1.5 bg-brand-line'}`}
                  key={m.year}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous milestone"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-sky disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-navy"
              disabled={active === 0}
              onClick={() => setActive((a) => a - 1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label="Next milestone"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-sky disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-navy"
              disabled={active === count - 1}
              onClick={() => setActive((a) => a + 1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
