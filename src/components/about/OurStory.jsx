import { ShieldCheck } from 'lucide-react'
import { founder, story } from '../../data/aboutData'
import { Container, SectionBadge } from '../ui'

export default function OurStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-white py-14 lg:py-12" id="our-story">
      <Container wide className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:pr-4">
          <SectionBadge>Our Story</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-[42px]" id="story-heading">
            {story.heading}
          </h2>
          <p className="mt-10 text-lg leading-relaxed text-brand-ink">
            {story.introBefore}
            <em className="font-semibold italic text-brand-sky">{founder.name}</em>
            {story.introAfter}
          </p>
          {story.paragraphs.map((p) => (
            <p className="mt-4 text-base leading-relaxed text-brand-muted" key={p.slice(0, 20)}>
              {p}
            </p>
          ))}

          <blockquote className="mt-6 rounded-2xl border border-[#9fb6e6] bg-brand-skySoft px-8 py-10 sm:px-14">
            <p className="text-2xl font-bold tracking-tight text-brand-sky">&ldquo;{story.quote}&rdquo;</p>
            <span aria-hidden="true" className="mt-3 block h-px w-12 bg-brand-sky/30" />
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">{story.quoteNote}</p>
          </blockquote>
        </div>

        <figure className="lg:col-span-4 lg:pt-16">
          <img
            alt={founder.imageAlt}
            className="aspect-[401/522] w-full rounded-2xl object-cover shadow-card"
            loading="lazy"
            src={founder.image}
          />
          <figcaption className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-sky">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            {founder.caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
