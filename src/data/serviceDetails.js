// Detail pages for individual services, keyed by the service slug used in
// servicesData.js. A service with an entry here gets its own page at
// /services/<slug>, and its Learn More links go there.
//
// To add another service page, copy one of the entries below, change the
// slug key and content, and add its hero photo to /public/images.

// Shared by every service page (the light-blue statement band)
const sharedQuote = {
  text: 'We want our clients to know what’s happening, understand what they’re paying for, and feel confident the job is being done properly. Our goal is simple — make property maintenance easier.',
  label: 'Built on long-term relationships',
}

const repairFinish = (text) => ({ label: 'Repair + Finish', text })

export const serviceDetails = {
  plumbing: {
    title: 'Plumbing',
    pageTitle: 'Plumbing Services Melbourne',
    hero: {
      accent: 'Plumbing',
      title: 'Services Melbourne',
      description:
        'Plumbing repairs and maintenance for residential and commercial properties across Melbourne, from everyday plumbing issues to urgent repairs.',
      image: '/images/service-plumbing.jpg',
      imageAlt: 'Plumber repairing the pipes under a kitchen sink',
    },
    offerings: {
      heading: { before: 'Our Plumbing', accent: 'Services' },
      intro:
        'Blocked drains, leaking taps, damaged pipes or urgent plumbing faults—we handle the repairs and explain what needs doing before work begins.',
      // `icon` keys map to lucide-react icons in ServiceOfferings.jsx
      items: [
        {
          icon: 'home',
          title: 'Blocked Drains',
          tag: 'Drainage',
          text: 'Clearing blocked sinks, toilets and drains and identifying common drainage issues affecting residential and commercial properties.',
        },
        {
          icon: 'home',
          title: 'Tap & Fixture Repairs',
          tag: 'Repairs',
          text: 'Repairs and replacement of leaking or damaged taps, toilets, fixtures and other common plumbing components.',
        },
        {
          icon: 'office',
          title: 'Leak Detection & Pipe Repairs',
          tag: 'Pipework',
          text: 'Locating water leaks and repairing or replacing damaged pipework to help prevent further property damage.',
        },
        {
          icon: 'tower',
          title: 'Emergency Plumbing Repairs',
          tag: 'Urgent',
          text: 'Responsive assistance for urgent plumbing problems including significant leaks, burst pipes and other unexpected plumbing faults.',
        },
      ],
    },
    solutions: {
      badge: 'Plumbing Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From leaking taps and blocked drains to damaged pipework and urgent plumbing problems, Quick Replace provides plumbing repairs for residential, commercial and managed properties across Melbourne.',
      note: repairFinish('If a leak has damaged walls or ceilings, we can also take care of the plastering and painting afterwards.'),
      items: [
        'Blocked and slow drains',
        'Leaks, damaged pipes and plumbing fixtures',
        'Tap, toilet and general plumbing repairs',
        'Hot water system faults and repairs',
      ],
    },
    quote: sharedQuote,
  },

  'painting-plastering': {
    title: 'Painting & Plastering',
    pageTitle: 'Painting & Plastering Services Melbourne',
    hero: {
      accent: 'Painting & Plastering',
      title: 'Services Melbourne',
      description:
        'Interior and exterior painting, plaster repairs and wall and ceiling repairs for residential and commercial properties across Melbourne.',
      image: '/images/service-painting-hero.jpg',
      imageAlt: 'Painter in a hard hat painting a ceiling from a step ladder',
    },
    offerings: {
      heading: { before: 'Our Painting', accent: 'Services' },
      intro:
        'From plaster patching and ceiling repairs to full interior and exterior painting, we can handle the preparation and finishing work.',
      items: [
        {
          icon: 'home',
          title: 'Interior Painting',
          tag: 'Interior',
          text: 'Painting and repainting of walls, ceilings, doors, skirting boards, cornices and other interior surfaces.',
        },
        {
          icon: 'home',
          title: 'Exterior Painting',
          tag: 'Exterior',
          text: 'Exterior painting for walls, weatherboards, render, fascia, eaves, fences, decks and other property surfaces.',
        },
        {
          icon: 'office',
          title: 'Commercial Painting',
          tag: 'Commercial',
          text: 'Interior and exterior painting for offices, retail premises, common areas and other commercial properties across Melbourne.',
        },
        {
          icon: 'tower',
          title: 'Plaster & Ceiling Repairs',
          tag: 'Plastering',
          text: 'Repairs to cracked, damaged or water-affected plaster walls and ceilings, including patching and preparation ready for painting.',
        },
      ],
    },
    solutions: {
      badge: 'Painting Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From small plaster repairs and paint touch-ups to complete interior and exterior painting, we provide painting and plastering services for residential and commercial properties across Melbourne.',
      note: repairFinish('We can take care of the plaster repair, surface preparation and painting from start to finish.'),
      items: [
        'Water-damaged ceiling and plaster repairs',
        'Cracked, damaged & sagging plaster repairs',
        'Interior & exterior painting',
        'Commercial and common-area painting',
      ],
    },
    quote: sharedQuote,
  },

  electrical: {
    title: 'Electrical',
    pageTitle: 'Electrical Services Melbourne',
    hero: {
      accent: 'Electrical',
      title: 'Services Melbourne',
      description: 'Electrical repairs, maintenance and installations for residential and commercial properties across Melbourne.',
      image: '/images/service-electrical.jpg',
      imageAlt: 'Electrician testing a switchboard with a multimeter',
    },
    offerings: {
      heading: { before: 'Our Electrical', accent: 'Services' },
      intro:
        'Power faults, lighting repairs, switches and switchboards—we provide electrical work for homes, businesses and managed properties.',
      items: [
        {
          icon: 'home',
          title: 'Power & Lighting Repairs',
          tag: 'Electrical',
          text: 'Assessment and repair of common power and lighting faults in homes, managed properties and commercial premises.',
        },
        {
          icon: 'home',
          title: 'Power Points & Switches',
          tag: 'Installation',
          text: 'Repair and replacement of damaged or faulty switches, power points and associated electrical fittings.',
        },
        {
          icon: 'office',
          title: 'Safety Switch & Switchboard Work',
          tag: 'Safety',
          text: 'Electrical maintenance involving safety switches, switchboards and related components where required.',
        },
        {
          icon: 'tower',
          title: 'Electrical Make-Safe',
          tag: 'Urgent',
          text: 'Making unsafe electrical areas secure following faults, damage or other property incidents before permanent repairs are completed.',
        },
      ],
    },
    solutions: {
      badge: 'Electrical Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From faulty lighting and power points to electrical faults and make-safe work, Quick Replace provides electrical repairs and maintenance for residential, commercial and managed properties across Melbourne.',
      note: repairFinish('If electrical work leaves walls or ceilings needing repairs, we can also organise the plastering and painting.'),
      items: [
        'Power and lighting faults',
        'Switches, power points and electrical fittings',
        'Electrical repairs and make-safe work',
        'Safety switch and switchboard faults',
      ],
    },
    quote: sharedQuote,
  },

  glazing: {
    title: 'Glazing',
    pageTitle: 'Glazing Services Melbourne',
    hero: {
      accent: 'Glazing',
      title: 'Services Melbourne',
      description:
        'Glass repairs and replacement for residential and commercial properties across Melbourne, including urgent broken-glass situations.',
      image: '/images/service-glazing.jpg',
      imageAlt: 'Glazier cutting a sheet of glass to size',
    },
    offerings: {
      heading: { before: 'Our Glazing', accent: 'Services' },
      intro:
        'We replace damaged window, door and shopfront glass, and can secure broken glazing until replacement is completed.',
      items: [
        {
          icon: 'home',
          title: 'Window Glass Replacement',
          tag: 'Windows',
          text: 'Replacement of broken, cracked or damaged glass in residential and commercial windows.',
        },
        {
          icon: 'home',
          title: 'Door Glass Replacement',
          tag: 'Doors',
          text: 'Repair and replacement of damaged glass in doors and glazed entry areas.',
        },
        {
          icon: 'office',
          title: 'Commercial & Shopfront Glazing',
          tag: 'Commercial',
          text: 'Glass replacement and repairs for shopfronts, offices, commercial doors and other commercial glazing.',
        },
        {
          icon: 'tower',
          title: 'Emergency Glass Make-Safe',
          tag: 'Urgent',
          text: 'Temporary securing and make-safe work following broken glass while permanent replacement is organised.',
        },
      ],
    },
    solutions: {
      badge: 'Glazing Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From broken windows and doors to damaged commercial shopfronts, we provide glass repair, replacement and emergency make-safe services across Melbourne.',
      note: repairFinish('After damaged glass is replaced, we can also take care of related frame, door or finishing repairs.'),
      items: [
        'Broken and cracked window glass',
        'Damaged door and shopfront glass',
        'Emergency glass securing and replacement',
        'Broken glass in commercial entrances',
      ],
    },
    quote: sharedQuote,
  },

  'make-safe': {
    title: 'Make Safe',
    pageTitle: 'Emergency Make Safe Services Melbourne',
    hero: {
      accent: 'Emergency Make Safe',
      title: 'Services Melbourne',
      description:
        'Urgent property make-safe assistance for damage that needs to be secured before permanent repairs can be completed.',
      image: '/images/service-make-safe.jpg',
      imageAlt: 'Tradespeople securing a damaged roof',
    },
    offerings: {
      heading: { before: 'Our Make Safe', accent: 'Services' },
      intro:
        'When damage leaves a property unsafe or unsecured, we can make the area safe and arrange the repairs needed afterwards.',
      items: [
        {
          icon: 'home',
          title: 'Broken Glass Make-Safe',
          tag: 'Glazing',
          text: 'Securing areas affected by broken or damaged glass to reduce immediate safety and security risks.',
        },
        {
          icon: 'home',
          title: 'Door & Window Make-Safe',
          tag: 'Security',
          text: 'Temporary securing of damaged doors, windows and openings following unexpected property damage.',
        },
        {
          icon: 'office',
          title: 'Water Damage Make-Safe',
          tag: 'Water',
          text: 'Initial measures to reduce further property damage following urgent leaks or water-related incidents.',
        },
        {
          icon: 'tower',
          title: 'Electrical Make-Safe',
          tag: 'Electrical',
          text: 'Making electrically unsafe areas secure following faults, damage or other property incidents until permanent repairs can be completed.',
        },
      ],
    },
    solutions: {
      badge: 'Make Safe Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'When unexpected property damage creates an immediate safety or security problem, we can secure the affected area and take care of the follow-up repairs.',
      note: repairFinish('Once the immediate risk is dealt with, we can handle the permanent repairs and any necessary make-good work.'),
      items: [
        'Broken glass and damaged openings',
        'Water leaks and related property damage',
        'Electrical hazards and urgent property damage',
        'Damaged doors and windows requiring temporary security',
      ],
    },
    quote: sharedQuote,
  },

  locksmith: {
    title: 'Locksmith',
    pageTitle: 'Locksmith Services Melbourne',
    hero: {
      accent: 'Locksmith',
      title: 'Services Melbourne',
      description: 'Lock repairs, replacements and access solutions for residential and commercial properties across Melbourne.',
      image: '/images/service-locksmith.jpg',
      imageAlt: 'Locksmith fitting a lock to a glass door',
    },
    offerings: {
      heading: { before: 'Our Locksmith', accent: 'Services' },
      intro:
        'Whether a lock is damaged, keys are missing or access needs to change, we can help with repairs, replacement and rekeying.',
      items: [
        {
          icon: 'home',
          title: 'Lock Repairs',
          tag: 'Repairs',
          text: 'Repair of faulty or damaged locks on residential and commercial doors.',
        },
        {
          icon: 'home',
          title: 'Lock Replacement',
          tag: 'Security',
          text: 'Replacement of worn, damaged or outdated locking hardware.',
        },
        {
          icon: 'office',
          title: 'Rekeying',
          tag: 'Access',
          text: 'Rekeying existing locks when access requirements change without needing to replace the entire lock.',
        },
        {
          icon: 'tower',
          title: 'Lockout Assistance',
          tag: 'Urgent',
          text: 'Assistance with property access where keys are lost, unavailable or locks are preventing entry.',
        },
      ],
    },
    solutions: {
      badge: 'Locksmith Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From damaged locks and lockouts to replacements and rekeying, we provide locksmith services for residential, commercial and managed properties across Melbourne.',
      note: repairFinish('If damaged locks have affected doors or frames, we can also take care of those repairs.'),
      items: [
        'Faulty and damaged locks',
        'Lock replacement and rekeying',
        'Property access and lockout issues',
        'Rekeying following tenancy changes',
      ],
    },
    quote: sharedQuote,
  },

  'heating-cooling': {
    title: 'Heating & Cooling',
    pageTitle: 'Heating & Cooling Services Melbourne',
    hero: {
      accent: 'Heating & Cooling',
      title: 'Services Melbourne',
      description:
        'Heating and cooling repairs and maintenance for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-heating-cooling.jpg',
      imageAlt: 'Technician servicing a split-system air conditioner',
    },
    offerings: {
      heading: { before: 'Our Heating & Cooling', accent: 'Services' },
      intro:
        'We repair and maintain heating and cooling equipment, including split systems, ducted systems and commercial refrigeration.',
      items: [
        {
          icon: 'home',
          title: 'Split-System Maintenance',
          tag: 'Air Conditioning',
          text: 'Maintenance and repairs for split-system heating and cooling units.',
        },
        {
          icon: 'home',
          title: 'Ducted System Maintenance',
          tag: 'Ducted',
          text: 'Maintenance and repairs for ducted heating and cooling systems.',
        },
        {
          icon: 'office',
          title: 'Heating & Cooling Repairs',
          tag: 'Repairs',
          text: 'Fault finding and repairs for heating and cooling systems that are not operating correctly.',
        },
        {
          icon: 'tower',
          title: 'System Replacement',
          tag: 'Replacement',
          text: 'Replacement of heating and cooling systems where existing equipment is no longer practical or economical to repair.',
        },
      ],
    },
    solutions: {
      badge: 'Heating & Cooling Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From systems that aren’t heating or cooling properly to breakdowns and ongoing maintenance, we provide heating and cooling services for residential, commercial and managed properties across Melbourne.',
      note: repairFinish('If a replacement system requires related electrical or finishing work, we can manage the additional trades.'),
      items: [
        'Systems not heating or cooling correctly',
        'Faulty or ageing heating and cooling equipment',
        'Routine maintenance and repair requirements',
        'Commercial coolroom and refrigeration faults',
      ],
    },
    quote: sharedQuote,
  },

  'gutter-cleaning': {
    title: 'Gutter Cleaning',
    pageTitle: 'Gutter Cleaning Services Melbourne',
    hero: {
      accent: 'Gutter Cleaning',
      title: 'Services Melbourne',
      description:
        'Gutter cleaning and maintenance for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-gutter-cleaning.jpg',
      imageAlt: 'Gutter filled with leaves and debris on a tiled roof',
    },
    offerings: {
      heading: { before: 'Our Gutter Cleaning', accent: 'Services' },
      intro:
        'We clear gutters on houses and commercial buildings, and can schedule regular visits for properties needing ongoing maintenance.',
      items: [
        {
          icon: 'home',
          title: 'Gutter Cleaning',
          tag: 'Cleaning',
          text: 'Removal of leaves, dirt and accumulated debris from accessible gutter systems.',
        },
        {
          icon: 'home',
          title: 'Commercial Gutter Cleaning',
          tag: 'Commercial',
          text: 'Gutter cleaning for commercial buildings, warehouses, retail premises and managed properties, with one-off and scheduled maintenance available.',
        },
        {
          icon: 'office',
          title: 'Scheduled Gutter Maintenance',
          tag: 'Preventative',
          text: 'Scheduled gutter cleaning for managed residential and commercial properties, with recurring maintenance available where required.',
        },
        {
          icon: 'tower',
          title: 'Post-Storm Gutter Checks',
          tag: 'Maintenance',
          text: 'Inspection and cleaning of gutters affected by storms, leaves or heavy debris.',
        },
      ],
    },
    solutions: {
      badge: 'Gutter Cleaning Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'Gutter maintenance can help keep roof drainage paths clear and identify obvious debris or blockages requiring attention.',
      note: repairFinish('If cleaning reveals damaged gutters or roof components, we can also arrange the repairs.'),
      items: [
        'Blocked or debris-filled gutters',
        'Poor gutter water flow',
        'Routine preventative gutter maintenance',
        'Commercial and warehouse gutter cleaning',
      ],
    },
    quote: sharedQuote,
  },

  'doors-windows': {
    title: 'Doors & Windows',
    pageTitle: 'Doors & Windows Services Melbourne',
    hero: {
      accent: 'Doors & Windows',
      title: 'Services Melbourne',
      description:
        'Repairs and maintenance for doors and windows in residential and commercial properties across Melbourne.',
      image: '/images/service-doors-windows.jpg',
      imageAlt: 'Tradesperson repairing a door',
    },
    offerings: {
      heading: { before: 'Our Doors & Windows', accent: 'Services' },
      intro:
        'From sticking doors and faulty window hardware to commercial roller shutters, we repair the parts that aren’t working as they should.',
      items: [
        {
          icon: 'home',
          title: 'Door Repairs',
          tag: 'Doors',
          text: 'Repairs to damaged, sticking or poorly operating doors, including door trimming, alignment and hinge adjustments.',
        },
        {
          icon: 'home',
          title: 'Window Repairs',
          tag: 'Windows',
          text: 'Repairs to damaged or poorly operating windows, including components and opening mechanisms.',
        },
        {
          icon: 'office',
          title: 'Door & Window Maintenance',
          tag: 'Maintenance',
          text: 'General maintenance for doors and windows to keep moving components, hardware and operating mechanisms working correctly.',
        },
        {
          icon: 'tower',
          title: 'Roller Doors & Shutters',
          tag: 'Roller Doors & Shutters',
          text: 'Repairs and maintenance for commercial roller doors and shutters, including factories, warehouses and shopfronts, as well as residential window roller shutters.',
        },
      ],
    },
  },
}

export function servicePath(slug) {
  return serviceDetails[slug] ? `/services/${slug}` : '/contact'
}
