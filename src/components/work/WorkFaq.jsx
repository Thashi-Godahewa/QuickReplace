import { useState } from 'react'
import { Banknote, Camera, ChevronDown, Network, ShieldCheck, ShieldPlus, Timer } from 'lucide-react'
import { workFaqs } from '../../data/workData'
import { Accent, Container, SectionBadge } from '../ui'

const icons = { camera: Camera, timer: Timer, network: Network, shield: ShieldCheck, shieldPlus: ShieldPlus, money: Banknote }

export default function WorkFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section aria-labelledby="faq-heading" className="bg-[#e3f2fd] py-16" id="faq">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Frequently Asked Questions</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[50px]" id="faq-heading">
            Everything you need to know about <Accent>Our Work</Accent> &amp; quoting
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-ink/75">
            Clear answers regarding photographic reporting, warranties, multi-trade coordination, and Melbourne-wide
            rapid dispatch.
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
