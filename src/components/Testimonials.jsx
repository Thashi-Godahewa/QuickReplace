import { Star } from 'lucide-react'
import { testimonials } from '../data/siteData'
import useScroller from '../hooks/useScroller'
import Clients from './Clients'
import { Accent, CarouselArrows, Container, SectionBadge } from './ui'

export default function Testimonials() {
  const { ref, atStart, atEnd, prev, next } = useScroller()

  return (
    <section aria-labelledby="reviews-heading" className="bg-white pb-16 pt-16 lg:pt-11" id="reviews">
      <Container>
        <SectionBadge>Our Reviews</SectionBadge>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]" id="reviews-heading">
            What our <Accent>Clients</Accent> say
          </h2>
          <CarouselArrows
            label="review"
            nextDisabled={atEnd}
            onNext={next}
            onPrev={prev}
            prevDisabled={atStart}
          />
        </div>

        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto" ref={ref}>
          {testimonials.map((t) => (
            <li
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-brand-line bg-brand-mist p-8 sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
              data-card
              key={t.name}
            >
              <img
                alt=""
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                loading="lazy"
                src={t.avatar}
              />
              <blockquote className="mt-5 flex-1">
                <span aria-hidden="true" className="block font-serif text-2xl leading-none text-brand-sky">
                  &ldquo;
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">{t.quote}</p>
              </blockquote>
              <div className="mt-10 border-t border-brand-line pt-6">
                <div aria-label="5 out of 5 stars" className="flex gap-1 text-amber-400" role="img">
                  {[...Array(5)].map((_, i) => (
                    <Star aria-hidden="true" className="h-4 w-4" fill="currentColor" key={i} strokeWidth={0} />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-brand-ink">{t.name}</p>
                  <span className="shrink-0 whitespace-nowrap rounded bg-brand-skySoft px-2.5 py-0.5 text-sm font-medium text-brand-sky">
                    Verified Client
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Clients />
    </section>
  )
}
