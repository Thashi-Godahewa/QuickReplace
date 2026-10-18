import { ArrowRight, Phone } from 'lucide-react'
import { contact } from '../data/siteData'
import { Container } from './ui'

// variant="compact": short banner with the call button on the right (below About)
// variant="emergency": full banner with badge, longer heading and two buttons (service pages)
// variant="urgent": same full banner with the home page wording
const COPY = {
  compact: {
    heading: ['Quick Replace is here for you!'],
    text: 'From everyday repairs to larger maintenance jobs, tell us what’s happening and we’ll help work out the right way forward. One point of contact, multiple trades and clear communication throughout the job.',
  },
  emergency: {
    heading: ['Need an emergency repair or make safe right now?', 'Quick Replace is here for you!'],
    text: 'Don’t let water leaks, electrical hazards, or broken glazing risk property damage. Our certified local technicians arrive asap.',
  },
  urgent: {
    heading: ['Need an urgent repair or make safe right now?', 'Quick Replace is here to help!'],
    text: 'Don’t let water leaks, electrical hazards or broken glass cause further property damage. Contact us and we’ll organise the appropriate trade as quickly as possible.',
  },
}

export default function CTA({ variant = 'emergency' }) {
  const compact = variant === 'compact'
  const copy = COPY[variant] || COPY.emergency

  const callButton = (
    <a
      className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-brand-sky px-8 py-4 text-lg font-semibold text-white shadow-glow transition-colors hover:bg-brand-skyHover"
      href={contact.phoneHref}
    >
      <Phone aria-hidden="true" className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      Call Now
    </a>
  )

  return (
    <section
      aria-labelledby={`cta-heading-${variant}`}
      className={compact ? 'bg-white py-11' : 'bg-white py-11 lg:pb-11 lg:pt-11'}
      id={compact ? undefined : 'contact'}
    >
      <Container>
        <div
          className={`relative overflow-hidden rounded-3xl bg-brand-navy px-8 text-white shadow-card sm:px-14 ${
            compact ? 'py-14' : 'py-16 lg:py-20'
          }`}
        >
          {/* Soft glow in the bottom right corner, as in the design */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[520px] rounded-full bg-[#0a5b85] opacity-60 blur-[110px]"
          />

          <div
            className={`relative flex flex-col gap-8 ${
              compact ? 'lg:flex-row lg:items-center lg:justify-between' : ''
            }`}
          >
            <div className={compact ? 'lg:flex-1' : 'max-w-3xl'}>
              {!compact && (
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-sky/40 bg-brand-navyLight/60 px-4 py-1 text-sm font-medium text-brand-sky">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-sky" />
                  Urgent Repairs &amp; Make-Safe
                </p>
              )}
              <h2
                className="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.12] lg:text-[48px]"
                id={`cta-heading-${variant}`}
              >
                {copy.heading[0]}
                {copy.heading[1] && (
                  <>
                    <br className="hidden sm:block" /> {copy.heading[1]}
                  </>
                )}
              </h2>
              <p className={`mt-6 text-base leading-relaxed text-white/85 sm:text-lg ${compact ? 'max-w-3xl' : 'max-w-xl'}`}>
                {copy.text}
              </p>
            </div>

            {compact ? (
              callButton
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                {callButton}
                <a
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-base font-medium text-white transition-colors hover:border-brand-sky hover:text-brand-sky"
                  href={contact.emailHref}
                >
                  Send Us an Email
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
