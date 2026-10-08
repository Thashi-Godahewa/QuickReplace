import { useRef, useState } from 'react'
import { Building2, HeartHandshake, House, Landmark } from 'lucide-react'
import { industries } from '../data/siteData'
import { Accent, CarouselArrows, Container, SectionBadge } from './ui'

const icons = {
  commercial: Building2,
  residential: House,
  strata: Landmark,
  agedCare: HeartHandshake,
}

export default function Industries() {
  const [active, setActive] = useState(1)
  const rowRef = useRef(null)

  const goTo = (index) => {
    const next = (index + industries.length) % industries.length
    setActive(next)
    // On narrow screens the row scrolls, so bring the active card into view
    const row = rowRef.current
    const card = row && row.children[next]
    if (row && card && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: card.offsetLeft - row.offsetLeft, behavior: 'smooth' })
    }
  }

  return (
    <section aria-labelledby="industries-heading" className="border-b border-brand-line bg-white py-16 lg:py-10" id="industries">
      <Container>
        <SectionBadge>Industries</SectionBadge>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="industries-heading">
              <Accent>Who</Accent> we work with
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
              Quick Replace works across diverse industries, adapting maintenance strategies to meet unique operational,
              regulatory, and delivery requirements.
            </p>
          </div>
          <CarouselArrows label="industry" onNext={() => goTo(active + 1)} onPrev={() => goTo(active - 1)} />
        </div>

        <ul className="no-scrollbar mt-16 flex snap-x snap-mandatory overflow-x-auto" ref={rowRef}>
          {industries.map((item, i) => {
            const Icon = icons[item.icon]
            const isActive = i === active
            return (
              <li
                className={`flex w-[78%] shrink-0 snap-start flex-col rounded-2xl border p-8 transition-colors duration-300 sm:w-1/2 lg:w-1/4 ${
                  isActive
                    ? 'border-transparent bg-gradient-to-b from-brand-navyLight to-brand-navy text-white'
                    : 'border-brand-line bg-white text-brand-ink'
                } ${i > 0 ? '-ml-px' : ''}`}
                key={item.title}
                onMouseEnter={() => setActive(i)}
              >
                <span className={`text-xl tracking-wider ${isActive ? 'text-white/80' : 'text-brand-muted/70'}`}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <div className="flex h-[200px] items-center justify-center">
                  <Icon
                    aria-hidden="true"
                    className={`h-16 w-16 ${isActive ? 'text-brand-sky' : 'text-[#6ccdf2]'}`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-semibold leading-snug">{item.title}</h3>
                <p className={`mb-4 mt-4 text-[15px] leading-relaxed ${isActive ? 'text-white/80' : 'text-brand-muted'}`}>
                  {item.description}
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
