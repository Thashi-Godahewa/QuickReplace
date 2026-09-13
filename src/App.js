import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="antialiased selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Metrics />
      <Services />
      <HowItWorks />
      <About />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
