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
        description="Property repairs shouldn’t be complicated. We help you understand what needs to be done, provide clear and transparent pricing, and coordinate the right trades to get the job completed properly — all through one point of contact."
        descriptionWidth="max-w-[800px]"
        heading={
          <>
            Quick Replace <span className="text-brand-sky">Services</span>
          </>
        }
        image="/images/services-hero.jpg"
        imageAlt="Quick Replace tradesperson sealing around a brick chimney on a roof"
        imageOpacity="opacity-100"
        singleLine
      />
      <ServiceFinder />
      <Testimonials showClients={false} />
      <ServiceLocator />
      <CTA variant="urgent" />
    </>
  )
}
