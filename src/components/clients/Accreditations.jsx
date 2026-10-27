import { BadgeCheck, Building2, Shield, ShieldPlus, UserCheck, Zap } from 'lucide-react'
import { accreditations } from '../../data/clientsData'
import { Container, SectionBadge } from '../ui'

const icons = {
  shield: Shield,
  building: Building2,
  police: UserCheck,
  energy: Zap,
  iso: BadgeCheck,
  worksafe: ShieldPlus,
}

export default function Accreditations() {
  return (
    <section aria-labelledby="accreditations-heading" className="bg-white py-16">
      <Container wide>
        <div className="mx-auto max-w-5xl text-center">
          <SectionBadge>Safety &amp; Compliance</SectionBadge>
          <h2
            className="mt-7 text-3xl font-extrabold italic leading-[1.1] tracking-tight text-brand-ink sm:text-4xl lg:text-[44px]"
            id="accreditations-heading"
          >
            We Take Safety and Compliance Seriously
          </h2>
          <p className="mx-auto mt-5 max-w-[880px] text-base leading-relaxed text-brand-muted">
            We know how important it is to have reliable, qualified tradespeople working on your property. That&rsquo;s
            why we check our contractors&rsquo; qualifications, licences and insurance, and arrange additional
            documentation where required.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {accreditations.map((a) => {
            const Icon = icons[a.icon]
            return (
              <li
                className="flex flex-col items-center justify-start rounded-lg border border-brand-line bg-white px-3 py-6 text-center shadow-sm"
                key={a.title}
              >
                <Icon aria-hidden="true" className="h-8 w-8 text-brand-sky" strokeWidth={1.75} />
                <p className="mt-3 text-[15px] font-semibold leading-snug text-brand-ink">{a.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-brand-muted">{a.detail}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
