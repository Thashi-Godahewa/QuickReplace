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
    solutions: {
      badge: 'Doors & Windows Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From sticking doors and damaged hardware to window mechanisms and roller shutters, we provide door and window repairs for residential, commercial and managed properties.',
      note: repairFinish('Where a door or window needs carpentry, glazing or hardware repairs, we can take care of the work together.'),
      items: [
        'Doors that stick or do not close correctly',
        'Damaged window or door hardware',
        'General door and window maintenance',
        'Commercial roller doors and residential shutters',
      ],
    },
    quote: sharedQuote,
  },

  'brick-repointing': {
    title: 'Brick Repointing & Mortar Repairs',
    pageTitle: 'Brick Repointing & Mortar Repairs Services Melbourne',
    hero: {
      accent: 'Brick Repointing & Mortar Repairs',
      title: 'Services Melbourne',
      description:
        'Brick repointing, mortar repairs and brickwork maintenance for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-brick-repointing.jpg',
      imageAlt: 'Bricklayer repointing mortar joints on a brick wall',
    },
    offerings: {
      heading: { before: 'Our Brick Repointing & Mortar Repairs', accent: 'Services' },
      intro:
        'We repair deteriorated mortar, damaged bricks and minor brickwork cracks on residential and commercial buildings.',
      items: [
        {
          icon: 'home',
          title: 'Mortar Repointing',
          tag: 'Repointing',
          text: 'Removal and replacement of deteriorated mortar to restore damaged or ageing brickwork joints.',
        },
        {
          icon: 'home',
          title: 'Brick Repairs',
          tag: 'Brickwork',
          text: 'Repair and replacement of cracked, damaged or deteriorated bricks.',
        },
        {
          icon: 'office',
          title: 'Crack Repairs',
          tag: 'Repairs',
          text: 'Assessment and repair of minor cracks affecting brickwork and mortar joints.',
        },
        {
          icon: 'tower',
          title: 'Brickwork Maintenance',
          tag: 'Maintenance',
          text: 'Maintenance and repairs for ageing or deteriorated brickwork across residential, commercial and managed properties.',
        },
      ],
    },
    solutions: {
      badge: 'Brick Repointing & Mortar Repairs Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From deteriorated mortar joints to damaged bricks and minor cracking, we provide brickwork repairs and repointing across residential, commercial and managed properties in Melbourne.',
      note: repairFinish('Where brick repairs affect adjoining painted or finished surfaces, we can take care of the finishing work.'),
      items: [
        'Cracked or deteriorated mortar joints',
        'Damaged or loose bricks',
        'Ageing or deteriorated brickwork requiring repair',
        'Minor cracking in brickwork and mortar joints',
      ],
    },
    quote: sharedQuote,
  },

  handyman: {
    title: 'Handyman',
    pageTitle: 'Handyman Services Melbourne',
    hero: {
      accent: 'Handyman',
      title: 'Services Melbourne',
      description:
        'General property repairs and maintenance for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-handyman.jpg',
      imageAlt: 'Handyman carrying out a repair',
    },
    offerings: {
      heading: { before: 'Our Handyman', accent: 'Services' },
      intro:
        'We handle general property repairs, fittings and maintenance lists, particularly when several items need attention at one property.',
      items: [
        {
          icon: 'home',
          title: 'General Property Repairs',
          tag: 'Repairs',
          text: 'General repairs for damaged or deteriorated fixtures, fittings and property components.',
        },
        {
          icon: 'home',
          title: 'Fixtures & Fittings',
          tag: 'Installation',
          text: 'Installation, repair, adjustment and replacement of everyday property fixtures and fittings.',
        },
        {
          icon: 'office',
          title: 'Minor Wall & Surface Repairs',
          tag: 'Maintenance',
          text: 'Patching, sealing and minor make-good work to damaged walls and other property surfaces.',
        },
        {
          icon: 'tower',
          title: 'Property Maintenance Lists',
          tag: 'Multi-Task',
          text: 'Completion of multiple property repair and maintenance items during one visit where practical.',
        },
      ],
    },
    solutions: {
      badge: 'Handyman Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'For those smaller property repairs that don’t require a specialist trade, we can take care of individual jobs or work through a list of maintenance items during the same visit.',
      note: repairFinish('If a repair needs plastering, painting or another trade, we can manage those works together.'),
      items: [
        'Minor repairs around the property',
        'Loose or damaged fixtures and fittings',
        'Property maintenance lists with multiple repair items',
        'Minor wall patching and surface repairs',
      ],
    },
    quote: sharedQuote,
  },

  carpentry: {
    title: 'Carpentry',
    pageTitle: 'Carpentry Services Melbourne',
    hero: {
      accent: 'Carpentry',
      title: 'Services Melbourne',
      description:
        'Carpentry repairs and maintenance for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-carpentry.jpg',
      imageAlt: 'Carpenter working on timber joinery',
    },
    offerings: {
      heading: { before: 'Our Carpentry', accent: 'Services' },
      intro:
        'Timber doors, frames, skirting, fencing and other carpentry repairs—we can repair or replace damaged components.',
      items: [
        {
          icon: 'home',
          title: 'Door & Frame Repairs',
          tag: 'Doors',
          text: 'Repairs to timber doors, door frames, jambs and associated components.',
        },
        {
          icon: 'home',
          title: 'Timber Repairs',
          tag: 'Repairs',
          text: 'Repair or replacement of damaged, rotten or deteriorated timber components.',
        },
        {
          icon: 'office',
          title: 'Skirting & Trim Repairs',
          tag: 'Finishing',
          text: 'Repair and replacement of skirting boards, architraves, trims and other timber finishing elements.',
        },
        {
          icon: 'tower',
          title: 'General Property Carpentry',
          tag: 'Maintenance',
          text: 'General carpentry repairs and maintenance for residential and commercial properties.',
        },
      ],
    },
    solutions: {
      badge: 'Carpentry Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From damaged timber doors and frames to fencing, skirting and general timber repairs, we provide carpentry services across residential, commercial and managed properties.',
      note: repairFinish('Where carpentry repairs require painting or other finishing work, we can complete the job through one contact.'),
      items: [
        'Damaged timber doors and frames',
        'Broken or deteriorated timber components',
        'General carpentry maintenance and repairs',
        'Damaged timber fencing, posts and gates',
      ],
    },
    quote: sharedQuote,
  },

  'pressure-washing': {
    title: 'Pressure Washing',
    pageTitle: 'Pressure Washing Services Melbourne',
    hero: {
      accent: 'Pressure Washing',
      title: 'Services Melbourne',
      description: 'Exterior pressure cleaning for residential, commercial and managed properties across Melbourne.',
      image: '/images/service-pressure-washing.jpg',
      imageAlt: 'Pressure cleaning an outdoor paved surface',
    },
    offerings: {
      heading: { before: 'Our Pressure Washing', accent: 'Services' },
      intro:
        'We pressure clean driveways, paths, entrances and common areas to remove accumulated dirt and improve presentation.',
      items: [
        {
          icon: 'home',
          title: 'Driveway Cleaning',
          tag: 'Exterior',
          text: 'Pressure cleaning of driveways and hard surfaces to remove built-up dirt and grime.',
        },
        {
          icon: 'home',
          title: 'Path & Paved Area Cleaning',
          tag: 'Paving',
          text: 'Pressure cleaning of pathways, paved areas and other external hard surfaces.',
        },
        {
          icon: 'office',
          title: 'Commercial Exterior Cleaning',
          tag: 'Commercial',
          text: 'Pressure cleaning for commercial entrances, pathways, common areas, loading areas and other external hard surfaces around commercial and managed properties.',
        },
        {
          icon: 'tower',
          title: 'General Property Washdowns',
          tag: 'Cleaning',
          text: 'Exterior washdowns as part of routine property maintenance, presentation or preparation work.',
        },
      ],
    },
    solutions: {
      badge: 'Pressure Washing Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From driveways and pathways to commercial entrances and common areas, pressure cleaning can help bring dirty external surfaces back to a cleaner, more presentable condition.',
      note: repairFinish('If cleaning reveals damaged paving or other surfaces, we can also assist with related property repairs.'),
      items: [
        'Dirty external hard surfaces',
        'Paths, paved areas and driveways requiring cleaning',
        'Commercial exterior areas requiring maintenance cleaning',
        'Pressure cleaning of commercial entrances and common areas',
      ],
    },
    quote: sharedQuote,
  },

  'general-maintenance': {
    title: 'Property Maintenance',
    pageTitle: 'General Property Maintenance Services Melbourne',
    hero: {
      accent: 'General Property Maintenance',
      title: 'Services Melbourne',
      description:
        'Property repairs and ongoing maintenance for residential, commercial and managed properties across Melbourne, with multiple trades available through one point of contact.',
      image: '/images/service-general-maintenance.jpg',
      imageAlt: 'Tradesperson carrying out property maintenance',
    },
    offerings: {
      heading: { before: 'Our Property Maintenance', accent: 'Services' },
      intro:
        'We look after repairs and ongoing maintenance for property managers, owners corporations, businesses and homeowners—all through one point of contact.',
      items: [
        {
          icon: 'home',
          title: 'Residential Maintenance',
          tag: 'Residential',
          text: 'General repairs and ongoing maintenance for houses, apartments and other residential properties.',
        },
        {
          icon: 'home',
          title: 'Commercial Maintenance',
          tag: 'Commercial',
          text: 'Repairs and ongoing maintenance for offices, retail premises and other commercial properties.',
        },
        {
          icon: 'office',
          title: 'Managed Property Maintenance',
          tag: 'Property Management',
          text: 'Reactive and ongoing property maintenance for property managers, owners corporations and managed properties.',
        },
        {
          icon: 'tower',
          title: 'Multi-Trade Maintenance',
          tag: 'Multi-Trade',
          text: 'Management of repair and maintenance work requiring more than one trade, with one point of contact throughout the job.',
        },
      ],
    },
    solutions: {
      badge: 'Property Maintenance Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From reactive repairs to ongoing maintenance and multi-trade jobs, we look after individual properties and larger managed portfolios across Melbourne.',
      note: repairFinish('When a job requires more than one trade, we can manage the work from start to finish, giving you one point of contact throughout the job.'),
      items: [
        'Reactive property repairs',
        'Routine and ongoing maintenance',
        'Jobs requiring multiple trades',
        'Maintenance across multiple managed properties',
      ],
    },
    quote: sharedQuote,
  },

  tiling: {
    title: 'Tiling & Tile Repair',
    pageTitle: 'Tiling & Tile Repairs Services Melbourne',
    hero: {
      accent: 'Tiling & Tile Repairs',
      title: 'Services Melbourne',
      description:
        'Tiling repairs, replacement and maintenance for bathrooms, kitchens and other tiled areas in residential and commercial properties across Melbourne.',
      image: '/images/before-after-shower.jpg',
      imageAlt: 'Shower with a cracked tiled wall before and after repair',
    },
    offerings: {
      heading: { before: 'Our Tiling & Tile Repair', accent: 'Services' },
      intro:
        'We repair and replace damaged wall and floor tiles in bathrooms, kitchens, commercial staircases and other tiled areas.',
      items: [
        {
          icon: 'home',
          title: 'Damaged Tile Repairs & Replacement',
          tag: 'Tile Repairs',
          text: 'Repair and replacement of cracked, chipped, loose or damaged wall and floor tiles.',
        },
        {
          icon: 'home',
          title: 'Bathroom & Wet Area Tiling',
          tag: 'Bathrooms',
          text: 'Tiling repairs and replacement for bathrooms, showers and other wet areas, including work following plumbing or water damage.',
        },
        {
          icon: 'office',
          title: 'Commercial Tiling & Repairs',
          tag: 'Commercial',
          text: 'Tile repairs and replacement for commercial properties, including damaged floor tiles, tiled staircases, steps, common areas and other tiled surfaces.',
        },
        {
          icon: 'tower',
          title: 'Kitchen & General Tiling',
          tag: 'Tiling',
          text: 'Tiling and tile repairs for kitchen splashbacks, floors, walls and other tiled areas in residential and commercial properties.',
        },
      ],
    },
    solutions: {
      badge: 'Tiling & Tile Repair Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'Whether you need a few damaged tiles replaced or a larger tiled area repaired, we can help with tiling work across residential, commercial and managed properties in Melbourne.',
      note: repairFinish('If tiling is part of a larger repair, we can also take care of the related plumbing, plastering or painting needed to complete the job.'),
      items: [
        'Cracked, chipped or loose tiles',
        'Damaged bathroom and shower tiles',
        'Wall and floor tile repairs',
        'Damaged tiles on commercial floors, staircases and steps',
      ],
    },
    quote: sharedQuote,
  },

  roofing: {
    title: 'Roofing',
    pageTitle: 'Roofing Services Melbourne',
    hero: {
      accent: 'Roofing',
      title: 'Services Melbourne',
      description:
        'Roof repairs and maintenance for residential, commercial and managed properties across Melbourne, from roof leaks and damaged roofing to general maintenance and temporary make-safe work.',
      image: '/images/project-aircon-roof.jpg',
      imageAlt: 'Metal roof on a commercial building',
    },
    offerings: {
      heading: { before: 'Our Roofing', accent: 'Services' },
      intro:
        'Roof repairs and maintenance for residential, commercial and managed properties across Melbourne, from roof leaks and damaged roofing to general maintenance and temporary make-safe work.',
      items: [
        {
          icon: 'home',
          title: 'Roof Leak Repairs',
          tag: 'Leaks',
          text: 'Investigation and repair of roof leaks and water-entry points affecting residential and commercial properties.',
        },
        {
          icon: 'home',
          title: 'Tile Roof Repairs',
          tag: 'Tiled Roofs',
          text: 'Repair and replacement of cracked, broken or displaced roof tiles and other tiled-roof damage.',
        },
        {
          icon: 'office',
          title: 'Metal Roof Repairs',
          tag: 'Metal Roofs',
          text: 'Repairs and maintenance for damaged metal roofing, flashings and other associated roof components.',
        },
        {
          icon: 'tower',
          title: 'Temporary Roof Make-Safe',
          tag: 'Make Safe',
          text: 'Where a larger repair cannot be completed immediately, we can carry out temporary make-safe work to help protect the property until permanent repairs can be completed.',
        },
      ],
    },
    solutions: {
      badge: 'Roofing Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'Where a larger repair cannot be completed immediately, we can carry out temporary make-safe work to help protect the property until permanent repairs can be completed.',
      note: repairFinish('Where a roof leak has caused internal damage, we can also take care of the plastering, painting and other repairs required to make good the affected area.'),
      items: [
        'Leaking roofs',
        'Broken or displaced roof tiles',
        'Damaged or deteriorated flashings',
        'Temporary roof make-safe following damage',
      ],
    },
    quote: sharedQuote,
  },

  'pest-control': {
    title: 'Pest Control',
    pageTitle: 'Pest Control Services Melbourne',
    hero: {
      accent: 'Pest Control',
      title: 'Services Melbourne',
      description:
        'Pest control and treatment for common pest problems affecting residential and commercial properties across Melbourne.',
      image: '/images/service-general-maintenance.jpg',
      imageAlt: 'Technician carrying out a property service',
    },
    offerings: {
      heading: { before: 'Our Pest Control', accent: 'Services' },
      intro:
        'We arrange treatment for rodents, cockroaches, ants and other pests across residential and commercial properties.',
      items: [
        {
          icon: 'home',
          title: 'General Pest Control',
          tag: 'Pest Control',
          text: 'Treatment for common pests including cockroaches, ants, spiders, fleas and silverfish in residential and commercial properties.',
        },
        {
          icon: 'home',
          title: 'Rodent Control',
          tag: 'Rodents',
          text: 'Inspection and treatment for rats and mice affecting residential, commercial and managed properties.',
        },
        {
          icon: 'office',
          title: 'Cockroach & Ant Treatment',
          tag: 'Insects',
          text: 'Treatment for cockroach and ant activity in and around residential and commercial properties.',
        },
        {
          icon: 'tower',
          title: 'Commercial Pest Control',
          tag: 'Commercial',
          text: 'Pest control for offices, retail premises, warehouses and other commercial properties, including ongoing treatment where required.',
        },
      ],
    },
    solutions: {
      badge: 'Pest Control Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From rodents and cockroaches to ants and other common pests, we provide pest-control services for residential, commercial and managed properties across Melbourne.',
      note: repairFinish('For managed and commercial properties, visits can be arranged around tenants, staff and operating hours.'),
      items: [
        'Rats and mice',
        'Cockroaches and ants',
        'Spiders, fleas and silverfish',
        'Commercial pest problems',
      ],
    },
    quote: sharedQuote,
  },

  'window-tinting': {
    title: 'Window Tinting',
    pageTitle: 'Window Tinting Services Melbourne',
    hero: {
      accent: 'Window Tinting',
      title: 'Services Melbourne',
      description:
        'Window tinting and film installation for residential and commercial properties across Melbourne, helping reduce glare and solar heat while improving privacy and UV protection.',
      image: '/images/before-after-window.jpg',
      imageAlt: 'Glazed door with frosted window film applied',
    },
    offerings: {
      heading: { before: 'Our Window Tinting', accent: 'Services' },
      intro:
        'We install and replace window films for privacy, glare reduction and solar control in homes, offices and commercial premises.',
      items: [
        {
          icon: 'home',
          title: 'Residential Window Tinting',
          tag: 'Residential',
          text: 'Window tinting for houses, apartments and units to improve privacy and help reduce glare, solar heat and UV exposure.',
        },
        {
          icon: 'home',
          title: 'Commercial Window Tinting',
          tag: 'Commercial',
          text: 'Window film for offices, shopfronts and other commercial premises to help reduce glare and solar heat and improve privacy.',
        },
        {
          icon: 'office',
          title: 'Privacy & Frosted Film',
          tag: 'Privacy',
          text: 'Privacy and decorative films for windows, glazed doors, offices, meeting rooms and other glass areas.',
        },
        {
          icon: 'tower',
          title: 'Existing Film Removal & Replacement',
          tag: 'Replacement',
          text: 'Removal and replacement of old, damaged, bubbling or deteriorated window film.',
        },
      ],
    },
  },
}

export function servicePath(slug) {
  return serviceDetails[slug] ? `/services/${slug}` : '/contact'
}
