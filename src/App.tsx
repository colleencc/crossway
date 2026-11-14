import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { BookingDrawer } from './components/BookingDrawer';
import { HeroSearchDock } from './components/HeroSearchDock';
import { PersonalizedNewsFeed } from './components/PersonalizedNewsFeed';
import { RideComparisonBoard } from './components/RideComparisonBoard';
import { TopNav } from './components/TopNav';
import { TrafficInsiderPanel } from './components/TrafficInsiderPanel';
import { TripsAndSavedDrawer } from './components/TripsAndSavedDrawer';
import {
  INITIAL_SAVED_ROUTES,
  INITIAL_TRAFFIC_TIPS,
  NEWS_ARTICLES,
  generateRouteAndQuotes,
} from './data/mockMarketData';
import type {
  BookedTrip,
  NewsTopic,
  RideQuote,
  SavedRoute,
  SearchQuery,
  TrafficTip,
} from './types/ride';

const DEFAULT_QUERY: SearchQuery = {
  mode: 'standard',
  pickup: 'ION Orchard (Drop-off Bay)',
  dropoff: 'Changi Airport Terminal 3',
  whenType: 'now',
  scheduledTime: '18:15',
  passengerOption: '1-4 Pax',
  hourlyDuration: 3,
};

const DRIVER_POOL = [
  { name: 'Kelvin Tan', plate: 'SLR 4821M', model: 'Toyota Prius Hybrid' },
  { name: 'Siti Rahmah', plate: 'SMN 9032K', model: 'BYD Atto 3 EV' },
  { name: 'David Ong', plate: 'SHA 6619E', model: 'Hyundai Ioniq 5' },
  { name: 'Rajan Pillai', plate: 'SNK 2147X', model: 'Honda Freed 6-Seater' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>(DEFAULT_QUERY);
  const [refreshNonce, setRefreshNonce] = useState(0);

  // Persisted Workspace State
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_saved_routes');
      return raw ? JSON.parse(raw) : INITIAL_SAVED_ROUTES;
    } catch {
      return INITIAL_SAVED_ROUTES;
    }
  });

  const [bookedTrips, setBookedTrips] = useState<BookedTrip[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_booked_trips');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [trafficTips, setTrafficTips] = useState<TrafficTip[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_traffic_tips');
      return raw ? JSON.parse(raw) : INITIAL_TRAFFIC_TIPS;
    } catch {
      return INITIAL_TRAFFIC_TIPS;
    }
  });

  const [upvotedTipIds, setUpvotedTipIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_upvoted_tips');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [preferredTopics, setPreferredTopics] = useState<NewsTopic[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_news_topics');
      return raw
        ? JSON.parse(raw)
        : ['Platform Updates', 'Fare & Promo Alerts', 'ERP & Road Policy'];
    } catch {
      return ['Platform Updates', 'Fare & Promo Alerts', 'ERP & Road Policy'];
    }
  });

  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('crossway_bookmarks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Drawers & Toast Feedback
  const [selectedQuote, setSelectedQuote] = useState<RideQuote | null>(null);
  const [showWorkspaceDrawer, setShowWorkspaceDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_saved_routes', JSON.stringify(savedRoutes));
    } catch {
      // ignore storage errors
    }
  }, [savedRoutes]);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_booked_trips', JSON.stringify(bookedTrips));
    } catch {
      // ignore storage errors
    }
  }, [bookedTrips]);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_traffic_tips', JSON.stringify(trafficTips));
    } catch {
      // ignore storage errors
    }
  }, [trafficTips]);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_upvoted_tips', JSON.stringify(upvotedTipIds));
    } catch {
      // ignore storage errors
    }
  }, [upvotedTipIds]);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_news_topics', JSON.stringify(preferredTopics));
    } catch {
      // ignore storage errors
    }
  }, [preferredTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('crossway_bookmarks', JSON.stringify(bookmarkedArticleIds));
    } catch {
      // ignore storage errors
    }
  }, [bookmarkedArticleIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const { summary, quotes } = useMemo(() => {
    void refreshNonce;
    return generateRouteAndQuotes(searchQuery);
  }, [searchQuery, refreshNonce]);

  const isRouteSaved = useMemo(
    () =>
      savedRoutes.some(
        (r) =>
          r.pickup.toLowerCase() === searchQuery.pickup.toLowerCase() &&
          r.dropoff.toLowerCase() === searchQuery.dropoff.toLowerCase()
      ),
    [savedRoutes, searchQuery]
  );

  const handleToggleSaveRoute = () => {
    if (isRouteSaved) {
      setSavedRoutes((prev) =>
        prev.filter(
          (r) =>
            !(
              r.pickup.toLowerCase() === searchQuery.pickup.toLowerCase() &&
              r.dropoff.toLowerCase() === searchQuery.dropoff.toLowerCase()
            )
        )
      );
      showToast('Removed route from Saved Routes.');
      return;
    }

    const cheapest = quotes.reduce(
      (min, q) => (q.priceMin < min.priceMin ? q : min),
      quotes[0]
    );
    const shortLabel = `${searchQuery.pickup.split(' ')[0]} → ${searchQuery.dropoff.split(' ')[0]}`;
    const newRoute: SavedRoute = {
      id: `sr-${Date.now()}`,
      label: shortLabel,
      pickup: searchQuery.pickup,
      dropoff: searchQuery.dropoff,
      mode: searchQuery.mode,
      bestPlatform: cheapest?.platformName ?? 'Tada',
      typicalFare: cheapest?.priceMin ?? 18.5,
    };
    setSavedRoutes((prev) => [newRoute, ...prev]);
    showToast('Route saved to your Commuter Workspace.');
  };

  const handleConfirmBooking = ({
    quote,
    pickupBay,
    driverNote,
    channel,
  }: {
    quote: RideQuote;
    pickupBay: string;
    driverNote: string;
    channel: 'Crossway Anchor' | 'Platform Handoff';
  }) => {
    const driver = DRIVER_POOL[bookedTrips.length % DRIVER_POOL.length];
    const newTrip: BookedTrip = {
      id: `trip-${Date.now()}`,
      quote,
      pickup: searchQuery.pickup,
      dropoff: searchQuery.mode === 'hourly' ? `${searchQuery.hourlyDuration ?? 3}h Hourly Charter` : searchQuery.dropoff,
      whenLabel:
        searchQuery.whenType === 'now'
          ? 'Immediate'
          : `Scheduled ${searchQuery.scheduledTime}`,
      pickupBay,
      driverNote,
      status: 'Driver Assigned',
      driverName: driver.name,
      vehiclePlate: driver.plate,
      vehicleModel: driver.model,
      bookedAt: 'Just now',
      bookingChannel: channel,
    };

    setBookedTrips((prev) => [newTrip, ...prev]);
    setSelectedQuote(null);
    setShowWorkspaceDrawer(true);
    showToast(`${quote.platformName} (${quote.serviceName}) confirmed — driver assigned.`);
  };

  const handleAdvanceTripStatus = (tripId: string) => {
    setBookedTrips((prev) =>
      prev.map((trip) => {
        if (trip.id !== tripId) return trip;
        if (trip.status === 'Searching Driver') return { ...trip, status: 'Driver Assigned' };
        if (trip.status === 'Driver Assigned') return { ...trip, status: 'Arriving in 2 mins' };
        if (trip.status === 'Arriving in 2 mins') return { ...trip, status: 'Completed' };
        return trip;
      })
    );
  };

  const handleCancelTrip = (tripId: string) => {
    setBookedTrips((prev) =>
      prev.map((trip) => (trip.id === tripId ? { ...trip, status: 'Cancelled' } : trip))
    );
    showToast('Trip cancelled.');
  };

  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeTripCount = bookedTrips.filter(
    (t) => t.status !== 'Completed' && t.status !== 'Cancelled'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-900">
      <TopNav
        activeTripCount={activeTripCount}
        savedCount={savedRoutes.length}
        onOpenTrips={() => setShowWorkspaceDrawer(true)}
        onJumpToSection={handleJumpToSection}
      />

      <main className="flex-1">
        <HeroSearchDock
          query={searchQuery}
          savedRoutes={savedRoutes}
          onSubmitSearch={(next) => {
            setSearchQuery(next);
            handleJumpToSection('compare-section');
          }}
          onApplyPreset={(preset) => {
            setSearchQuery((prev) => ({
              ...prev,
              mode: preset.mode,
              pickup: preset.pickup,
              dropoff: preset.dropoff,
            }));
            handleJumpToSection('compare-section');
          }}
        />

        <RideComparisonBoard
          query={searchQuery}
          summary={summary}
          quotes={quotes}
          isRouteSaved={isRouteSaved}
          onToggleSaveRoute={handleToggleSaveRoute}
          onSelectQuote={(quote) => setSelectedQuote(quote)}
          onRefreshQuotes={() => {
            setRefreshNonce((n) => n + 1);
            showToast('Live fares refreshed across Zig, Gojek, Tada & Ryde.');
          }}
        />

        <TrafficInsiderPanel
          tips={trafficTips}
          upvotedTipIds={upvotedTipIds}
          onToggleUpvote={(tipId) => {
            setUpvotedTipIds((prev) =>
              prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]
            );
          }}
          onAddTip={(newTip) => {
            const created: TrafficTip = {
              ...newTip,
              id: `tip-${Date.now()}`,
              reportedAgo: 'Just now',
              upvotes: 1,
            };
            setTrafficTips((prev) => [created, ...prev]);
            showToast('Traffic tip published to the commuter feed.');
          }}
          onApplyDetourRoute={(pickup, dropoff) => {
            setSearchQuery((prev) => ({
              ...prev,
              mode: 'standard',
              pickup,
              dropoff,
            }));
            handleJumpToSection('compare-section');
            showToast('Loaded corridor route into live fare comparison.');
          }}
        />

        <PersonalizedNewsFeed
          articles={NEWS_ARTICLES}
          preferredTopics={preferredTopics}
          bookmarkedArticleIds={bookmarkedArticleIds}
          onUpdateTopics={setPreferredTopics}
          onToggleBookmark={(articleId) => {
            setBookmarkedArticleIds((prev) =>
              prev.includes(articleId)
                ? prev.filter((id) => id !== articleId)
                : [...prev, articleId]
            );
          }}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-900 text-sm mr-2">Crossway</span>
            <span>Multi-platform ride comparison &amp; commuter traffic anchor across Zig, Gojek, Tada &amp; Ryde.</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleJumpToSection('compare-section')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Compare Fares
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('traffic-section')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Traffic Intelligence
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('news-section')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Mobility News
            </button>
          </div>
        </div>
      </footer>

      <BookingDrawer
        quote={selectedQuote}
        query={searchQuery}
        onClose={() => setSelectedQuote(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      <TripsAndSavedDrawer
        open={showWorkspaceDrawer}
        trips={bookedTrips}
        savedRoutes={savedRoutes}
        onClose={() => setShowWorkspaceDrawer(false)}
        onAdvanceTripStatus={handleAdvanceTripStatus}
        onCancelTrip={handleCancelTrip}
        onApplySavedRoute={(route) => {
          setSearchQuery((prev) => ({
            ...prev,
            mode: route.mode,
            pickup: route.pickup,
            dropoff: route.dropoff,
          }));
          handleJumpToSection('compare-section');
        }}
        onDeleteSavedRoute={(routeId) => {
          setSavedRoutes((prev) => prev.filter((r) => r.id !== routeId));
          showToast('Saved route removed.');
        }}
      />

      {/* Non-blocking Confirmation Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
