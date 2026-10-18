import { Building, Building2, Factory, FileCheck2, GraduationCap, SquarePlus, Store, Warehouse } from 'lucide-react'
import { clientSectors } from '../../data/clientsData'
import { Accent, Container, SectionBadge } from '../ui'

const icons = {
  commercial: Building2,
  residential: Building,
  strata: Store,
  agedCare: SquarePlus,
  retail: Warehouse,
  schools: GraduationCap,
  industrial: Factory,
  insurance: FileCheck2,
}

function SectorCard({ sector }) {
  const Icon = icons[sector.icon]
  return (
    <li className="flex flex-col rounded-2xl border border-brand-line bg-white p-6 transition-shadow duration-300 hover:shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-skySoft text-brand-sky">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-6 text-[21px] font-semibold leading-snug text-brand-ink">{sector.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">{sector.description}</p>
    </li>
  )
}

export default function ClientSectors() {
  return (
    <section aria-labelledby="sectors-heading" className="bg-white py-16 lg:py-16" id="sectors">
      <Container wide>
        <div className="mx-auto max-w-4xl text-center">
          <SectionBadge>Clients</SectionBadge>
          <h2
            className="mt-7 text-4xl font-extrabold italic leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="sectors-heading"
          >
            Property maintenance
            <br /> for <Accent>different needs</Accent>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-muted">
            No two properties are the same. We work with property managers, owners and businesses across Melbourne,
            providing practical maintenance and repair solutions to suit the property, the people using it and the work
            required.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clientSectors.map((s) => (
            <SectorCard key={s.title} sector={s} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
