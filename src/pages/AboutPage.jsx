import PageHero from '../components/PageHero'
import OurStory from '../components/about/OurStory'
import HowWeWork from '../components/about/HowWeWork'
import MultiTrade from '../components/about/MultiTrade'
import OurJourney from '../components/about/OurJourney'
import ServiceLocator from '../components/ServiceLocator'
import CTA from '../components/CTA'
import { contact } from '../data/siteData'

export default function AboutPage() {

  return (
    <>
      <PageHero
        accent="About"
        breadcrumb="About Us"
        description="We are a Melbourne-based company providing property maintenance, building repairs, emergency make-safe services and installations for residential and commercial properties. With multiple trades coordinated through one point of contact, we focus on quality work, clear communication and making the process easier for our clients."
        descriptionWidth="max-w-[760px]"
        image="/images/about-hero-team.jpg"
        imageAlt="Five Quick Replace tradespeople in blue uniforms standing outside an apartment building with their tools"
        secondaryAction={{ label: 'Send an Enquiry', href: contact.emailHref }}
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
