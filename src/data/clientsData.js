// Content for the Clients page.
// Figures, licence numbers and the case study come from the Figma design
// and must be confirmed with Quick Replace before launch.

// `icon` keys map to lucide-react icons in ClientSectors.jsx
export const clientSectors = [
  {
    icon: 'commercial',
    title: 'Commercial Property Managers & Owners',
    description:
      'Property maintenance and repairs for offices, commercial buildings, warehouses and other business premises. From minor repairs to ongoing maintenance and multi-trade jobs, we provide one point of contact throughout the process.',
  },
  {
    icon: 'residential',
    title: 'Residential Property Managers & Owners',
    description:
      'Repairs and maintenance for houses, apartments and units across Melbourne. We can communicate directly with tenants, arrange access, coordinate the required trades and provide before-and-after photos.',
  },
  {
    icon: 'strata',
    title: 'Owners Corporations & Strata Managers',
    description:
      'Maintenance and repairs for common areas and shared property, with clear quoting, communication and reporting. We can coordinate access directly with building managers, committees and nominated contacts.',
  },
  {
    icon: 'agedCare',
    title: 'Aged Care & Retirement Living',
    description:
      'Property maintenance for aged care facilities, retirement living properties and Home Care Package clients, with particular attention to communication, safety and minimising disruption to residents.',
  },
  {
    icon: 'retail',
    title: 'Retail & Hospitality Businesses',
    description:
      'Repairs and maintenance for shops, restaurants, cafés, hotels and other customer-facing businesses, with work organised to minimise disruption to staff, customers and normal operations.',
  },
  {
    icon: 'schools',
    title: 'Schools & Childcare Centres',
    description:
      "Property repairs and maintenance for schools and childcare facilities, with work coordinated around the facility's requirements and schedule. Working with Children Checks can be provided where required.",
  },
  {
    icon: 'industrial',
    title: 'Industrial & Warehouse Operators',
    // The Figma card repeats the Owners Corporations text here, so the earlier
    // industrial copy is kept until Quick Replace confirms the wording.
    description:
      'Property and facility maintenance for warehouses, workshops, factories and other industrial premises, including general repairs, preventative maintenance and work requiring multiple trades.',
  },
  {
    icon: 'insurance',
    title: 'Insurance & Claims Managers',
    description:
      'Property make-safe, repairs and reinstatement for insurance claims. We coordinate the required trades and provide clear quotes, photos and job documentation from initial attendance through to completion.',
  },
]

export const deployments = [
  {
    src: '/images/service-make-safe.jpg',
    alt: 'Boarded-up shopfront behind temporary fencing after an emergency make-safe',
    label: 'Emergency Make Safe',
    title: 'Rapid Emergency Make Safe Services',
    detail:
      'Fast, reliable emergency response to secure damaged properties, address immediate hazards and help protect people and buildings from further damage.',
  },
  {
    src: '/images/clients-building-maintenance.jpg',
    alt: 'Technician working from a scissor lift on the glass facade of a commercial building',
    label: 'Commercial Property Maintenance',
    title: 'Professional Building Maintenance',
    detail:
      'Reliable building repairs, façade maintenance and exterior refurbishment to keep commercial properties safe, functional and looking their best.',
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
  { icon: 'shield', title: 'Public Liability', detail: 'Insured certificate of currency available' },
  { icon: 'building', title: 'Licensed Trades', detail: 'Qualified professionals' },
  { icon: 'police', title: 'Police Checked', detail: 'National police checks where required' },
  { icon: 'energy', title: 'Working With Children', detail: 'Suitable technicians for schools & childcare' },
  { icon: 'iso', title: 'SWMS & Compliance Site Documentation', detail: 'Where required' },
  { icon: 'worksafe', title: 'WorkSafe Victoria', detail: 'Work cover insurance where required' },
]

export const caseStudy = {
  image: '/images/clients-testimonial.jpg',
  imageAlt: 'Quick Replace technician on a ladder installing ceiling fittings, giving a thumbs up',
  badge: 'Property Management Support',
  title: 'One Contact. Multiple Trades.',
  subtitle:
    'Plumbing, electrical, glazing, locksmith, painting, plastering and general property repairs - coordinated through one point of contact.',
  stats: [
    { value: 'Multiple Trades', label: 'One point of contact' },
    { value: 'Clear Updates', label: 'Photos & job reporting' },
    { value: 'Less Follow-Up', label: 'We keep you informed' },
  ],
  label: 'Client Satisfaction',
  quote: 'Quick Replace makes managing property maintenance so much easier.',
  testimonial:
    "Quick Replace always answers the phone and follows up on our emails. We're never left waiting or wondering what's happening with a job. Whatever issue comes up, they find a way to get it sorted. If we can't get hold of someone else, we know Quick Replace will be there for us.",
  author: 'Sarah M.',
  role: 'Property Manager, Melbourne',
}
