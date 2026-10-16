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
}

export function servicePath(slug) {
  return serviceDetails[slug] ? `/services/${slug}` : '/contact'
}
