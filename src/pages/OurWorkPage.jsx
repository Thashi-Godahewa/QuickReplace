import PageHero from '../components/PageHero'
import WorkGallery from '../components/work/WorkGallery'
import WorkFaq from '../components/work/WorkFaq'
import Testimonials from '../components/Testimonials'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import usePageTitle from '../hooks/usePageTitle'

export default function OurWorkPage() {
  usePageTitle('Our Work - Before & After Projects')

  return (
    <>
      <PageHero
        breadcrumb="Our Work"
        description="Explore before-and-after project comparisons across residential strata, commercial office fit-outs, and rapid emergency make-safe repairs delivered by our licensed Melbourne trade fleet."
        descriptionWidth="max-w-[760px]"
        heading={
          <>
            Real Results
            <br />
            Proven <span className="text-brand-sky">Transformations</span>
          </>
        }
        image="/images/our-work-hero.jpg"
        imageAlt="Glazier fitting a large glass panel to a commercial building shopfront"
        imageWidth="lg:w-[53%]"
        reviewsLabel="100+ Verified Customer Reviews"
        secondaryAction={{ label: 'Send an Enquiry', to: '/contact' }}
      />
      <WorkGallery />
      <WorkFaq />
      <Testimonials showClients={false} />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
