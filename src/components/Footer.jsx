const serviceLinks = [
  'Plumbing & Leak Repairs',
  'Electrical & Switchboards',
  'Emergency Glazing & Board-Up',
  'Make Safe & Hazard Containment',
  'Locksmith & Security',
  'Painting & Plastering',
]

const companyLinks = ['About Us', 'Recent Projects', 'Customer Reviews', 'Pricing & Estimates', 'Careers']

export default function Footer() {
  return (
    <footer aria-label="Footer" className="bg-slate-950 text-slate-400 py-16 px-6 md:px-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0zM12 6.83L8.46 10.37a5 5 0 1 0 7.08 0z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Quick Replace</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Top-tier residential and commercial rapid property maintenance, plumbing, electrical, glazing, locksmith, and emergency make-safe repairs.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg">
              <span>Licensed, Bonded &amp; Insured • Master Trades Lic #QR-94281</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a className="hover:text-blue-400 transition-colors" href="#services">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a className="hover:text-blue-400 transition-colors" href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-white font-semibold">HQ:</span>
                <span>742 Evergreen Terrace, Suite 400, New York, NY</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-semibold">Phone:</span>
                <a className="hover:text-white" href="tel:8005550199">(800) 555-0199</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-semibold">Hours:</span>
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Quick Replace Services Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
