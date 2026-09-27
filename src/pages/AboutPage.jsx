import PageHero from '../components/PageHero'
import OurStory from '../components/about/OurStory'
import HowWeWork from '../components/about/HowWeWork'
import MultiTrade from '../components/about/MultiTrade'
import TrustSection from '../components/about/TrustSection'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import usePageTitle from '../hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us - Our Story')

  return (
    <>
      <PageHero
        accent="About"
        breadcrumb="About Us"
        description="We provide reliable property maintenance solutions, working closely with clients to keep their properties safe, functional, and well maintained."
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
      <TrustSection />
      <ServiceLocator />
      <CTA variant="emergency" />
    </>
  )
}
