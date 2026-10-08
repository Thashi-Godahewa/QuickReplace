import { Link } from 'react-router-dom'
import { contact, footerCompany, footerServices } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()
  const heading = 'text-base font-bold uppercase tracking-wider text-white'
  const link = 'text-[15px] leading-snug text-white/60 transition-colors hover:text-brand-sky'

  // Services are split across two columns, as in the design
  const half = Math.ceil(footerServices.length / 2)
  const servicesLeft = footerServices.slice(0, half)
  const servicesRight = footerServices.slice(half)

  const renderServices = (items) => (
    <ul className="space-y-3.5">
      {items.map((s) => (
        <li key={s}>
          <Link className={link} to="/services">
            {s}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <footer className="bg-brand-footer pt-16 text-white lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr_1.15fr]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              alt="Quick Replace - Property Maintenance Made Simple"
              className="h-20 w-auto"
              src="/images/quick-replace-logo.png"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Top-tier residential and commercial property maintenance and building repairs across Melbourne, including
              plumbing, electrical, glazing, locksmith services and emergency make-safe repairs.
            </p>
            <p className="mt-6 inline-block rounded-full border border-brand-sky/40 bg-brand-navyLight px-5 py-2.5 text-sm font-medium text-brand-sky/90">
              Licensed, Bonded &amp; Insured • Master Trades Lic #QR-94281
            </p>
          </div>

          {/* Services - column 1 */}
          <nav aria-label="Footer services">
            <h2 className={heading}>Services</h2>
            <div className="mt-6">{renderServices(servicesLeft)}</div>
          </nav>

          {/* Services - column 2 (continues the list, no heading) */}
          <nav aria-label="Footer services, continued" className="-mt-6 sm:mt-0">
            <h2 aria-hidden="true" className={`${heading} invisible hidden sm:block`}>
              &nbsp;
            </h2>
            <div className="sm:mt-6">{renderServices(servicesRight)}</div>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company">
            <h2 className={heading}>Company</h2>
            <ul className="mt-6 space-y-3.5">
              {footerCompany.map((c) => (
                <li key={c.label}>
                  <Link className={link} to={c.to}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h2 className={heading}>Contact</h2>
            <ul className="mt-6 space-y-3.5 text-[15px]">
              <li>
                <span className="font-semibold text-white">Phone:</span>{' '}
                <a className={`${link} ml-1.5`} href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a className={`${link} ml-1.5 break-all`} href={contact.emailHref}>
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Head office:</span>{' '}
                <span className="ml-1.5 text-white/60">{contact.headOffice}</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[15px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Quick Replace Pty Ltd | ABN 90 632 652 727 | All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            <li>
              <a className="transition-colors hover:text-white" href="#top">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#top">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#top">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
