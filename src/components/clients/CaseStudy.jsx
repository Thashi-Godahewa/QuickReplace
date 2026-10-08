import { caseStudy } from '../../data/clientsData'
import { Container } from '../ui'

export default function CaseStudy() {
  return (
    <section aria-labelledby="case-study-heading" className="bg-[#f1f3fd] py-10">
      <Container wide>
        <article className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-white p-6 shadow-card sm:p-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <figure className="relative h-80 overflow-hidden sm:h-auto sm:aspect-[534/384] rounded-2xl bg-brand-navy shadow-card">
              <img alt={caseStudy.imageAlt} className="h-full w-full object-cover" loading="lazy" src={caseStudy.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2f6b]/90 via-[#1b2f6b]/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded bg-brand-sky px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-white">
                  {caseStudy.badge}
                </span>
                <p className="mt-2 text-xl font-semibold leading-snug text-white sm:text-[22px]">{caseStudy.title}</p>
                <p className="mt-1 text-sm text-white/80">{caseStudy.subtitle}</p>
              </figcaption>
            </figure>
            <dl className="mt-4 grid grid-cols-3 gap-3">
              {caseStudy.stats.map((s) => (
                <div className="flex flex-col-reverse rounded-lg bg-[#eef0fb] px-2 py-3 text-center" key={s.label}>
                  <dt className="text-[11px] leading-tight text-brand-ink/80 sm:text-xs">{s.label}</dt>
                  <dd className="text-lg font-semibold text-brand-sky sm:text-xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-sky">{caseStudy.label}</p>
            <blockquote className="mt-3">
              <p className="text-2xl font-bold leading-snug tracking-tight text-brand-ink sm:text-[30px]" id="case-study-heading">
                &quot;{caseStudy.quote}&quot;
              </p>
            </blockquote>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-muted">
              {caseStudy.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}
