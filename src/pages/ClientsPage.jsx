import PageHero from '../components/PageHero'
import ClientSectors from '../components/clients/ClientSectors'
import Deployments from '../components/clients/Deployments'
import Accreditations from '../components/clients/Accreditations'
import CaseStudy from '../components/clients/CaseStudy'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'

export default function ClientsPage() {

  return (
    <>
      <PageHero
        breadcrumb="Clients"
        description="From everyday repairs to larger jobs requiring multiple trades, we work with property managers, businesses and property owners across Melbourne to make property maintenance easier to manage."
        descriptionWidth="max-w-[760px]"
        heading={
          <>
            <span className="text-brand-sky">Who We Work With:</span>
            <br />
            Property Maintenance for Businesses, Managers &amp; Owners
          </>
        }
        image="/images/clients-hero.jpg"
        imageAlt="Two Quick Replace technicians inspecting water damage on a ceiling beside large windows"
        reviewsLabel="100+ Verified Customer Reviews"
        showActions={false}
      />
      <ClientSectors />
      <Deployments />
      <Accreditations />
      <CaseStudy />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
