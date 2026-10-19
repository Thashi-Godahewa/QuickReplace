import Hero from '../components/Hero'
import Metrics from '../components/Metrics'
import Services from '../components/Services'
import About from '../components/About'
import CTA from '../components/CTA'
import Industries from '../components/Industries'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import BeforeAfter from '../components/BeforeAfter'
import ServiceLocator from '../components/ServiceLocator'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Services />
      <About />
      <CTA variant="compact" />
      <Industries />
      <Projects />
      <Testimonials />
      <BeforeAfter />
      <ServiceLocator />
      <CTA variant="urgent" />
    </>
  )
}
