import { Network, ShieldCheck } from 'lucide-react'
import { clientsPartners, serviceApproach } from '../../data/clientsData'
import { Container } from '../ui'

function InfoCard({ icon: Icon, content, className = '' }) {
  return (
    <article className={`flex flex-col rounded-xl bg-white p-8 shadow-[0_6px_0_-2px_rgba(0,27,51,0.08),0_16px_30px_-20px_rgba(0,27,51,0.35)] ${className}`}>
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-sky">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
        {content.label}
      </p>
      <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-ink lg:text-[42px]">
        {content.heading[0]}
        <br />
        {content.heading[1]}
      </h2>
      <div className="mt-6 flex-1 space-y-5 text-base leading-relaxed text-brand-muted">
        {content.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <p className="mt-8 flex items-start gap-3 rounded-lg bg-brand-skySoft px-4 py-4 text-[15px] italic text-brand-ink">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-sky" />
        {content.callout}
      </p>
      <p className="mt-8 flex items-center gap-2.5 text-sm font-medium uppercase tracking-wide text-brand-ink">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-sky" />
        {content.footer}
      </p>
    </article>
  )
}

export default function ApproachCards() {
  return (
    <section aria-label="How we work with clients" className="bg-[#e3f2fd] py-16">
      <Container wide className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <InfoCard className="lg:col-span-5" content={serviceApproach} icon={Network} />
        <InfoCard className="lg:col-span-7" content={clientsPartners} icon={ShieldCheck} />
      </Container>
    </section>
  )
}
