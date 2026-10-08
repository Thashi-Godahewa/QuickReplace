import { useMemo, useState } from 'react'
import { BadgeCheck, MapPin } from 'lucide-react'
import { workFilters, workProjects } from '../../data/workData'
import { Accent, Container, SectionBadge } from '../ui'

function ProjectCard({ project }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-line">
      <div className="relative aspect-[386/280]">
        <img alt={project.alt} className="h-full w-full object-cover" loading="lazy" src={project.src} />
        <span className="absolute left-3 top-3 rounded-md bg-brand-navy px-2 py-0.5 text-sm font-semibold text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-md border border-brand-sky bg-white px-2 py-0.5 text-sm font-semibold text-brand-ink">
          After
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-6 pt-4">
        <h3 className="text-[22px] font-medium text-brand-ink">{project.title}</h3>
        <span className="mt-1 self-start rounded bg-brand-skySoft px-2.5 py-0.5 text-sm font-medium text-brand-sky">
          {project.tag}
        </span>
        <p className="mt-5 flex items-center gap-1.5 text-[13px] text-brand-ink/80">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#0b5f8a]" />
          {project.location}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">{project.description}</p>
      </div>
    </li>
  )
}

export default function WorkGallery() {
  const [filter, setFilter] = useState(workFilters[0])
  const shown = useMemo(
    () => (filter === workFilters[0] ? workProjects : workProjects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section aria-labelledby="results-heading" className="bg-white pt-12" id="results">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Before &amp; After</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="results-heading">
            <Accent>Results</Accent> you can see
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-muted">
            Every repair, fit-out, and restoration project is documented with high-resolution photographic proof for
            transparent reporting to strata managers, commercial property owners, and insurers.
          </p>
        </div>

        <div
          aria-label="Filter projects by trade"
          className="no-scrollbar -mx-6 mt-8 flex gap-2.5 overflow-x-auto px-6 lg:mx-0 lg:justify-between lg:px-0"
          role="group"
        >
          {workFilters.map((f) => (
            <button
              aria-pressed={filter === f}
              className={`shrink-0 rounded-full border px-5 py-2 text-[15px] transition-colors ${
                filter === f
                  ? 'border-brand-navy bg-brand-navy font-semibold text-white'
                  : 'border-brand-line bg-white text-brand-ink hover:border-brand-sky hover:text-brand-sky'
              }`}
              key={f}
              onClick={() => setFilter(f)}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        {shown.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </ul>
        ) : (
          <p className="mx-auto my-16 max-w-md text-center text-brand-muted">
            We are adding photos for {filter.toLowerCase()} jobs soon. Get in touch to see recent examples.
          </p>
        )}
      </Container>

      <p className="mt-12 flex items-center justify-center gap-2 border-y border-brand-line px-6 py-8 text-center text-[15px] text-brand-ink/80">
        <BadgeCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-sky" />
        All projects photographed &amp; certified by licensed master trades
      </p>
    </section>
  )
}
