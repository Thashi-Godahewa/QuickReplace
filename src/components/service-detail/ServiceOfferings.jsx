import { Building, Building2, House } from 'lucide-react'
import { Container, SectionBadge } from '../ui'

const icons = { home: House, office: Building2, tower: Building }

export default function ServiceOfferings({ offerings }) {
  return (
    <section aria-labelledby="offerings-heading" className="bg-white py-14" id="offerings">
      <Container wide>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Our Services</SectionBadge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[50px]" id="offerings-heading">
            {offerings.heading.before}{' '}
            <em className="font-bold italic text-brand-sky">{offerings.heading.accent}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-brand-muted">{offerings.intro}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.items.map((item) => {
            const Icon = icons[item.icon] || House
            return (
              <li className="flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 transition-shadow hover:shadow-card" key={item.title}>
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy text-brand-sky shadow-card">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-lg font-semibold leading-snug text-brand-ink">{item.title}</h3>
                <p className="mt-1 text-[13px] font-medium uppercase tracking-wide text-brand-sky">{item.tag}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
