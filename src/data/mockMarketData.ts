import type {
  LocationNode,
  NewsArticle,
  RidePlatform,
  RideQuote,
  RouteSummary,
  SavedRoute,
  SearchQuery,
  TrafficTip,
} from '../types/ride';

import airportImg from '../assets/images/news_airport_pickup_1794623312396.jpg';
import expresswayImg from '../assets/images/news_cbd_expressway_1794623312527.jpg';
import electricImg from '../assets/images/news_electric_fleet_1794623316251.jpg';
import heroTransitImg from '../assets/images/hero_singapore_transit_1794623311798.jpg';

export const HERO_IMAGE = heroTransitImg;

export const PLATFORM_META: Record<
  RidePlatform,
  {
    name: string;
    fullName: string;
    accentHex: string;
    softBgClass: string;
    textClass: string;
    tagline: string;
  }
> = {
  zig: {
    name: 'Zig',
    fullName: 'Zig by ComfortDelGro',
    accentHex: '#0052CC',
    softBgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    tagline: 'Unified ComfortDelGro taxi & private-hire fleet',
  },
  gojek: {
    name: 'Gojek',
    fullName: 'Gojek Singapore',
    accentHex: '#00880D',
    softBgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    tagline: 'Fast driver dispatch & upfront fixed fares',
  },
  tada: {
    name: 'Tada',
    fullName: 'Tada Mobility',
    accentHex: '#0284C7',
    softBgClass: 'bg-sky-50',
    textClass: 'text-sky-700',
    tagline: 'Zero-commission driver network with lower peak spreads',
  },
  ryde: {
    name: 'Ryde',
    fullName: 'Ryde Technologies',
    accentHex: '#B45309',
    softBgClass: 'bg-amber-50',
    textClass: 'text-amber-800',
    tagline: 'Social carpool, RydePET & RydeCoins cashback',
  },
};

export const POPULAR_LOCATIONS: LocationNode[] = [
  {
    id: 'orchard-ion',
    name: 'ION Orchard (Drop-off Bay)',
    district: 'Orchard · Central',
    pickupBayTip: 'Use Basement 2 Paterson Hill Taxi Stand to skip Orchard Turn queue.',
    lat: 1.304,
    lng: 103.8318,
  },
  {
    id: 'changi-t3',
    name: 'Changi Airport Terminal 3',
    district: 'Changi · East',
    pickupBayTip: 'Follow signs to Arrival Hall Door 4 Private Hire Bay (Basement).',
    lat: 1.3562,
    lng: 103.9869,
    isAirport: true,
  },
  {
    id: 'mbs-hotel',
    name: 'Marina Bay Sands Tower 1',
    district: 'Marina Bay · CBD',
    pickupBayTip: 'Tower 1 Driveway picks up 4 mins faster than Shoppes Coach Bay.',
    lat: 1.2834,
    lng: 103.8607,
  },
  {
    id: 'raffles-place',
    name: 'One Raffles Place',
    district: 'Raffles Place · CBD',
    pickupBayTip: 'Meet at Chulia Street side lane after 5:30 PM to bypass Collyer Quay tailback.',
    lat: 1.2844,
    lng: 103.8513,
  },
  {
    id: 'one-north',
    name: 'One-North Fusionopolis',
    district: 'Buona Vista · West',
    pickupBayTip: 'Connexis South Porch is fastest for AYE-bound Gojek & Tada drivers.',
    lat: 1.2994,
    lng: 103.7875,
  },
  {
    id: 'jurong-jem',
    name: 'Jurong East JEM / Westgate',
    district: 'Jurong · West',
    pickupBayTip: 'Use Gateway Drive Lay-by outside Westgate Tower for zero wait.',
    lat: 1.3332,
    lng: 103.7436,
  },
  {
    id: 'tampines-hub',
    name: 'Our Tampines Hub',
    district: 'Tampines · East',
    pickupBayTip: 'Tampines Ave 4 Gate 2 lay-by avoids mall basement traffic.',
    lat: 1.3529,
    lng: 103.9403,
  },
  {
    id: 'woodlands-ciq',
    name: 'Woodlands Checkpoint (Train Shuttle)',
    district: 'Woodlands · North',
    pickupBayTip: 'Drop at Marsiling MRT and walk 6 mins during Causeway evening jam.',
    lat: 1.4469,
    lng: 103.7695,
  },
];

export const INITIAL_SAVED_ROUTES: SavedRoute[] = [
  {
    id: 'sr-1',
    label: 'Shopping Belt → Airport',
    pickup: 'ION Orchard (Drop-off Bay)',
    dropoff: 'Changi Airport Terminal 3',
    mode: 'airport',
    bestPlatform: 'Tada',
    typicalFare: 24.4,
  },
  {
    id: 'sr-2',
    label: 'CBD Commute',
    pickup: 'One-North Fusionopolis',
    dropoff: 'One Raffles Place',
    mode: 'standard',
    bestPlatform: 'Zig',
    typicalFare: 15.8,
  },
  {
    id: 'sr-3',
    label: 'East Coast Express',
    pickup: 'Marina Bay Sands Tower 1',
    dropoff: 'Our Tampines Hub',
    mode: 'standard',
    bestPlatform: 'Gojek',
    typicalFare: 19.2,
  },
];

export const INITIAL_TRAFFIC_TIPS: TrafficTip[] = [
  {
    id: 'tip-1',
    corridor: 'CTE & Central',
    headline: 'CTE Southbound heavy before Braddell Flyover; right-lane resurfacing clearing',
    severity: 'Heavy Delay',
    detail:
      'Evening queue currently stretches 2.4 km back to Ang Mo Kio Ave 3. Metered taxis on Zig and Tada dynamic routing via Upper Serangoon Road are beating CTE expressway times by 9 minutes.',
    actionableShortcut: 'Set pickup along Bishan St 11 or route via Upper Serangoon to skip Braddell bottleneck and $2.00 ERP.',
    timeSavedMins: 9,
    reportedBy: 'Marcus Tan · Verified Commuter',
    reportedAgo: '11 mins ago',
    upvotes: 48,
    suggestedPickup: 'ION Orchard (Drop-off Bay)',
    suggestedDropoff: 'Our Tampines Hub',
  },
  {
    id: 'tip-2',
    corridor: 'Airport & Causeway',
    headline: 'Changi T1 & T3 evening wave peaking 19:00–20:30; Basement bays clear',
    severity: 'Moderate',
    detail:
      'Three wide-body arrivals at Terminal 3 have pushed curbside taxi queues to 14 minutes. Private-hire bays in Basement 2 (Doors 3–5) have immediate driver staging with no airport surcharge spike on Tada.',
    actionableShortcut: 'Book PHV to T3 Basement Door 4 instead of Departure Level curbside.',
    timeSavedMins: 12,
    reportedBy: 'Priya Nair · Frequent Flyer',
    reportedAgo: '24 mins ago',
    upvotes: 63,
    suggestedPickup: 'Changi Airport Terminal 3',
    suggestedDropoff: 'Marina Bay Sands Tower 1',
  },
  {
    id: 'tip-3',
    corridor: 'CBD & Marina',
    headline: 'Marina Coastal Expressway (MCE) flowing smoothly after ERP window',
    severity: 'Smooth Flow',
    detail:
      'Traffic across Sheares Bridge and MCE westbound has cleared ahead of schedule. Gojek GoCar and RydeX drivers staged around Bayfront are accepting sub-3-minute pickups.',
    actionableShortcut: 'Pin Marina Bay Sands Tower 1 Driveway rather than Shoppes Coach Bay.',
    timeSavedMins: 5,
    reportedBy: 'Kenneth Lim · CBD Rider',
    reportedAgo: '32 mins ago',
    upvotes: 29,
    suggestedPickup: 'Marina Bay Sands Tower 1',
    suggestedDropoff: 'One Raffles Place',
  },
  {
    id: 'tip-4',
    corridor: 'AYE & West',
    headline: 'AYE towards Tuas slowing near Clementi Ave 6 exit; West Coast Hwy open',
    severity: 'Moderate',
    detail:
      'Minor lane closure after Buona Vista flyover is adding 6–8 minutes on AYE. Drivers taking West Coast Highway report steady 60 km/h speeds to Jurong East.',
    actionableShortcut: 'Select Connexis South Porch at One-North for faster West Coast Highway turnoff.',
    timeSavedMins: 7,
    reportedBy: 'Hui Min · One-North Commuter',
    reportedAgo: '45 mins ago',
    upvotes: 34,
    suggestedPickup: 'One-North Fusionopolis',
    suggestedDropoff: 'Jurong East JEM / Westgate',
  },
  {
    id: 'tip-5',
    corridor: 'PIE & East',
    headline: 'PIE Eastbound clear past Paya Lebar; Tampines Ave 10 slip road brisk',
    severity: 'Smooth Flow',
    detail:
      'Zero incidents reported between Kallang Way and Simei exit. RydePOOL matches along the eastern corridor are pricing 22% under solo private-hire fares tonight.',
    actionableShortcut: 'Use Tampines Ave 4 Gate 2 lay-by for quickest boarding.',
    timeSavedMins: 4,
    reportedBy: 'Farhan Aziz · East Rider',
    reportedAgo: '1 hr ago',
    upvotes: 19,
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    topic: 'Platform Updates',
    title: 'Zig and Tada Expand Unified Airport Bay Dispatch Across Terminals 1–4',
    summary:
      'Passengers arriving at Changi now get automated bay-number matching and reduced waiting times when comparing Zig metered taxis against Tada fixed-fare cars.',
    readTime: '3 min read',
    publishedAgo: '18 mins ago',
    source: 'Crossway Mobility Desk',
    imageUrl: airportImg,
    imageAlt: 'International airport terminal curbside pickup zone with sedans waiting under canopy lighting',
    relatedPlatform: 'tada',
    keyTakeaways: [
      'Terminal 3 Basement Door 4 & 5 now auto-sync with Zig and Tada pickup pins.',
      'Zero-commission structure keeps Tada fares roughly 8–12% lower during post-midnight arrival waves.',
      'Zig ComfortRide flat-fare quotes now lock ERP tolls upfront for CBD-bound travellers.',
    ],
    bodyParagraphs: [
      'Travellers landing at Changi Airport during peak evening arrival windows have historically faced a trade-off between long taxi stand queues and fluctuating private-hire surge pricing. A coordinated bay-matching upgrade across Terminals 1 through 4 now directs Crossway users straight to the fastest-moving Basement Arrival bays.',
      'By combining ComfortDelGro taxi staging data from Zig with Tada’s zero-commission driver pool, average curb wait times dropped from 11 minutes to under 4 minutes in this week’s commuter audit.',
      'For groups carrying check-in luggage, comparing 6-Seater MPV quotes before clearing customs remains essential: Gojek GoCar XL and Zig 6-Seater frequently trade the lowest fare depending on whether a flight lands before or after 22:00.',
    ],
  },
  {
    id: 'news-2',
    topic: 'ERP & Road Policy',
    title: 'ERP 2.0 Smart Corridor Adjustments: 5 Peak Gantries That Change Your Fare Split',
    summary:
      'How updated evening gantry windows on CTE and ECP affect upfront fixed fares versus metered ComfortDelGro rides during 18:00–19:30 rush hour.',
    readTime: '4 min read',
    publishedAgo: '1 hr ago',
    source: 'Metro Traffic Briefing',
    imageUrl: expresswayImg,
    imageAlt: 'Urban expressway corridor framed by lush greenery and modern skyline towers',
    relatedPlatform: 'zig',
    keyTakeaways: [
      'Booking at 18:58 vs 19:02 can shift CTE route tolls by $2.00 on metered Zig rides.',
      'Gojek and Tada lock estimated gantry fees at booking time when fixed-fare is selected.',
      'Alternative arterial routes via Bukit Timah and Upper Serangoon remain toll-free after 19:00.',
    ],
    bodyParagraphs: [
      'Understanding how each ride-hailing platform passes Electronic Road Pricing (ERP) charges to passengers can save daily CBD commuters over $40 a month. While metered taxis bill exact gantry crossings as passed, app-based private-hire tiers differ in how detour tolls are calculated.',
      'When highway congestion triggers an automatic re-route onto a parallel expressway, Crossway highlights whether a quote is strictly Fixed Toll Inclusive or Metered Pass-Through so riders aren’t surprised at drop-off.',
      'Our live traffic insider community notes that departing Marina Bay or Orchard just five minutes after the 19:00 step-down routinely cuts both surge multipliers and gantry charges simultaneously.',
    ],
  },
  {
    id: 'news-3',
    topic: 'Fare & Promo Alerts',
    title: 'EV Fleet Expansion & RydePET / Gojek Green: Where Lower Operating Costs Go Next',
    summary:
      'Electric sedans now account for over 38% of weekday CBD dispatches across Gojek, Tada, and Ryde—bringing quieter cabins and targeted commuter rebates.',
    readTime: '3 min read',
    publishedAgo: '3 hrs ago',
    source: 'Fleet & Policy Watch',
    imageUrl: electricImg,
    imageAlt: 'Modern dark electric sedan driving down a clean tree-lined city avenue',
    relatedPlatform: 'gojek',
    keyTakeaways: [
      'Gojek and Zig EV Comfort fleets offer quieter rides with zero extra fare premium on standard tiers.',
      'RydeCoins cashback now stacks on RydeX and RydePET bookings during off-peak hours (10:00–16:00).',
      'Tada EV drivers retain 100% of fare revenue, keeping driver acceptance rates high in rainy weather.',
    ],
    bodyParagraphs: [
      'Over the past quarter, major ride-hailing operators have accelerated electric vehicle onboarding across Singapore’s central business district and suburban heartlands. For passengers, the shift means noticeably smoother cabin comfort and higher driver availability during sudden afternoon downpours.',
      'Because EV drivers experience lower per-kilometer energy costs, platforms like Tada and Ryde have seen faster acceptance rates on short cross-town hops under 6 km—trips that previously suffered high cancellation rates during rush hour.',
      'Use Crossway’s filter bar to compare both standard 4-seater fares and specialized options like RydePET or 6-Seater MPVs side by side before dispatching.',
    ],
  },
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 10000;
  }
  return hash;
}

function findNode(name: string): LocationNode | undefined {
  const lower = name.trim().toLowerCase();
  return POPULAR_LOCATIONS.find(
    (loc) => loc.name.toLowerCase() === lower || loc.name.toLowerCase().includes(lower)
  );
}

function calculateDistanceKm(pickup: string, dropoff: string): number {
  const a = findNode(pickup);
  const b = findNode(dropoff);
  if (a && b) {
    if (a.id === b.id) return 4.2;
    const dLat = (a.lat - b.lat) * 111;
    const dLng = (a.lng - b.lng) * 111;
    const straight = Math.sqrt(dLat * dLat + dLng * dLng);
    return Math.max(3.5, Math.round(straight * 1.28 * 10) / 10);
  }
  const h = hashString(`${pickup}->${dropoff}`);
  return Math.round((5.2 + (h % 185) / 10) * 10) / 10;
}

export function generateRouteAndQuotes(query: SearchQuery): {
  summary: RouteSummary;
  quotes: RideQuote[];
} {
  const distanceKm =
    query.mode === 'hourly' ? (query.hourlyDuration ?? 3) * 18 : calculateDistanceKm(query.pickup, query.dropoff);

  const pickupNode = findNode(query.pickup);
  const dropoffNode = findNode(query.dropoff);
  const isAirportTrip =
    query.mode === 'airport' || Boolean(pickupNode?.isAirport || dropoffNode?.isAirport);

  const isPeak = query.whenType === 'now' || query.scheduledTime.startsWith('08') || query.scheduledTime.startsWith('18');
  const seed = hashString(`${query.pickup}|${query.dropoff}|${query.mode}|${query.passengerOption}`);

  const trafficDelayMins = isPeak ? 4 + (seed % 7) : 1 + (seed % 3);
  const baseDurationMins = Math.max(10, Math.round(distanceKm * 1.65 + 4));
  const erpTotal = isPeak && distanceKm > 6 ? 2.0 : distanceKm > 10 ? 1.0 : 0;

  let corridorName = 'Central Arterial & CTE';
  let corridorStatus: RouteSummary['corridorStatus'] = isPeak ? 'Moderate' : 'Smooth Flow';
  if (isAirportTrip) {
    corridorName = 'ECP / PIE Airport Corridor';
    corridorStatus = isPeak ? 'Moderate' : 'Smooth Flow';
  } else if (query.pickup.toLowerCase().includes('one-north') || query.dropoff.toLowerCase().includes('jurong')) {
    corridorName = 'AYE / West Coast Highway';
    corridorStatus = 'Moderate';
  } else if (query.pickup.toLowerCase().includes('marina') || query.dropoff.toLowerCase().includes('raffles')) {
    corridorName = 'CBD & Marina Coastal';
    corridorStatus = isPeak ? 'Heavy Delay' : 'Smooth Flow';
  }

  const insiderNote =
    pickupNode?.pickupBayTip ??
    'Select a main road lay-by or hotel driveway pin to shave 3–4 mins off driver arrival.';

  const summary: RouteSummary = {
    distanceKm,
    baseDurationMins,
    trafficDelayMins,
    erpTotal,
    corridorName,
    corridorStatus,
    insiderNote,
  };

  const airportSurcharge = isAirportTrip ? 3.5 : 0;
  const baseDistanceCost = distanceKm * 1.08;
  const peakFactor = isPeak ? 1.18 : 1.0;

  const isSixSeater = query.passengerOption === '6-Seater MPV';
  const isPet = query.passengerOption === 'Pet-Friendly';
  const isAccessible = query.passengerOption === 'Wheelchair Accessible';

  if (query.mode === 'hourly') {
    const hours = query.hourlyDuration ?? 3;
    const quotes: RideQuote[] = [
      {
        id: 'q-zig-hourly',
        platform: 'zig',
        platformName: 'Zig',
        serviceName: `Zig Executive Charter (${hours}h)`,
        vehicleCategory: 'Hourly Charter',
        seats: isSixSeater ? 6 : 4,
        luggageCapacity: isSixSeater ? 4 : 2,
        priceMin: Math.round(hours * 46),
        pickupEtaMins: 6,
        tripDurationMins: hours * 60,
        surgeLabel: 'Flat Fare',
        isSurge: false,
        rating: 4.9,
        perkSummary: 'Unlimited stops within island + ComfortDelGro priority support',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: hours * 42,
          distanceFare: 0,
          erpAndTolls: erpTotal,
          peakOrSurcharge: hours * 4 - erpTotal,
          platformFeeOrDiscount: 0,
        },
      },
      {
        id: 'q-gojek-hourly',
        platform: 'gojek',
        platformName: 'Gojek',
        serviceName: `GoCar Hourly (${hours}h)`,
        vehicleCategory: 'Hourly Charter',
        seats: isSixSeater ? 6 : 4,
        luggageCapacity: isSixSeater ? 4 : 2,
        priceMin: Math.round(hours * 43.5),
        pickupEtaMins: 5,
        tripDurationMins: hours * 60,
        surgeLabel: 'Normal Demand',
        isSurge: false,
        rating: 4.8,
        perkSummary: 'Includes fuel & up to 25 km/hr islandwide itinerary',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: hours * 40,
          distanceFare: 0,
          erpAndTolls: erpTotal,
          peakOrSurcharge: hours * 3.5 - erpTotal,
          platformFeeOrDiscount: 0,
        },
      },
      {
        id: 'q-tada-hourly',
        platform: 'tada',
        platformName: 'Tada',
        serviceName: `Tada Flex Charter (${hours}h)`,
        vehicleCategory: 'Hourly Charter',
        seats: 4,
        luggageCapacity: 2,
        priceMin: Math.round(hours * 41.0),
        pickupEtaMins: 7,
        tripDurationMins: hours * 60,
        surgeLabel: 'Zero Commission',
        isSurge: false,
        rating: 4.85,
        perkSummary: 'Zero platform commission; lowest hourly base rate',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: hours * 41,
          distanceFare: 0,
          erpAndTolls: erpTotal,
          peakOrSurcharge: 0,
          platformFeeOrDiscount: -erpTotal,
        },
      },
      {
        id: 'q-ryde-hourly',
        platform: 'ryde',
        platformName: 'Ryde',
        serviceName: `RydeLUXE Charter (${hours}h)`,
        vehicleCategory: 'Hourly Charter',
        seats: 6,
        luggageCapacity: 4,
        priceMin: Math.round(hours * 49.0),
        pickupEtaMins: 8,
        tripDurationMins: hours * 60,
        surgeLabel: 'Flat Fare',
        isSurge: false,
        rating: 4.87,
        perkSummary: 'Earn 4% RydeCoins cashback + MPV cabin space',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: hours * 47,
          distanceFare: 0,
          erpAndTolls: erpTotal,
          peakOrSurcharge: hours * 2,
          platformFeeOrDiscount: -erpTotal,
        },
      },
    ];
    return { summary, quotes };
  }

  if (query.mode === 'carpool') {
    const basePool = Math.max(7.2, Math.round((4.2 + distanceKm * 0.68) * 10) / 10);
    const quotes: RideQuote[] = [
      {
        id: 'q-ryde-pool',
        platform: 'ryde',
        platformName: 'Ryde',
        serviceName: 'RydePOOL',
        vehicleCategory: 'Carpool',
        seats: 2,
        luggageCapacity: 1,
        priceMin: Math.round((basePool + erpTotal * 0.5) * 10) / 10,
        pickupEtaMins: 6 + (seed % 3),
        tripDurationMins: baseDurationMins + trafficDelayMins + 6,
        surgeLabel: 'Flat Fare',
        isSurge: false,
        rating: 4.78,
        perkSummary: 'Up to 35% cheaper than solo PHV · 1 co-rider match along corridor',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: 3.5,
          distanceFare: Math.round(distanceKm * 0.68 * 10) / 10,
          erpAndTolls: Math.round(erpTotal * 0.5 * 10) / 10,
          peakOrSurcharge: 0.7,
          platformFeeOrDiscount: 0,
        },
      },
      {
        id: 'q-tada-pool',
        platform: 'tada',
        platformName: 'Tada',
        serviceName: 'Tada Share',
        vehicleCategory: 'Carpool',
        seats: 2,
        luggageCapacity: 1,
        priceMin: Math.round((basePool + 0.9 + erpTotal * 0.5) * 10) / 10,
        pickupEtaMins: 5 + (seed % 4),
        tripDurationMins: baseDurationMins + trafficDelayMins + 5,
        surgeLabel: 'Zero Commission',
        isSurge: false,
        rating: 4.82,
        perkSummary: 'Zero-commission shared ride with single-stop cap',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: 3.8,
          distanceFare: Math.round(distanceKm * 0.72 * 10) / 10,
          erpAndTolls: Math.round(erpTotal * 0.5 * 10) / 10,
          peakOrSurcharge: 0.5,
          platformFeeOrDiscount: 0,
        },
      },
      {
        id: 'q-gojek-solo',
        platform: 'gojek',
        platformName: 'Gojek',
        serviceName: 'GoCar (Solo Backup)',
        vehicleCategory: '4-Seater',
        seats: 4,
        luggageCapacity: 2,
        priceMin: Math.round((5.2 + baseDistanceCost * peakFactor + erpTotal) * 10) / 10,
        pickupEtaMins: 3 + (seed % 3),
        tripDurationMins: baseDurationMins + trafficDelayMins,
        surgeLabel: isPeak ? '1.2x Peak' : 'Normal Demand',
        isSurge: isPeak,
        rating: 4.84,
        perkSummary: 'Direct point-to-point backup if carpool match takes >5 mins',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: 4.5,
          distanceFare: Math.round(baseDistanceCost * 10) / 10,
          erpAndTolls: erpTotal,
          peakOrSurcharge: isPeak ? 2.4 : 0.7,
          platformFeeOrDiscount: 0,
        },
      },
      {
        id: 'q-zig-solo',
        platform: 'zig',
        platformName: 'Zig',
        serviceName: 'Zig JustGo',
        vehicleCategory: '4-Seater',
        seats: 4,
        luggageCapacity: 3,
        priceMin: Math.round((5.4 + baseDistanceCost * 1.05 + erpTotal) * 10) / 10,
        pickupEtaMins: 4,
        tripDurationMins: baseDurationMins + trafficDelayMins,
        surgeLabel: 'Normal Demand',
        isSurge: false,
        rating: 4.88,
        perkSummary: 'Taxi + PHV hybrid pool; reliable late-evening availability',
        recommendedBay: insiderNote,
        breakdown: {
          baseFare: 4.6,
          distanceFare: Math.round(baseDistanceCost * 10) / 10,
          erpAndTolls: erpTotal,
          peakOrSurcharge: 0.8,
          platformFeeOrDiscount: 0,
        },
      },
    ];
    return { summary, quotes };
  }

  // Standard & Airport multi-platform comparison across Zig, Gojek, Tada, Ryde
  const tadaBase = Math.round((4.1 + baseDistanceCost * (isPeak ? 1.08 : 0.96) + airportSurcharge + erpTotal) * 10) / 10;
  const gojekBase = Math.round((4.6 + baseDistanceCost * peakFactor + airportSurcharge + erpTotal) * 10) / 10;
  const zigFlat = Math.round((4.9 + baseDistanceCost * 1.06 + airportSurcharge + erpTotal) * 10) / 10;
  const rydeBase = Math.round((4.3 + baseDistanceCost * (isPeak ? 1.12 : 0.98) + airportSurcharge + erpTotal) * 10) / 10;

  const mpvMultiplier = isSixSeater ? 1.38 : 1.0;
  const petAdd = isPet ? 4.5 : 0;

  const quotes: RideQuote[] = [
    {
      id: 'q-tada-any',
      platform: 'tada',
      platformName: 'Tada',
      serviceName: isSixSeater ? 'Tada 6-Seater' : 'Tada AnyCar',
      vehicleCategory: isSixSeater ? '6-Seater' : '4-Seater',
      seats: isSixSeater ? 6 : 4,
      luggageCapacity: isSixSeater ? 4 : 2,
      priceMin: Math.round((tadaBase * mpvMultiplier) * 10) / 10,
      pickupEtaMins: 4 + (seed % 3),
      tripDurationMins: baseDurationMins + trafficDelayMins,
      surgeLabel: 'Zero Commission',
      isSurge: false,
      rating: 4.86,
      perkSummary: 'Zero platform commission; consistently lowest peak-hour spread',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 3.9,
        distanceFare: Math.round(baseDistanceCost * 0.96 * mpvMultiplier * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + (isPeak ? 1.4 : 0),
        platformFeeOrDiscount: -0.6,
      },
    },
    {
      id: 'q-gojek-gocar',
      platform: 'gojek',
      platformName: 'Gojek',
      serviceName: isSixSeater ? 'GoCar XL (6-Seater)' : 'GoCar',
      vehicleCategory: isSixSeater ? '6-Seater' : '4-Seater',
      seats: isSixSeater ? 6 : 4,
      luggageCapacity: isSixSeater ? 4 : 2,
      priceMin: Math.round((gojekBase * mpvMultiplier) * 10) / 10,
      pickupEtaMins: 2 + (seed % 3),
      tripDurationMins: baseDurationMins + trafficDelayMins - 1,
      surgeLabel: isPeak ? '1.2x Peak' : 'Normal Demand',
      isSurge: isPeak,
      rating: 4.84,
      perkSummary: 'Fastest average driver acceptance in Orchard & CBD zones',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 4.4,
        distanceFare: Math.round(baseDistanceCost * mpvMultiplier * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + (isPeak ? 2.8 : 0.4),
        platformFeeOrDiscount: 0,
      },
    },
    {
      id: 'q-zig-justgo',
      platform: 'zig',
      platformName: 'Zig',
      serviceName: isAccessible
        ? 'Zig Wheelchair Accessible'
        : isSixSeater
        ? 'Zig LimoCab 6-Seater'
        : 'Zig JustGo',
      vehicleCategory: isSixSeater ? '6-Seater' : '4-Seater',
      seats: isSixSeater ? 6 : 4,
      luggageCapacity: isSixSeater ? 5 : 3,
      priceMin: Math.round((zigFlat * mpvMultiplier) * 10) / 10,
      pickupEtaMins: 3 + (seed % 2),
      tripDurationMins: baseDurationMins + trafficDelayMins,
      surgeLabel: 'Flat Fare',
      isSurge: false,
      rating: 4.89,
      perkSummary: 'Matches closest ComfortDelGro taxi or PHV; generous boot space',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 4.6,
        distanceFare: Math.round(baseDistanceCost * 1.04 * mpvMultiplier * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + 0.5,
        platformFeeOrDiscount: 0,
      },
    },
    {
      id: 'q-zig-metered',
      platform: 'zig',
      platformName: 'Zig',
      serviceName: 'ComfortDelGro Metered Taxi',
      vehicleCategory: 'Metered / Flat Taxi',
      seats: 4,
      luggageCapacity: 3,
      priceMin: Math.round((zigFlat - 1.6) * 10) / 10,
      priceMax: Math.round((zigFlat + 2.4) * 10) / 10,
      pickupEtaMins: 3,
      tripDurationMins: baseDurationMins + trafficDelayMins,
      surgeLabel: 'Normal Demand',
      isSurge: false,
      rating: 4.87,
      perkSummary: 'No dynamic surge multiplier; ideal when PHV apps spike in rain',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 4.4,
        distanceFare: Math.round(baseDistanceCost * 0.98 * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + (isPeak ? 1.8 : 0),
        platformFeeOrDiscount: 0,
      },
    },
    {
      id: 'q-ryde-x',
      platform: 'ryde',
      platformName: 'Ryde',
      serviceName: isPet ? 'RydePET' : isSixSeater ? 'RydeXL (6-Seater)' : 'RydeX',
      vehicleCategory: isPet ? 'Pet-Friendly' : isSixSeater ? '6-Seater' : '4-Seater',
      seats: isSixSeater ? 6 : 4,
      luggageCapacity: isSixSeater ? 4 : 2,
      priceMin: Math.round((rydeBase * mpvMultiplier + petAdd) * 10) / 10,
      pickupEtaMins: 5 + (seed % 3),
      tripDurationMins: baseDurationMins + trafficDelayMins,
      surgeLabel: isPeak ? '1.2x Peak' : 'Normal Demand',
      isSurge: isPeak,
      rating: 4.81,
      perkSummary: isPet
        ? 'Dedicated pet-friendly cabin; carrier optional for leashed pets'
        : 'Earns 3% RydeCoins cashback + priority matching with Ryde+ pass',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 4.1,
        distanceFare: Math.round(baseDistanceCost * mpvMultiplier * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + petAdd + (isPeak ? 1.9 : 0),
        platformFeeOrDiscount: -0.4,
      },
    },
  ];

  if (isPet) {
    quotes.unshift({
      id: 'q-tada-pet',
      platform: 'tada',
      platformName: 'Tada',
      serviceName: 'Tada Pet',
      vehicleCategory: 'Pet-Friendly',
      seats: 4,
      luggageCapacity: 2,
      priceMin: Math.round((tadaBase + 4.0) * 10) / 10,
      pickupEtaMins: 6,
      tripDurationMins: baseDurationMins + trafficDelayMins,
      surgeLabel: 'Zero Commission',
      isSurge: false,
      rating: 4.85,
      perkSummary: 'Zero-commission pet-friendly sedans with rear seat covers',
      recommendedBay: insiderNote,
      breakdown: {
        baseFare: 4.0,
        distanceFare: Math.round(baseDistanceCost * 0.96 * 10) / 10,
        erpAndTolls: erpTotal,
        peakOrSurcharge: airportSurcharge + 4.0,
        platformFeeOrDiscount: 0,
      },
    });
  }

  return { summary, quotes };
}
