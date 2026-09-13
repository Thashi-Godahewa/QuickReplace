import { metrics } from '../data/siteData'

export default function Metrics() {
  return (
    <section aria-label="Key Performance Indicators" className="border-y border-slate-100 bg-white py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {metrics.map((m) => (
          <div className="p-4" key={m.label}>
            <div className="text-3xl lg:text-4xl font-extrabold text-slate-900">{m.value}</div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
