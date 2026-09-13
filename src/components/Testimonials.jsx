import { useState } from 'react'
import { testimonials } from '../data/siteData'

export default function Testimonials() {
  const [start, setStart] = useState(0)
  const count = testimonials.length
  const visible = [0, 1, 2].map((i) => testimonials[(start + i) % count])

  const prev = () => setStart((s) => (s - 1 + count) % count)
  const next = () => setStart((s) => (s + 1) % count)

  return (
    <section aria-labelledby="testimonials-heading" className="py-24 px-6 md:px-12 bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Our Reviews</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900" id="testimonials-heading">
              What Our <span className="text-slate-400 font-medium">Clients</span> Say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous review"
              onClick={prev}
              className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md transition-transform hover:-translate-x-0.5 focus:outline-none"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Next review"
              onClick={next}
              className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md transition-transform hover:translate-x-0.5 focus:outline-none"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visible.map((r) => (
            <article key={r.name} className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <img alt={r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100" src={r.avatar} />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-xs font-semibold text-blue-700">
                    <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>{r.badge}</span>
                  </div>
                </div>
                <div className="text-blue-500 font-serif text-4xl leading-none mb-3">&ldquo;</div>
                <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-snug mb-8">{r.quote}</blockquote>
              </div>
              <div className="border-t border-slate-100 pt-6">
                <div className="text-sm font-bold text-slate-900">{r.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
