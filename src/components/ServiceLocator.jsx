import { useState } from 'react'
import { ArrowRight, CircleCheck, CircleAlert } from 'lucide-react'
import { contact, servicePostcodeRanges } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

function isCovered(postcode) {
  const n = Number(postcode)
  return servicePostcodeRanges.some(([min, max]) => n >= min && n <= max)
}

export default function ServiceLocator() {
  const [postcode, setPostcode] = useState('')
  const [result, setResult] = useState(null) // null | 'yes' | 'no' | 'invalid'

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = postcode.trim()
    if (!/^\d{4}$/.test(value)) {
      setResult('invalid')
      return
    }
    setResult(isCovered(value) ? 'yes' : 'no')
  }

  return (
    <section aria-labelledby="locator-heading" className="bg-brand-mist py-16 lg:py-11" id="service-area">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 rounded-3xl border border-brand-line bg-white p-6 lg:order-1">
          <img
            alt="Map of Melbourne showing the Quick Replace service area from Macedon to Mornington and Geelong to Lilydale"
            className="w-full rounded-2xl"
            loading="lazy"
            src="/images/service-area-map.png"
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionBadge>Service Locator</SectionBadge>
          <h2
            className="mt-14 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="locator-heading"
          >
            Do we serve your <br />
            <Accent>Area</Accent>?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
            Enter your post code to instantly check if you&rsquo;re in our coverage zone. We&rsquo;re expanding regularly
            - if you&rsquo;re close, reach out anyway.
          </p>

          <form className="mt-14" noValidate onSubmit={handleSubmit}>
            <label className="text-xl font-semibold tracking-tight text-brand-ink" htmlFor="postcode">
              Find out your service area
            </label>
            <div className="mt-5 flex items-center gap-3">
              <input
                aria-describedby="postcode-result"
                autoComplete="postal-code"
                className="h-14 min-w-0 flex-1 rounded-xl border border-brand-line bg-white px-5 text-base text-brand-ink placeholder:text-brand-muted focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/30"
                id="postcode"
                inputMode="numeric"
                maxLength={4}
                onChange={(e) => {
                  setPostcode(e.target.value.replace(/\D/g, ''))
                  setResult(null)
                }}
                placeholder="Enter post code (e.g. 3032)"
                type="text"
                value={postcode}
              />
              <button
                aria-label="Check post code"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-sky"
                type="submit"
              >
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div aria-live="polite" className="mt-4 min-h-[48px] text-[15px]" id="postcode-result">
              {result === 'yes' && (
                <p className="flex items-start gap-2 text-emerald-700">
                  <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  Good news - we cover {postcode}. Call us on{' '}
                  <a className="font-semibold underline" href={contact.phoneHref}>
                    {contact.phone}
                  </a>{' '}
                  to book.
                </p>
              )}
              {result === 'no' && (
                <p className="flex items-start gap-2 text-brand-ink">
                  <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  {postcode} is outside our usual area, but get in touch - we may still be able to help.
                </p>
              )}
              {result === 'invalid' && (
                <p className="flex items-start gap-2 text-red-600">
                  <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  Please enter a 4-digit Australian post code.
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}
