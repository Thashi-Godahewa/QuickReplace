import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Star } from 'lucide-react'
import { contact } from '../data/siteData'
import TradesMarquee from './TradesMarquee'

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDrLF0mZbhpwPmlGPapwj1s-32Porpr-JJHkCXJsumvgm-UaReyr1TwfJwh5vrBSx5QIiPlzwghBlHk_v82kvjETfDhyfWmb7HPjNLYyNJH-RhFYxAQh4CYefd6cAu0VTU8gBrkUQugmLXDozSyhQZfNb44DRqYc7JHxWkMFuHG695onDPxTUz5HsoJcvXfA8B_2jJBRCNbmoOp299zj3qIw4KNtXLV4tdBy_xGDj_k7_CqOZrO6GCy'

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-brand-footer" id="top">
      <div className="absolute inset-0 z-0">
        <img
          alt="Technician carrying out an electrical repair inside a home"
          className="h-full w-full object-cover object-center"
          src={HERO_IMAGE}
        />
        <div className="hero-mask absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 px-6 pb-20 pt-36 lg:grid-cols-12 lg:px-12 lg:pb-20 lg:pt-44">
        <div className="space-y-7 text-white lg:col-span-7">
          <p className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-sky/40 bg-brand-navy/80 px-3 py-1.5 text-[10.5px] font-medium sm:px-4 sm:text-sm text-brand-sky backdrop-blur-md sm:text-sm">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand-sky" />
            Residential • Commercial • Multiple Trades • Fast Response
          </p>

          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]"
            id="hero-heading"
          >
            Reliable Property Maintenance &amp; <span className="text-brand-sky">Quick Replace</span> Solutions
          </h1>

          <p className="max-w-[700px] text-base font-light leading-relaxed text-white/90 sm:text-lg lg:text-xl">
            Rapid, certified property maintenance and building repairs, emergency make-safe repairs, and installations
            for homes &amp; commercial premises. When you need it done right, fast.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-ink shadow-lg transition-colors hover:bg-brand-sky hover:text-white"
              href={contact.phoneHref}
            >
              <Phone aria-hidden="true" className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              {contact.phone}
            </a>
            <a
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3.5 text-base font-medium text-white transition-colors hover:border-brand-sky hover:text-brand-sky"
              href="#projects"
            >
              Explore Past Works
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="flex max-w-md items-center gap-3 border-t border-white/10 pt-6">
            <div aria-hidden="true" className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star className="h-4 w-4" fill="currentColor" key={i} strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-white/85">5-Star Customer Reviews</span>
          </div>
        </div>

        <div className="lg:col-span-5 lg:mb-20 lg:flex lg:justify-end">
          <div className="dark-glass-effect w-full max-w-md space-y-5 rounded-3xl p-8 text-white shadow-card">
            <h2 className="text-xl font-extrabold uppercase tracking-tight">Property problem? We&rsquo;ll fix it.</h2>
            <p className="text-[15px] leading-relaxed text-white/85">
              With multiple trades under one roof, we have the right people for the job. We&rsquo;ll organise the work,
              coordinate everything and keep you updated from start to finish.
            </p>
            <Link
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-sky hover:text-white"
              to="/contact"
            >
              Get a Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <TradesMarquee />
    </section>
  )
}
