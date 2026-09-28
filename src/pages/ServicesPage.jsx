import PageHero from '../components/PageHero'
import ServiceFinder from '../components/services/ServiceFinder'
import Testimonials from '../components/Testimonials'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import usePageTitle from '../hooks/usePageTitle'

export default function ServicesPage() {
  usePageTitle('Services - Property Maintenance & Repairs')

  return (
    <>
      <PageHero
        breadcrumb="Services"
        description="Rapid, certified property maintenance, emergency make-safe repairs, and installations for homes & commercial premises. When you need it done right, fast."
        heading={
          <>
            Quick Replace <span className="text-brand-sky">Services</span>
          </>
        }
        image="/images/contact-hero-team.jpg"
        imageAlt="The Quick Replace team standing outside a commercial building"
        singleLine
      />
      <ServiceFinder />
      <Testimonials showClients={false} />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
