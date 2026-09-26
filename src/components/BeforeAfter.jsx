import { MapPin } from 'lucide-react'
import { beforeAfter } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

export default function BeforeAfter() {
  return (
    <section aria-labelledby="results-heading" className="border-y border-brand-line bg-white py-16 lg:py-11" id="results">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionBadge>Before &amp; After</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="results-heading">
            <Accent>Result</Accent> you can see
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-muted">
            See some of the repairs, maintenance and building works we&rsquo;ve completed for residential and commercial
            properties across Melbourne.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beforeAfter.map((job) => (
            <li className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-line" key={job.title}>
              <div className="relative aspect-[378/279]">
                <img alt={job.alt} className="h-full w-full object-cover" loading="lazy" src={job.src} />
                <span className="absolute left-3 top-3 rounded-md bg-brand-navy px-2 py-0.5 text-sm font-semibold text-white">
                  Before
                </span>
                <span className="absolute right-3 top-3 rounded-md border border-brand-sky bg-white px-2 py-0.5 text-sm font-semibold text-brand-ink">
                  After
                </span>
                <img alt="" className="absolute bottom-3 left-4 h-10 w-10 rounded-lg" src="/images/quick-replace-mark.png" />
                <span className="absolute bottom-4 right-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-sm text-brand-ink/80 shadow-sm">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" stroke="white" />
                  {job.location}
                </span>
              </div>
              <div className="px-4 pb-5 pt-4">
                <h3 className="text-[22px] font-medium text-brand-ink">{job.title}</h3>
                <span className="mt-1 inline-block rounded bg-brand-skySoft px-2.5 py-0.5 text-sm font-medium text-brand-sky">
                  {job.tag}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
