import { useState } from 'react'
import { projects, projectFilters } from '../data/siteData'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Works')

  return (
    <section aria-labelledby="projects-heading" className="py-24 px-6 md:px-12 bg-white" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Heading & Filter Controls */}
        <div className="flex flex-col items-center space-y-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-center" id="projects-heading">
            Projects we have done
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2" role="tablist">
            {projectFilters.map((filter) => {
              const isActive = filter === activeFilter
              return (
                <button
                  key={filter}
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  className={
                    isActive
                      ? 'px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition-colors focus:outline-none'
                      : 'px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-slate-400 font-medium text-xs transition-colors focus:outline-none'
                  }
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        {/* 8-Card Showcase Grid (4 columns x 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p) => (
            <div key={p.label} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
              <img alt={p.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.src} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-semibold">{p.label}</span>
              </div>
            </div>
          ))}

          {/* Featured Signature Card (Dark Cobalt Blue) */}
          <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-blue-900 to-slate-950 p-6 flex flex-col justify-end text-white shadow-md border border-blue-800/40">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="space-y-1 relative z-10 border-l-2 border-blue-400 pl-3">
              <h3 className="text-lg font-bold text-white tracking-tight">Kitchen Plumbing</h3>
              <p className="text-xs text-blue-200">Installation, Kitchen Plumbing &amp; Upgrades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
