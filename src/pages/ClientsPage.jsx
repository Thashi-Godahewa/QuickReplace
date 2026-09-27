import PageHero from '../components/PageHero'
import ClientSectors from '../components/clients/ClientSectors'
import Deployments from '../components/clients/Deployments'
import ApproachCards from '../components/clients/ApproachCards'
import Accreditations from '../components/clients/Accreditations'
import CaseStudy from '../components/clients/CaseStudy'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import usePageTitle from '../hooks/usePageTitle'

export default function ClientsPage() {
  usePageTitle('Clients - Who We Serve')

  return (
    <>
      <PageHero
        accent="Who We Serve:"
        breadcrumb="Clients"
        description="We provide reliable property maintenance solutions, working closely with clients to keep their properties safe, functional, and well maintained."
        descriptionWidth="max-w-[700px]"
        image="/images/contact-hero-team.jpg"
        imageAlt="The Quick Replace team standing outside a commercial building"
        reviewsLabel="100+ Verified Customer Reviews"
        showActions={false}
        title="Tailored Property Care for Victoria's Key Sectors"
      />
      <ClientSectors />
      <Deployments />
      <ApproachCards />
      <Accreditations />
      <CaseStudy />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
