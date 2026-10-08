import { metrics } from '../data/siteData'

export default function Metrics() {
  return (
    <section aria-label="Quick Replace in numbers" className="border-b border-brand-line bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-8 lg:grid-cols-4 lg:px-12 lg:py-9">
        {metrics.map((m, i) => (
          <div
            className={`flex flex-col items-center px-4 py-6 text-center ${
              i % 2 === 1 ? 'border-l border-brand-line' : ''
            } ${i > 0 ? 'lg:border-l lg:border-brand-line' : ''} ${i >= 2 ? 'border-t border-brand-line lg:border-t-0' : ''}`}
            key={m.label}
          >
            <dt className="order-last mx-auto mt-2 max-w-[200px] text-sm uppercase tracking-wide text-brand-muted sm:text-base">
              {m.label}
            </dt>
            <dd className="text-3xl font-bold tracking-tight text-brand-ink sm:text-[40px] sm:leading-none">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
