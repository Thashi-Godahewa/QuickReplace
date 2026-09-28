// Detail pages for individual services, keyed by the service slug used in
// servicesData.js. A service with an entry here gets its own page at
// /services/<slug>, and its Learn More links go there.
//
// To add another service page, copy the painting-plastering entry,
// change the slug key and content, and add its hero photo to /public/images.

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
        'Painting your home or office is sometimes the fastest and easiest way to make any space look like new! New paint can make your space more relaxing or vibrant or simply more visually appealing, and can define the look and feel of your room.',
      // `icon` keys map to lucide-react icons in ServiceOfferings.jsx
      items: [
        {
          icon: 'home',
          title: 'Residential Interior Painting',
          tag: 'Interior',
          text: 'Walls, ceilings, doors, skirting boards, cornices and other interior painting and repainting.',
        },
        {
          icon: 'home',
          title: 'Residential Exterior Painting',
          tag: 'Exterior',
          text: 'Exterior walls, weatherboards, render, fascia, eaves, fences, decks and other exterior surfaces.',
        },
        {
          icon: 'office',
          title: 'Commercial Interior Painting',
          tag: 'Interior',
          text: 'Offices, retail stores, medical clinics, common areas and other commercial properties across Melbourne.',
        },
        {
          icon: 'tower',
          title: 'Commercial Exterior Painting',
          tag: 'Exterior',
          text: 'Multi-story facades, warehouse protective epoxy floor coatings, and boom lift high-access painting.',
        },
      ],
    },
    solutions: {
      badge: 'Painting Solutions',
      heading: { before: 'What We Can', accent: 'Help', after: 'With' },
      text: 'From small plaster repairs and paint touch-ups to complete interior and exterior painting, we provide painting and plastering services for residential and commercial properties across Melbourne.',
      note: { label: 'Repair + Finish', text: 'We can coordinate the plaster repair, preparation and painting from start to finish.' },
      items: [
        'Repair water-damaged ceilings & plaster',
        'Cracked, damaged & sagging plaster repairs',
        'Interior & exterior painting',
        'Exterior & building facade painting',
      ],
    },
    quote: {
      text: 'Our priority is to build trustworthy and long-term relationships with our customers, so we are dedicated to safety and service excellence!',
      label: 'Quick Replace Quality Assurance Guarantee',
    },
  },
}

export function servicePath(slug) {
  return serviceDetails[slug] ? `/services/${slug}` : '/contact'
}
