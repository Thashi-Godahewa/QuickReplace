export default function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="py-16 px-6 md:px-12 bg-white" id="contact">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#090d16] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            Emergency Dispatch Standing By
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight" id="cta-heading">
            Need an Emergency Repair or Make Safe Right Now? Quick Replace Is Ready.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Don't let water leaks, electrical hazards, or broken glazing risk property damage. Our certified local technicians arrive in 30 minutes or less.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-transform hover:scale-105" href="tel:8005550199">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>Call (800) 555-0199 Now</span>
            </a>
            <a className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-xs sm:text-sm px-5 py-4 rounded-full border border-slate-700 hover:border-slate-500 transition-colors" href="#quote">
              <span>Or Schedule an Online Inspection Estimate</span>
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
