import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import PageHero from '../components/PageHero'
import ServiceOfferings from '../components/service-detail/ServiceOfferings'
import ServiceSolutions from '../components/service-detail/ServiceSolutions'
import ServiceQuote from '../components/service-detail/ServiceQuote'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import { serviceDetails } from '../data/serviceDetails'
import { contact } from '../data/siteData'

function ServiceDetail({ service }) {
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
        secondaryAction={{ label: 'Send an Enquiry', href: contact.emailHref }}
      />
      {/* Sections are optional, so a page can be built up one section at a time */}
      {service.offerings && <ServiceOfferings offerings={service.offerings} />}
      {service.solutions && <ServiceSolutions solutions={service.solutions} />}
      {service.quote && <ServiceQuote quote={service.quote} />}
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}

// Unknown service slugs must be genuine missing pages, including during navigation.
export default function ServiceDetailPage() {
  const { slug } = useParams()
  if (!Object.prototype.hasOwnProperty.call(serviceDetails, slug)) return <NotFoundPage />
  const service = serviceDetails[slug]
  return <ServiceDetail key={slug} service={service} />
}
