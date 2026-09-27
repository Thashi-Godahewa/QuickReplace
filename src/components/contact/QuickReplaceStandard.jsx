import { Check } from 'lucide-react'
import { contactStandards } from '../../data/siteData'

export default function QuickReplaceStandard() {
  return (
    <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card sm:p-7">
      <h2 className="text-lg font-semibold uppercase tracking-wide text-brand-ink">The Quick Replace Standard</h2>
      <ul className="mt-5 space-y-4">
        {contactStandards.map((item) => (
          <li className="flex gap-3" key={item.title}>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-sky/40 bg-brand-skySoft text-brand-sky">
              <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
            </span>
            <p className="text-[15px] leading-relaxed text-brand-muted">
              <strong className="block font-semibold text-brand-ink">{item.title}</strong>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
