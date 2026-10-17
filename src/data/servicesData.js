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
    keywords: [
      'make safe', 'storm', 'roof blown off', 'secure property', 'board up', 'boarding', 'storm damage', 'break in', 'break-in',
      'fire damage', 'flood damage', 'after accident', 'vehicle impact', 'temporary repair', 'secure', 'hazard',
      'unsafe', 'car crashed into building', 'vandalism', 'damaged shop front',
    ],
  },
  {
    slug: 'locksmith',
    title: 'Locksmith',
    badge: 'Security Licenced',
    description: 'Lock repairs, replacements and access solutions for residential and commercial properties across Melbourne.',
    keywords: [
      'broken lock', 'lock', 'locked out', 'lockout', 'lost keys', 'key', 'keys', 'key cutting', 'rekey',
      'change locks', 'lock change', 'deadlock', 'door lock', 'window lock', 'padlock', 'master key',
      'digital lock', 'smart lock', 'stuck key', 'locksmith', 'security',
      'cannot get in', 'tenant locked out', 'locked out of the house',
    ],
  },
  {
    slug: 'heating-cooling',
    title: 'Heating & Cooling',
    description: 'Heating and cooling maintenance and repair support for residential and commercial properties across Melbourne.',
    keywords: [
      'air conditioner', 'air conditioning', 'aircon', 'air con', 'ac', 'split system', 'heater', 'heating',
      'no heat', 'cooling', 'cold', 'hot', 'ducted heating', 'evaporative cooling', 'heat pump', 'hvac',
      'thermostat', 'gas heater', 'furnace', 'ac not cooling', 'heater not working',
      'house is cold', 'freezing inside', 'too hot inside',
    ],
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    description: 'Professional gutter cleaning and maintenance for residential and commercial properties across Melbourne.',
    keywords: [
      'blocked gutter', 'gutter', 'gutters', 'overflowing gutter', 'leaves in gutter', 'downpipe', 'downpipes',
      'roof gutter', 'gutter guard', 'eaves', 'spouting', 'clogged gutter', 'rainwater',
    ],
  },
  {
    slug: 'doors-windows',
    title: 'Doors & Windows',
    description: 'Repairs and maintenance for doors and windows in residential and commercial properties across Melbourne.',
    keywords: [
      'door', 'doors', 'sticking door', 'squeaky door', 'door not closing', 'door handle', 'door hinge', 'hinge',
      'sliding door', 'screen door', 'flyscreen', 'fly screen', 'window frame', 'window not opening',
      'window latch', 'window', 'door closer', 'roller door',
    ],
  },
  {
    slug: 'brick-repointing',
    title: 'Brick Repointing & Mortar Repairs',
    description: 'Professional brickwork and mortar repairs for residential and commercial properties across Melbourne.',
    keywords: [
      'brick', 'bricks', 'brickwork', 'mortar', 'repointing', 'crumbling mortar', 'cracked brick', 'loose brick',
      'brick wall', 'retaining wall', 'chimney', 'bricklayer', 'masonry',
    ],
  },
  {
    slug: 'handyman',
    title: 'Handyman',
    description: 'Practical general repairs and small maintenance jobs for residential and commercial properties across Melbourne.',
    keywords: [
      'handyman', 'odd jobs', 'small jobs', 'hang picture', 'hang pictures', 'hang a mirror', 'shelves', 'shelf', 'assemble furniture', 'flat pack',
      'curtain rail', 'blinds', 'towel rail', 'minor repairs', 'fix', 'mount tv', 'caulking', 'silicone',
    ],
  },
  {
    slug: 'carpentry',
    title: 'Carpentry',
    description: 'Professional carpentry repairs and maintenance for residential and commercial properties across Melbourne.',
    keywords: [
      'carpenter', 'carpentry', 'timber', 'wood', 'decking', 'deck', 'rotten wood', 'rotten timber', 'skirting',
      'skirting board', 'architrave', 'cabinet', 'cupboard', 'kitchen cupboard', 'floorboards', 'squeaky floor',
      'fence', 'pergola', 'stairs', 'wooden',
    ],
  },
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    description: 'Exterior pressure cleaning for suitable residential and commercial property surfaces across Melbourne.',
    keywords: [
      'pressure wash', 'pressure washing', 'high pressure clean', 'dirty driveway', 'driveway',
      'concrete cleaning', 'mould', 'moss', 'path', 'paving', 'pavers', 'exterior cleaning',
      'oil stain', 'deck clean', 'house wash',
    ],
  },
  {
    slug: 'general-maintenance',
    title: 'General Property Maintenance',
    description:
      'Coordinated property repairs and ongoing maintenance for residential, commercial and managed properties across Melbourne.',
    keywords: [
      'maintenance', 'property maintenance', 'repairs', 'general repairs', 'ongoing maintenance', 'strata',
      'body corporate', 'property manager', 'rental property', 'inspection', 'end of lease', 'defects',
      'maintenance contract', 'preventative maintenance',
    ],
  },
  {
    slug: 'removalist',
    title: 'Removalist & Rubbish Removal',
    badge: 'Preventative Care',
    description: 'Property-related removal and cleanup support for residential and commercial premises across Melbourne.',
    keywords: [
      'rubbish', 'rubbish removal', 'junk', 'junk removal', 'hard rubbish', 'waste', 'clean up', 'cleanup',
      'removal', 'removalist', 'furniture removal', 'green waste', 'skip', 'tip run', 'clear out', 'dump',
    ],
  },
  {
    slug: 'emergency-repairs',
    title: 'Emergency Repairs',
    badge: 'Preventative Care',
    description:
      'Urgent property maintenance and make-safe support when unexpected damage or faults require prompt attention.',
    keywords: [
      'emergency', 'urgent', 'urgent repair', 'after hours', '24 hour', '24/7', 'asap', 'flood', 'flooding',
      'storm', 'burst pipe', 'gas leak', 'no power', 'dangerous', 'immediate',
    ],
  },
  {
    slug: 'graffiti-removal',
    title: 'Graffiti Removal',
    description:
      'Professional graffiti removal to restore walls and surfaces. Fast, effective cleaning that leaves your property looking fresh.',
    keywords: [
      'graffiti', 'graffiti removal', 'tagging', 'tags on wall', 'spray paint', 'spray painted wall', 'vandalised wall',
      'paint on brick', 'anti graffiti coating', 'marker on wall', 'graffiti on fence', 'graffiti on shopfront',
    ],
  },
  {
    slug: 'window-tinting',
    title: 'Window Tinting',
    description:
      'Professional window tinting for improved privacy and comfort. Helps reduce glare, heat, and UV exposure while enhancing your property.',
    keywords: [
      'window tinting', 'window tint', 'tint', 'tinted windows', 'window film', 'privacy film', 'frosted film',
      'glare', 'too much sun', 'sun coming through windows', 'uv protection', 'heat through windows', 'privacy',
      'neighbours can see in', 'office tinting', 'security film',
    ],
  },
  {
    slug: 'pest-control',
    title: 'Pest Control',
    description:
      'Professional pest control solutions to protect your property from unwanted pests, infestations, and potential damage.',
    keywords: [
      'pest control', 'pests', 'pest', 'termites', 'white ants', 'cockroaches', 'roaches', 'ants', 'spiders', 'rats',
      'mice', 'rodents', 'possum in roof', 'bed bugs', 'fleas', 'wasps', 'bees nest', 'infestation', 'exterminator',
      'bugs', 'insects', 'noises in the roof', 'mouse droppings',
    ],
  },
  {
    slug: 'roofing',
    title: 'Roofing',
    description:
      'Reliable roofing repairs and maintenance to address leaks, damage, and weather-related issues while protecting your property.',
    keywords: [
      'roof', 'roofing', 'roof leak', 'leaking roof', 'roof repair', 'roof damage', 'broken roof tiles', 'cracked roof tile',
      'roof tiles', 'missing tiles on roof', 'metal roof', 'colorbond roof', 'rusty roof', 'roof restoration',
      'ridge capping', 'flashing', 'roof plumber', 'storm damaged roof', 'water coming through the ceiling',
    ],
  },
  {
    slug: 'tiling',
    title: 'Tiling & Tile Repairs',
    description:
      'Quality tiling and tile repair services to replace damaged tiles, restore surfaces, and maintain a clean, finished appearance.',
    keywords: [
      'tiling', 'tiler', 'tile', 'tiles', 'tile repair', 'cracked tile', 'broken tile', 'loose tile', 'drummy tiles',
      'regrout', 'grout', 'mouldy grout', 'bathroom tiles', 'kitchen splashback tiles', 'floor tiles', 'shower tiles',
      'retile', 'waterproofing', 'silicone around shower',
    ],
  },

]

export const popularSearches = ['Plumbing', 'Painting & Plastering', 'Electrical', 'Glazing', 'Make Safe']
