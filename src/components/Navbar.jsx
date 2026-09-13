import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a aria-label="Quick Replace Home" className="flex items-center gap-2.5 group focus:outline-none" href="#">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 text-white transition-transform group-hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0zM12 6.83L8.46 10.37a5 5 0 1 0 7.08 0z" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">Quick Replace</span>
        </a>

        {/* Desktop Navigation Links Island */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200/80 shadow-pill">
          <a className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full transition-colors" href="#services">Services</a>
          <a className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full transition-colors" href="#projects">Projects</a>
          <a className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full transition-colors" href="#pricing">Pricing</a>
          <div className="relative group">
            <button className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
              All Pages
              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Primary Action CTA Button */}
        <div className="flex items-center gap-4">
          <a className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm pl-5 pr-2.5 py-2.5 rounded-full border border-slate-700/50 shadow-md transition-all hover:shadow-lg group" href="#contact">
            <span>Book a Call</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
              <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}
