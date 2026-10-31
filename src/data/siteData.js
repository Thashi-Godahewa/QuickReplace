// Shared content for the landing page.
// Images live in /public/images so they can be swapped without touching components.

export const contact = {
  phone: '0401 411 636',
  phoneHref: 'tel:0401411636',
  email: 'info@quickreplace.com.au',
  emailHref: 'mailto:info@quickreplace.com.au',
  accountsEmail: 'accounts@quickreplace.com.au',
  accountsEmailHref: 'mailto:accounts@quickreplace.com.au',
  headOffice: 'VIC, Australia',
  facebookHref: 'https://www.facebook.com/QuickReplace',
  instagramHref: 'https://www.instagram.com/quickreplaceaus/',
}

// Main navigation - each link opens its own page.
export const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Clients', to: '/clients' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
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
    slug: 'plumbing',
    title: 'Plumbing',
    description:
      'Blocked drain clearing, tap repairs, high-pressure hydro-jetting, mechanical drain cleaning, leak detection, pipe replacements and emergency plumbing repairs.',
  },
  {
    icon: 'painting',
    slug: 'painting-plastering',
    title: 'Painting & Plastering',
    description:
      'Wall and ceiling repairs, damaged plaster, cracks and holes, water-damaged plaster, patching, interior and exterior painting, touch-ups and make-good works.',
  },
  {
    icon: 'electrical',
    slug: 'electrical',
    title: 'Electrical',
    description:
      'Power and lighting faults, switchboards, power points, safety switches, electrical repairs, installations and electrical make-safe work.',
  },
  {
    icon: 'glazing',
    slug: 'glazing',
    title: 'Glazing',
    description:
      'Broken and cracked glass, window and door glass replacement, shopfront glazing, glass repairs and emergency boarding and make-safe services.',
  },
  {
    icon: 'makeSafe',
    slug: 'make-safe',
    title: 'Make Safe',
    description:
      'Urgent make-safe repairs for broken glass, damaged doors and windows, water leaks, electrical hazards and other property damage that needs to be secured quickly.',
  },
  {
    icon: 'locksmith',
    slug: 'locksmith',
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
      'Property maintenance, repairs and minor home modifications for aged care facilities, retirement living properties, Home Care Package clients and NDIS participants. We understand the importance of clear communication, safety, accessibility and minimising disruption to residents.',
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
  'Electrical',
  'Carpentry',
  'Maintenance & Repairs',
  'Doors & Windows',
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
    src: '/images/project-living-room.jpeg',
    alt: 'Living room with large new glass windows',
    title: 'Living Room Windows',
    subtitle: 'Glazing, Large Window Installation',
    category: 'Glazing',
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
  {
    src: '/images/project-line-marking.jpg',
    alt: 'Yellow safety line marking painted on a drive-through lane',
    title: 'Drive-Through Line Marking',
    subtitle: 'Painting, Safety Markings & Car Parks',
    category: 'Painting & Plastering',
  },
  {
    src: '/images/project-gas-valve.jpg',
    alt: 'Old corroded plumbing valve removed from beside a hot water unit',
    title: 'Plumbing Valve Replacement',
    subtitle: 'Plumbing, Valves',
    category: 'Plumbing',
  },
  {
    src: '/images/project-shopfront-make-safe.jpg',
    alt: 'Temporary fencing set up around a damaged corner shopfront',
    title: 'Shopfront Make Safe',
    subtitle: 'Make Safe, Temporary Fencing & Boarding',
    category: 'Make Safe',
  },
  {
    src: '/images/project-glass-install.jpg',
    alt: 'Team lifting a large glass panel into a shopfront',
    title: 'Shopfront Glass Install',
    subtitle: 'Glazing, Large Panel Replacement',
    category: 'Glazing',
  },
  {
    src: '/images/project-window-board-up.jpg',
    alt: 'Broken window boarded up with plywood on a brick wall',
    title: 'Window Board-Up',
    subtitle: 'Make Safe, Broken Glass Boarding',
    category: 'Make Safe',
  },
  {
    src: '/images/project-exterior-painting.jpg',
    alt: 'Commercial building entrance with a freshly painted navy column',
    title: 'Commercial Exterior Painting',
    subtitle: 'Painting, Columns & Building Facade',
    category: 'Painting & Plastering',
  },
  {
    src: '/images/project-shopfront-window.jpg',
    alt: 'Replaced shopfront window with reflective glass',
    title: 'Shopfront Window Replacement',
    subtitle: 'Glazing, Commercial Shopfront',
    category: 'Glazing',
  },
  {
    src: '/images/project-salon-window-make-safe.jpg',
    alt: 'Salon window boarded with plywood from the inside',
    title: 'Salon Window Make Safe',
    subtitle: 'Make Safe, Temporary Boarding',
    category: 'Make Safe',
  },
  {
    src: '/images/project-office-glass-make-safe.jpg',
    alt: 'Broken glass panel beside an office door boarded with plywood',
    title: 'Office Door Panel Repair',
    subtitle: 'Doors & Windows, Glass Door Panel',
    category: 'Doors & Windows',
  },
  {
    src: '/images/project-coolroom-service.jpg',
    alt: 'Technician on a scissor lift servicing coolroom fans',
    title: 'Coolroom Refrigeration Service',
    subtitle: 'Heating & Cooling, Commercial Refrigeration',
    category: 'Maintenance & Repairs',
  },
  {
    src: '/images/project-office-led-lighting.jpg',
    alt: 'New LED panel lights in an office suspended ceiling',
    title: 'Office LED Lighting',
    subtitle: 'Electrical, LED Panel Upgrade',
    category: 'Electrical',
  },
  {
    src: '/images/project-steps-handrails.jpg',
    alt: 'Timber steps with yellow safety nosing and stainless steel handrails',
    title: 'Steps & Handrails',
    subtitle: 'Carpentry, Handrails & Safety Nosing',
    category: 'Carpentry',
  },
  {
    src: '/images/project-shower-grab-rail.jpg',
    alt: 'Grab rail installed on a tiled shower wall',
    title: 'Shower Grab Rail',
    subtitle: 'Handyman, Accessibility & Safety',
    category: 'Handyman',
  },
  {
    src: '/images/project-verandah-gutter.jpg',
    alt: 'Tradesperson fitting a new gutter along a shop verandah',
    title: 'Commercial Awning Gutter Replacement',
    subtitle: 'Guttering, Commercial Property',
    category: 'Guttering',
  },
  {
    src: '/images/project-under-sink-water.jpg',
    alt: 'Boiling and chilled filtered water units installed under a kitchen sink',
    title: 'Filtered Water System',
    subtitle: 'Plumbing, Under-Sink Installation',
    category: 'Plumbing',
  },
  {
    src: '/images/project-training-room-fitout.jpg',
    alt: 'Training room with new ceiling tiles and LED lighting',
    title: 'Room Lights Upgrade',
    subtitle: 'Electrical, Lighting & Ceiling Tiles',
    category: 'Electrical',
  },
  {
    src: '/images/project-balcony-glass.jpg',
    alt: 'Apartment balcony with frosted glass balustrade panels',
    title: 'Balcony Privacy Glass',
    subtitle: 'Glazing, Frosted Balustrade Panels',
    category: 'Glazing',
  },
  {
    src: '/images/project-retail-lighting.jpg',
    alt: 'Retail store ceiling with new LED batten lights',
    title: 'Retail Store Lighting',
    subtitle: 'Electrical, LED Batten Upgrade',
    category: 'Electrical',
  },
  {
    src: '/images/project-verandah-lighting.jpg',
    alt: 'Shop verandah ceiling after an old sign was removed',
    title: 'Sign Removal',
    subtitle: 'Electrical, Sign Disconnection & Removal',
    category: 'Electrical',
  },
  {
    src: '/images/project-track-lighting-cctv.jpg',
    alt: 'Warehouse ceiling with a water-damaged section to be repaired',
    title: 'Water Damaged Ceiling Repair',
    subtitle: 'Plastering, Ceiling Repair & Make-Good',
    category: 'Painting & Plastering',
  },
  {
    src: '/images/project-fence-replacement.jpg',
    alt: 'New timber paling boundary fence along a building walkway',
    title: 'Fence Replacement',
    subtitle: 'Timber Boundary Fence Replacement',
    category: 'Carpentry',
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
  {
    avatar: '/images/avatar-4.jpg',
    name: 'Jora Broerse',
    quote:
      'I rang Quick Replace after another company tried to rip me off. I was so impressed with the efficiency, cleanliness and honesty that they now became my regular maintenance guys. Definitely recommend this company.',
  },
  {
    avatar: '/images/avatar-5.jpg',
    name: 'LN Muzzin',
    quote:
      "Sonny and his team were so professional and courteous. Had a leak in our roof which was very challenging to find. Sonny's crew found the source of the leak and they did a wonderful job of repairing the roof, all in one day.",
  },
  {
    avatar: '/images/avatar-6.jpg',
    name: 'John Culina',
    quote:
      "I've used Quick Replace on many occasions and every time I get the same prompt response, a competitive quote and the job delivered on time and on budget. Definitely the go-to maintenance company.",
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
    title: 'Brick Wall Repair',
    tag: 'Brick Repointing & Mortar Repairs',
    location: 'Prahran',
  },
  {
    src: '/images/before-after-3.jpg',
    alt: 'Shattered shower screen beside the new glass screen',
    title: 'Shower Screen Replacement',
    tag: 'Glazing',
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

// Footer services, in three columns of seven as in the design
export const footerServices = [
  'Painting & Plastering',
  'Plumbing',
  'Electrical',
  'Glazing',
  'Make Safe',
  'Locksmith',
  'General Property Maintenance',
  'Heating & Cooling',
  'Gutter Cleaning',
  'Doors & Windows',
  'Handyman',
  'Carpentry',
  'Pressure Washing',
  'Brick Repointing & Mortar Repairs',
  'Emergency Repairs',
  'Graffiti Removal',
  'Window Tinting',
  'Pest Control',
  'Roofing',
  'Tiling & Tile Repairs',
  'Removalist & Rubbish Removal',
]

export const footerCompany = [
  { label: 'Services', to: '/services' },
  { label: 'Clients', to: '/clients' },
  { label: 'Our Work', to: '/our-work' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const contactStandards = [
  {
    title: 'One Contact. Multiple Trades.',
    text: "When you give us a job, we take ownership of it. We arrange what needs to be done, follow up with the tradespeople and make sure you know what's happening.",
  },
  {
    title: 'Honest & Transparent Pricing',
    text: "We explain the costs clearly, so you know what you're paying for before approving the work.",
  },
  {
    title: "We Don't Forget Your Property",
    text: "We keep records of previous repairs and maintenance issues, so you don't have to explain everything again.",
  },
]
