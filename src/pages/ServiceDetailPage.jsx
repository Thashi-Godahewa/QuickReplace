import { Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ServiceOfferings from '../components/service-detail/ServiceOfferings'
import ServiceSolutions from '../components/service-detail/ServiceSolutions'
import ServiceQuote from '../components/service-detail/ServiceQuote'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import usePageTitle from '../hooks/usePageTitle'
import { serviceDetails } from '../data/serviceDetails'

function ServiceDetail({ service }) {
  usePageTitle(service.pageTitle)
  return (
    <>
      <PageHero
        breadcrumb={service.title}
        breadcrumbParent={{ label: 'Services', to: '/services' }}
        description={service.hero.description}
        descriptionWidth="max-w-[640px]"
        heading={
          <>
            <span className="text-brand-sky">{service.hero.accent}</span>
            <br />
            {service.hero.title}
          </>
        }
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        imageWidth="lg:w-[56%]"
        secondaryAction={{ label: 'Send an Enquiry', to: '/contact' }}
      />
      <ServiceOfferings offerings={service.offerings} />
      <ServiceSolutions solutions={service.solutions} />
      <ServiceQuote quote={service.quote} />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}

// Renders /services/:slug. Services without a detail page go back to /services.
export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = serviceDetails[slug]
  if (!service) return <Navigate replace to="/services" />
  return <ServiceDetail key={slug} service={service} />
}
