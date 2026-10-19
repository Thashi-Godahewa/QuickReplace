import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Seo from './components/Seo'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ClientsPage from './pages/ClientsPage'
import AboutPage from './pages/AboutPage'
import OurWorkPage from './pages/OurWorkPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'

// Shared by the browser router and the build-time static renderer.
export function AppContent() {
  return (
    <>
      <Seo />
      <ScrollManager />
      <div className="antialiased selection:bg-brand-sky selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route caseSensitive element={<HomePage />} path="/" />
            <Route caseSensitive element={<ServicesPage />} path="/services" />
            <Route caseSensitive element={<ServiceDetailPage />} path="/services/:slug" />
            <Route caseSensitive element={<OurWorkPage />} path="/our-work" />
            <Route caseSensitive element={<AboutPage />} path="/about" />
            <Route caseSensitive element={<ClientsPage />} path="/clients" />
            <Route caseSensitive element={<ContactPage />} path="/contact" />
            <Route caseSensitive element={<PrivacyPolicyPage />} path="/privacy-policy" />
            <Route caseSensitive element={<TermsPage />} path="/terms-and-conditions" />
            <Route caseSensitive element={<NotFoundPage />} path="*" />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
