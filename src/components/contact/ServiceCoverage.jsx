export default function ServiceCoverage() {
  return (
    <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-brand-ink">Service Coverage</h2>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
          Melbourne-wide
        </span>
      </div>
      <div className="relative mt-3 h-52 overflow-hidden rounded-xl border border-brand-line bg-brand-skySoft">
        {/* Zoomed in on the inner suburbs of the full service area map */}
        <img
          alt="Map of the Quick Replace service area centred on Melbourne"
          className="absolute left-1/2 top-1/2 w-[135%] max-w-none -translate-x-[47%] -translate-y-[46%]"
          loading="lazy"
          src="/images/service-area-map.png"
        />
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-2 rounded-md bg-brand-ink/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-sky">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Residential • Commercial
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
        Providing property maintenance and building repair services across Melbourne CBD, Inner Melbourne and the wider
        Melbourne metropolitan area.
      </p>
    </div>
  )
}
