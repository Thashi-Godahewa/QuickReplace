import { caseStudy } from '../../data/clientsData'
import { Container, SectionBadge } from '../ui'

export default function CaseStudy() {
  return (
    <section aria-labelledby="case-study-heading" className="bg-white py-10">
      <Container wide>
        <article className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-brand-line/60 bg-white p-6 shadow-card sm:p-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <figure className="relative h-80 overflow-hidden rounded-2xl bg-brand-navy shadow-card sm:aspect-[534/384] sm:h-auto">
              <img alt={caseStudy.imageAlt} className="h-full w-full object-cover" loading="lazy" src={caseStudy.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2f6b]/90 via-[#1b2f6b]/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded bg-brand-sky px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white sm:text-xs">
                  {caseStudy.badge}
                </span>
                <p className="mt-2 text-xl font-semibold leading-snug text-white sm:text-[22px]">{caseStudy.title}</p>
                <p className="mt-1 text-sm text-white/80">{caseStudy.subtitle}</p>
              </figcaption>
            </figure>
            <dl className="mt-4 grid grid-cols-3 gap-3">
              {caseStudy.stats.map((s) => (
                <div className="flex flex-col-reverse justify-end rounded-lg bg-[#eef0fb] px-2 py-3 text-center" key={s.value}>
                  <dt className="mt-0.5 text-[11px] leading-tight text-brand-ink/80 sm:text-xs">{s.label}</dt>
                  <dd className="text-xs font-semibold uppercase leading-tight text-brand-sky sm:text-[15px]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionBadge>{caseStudy.label}</SectionBadge>
            <figure className="mt-8">
              <blockquote>
                <p
                  className="text-2xl font-bold leading-snug tracking-tight text-brand-ink sm:text-[30px]"
                  id="case-study-heading"
                >
                  &quot;{caseStudy.quote}&quot;
                </p>
                <p className="mt-6 text-base leading-relaxed text-brand-muted">&ldquo;{caseStudy.testimonial}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-base font-medium leading-relaxed text-brand-ink/80">
                {caseStudy.author}
                <br />
                {caseStudy.role}
              </figcaption>
            </figure>
          </div>
        </article>
      </Container>
    </section>
  )
}
