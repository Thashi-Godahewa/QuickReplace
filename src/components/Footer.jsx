import { Link } from 'react-router-dom'
import { contact, footerCompany, footerServices } from '../data/siteData'
import { allServices } from '../data/servicesData'
import { serviceDetails } from '../data/serviceDetails'

export default function Footer() {
  const heading = 'text-sm font-bold uppercase tracking-wider text-white'
  const link = 'text-sm leading-snug text-white/60 transition-colors hover:text-brand-sky'

  // Services are split across two columns, as in the design
  const half = Math.ceil(footerServices.length / 2)
  const servicesLeft = footerServices.slice(0, half)
  const servicesRight = footerServices.slice(half)

  // Services with a detail page link straight to it, the rest go to /services.
  // Pages not listed on the Services page are matched by their own title.
  const footerServicePath = (title) => {
    const match = allServices.find((s) => s.title === title)
    if (match && serviceDetails[match.slug]) return `/services/${match.slug}`
    const slug = Object.keys(serviceDetails).find((key) => serviceDetails[key].title === title)
    return slug ? `/services/${slug}` : '/services'
  }

  const renderServices = (items) => (
    <ul className="space-y-1.5 text-sm leading-snug">
      {items.map((s) => (
        <li key={s}>
          <Link className={link} to={footerServicePath(s)}>
            {s}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <footer className="bg-brand-footer pt-16 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 pb-12 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr_1fr] lg:gap-x-6">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              alt="Quick Replace - Property Maintenance Made Simple"
              className="h-16 w-auto"
              src="/images/quick-replace-logo.png"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              Top-tier residential and commercial property maintenance and building repairs across Melbourne, including
              plumbing, electrical, glazing, locksmith services and emergency make-safe repairs.
            </p>
            <p className="mt-5 inline-block rounded-full border border-brand-sky/40 bg-brand-navyLight px-3 py-1.5 text-[13px] font-medium text-brand-sky/90">
              Licensed Trades • Insured Contractors
            </p>
          </div>

          {/* Services - column 1 */}
          <nav aria-label="Footer services">
            <h2 className={heading}>Services</h2>
            <div className="mt-3">{renderServices(servicesLeft)}</div>
          </nav>

          {/* Services - column 2 (continues the list, no heading) */}
          <nav aria-label="Footer services, continued" className="-mt-6 sm:mt-0">
            <h2 aria-hidden="true" className={`${heading} invisible hidden sm:block`}>
              &nbsp;
            </h2>
            <div className="sm:mt-3">{renderServices(servicesRight)}</div>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company">
            <h2 className={heading}>Company</h2>
            <ul className="mt-3 space-y-1.5 text-sm leading-snug">
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
            <ul className="mt-3 space-y-1.5 text-sm leading-snug lg:whitespace-nowrap">
              <li>
                <span className="font-semibold text-white">Phone:</span>{' '}
                <a className={`${link} ml-1.5`} href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a className={`${link} ml-1.5`} href={contact.emailHref}>
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

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; Quick Replace Pty Ltd | ABN 90 632 652 727 | All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <Link className="transition-colors hover:text-white" to="/privacy-policy">
                Privacy Policy
              </Link>
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
