// Content for the About Us page, taken from the Figma design.

export const founder = {
  name: 'Sonny Rolih',
  linkedin: 'https://www.linkedin.com/in/sonnyrolih',
  image: '/images/about-founder.jpg',
  imageAlt: 'Sonny Rolih, Managing Director of Quick Replace, wearing a blue Quick Replace polo shirt',
  caption: 'Sonny Rolih • Managing Director',
}

export const story = {
  heading: 'Built to do things differently',
  // The founder's name is inserted between `introBefore` and `introAfter`
  introBefore: 'Quick Replace was founded by ',
  introAfter:
    ' after years of working with major hotel groups and builders and seeing first-hand how difficult it could be to find reliable tradespeople.',
  paragraphs: [
    "Too often, clients were left waiting for contractors who didn't show up when promised, quotes that never arrived, or invoices where it wasn't clear what they were actually paying for.",
    'We knew there had to be a better way. Clients needed reliable tradespeople, clear communication, transparent pricing and one point of contact who would take responsibility for getting the job done.',
  ],
  quote: 'Be a company people can rely on.',
  quoteNote:
    "It's a simple principle, but it still guides how we work today - answer the phone, communicate clearly, do quality work and follow through on what we promise.",
}

// `icon` keys map to lucide-react icons in HowWeWork.jsx
export const principles = [
  {
    number: '01',
    tag: 'Reliable Service',
    icon: 'clock',
    title: 'Show up when we say we will.',
    text: 'We arrive as arranged, complete the work properly and keep you informed if anything changes.',
    footer: 'We Follow Through',
  },
  {
    number: '02',
    tag: 'Clear Communication',
    icon: 'messages',
    title: 'Keep you informed.',
    text: "We explain what we've found, what needs to be done and keep you updated as the job progresses.",
    footer: 'Clear Updates',
  },
  {
    number: '03',
    tag: 'Transparent Quotes',
    icon: 'receipt',
    title: 'Make the costs clear.',
    text: "Our quotes clearly explain the scope of work and costs, so you understand what you're approving before work begins.",
    footer: 'Clear Quoting',
  },
  {
    number: '04',
    tag: 'Practical Solutions',
    icon: 'tools',
    title: 'Help find the right solution.',
    text: "Not every property problem is straightforward. We'll help identify the issue, explain the options and work out the best way forward.",
    footer: 'Problem Solving',
  },
]

export const multiTradePoints = [
  'One Point of Contact for Multiple Trades',
  'Clear Communication & Regular Updates',
  'Repairs Managed from Start to Finish',
]

// `icon` keys map to lucide-react icons in MultiTrade.jsx
export const coordinatedTrades = [
  { icon: 'plumbing', title: 'Plumbing', text: 'Hot water systems, burst pipes, leaking taps, blocked drains and general plumbing repairs.' },
  { icon: 'electrical', title: 'Electrical', text: 'Electrical repairs, faulty power points, lighting, safety switches and switchboard maintenance.' },
  { icon: 'hvac', title: 'Heating & Cooling', text: 'Air conditioning repairs, ducted heating and cooling servicing, fault diagnosis and system replacements.' },
  { icon: 'glazing', title: 'Glazing', text: 'Broken glass replacement, window repairs, commercial glazing and emergency glass make-safe services.' },
  { icon: 'painting', title: 'Painting & Plaster', text: 'Interior painting, plaster repairs, wall and ceiling damage, patching and property make-good works.' },
  {
    icon: 'makeSafe',
    title: 'Make Safe',
    text: 'Urgent property repairs, securing damaged doors and windows, hazard reduction and temporary repairs to help protect people and property.',
  },
]

// Our Journey timeline. `label` is the short text under each year on the timeline.
export const journey = [
  {
    year: '2019',
    label: 'Our Beginning',
    title: 'Our Beginning',
    text: 'Quick Replace was founded by Sonny Rolih in Melbourne, with the support of his wife and family. Starting with glazing, painting and electrical services, the goal was simple: make property maintenance easier and more reliable for clients.',
    highlights: ['Melbourne Founded', 'Glazing, Painting & Electrical', 'Family-Supported Business'],
    boxLabel: 'Our Mission',
    boxQuote:
      'Make property maintenance easier with reliable tradespeople, clear communication and one point of contact.',
  },
  {
    year: '2021',
    label: 'Personal Approach',
    title: 'Building Lasting Client Relationships',
    text: 'Quick Replace continued building long-term relationships with property managers, businesses and homeowners. We take a personal approach, getting to know our clients and their properties while keeping records of previous maintenance issues, repairs and solutions. This helps us provide a more consistent and efficient service every time.',
    highlights: ['Personal Approach', 'Property Maintenance History', 'Long-Term Relationships'],
    boxLabel: 'Our Personal Approach',
    boxQuote:
      "We don't just remember our clients. We know their properties, understand their maintenance history and keep track of what's been done.",
  },
  {
    year: '2023',
    label: 'One Contact Multiple Trades',
    title: 'One Contact. Multiple Trades.',
    text: 'As our range of services expanded, Quick Replace made it easier for clients to arrange different repairs and maintenance jobs through one point of contact. From organising trades to following up on completed work, we focused on making property maintenance simpler.',
    highlights: ['Multiple Trades', 'One Point of Contact', 'Simplified Maintenance'],
    boxLabel: 'Our Advantage',
    boxQuote: 'One contact for multiple trades, making property maintenance simpler from start to finish.',
  },
  {
    year: '2025',
    label: 'Growing Across Melbourne',
    title: 'Growing Across Melbourne',
    text: 'Quick Replace continued expanding its network of experienced tradespeople and contractors, strengthening our ability to handle residential, commercial and ongoing property maintenance across Melbourne while maintaining the personal service our clients value.',
    highlights: ['Contractor Network', 'Commercial Maintenance', 'Melbourne-Wide Services'],
    boxLabel: 'Our Commitment',
    boxQuote: 'As our network grows, our commitment to personal service stays the same.',
  },
  {
    year: '2026',
    label: '160+ Tradespeople & Contractors',
    title: 'Quick Replace Today',
    text: 'Today, Quick Replace works with a network of more than 160 experienced tradespeople and contractors across Melbourne. From everyday repairs to larger multi-trade jobs, we help property managers, businesses and homeowners get their maintenance sorted, with one point of contact throughout the process.',
    highlights: ['160+ Trade Network', '20+ Service Categories', 'One Point of Contact'],
    boxLabel: 'Looking Ahead',
    boxQuote: 'Keep growing, keep improving and never lose the personal service our clients rely on.',
  },
]
