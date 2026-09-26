import { useMemo, useState } from 'react'
import { projectFilters, projects } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

// Repeat the list so each marquee row is always wide enough to loop smoothly
function fillRow(items, minLength = 6) {
  if (items.length === 0) return []
  const out = []
  while (out.length < minLength) out.push(...items)
  return [...out, ...out]
}

function ProjectTile({ project, hidden }) {
  return (
    <figure
      aria-hidden={hidden}
      className="group relative h-[200px] w-[250px] shrink-0 overflow-hidden rounded-2xl bg-brand-mist sm:h-[255px] sm:w-[320px]"
      tabIndex={hidden ? -1 : 0}
    >
      <img alt={project.alt} className="h-full w-full object-cover" loading="lazy" src={project.src} />
      <figcaption className="absolute inset-0 flex items-end bg-gradient-to-br from-[#013a5e] to-brand-navy p-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
        <div className="border-l-2 border-brand-sky pl-3">
          <p className="text-lg font-semibold tracking-tight text-white">{project.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{project.subtitle}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState(projectFilters[0])

  const filtered = useMemo(
    () => (filter === projectFilters[0] ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const rowOne = fillRow(filtered)
  const rowTwo = fillRow([...filtered].reverse())

  return (
    <section aria-labelledby="projects-heading" className="border-b border-brand-line bg-white py-16 lg:py-11" id="projects">
      <Container>
        <div className="text-center">
          <SectionBadge>Projects</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="projects-heading">
            <Accent>Projects</Accent> we have done
          </h2>
        </div>

        <div
          aria-label="Filter projects by trade"
          className="no-scrollbar -mx-6 mt-14 flex gap-2.5 overflow-x-auto px-6 lg:mx-0 lg:justify-between lg:px-1"
          role="group"
        >
          {projectFilters.map((f) => (
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
      </Container>

      {filtered.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-6 text-center text-brand-muted">
          We are adding photos for {filter.toLowerCase()} jobs soon. Get in touch to see recent examples.
        </p>
      ) : (
        <div className="mx-auto mt-8 max-w-7xl space-y-6 px-6 lg:px-12">
          <div className="edge-fade marquee-pause overflow-hidden">
            <div className="flex w-max animate-marquee-slow gap-6" key={`one-${filter}`}>
              {rowOne.map((p, i) => (
                <ProjectTile hidden={i >= rowOne.length / 2} key={`${p.src}-${i}`} project={p} />
              ))}
            </div>
          </div>
          <div className="edge-fade marquee-pause overflow-hidden">
            <div className="flex w-max animate-marquee-reverse gap-6" key={`two-${filter}`}>
              {rowTwo.map((p, i) => (
                <ProjectTile hidden={i >= rowTwo.length / 2} key={`${p.src}-${i}`} project={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
