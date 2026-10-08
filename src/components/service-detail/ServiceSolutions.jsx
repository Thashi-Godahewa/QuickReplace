import { Droplet, Zap } from 'lucide-react'
import { Container, SectionBadge } from '../ui'

export default function ServiceSolutions({ solutions }) {
  return (
    <section aria-labelledby="solutions-heading" className="bg-white pb-16 pt-6">
      <Container wide>
        <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-brand-line bg-brand-mist p-6 sm:p-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionBadge>{solutions.badge}</SectionBadge>
            <h2 className="mt-10 text-3xl font-bold tracking-tight text-brand-ink sm:text-[34px]" id="solutions-heading">
              {solutions.heading.before} <em className="font-bold italic text-brand-sky">{solutions.heading.accent}</em>{' '}
              {solutions.heading.after}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-brand-muted">{solutions.text}</p>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-brand-line bg-white px-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-skySoft text-brand-sky">
                <Zap aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="text-[13px] leading-snug text-brand-ink/80">
                <strong className="block font-semibold uppercase tracking-wide text-brand-ink/70">{solutions.note.label}</strong>
                {solutions.note.text}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {solutions.items.map((item) => (
              <li className="flex items-center gap-4 rounded-2xl border border-brand-line bg-white px-5 py-5" key={item}>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-skySoft text-brand-sky">
                  <Droplet aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className="text-base font-semibold tracking-tight text-brand-ink sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
