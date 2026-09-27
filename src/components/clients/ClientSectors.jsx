import { Building, Building2, GraduationCap, Hotel, SquarePlus, Store, Warehouse } from 'lucide-react'
import { clientSectors } from '../../data/clientsData'
import { Container, SectionBadge } from '../ui'

const icons = {
  commercial: Building2,
  residential: Building,
  strata: Hotel,
  agedCare: SquarePlus,
  retail: Store,
  schools: GraduationCap,
  industrial: Warehouse,
}

function SectorCard({ sector }) {
  const Icon = icons[sector.icon]
  return (
    <li className="flex flex-col rounded-2xl border border-brand-line bg-white p-6 transition-shadow duration-300 hover:shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-skySoft text-brand-sky">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-6 text-[21px] font-semibold leading-snug text-brand-ink">{sector.title}</h3>
      <p className="mt-3 text-[13px] font-semibold text-[#0b5f8a]">{sector.tags}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-brand-muted">{sector.description}</p>
    </li>
  )
}

export default function ClientSectors() {
  const firstRow = clientSectors.slice(0, 4)
  const secondRow = clientSectors.slice(4)

  return (
    <section aria-labelledby="sectors-heading" className="bg-white py-16 lg:py-16" id="sectors">
      <Container wide>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Clients</SectionBadge>
          <h2
            className="mt-7 text-4xl font-extrabold italic leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="sectors-heading"
          >
            Specialized <span className="font-bold text-brand-sky">Property Sectors</span>
            <br /> under care
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-muted">
            Each property category presents unique operational constraints, security requirements, and occupancy
            thresholds. We provide bespoke service level agreements tailored to each asset profile.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {firstRow.map((s) => (
            <SectorCard key={s.title} sector={s} />
          ))}
        </ul>
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondRow.map((s) => (
            <SectorCard key={s.title} sector={s} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
