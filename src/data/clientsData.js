// Content for the Clients page.
// Figures, licence numbers and the case study come from the Figma design
// and must be confirmed with Quick Replace before launch.

// `icon` keys map to lucide-react icons in ClientSectors.jsx
export const clientSectors = [
  {
    icon: 'commercial',
    title: 'Commercial Property Managers & Owners',
    tags: 'High-Density Towers • Multi-Level Residential',
    description:
      'Property maintenance and repairs for offices, commercial buildings, warehouses and other business premises. From minor repairs to ongoing maintenance and multi-trade jobs, we provide one point of contact throughout the process.',
  },
  {
    icon: 'residential',
    title: 'Residential Property Managers & Owners',
    tags: 'Grade-A Towers • Tenancy Suites',
    description:
      'Repairs and maintenance for houses, apartments and units across Melbourne. We can communicate directly with tenants, arrange access, coordinate the required trades and provide before-and-after photos.',
  },
  {
    icon: 'strata',
    title: 'Owners Corporations & Strata Managers',
    tags: 'Business Parks • Civic Infrastructure',
    description:
      'Maintenance and repairs for common areas and shared property, with clear quoting, communication and reporting. We can coordinate access directly with building managers, committees and nominated contacts.',
  },
  {
    icon: 'agedCare',
    title: 'Aged Care & Retirement Living',
    tags: 'Retirement Villages • Day Surgeries',
    description:
      'Property maintenance for aged care facilities, retirement living properties and Home Care Package clients, with particular attention to communication, safety and minimising disruption to residents.',
  },
  {
    icon: 'retail',
    title: 'Retail & Hospitality Businesses',
    tags: 'Shopping Centers • Restaurant Strips',
    description:
      'Repairs and maintenance for shops, restaurants, cafés, hotels and other customer-facing businesses, with work organised to minimise disruption to staff, customers and normal operations.',
  },
  {
    icon: 'schools',
    title: 'Schools & Childcare Centres',
    tags: 'Private Schools • Child Care Centres',
    description:
      "Property repairs and maintenance for schools and childcare facilities, with work coordinated around the facility's requirements and schedule. Working with Children Checks can be provided where required.",
  },
  {
    icon: 'industrial',
    title: 'Industrial & Warehouse Operators',
    tags: 'Distribution Hubs • Freight Terminals',
    description:
      'Property and facility maintenance for warehouses, workshops, factories and other industrial premises, including general repairs, preventative maintenance and work requiring multiple trades.',
  },
]

export const deployments = [
  {
    src: '/images/clients-plant-room.jpg',
    alt: 'Two technicians commissioning an electrical switchboard in a glass office tower',
    label: 'Active Metropolitan Deployment',
    title: 'Preventative Central Plant & Hydraulic Commissioning',
    detail: 'Collins Street Corporate Tower Precinct • Scheduled Quarter Diagnostic',
  },
  {
    src: '/images/clients-healthcare.jpg',
    alt: 'Technician with a tool bag and tablet walking through a healthcare building corridor',
    label: 'Priority Rapid Dispatch',
    title: 'Healthcare & Commercial Tenancy Continuity',
    detail: 'Zero-Interruption Protocol Execution • Melbourne Healthcare Campus',
  },
]

export const serviceApproach = {
  label: 'Service Approach',
  heading: ['One contact.', 'Multiple trades.'],
  paragraphs: [
    'Property maintenance often involves more than one trade. Instead of organising different contractors yourself, Quick Replace can coordinate the people, access and work required to get the job completed.',
    'From plumbing and electrical repairs to glazing, locksmith work, carpentry, painting and general building maintenance, you have one point of contact throughout the job.',
  ],
  callout: 'One point of contact for repairs, access, coordination and completion.',
  footer: 'Multi-trade coordination',
}

export const clientsPartners = {
  label: 'Clients & Partners',
  heading: ['Maintenance support', 'for every property.'],
  paragraphs: [
    'Quick Replace provides property repairs and maintenance for residential and commercial clients across Melbourne.',
    'We work with property managers, property owners, owners corporations, businesses and organisations that need a reliable way to manage repairs and ongoing maintenance without having to coordinate multiple trades themselves.',
    'With plumbing, electrical, glazing, locksmith, carpentry, painting, heating and cooling, general maintenance and other trades available through one company, we can coordinate everything from a small repair to larger jobs requiring multiple trades.',
    'Whether you manage one property or an entire portfolio, our goal is simple - make property maintenance easier.',
  ],
  callout: 'Reliable maintenance support for individual properties and larger portfolios.',
  footer: 'Residential & Commercial',
}

// `icon` keys map to lucide-react icons in Accreditations.jsx
export const accreditations = [
  { icon: 'shield', title: 'VBA Licenced', detail: 'Lic #DB-U-49102' },
  { icon: 'building', title: 'SCA Member', detail: 'Strata Community Assoc' },
  { icon: 'builder', title: 'Master Builders', detail: 'MBV Corporate Partner' },
  { icon: 'energy', title: 'Energy Safe Vic', detail: 'Gas & High Voltage Certified' },
  { icon: 'iso', title: 'ISO 9001:2015', detail: 'Quality Safety Matrix' },
  { icon: 'worksafe', title: 'WorkSafe Victoria', detail: '$20M Public Liability' },
]

export const caseStudy = {
  image: '/images/clients-case-study.jpg',
  imageAlt: 'Technicians working on a pump station inside a multi-level glass building',
  badge: 'Featured Deployment',
  title: 'Eureka Tower & Southbank Precinct Rapid Response',
  subtitle: 'Multi-stage hydraulic pump station replacement without residential water cutoff.',
  stats: [
    { value: '0 hrs', label: 'Downtime Incurred' },
    { value: '$44,000', label: 'Rebates & Efficiencies' },
    { value: '100%', label: 'Strata Committee Signoff' },
  ],
  label: 'Client Satisfaction',
  quote: 'Quick Replace transformed our maintenance workflow from reactive panic into predictable preventative calm.',
  paragraphs: [
    'When a legacy 4-inch main copper riser developed high-pressure micro-fractures in Southbank, 180 apartment residents were at immediate risk of complete water shutdown. Quick Replace dispatched our emergency rapid crew within 22 minutes.',
    "By deploying temporary high-flow bypass manifolds, our certified technicians isolated the degraded line and rebuilt the manifold in under 6 hours - all during working hours, completely invisible to the building's residents.",
  ],
}
