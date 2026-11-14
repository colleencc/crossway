export type RidePlatform = 'zig' | 'gojek' | 'tada' | 'ryde';

export type ServiceMode = 'standard' | 'airport' | 'carpool' | 'hourly';

export type PassengerOption = '1-4 Pax' | '6-Seater MPV' | 'Pet-Friendly' | 'Wheelchair Accessible';

export type SortOption = 'cheapest' | 'fastest' | 'zero-surge' | 'rating';

export type TrafficCorridor =
  | 'All Corridors'
  | 'CTE & Central'
  | 'PIE & East'
  | 'AYE & West'
  | 'CBD & Marina'
  | 'Airport & Causeway';

export type TrafficSeverity = 'Heavy Delay' | 'Moderate' | 'Smooth Flow';

export type NewsTopic =
  | 'Fare & Promo Alerts'
  | 'Platform Updates'
  | 'MRT & Transit'
  | 'ERP & Road Policy';

export interface LocationNode {
  id: string;
  name: string;
  district: string;
  pickupBayTip: string;
  lat: number;
  lng: number;
  isAirport?: boolean;
}

export interface SearchQuery {
  mode: ServiceMode;
  pickup: string;
  dropoff: string;
  whenType: 'now' | 'schedule';
  scheduledTime: string;
  passengerOption: PassengerOption;
  hourlyDuration?: number;
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  erpAndTolls: number;
  peakOrSurcharge: number;
  platformFeeOrDiscount: number;
}

export interface RideQuote {
  id: string;
  platform: RidePlatform;
  platformName: string;
  serviceName: string;
  vehicleCategory: '4-Seater' | '6-Seater' | 'Metered / Flat Taxi' | 'Carpool' | 'Pet-Friendly' | 'Hourly Charter';
  seats: number;
  luggageCapacity: number;
  priceMin: number;
  priceMax?: number;
  pickupEtaMins: number;
  tripDurationMins: number;
  surgeLabel: 'Flat Fare' | 'Normal Demand' | '1.2x Peak' | '1.4x High Demand' | 'Zero Commission';
  isSurge: boolean;
  rating: number;
  perkSummary: string;
  recommendedBay: string;
  breakdown: FareBreakdown;
}

export interface RouteSummary {
  distanceKm: number;
  baseDurationMins: number;
  trafficDelayMins: number;
  erpTotal: number;
  corridorName: string;
  corridorStatus: TrafficSeverity;
  insiderNote: string;
}

export interface TrafficTip {
  id: string;
  corridor: Exclude<TrafficCorridor, 'All Corridors'>;
  headline: string;
  severity: TrafficSeverity;
  detail: string;
  actionableShortcut: string;
  timeSavedMins: number;
  reportedBy: string;
  reportedAgo: string;
  upvotes: number;
  suggestedPickup?: string;
  suggestedDropoff?: string;
}

export interface NewsArticle {
  id: string;
  topic: NewsTopic;
  title: string;
  summary: string;
  readTime: string;
  publishedAgo: string;
  source: string;
  imageUrl: string;
  imageAlt: string;
  keyTakeaways: string[];
  bodyParagraphs: string[];
  relatedPlatform?: RidePlatform;
}

export interface SavedRoute {
  id: string;
  label: string;
  pickup: string;
  dropoff: string;
  mode: ServiceMode;
  bestPlatform: string;
  typicalFare: number;
}

export interface BookedTrip {
  id: string;
  quote: RideQuote;
  pickup: string;
  dropoff: string;
  whenLabel: string;
  pickupBay: string;
  driverNote: string;
  status: 'Searching Driver' | 'Driver Assigned' | 'Arriving in 2 mins' | 'Completed' | 'Cancelled';
  driverName: string;
  vehiclePlate: string;
  vehicleModel: string;
  bookedAt: string;
  bookingChannel: 'Crossway Anchor' | 'Platform Handoff';
}
