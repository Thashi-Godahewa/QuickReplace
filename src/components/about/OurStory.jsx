import { founder, story } from '../../data/aboutData'
import { Container, SectionBadge } from '../ui'

// LinkedIn mark drawn inline, since lucide-react no longer ships brand logos
function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-9 w-9" viewBox="0 0 36 36">
      <circle cx="18" cy="18" fill="#0A66C2" r="18" />
      <path
        d="M11.2 14.6h3.1v10h-3.1v-10zm1.6-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm3.4 4.9h3v1.4h.04c.42-.79 1.44-1.62 2.97-1.62 3.17 0 3.76 2.09 3.76 4.8v5.42h-3.1v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-3.1v-10z"
        fill="#fff"
      />
    </svg>
  )
}

export default function OurStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-white py-14 lg:py-12" id="our-story">
      <Container wide className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:pr-4">
          <SectionBadge>Our Story</SectionBadge>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-brand-ink sm:text-[42px]" id="story-heading">
            {story.heading}
          </h2>
          <p className="mt-10 text-lg leading-relaxed text-brand-ink/85">
            {story.introBefore}
            <a
              className="font-semibold italic text-brand-sky underline-offset-4 hover:underline"
              href={founder.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              {founder.name}
            </a>
            {story.introAfter}
          </p>
          {story.paragraphs.map((p) => (
            <p className="mt-6 text-lg leading-relaxed text-brand-ink/85" key={p.slice(0, 20)}>
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
          <figcaption className="mt-8 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-brand-sky">
            <a
              aria-label={`${founder.name} on LinkedIn`}
              className="shrink-0 rounded-full transition-opacity hover:opacity-80"
              href={founder.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            {founder.caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
