import { useEffect, useRef, useState } from 'react'
import { CircleMarker, MapContainer, Marker, Polygon, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowRight, CircleAlert, CircleCheck } from 'lucide-react'
import { contact } from '../data/siteData'
import { Accent, Container, SectionBadge } from './ui'

/* ------------------------------------------------------------------------------------------------
 * SERVICE AREA DATA
 * Post codes inside the service boundary (Macedon to Frankston, Geelong to Lilydale).
 * Format: 'postcode': ['suburbs', latitude, longitude]
 * Built from the open Australian post code list (Matthew Proctor, australianpostcodes on GitHub).
 * To add or remove an area, add or delete a line. Confirm the final list with the client.
 * --------------------------------------------------------------------------------------------- */
const SERVICE_POSTCODES = {
  '3000': ['Melbourne', -37.8144, 144.9826],
  '3002': ['East Melbourne', -37.8144, 144.9826],
  '3003': ['West Melbourne', -37.8109, 144.9496],
  '3004': ['Melbourne', -37.8144, 144.9826],
  '3005': ['World Trade Centre', -37.8246, 144.9509],
  '3006': ['South Wharf, Southbank', -37.8253, 144.9521],
  '3008': ['Docklands', -37.8147, 144.948],
  '3010': ['University Of Melbourne', -37.7962, 144.9614],
  '3011': ['Footscray, Seddon, Seddon West', -37.8071, 144.908],
  '3012': ['Brooklyn, Kingsville, Kingsville West +3 more', -37.8071, 144.8612],
  '3013': ['Yarraville, Yarraville West', -37.8142, 144.8887],
  '3015': ['Newport, South Kingsville, Spotswood', -37.8382, 144.8806],
  '3016': ['Williamstown, Williamstown North', -37.8637, 144.8885],
  '3018': ['Altona, Seaholme', -37.8617, 144.8127],
  '3019': ['Braybrook, Braybrook North, Robinson', -37.7847, 144.854],
  '3020': ['Albion, Glengala, Sunshine +2 more', -37.7772, 144.8299],
  '3021': ['Albanvale, Kealba, Kings Park +1 more', -37.7434, 144.7967],
  '3022': ['Ardeer, Deer Park East', -37.7959, 144.794],
  '3023': ['Burnside, Burnside Heights, Cairnlea +4 more', -37.7827, 144.7706],
  '3024': ['Fieldstone, Mambourin, Manor Lakes +2 more', -37.7505, 144.6499],
  '3025': ['Altona East, Altona Gate, Altona North', -37.8356, 144.8397],
  '3026': ['Derrimut, Laverton North', -37.9162, 144.6421],
  '3027': ['Laverton Raaf, Williams Landing, Williams Raaf', -37.9324, 144.7541],
  '3028': ['Altona Meadows, Laverton, Seabrook', -37.8751, 144.7772],
  '3029': ['Hoppers Crossing, Tarneit, Truganina', -37.8372, 144.7058],
  '3030': ['Chartwell, Cocoroc, Point Cook +3 more', -37.9162, 144.6421],
  '3031': ['Flemington, Kensington', -37.7912, 144.9234],
  '3032': ['Ascot Vale, Highpoint City, Maribyrnong +1 more', -37.7745, 144.8972],
  '3033': ['Keilor East', -37.7411, 144.8576],
  '3034': ['Avondale Heights', -37.7612, 144.8619],
  '3036': ['Keilor, Keilor North', -37.7053, 144.8225],
  '3037': ['Calder Park, Delahey, Hillside +3 more', -37.7156, 144.7805],
  '3038': ['Keilor Downs, Keilor Lodge, Taylors Lakes +1 more', -37.7005, 144.7669],
  '3039': ['Moonee Ponds', -37.7662, 144.923],
  '3040': ['Aberfeldie, Essendon, Essendon West', -37.7518, 144.9026],
  '3041': ['Cross Keys, Essendon Fields, Essendon North +2 more', -37.7315, 144.9048],
  '3042': ['Airport West, Keilor Park, Niddrie +1 more', -37.7275, 144.8663],
  '3043': ['Gladstone Park, Gowanbrae, Tullamarine', -37.6919, 144.8884],
  '3044': ['Pascoe Vale, Pascoe Vale South', -37.7311, 144.9364],
  '3045': ['Melbourne Airport', -37.6747, 144.8362],
  '3046': ['Glenroy, Hadfield, Oak Park', -37.7066, 144.928],
  '3047': ['Dallas, Jacana', -37.6811, 144.9302],
  '3048': ['Coolaroo, Meadow Heights', -37.6539, 144.9236],
  '3049': ['Attwood, Westmeadows', -37.6732, 144.8885],
  '3050': ['Royal Melbourne Hospital', -37.7989, 144.9562],
  '3051': ['Hotham Hill, North Melbourne', -37.8006, 144.9436],
  '3052': ['Parkville', -37.789, 144.9489],
  '3053': ['Carlton, Carlton South', -37.8036, 144.9661],
  '3054': ['Carlton North, Princes Hill', -37.787, 144.9672],
  '3055': ['Brunswick South, Brunswick West, Moonee Vale +1 more', -37.7636, 144.9422],
  '3056': ['Brunswick, Brunswick Lower, Brunswick North', -37.7663, 144.9601],
  '3057': ['Brunswick East, Lygon Street North, Sumner', -37.77, 144.9773],
  '3058': ['Batman, Coburg, Coburg North +2 more', -37.7399, 144.9645],
  '3059': ['Greenvale', -37.6399, 144.8796],
  '3060': ['Fawkner, Fawkner East, Fawkner North', -37.7073, 144.9679],
  '3061': ['Campbellfield', -37.6663, 144.9568],
  '3062': ['Somerton', -37.633, 144.9326],
  '3063': ['Oaklands Junction, Yuroke', -37.595, 144.8561],
  '3064': ['Craigieburn, Donnybrook, Kalkallo +2 more', -37.5465, 144.9422],
  '3065': ['Fitzroy', -37.8026, 144.9778],
  '3066': ['Collingwood, Collingwood North', -37.8048, 144.9869],
  '3067': ['Abbotsford', -37.8035, 144.9982],
  '3068': ['Clifton Hill, Fitzroy North', -37.791, 144.9862],
  '3070': ['Northcote, Northcote South', -37.7741, 144.9997],
  '3071': ['Thornbury', -37.7594, 145.007],
  '3072': ['Gilberton, Northland Centre, Preston +5 more', -37.7425, 145.0057],
  '3073': ['Keon Park, Reservoir, Reservoir East +2 more', -37.7125, 145.006],
  '3074': ['Thomastown', -37.6847, 145.0066],
  '3075': ['Lalor, Lalor Plaza', -37.6661, 145.0027],
  '3076': ['Epping', -37.6436, 145.0221],
  '3078': ['Alphington, Fairfield', -37.7783, 145.0259],
  '3079': ['Ivanhoe, Ivanhoe East, Ivanhoe North', -37.7727, 145.0486],
  '3081': ['Bellfield, Heidelberg Heights, Heidelberg Rgh +1 more', -37.743, 145.0464],
  '3082': ['Mill Park', -37.6649, 145.0657],
  '3083': ['Bundoora, Kingsbury', -37.7013, 145.0562],
  '3084': ['Banyule, Eaglemont, Heidelberg +2 more', -37.7444, 145.0827],
  '3085': ['Macleod, Macleod West, Yallambie', -37.7244, 145.0699],
  '3086': ['La Trobe University', -37.7213, 145.047],
  '3087': ['Watsonia, Watsonia North', -37.7118, 145.0824],
  '3088': ['Briar Hill, Greensborough, Saint Helena +1 more', -37.7002, 145.1083],
  '3089': ['Diamond Creek', -37.6677, 145.1504],
  '3090': ['Plenty', -37.6684, 145.1078],
  '3091': ['Yarrambat', -37.6375, 145.1367],
  '3093': ['Lower Plenty', -37.7392, 145.1152],
  '3094': ['Montmorency', -37.7198, 145.1247],
  '3095': ['Eltham, Eltham North, Research', -37.7133, 145.1586],
  '3096': ['Wattle Glen', -37.6709, 145.1858],
  '3097': ['Bend Of Islands, Kangaroo Ground, Watsons Creek', -37.6953, 145.2242],
  '3101': ['Cotham, Kew', -37.8074, 145.0366],
  '3102': ['Kew East', -37.7938, 145.0522],
  '3103': ['Balwyn, Balwyn East, Deepdene +1 more', -37.8117, 145.0741],
  '3104': ['Balwyn North, Greythorn', -37.7937, 145.0817],
  '3105': ['Bulleen, Bulleen South', -37.7725, 145.0848],
  '3106': ['Templestowe', -37.7583, 145.1427],
  '3107': ['Templestowe Lower', -37.7652, 145.1107],
  '3108': ['Doncaster', -37.7864, 145.1258],
  '3109': ['Doncaster East, Doncaster Heights, The Pines +1 more', -37.7848, 145.1616],
  '3111': ['Donvale', -37.7941, 145.1863],
  '3113': ['North Warrandyte, Warrandyte', -37.7521, 145.2047],
  '3114': ['Park Orchards', -37.7786, 145.2126],
  '3115': ['Wonga Park', -37.7367, 145.2676],
  '3116': ['Chirnside Park', -37.7376, 145.3131],
  '3121': ['Burnley, Burnley North, Cremorne +5 more', -37.8233, 145.0018],
  '3122': ['Auburn South, Glenferrie South, Hawthorn +2 more', -37.8227, 145.0306],
  '3123': ['Auburn, Hawthorn East', -37.8298, 145.0494],
  '3124': ['Camberwell, Camberwell North, Camberwell South +3 more', -37.8409, 145.0682],
  '3125': ['Bennettswood, Burwood, Surrey Hills South', -37.8513, 145.101],
  '3126': ['Camberwell East, Canterbury', -37.8272, 145.0757],
  '3127': ['Mont Albert, Surrey Hills, Surrey Hills North', -37.8252, 145.0972],
  '3128': ['Box Hill, Box Hill South, Houston +1 more', -37.8289, 145.1224],
  '3129': ['Box Hill North, Kerrimuir, Mont Albert North', -37.807, 145.1251],
  '3130': ['Blackburn, Blackburn North, Blackburn South +1 more', -37.818, 145.1497],
  '3131': ['Brentford Square, Forest Hill, Nunawading', -37.8178, 145.1745],
  '3132': ['Mitcham, Mitcham North, Rangeview', -37.8192, 145.1967],
  '3133': ['Vermont, Vermont South', -37.8488, 145.1923],
  '3134': ['Heathwood, Ringwood, Ringwood North +2 more', -37.8231, 145.2579],
  '3135': ['Heathmont, Ringwood East', -37.8196, 145.2482],
  '3136': ['Croydon, Croydon Hills, Croydon North +1 more', -37.7799, 145.2824],
  '3137': ['Kilsyth, Kilsyth South', -37.8194, 145.3133],
  '3138': ['Mooroolbark', -37.7839, 145.3228],
  '3140': ['Lilydale', -37.7592, 145.3632],
  '3141': ['Chapel Street North, South Yarra', -37.8407, 144.9913],
  '3142': ['Hawksburn, Toorak', -37.8441, 145.0177],
  '3143': ['Armadale, Armadale North', -37.8589, 145.0194],
  '3144': ['Kooyong, Malvern, Malvern North', -37.8574, 145.0341],
  '3145': ['Caulfield East, Darling, Darling South +1 more', -37.8736, 145.0493],
  '3146': ['Glen Iris, Tooronga', -37.8571, 145.0578],
  '3147': ['Ashburton, Ashwood', -37.8679, 145.0929],
  '3148': ['Chadstone, Chadstone Centre, Holmesglen +1 more', -37.8826, 145.0901],
  '3149': ['Mount Waverley, Pinewood, Syndal', -37.8807, 145.1281],
  '3150': ['Brandon Park, Glen Waverley, Wheelers Hill', -37.9144, 145.1688],
  '3151': ['Burwood East, Burwood Heights', -37.8552, 145.1511],
  '3152': ['Knox City Centre, Studfield, Wantirna +1 more', -37.865, 145.2217],
  '3153': ['Bayswater, Bayswater North', -37.8451, 145.2701],
  '3154': ['The Basin', -37.856, 145.3178],
  '3155': ['Boronia', -37.8618, 145.2844],
  '3156': ['Ferntree Gully, Lysterfield, Lysterfield South +2 more', -37.9179, 145.2929],
  '3158': ['Upwey', -37.9101, 145.3245],
  '3160': ['Belgrave, Belgrave Heights, Belgrave South +1 more', -37.9351, 145.3508],
  '3161': ['Caulfield Junction, Caulfield North', -37.8737, 145.0199],
  '3162': ['Caulfield, Caulfield South, Hopetoun Gardens', -37.8921, 145.0234],
  '3163': ['Carnegie, Glen Huntly, Murrumbeena', -37.8965, 145.0572],
  '3165': ['Bentleigh East, Coatesville', -37.9224, 145.0594],
  '3166': ['Hughesdale, Huntingdale, Oakleigh +1 more', -37.9028, 145.0897],
  '3167': ['Oakleigh South', -37.9233, 145.0876],
  '3168': ['Clayton, Notting Hill', -37.9134, 145.1267],
  '3169': ['Clarinda, Clayton South', -37.9451, 145.1153],
  '3170': ['Mulgrave, Waverley Gardens', -37.9209, 145.1679],
  '3171': ['Sandown Village, Springvale', -37.9446, 145.1568],
  '3172': ['Dingley Village, Springvale South', -37.976, 145.1346],
  '3173': ['Keysborough', -38.0068, 145.1649],
  '3174': ['Noble Park, Noble Park East, Noble Park North', -37.9662, 145.1788],
  '3175': ['Bangholme, Dandenong, Dandenong East +3 more', -38.0161, 145.2085],
  '3177': ['Doveton, Eumemmerring', -37.991, 145.2375],
  '3178': ['Rowville', -37.9244, 145.2416],
  '3179': ['Scoresby', -37.8971, 145.2226],
  '3180': ['Knoxfield', -37.8933, 145.2467],
  '3181': ['Prahran, Prahran East, Windsor', -37.8547, 144.9955],
  '3182': ['St Kilda, St Kilda South, St Kilda West', -37.8653, 144.9795],
  '3183': ['Balaclava, St Kilda East', -37.8691, 144.999],
  '3184': ['Elwood', -37.8814, 144.984],
  '3185': ['Elsternwick, Gardenvale, Ripponlea', -37.8918, 145.0026],
  '3186': ['Brighton, Brighton North, Dendy +1 more', -37.9151, 144.9963],
  '3187': ['Brighton East', -37.9254, 145.0136],
  '3189': ['Moorabbin, Moorabbin East, Wishart', -37.942, 145.0478],
  '3190': ['Highett', -37.9514, 145.0381],
  '3192': ['Cheltenham, Cheltenham East, Cheltenham North +1 more', -37.9657, 145.0623],
  '3194': ['Mentone, Mentone East, Moorabbin Airport', -37.9851, 145.0674],
  '3195': ['Aspendale, Aspendale Gardens, Braeside +4 more', -38.007, 145.1041],
  '3196': ['Bonbeach, Chelsea, Chelsea Heights +1 more', -38.0465, 145.1228],
  '3197': ['Carrum, Patterson Lakes', -38.0727, 145.1341],
  '3198': ['Belvedere Park, Seaford', -38.1032, 145.1378],
  '3199': ['Frankston, Frankston East, Frankston Heights +3 more', -38.1626, 145.136],
  '3200': ['Frankston North, Pines Forest', -38.1265, 145.1576],
  '3201': ['Carrum Downs', -38.0929, 145.1779],
  '3202': ['Heatherton', -37.9606, 145.0927],
  '3204': ['Bentleigh, Mckinnon, Ormond +1 more', -37.917, 145.0368],
  '3205': ['South Melbourne', -37.8317, 144.9582],
  '3206': ['Albert Park, Middle Park', -37.8465, 144.9509],
  '3207': ['Garden City, Port Melbourne', -37.8322, 144.918],
  '3211': ['Little River', -37.9436, 144.4985],
  '3212': ['Avalon, Lara, Point Wilson', -38.04, 144.4227],
  '3213': ['Lovely Banks', -38.0407, 144.3224],
  '3214': ['Corio, Norlane, North Shore', -38.0848, 144.3524],
  '3215': ['Bell Park, Bell Post Hill, Drumcondra +4 more', -38.111, 144.3345],
  '3216': ['Belmont, Freshwater Creek, Grovedale +6 more', -38.2159, 144.334],
  '3217': ['Armstrong Creek, Charlemont', -38.2341, 144.3708],
  '3218': ['Fyansford, Geelong West, Herne Hill +1 more', -38.1303, 144.2895],
  '3219': ['Breakwater, East Geelong, Newcomb +3 more', -38.1728, 144.3895],
  '3220': ['Bareena, Geelong, Newtown +1 more', -38.157, 144.3465],
  '3221': ['Anakie, Barrabool, Batesford +17 more', -38.1816, 144.4274],
  '3222': ['Clifton Springs, Curlewis, Drysdale +3 more', -38.2099, 144.573],
  '3224': ['Leopold, Moolap', -38.2029, 144.4624],
  '3335': ['Bonnie Brook, Grangefields, Plumpton +2 more', -37.6961, 144.6699],
  '3336': ['Aintree, Deanside, Fraser Rise', -37.719, 144.6684],
  '3337': ['Harkness, Kurunjang, Melton +2 more', -37.6572, 144.5462],
  '3338': ['Brookfield, Cobblebank, Exford +4 more', -37.7055, 144.571],
  '3427': ['Diggers Rest, Plumpton', -37.6435, 144.708],
  '3428': ['Bulla', -37.5911, 144.8115],
  '3429': ['Sunbury, Wildwood', -37.5676, 144.729],
  '3437': ['Bullengarook, Gisborne, Gisborne South', -37.5016, 144.513],
  '3438': ['New Gisborne', -37.4575, 144.602],
  '3440': ['Macedon', -37.4134, 144.5462],
  '3750': ['Wollert', -37.5961, 145.0056],
  '3752': ['Morang South, South Morang', -37.6191, 145.0744],
  '3754': ['Doreen, Mernda', -37.5936, 145.113],
  '3765': ['Montrose', -37.8148, 145.3466],
  '3767': ['Mount Dandenong', -37.8394, 145.3475],
  '3785': ['Tremont', -37.8851, 145.3167],
  '3786': ['Ferny Creek', -37.8782, 145.3324],
  '3800': ['Monash University', -37.9105, 145.1349],
  '3802': ['Endeavour Hills', -37.9718, 145.2556],
  '3803': ['Hallam', -38.0094, 145.2655],
  '3804': ['Narre Warren East, Narre Warren North', -37.9801, 145.326],
  '3805': ['Fountain Gate, Narre Warren, Narre Warren South', -38.037, 145.3042],
  '3806': ['Berwick, Harkaway', -38.025, 145.3495],
  '3910': ['Langwarrin', -38.1564, 145.1983],
  '3975': ['Lynbrook, Lyndhurst', -38.0535, 145.2311],
  '3976': ['Hampton Park', -38.044, 145.2643],
  '3977': ['Cannons Creek, Cranbourne, Cranbourne East +8 more', -38.1353, 145.2689],
}

// Red service boundary drawn on the map ([latitude, longitude] points, traced from the design)
const SERVICE_BOUNDARY = [
  [-37.4, 144.55], [-37.47, 144.62], [-37.52, 144.74], [-37.53, 144.9],
  [-37.55, 145.0], [-37.575, 145.08], [-37.62, 145.18], [-37.7, 145.3],
  [-37.745, 145.4], [-37.8, 145.38], [-37.87, 145.33], [-37.95, 145.36],
  [-38.03, 145.37], [-38.1, 145.33], [-38.16, 145.24], [-38.19, 145.15],
  [-38.15, 145.11], [-38.06, 145.11], [-37.99, 145.06], [-37.92, 144.99],
  [-37.87, 144.96], [-37.845, 144.92], [-37.87, 144.88], [-37.885, 144.8],
  [-37.93, 144.76], [-37.98, 144.68], [-38.03, 144.48], [-38.09, 144.39],
  [-38.13, 144.4], [-38.14, 144.48], [-38.18, 144.62], [-38.235, 144.58],
  [-38.235, 144.4], [-38.235, 144.3], [-38.17, 144.26], [-38.06, 144.29],
  [-37.97, 144.33], [-37.84, 144.45], [-37.7, 144.51], [-37.6, 144.52],
  [-37.48, 144.51],
]

// Inner Melbourne zone shaded red on the map
const INNER_MELBOURNE = [
  [-37.705, 145.0], [-37.72, 145.06], [-37.79, 145.065], [-37.84, 145.05],
  [-37.865, 145.02], [-37.875, 144.975], [-37.845, 144.925], [-37.8, 144.885],
  [-37.755, 144.895], [-37.725, 144.95],
]

// Labelled towns on the map: [name, latitude, longitude, label side]
const TOWNS = [
  ['Macedon', -37.418, 144.563, 'right'], ['Gisborne', -37.49, 144.593, 'right'],
  ['Sunbury', -37.578, 144.726, 'right'], ['Craigieburn', -37.6, 144.945, 'right'],
  ['Epping', -37.645, 145.03, 'right'], ['Bundoora', -37.698, 145.06, 'right'],
  ['Reservoir', -37.717, 145.007, 'top'], ['Lilydale', -37.757, 145.355, 'right'],
  ['Ringwood', -37.815, 145.229, 'right'], ['Glen Waverley', -37.878, 145.164, 'right'],
  ['Dandenong', -37.987, 145.215, 'right'], ['Berwick', -38.033, 145.35, 'right'],
  ['Cranbourne', -38.099, 145.283, 'right'], ['Frankston', -38.144, 145.126, 'right'],
  ['Brighton', -37.906, 144.999, 'right'], ['St Kilda', -37.868, 144.981, 'right'],
  ['Truganina', -37.818, 144.75, 'top'], ['Tarneit', -37.832, 144.695, 'left'],
  ['Werribee', -37.9, 144.66, 'right'], ['St Albans', -37.745, 144.8, 'right'],
  ['Melton', -37.683, 144.585, 'right'], ['Lara', -38.023, 144.41, 'right'],
  ['Geelong', -38.149, 144.361, 'top'], ['Highton', -38.17, 144.31, 'bottom'],
]

const LABEL_OFFSET = { right: [6, 0], left: [-6, 0], top: [0, -6], bottom: [0, 6] }

// Surrounding places shown as plain text on the overview, as in the design
const PLACES = [
  ['Blackwood', -37.475, 144.3], ['Ballan', -37.6, 144.225], ['Darley', -37.655, 144.44],
  ['Bacchus Marsh', -37.675, 144.44], ['Whittlesea', -37.511, 145.118], ['Yarra Junction', -37.78, 145.61],
  ['Gembrook', -37.952, 145.553], ['Nar Nar Goon', -38.082, 145.57], ['Bayles', -38.18, 145.56],
  ['Mornington', -38.22, 145.04], ['St Leonards', -38.17, 144.72], ['Queenscliff', -38.267, 144.66],
  ['Ocean Grove', -38.26, 144.52], ['Clifton Springs', -38.155, 144.565],
]

// Suburb names shown when zoomed in (from the same open post code list).
// When zoomed in, these replace the 24 dark labels, so no name is ever shown twice.
const SUBURBS = [
  ['Abbotsford', -37.8024, 144.9984], ['Aberfeldie', -37.762, 144.901], ['Aintree', -37.7215, 144.663],
  ['Airport West', -37.7262, 144.8814], ['Albanvale', -37.746, 144.765], ['Albert Park', -37.8439, 144.9515],
  ['Albion', -37.7755, 144.8154], ['Alphington', -37.78, 145.023], ['Altona', -37.8632, 144.812],
  ['Altona East', -37.8389, 144.8346], ['Altona Gate', -37.8277, 144.8477], ['Altona Meadows', -37.8716, 144.7776],
  ['Altona North', -37.8389, 144.8346], ['Anakie', -37.9167, 144.25], ['Ardeer', -37.7777, 144.7989],
  ['Armadale', -37.8573, 145.019], ['Armadale North', -37.8555, 145.0207], ['Armstrong Creek', -38.2373, 144.374],
  ['Arthurs Creek', -37.5833, 145.2], ['Ascot Vale', -37.7767, 144.9111], ['Ashbourne', -37.3869, 144.4461],
  ['Ashburton', -37.8669, 145.0831], ['Ashwood', -37.867, 145.103], ['Aspendale', -38.025, 145.104],
  ['Aspendale Gardens', -38.0228, 145.1189], ['Attwood', -37.666, 144.887], ['Auburn', -37.8303, 145.0436],
  ['Auburn South', -37.8298, 145.0439], ['Avalon', -38.0569, 144.423], ['Avondale Heights', -37.7628, 144.8649],
  ['Avonsleigh', -37.925, 145.4819], ['Bacchus Marsh', -37.6764, 144.4463], ['Badger Creek', -37.685, 145.538],
  ['Balaclava', -37.873, 144.993], ['Ballan', -37.6146, 144.2416], ['Balliang', -37.8622, 144.3841],
  ['Balliang East', -37.7931, 144.4345], ['Balwyn', -37.8089, 145.0789], ['Balwyn East', -37.8089, 145.0789],
  ['Balwyn North', -37.7941, 145.0879], ['Bangholme', -38.0453, 145.1702], ['Bannockburn', -38.05, 144.1667],
  ['Banyule', -37.7436, 145.0769], ['Bareena', -38.1541, 144.3443], ['Barrabool', -38.1605, 144.2484],
  ['Barrys Reef', -37.4563, 144.3194], ['Barwon Heads', -38.274, 144.4862], ['Basalt', -37.3089, 144.1039],
  ['Batesford', -38.0899, 144.285], ['Batman', -37.7345, 144.963], ['Baxter', -38.196, 145.157],
  ['Bayles', -38.182, 145.575], ['Bayswater', -37.843, 145.268], ['Bayswater North', -37.827, 145.28],
  ['Beaconsfield', -38.049, 145.371], ['Beaconsfield Upper', -37.9982, 145.4238], ['Beaumaris', -37.983, 145.0434],
  ['Beenak', -37.8986, 145.609], ['Belgrave', -37.9121, 145.3558], ['Belgrave Heights', -37.923, 145.34],
  ['Belgrave South', -37.94, 145.356], ['Bell Park', -38.11, 144.338], ['Bell Post Hill', -38.1, 144.328],
  ['Bellarine', -38.1322, 144.6197], ['Bellbrae', -38.3333, 144.2667], ['Bellfield', -37.754, 145.045],
  ['Belmont', -38.173, 144.341], ['Belvedere Park', -38.1102, 145.1469], ['Bend Of Islands', -37.6981, 145.2757],
  ['Bennettswood', -37.8545, 145.119], ['Bentleigh', -37.9224, 145.041], ['Bentleigh East', -37.9175, 145.0659],
  ['Beremboke', -37.7833, 144.25], ['Beveridge', -37.4823, 144.9832], ['Bittern', -38.3329, 145.1652],
  ['Black Rock', -37.972, 145.021], ['Black Rock North', -37.967, 145.0171], ['Blackburn', -37.8197, 145.1531],
  ['Blackburn North', -37.8064, 145.1586], ['Blackburn South', -37.838, 145.144], ['Blackwood', -37.4834, 144.3027],
  ['Blakeville', -37.5008, 144.2105], ['Blind Bight', -38.2139, 145.3399], ['Bolinda', -37.4394, 144.7742],
  ['Bonbeach', -38.062, 145.12], ['Bonnie Brook', -37.6914, 144.66], ['Boronia', -37.8611, 145.2867],
  ['Botanic Ridge', -38.144, 145.267], ['Box Hill', -37.8181, 145.1239], ['Box Hill North', -37.8083, 145.1258],
  ['Box Hill South', -37.836, 145.124], ['Braeside', -38.0, 145.125], ['Brandon Park', -37.9145, 145.169],
  ['Braybrook', -37.7904, 144.8566], ['Braybrook North', -37.7904, 144.8566], ['Breakwater', -38.182, 144.375],
  ['Breamlea', -38.3, 144.3833], ['Brentford Square', -37.837, 145.184], ['Briar Hill', -37.708, 145.115],
  ['Brighton East', -37.9179, 145.019], ['Brighton North', -37.9036, 145.0049], ['Brookfield', -37.6999, 144.5382],
  ['Brooklyn', -37.8173, 144.8465], ['Bruces Creek', -37.5191, 145.1257], ['Brunswick', -37.7666, 144.9584],
  ['Brunswick East', -37.7694, 144.9805], ['Brunswick Lower', -37.7666, 144.9584],
  ['Brunswick North', -37.758, 144.9638], ['Brunswick South', -37.7723, 144.9496],
  ['Brunswick West', -37.761, 144.9419], ['Bulla', -37.6342, 144.7961], ['Bullarto', -37.399, 144.2126],
  ['Bullarto South', -37.4233, 144.2187], ['Bulleen', -37.766, 145.0879], ['Bulleen South', -37.7748, 145.092],
  ['Bullengarook', -37.5167, 144.4833], ['Bunding', -37.5453, 144.1744], ['Bungal', -37.7256, 144.1114],
  ['Burnley', -37.8297, 145.0126], ['Burnley North', -37.816, 145.0089], ['Burnside', -37.753, 144.754],
  ['Burnside Heights', -37.727, 144.76], ['Burwood', -37.8483, 145.11], ['Burwood East', -37.8553, 145.1514],
  ['Burwood Heights', -37.8553, 145.1514], ['Cadello', -37.3034, 144.5273], ['Cairnlea', -37.7578, 144.7913],
  ['Calder Park', -37.679, 144.762], ['Caldermeade', -38.238, 145.5764], ['Camberwell', -37.8334, 145.0659],
  ['Camberwell East', -37.8251, 145.0694], ['Camberwell North', -37.8243, 145.0581],
  ['Camberwell South', -37.8334, 145.0659], ['Camberwell West', -37.8438, 145.0541],
  ['Campbellfield', -37.6651, 144.9557], ['Cannons Creek', -38.213, 145.315], ['Canterbury', -37.8245, 145.0741],
  ['Cardinia', -38.147, 145.423], ['Carlton', -37.7984, 144.9694], ['Carlton North', -37.7888, 144.972],
  ['Carlton South', -37.8042, 144.966], ['Carnegie', -37.8892, 145.0571], ['Caroline Springs', -37.745, 144.74],
  ['Carrum', -38.076, 145.122], ['Carrum Downs', -38.0975, 145.1707], ['Castella', -37.5247, 145.4333],
  ['Catani', -38.1833, 145.65], ['Caulfield', -37.884, 145.0266], ['Caulfield East', -37.8792, 145.0444],
  ['Caulfield Junction', -37.8745, 145.0245], ['Caulfield North', -37.8713, 145.019],
  ['Caulfield South', -37.891, 145.026], ['Ceres', -38.1591, 144.2641], ['Chadstone', -37.882, 145.099],
  ['Charlemont', -38.218, 144.367], ['Chartwell', -37.7935, 144.764], ['Chelsea', -38.0511, 145.1219],
  ['Chelsea Heights', -38.047, 145.137], ['Cheltenham', -37.9642, 145.0659], ['Cheltenham East', -37.9642, 145.0659],
  ['Cheltenham North', -37.9532, 145.063], ['Cherokee', -37.3833, 144.6333], ['Chintin', -37.3906, 144.8345],
  ['Chirnside Park', -37.7373, 145.3088], ['Christmas Hills', -37.6515, 145.3173], ['Chum Creek', -37.606, 145.488],
  ['Clarinda', -37.941, 145.103], ['Clarkefield', -37.4975, 144.8071], ['Clayton', -37.9212, 145.1321],
  ['Clayton South', -37.9388, 145.1267], ['Clematis', -37.9322, 145.4222], ['Clifton Hill', -37.7878, 145.0002],
  ['Clifton Springs', -38.1516, 144.5739], ['Clyde', -38.132, 145.327], ['Clyde North', -38.1063, 145.3484],
  ['Coatesville', -37.9201, 145.0736], ['Cobblebank', -37.7062, 144.602], ['Coburg', -37.7413, 144.9666],
  ['Coburg North', -37.726, 144.96], ['Cockatoo', -37.935, 145.492], ['Cocoroc', -37.9687, 144.6215],
  ['Coimadai', -37.6041, 144.4465], ['Colbrook', -37.5312, 144.2154], ['Coldstream', -37.734, 145.383],
  ['Collingwood', -37.801, 144.9873], ['Collingwood North', -37.801, 144.9873], ['Connewarre', -38.2641, 144.4623],
  ['Coolaroo', -37.6562, 144.9364], ['Coomoora', -37.3318, 144.1965], ['Cora Lynn', -38.1453, 145.6058],
  ['Corio', -38.0741, 144.3586], ['Cotham', -37.8086, 145.046], ['Cottles Bridge', -37.622, 145.219],
  ['Cranbourne East', -38.1163, 145.3076], ['Cranbourne North', -38.07, 145.291],
  ['Cranbourne South', -38.1581, 145.2535], ['Cranbourne West', -38.1022, 145.2535], ['Cremorne', -37.83, 144.993],
  ['Cromer', -37.9845, 145.0451], ['Cross Keys', -37.7263, 144.897], ['Croydon', -37.7944, 145.2815],
  ['Croydon Hills', -37.775, 145.266], ['Croydon North', -37.767, 145.287], ['Croydon South', -37.814, 145.271],
  ['Curlewis', -38.1767, 144.5328], ['Dales Creek', -37.5236, 144.3016], ['Dallas', -37.668, 144.94],
  ['Dalmore', -38.19, 145.425], ['Dandenong East', -37.9848, 145.214], ['Dandenong North', -37.9592, 145.2068],
  ['Dandenong South', -38.0147, 145.2153], ['Darley', -37.6547, 144.4372], ['Darling', -37.8769, 145.0594],
  ['Darraweit Guim', -37.4, 144.9], ['Daylesford', -37.35, 144.15], ['Deanside', -37.7215, 144.663],
  ['Deepdene', -37.8131, 145.068], ['Deer Park', -37.7703, 144.7748], ['Deer Park East', -37.7777, 144.7989],
  ['Deer Park North', -37.7561, 144.7736], ['Delahey', -37.719, 144.777], ['Dendy', -37.9197, 144.995],
  ['Derrimut', -37.7927, 144.7716], ['Devon Meadows', -38.162, 145.303], ['Dewhurst', -37.9844, 145.4665],
  ['Diamond Creek', -37.6666, 145.1541], ['Diggers Rest', -37.6154, 144.6863],
  ['Dingley Village', -37.9758, 145.1226], ['Dixons Creek', -37.6, 145.4167], ['Docklands', -37.8171, 144.9419],
  ['Don Valley', -37.7614, 145.5844], ['Doncaster', -37.7866, 145.121], ['Doncaster East', -37.7884, 145.1541],
  ['Doncaster Heights', -37.7887, 145.158], ['Donnybrook', -37.5477, 144.9669], ['Donvale', -37.7902, 145.1873],
  ['Doreen', -37.605, 145.146], ['Doveton', -37.9877, 145.2394], ['Dromana', -38.338, 144.965],
  ['Drumcondra', -38.132, 144.354], ['Drysdale', -38.1809, 144.5985], ['Dunearn', -37.9676, 145.2025],
  ['Durdidwarrah', -37.8208, 144.1734], ['Eaglemont', -37.7645, 145.0628], ['East Geelong', -38.162, 144.3802],
  ['East Melbourne', -37.8161, 144.9805], ['Eden Park', -37.489, 145.07], ['Edithvale', -38.037, 145.113],
  ['Elsternwick', -37.885, 145.006], ['Eltham', -37.715, 145.158], ['Eltham North', -37.698, 145.144],
  ['Elwood', -37.8787, 144.986], ['Emerald', -37.9331, 145.4369], ['Endeavour Hills', -37.978, 145.2591],
  ['Essendon', -37.7505, 144.9143], ['Essendon Fields', -37.7263, 144.897], ['Essendon North', -37.7383, 144.8993],
  ['Essendon West', -37.755, 144.883], ['Eumemmerring', -37.999, 145.247], ['Exford', -37.7186, 144.5349],
  ['Eynesbury', -37.7472, 144.564], ['Fairfield', -37.779, 145.0181], ['Fawkner', -37.6969, 144.9667],
  ['Fawkner East', -37.6969, 144.9667], ['Fawkner North', -37.696, 144.9684], ['Fern Hill', -37.3753, 144.4233],
  ['Fernshaw', -37.6161, 145.6384], ['Ferntree Gully', -37.8827, 145.2776], ['Ferny Creek', -37.8759, 145.3309],
  ['Fieldstone', -37.7472, 144.649], ['Fiskville', -37.6683, 144.202], ['Fitzroy', -37.7975, 144.9805],
  ['Fitzroy North', -37.7833, 144.9838], ['Five Ways', -38.1671, 145.32], ['Flemington', -37.7833, 144.9277],
  ['Flowerdale', -37.3191, 145.3289], ['Footscray', -37.7989, 144.8924], ['Forbes', -37.3078, 144.8841],
  ['Forest Hill', -37.8347, 145.1727], ['Fountain Gate', -38.0176, 145.3038], ['Frankston East', -38.1466, 145.1357],
  ['Frankston Heights', -38.162, 145.1466], ['Frankston North', -38.125, 145.1624],
  ['Frankston South', -38.188, 145.153], ['Fraser Rise', -37.7215, 144.663], ['French Island', -38.3489, 145.3365],
  ['Freshwater Creek', -38.1747, 144.3139], ['Fyansford', -38.1348, 144.291], ['Garden City', -37.8366, 144.9198],
  ['Gardenvale', -37.899, 145.007], ['Garfield', -38.0999, 145.6801], ['Garfield North', -38.05, 145.6833],
  ['Geelong North', -38.1094, 144.3522], ['Geelong West', -38.1333, 144.35], ['Gembrook', -37.9524, 145.6024],
  ['Gheringhap', -38.072, 144.23], ['Gilberton', -37.7363, 144.99], ['Gisborne South', -37.5386, 144.6064],
  ['Gladstone Park', -37.6927, 144.8952], ['Gladysdale', -37.8167, 145.65], ['Glen Huntly', -37.8927, 145.0411],
  ['Glen Iris', -37.8577, 145.0549], ['Glenburn', -37.4199, 145.4458], ['Glengala', -37.7883, 144.8088],
  ['Glenmore', -37.7128, 144.3122], ['Glenroy', -37.7062, 144.9161], ['Gnarwarre', -38.1809, 144.1621],
  ['Gordon', -37.5678, 144.1175], ['Gowanbrae', -37.7063, 144.8949], ['Grangefields', -37.7054, 144.639],
  ['Greendale', -37.5669, 144.3169], ['Greensborough', -37.7044, 145.1006], ['Greenvale', -37.6455, 144.8841],
  ['Greythorn', -37.7966, 145.0985], ['Grovedale', -38.2, 144.35], ['Grovedale East', -38.2, 144.35],
  ['Gruyere', -37.734, 145.45], ['Guys Hill', -38.017, 145.386], ['Hadfield', -37.71, 144.95],
  ['Hallam', -38.007, 145.2757], ['Hamlyn Heights', -38.12, 144.32], ['Hampton', -37.937, 145.009],
  ['Hampton East', -37.939, 145.031], ['Hampton North', -37.9394, 145.0135], ['Hampton Park', -38.035, 145.2757],
  ['Hanging Rock', -37.3349, 144.5944], ['Harkaway', -37.999, 145.344], ['Harkness', -37.6669, 144.564],
  ['Hartwell', -37.8441, 145.0756], ['Hastings', -38.306, 145.189], ['Hawksburn', -37.8447, 145.0023],
  ['Hawthorn', -37.8222, 145.0328], ['Hawthorn East', -37.8311, 145.0521], ['Hawthorn North', -37.8147, 145.0217],
  ['Hawthorn West', -37.8201, 145.0181], ['Hazeldene', -37.3633, 145.2789], ['Healesville', -37.6561, 145.5139],
  ['Healesville Post Shop', -37.6541, 145.515], ['Heath Hill', -38.244, 145.692],
  ['Heathcote Junction', -37.3853, 145.0438], ['Heatherton', -37.953, 145.0879], ['Heathmont', -37.83, 145.242],
  ['Heathwood', -37.8292, 145.228], ['Heidelberg', -37.7527, 145.0703], ['Heidelberg Heights', -37.742, 145.053],
  ['Heidelberg Rgh', -37.7418, 145.044], ['Heidelberg West', -37.744, 145.047], ['Hepburn', -37.3118, 144.1257],
  ['Hepburn Springs', -37.3148, 144.1475], ['Herne Hill', -38.1329, 144.3305], ['Hesket', -37.35, 144.6167],
  ['Hidden Valley', -37.3952, 144.9904], ['Highett', -37.9487, 145.0411], ['Highpoint City', -37.7732, 144.8893],
  ['Hillside', -37.687, 144.743], ['Hoddles Creek', -37.833, 145.583], ['Holmesglen', -37.8858, 145.0917],
  ['Hopetoun Park', -37.6979, 144.5054], ['Hoppers Crossing', -37.8629, 144.6855],
  ['Hotham Hill', -37.8009, 144.953], ['Houston', -37.8449, 145.1301], ['Hughesdale', -37.8966, 145.0832],
  ['Humevale', -37.497, 145.175], ['Huntingdale', -37.9074, 145.1086], ['Hurstbridge', -37.6389, 145.195],
  ['Indented Head', -38.1381, 144.71], ['Ingliston', -37.6435, 144.2928], ['Iona', -38.15, 145.6833],
  ['Ivanhoe', -37.7703, 145.0457], ['Ivanhoe East', -37.772, 145.066], ['Ivanhoe North', -37.7596, 145.0442],
  ['Jacana', -37.6872, 144.9129], ['Jam Jerrup', -38.3218, 145.5204], ['Jan Juc', -38.3333, 144.3],
  ['Jordanville', -37.8736, 145.112], ['Junction Village', -38.132, 145.293], ['Kalkallo', -37.5246, 144.9557],
  ['Kallista', -37.9051, 145.4112], ['Kalorama', -37.8195, 145.3863], ['Kangaroo Ground', -37.686, 145.216],
  ['Karingal', -38.1422, 145.1582], ['Kealba', -37.7328, 144.8238], ['Keilor', -37.712, 144.831],
  ['Keilor Downs', -37.722, 144.803], ['Keilor East', -37.7343, 144.8566], ['Keilor Lodge', -37.6983, 144.7989],
  ['Keilor North', -37.68, 144.784], ['Keilor Park', -37.7201, 144.8515], ['Kensington', -37.7941, 144.9277],
  ['Keon Park', -37.6946, 145.0118], ['Kerrie', -37.3804, 144.6698], ['Kerrimuir', -37.8025, 145.1326],
  ['Kew', -37.8035, 145.0328], ['Kew East', -37.7923, 145.0549], ['Keysborough', -38.0043, 145.1707],
  ['Kilmore', -37.3017, 144.9497], ['Kilsyth', -37.802, 145.316], ['Kilsyth South', -37.8296, 145.3116],
  ['Kinglake', -37.5184, 145.3591], ['Kinglake West', -37.4667, 145.2333], ['Kings Park', -37.734, 144.772],
  ['Kingsbury', -37.715, 145.034], ['Kingsville', -37.809, 144.878], ['Kingsville West', -37.809, 144.878],
  ['Knoxfield', -37.8888, 145.2508], ['Koo Wee Rup', -38.198, 145.489], ['Koo Wee Rup North', -38.1487, 145.5386],
  ['Kooyong', -37.8419, 145.035], ['Korobeit', -37.5852, 144.3412], ['Korweinguboora', -37.4492, 144.1383],
  ['Kunyung', -38.1913, 145.0789], ['Kurunjang', -37.672, 144.585], ['Kyneton South', -37.3015, 144.4554],
  ['Laburnum', -37.8211, 145.1454], ['Lalor', -37.6651, 145.0108], ['Lang Lang', -38.2667, 145.5667],
  ['Lang Lang East', -38.2729, 145.6523], ['Langwarrin', -38.1609, 145.1928], ['Langwarrin South', -38.189, 145.189],
  ['Launching Place', -37.774, 145.588], ['Laverton', -37.8592, 144.7704], ['Laverton North', -37.828, 144.7855],
  ['Laverton Raaf', -37.8655, 144.7613], ['Leonards Hill', -37.4204, 144.1203], ['Leopold', -38.1944, 144.4671],
  ['Lerderderg', -37.4379, 144.2813], ['Lethbridge', -37.9633, 144.1066], ['Little Hampton', -37.3673, 144.2921],
  ['Little River', -37.9368, 144.4561], ['Long Forest', -37.6513, 144.5054], ['Lovely Banks', -38.0667, 144.333],
  ['Lower Plenty', -37.7393, 145.1128], ['Lynbrook', -38.05, 145.252], ['Lyndhurst', -38.0705, 145.2425],
  ['Lyonville', -37.3919, 144.2629], ['Lysterfield', -37.93, 145.301], ['Lysterfield South', -37.949, 145.26],
  ['Macclesfield', -37.883, 145.477], ['Macleod', -37.714, 145.066], ['Macleod West', -37.7259, 145.0709],
  ['Maddingley', -37.6838, 144.4089], ['Maidstone', -37.783, 144.878], ['Malvern', -37.8572, 145.0342],
  ['Malvern East', -37.8773, 145.0593], ['Malvern North', -37.8518, 145.0302], ['Mambourin', -37.8925, 144.5965],
  ['Manifold Heights', -38.14, 144.33], ['Mannerim', -38.2167, 144.5833], ['Manor Lakes', -37.8734, 144.582],
  ['Marcus Hill', -38.2333, 144.5667], ['Maribyrnong', -37.7696, 144.8821], ['Marshall', -38.2025, 144.36],
  ['Maryknoll', -38.032, 145.602], ['Maude', -37.9243, 144.1686], ['Mckinnon', -37.91, 145.039],
  ['Meadow Heights', -37.65, 144.922], ['Melton South', -37.7031, 144.5719], ['Melton West', -37.683, 144.55],
  ['Mentone', -37.9812, 145.0648], ['Mentone East', -37.9812, 145.0648], ['Menzies Creek', -37.931, 145.398],
  ['Merlynston', -37.7209, 144.9614], ['Mernda', -37.5893, 145.1038], ['Merrimu', -37.6586, 144.4725],
  ['Mickleham', -37.562, 144.874], ['Middle Camberwell', -37.844, 145.0569], ['Middle Park', -37.8519, 144.9631],
  ['Mill Park', -37.665, 145.0659], ['Millgrove', -37.7448, 145.6507], ['Mitcham', -37.822, 145.1983],
  ['Mitcham North', -37.8043, 145.1893], ['Modewarre', -38.2661, 144.1219], ['Monbulk', -37.8689, 145.4361],
  ['Monomeith', -38.2156, 145.5379], ['Mont Albert', -37.8161, 145.11], ['Mont Albert North', -37.8081, 145.1139],
  ['Montmorency', -37.7196, 145.1238], ['Montrose', -37.8084, 145.3531], ['Moolap', -38.1833, 144.4333],
  ['Moonee Ponds', -37.7675, 144.9199], ['Moonee Vale', -37.761, 144.9419], ['Moorabbin', -37.9404, 145.0576],
  ['Moorabbin East', -37.9404, 145.058], ['Moorabool', -38.0697, 144.295], ['Moorooduc', -38.2502, 145.1265],
  ['Mooroolbark', -37.7822, 145.3309], ['Morang South', -37.6514, 145.0896], ['Mordialloc', -37.9995, 145.094],
  ['Mordialloc North', -37.9944, 145.092], ['Moreland', -37.7343, 144.9667], ['Moreland West', -37.7542, 144.9454],
  ['Moriac', -38.2333, 144.1667], ['Mornington', -38.2277, 145.0604], ['Mount Burnett', -37.9768, 145.5146],
  ['Mount Cottrell', -37.7968, 144.6229], ['Mount Dandenong', -37.8422, 145.342],
  ['Mount Duneed', -38.1747, 144.3139], ['Mount Egerton', -37.6167, 144.1], ['Mount Eliza', -38.1952, 145.0879],
  ['Mount Evelyn', -37.7792, 145.3918], ['Mount Macedon', -37.3981, 144.5985], ['Mount Martha', -38.287, 145.0163],
  ['Mount Moriac', -38.2201, 144.1917], ['Mount Slide', -37.5551, 145.3761], ['Mount Toolebewong', -37.702, 145.572],
  ['Mount Wallace', -37.754, 144.2259], ['Mount Waverley', -37.8773, 145.1265],
  ['Mountain Gate', -37.8901, 145.2736], ['Mulgrave', -37.9268, 145.1762], ['Murgheboluc', -38.1048, 144.129],
  ['Murrindindi', -37.3618, 145.5393], ['Murrumbeena', -37.8978, 145.0709], ['Musk', -37.372, 144.193],
  ['Musk Vale', -37.3824, 144.1338], ['Myrniong', -37.6167, 144.3333], ['Nangana', -37.8667, 145.5333],
  ['Nar Nar Goon', -38.0819, 145.575], ['Nar Nar Goon North', -38.019, 145.551], ['Narbethong', -37.5233, 145.671],
  ['Narre Warren', -38.0302, 145.3033], ['Narre Warren East', -37.961, 145.367],
  ['Narre Warren North', -37.982, 145.314], ['Narre Warren South', -38.055, 145.303],
  ['New Gisborne', -37.4619, 144.6205], ['Newbury', -37.4262, 144.2866], ['Newcomb', -38.17, 144.396],
  ['Newham', -37.3167, 144.6], ['Newport', -37.842, 144.884], ['Newtown', -38.15, 144.333],
  ['Niddrie', -37.7393, 144.8865], ['Niddrie North', -37.7393, 144.886], ['Noble Park', -37.965, 145.1734],
  ['Noble Park East', -37.965, 145.1734], ['Noble Park North', -37.9641, 145.1762], ['Norlane', -38.092, 144.356],
  ['North Blackwood', -37.4167, 144.3667], ['North Geelong', -38.1094, 144.3522],
  ['North Melbourne', -37.7984, 144.9419], ['North Pole', -37.8152, 144.9639], ['North Shore', -38.099, 144.373],
  ['North Warrandyte', -37.726, 145.216], ['Northcote', -37.7736, 144.9997], ['Northcote South', -37.7795, 144.9968],
  ['Notting Hill', -37.9048, 145.1459], ['Nunawading', -37.8184, 145.176], ['Nutfield', -37.603, 145.181],
  ['Nyora', -38.3054, 145.6801], ['Oak Park', -37.718, 144.919], ['Oaklands Junction', -37.6118, 144.8401],
  ['Oakleigh', -37.899, 145.0923], ['Oakleigh East', -37.9085, 145.1181], ['Oakleigh South', -37.9193, 145.099],
  ['Ocean Grove', -38.2573, 144.5382], ['Officer', -38.0611, 145.4151], ['Officer South', -38.1004, 145.4132],
  ['Olinda', -37.8533, 145.3752], ['Ormond', -37.9021, 145.0411], ['Pakenham', -38.0736, 145.4851],
  ['Pakenham South', -38.1343, 145.5026], ['Pakenham Upper', -38.0035, 145.5026], ['Panton Hill', -37.64, 145.2425],
  ['Paraparap', -38.2989, 144.1839], ['Park Orchards', -37.7761, 145.2149], ['Parkdale', -37.991, 145.08],
  ['Parkville', -37.7862, 144.9474], ['Parwan', -37.7167, 144.45], ['Pascoe Vale', -37.727, 144.942],
  ['Pascoe Vale South', -37.7458, 144.9385], ['Patterson', -37.926, 145.0381],
  ['Patterson Lakes', -38.0742, 145.1431], ['Pearcedale', -38.203, 145.231], ['Pentland Hills', -37.6344, 144.3451],
  ['Pheasant Creek', -37.4833, 145.2833], ['Pines Forest', -38.1236, 145.1479], ['Pinewood', -37.8887, 145.1404],
  ['Plenty', -37.6705, 145.11], ['Plumpton', -37.694, 144.752], ['Point Cook', -37.9178, 144.7477],
  ['Point Lonsdale', -38.2833, 144.6], ['Point Wilson', -38.0425, 144.5255], ['Port Melbourne', -37.8315, 144.9226],
  ['Portarlington', -38.1167, 144.65], ['Portsea', -38.32, 144.713], ['Prahran', -37.852, 144.998],
  ['Prahran East', -37.852, 144.998], ['Preston', -37.7399, 145.0108], ['Preston Lower', -37.7509, 144.9878],
  ['Preston South', -37.7514, 145.0024], ['Preston West', -37.7377, 144.9955], ['Princes Hill', -37.784, 144.966],
  ['Quandong', -37.8414, 144.547], ['Queenscliff', -38.2678, 144.6287], ['Rangeview', -37.8043, 145.2004],
  ['Ravenhall', -37.7911, 144.7258], ['Regent West', -37.7301, 144.998], ['Research', -37.707, 145.18],
  ['Reservoir East', -37.7193, 145.0215], ['Reservoir North', -37.7119, 145.0108],
  ['Reservoir South', -37.7306, 145.0149], ['Richmond', -37.823, 144.998], ['Richmond East', -37.8263, 144.9973],
  ['Richmond North', -37.8104, 144.9924], ['Richmond South', -37.823, 144.998],
  ['Riddells Creek', -37.4525, 144.6753], ['Ringwood East', -37.818, 145.252],
  ['Ringwood North', -37.7999, 145.2269], ['Rippleside', -38.1236, 144.3563], ['Ripponlea', -37.8785, 144.9956],
  ['Robinson', -37.7935, 144.8605], ['Rochford', -37.3167, 144.6833], ['Rockbank', -37.7305, 144.6529],
  ['Romsey', -37.3506, 144.7428], ['Rosanna', -37.741, 145.0684], ['Rowsley', -37.7216, 144.3761],
  ['Rowville', -37.921, 145.2425], ['Roxburgh Park', -37.627, 144.929], ['Russells Bridge', -38.0241, 144.1909],
  ['Rythdale', -38.15, 145.456], ['Safety Beach', -38.322, 144.986], ['Sailors Falls', -37.3912, 144.1205],
  ['Sailors Hill', -37.3585, 144.1257], ['Saint Helena', -37.686, 145.137], ['Sandhurst', -38.081, 145.207],
  ['Sandown Village', -37.9348, 145.169], ['Sandringham', -37.9534, 145.0135], ['Sassafras', -37.8646, 145.3531],
  ['Sassafras Gully', -37.8622, 145.3539], ['Scoresby', -37.9043, 145.2204], ['Seabrook', -37.876, 144.758],
  ['Seaford', -38.1022, 145.1431], ['Seaholme', -37.868, 144.841], ['Seddon', -37.8056, 144.891],
  ['Seddon West', -37.8054, 144.8919], ['Selby', -37.914, 145.369], ['Seville', -37.777, 145.461],
  ['Seville East', -37.774, 145.491], ['She Oaks', -37.9167, 144.1333], ['Sherbrooke', -37.8964, 145.3641],
  ['Silvan', -37.8343, 145.4305], ['Skye', -38.119, 145.2], ['Smiths Gully', -37.6267, 145.2867],
  ['Somerton', -37.6333, 144.9447], ['Somerville', -38.226, 145.177], ['Sorrento', -38.3478, 144.7467],
  ['South Geelong', -38.1674, 144.3658], ['South Kingsville', -37.8301, 144.8704],
  ['South Melbourne', -37.8339, 144.9639], ['South Morang', -37.6377, 145.0824], ['South Yarra', -37.8386, 144.9915],
  ['Southbank', -37.829, 144.957], ['Spargo Creek', -37.4775, 144.153], ['Spotswood', -37.8292, 144.8814],
  ['Springfield', -37.323, 144.8181], ['Springvale', -37.9473, 145.1541], ['Springvale South', -37.971, 145.1485],
  ['St Albans Park', -38.1954, 144.3932], ['St Helena', -37.686, 145.137], ['St Kilda East', -37.8626, 145.0007],
  ['St Kilda South', -37.8679, 144.978], ['St Kilda West', -37.8604, 144.9732], ['St Leonards', -38.1667, 144.7167],
  ['Staughton Vale', -37.8397, 144.2818], ['Steels Creek', -37.594, 145.374], ['Steiglitz', -37.8945, 144.1862],
  ['Stonehaven', -38.1288, 144.25], ['Stradbroke Park', -37.8007, 145.062], ['Strathewen', -37.55, 145.2667],
  ['Strathmore', -37.7358, 144.9191], ['Strathmore Heights', -37.713, 144.897], ['Strathtulloh', -37.7408, 144.596],
  ['Studfield', -37.8602, 145.24], ['Sumner', -37.7722, 144.98], ['Sunshine', -37.7837, 144.8376],
  ['Sunshine North', -37.7645, 144.8312], ['Sunshine West', -37.7947, 144.8188],
  ['Surrey Hills', -37.8259, 145.0972], ['Surrey Hills North', -37.8259, 145.0972],
  ['Surrey Hills South', -37.8259, 145.0972], ['Sutherlands Creek', -38.033, 144.2187],
  ['Swan Bay', -38.2258, 144.6439], ['Swan Island', -38.2493, 144.6802], ['Sydenham', -37.702, 144.767],
  ['Sylvester', -37.7376, 145.017], ['Syndal', -37.8767, 145.1495], ['Tarrawarra', -37.647, 145.4364],
  ['Taylors Hill', -37.715, 144.751], ['Taylors Lakes', -37.6973, 144.7812], ['Tecoma', -37.906, 145.344],
  ['Templestowe', -37.7538, 145.1486], ['Templestowe Lower', -37.7641, 145.11], ['The Basin', -37.8535, 145.3199],
  ['The Patch', -37.8888, 145.3973], ['The Pines', -37.7623, 145.1686], ['Thomastown', -37.6838, 145.0108],
  ['Thomson', -38.17, 144.381], ['Thornbury', -37.76, 145.008], ['Thornhill Park', -37.7457, 144.624],
  ['Three Bridges', -37.8333, 145.6833], ['Toolangi', -37.5333, 145.4667], ['Toolern Vale', -37.6081, 144.5931],
  ['Tooradin', -38.2111, 145.38], ['Toorak', -37.8432, 145.019], ['Tooronga', -37.8577, 145.0549],
  ['Torquay', -38.3333, 144.3167], ['Tottenham', -37.806, 144.857], ['Travancore', -37.778, 144.935],
  ['Tremont', -37.8783, 145.3171], ['Trentham', -37.3833, 144.3167], ['Trentham East', -37.4052, 144.4014],
  ['Tuerong', -38.3, 145.105], ['Tullamarine', -37.6995, 144.8803], ['Tyabb', -38.2651, 145.1707],
  ['Tylden', -37.3194, 144.4052], ['Tylden South', -37.3522, 144.3768], ['Tynong', -38.0833, 145.6167],
  ['Tynong North', -38.0346, 145.6294], ['Upper Ferntree Gully', -37.895, 145.31],
  ['Upper Plenty', -37.4238, 145.0604], ['Upwey', -37.904, 145.3309], ['Vermont', -37.838, 145.198],
  ['Vermont South', -37.8566, 145.1834], ['Vervale', -38.1333, 145.6667], ['Victoria Gardens', -37.8132, 145.012],
  ['Viewbank', -37.731, 145.1], ['Wallan', -37.4067, 144.9798], ['Wallan East', -37.4173, 145.0071],
  ['Wallington', -38.2247, 144.5109], ['Wandana Heights', -38.1769, 144.3003], ['Wandin East', -37.811, 145.453],
  ['Wandin North', -37.769, 145.411], ['Wandong', -37.336, 145.04], ['Wantirna', -37.848, 145.2289],
  ['Wantirna South', -37.877, 145.233], ['Warburton', -37.7525, 145.6948], ['Warneet', -38.224, 145.309],
  ['Warrandyte', -37.738, 145.223], ['Warrandyte South', -37.7605, 145.2453], ['Warranwood', -37.777, 145.249],
  ['Waterford Park', -37.3007, 145.0666], ['Watergardens', -37.6991, 144.7768], ['Waterways', -38.0148, 145.1305],
  ['Watsonia', -37.708, 145.083], ['Watsonia North', -37.7, 145.081], ['Watsons Creek', -37.67, 145.258],
  ['Wattle Glen', -37.6684, 145.1873], ['Wattle Park', -37.8384, 145.1056], ['Waurn Ponds', -38.2088, 144.2709],
  ['Waverley Gardens', -37.9368, 145.1916], ['Weir Views', -37.732, 144.576], ['Werribee South', -37.937, 144.697],
  ['Wesburn', -37.767, 145.647], ['West Footscray', -37.8007, 144.8717], ['West Melbourne', -37.8115, 144.9254],
  ['Westmeadows', -37.6779, 144.8843], ['Wheatsheaf', -37.3274, 144.2218], ['Wheelers Hill', -37.9068, 145.189],
  ['Whittington', -38.18, 144.39], ['Whittlesea', -37.5139, 145.1139], ['Wildwood', -37.5718, 144.7935],
  ['Williams Landing', -37.8615, 144.744], ['Williams Raaf', -37.9232, 144.749], ['Williamstown', -37.861, 144.885],
  ['Williamstown North', -37.8518, 144.869], ['Windsor', -37.854, 144.988], ['Winter Valley', -37.4713, 144.785],
  ['Wishart', -37.9351, 145.0495], ['Wollert', -37.5892, 144.9942], ['Wonga Park', -37.7347, 145.2591],
  ['Woodend', -37.3613, 144.5244], ['Woodend North', -37.3259, 144.5382], ['Woodstock', -37.5365, 145.0604],
  ['Woori Yallock', -37.778, 145.528], ['Wyndham Vale', -37.89, 144.63], ['Yallambie', -37.726, 145.104],
  ['Yan Yean', -37.5475, 145.1486], ['Yannathan', -38.2333, 145.6333], ['Yarra Glen', -37.6489, 145.3719],
  ['Yarra Junction', -37.779, 145.606], ['Yarrambat', -37.6404, 145.1321], ['Yarraville', -37.8198, 144.8814],
  ['Yarraville West', -37.8148, 144.8852], ['Yellingbo', -37.81, 145.51], ['Yering', -37.7002, 145.3583],
  ['Yuroke', -37.6, 144.88],
  // The 24 towns that have dark labels on the overview
  ['Berwick', -38.0309, 145.3437], ['Brighton', -37.9044, 144.9997], ['Bundoora', -37.6987, 145.0549],
  ['Craigieburn', -37.594, 144.934], ['Cranbourne', -38.105, 145.279], ['Dandenong', -37.9848, 145.214],
  ['Epping', -37.6341, 145.0163], ['Frankston', -38.1466, 145.1357], ['Geelong', -38.1499, 144.3617],
  ['Gisborne', -37.49, 144.5889], ['Glen Waverley', -37.8744, 145.1668], ['Highton', -38.171, 144.318],
  ['Lara', -38.0229, 144.3964], ['Lilydale', -37.7644, 145.3475], ['Macedon', -37.4206, 144.5547],
  ['Melton', -37.677, 144.612], ['Reservoir', -37.7119, 145.0108], ['Ringwood', -37.8106, 145.2307],
  ['St Albans', -37.7442, 144.8], ['St Kilda', -37.864, 144.982], ['Sunbury', -37.5811, 144.7139],
  ['Tarneit', -37.8092, 144.6672], ['Truganina', -37.8283, 144.7083], ['Werribee', -37.8998, 144.6641],
]

// From this zoom level all suburb names are shown instead of the dark town labels and the
// surrounding-place names. The green service area stays; the inner Melbourne shading is hidden.
const DETAIL_ZOOM = 12

const MELBOURNE = [-37.8136, 144.9631]
const AREA_BOUNDS = L.latLngBounds(SERVICE_BOUNDARY)
const FIT_OPTIONS = { padding: [16, 16] }

const RED = '#e3262f'
const BLUE = '#01aee4' // brand sky blue, used for the checked post code pin

// Free satellite imagery from Esri (no place names - those are drawn by this component).
// The attribution must stay visible.
const SATELLITE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ATTRIBUTION = 'Imagery &copy; Esri, Maxar, Earthstar Geographics'

const placeIcon = (name) =>
  L.divIcon({ className: 'qr-place', html: `<span>${name}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] })

const pinIcon = (label, colour = RED) =>
  L.divIcon({
    className: 'qr-pin',
    html: `<svg width="34" height="44" viewBox="-2 -2 34 44" aria-hidden="true" style="overflow:visible"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="${colour}" stroke="#fff" stroke-width="2"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>${
      label ? `<span class="qr-pin-label" style="background:${colour}">${label}</span>` : ''
    }`,
    iconSize: [34, 44],
    iconAnchor: [17, 42],
  })

// Styles for the map labels (Leaflet renders these outside React, so plain CSS is needed)
const MAP_STYLES = `
  .qr-map .leaflet-tooltip.qr-town { background: rgba(11, 26, 46, 0.82); border: 0; border-radius: 4px; box-shadow: none;
    color: #fff; font: 600 11px/1.3 "Plus Jakarta Sans", sans-serif; padding: 1px 6px; }
  .qr-map .leaflet-tooltip.qr-town::before { display: none; }
  .qr-map .qr-pin { background: none; border: 0; }
  .qr-map .qr-place { background: none; border: 0; }
  .qr-map .qr-place span { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; color: #f1f5f9;
    font: 500 11px/1 "Plus Jakarta Sans", sans-serif; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9); pointer-events: none; }
  .qr-map .qr-pin-label { position: absolute; left: 50%; top: 46px; transform: translateX(-50%); white-space: nowrap;
    background: ${RED}; color: #fff; border: 1px solid #fff; border-radius: 4px; padding: 2px 7px;
    font: 700 12px/1.3 "Plus Jakarta Sans", sans-serif; }
  .qr-map .leaflet-control-zoom a { color: #0b1a2e; }
  .qr-map .leaflet-control-attribution { font-size: 9px; }
`

// Moves the map to the checked post code, and back to the full area when it is cleared
function FlyTo({ target }) {
  const map = useMap()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      if (!target) return
    }
    if (target) map.flyTo(target, 12, { duration: 1.2 })
    else map.flyToBounds(AREA_BOUNDS, { ...FIT_OPTIONS, duration: 1.2 })
  }, [map, target])
  return null
}

// Keeps track of the zoom level and visible area so the right labels are shown
function ViewWatcher({ onChange }) {
  const map = useMapEvents({ moveend: () => onChange({ zoom: map.getZoom(), bounds: map.getBounds() }) })
  useEffect(() => onChange({ zoom: map.getZoom(), bounds: map.getBounds() }), [map, onChange])
  return null
}

function ServiceMap({ checked }) {
  const [view, setView] = useState({ zoom: 0, bounds: null })
  const detailed = view.zoom >= DETAIL_ZOOM
  // Only draw the suburb names that are on screen
  const visibleSuburbs =
    detailed && view.bounds ? SUBURBS.filter(([, lat, lng]) => view.bounds.pad(0.1).contains([lat, lng])) : []

  return (
    <div className="qr-map isolate h-[380px] overflow-hidden rounded-2xl sm:h-[460px] lg:h-[560px]">
      <style>{MAP_STYLES}</style>
      <MapContainer
        attributionControl
        bounds={AREA_BOUNDS}
        boundsOptions={FIT_OPTIONS}
        className="h-full w-full"
        scrollWheelZoom={false}
        zoomControl={false}
        zoomSnap={0.25}
      >
        <TileLayer attribution={ATTRIBUTION} url={SATELLITE_URL} />
        <ZoomTopRight />
        <ViewWatcher onChange={setView} />

        <Polygon
          pathOptions={{ color: RED, weight: 3, fillColor: '#4ade80', fillOpacity: 0.35 }}
          positions={SERVICE_BOUNDARY}
        />
        {!detailed && (
          <Polygon
            pathOptions={{ color: '#fff', weight: 1.5, dashArray: '3 4', fillColor: RED, fillOpacity: 0.45 }}
            positions={INNER_MELBOURNE}
          />
        )}

        {!detailed &&
          PLACES.map(([name, lat, lng]) => (
            <Marker icon={placeIcon(name)} interactive={false} key={name} keyboard={false} position={[lat, lng]} />
          ))}

        {visibleSuburbs.map(([name, lat, lng]) => (
          <Marker icon={placeIcon(name)} interactive={false} key={name} keyboard={false} position={[lat, lng]} />
        ))}

        {!detailed &&
          TOWNS.map(([name, lat, lng, side]) => (
            <CircleMarker
              center={[lat, lng]}
              key={name}
              pathOptions={{ color: '#fff', weight: 2, fillColor: RED, fillOpacity: 1 }}
              radius={5}
            >
              <Tooltip className="qr-town" direction={side} offset={LABEL_OFFSET[side]} permanent>
                {name}
              </Tooltip>
            </CircleMarker>
          ))}

        <Marker icon={pinIcon('Melbourne')} position={MELBOURNE} zIndexOffset={1000} />
        {checked && <Marker icon={pinIcon(checked.postcode, BLUE)} position={checked.position} zIndexOffset={2000} />}

        <FlyTo target={checked ? checked.position : null} />
      </MapContainer>
    </div>
  )
}

// Zoom buttons in the top-right corner, as in the design
function ZoomTopRight() {
  const map = useMap()
  useEffect(() => {
    const control = L.control.zoom({ position: 'topright' })
    control.addTo(map)
    return () => control.remove()
  }, [map])
  return null
}

export default function ServiceLocator() {
  const [postcode, setPostcode] = useState('')
  const [result, setResult] = useState(null) // null | { status: 'yes' | 'no' | 'invalid', postcode, suburbs }

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = postcode.trim()
    if (!/^\d{4}$/.test(value)) {
      setResult({ status: 'invalid' })
      return
    }
    const match = SERVICE_POSTCODES[value]
    setResult(
      match
        ? { status: 'yes', postcode: value, suburbs: match[0], position: [match[1], match[2]] }
        : { status: 'no', postcode: value },
    )
  }

  const checked = result && result.status === 'yes' ? result : null

  return (
    <section aria-labelledby="locator-heading" className="bg-brand-mist py-16 lg:py-11" id="service-area">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 rounded-3xl border border-brand-line bg-white p-4 sm:p-6 lg:order-1">
          <h3 className="sr-only">
            Map of the Quick Replace service area, from Macedon to Frankston and Geelong to Lilydale
          </h3>
          <ServiceMap checked={checked} />
        </div>

        <div className="order-1 lg:order-2">
          <SectionBadge>Service Locator</SectionBadge>
          <h2
            className="mt-14 text-4xl font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]"
            id="locator-heading"
          >
            Do we serve your <br />
            <Accent>Area</Accent>?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
            Enter your post code to instantly check if you&rsquo;re in our coverage zone. We&rsquo;re expanding regularly
            - if you&rsquo;re close, reach out anyway.
          </p>

          <form className="mt-14" noValidate onSubmit={handleSubmit}>
            <label className="text-xl font-semibold tracking-tight text-brand-ink" htmlFor="postcode">
              Find out your service area
            </label>
            <div className="mt-5 flex items-center gap-3">
              <input
                aria-describedby="postcode-result"
                autoComplete="postal-code"
                className="h-14 min-w-0 flex-1 rounded-xl border border-brand-line bg-white px-5 text-base text-brand-ink placeholder:text-brand-muted focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/30"
                id="postcode"
                inputMode="numeric"
                maxLength={4}
                onChange={(e) => {
                  setPostcode(e.target.value.replace(/\D/g, ''))
                  setResult(null)
                }}
                placeholder="Enter post code (e.g. 3032)"
                type="text"
                value={postcode}
              />
              <button
                aria-label="Check post code"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-sky"
                type="submit"
              >
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div aria-live="polite" className="mt-4 min-h-[48px] text-[15px]" id="postcode-result">
              {result && result.status === 'yes' && (
                <p className="flex items-start gap-2 text-emerald-700">
                  <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Good news - we cover {result.postcode} ({result.suburbs}). Call us on{' '}
                    <a className="font-semibold underline" href={contact.phoneHref}>
                      {contact.phone}
                    </a>{' '}
                    to book.
                  </span>
                </p>
              )}
              {result && result.status === 'no' && (
                <p className="flex items-start gap-2 text-brand-ink">
                  <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  {result.postcode} is outside our usual area, but get in touch - we may still be able to help.
                </p>
              )}
              {result && result.status === 'invalid' && (
                <p className="flex items-start gap-2 text-red-600">
                  <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  Please enter a 4-digit Australian post code.
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}
