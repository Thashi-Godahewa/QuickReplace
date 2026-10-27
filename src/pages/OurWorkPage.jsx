import PageHero from '../components/PageHero'
import WorkGallery from '../components/work/WorkGallery'
import WorkFaq from '../components/work/WorkFaq'
import Testimonials from '../components/Testimonials'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import { contact } from '../data/siteData'

export default function OurWorkPage() {

  return (
    <>
      <PageHero
        breadcrumb="Our Work"
        description="Take a look at repairs and maintenance we've completed across Melbourne. See the problem, what we did and the finished result."
        descriptionWidth="max-w-[660px]"
        heading={
          <>
            <span className="text-brand-sky">Our Work</span>
            <br />
            From Problem to Solution
          </>
        }
        image="/images/our-work-hero.jpg"
        imageAlt="Glazier fitting a large glass panel to a commercial building shopfront"
        singleLine
        secondaryAction={{ label: 'Send an Enquiry', href: contact.emailHref }}
      />
      <WorkGallery />
      <WorkFaq />
      <Testimonials showClients={false} />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
