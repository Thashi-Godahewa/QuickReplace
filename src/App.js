import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="antialiased selection:bg-brand-sky selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<ContactPage />} path="/contact" />
            {/* Unknown URLs fall back to the home page for now */}
            <Route element={<HomePage />} path="*" />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
