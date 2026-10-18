import { useState } from 'react'
import { Mail, ShieldCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Container } from '../components/ui'
import { ClauseBlocks, ClauseCard, useActiveClause } from '../components/legal/LegalClauses'
import { contact } from '../data/siteData'
import { termsClauses } from '../data/termsData'
import usePageTitle from '../hooks/usePageTitle'

export default function TermsPage() {
  usePageTitle('Terms & Conditions')
  const [ids] = useState(() => termsClauses.map((c) => c.id))
  const active = useActiveClause(ids)

  return (
    <>
      <PageHero
        breadcrumb="Terms & Conditions"
        heading={<span className="text-brand-sky">Terms &amp; Conditions</span>}
        image="/images/privacy-hero.jpg"
        imageAlt="The Quick Replace team standing outside a residential apartment building"
        imagePosition="object-top"
        showActions={false}
        showReviews={false}
        showTagline={false}
      />

      <div className="bg-white py-12 lg:py-16">
        <Container wide>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
            {/* Sidebar: index of clauses + enquiries box */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Index of clauses" className="rounded-xl bg-white p-5 shadow-[0_4px_20px_-12px_rgba(0,27,51,0.2)]">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-ink">Index of clauses</p>
                <ol className="mt-5 space-y-3.5 pl-4 text-[15px] text-brand-ink/80">
                  {termsClauses.map((c, i) => (
                    <li key={c.id}>
                      <a
                        aria-current={active === c.id ? 'true' : undefined}
                        className={`transition-colors hover:text-brand-sky ${active === c.id ? 'font-semibold text-brand-sky' : ''}`}
                        href={`#${c.id}`}
                      >
                        {i + 1}. {c.indexLabel}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_-12px_rgba(0,27,51,0.2)]">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-brand-ink">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5 text-brand-sky" strokeWidth={1.75} />
                  Enquiries and complaints
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-muted">
                  If you have a complaint or a concern about our terms &amp; conditions, please write to us.
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
              {termsClauses.map((c) => (
                <ClauseCard active={active === c.id} id={c.id} key={c.id} title={c.title}>
                  <ClauseBlocks blocks={c.blocks} />
                </ClauseCard>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
