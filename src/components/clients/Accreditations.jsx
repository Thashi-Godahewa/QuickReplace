import { BadgeCheck, Building2, Shield, ShieldPlus, UserCog, Zap } from 'lucide-react'
import { accreditations } from '../../data/clientsData'
import { Container } from '../ui'

const icons = {
  shield: Shield,
  building: Building2,
  builder: UserCog,
  energy: Zap,
  iso: BadgeCheck,
  worksafe: ShieldPlus,
}

export default function Accreditations() {
  return (
    <section aria-labelledby="accreditations-heading" className="bg-[#f6f7fc] py-16">
      <Container wide>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-sky">
            Statutory accreditation &amp; industry bodies
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink sm:text-[26px]" id="accreditations-heading">
            Engineered to Exceed Victorian Regulatory Standards
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-muted">
            We maintain full corporate memberships and licensed registrations across every mandatory property and trade
            body in Australia.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {accreditations.map((a) => {
            const Icon = icons[a.icon]
            return (
              <li
                className="flex flex-col items-center justify-center rounded-lg border border-brand-line bg-white px-3 py-6 text-center shadow-sm"
                key={a.title}
              >
                <Icon aria-hidden="true" className="h-8 w-8 text-brand-sky" strokeWidth={1.75} />
                <p className="mt-3 text-[15px] font-semibold text-brand-ink">{a.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-brand-muted">{a.detail}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
