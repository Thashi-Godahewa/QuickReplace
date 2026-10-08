import { Container } from '../ui'

export default function ServiceQuote({ quote }) {
  return (
    <section aria-label="Our promise" className="bg-[#e3f2fd] py-20">
      <Container className="text-center">
        <blockquote className="mx-auto max-w-4xl">
          <p className="text-2xl font-bold leading-snug tracking-tight text-brand-ink sm:text-[32px]">&ldquo;{quote.text}&rdquo;</p>
          <footer className="mt-4 text-sm font-semibold uppercase tracking-wider text-brand-sky">{quote.label}</footer>
        </blockquote>
      </Container>
    </section>
  )
}
