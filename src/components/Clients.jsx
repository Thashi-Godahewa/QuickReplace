import { clients } from '../data/siteData'

export default function Clients() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-12">
      <h3 className="text-center text-xl font-semibold tracking-tight text-brand-ink">
        Some of the businesses we work with
      </h3>
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:flex-nowrap lg:justify-between lg:gap-x-6 lg:px-10">
        {clients.map((c) => (
          <li key={c.name}>
            <img
              alt={c.name}
              className="max-h-9 w-auto max-w-[80px] object-contain opacity-90 grayscale-[20%] transition hover:opacity-100 hover:grayscale-0"
              loading="lazy"
              src={c.src}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
