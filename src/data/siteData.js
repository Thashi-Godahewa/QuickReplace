// Shared content for the landing page.
// Images live in /public/images so they can be swapped without touching components.

export const contact = {
  phone: '0401 411 636',
  phoneHref: 'tel:0401411636',
  email: 'info@quickreplace.com.au',
  emailHref: 'mailto:info@quickreplace.com.au',
  headOffice: 'Sunshine West',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#industries' },
  { label: 'Our work', href: '#projects' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const trades = [
  'Plumbing',
  'Glazing',
  'Electrical',
  'Locksmith',
  'Painting & Plastering',
  'Make Safe',
  'Heating & Cooling',
  'Carpentry',
  'Handyman',
  'Guttering',
]

export const metrics = [
  { value: '2,842+', label: 'Properties Serviced' },
  { value: '165+', label: 'In-house Team & Contractor Network' },
  { value: '15+', label: 'Years of Experience' },
  { value: '38+', label: 'Trade & Maintenance Services' },
]

// `icon` keys map to lucide-react icons inside Services.jsx
export const services = [
  {
    icon: 'plumbing',
    title: 'Plumbing',
    description:
      'Blocked drain clearing, tap repairs, high-pressure hydro-jetting, mechanical drain cleaning, leak detection, pipe replacements and emergency plumbing repairs.',
  },
  {
    icon: 'painting',
    title: 'Painting & Plastering',
    description:
      'Wall and ceiling repairs, damaged plaster, cracks and holes, water-damaged plaster, patching, interior and exterior painting, touch-ups and make-good works.',
  },
  {
    icon: 'electrical',
    title: 'Electrical',
    description:
      'Power and lighting faults, switchboards, power points, safety switches, electrical repairs, installations and electrical make-safe work.',
  },
  {
    icon: 'glazing',
    title: 'Glazing',
    description:
      'Broken and cracked glass, window and door glass replacement, shopfront glazing, glass repairs and emergency boarding and make-safe services.',
  },
  {
    icon: 'makeSafe',
    title: 'Make Safe',
    description:
      'Urgent make-safe repairs for broken glass, damaged doors and windows, water leaks, electrical hazards and other property damage that needs to be secured quickly.',
  },
  {
    icon: 'locksmith',
    title: 'Locksmith',
    description:
      'Lock repairs and replacements, door locks, rekeying, lockouts, damaged locks and security upgrades for residential and commercial properties.',
  },
]

// `icon` keys map to lucide-react icons inside Industries.jsx
export const industries = [
  {
    icon: 'commercial',
    title: 'Commercial Property Managers & Owners',
    description: 'We support facility managers with structured rapid response & SLA compliance.',
  },
  {
    icon: 'residential',
    title: 'Residential Property Managers & Owners',
    description:
      'We can coordinate directly with tenants, arrange access, organise the required trades and provide before-and-after photos once the work is completed',
  },
  {
    icon: 'strata',
    title: 'Owners Corporations & Strata Managers',
    description:
      'Maintenance and repairs for common areas and shared property. We can coordinate with building managers, committee members and site contacts throughout the job.',
  },
  {
    icon: 'agedCare',
    title: 'Aged Care & Retirement Living',
    description:
      'Repairs and maintenance with minimal disruption to residents and staff. National Police Checks can be provided for tradespeople attending where required.',
  },
]

export const projectFilters = [
  'All Works',
  'Plumbing',
  'Glazing',
  'Locksmith',
  'Painting & Plastering',
  'Make Safe',
  'Heating & Cooling',
  'Carpentry',
]

// Placeholder titles - replace with the real job details from the client
export const projects = [
  {
    src: '/images/project-gas-meter.jpg',
    alt: 'Gas meter and regulator connection beside a brick wall',
    title: 'Gas Meter Connection',
    subtitle: 'Plumbing, Gas Fitting & Compliance',
    category: 'Plumbing',
  },
  {
    src: '/images/project-kitchen-sink.jpg',
    alt: 'Double kitchen sink with new waste pipes and disposal unit',
    title: 'Kitchen Plumbing',
    subtitle: 'Installation, Kitchen Plumbing & Upgrades',
    category: 'Plumbing',
  },
  {
    src: '/images/project-garden-tap.jpg',
    alt: 'Replacement garden tap on an external brick wall',
    title: 'Garden Tap Replacement',
    subtitle: 'Repair, External Taps & Fittings',
    category: 'Plumbing',
  },
  {
    src: '/images/project-living-room.jpg',
    alt: 'Freshly painted living room with large windows',
    title: 'Interior Repaint',
    subtitle: 'Painting, Plaster Patching & Make-Good',
    category: 'Painting & Plastering',
  },
  {
    src: '/images/project-door-lock.jpg',
    alt: 'Security screen door with new lever lock and keys',
    title: 'Security Door Lock',
    subtitle: 'Locksmith, Lock Replacement & Rekeying',
    category: 'Locksmith',
  },
  {
    src: '/images/project-aircon-roof.jpg',
    alt: 'Split system outdoor unit installed on a metal roof',
    title: 'Split System Install',
    subtitle: 'Heating & Cooling, Rooftop Installation',
    category: 'Heating & Cooling',
  },
  {
    src: '/images/project-install-team.jpg',
    alt: 'Technicians fitting a large glass panel',
    title: 'Glass Panel Fit-Out',
    subtitle: 'Glazing, Measure & Install',
    category: 'Glazing',
  },
]

export const testimonials = [
  {
    avatar: '/images/avatar-1.jpg',
    name: 'Andelka Susa',
    quote:
      "There is almost nothing these guys can't do when it comes to property repairs. Very honest, well-priced & proud of their work. Definitely the best we've used in Melbourne in a long time.",
  },
  {
    avatar: '/images/avatar-2.jpg',
    name: 'Bryan Harrison',
    quote:
      'I would say they are the best commercial maintenance company in Melbourne. We initially gave them one job to start with, and now they take care of everything that goes wrong at our aged care facility.',
  },
  {
    avatar: '/images/avatar-3.jpg',
    name: 'Eduard Mjeda',
    quote:
      'Great people to work with! Sonny was very responsive from the minute I called to inquire about his services. He went over every detail with me and we set up a plan for the day of work.',
  },
]

export const clients = [
  { name: 'Australian Unity', src: '/images/client-australian-unity.png' },
  { name: 'Ray White', src: '/images/client-ray-white.png' },
  { name: 'Select Strata Communities', src: '/images/client-select-strata.png' },
  { name: 'Belle Property', src: '/images/client-belle-property.png' },
  { name: "L'Occitane", src: '/images/client-loccitane.png' },
  { name: 'Barry Plant', src: '/images/client-barry-plant.png' },
  { name: 'McGrath', src: '/images/client-mcgrath.png' },
  { name: 'Jellis Craig', src: '/images/client-jellis-craig.png' },
  { name: 'Kelemen Commercial Property', src: '/images/client-kelemen.png' },
]

export const beforeAfter = [
  {
    src: '/images/before-after-1.jpg',
    alt: 'Old corroded hot water unit beside the new replacement unit',
    title: 'Plumbing',
    tag: 'Plumbing',
    location: 'South Yarra',
  },
  {
    src: '/images/before-after-2.jpg',
    alt: 'Brick wall under scaffolding beside the finished repointed wall',
    title: 'Brick Wall Repairment',
    tag: 'Brick Repointing & Mortar Repairs',
    location: 'Prahran VIC',
  },
  {
    src: '/images/before-after-3.jpg',
    alt: 'Shattered shower screen beside the new glass screen',
    title: 'Shower Screen Replacement',
    tag: 'Glazier',
    location: 'Maribyrnong',
  },
]

// Postcode ranges covered (Greater Melbourne, Geelong, Mornington Peninsula,
// Melton, Sunbury and Macedon Ranges). Confirm with the client before launch.
export const servicePostcodeRanges = [
  [3000, 3230],
  [3335, 3341],
  [3427, 3442],
  [3750, 3812],
  [3910, 3944],
  [3975, 3978],
]

export const footerServices = [
  'Plumbing',
  'Electrical',
  'Glazing',
  'Hazard Containment',
  'Locksmith & Security',
  'Painting & Plastering',
]

export const footerCompany = [
  { label: 'About Us', href: '#about' },
  { label: 'Recent Projects', href: '#projects' },
  { label: 'Customer Reviews', href: '#reviews' },
  { label: 'Pricing & Estimates', href: '#contact' },
  { label: 'Careers', href: '#contact' },
]
