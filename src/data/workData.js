// Content for the Our Work page.
// Add new jobs to `workProjects` - each needs a side-by-side before/after photo in /public/images.
// The jobs below are the examples from the Figma design.
// FAQ answers other than the first are drafts - confirm them with Quick Replace.

export const workProjects = [
  {
    src: '/images/before-after-window.jpg',
    alt: 'Broken window panel beside the new replacement glass panel',
    title: 'Broken Window Replacement',
    tag: 'Glazing',
    location: 'Southbank CBD',
    description:
      "Replaced the broken window with a new, secure glass panel, restoring the property's safety, functionality, and clean appearance.",
  },
  {
    src: '/images/work-plastering.jpg',
    alt: 'Damaged door frame plaster beside the repaired, smooth finish',
    title: 'Plastering',
    tag: 'Painting & Plastering',
    location: 'Tullamarine',
    description:
      'Repaired damaged walls and ceilings with professional plastering to create smooth surfaces and achieve a clean, seamless finish.',
  },
  {
    src: '/images/before-after-shower.jpg',
    alt: 'Shattered shower screen beside the new glass screen',
    title: 'Shower Glass Replacement',
    tag: 'Glazing',
    location: 'Maribyrnong',
    description:
      'Replaced damaged shower glass with secure, durable panels to improve bathroom safety, functionality, and overall appearance.',
  },
  {
    src: '/images/work-wall-repair-window.jpg',
    alt: 'Damaged wall below an office window beside the repaired wall during finishing',
    title: 'Wall Repair',
    tag: 'Painting & Plastering',
    location: 'Richmond',
    description:
      'Repaired cracks, holes, and damaged wall surfaces to restore their condition and achieve a smooth, professional finish.',
  },
  {
    src: '/images/work-smoke-alarm.jpg',
    alt: 'Broken smoke alarm base on a ceiling beside the new smoke alarm',
    title: 'Smoke Alarm Replacement',
    tag: 'Electrical',
    location: 'Glen Waverly',
    description:
      'Replaced faulty or outdated smoke alarms to maintain reliable fire detection and improve safety throughout the property.',
  },
  {
    src: '/images/work-tiling.jpg',
    alt: 'Worn floor beside a staircase next to the newly tiled floor',
    title: 'Tiling',
    // Tag as shown in the Figma design - confirm whether this should be a tiling category
    tag: 'Glazing',
    location: 'Maribyrnong',
    description: 'Replaced damaged tiles and repaired worn surfaces to restore durability, improve appearance, and achieve a neat finish.',
  },
  {
    src: '/images/work-tap.jpg',
    alt: 'Old bathroom basin taps beside the new mixer tap',
    title: 'Tap Replacement',
    tag: 'Plumbing',
    location: 'Hawthorn',
    description:
      'Replaced leaking, damaged, or faulty taps to restore reliable water flow, improve functionality, and reduce water waste.',
  },
  {
    src: '/images/work-wall-repair-ceiling.jpg',
    alt: 'Water-damaged plaster on a bedroom wall beside the repaired wall',
    title: 'Wall Repair',
    tag: 'Painting & Plastering',
    location: 'Werribee',
    description:
      'Restored damaged plaster, holes, and wall surfaces with quality repairs that blended neatly with the existing finish.',
  },
  {
    src: '/images/work-metal-roof.jpg',
    alt: 'Rusted metal roof flashing beside the new replacement flashing',
    title: 'Metal Roof Repair',
    tag: 'Roofing',
    location: 'Boxhill',
    description:
      'Repaired damaged metal roofing to address leaks, prevent further deterioration, and protect the property from harsh weather.',
  },
  {
    src: '/images/work-gate-lock.jpg',
    alt: 'Broken timber gate latch beside the new gate lock',
    title: 'Gate Lock Repair',
    tag: 'Locksmith',
    location: 'Footscray',
    description:
      'Repaired or replaced damaged gate locks to improve security, restore smooth operation, and ensure reliable access control.',
  },
  {
    src: '/images/work-fluorescent-light.jpg',
    alt: 'Dim fluorescent ceiling lights beside the replaced, brighter lights',
    title: 'Fluorescent Light',
    tag: 'Electrical',
    location: 'Mount Waverly',
    description:
      'Replaced faulty fluorescent lights and fittings to restore consistent lighting and improve functionality throughout the property.',
  },
  {
    src: '/images/work-burst-pipe.jpg',
    alt: 'Damaged pipe above a brick wall beside the repaired pipe',
    title: 'Burst Pipe Repair',
    tag: 'Plumbing',
    location: 'Epping',
    description:
      "Repaired burst or damaged pipes to stop water leaks, minimise property damage, and restore the plumbing system's functionality.",
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
    icon: 'money',
    question: 'How much does a call-out cost?',
    answer:
      'It depends on the type of job, the location and when you need us to attend. Get in touch with a few details and we will let you know the call-out cost before we book anything in.',
  },
  {
    icon: 'shield',
    question: 'Can you provide a quote for a broken window replacement?',
    answer:
      'Yes. Send us the size of the window, the type of glass if you know it, and a few photos. If the window needs to be secured straight away, we can arrange a make-safe first and then quote for the replacement.',
  },
  {
    icon: 'timer',
    question: 'How often should I have my gutters cleaned?',
    answer:
      'For most properties, once or twice a year is enough. Properties close to large trees may need more regular cleaning, especially before winter and bushfire season.',
  },
  {
    icon: 'shield',
    question: 'Can you arrange multiple trades for the same job?',
    answer:
      'Yes. With plumbing, electrical, glazing, carpentry, painting and other trades available through one company, we can coordinate everything so you only have one point of contact.',
  },
  {
    icon: 'shieldPlus',
    question: 'Do you provide before and after photos?',
    answer:
      'Yes. We can provide before and after photos once the work is completed, which is useful for property managers, owners corporations and insurance claims.',
  },
  {
    icon: 'timer',
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
    icon: 'shieldPlus',
    question: 'What if the service I need is not listed on our website?',
    answer:
      'Get in touch anyway. We work with a wide range of trades and can usually help, or point you in the right direction if we cannot.',
  },
]
