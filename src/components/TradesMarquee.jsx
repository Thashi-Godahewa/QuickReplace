import { trades } from '../data/siteData'

export default function TradesMarquee() {
  // The list is rendered twice so the -50% keyframe loops without a gap
  const loop = [...trades, ...trades]
  return (
    <div className="relative z-10 overflow-hidden bg-gradient-to-r from-[#01648a] via-brand-navy to-brand-navy py-4">
      <ul aria-label="Trades we cover" className="flex w-max animate-marquee items-center">
        {loop.map((trade, i) => (
          <li
            aria-hidden={i >= trades.length}
            className="flex items-center whitespace-nowrap text-base text-white sm:text-lg"
            key={`${trade}-${i}`}
          >
            <span className="px-7">{trade}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/70" />
          </li>
        ))}
      </ul>
    </div>
  )
}
