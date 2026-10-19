import PageHero from '../components/PageHero'
import OurStory from '../components/about/OurStory'
import HowWeWork from '../components/about/HowWeWork'
import MultiTrade from '../components/about/MultiTrade'
import OurJourney from '../components/about/OurJourney'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'

export default function AboutPage() {

  return (
    <>
      <PageHero
        accent="About"
        breadcrumb="About Us"
        description="Quick Replace is a Melbourne property maintenance company built to make repairs and maintenance simpler. With multiple trades coordinated through one point of contact, we focus on quality work, clear communication and making the process easier for our clients."
        descriptionWidth="max-w-[700px]"
        image="/images/contact-hero-team.jpg"
        imageAlt="The Quick Replace team standing outside a commercial building"
        reviewsLabel="100+ Verified Customer Reviews"
        showActions={false}
        singleLine
        title="Quick Replace"
      />
      <OurStory />
      <HowWeWork />
      <MultiTrade />
      <OurJourney />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
