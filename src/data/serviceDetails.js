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
}

export function servicePath(slug) {
  return serviceDetails[slug] ? `/services/${slug}` : '/contact'
}
