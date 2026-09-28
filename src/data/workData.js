// Content for the Our Work page.
// Add new jobs to `workProjects` - each needs a before/after photo in /public/images.
// The three jobs below are the examples from the Figma design (locations are placeholders).
// FAQ answers other than the first are drafts - confirm them with Quick Replace.

export const workFilters = [
  'All Projects',
  'Plumbing',
  'Glazing',
  'Locksmith',
  'Painting & Plastering',
  'Make Safe',
  'Heating & Cooling',
  'Carpentry',
]

export const workProjects = [
  {
    src: '/images/before-after-window.jpg',
    alt: 'Broken window panel beside the new replacement glass panel',
    title: 'Broken Window Replacement',
    tag: 'Glazier',
    category: 'Glazing',
    location: 'Southbank CBD',
    description:
      "Replaced the broken window with a new, secure glass panel, restoring the property's safety, functionality, and clean appearance.",
  },
  {
    src: '/images/before-after-brick.jpg',
    alt: 'Brick wall under scaffolding beside the finished repointed wall',
    title: 'Brick Wall Repairment',
    tag: 'Brick Repointing & Mortar Repairs',
    category: 'Masonry',
    location: 'Southbank CBD',
    description:
      'Replaced damaged and deteriorated bricks, repaired the affected area, and restored the wall with a clean, durable finish that blends seamlessly with the existing structure.',
  },
  {
    src: '/images/before-after-shower.jpg',
    alt: 'Shattered shower screen beside the new glass screen',
    title: 'Shower Screen Replacement',
    tag: 'Glazier',
    category: 'Glazing',
    location: 'Southbank CBD',
    description:
      "Replaced the damaged shower screen with a new, secure screen, improving the bathroom's functionality, safety, and overall appearance.",
  },
]

// `icon` keys map to lucide-react icons in WorkFaq.jsx
export const workFaqs = [
  {
    icon: 'camera',
    question: 'Can you provide an estimate or quote from photos?',
    answer:
      'Yes. In many cases, we can provide an estimate or quote from photos. We recommend sending clear photos taken both close-up and from a distance so we can properly assess the work required. For some jobs, a site inspection may still be necessary before we can provide a final quote.',
  },
  {
    icon: 'timer',
    question: 'How much does a call-out cost?',
    answer:
      'It depends on the type of job, the location and when you need us to attend. Get in touch with a few details and we will let you know the call-out cost before we book anything in.',
  },
  {
    icon: 'network',
    question: 'Can you provide a quote for a broken window replacement?',
    answer:
      'Yes. Send us the size of the window, the type of glass if you know it, and a few photos. If the window needs to be secured straight away, we can arrange a make-safe first and then quote for the replacement.',
  },
  {
    icon: 'shield',
    question: 'How often should I have my gutters cleaned?',
    answer:
      'For most properties, once or twice a year is enough. Properties close to large trees may need more regular cleaning, especially before winter and bushfire season.',
  },
  {
    icon: 'shieldPlus',
    question: 'Can you arrange multiple trades for the same job?',
    answer:
      'Yes. With plumbing, electrical, glazing, carpentry, painting and other trades available through one company, we can coordinate everything so you only have one point of contact.',
  },
  {
    icon: 'money',
    question: 'Do you provide before and after photos?',
    answer:
      'Yes. We can provide before and after photos once the work is completed, which is useful for property managers, owners corporations and insurance claims.',
  },
  {
    icon: 'network',
    question: 'How quickly can you attend a job?',
    answer:
      'It depends on the job and our schedule. For urgent repairs and make-safe work, call us and we will do our best to get someone out as soon as possible.',
  },
  {
    icon: 'shield',
    question: 'Can you organise access directly with the tenant?',
    answer:
      'Yes. We can contact tenants directly to arrange a suitable time to access the property and keep you updated throughout the job.',
  },
  {
    icon: 'money',
    question: 'What if the service I need is not listed on our website?',
    answer:
      'Get in touch anyway. We work with a wide range of trades and can usually help, or point you in the right direction if we cannot.',
  },
]
