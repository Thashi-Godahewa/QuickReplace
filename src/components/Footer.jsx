import { Link } from 'react-router-dom'
import { contact, footerCompany, footerServices } from '../data/siteData'
import { allServices } from '../data/servicesData'
import { serviceDetails } from '../data/serviceDetails'

export default function Footer() {
  const heading = 'text-sm font-bold uppercase tracking-wider text-white'
  const link = 'text-sm leading-snug text-white/60 transition-colors hover:text-brand-sky'

  // Services are split across three columns, as in the design
  const perColumn = Math.ceil(footerServices.length / 3)
  const serviceColumns = [0, 1, 2].map((i) => footerServices.slice(i * perColumn, (i + 1) * perColumn))

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
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_0.9fr_1.1fr] lg:gap-x-6">
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

          {/* Services - three columns, only the first has a heading */}
          <nav aria-label="Footer services" className="grid grid-cols-1 content-start gap-y-1.5 sm:col-span-2 sm:grid-cols-3 sm:gap-x-6 lg:col-span-3">
            <h2 className={`${heading} sm:col-span-3`}>Services</h2>
            {serviceColumns.map((items, i) => (
              <div className="sm:mt-1.5" key={i}>
                {renderServices(items)}
              </div>
            ))}
          </nav>

          {/* Company */}
          <nav aria-label="Footer company">
            <h2 className={heading}>Quick Replace</h2>
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
            {/* Each label sits on its own line above the value, as in the design */}
            <dl className="mt-3 space-y-1.5 text-sm leading-snug lg:whitespace-nowrap">
              <dt className="font-semibold text-white">Phone:</dt>
              <dd>
                <a className={link} href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </dd>
              <dt className="font-semibold text-white">Email:</dt>
              <dd>
                <a className={link} href={contact.emailHref}>
                  {contact.email}
                </a>
              </dd>
              <dt className="font-semibold text-white">Head office:</dt>
              <dd className="text-white/60">{contact.headOffice}</dd>
            </dl>
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
              <Link className="transition-colors hover:text-white" to="/terms-and-conditions">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
