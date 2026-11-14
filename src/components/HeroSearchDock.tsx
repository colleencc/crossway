import { useState } from 'react';
import {
  ArrowLeftRight,
  CalendarClock,
  Car,
  Clock,
  MapPin,
  Navigation,
  PlaneLanding,
  Search,
  Users,
} from 'lucide-react';
import { HERO_IMAGE, POPULAR_LOCATIONS } from '../data/mockMarketData';
import type { PassengerOption, SavedRoute, SearchQuery, ServiceMode } from '../types/ride';
import { SafeImage } from './PlatformLogo';

interface HeroSearchDockProps {
  query: SearchQuery;
  savedRoutes: SavedRoute[];
  onSubmitSearch: (nextQuery: SearchQuery) => void;
  onApplyPreset: (preset: SavedRoute) => void;
}

const SERVICE_TABS: { id: ServiceMode; label: string; icon: typeof Car }[] = [
  { id: 'standard', label: 'Standard Rides', icon: Car },
  { id: 'airport', label: 'Airport Transfer', icon: PlaneLanding },
  { id: 'carpool', label: 'CarPool & Share', icon: Users },
  { id: 'hourly', label: 'Hourly Charter', icon: Clock },
];

const PASSENGER_OPTIONS: PassengerOption[] = [
  '1-4 Pax',
  '6-Seater MPV',
  'Pet-Friendly',
  'Wheelchair Accessible',
];

export function HeroSearchDock({
  query,
  savedRoutes,
  onSubmitSearch,
  onApplyPreset,
}: HeroSearchDockProps) {
  const [draft, setDraft] = useState<SearchQuery>(query);
  const [focusedField, setFocusedField] = useState<'pickup' | 'dropoff' | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  // Keep local draft synced when parent presets or traffic detours update query
  const [lastSyncedQuery, setLastSyncedQuery] = useState<SearchQuery>(query);
  if (
    query.pickup !== lastSyncedQuery.pickup ||
    query.dropoff !== lastSyncedQuery.dropoff ||
    query.mode !== lastSyncedQuery.mode
  ) {
    setLastSyncedQuery(query);
    setDraft(query);
  }

  const handleSwap = () => {
    setDraft((prev) => ({
      ...prev,
      pickup: prev.dropoff,
      dropoff: prev.pickup,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.pickup.trim()) {
      setValidationError('Enter a pickup location to compare live fares.');
      return;
    }
    if (draft.mode !== 'hourly' && !draft.dropoff.trim()) {
      setValidationError('Enter a drop-off destination to calculate route pricing.');
      return;
    }
    setValidationError('');
    onSubmitSearch(draft);
  };

  const handleSelectMode = (mode: ServiceMode) => {
    const nextDraft: SearchQuery = {
      ...draft,
      mode,
      dropoff:
        mode === 'airport' && !draft.dropoff.toLowerCase().includes('changi')
          ? 'Changi Airport Terminal 3'
          : draft.dropoff,
    };
    setDraft(nextDraft);
    onSubmitSearch(nextDraft);
  };

  const filteredPickupSuggestions = POPULAR_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(draft.pickup.toLowerCase()) ||
    loc.district.toLowerCase().includes(draft.pickup.toLowerCase())
  );

  const filteredDropoffSuggestions = POPULAR_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(draft.dropoff.toLowerCase()) ||
    loc.district.toLowerCase().includes(draft.dropoff.toLowerCase())
  );

  return (
    <section id="top" className="relative bg-[#0B1D3A]">
      {/* Hero photographic backdrop with measured dark scrim */}
      <div className="relative min-h-[340px] lg:min-h-[380px] overflow-hidden">
        <SafeImage
          src={HERO_IMAGE}
          alt="Evening city expressway and skyline transit corridor"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fallbackTitle="Crossway Transit Hub"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#07152E]/80 via-[#0A2044]/75 to-[#07152E]/95"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 sm:pt-12 sm:pb-32">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium text-blue-200 tracking-wide mb-3">
              Zig · Gojek · Tada · Ryde · Live Traffic Anchor
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.15] [text-wrap:balance]">
              Compare every ride-hailing fare and road shortcut in one search
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              See live pricing, pickup ETAs, and peak surge spreads across Singapore’s four major platforms alongside verified commuter road tips.
            </p>
          </div>
        </div>
      </div>

      {/* Trip.com-inspired unified booking dock overlapping hero bottom edge */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 pb-8 z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5 p-5 sm:p-6">
          {/* Service Mode Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-5">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl" role="tablist" aria-label="Ride service types">
              {SERVICE_TABS.map((tab) => {
                const Icon = tab.icon;
                const active = draft.mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectMode(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#0052CC] text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Coverage:</span>
              <span className="font-medium text-slate-700">Islandwide + Changi T1–T4</span>
            </div>
          </div>

          {/* Search Form Grid */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              {/* Pickup Input */}
              <div className="relative lg:col-span-4">
                <label htmlFor="pickup-input" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Pickup point
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-[#0052CC] absolute left-3.5 pointer-events-none" aria-hidden="true" />
                  <input
                    id="pickup-input"
                    type="text"
                    value={draft.pickup}
                    onFocus={() => setFocusedField('pickup')}
                    onBlur={() => setTimeout(() => setFocusedField(null), 160)}
                    onChange={(e) => setDraft({ ...draft, pickup: e.target.value })}
                    placeholder="Enter pickup landmark or street"
                    className="w-full h-12 pl-10 pr-3 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25 focus:border-[#0052CC]"
                  />
                </div>

                {focusedField === 'pickup' && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
                    {(filteredPickupSuggestions.length > 0 ? filteredPickupSuggestions : POPULAR_LOCATIONS).map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setDraft({ ...draft, pickup: loc.name });
                          setFocusedField(null);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="text-sm font-medium text-slate-900">{loc.name}</div>
                        <div className="text-xs text-slate-500">{loc.district}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap + Dropoff (or Charter Duration) */}
              {draft.mode === 'hourly' ? (
                <div className="lg:col-span-3">
                  <label htmlFor="charter-hours" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Charter duration
                  </label>
                  <select
                    id="charter-hours"
                    value={draft.hourlyDuration ?? 3}
                    onChange={(e) => setDraft({ ...draft, hourlyDuration: Number(e.target.value) })}
                    className="w-full h-12 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25 focus:border-[#0052CC]"
                  >
                    <option value={2}>2 Hours (Up to 50 km)</option>
                    <option value={3}>3 Hours (Up to 75 km)</option>
                    <option value={4}>4 Hours (Half-Day)</option>
                    <option value={6}>6 Hours (Multi-Stop)</option>
                    <option value={8}>8 Hours (Full Day)</option>
                  </select>
                </div>
              ) : (
                <div className="relative lg:col-span-4">
                  <label htmlFor="dropoff-input" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Drop-off destination
                  </label>
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={handleSwap}
                      title="Swap pickup and drop-off"
                      aria-label="Swap pickup and drop-off locations"
                      className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0052CC] hover:border-[#0052CC] absolute -left-5 z-10 shadow-xs cursor-pointer"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <Navigation className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" aria-hidden="true" />
                    <input
                      id="dropoff-input"
                      type="text"
                      value={draft.dropoff}
                      onFocus={() => setFocusedField('dropoff')}
                      onBlur={() => setTimeout(() => setFocusedField(null), 160)}
                      onChange={(e) => setDraft({ ...draft, dropoff: e.target.value })}
                      placeholder="Where are you heading?"
                      className="w-full h-12 pl-10 pr-3 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25 focus:border-[#0052CC]"
                    />
                  </div>

                  {focusedField === 'dropoff' && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
                      {(filteredDropoffSuggestions.length > 0 ? filteredDropoffSuggestions : POPULAR_LOCATIONS).map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setDraft({ ...draft, dropoff: loc.name });
                            setFocusedField(null);
                          }}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className="text-sm font-medium text-slate-900">{loc.name}</div>
                          <div className="text-xs text-slate-500">{loc.district}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* When & Vehicle/Pax */}
              <div className={draft.mode === 'hourly' ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <label htmlFor="when-select" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Departure
                </label>
                <div className="relative">
                  <CalendarClock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <select
                    id="when-select"
                    value={draft.whenType === 'now' ? 'now' : draft.scheduledTime}
                    onChange={(e) => {
                      if (e.target.value === 'now') {
                        setDraft({ ...draft, whenType: 'now' });
                      } else {
                        setDraft({ ...draft, whenType: 'schedule', scheduledTime: e.target.value });
                      }
                    }}
                    className="w-full h-12 pl-9 pr-3 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25 focus:border-[#0052CC]"
                  >
                    <option value="now">Leave Now (Live)</option>
                    <option value="08:30">Schedule 08:30 AM</option>
                    <option value="14:00">Schedule 02:00 PM</option>
                    <option value="18:15">Schedule 06:15 PM</option>
                    <option value="23:30">Schedule 11:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Search CTA */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 px-5 bg-[#0052CC] hover:bg-[#0041A3] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
                >
                  <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Compare Fares</span>
                </button>
              </div>
            </div>

            {validationError && (
              <p className="mt-2.5 text-sm font-medium text-red-600" role="alert">
                {validationError}
              </p>
            )}

            {/* Secondary Row: Vehicle Needs + Quick Route Presets */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 mr-1">Ride preference:</span>
                {PASSENGER_OPTIONS.map((option) => {
                  const selected = draft.passengerOption === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        const next = { ...draft, passengerOption: option };
                        setDraft(next);
                        onSubmitSearch(next);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Quick routes:</span>
                {savedRoutes.slice(0, 3).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset(preset)}
                    className="text-xs font-medium text-[#0052CC] hover:text-[#0041A3] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
