import { deployments } from '../../data/clientsData'
import { Container } from '../ui'

export default function Deployments() {
  return (
    <section aria-label="Recent client deployments" className="bg-white pb-8 pt-4">
      <Container wide>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {deployments.map((d) => (
            <li className="relative h-72 overflow-hidden sm:h-auto sm:aspect-[596/320] rounded-xl bg-brand-navy" key={d.title}>
              <img alt={d.alt} className="h-full w-full object-cover" loading="lazy" src={d.src} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-sky-200/90 sm:text-xs">{d.label}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-white sm:text-xl">{d.title}</h3>
                <p className="mt-1 max-w-xl text-xs leading-snug text-white/85 sm:text-sm">{d.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
