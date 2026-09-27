import { Mail, Phone } from 'lucide-react'
import { contact } from '../../data/siteData'

export default function ContactSidebar() {
  const rows = [
    { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: 'Sales', value: contact.email, href: contact.emailHref },
    { icon: Mail, label: 'Account', value: contact.accountsEmail, href: contact.accountsEmailHref },
  ]

  return (
    <aside aria-label="Other ways to contact us" className="space-y-6">
      <div className="rounded-2xl bg-brand-navy p-6 text-white shadow-card sm:p-7">
        <p className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-400">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red-400" />
          Emergency repairs &amp; make-safe
        </p>
        <h2 className="mt-4 text-xl font-semibold tracking-tight">Need Urgent Assistance?</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          For urgent blocked drains, water leaks, loss of power, broken glass or damaged shopfronts requiring an
          immediate make-safe, give us a call or send us an email.
        </p>
        <a
          className="mt-6 flex h-14 items-center justify-center gap-3 rounded-full bg-brand-sky text-lg font-semibold text-white shadow-glow transition-colors hover:bg-brand-skyHover"
          href={contact.phoneHref}
        >
          <Phone aria-hidden="true" className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          Call Now
        </a>
      </div>

      <div className="rounded-2xl border border-brand-sky/25 bg-brand-skySoft p-6 shadow-card sm:p-7">
        <h2 className="text-xl font-semibold tracking-tight text-brand-sky">Reach Out to Us</h2>
        <dl className="mt-4 space-y-4">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <div key={label}>
              <dt className="flex items-center gap-3 text-base font-medium text-brand-ink">
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label} :
              </dt>
              <dd className="mt-1 pl-7">
                <a className="break-all text-[15px] text-brand-ink/80 hover:text-brand-sky" href={href}>
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  )
}
