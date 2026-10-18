import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, Fan, Grid2x2, Headset, PaintRoller, Toolbox, Wrench, Zap } from 'lucide-react'
import { coordinatedTrades, multiTradePoints } from '../../data/aboutData'
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
    <section aria-labelledby="multi-trade-heading" className="bg-[#e3f2fd] py-16 lg:py-20" id="multi-trade">
      <Container wide className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionBadge>Multi-Trade Coordination</SectionBadge>
          <h2
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="multi-trade-heading"
          >
            One Contact. Multiple Trades.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-ink/75">
            If a job requires several different trades, we coordinate them so our clients don&apos;t have to spend
            their time chasing multiple contractors.
          </p>
          <ul className="mt-6 space-y-2.5 rounded-xl bg-white px-5 py-5 shadow-sm">
            {multiTradePoints.map((point) => (
              <li className="flex items-center gap-3 text-[15px] font-medium text-brand-ink" key={point}>
                <CircleCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0b5f8a]" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-medium text-brand-sky">Tell us what needs fixing. We&apos;ll take care of the rest.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8 lg:col-span-7">
          <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-brand-footer to-brand-navyLight px-5 py-5 text-white shadow-card">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Headset aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-lg font-semibold leading-snug">Quick Replace &ndash; One Point of Contact</p>
              <p className="mt-0.5 text-sm text-white/80">Multiple trades. One team looking after your property maintenance.</p>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coordinatedTrades.map((t) => {
              const Icon = icons[t.icon]
              return (
                <li className="rounded-lg bg-[#e8f1fd] px-4 py-4" key={t.title}>
                  <p className="flex items-center gap-2 text-lg font-semibold text-brand-ink">
                    <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-sky" />
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-brand-ink/70">{t.text}</p>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 flex justify-end border-t border-brand-line pt-3">
            <Link
              className="group inline-flex items-center gap-1.5 text-base font-semibold text-brand-sky hover:text-brand-skyHover"
              to="/services"
            >
              All Services
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
