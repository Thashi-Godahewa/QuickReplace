import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Star } from 'lucide-react'
import { contact } from '../data/siteData'
import TradesMarquee from './TradesMarquee'

// Hero used at the top of inner pages (Contact, Clients, Services ...).
// `accent` is the sky-blue first part of the heading, `title` the white rest.
// `showActions` toggles the phone / Explore Past Works buttons.
// `singleLine` keeps a short heading on one line on desktop.
// `heading` replaces accent + title when the blue words are not first.
// `secondaryAction` is the outlined button next to the phone number.
// `imageWidth` sets how much of the hero the photo covers on desktop.
// `breadcrumbParent` adds a middle breadcrumb link, e.g. { label: 'Services', to: '/services' }.
export default function PageHero({
  breadcrumb,
  accent,
  title,
  description,
  image,
  imageAlt,
  showActions = true,
  singleLine = false,
  reviewsLabel = '5-Star Customer Reviews',
  descriptionWidth = 'max-w-[560px]',
  heading = null,
  secondaryAction = { label: 'Explore Past Works', to: '/our-work' },
  imageWidth = 'lg:w-[46%]',
  breadcrumbParent = null,
}) {
  return (
    <section aria-labelledby="page-heading" className="relative overflow-hidden bg-brand-footer" id="top">
      <div className={`absolute inset-0 z-0 lg:left-auto ${imageWidth}`}>
        <img alt={imageAlt} className="h-full w-full object-cover object-top" src={image} />
        {/* Blend the photo into the navy background on the left */}
        <div className="absolute inset-0 bg-brand-footer/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-footer lg:to-transparent lg:to-40%" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-12 lg:pb-32 lg:pt-36">
        <div className="max-w-3xl space-y-6 text-white">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm">
              <li>
                <Link className="text-white transition-colors hover:text-brand-sky" to="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              {breadcrumbParent && (
                <>
                  <li>
                    <Link className="text-white transition-colors hover:text-brand-sky" to={breadcrumbParent.to}>
                      {breadcrumbParent.label}
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/40">
                    /
                  </li>
                </>
              )}
              <li aria-current="page" className="text-brand-sky">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <p className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-sky/40 bg-brand-navy/80 px-3 py-1.5 text-[10.5px] font-medium text-brand-sky backdrop-blur-md sm:px-4 sm:text-sm">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand-sky" />
            Residential • Commercial • Multiple Trades • Fast Response
          </p>

          <h1
            className={`text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px] ${singleLine ? 'lg:whitespace-nowrap' : 'max-w-[700px]'}`}
            id="page-heading"
          >
            {heading || (
              <>
                <span className="text-brand-sky">{accent}</span> {title}
              </>
            )}
          </h1>

          <p className={`${descriptionWidth} text-base font-light leading-relaxed text-white/90 sm:text-lg lg:text-xl`}>
            {description}
          </p>

          {showActions && (
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-ink shadow-lg transition-colors hover:bg-brand-sky hover:text-white"
              href={contact.phoneHref}
            >
              <Phone aria-hidden="true" className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              {contact.phone}
            </a>
            <Link
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3.5 text-base font-medium text-white transition-colors hover:border-brand-sky hover:text-brand-sky"
              to={secondaryAction.to}
            >
              {secondaryAction.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          )}

          <div className="flex max-w-md items-center gap-3 border-t border-white/10 pt-6">
            <div aria-hidden="true" className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star className="h-4 w-4" fill="currentColor" key={i} strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-white/85">{reviewsLabel}</span>
          </div>
        </div>
      </div>

      <TradesMarquee />
    </section>
  )
}
