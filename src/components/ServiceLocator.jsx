import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Polygon, TileLayer, useMap } from 'react-leaflet'
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

const MELBOURNE = [-37.8136, 144.9631]
const AREA_BOUNDS = L.latLngBounds(SERVICE_BOUNDARY)
const FIT_OPTIONS = { padding: [16, 16] }

const RED = '#e3262f'
const BLUE = '#01aee4' // brand sky blue, used for the checked post code pin

// Free satellite imagery from Esri.
// The attribution must stay visible.
const SATELLITE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const ATTRIBUTION = 'Imagery &copy; Esri, Maxar, Earthstar Geographics'

const pinIcon = (label, colour = RED) =>
  L.divIcon({
    className: 'qr-pin',
    html: `<svg width="34" height="44" viewBox="-2 -2 34 44" aria-hidden="true" style="overflow:visible"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="${colour}" stroke="#fff" stroke-width="2"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>${
      label ? `<span class="qr-pin-label" style="background:${colour}">${label}</span>` : ''
    }`,
    iconSize: [34, 44],
    iconAnchor: [17, 42],
  })

// Styles for the map pins (Leaflet renders these outside React, so plain CSS is needed)
const MAP_STYLES = `
  .qr-map .qr-pin { background: none; border: 0; }
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

function ServiceMap({ checked }) {
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

        <Polygon
          pathOptions={{ color: RED, weight: 3, fillColor: '#4ade80', fillOpacity: 0.35 }}
          positions={SERVICE_BOUNDARY}
        />
        <Polygon
          pathOptions={{ color: '#fff', weight: 1.5, dashArray: '3 4', fillColor: RED, fillOpacity: 0.45 }}
          positions={INNER_MELBOURNE}
        />

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
