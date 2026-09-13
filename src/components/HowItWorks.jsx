const steps = [
  {
    step: 'STEP 01',
    title: 'Request & Triage',
    description: 'Log your repair or emergency online 24/7. Detail your issue and get matched instantly with certified local trades.',
    tag: 'Instant triage & intake',
    of: 'Step 1 of 4',
    icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />,
    dark: true,
  },
  {
    step: 'STEP 02',
    title: 'Rapid Dispatch',
    description: 'Our licensed plumbers, electricians, or technicians are mobilized with average arrival times under 30 minutes.',
    tag: 'Sub-30 min arrival',
    of: 'Step 2 of 4',
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    step: 'STEP 03',
    title: 'Make Safe & Fixed Quote',
    description: 'We secure immediate hazards, perform on-the-spot assessments, and present clear transparent upfront pricing.',
    tag: 'Immediate hazard containment',
    of: 'Step 3 of 4',
    icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    step: 'STEP 04',
    title: 'Permanent Fix & Guarantee',
    description: 'Fast, precision repair execution backed by our 100% satisfaction guarantee and warranty.',
    tag: '100% Guaranteed workmanship',
    of: 'Step 4 of 4',
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="process-heading" className="py-24 px-6 md:px-12 bg-white border-t border-slate-100" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold">
            <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight" id="process-heading">
            How It Works: <span className="font-serif italic font-medium text-blue-600">Seamless Service</span> in 4 Simple Steps
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Getting reliable property repairs or emergency make-safe response has never been easier. Explore each step to see how our certified multi-trade technicians deliver prompt, stress-free solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className={
                s.dark
                  ? 'bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300'
                  : 'bg-[#fafbfc] text-slate-900 rounded-3xl p-8 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300'
              }
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg font-extrabold text-base">
                    <svg className="w-6 h-6 stroke-current stroke-2 fill-none text-white" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </div>
                  <span
                    className={
                      s.dark
                        ? 'px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30'
                        : 'px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80'
                    }
                  >
                    {s.step}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className={`text-xl font-bold tracking-tight ${s.dark ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${s.dark ? 'text-slate-300' : 'text-slate-500'}`}>{s.description}</p>
                </div>
              </div>
              <div className={`pt-6 mt-6 border-t flex items-center justify-between ${s.dark ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.dark ? 'text-blue-400' : 'text-blue-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dark ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                  {s.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium">{s.of}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
