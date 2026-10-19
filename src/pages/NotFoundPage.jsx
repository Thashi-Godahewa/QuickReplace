import { Link } from 'react-router-dom'
import { contact } from '../data/siteData'

export default function NotFoundPage() {
  return (
    <section className="bg-brand-footer px-6 pb-24 pt-44 text-white" id="top">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-sky">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          We couldn't find that page. Browse our property maintenance services or
          contact Quick Replace for help with your repair.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="rounded-full bg-white px-6 py-3 font-semibold text-brand-ink" to="/services">
            View our services
          </Link>
          <Link className="rounded-full border border-white/30 px-6 py-3 font-semibold" to="/contact">
            Contact us
          </Link>
          <a className="rounded-full border border-white/30 px-6 py-3 font-semibold" href={contact.phoneHref}>
            Call {contact.phone}
          </a>
        </div>
        <Link className="mt-8 inline-block text-brand-sky underline" to="/">Return to the homepage</Link>
      </div>
    </section>
  )
}
