// Content for the About Us page.
// Figures (7.4 years, 350+, 99.2%) come from the Figma design and
// must be confirmed with Quick Replace before launch.

export const founder = {
  name: 'Sonny Rolih',
  image: '/images/about-founder.jpg',
  imageAlt: 'Sonny Rolih, founder of Quick Replace, wearing a blue Quick Replace polo shirt',
  caption: 'Sonny Rolih • Executive Guarantee',
}

export const story = {
  heading: 'Built to Do Things Differently',
  // The founder's name is inserted between `introBefore` and `introAfter`
  introBefore: 'Quick Replace was founded by ',
  introAfter:
    ', after years of working with major hotel groups and builders and seeing first-hand how difficult it could be to find reliable tradespeople.',
  paragraphs: [
    "Too often, clients were left waiting for contractors who didn't show up when promised, quotes that never arrived, or invoices where it wasn't clear what they were actually paying for.",
    "We realized that premium facilities and discerning homeowners didn't just need a plumber or an electrician - they needed absolute engineering transparency, single-point accountability, and a team that treats high-stakes emergencies with surgical precision.",
  ],
  quote: 'Be a company people can rely on.',
  quoteNote:
    'The foundational operating principle that guides every Quick Replace service call, emergency make-safe, and preventative maintenance contract.',
}

// `icon` keys map to lucide-react icons in HowWeWork.jsx
export const principles = [
  {
    number: '01',
    tag: 'Reliable Service',
    icon: 'clock',
    title: 'Show up when we say we will.',
    text: 'Punctual technician dispatch tracked in real-time with verified GPS arrival windows.',
    footer: 'On-Time Standard',
  },
  {
    number: '02',
    tag: 'Clear Communication',
    icon: 'messages',
    title: 'Keep clients informed throughout the job.',
    text: 'Instant status updates from diagnosis to photographic completion sign-off.',
    footer: 'Client Portal',
  },
  {
    number: '03',
    tag: 'Transparent Quotes',
    icon: 'receipt',
    title: 'Make costs clear from the beginning.',
    text: 'Upfront itemized scopes with zero hidden call-out fees or unexpected post-repair extras.',
    footer: 'Pricing Policy',
  },
  {
    number: '04',
    tag: 'Practical Solutions',
    icon: 'tools',
    title: 'Find a way forward when problems arise.',
    text: 'Master trade problem solving for complex facility issues, aging infrastructure, and custom builds.',
    footer: 'Resolution Rate',
  },
]

// `icon` keys map to lucide-react icons in MultiTrade.jsx
export const coordinatedTrades = [
  { icon: 'plumbing', title: 'Plumbing', text: 'Burst pipes, backflow valves & boilers' },
  { icon: 'electrical', title: 'Electrical', text: 'Switchboards, fault isolation & testing' },
  { icon: 'hvac', title: 'Heating & Cooling', text: 'Ducted system motor replacements' },
  { icon: 'glazing', title: 'Glazing', text: 'AS1288 emergency make-safes & facade glass' },
  { icon: 'painting', title: 'Painting & Plaster', text: 'Tenancy make-goods, moisture repairs' },
  { icon: 'makeSafe', title: 'Make Safe', text: 'Immediate physical risk mitigation' },
]

export const trust = {
  image: '/images/about-trust.jpg',
  imageAlt: 'Quick Replace technicians servicing equipment in a multi-level glass office building',
  tenure: { value: '7.4 Years', label: 'Average Client Partnership Tenure', tag: 'Melbourne Wide' },
  heading: 'Trust Built Over Time',
  text: 'Over time, we have built strong relationships with property managers, businesses and property owners across Melbourne. Many of those relationships are based on something very simple - trust.',
  quote: 'We have never lost a client because of our service.',
  quoteText:
    'Many of our clients have been with us for years, and those long-term relationships are what we value most. We earn retention through consistent performance, transparent documentation, and showing up ready to execute.',
  stats: [
    { icon: 'portfolio', value: '350+', label: 'Active Strata & Commercial Portfolios' },
    { icon: 'sla', value: '99.2%', label: 'SLA Rapid Response Adherence' },
  ],
}
