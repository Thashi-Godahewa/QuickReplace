import { Fan, Grid2x2, Network, PaintRoller, Toolbox, Wrench, Zap } from 'lucide-react'
import { coordinatedTrades } from '../../data/aboutData'
import { Container, SectionBadge } from '../ui'

const icons = {
  plumbing: Wrench,
  electrical: Zap,
  hvac: Fan,
  glazing: Grid2x2,
  painting: PaintRoller,
  makeSafe: Toolbox,
}

export default function MultiTrade() {
  return (
    <section aria-labelledby="multi-trade-heading" className="bg-[#e3f2fd] py-20" id="multi-trade">
      <Container wide>
        <SectionBadge>Multi-Trade Coordination</SectionBadge>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <h2
            className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-ink sm:text-5xl lg:col-span-7 lg:text-[54px]"
            id="multi-trade-heading"
          >
            One Contact. Multiple Trades. <em className="font-bold italic text-brand-sky">One Clear Goal.</em>
          </h2>
          <p className="text-base leading-relaxed text-brand-ink/85 lg:col-span-5 lg:pl-10">
            Our goal hasn&rsquo;t changed since the beginning: look after our clients, make property maintenance easier,
            and never leave them wondering who to call when something goes wrong.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-4 border-b border-brand-navy/10 pb-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
            <Network aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <p className="flex flex-wrap items-center gap-x-2 text-xs">
              <span className="font-mono uppercase tracking-widest text-brand-sky">Central Operations Hub</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-muted/50" />
              <span className="text-brand-ink/70">Direct In-House Dispatch</span>
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-brand-ink">Quick Replace Central Command Desk</p>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {coordinatedTrades.map((t, i) => {
            const Icon = icons[t.icon]
            return (
              <li key={t.title}>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    i === 0 ? 'bg-brand-navy text-brand-sky' : 'bg-white text-brand-sky shadow-sm'
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <p className="mt-3 text-base font-semibold text-brand-ink">{t.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-brand-ink/70">{t.text}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
