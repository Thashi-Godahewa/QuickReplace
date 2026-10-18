import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'

// Shared pieces for the Privacy Policy and Terms & Conditions pages.

// Highlights the clause currently being read, so the index and the dark card follow the reader.
// The current clause is the last one whose top has passed 30% of the screen height.
export function useActiveClause(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActive(atBottom ? ids[ids.length - 1] : current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

export function ClauseCard({ id, title, active, children }) {
  const card = active
    ? 'bg-gradient-to-br from-[#003a5c] to-brand-footer text-white'
    : 'bg-[#e5f3fd] text-brand-ink'
  const body = active ? 'text-white' : 'text-brand-ink/80'

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-28 rounded-xl px-6 py-8 transition-colors duration-300 sm:px-9 sm:py-10 ${card}`}
      id={id}
    >
      <h2 className="flex items-center gap-4 text-2xl font-semibold tracking-tight sm:text-[32px]" id={`${id}-heading`}>
        <ShieldCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-brand-sky" strokeWidth={1.75} />
        {title}
      </h2>
      <div className={`mt-6 space-y-5 text-[15px] font-medium leading-relaxed ${body}`}>{children}</div>
    </section>
  )
}

export function ClauseBlocks({ blocks }) {
  return blocks.map((b, i) =>
    b.type === 'list' ? (
      <ul className="list-disc space-y-5 pl-6 marker:text-current" key={i}>
        {b.items.map((item) => (
          <li className="pl-1" key={item}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p key={i}>{b.text}</p>
    ),
  )
}
