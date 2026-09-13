const cards = [
  {
    title: 'Plumbing',
    description: 'Rapid leak detection, pipe replacements, tap fixes, and full emergency plumbing repairs.',
    iconBg: 'bg-blue-600 group-hover:bg-slate-900',
    icon: (
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0zM12 6.83L8.46 10.37a5 5 0 1 0 7.08 0z" />
    ),
  },
  {
    title: 'Electrical',
    description: 'Switchboard upgrades, faulty wiring diagnostics, power point repairs, and certified make-safe inspections.',
    iconBg: 'bg-slate-900 group-hover:bg-blue-600',
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Glazing',
    description: 'Emergency glass replacement, window pane repairs, shattered glazing board-up, and commercial security glass.',
    iconBg: 'bg-slate-900 group-hover:bg-blue-600',
    icon: <path d="M3 3h18v18H3V3zm9 0v18M3 12h18" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Make Safe',
    description: 'Immediate hazard containment, storm damage securing, structural stabilization, and priority emergency response.',
    iconBg: 'bg-blue-600 group-hover:bg-slate-900',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Locksmith',
    description: 'Emergency lockout services, deadbolt replacements, high-security lock fittings, and rekeying solutions.',
    iconBg: 'bg-slate-900 group-hover:bg-blue-600',
    icon: (
      <>
        <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    title: 'Painting & Plastering',
    description: 'Seamless drywall repairs, plaster crack patching, interior touch-ups, and full surface restoration.',
    iconBg: 'bg-slate-900 group-hover:bg-blue-600',
    icon: (
      <>
        <path d="M19 11V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z" />
        <path d="M19 7h2a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2h-6v4a2 2 0 0 0 2 2h1a1 1 0 0 1 1 1v3" />
      </>
    ),
  },
]

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="py-24 px-6 md:px-12 bg-[#fafbfc]" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold">
            <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
            </svg>
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight" id="services-heading">
            Our Expertise: <span className="font-serif italic font-medium text-blue-600">Quality</span> Handyman Solutions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            At Quick Replace, we provide comprehensive property maintenance and emergency trade solutions. From minor repairs to emergency make-safe works, our licensed multi-trade specialists are on call 24/7.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center mb-6 shadow-md transition-colors ${card.iconBg}`}>
                  <svg className="w-6 h-6 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{card.description}</p>
              </div>
              <a className="text-xs font-bold text-slate-900 hover:text-blue-600 underline underline-offset-4 flex items-center gap-1 group-hover:gap-2 transition-all" href="#contact">
                <span>Learn More</span>
                <svg className="w-3 h-3 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom Centered Blue Action Button */}
        <div className="mt-14 text-center">
          <a className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-3 rounded-full shadow-md shadow-blue-600/25 transition-all hover:scale-105" href="#services">
            <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center">
              <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span>View all services</span>
          </a>
        </div>
      </div>
    </section>
  )
}
