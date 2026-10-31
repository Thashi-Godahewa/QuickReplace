import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { contact, navLinks } from '../data/siteData'
import { ArrowDot } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const actionClass =
    'group inline-flex items-center gap-3 rounded-full bg-brand-navy py-2 pl-5 pr-2 text-sm font-medium text-white shadow-card ring-1 ring-white/5 transition-colors hover:bg-brand-navyLight lg:py-2.5 lg:text-base'

  const socialClass =
    'hidden h-11 w-11 items-center justify-center rounded-full bg-brand-navy shadow-card ring-1 ring-white/5 transition-colors hover:bg-brand-navyLight lg:flex lg:h-12 lg:w-12'

  return (
    <>
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open ? 'bg-brand-footer/90 py-3 shadow-lg backdrop-blur-md' : 'py-6 lg:py-8'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-12">
        <Link aria-label="Quick Replace home" className="shrink-0" to="/">
          <img
            alt="Quick Replace - Property Maintenance Made Simple"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-11' : 'h-12 lg:h-[60px]'}`}
            src="/images/quick-replace-logo.png"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full bg-white px-6 py-2.5 shadow-card lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-brand-sky ${
                  isActive && !link.to.includes('#') ? 'text-brand-sky' : 'text-brand-ink'
                }`
              }
              key={link.label}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 md:gap-3">
        <div className="hidden items-center gap-3 md:flex">
          <a aria-label="Quick Replace on Facebook" className={socialClass} href={contact.facebookHref} rel="noopener noreferrer" target="_blank">
            <img alt="" aria-hidden="true" className="h-6 w-6" src="/images/icon-facebook.svg" />
          </a>
          <a aria-label="Quick Replace on Instagram" className={socialClass} href={contact.instagramHref} rel="noopener noreferrer" target="_blank">
            <img alt="" aria-hidden="true" className="h-6 w-6" src="/images/icon-instagram.svg" />
          </a>
          <a className={actionClass} href={contact.phoneHref}>
            <span>Call Now</span>
            <ArrowDot />
          </a>
          <a className={actionClass} href={contact.emailHref}>
            <span>Email</span>
            <ArrowDot />
          </a>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="mx-auto mt-3 max-w-7xl px-6 pb-4 lg:hidden">
          <div className="flex flex-col rounded-3xl bg-white p-3 shadow-card">
            {navLinks.map((link) => (
              <Link
                className="rounded-2xl px-4 py-3 text-base font-medium text-brand-ink hover:bg-brand-mist hover:text-brand-sky"
                key={link.label}
                onClick={() => setOpen(false)}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 md:hidden">
              <a
                className="flex items-center justify-center gap-2 rounded-full bg-brand-sky py-3 text-sm font-semibold text-white"
                href={contact.phoneHref}
              >
                <Phone aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                Call Now
              </a>
              <a
                className="flex items-center justify-center gap-2 rounded-full bg-brand-navy py-3 text-sm font-semibold text-white"
                href={contact.emailHref}
              >
                <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                Email Us
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>

    {/* Phones: round Call and Email buttons fixed to the bottom right of the screen */}
    <div
      className="fixed right-4 z-40 flex flex-col gap-3 md:hidden"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <a
        aria-label={`Call Quick Replace on ${contact.phone}`}
        className="qr-fab-in relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-sky text-white shadow-lg transition-transform hover:bg-brand-skyHover active:scale-90"
        href={contact.phoneHref}
      >
        {/* Soft pulse ring that draws the eye to the call button */}
        <span aria-hidden="true" className="qr-fab-pulse absolute inset-0 rounded-full bg-brand-sky" />
        <Phone aria-hidden="true" className="qr-fab-ring relative h-5 w-5" fill="currentColor" strokeWidth={0} />
      </a>
      <a
        aria-label="Email Quick Replace"
        className="qr-fab-in qr-fab-in-delay relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg ring-1 ring-white/10 transition-transform hover:bg-brand-navyLight active:scale-90"
        href={contact.emailHref}
      >
        {/* Small "new message" dot that pops in with each envelope bounce */}
        <span aria-hidden="true" className="qr-fab-dot absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-sky ring-2 ring-brand-navy" />
        <Mail aria-hidden="true" className="qr-fab-mail h-5 w-5" strokeWidth={2} />
      </a>
    </div>
    </>
  )
}
