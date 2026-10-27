import { useState } from 'react'
import { Banknote, Camera, ChevronDown, ShieldCheck, ShieldPlus, Timer } from 'lucide-react'
import { workFaqs } from '../../data/workData'
import { Accent, Container, SectionBadge } from '../ui'

// lucide-react has no shield-with-heart icon, so this one is drawn here
function ShieldHeart(props) {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 16.2l-2.6-2.5a1.7 1.7 0 0 1 2.6-2.2 1.7 1.7 0 0 1 2.6 2.2z" fill="currentColor" strokeWidth={1} />
    </svg>
  )
}

const icons = { camera: Camera, timer: Timer, shield: ShieldCheck, shieldPlus: ShieldPlus, shieldHeart: ShieldHeart, money: Banknote }

export default function WorkFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section aria-labelledby="faq-heading" className="bg-[#e3f2fd] py-16" id="faq">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Frequently Asked Questions</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[50px]" id="faq-heading">
            Key things to know about <Accent>Our Work</Accent> &amp; quoting
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/75">
            Find answers to common questions about our services, quotes, call-out fees, bookings and how we handle
            repairs and maintenance across Melbourne.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-[894px] space-y-3.5">
          {workFaqs.map((item, i) => {
            const Icon = icons[item.icon]
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            return (
              <li className="rounded-lg bg-white shadow-sm" key={item.question}>
                <h3>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-5 text-left sm:gap-4 sm:px-6 sm:py-6"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    type="button"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e9ecf8] text-brand-sky">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 text-base font-medium tracking-tight text-brand-ink sm:text-lg">{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9ecf8] text-[#0b5f8a]">
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>
                </h3>
                <div hidden={!isOpen} id={panelId}>
                  <p className="px-4 pb-6 text-base sm:px-6 leading-relaxed text-brand-muted sm:pl-[76px] sm:pr-16">{item.answer}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
