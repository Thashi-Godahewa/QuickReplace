import { Clock, Hammer, MessagesSquare, ReceiptText } from 'lucide-react'
import { principles } from '../../data/aboutData'
import { Container, SectionBadge } from '../ui'

const icons = { clock: Clock, messages: MessagesSquare, receipt: ReceiptText, tools: Hammer }

export default function HowWeWork() {
  return (
    <section aria-labelledby="how-heading" className="bg-white pb-16 pt-4" id="how-we-work">
      <Container wide>
        <SectionBadge>How We Work</SectionBadge>
        <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-[42px]" id="how-heading">
          Simple Service. Clear Communication.
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-brand-muted">
          For us, that means showing up when we say we will, communicating clearly, providing transparent quotes and
          doing our best to find a solution when a client needs help.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => {
            const Icon = icons[p.icon]
            return (
              <li
                className="flex flex-col overflow-hidden rounded-lg border-t-4 border-brand-sky bg-white shadow-[0_4px_16px_-8px_rgba(0,27,51,0.2)]"
                key={p.number}
              >
                <div className="flex-1 px-6 pb-5 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="whitespace-nowrap rounded bg-brand-skySoft px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-[#0b5f8a]">
                      {p.number} - {p.tag}
                    </span>
                    <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-sky" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-brand-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.text}</p>
                </div>
                <p className="bg-brand-mist px-6 py-3 text-[13px] font-medium text-brand-sky">{p.footer}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
