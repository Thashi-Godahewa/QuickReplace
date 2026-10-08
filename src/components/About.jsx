import { Accent, Container, PillLink, SectionBadge } from './ui'

export default function About() {
  return (
    <section aria-labelledby="about-heading" className="border-b border-brand-line bg-white py-16 lg:py-11" id="about">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionBadge>About Us</SectionBadge>
          <h2
            className="mt-7 max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[50px]"
            id="about-heading"
          >
            With over 15+ years of <Accent>Experience</Accent>, our team provides top-quality services
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-brand-muted">
            Repairs and ongoing maintenance for offices, commercial buildings and managed properties. One point of
            contact for everything from small repairs to jobs requiring multiple trades.
          </p>
          <PillLink className="mt-10" to="/about">
            About Us
          </PillLink>
        </div>

        <div className="lg:pl-8">
          <img
            alt="Quick Replace plumber adjusting a copper and PEX manifold in a plant room"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_24px_40px_-20px_rgba(0,27,51,0.45)]"
            loading="lazy"
            src="/images/about-technician.jpg"
          />
        </div>
      </Container>
    </section>
  )
}
