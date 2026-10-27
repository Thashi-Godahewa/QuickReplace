import { Building, Building2, House } from 'lucide-react'
import { Container, SectionBadge } from '../ui'

const icons = { home: House, office: Building2, tower: Building }

// Custom icon for the second card on every service page (from the design)
function ResidentialIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 22 22" {...props}>
      <path
        d="M13.75 19.25V11.9167C13.75 11.6736 13.6534 11.4404 13.4815 11.2685C13.3096 11.0966 13.0764 11 12.8333 11H9.16667C8.92355 11 8.69039 11.0966 8.51849 11.2685C8.34658 11.4404 8.25 11.6736 8.25 11.9167V19.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 6.08594H8.5M13.5 6.08594H15M7 10.3359H8.5M13.5 10.3359H15M4.25 1.83594H17.75C18.75 1.83594 19.25 2.33594 19.25 3.33594V19.253H13.25V14.8359H8.75V19.253H2.75V3.33594C2.75 2.33594 3.25 1.83594 4.25 1.83594Z" />
    </svg>
  )
}

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
          {offerings.items.map((item, i) => {
            const Icon = i === 1 ? ResidentialIcon : icons[item.icon] || House
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
