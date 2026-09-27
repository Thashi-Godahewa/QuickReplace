import { Link } from 'react-router-dom'
import { contact, footerCompany, footerServices } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()
  const heading = 'text-sm font-semibold uppercase tracking-wider text-white'
  const link = 'text-sm text-white/55 transition-colors hover:text-brand-sky'

  return (
    <footer className="bg-brand-footer pt-16 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img alt="Quick Replace - Property Maintenance Made Simple" className="h-16 w-auto" src="/images/quick-replace-logo.png" />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
              Top-tier residential and commercial rapid property maintenance, plumbing, electrical, glazing, locksmith,
              and emergency make-safe repairs.
            </p>
            <p className="mt-4 inline-block rounded-full border border-brand-sky/30 bg-brand-navyLight px-3 py-1 text-xs font-medium text-brand-sky/90 sm:text-sm">
              Licensed, Bonded &amp; Insured • Master Trades Lic #QR-94281
            </p>
          </div>

          <nav aria-label="Footer services" className="lg:col-span-2 lg:col-start-6">
            <h2 className={heading}>Services</h2>
            <ul className="mt-5 space-y-1.5">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link className={link} to="/#services">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer company" className="lg:col-span-2 lg:col-start-8 lg:pl-4">
            <h2 className={heading}>Company</h2>
            <ul className="mt-5 space-y-1.5">
              {footerCompany.map((c) => (
                <li key={c.label}>
                  <Link className={link} to={c.to}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-3 lg:col-start-10 lg:pl-6">
            <h2 className={heading}>Contact</h2>
            <ul className="mt-5 space-y-1.5 text-sm">
              <li>
                <span className="font-semibold">Phone:</span>{' '}
                <a className={link} href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{' '}
                <a className={link} href={contact.emailHref}>
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="font-semibold">Head office:</span>{' '}
                <span className="text-white/55">{contact.headOffice}</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Quick Replace Pty Ltd | ABN 90 632 652 727 | All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <a className="hover:text-white" href="#top">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-white" href="#top">Terms of Service</a>
            </li>
            <li>
              <a className="hover:text-white" href="#top">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
