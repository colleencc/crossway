import { useState } from 'react';
import { ArrowRight, Car, MapPin, Trash2, X } from 'lucide-react';
import type { BookedTrip, SavedRoute } from '../types/ride';
import { PlatformLogo } from './PlatformLogo';

interface TripsAndSavedDrawerProps {
  open: boolean;
  trips: BookedTrip[];
  savedRoutes: SavedRoute[];
  onClose: () => void;
  onAdvanceTripStatus: (tripId: string) => void;
  onCancelTrip: (tripId: string) => void;
  onApplySavedRoute: (route: SavedRoute) => void;
  onDeleteSavedRoute: (routeId: string) => void;
}

export function TripsAndSavedDrawer({
  open,
  trips,
  savedRoutes,
  onClose,
  onAdvanceTripStatus,
  onCancelTrip,
  onApplySavedRoute,
  onDeleteSavedRoute,
}: TripsAndSavedDrawerProps) {
  const [tab, setTab] = useState<'trips' | 'saved'>('trips');

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workspace-drawer-title"
    >
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto border-l border-slate-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <h2 id="workspace-drawer-title" className="text-lg font-bold text-slate-900">
            Commuter Workspace
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close workspace"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 pb-3 border-b border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('trips')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              tab === 'trips'
                ? 'bg-[#0052CC] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            My Trips ({trips.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('saved')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              tab === 'saved'
                ? 'bg-[#0052CC] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Saved Routes ({savedRoutes.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 space-y-4">
          {tab === 'trips' ? (
            trips.length === 0 ? (
              <div className="py-12 text-center">
                <Car className="w-9 h-9 text-slate-300 mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-800">No booked rides yet</p>
                <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
                  Compare fares across Zig, Gojek, Tada, and Ryde and click Select Ride to dispatch a trip.
                </p>
              </div>
            ) : (
              trips.map((trip) => {
                const isActive =
                  trip.status !== 'Completed' && trip.status !== 'Cancelled';
                const statusBadgeStyle =
                  trip.status === 'Cancelled'
                    ? 'bg-red-50 text-red-700'
                    : trip.status === 'Completed'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-emerald-50 text-emerald-800';

                return (
                  <div
                    key={trip.id}
                    className="p-4 bg-[#F7F9FC] border border-slate-200 rounded-2xl space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <PlatformLogo platform={trip.quote.platform} size={32} />
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {trip.quote.serviceName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {trip.bookedAt} · {trip.bookingChannel}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${statusBadgeStyle}`}>
                        {trip.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <div>
                        <span className="font-semibold text-slate-900">Pickup: </span>
                        {trip.pickup}
                      </div>
                      {trip.dropoff && (
                        <div>
                          <span className="font-semibold text-slate-900">Drop-off: </span>
                          {trip.dropoff}
                        </div>
                      )}
                      <div className="text-slate-500">
                        Driver: {trip.driverName} · {trip.vehicleModel} ({trip.vehiclePlate})
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                      <span className="text-base font-bold font-mono tabular-nums text-slate-900">
                        ${trip.quote.priceMin.toFixed(2)}
                      </span>

                      {isActive && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onCancelTrip(trip.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => onAdvanceTripStatus(trip.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] cursor-pointer"
                          >
                            Update Status
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )
          ) : savedRoutes.length === 0 ? (
            <div className="py-12 text-center">
              <MapPin className="w-9 h-9 text-slate-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm font-semibold text-slate-800">No saved routes</p>
              <p className="mt-1 text-xs text-slate-500">
                Click Save Route on any fare comparison to pin your frequent commutes here.
              </p>
            </div>
          ) : (
            savedRoutes.map((route) => (
              <div
                key={route.id}
                className="p-4 bg-[#F7F9FC] border border-slate-200 rounded-2xl flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{route.label}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      {route.pickup} → {route.dropoff}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 tabular-nums">
                      Typical best: {route.bestPlatform} (~${route.typicalFare.toFixed(2)})
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteSavedRoute(route.id)}
                    aria-label={`Remove saved route ${route.label}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onApplySavedRoute(route);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#0052CC] bg-white border border-slate-200 hover:border-[#0052CC] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Compare Live Fares</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
