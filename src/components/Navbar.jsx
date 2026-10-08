import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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

  return (
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

        <div className="hidden items-center gap-3 md:flex">
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
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
              <a className="rounded-full bg-brand-navy py-3 text-center text-sm font-medium text-white" href={contact.phoneHref}>
                Call Now
              </a>
              <a className="rounded-full bg-brand-navy py-3 text-center text-sm font-medium text-white" href={contact.emailHref}>
                Email
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
