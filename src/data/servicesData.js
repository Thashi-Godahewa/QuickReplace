// Content for the Services page.
// Each service needs a photo at /public/images/service-<slug>.jpg.
// `badge` is optional and shows as a small label on the photo.
// `keywords` are the everyday problems people type into the search box
// (for example "leaking tap"), so the right service comes up even when
// they do not know the trade name. Add more any time - see src/utils/serviceSearch.js.

export const allServices = [
  {
    slug: 'plumbing',
    title: 'Plumbing',
    description:
      'Plumbing repairs and maintenance for residential and commercial properties across Melbourne, from everyday plumbing issues to urgent repairs.',
    keywords: [
      'leaking tap', 'dripping tap', 'leaky tap', 'tap', 'faucet', 'leak', 'water leak', 'burst pipe', 'pipe',
      'blocked drain', 'drain', 'clogged sink', 'sink', 'blocked toilet', 'toilet', 'running toilet', 'cistern',
      'hot water', 'hot water system', 'no hot water', 'shower', 'low water pressure', 'water pressure',
      'gas leak', 'gas fitting', 'sewer', 'plumber', 'plumbing', 'basin', 'mixer', 'flooding', 'water heater',
    ],
  },
  {
    slug: 'painting-plastering',
    title: 'Painting & Plastering',
    description:
      'Interior and exterior painting, plaster repairs and wall and ceiling repairs for residential and commercial properties across Melbourne.',
    keywords: [
      'hole in wall', 'wall', 'holes', 'crack in wall', 'cracked wall', 'plaster', 'plasterboard', 'gyprock',
      'drywall', 'ceiling', 'water damaged ceiling', 'sagging ceiling', 'paint', 'painting', 'repaint', 'painter',
      'peeling paint', 'flaking paint', 'touch up', 'cornice', 'render', 'patch', 'mould stain', 'ceiling stain',
    ],
  },
  {
    slug: 'electrical',
    title: 'Electrical',
    badge: 'Licensed Electrical',
    description: 'Electrical repairs, maintenance and installations for residential and commercial properties across Melbourne.',
    keywords: [
      'no power', 'power', 'power outage', 'blackout', 'lights not working', 'light', 'lighting', 'light fitting',
      'light switch', 'switch', 'powerpoint', 'power point', 'outlet', 'socket', 'sparks', 'sparking', 'tripping',
      'safety switch', 'circuit breaker', 'fuse', 'switchboard', 'wiring', 'electrician', 'smoke alarm',
      'smoke detector', 'ceiling fan', 'exhaust fan', 'electrical fault',
    ],
  },
  {
    slug: 'glazing',
    title: 'Glazing',
    description:
      'Glass repairs and replacement for residential and commercial properties across Melbourne, including urgent broken-glass situations.',
    keywords: [
      'broken window', 'broken glass', 'smashed window', 'cracked window', 'cracked glass', 'window', 'glass',
      'glass replacement', 'shattered glass', 'glass door', 'shower screen', 'mirror', 'window pane',
      'double glazing', 'glazier', 'splashback',
      'shopfront glass', 'rock through window',
    ],
  },
  {
    slug: 'make-safe',
    title: 'Make Safe',
    description:
      'Urgent property make-safe assistance for damage that needs to be secured before permanent repairs can be completed.',
  },
  {
    slug: 'locksmith',
    title: 'Locksmith',
    badge: 'Security Licenced',
    description: 'Lock repairs, replacements and access solutions for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'heating-cooling',
    title: 'Heating & Cooling',
    description: 'Heating and cooling maintenance and repair support for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    description: 'Professional gutter cleaning and maintenance for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'doors-windows',
    title: 'Doors & Windows',
    description: 'Repairs and maintenance for doors and windows in residential and commercial properties across Melbourne.',
  },
  {
    slug: 'brick-repointing',
    title: 'Brick Repointing & Mortar Repairs',
    description: 'Professional brickwork and mortar repairs for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'handyman',
    title: 'Handyman',
    description: 'Practical general repairs and small maintenance jobs for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'carpentry',
    title: 'Carpentry',
    description: 'Professional carpentry repairs and maintenance for residential and commercial properties across Melbourne.',
  },
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    description: 'Exterior pressure cleaning for suitable residential and commercial property surfaces across Melbourne.',
  },
  {
    slug: 'general-maintenance',
    title: 'General Property Maintenance',
    description:
      'Coordinated property repairs and ongoing maintenance for residential, commercial and managed properties across Melbourne.',
  },
  {
    slug: 'removalist',
    title: 'Removalist & Rubbish Removal',
    badge: 'Preventative Care',
    description: 'Property-related removal and cleanup support for residential and commercial premises across Melbourne.',
  },
  {
    slug: 'emergency-repairs',
    title: 'Emergency Repairs',
    badge: 'Preventative Care',
    description:
      'Urgent property maintenance and make-safe support when unexpected damage or faults require prompt attention.',
  },
]

export const popularSearches = ['Plumbing', 'Painting & Plastering', 'Electrical', 'Glazing', 'Make Safe']
