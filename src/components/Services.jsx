import { Link } from 'react-router-dom'
import { ArrowRight, Grid2x2, KeyRound, PaintRoller, PlugZap, Shield, Wrench } from 'lucide-react'
import { services } from '../data/siteData'
import { Accent, Container, PillLink, SectionBadge } from './ui'

const icons = {
  plumbing: Wrench,
  painting: PaintRoller,
  electrical: PlugZap,
  glazing: Grid2x2,
  makeSafe: Shield,
  locksmith: KeyRound,
}

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="bg-brand-mist pb-12 pt-12 lg:pt-11" id="services">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionBadge>Our Services</SectionBadge>
          <h2
            className="mt-10 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="services-heading"
          >
            Our expertise: building <span className="whitespace-nowrap"><Accent>Repairs &amp;</Accent></span> property <Accent>Maintenance</Accent>
          </h2>
          <p className="mx-auto mt-6 max-w-[740px] text-[15px] leading-relaxed text-brand-muted">
            At Quick Replace, we handle everything from minor repairs to larger building maintenance jobs requiring
            multiple trades. With the right trades for the job, we can coordinate the work from start to finish.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon]
            return (
              <li
                className="group flex flex-col rounded-3xl border border-brand-line bg-white p-8 transition-shadow duration-300 hover:shadow-card"
                key={service.title}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-sky shadow-card">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-8 text-[22px] font-semibold text-brand-ink">{service.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-muted">{service.description}</p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-sky transition-colors hover:text-brand-skyHover"
                  to="/contact"
                >
                  Learn More <span className="sr-only">about {service.title}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-14 flex justify-center">
          <PillLink to="/services">View All Services</PillLink>
        </div>
      </Container>
    </section>
  )
}
