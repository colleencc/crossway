import { useMemo, useState } from 'react';
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { PLATFORM_META } from '../data/mockMarketData';
import type {
  RidePlatform,
  RideQuote,
  RouteSummary,
  SearchQuery,
  SortOption,
} from '../types/ride';
import { PlatformLogo } from './PlatformLogo';

interface RideComparisonBoardProps {
  query: SearchQuery;
  summary: RouteSummary;
  quotes: RideQuote[];
  isRouteSaved: boolean;
  onToggleSaveRoute: () => void;
  onSelectQuote: (quote: RideQuote) => void;
  onRefreshQuotes: () => void;
}

const SORT_TABS: { id: SortOption; label: string }[] = [
  { id: 'cheapest', label: 'Lowest Fare' },
  { id: 'fastest', label: 'Fastest Pickup' },
  { id: 'zero-surge', label: 'No Surge First' },
  { id: 'rating', label: 'Highest Rated' },
];

const PLATFORM_FILTERS: { id: 'all' | RidePlatform; label: string }[] = [
  { id: 'all', label: 'All Platforms' },
  { id: 'zig', label: 'Zig' },
  { id: 'gojek', label: 'Gojek' },
  { id: 'tada', label: 'Tada' },
  { id: 'ryde', label: 'Ryde' },
];

export function RideComparisonBoard({
  query,
  summary,
  quotes,
  isRouteSaved,
  onToggleSaveRoute,
  onSelectQuote,
  onRefreshQuotes,
}: RideComparisonBoardProps) {
  const [sortBy, setSortBy] = useState<SortOption>('cheapest');
  const [platformFilter, setPlatformFilter] = useState<'all' | RidePlatform>('all');
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lowestFareId = useMemo(() => {
    if (quotes.length === 0) return null;
    return quotes.reduce((min, q) => (q.priceMin < min.priceMin ? q : min), quotes[0]).id;
  }, [quotes]);

  const fastestPickupId = useMemo(() => {
    if (quotes.length === 0) return null;
    return quotes.reduce((min, q) => (q.pickupEtaMins < min.pickupEtaMins ? q : min), quotes[0]).id;
  }, [quotes]);

  const filteredAndSortedQuotes = useMemo(() => {
    const filtered =
      platformFilter === 'all'
        ? quotes
        : quotes.filter((q) => q.platform === platformFilter);

    return [...filtered].sort((a, b) => {
      if (sortBy === 'cheapest') return a.priceMin - b.priceMin;
      if (sortBy === 'fastest') return a.pickupEtaMins - b.pickupEtaMins;
      if (sortBy === 'zero-surge') {
        if (a.isSurge !== b.isSurge) return a.isSurge ? 1 : -1;
        return a.priceMin - b.priceMin;
      }
      return b.rating - a.rating;
    });
  }, [quotes, platformFilter, sortBy]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      onRefreshQuotes();
      setIsRefreshing(false);
    }, 280);
  };

  const severityColorClass =
    summary.corridorStatus === 'Heavy Delay'
      ? 'text-red-700 bg-red-50'
      : summary.corridorStatus === 'Moderate'
      ? 'text-amber-800 bg-amber-50'
      : 'text-emerald-800 bg-emerald-50';

  return (
    <section id="compare-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Route Summary & Live Corridor Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Live Multi-Platform Comparison</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{summary.distanceKm.toFixed(1)} km route</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {summary.baseDurationMins + summary.trafficDelayMins} min est. travel (+{summary.trafficDelayMins} min traffic)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {query.mode === 'hourly'
              ? `Hourly Charter from ${query.pickup}`
              : `${query.pickup} to ${query.dropoff}`}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${severityColorClass}`}>
            {summary.corridorName}: {summary.corridorStatus}
          </span>
          <button
            type="button"
            onClick={onToggleSaveRoute}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              isRouteSaved
                ? 'bg-blue-50 border-blue-200 text-[#0052CC]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isRouteSaved ? 'fill-[#0052CC]' : ''}`} aria-hidden="true" />
            <span>{isRouteSaved ? 'Route Saved' : 'Save Route'}</span>
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Fares'}
          </button>
        </div>
      </div>

      {/* Pickup Bay Insider Guidance Strip */}
      <div className="mb-5 px-4 py-3 bg-blue-50/70 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2.5 text-sm text-slate-800">
          <Info className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <div>
            <span className="font-semibold text-slate-900">Pickup tip: </span>
            <span>{summary.insiderNote}</span>
          </div>
        </div>
        <div className="text-xs font-mono tabular-nums text-slate-600 whitespace-nowrap shrink-0">
          Est. ERP: ${summary.erpTotal.toFixed(2)}
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl" role="group" aria-label="Filter by ride-hailing platform">
          {PLATFORM_FILTERS.map((pf) => {
            const active = platformFilter === pf.id;
            return (
              <button
                key={pf.id}
                type="button"
                onClick={() => setPlatformFilter(pf.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {pf.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Sort rides">
          <span className="text-xs font-medium text-slate-500 mr-1">Sort:</span>
          {SORT_TABS.map((tab) => {
            const active = sortBy === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSortBy(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Results Table/List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {filteredAndSortedQuotes.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-slate-700 mb-3">
              No ride tiers match the selected platform filter.
            </p>
            <button
              type="button"
              onClick={() => setPlatformFilter('all')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0052CC] rounded-lg hover:bg-[#0041A3] cursor-pointer"
            >
              Show All Platforms
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredAndSortedQuotes.map((quote) => {
              const isExpanded = expandedQuoteId === quote.id;
              const isLowest = quote.id === lowestFareId;
              const isFastest = quote.id === fastestPickupId;
              const meta = PLATFORM_META[quote.platform];

              return (
                <div key={quote.id} className="transition-colors hover:bg-slate-50/70">
                  <div className="p-4 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Platform + Service Tier */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <PlatformLogo platform={quote.platform} size={44} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <h3 className="text-base font-bold text-slate-900 truncate">
                            {quote.serviceName}
                          </h3>
                          {isLowest && (
                            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                              Best Price
                            </span>
                          )}
                          {!isLowest && isFastest && (
                            <span className="text-xs font-semibold text-[#0052CC]">
                              Fastest Pickup
                            </span>
                          )}
                        </div>

                        {/* Unboxed metadata with typographic separators */}
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{meta.fullName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{quote.seats} seats</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{quote.luggageCapacity} bags</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                            {quote.rating.toFixed(2)}
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs text-slate-600">{quote.perkSummary}</p>
                      </div>
                    </div>

                    {/* Middle: Pickup ETA + Demand State */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 lg:gap-8 shrink-0">
                      <div className="min-w-[110px]">
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                          <span>Pickup ETA</span>
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-slate-900 tabular-nums">
                          {quote.pickupEtaMins} min away
                        </div>
                        <div className="text-xs text-slate-500 tabular-nums">
                          {quote.tripDurationMins} min ride
                        </div>
                      </div>

                      <div className="min-w-[125px]">
                        <div className="text-xs text-slate-500">Pricing Mode</div>
                        <div
                          className={`mt-0.5 text-xs font-semibold inline-flex items-center gap-1 ${
                            quote.isSurge
                              ? 'text-amber-700'
                              : quote.surgeLabel === 'Zero Commission'
                              ? 'text-sky-700'
                              : 'text-emerald-700'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{quote.surgeLabel}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedQuoteId(isExpanded ? null : quote.id)}
                          className="mt-1 flex items-center gap-1 text-xs font-medium text-[#0052CC] hover:underline cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide breakdown' : 'Fare breakdown'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>

                      {/* Right: Price & Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right min-w-[92px]">
                          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
                            ${quote.priceMin.toFixed(2)}
                            {quote.priceMax ? (
                              <span className="text-sm font-medium text-slate-500">
                                –${quote.priceMax.toFixed(2)}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {quote.priceMax ? 'Metered estimate' : 'Upfront fixed'}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectQuote(quote)}
                          className="px-4 py-2.5 bg-[#0052CC] hover:bg-[#0041A3] text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
                        >
                          Select Ride
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Fare Breakdown Drawer */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-5 pt-2 bg-slate-50/80 border-t border-slate-100">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block">Base Flag-down</span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5 block">
                            ${quote.breakdown.baseFare.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Distance ({summary.distanceKm} km)</span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5 block">
                            ${quote.breakdown.distanceFare.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">ERP & Tolls</span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5 block">
                            ${quote.breakdown.erpAndTolls.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Peak / Airport Fee</span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5 block">
                            ${quote.breakdown.peakOrSurcharge.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Platform Adjustment</span>
                          <span className="font-mono tabular-nums font-semibold text-emerald-700 mt-0.5 block">
                            {quote.breakdown.platformFeeOrDiscount < 0
                              ? `-$${Math.abs(quote.breakdown.platformFeeOrDiscount).toFixed(2)}`
                              : `$${quote.breakdown.platformFeeOrDiscount.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-[#0052CC] shrink-0" aria-hidden="true" />
                        <span>Recommended pickup pin: {quote.recommendedBay}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
