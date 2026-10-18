import { useEffect, useState } from 'react'
import { Mail, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Container } from '../components/ui'
import { contact } from '../data/siteData'
import { privacyClauses, privacyIntro } from '../data/privacyData'
import usePageTitle from '../hooks/usePageTitle'

const ENQUIRIES_ID = 'privacy-enquiries'

// Highlights the clause currently being read, so the index and the dark card follow the reader.
// The current clause is the last one whose top has passed 30% of the screen height.
function useActiveClause(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActive(atBottom ? ids[ids.length - 1] : current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

function ClauseCard({ id, title, active, children }) {
  const card = active
    ? 'bg-gradient-to-br from-[#003a5c] to-brand-footer text-white'
    : 'bg-[#e5f3fd] text-brand-ink'
  const body = active ? 'text-white' : 'text-brand-ink/80'

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-28 rounded-xl px-6 py-8 transition-colors duration-300 sm:px-9 sm:py-10 ${card}`}
      id={id}
    >
      <h2 className="flex items-center gap-4 text-2xl font-semibold tracking-tight sm:text-[32px]" id={`${id}-heading`}>
        <ShieldCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-sky" strokeWidth={1.75} />
        {title}
      </h2>
      <div className={`mt-6 space-y-5 text-[15px] font-medium leading-relaxed ${body}`}>{children}</div>
    </section>
  )
}

function ClauseBlocks({ blocks }) {
  return blocks.map((b, i) =>
    b.type === 'list' ? (
      <ul className="list-disc space-y-5 pl-6 marker:text-current" key={i}>
        {b.items.map((item) => (
          <li className="pl-1" key={item}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p key={i}>{b.text}</p>
    ),
  )
}

export default function PrivacyPolicyPage() {
  usePageTitle('Privacy Policy')
  const [ids] = useState(() => [...privacyClauses.map((c) => c.id), ENQUIRIES_ID])
  const active = useActiveClause(ids)

  return (
    <>
      <PageHero
        breadcrumb="Privacy Policy"
        heading={<span className="text-brand-sky">Privacy Policy</span>}
        image="/images/privacy-hero.jpg"
        imagePosition="object-top"
        imageAlt="The Quick Replace team standing outside a residential apartment building"
        showActions={false}
        showReviews={false}
        showTagline={false}
      />

      <div className="bg-white py-12 lg:py-16">
        <Container wide>
          {/* Intro */}
          <div className="rounded-xl bg-[#e5f3fd] px-6 py-8 sm:px-9 sm:py-10">
            <p className="text-2xl font-semibold leading-snug tracking-tight text-brand-ink sm:text-[30px]">
              {privacyIntro.heading}
            </p>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-brand-ink/75">
              {privacyIntro.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
            {/* Sidebar: index of clauses + enquiries box */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Index of clauses" className="rounded-xl bg-white p-5 shadow-[0_4px_20px_-12px_rgba(0,27,51,0.2)]">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-ink">Index of clauses</p>
                <ol className="mt-5 space-y-3.5 pl-4 text-[15px] text-brand-ink/80">
                  {privacyClauses.map((c, i) => (
                    <li key={c.id}>
                      <a
                        aria-current={active === c.id ? 'true' : undefined}
                        className={`transition-colors hover:text-brand-sky ${active === c.id ? 'font-semibold text-brand-sky' : ''}`}
                        href={`#${c.id}`}
                      >
                        {i + 1}. {c.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_-12px_rgba(0,27,51,0.2)]">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-brand-ink">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5 text-brand-sky" strokeWidth={1.75} />
                  Privacy enquiries and complaints
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-muted">
                  If you have a complaint or a concern about your privacy, please write to us.
                </p>
                <a
                  className="mt-5 flex items-center gap-3 rounded bg-[#e5f3fd] px-3 py-2.5 text-sm text-brand-ink transition-colors hover:text-brand-sky"
                  href={contact.emailHref}
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-brand-sky" />
                  {contact.email}
                </a>
              </div>
            </aside>

            {/* Clauses */}
            <div className="space-y-8">
              {privacyClauses.map((c) => (
                <ClauseCard active={active === c.id} id={c.id} key={c.id} title={c.title}>
                  <ClauseBlocks blocks={c.blocks} />
                </ClauseCard>
              ))}

              <ClauseCard active={active === ENQUIRIES_ID} id={ENQUIRIES_ID} title="Privacy enquiries and complaints">
                <p>
                  If you have a complaint or a concern about your privacy, please write to our Privacy Officer at{' '}
                  <a className="text-brand-sky hover:underline" href={contact.emailHref}>
                    {contact.email}
                  </a>
                </p>
                <address className="space-y-5 not-italic">
                  <p className="text-lg font-normal">Quick Replace Pty Ltd</p>
                  <p>
                    {contact.headOffice}
                    <br />
                    Australia
                  </p>
                </address>
              </ClauseCard>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
