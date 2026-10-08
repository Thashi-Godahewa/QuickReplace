import { BadgeCheck, Building2, Gauge } from 'lucide-react'
import { trust } from '../../data/aboutData'
import { Container, SectionBadge } from '../ui'

const icons = { portfolio: Building2, sla: Gauge }

export default function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="bg-white py-12" id="client-relationships">
      <Container wide className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <figure className="relative pb-10 lg:col-span-5">
          <img
            alt={trust.imageAlt}
            className="aspect-[476/357] w-full rounded-2xl object-cover shadow-card"
            loading="lazy"
            src={trust.image}
          />
          <figcaption className="absolute inset-x-4 bottom-0 flex items-center gap-3 rounded-lg bg-white px-5 py-3 shadow-card">
            <BadgeCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-sky" />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-brand-ink">{trust.tenure.value}</p>
              <p className="text-[13px] text-brand-ink/75">{trust.tenure.label}</p>
            </div>
            <span className="hidden rounded bg-brand-skySoft px-2 py-0.5 font-mono text-xs text-brand-sky sm:inline">
              {trust.tenure.tag}
            </span>
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <SectionBadge>Client Relationships</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-[42px]" id="trust-heading">
            {trust.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{trust.text}</p>

          <blockquote className="mt-6 rounded-2xl bg-brand-skySoft px-8 py-8">
            <p className="text-2xl font-bold leading-snug tracking-tight text-brand-ink sm:text-[30px]">
              &ldquo;{trust.quote}&rdquo;
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/75">{trust.quoteText}</p>
          </blockquote>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trust.stats.map((s) => {
              const Icon = icons[s.icon]
              return (
                <div className="flex items-center gap-4 rounded-lg border border-brand-line bg-white px-4 py-4 shadow-sm" key={s.label}>
                  <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-sky" />
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm text-brand-ink/75">{s.label}</dt>
                    <dd className="text-lg font-semibold text-brand-ink">{s.value}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </Container>
    </section>
  )
}
