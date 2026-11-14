import { useState } from 'react';
import { CheckCircle2, Clock, ExternalLink, MapPin, ShieldCheck, X } from 'lucide-react';
import { PLATFORM_META } from '../data/mockMarketData';
import type { RideQuote, SearchQuery } from '../types/ride';
import { PlatformLogo } from './PlatformLogo';

interface BookingDrawerProps {
  quote: RideQuote | null;
  query: SearchQuery;
  onClose: () => void;
  onConfirmBooking: (details: {
    quote: RideQuote;
    pickupBay: string;
    driverNote: string;
    channel: 'Crossway Anchor' | 'Platform Handoff';
  }) => void;
}

export function BookingDrawer({
  quote,
  query,
  onClose,
  onConfirmBooking,
}: BookingDrawerProps) {
  const [pickupBay, setPickupBay] = useState(quote?.recommendedBay ?? '');
  const [driverNote, setDriverNote] = useState('');
  const [channel, setChannel] = useState<'Crossway Anchor' | 'Platform Handoff'>('Crossway Anchor');

  // Sync pickup bay when quote changes
  const [lastQuoteId, setLastQuoteId] = useState<string | null>(null);
  if (quote && quote.id !== lastQuoteId) {
    setLastQuoteId(quote.id);
    setPickupBay(quote.recommendedBay);
    setDriverNote('');
  }

  if (!quote) return null;

  const meta = PLATFORM_META[quote.platform];
  const whenLabel =
    query.whenType === 'now' ? 'Immediate Pickup' : `Scheduled · ${query.scheduledTime}`;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking({
      quote,
      pickupBay: pickupBay.trim() || quote.recommendedBay,
      driverNote: driverNote.trim(),
      channel,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
    >
      <div className="bg-white w-full max-w-md h-full overflow-y-auto border-l border-slate-200 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PlatformLogo platform={quote.platform} size={38} />
              <div>
                <h2 id="booking-drawer-title" className="text-lg font-bold text-slate-900">
                  {quote.serviceName}
                </h2>
                <p className="text-xs text-slate-500">{meta.fullName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking panel"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form id="confirm-ride-form" onSubmit={handleConfirm} className="p-6 space-y-5">
            {/* Route & Price Summary */}
            <div className="p-4 bg-[#F7F9FC] border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{whenLabel}</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {quote.surgeLabel}
                </span>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="font-semibold text-slate-900">From: {query.pickup}</div>
                {query.mode !== 'hourly' && (
                  <div className="font-semibold text-slate-900">To: {query.dropoff}</div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-[#0052CC]" aria-hidden="true" />
                  <span className="tabular-nums">
                    Driver arrives in ~{quote.pickupEtaMins} min
                  </span>
                </div>
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900">
                  ${quote.priceMin.toFixed(2)}
                  {quote.priceMax ? `–$${quote.priceMax.toFixed(2)}` : ''}
                </div>
              </div>
            </div>

            {/* Pickup Bay Guidance */}
            <div>
              <label htmlFor="pickup-bay-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recommended Pickup Bay / Pin Note
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#0052CC] absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
                <textarea
                  id="pickup-bay-input"
                  rows={2}
                  value={pickupBay}
                  onChange={(e) => setPickupBay(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                />
              </div>
            </div>

            {/* Driver Instructions */}
            <div>
              <label htmlFor="driver-note-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Note for driver (optional)
              </label>
              <input
                id="driver-note-input"
                type="text"
                value={driverNote}
                onChange={(e) => setDriverNote(e.target.value)}
                placeholder="e.g. Wearing blue jacket, 2 large suitcases"
                className="w-full h-11 px-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
              />
            </div>

            {/* Booking Channel Choice */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Dispatch Method
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={() => setChannel('Crossway Anchor')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    channel === 'Crossway Anchor'
                      ? 'bg-blue-50/70 border-[#0052CC]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Book Directly via Crossway Anchor
                    </span>
                    {channel === 'Crossway Anchor' && (
                      <CheckCircle2 className="w-4 h-4 text-[#0052CC]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Unified dispatch &amp; live trip tracking inside Crossway without switching apps.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('Platform Handoff')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    channel === 'Platform Handoff'
                      ? 'bg-blue-50/70 border-[#0052CC]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Handoff to {meta.name} Wallet</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                    </span>
                    {channel === 'Platform Handoff' && (
                      <CheckCircle2 className="w-4 h-4 text-[#0052CC]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Use existing {meta.name} vouchers or corporate account credits and record in My Trips.
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="p-6 border-t border-slate-200 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="confirm-ride-form"
            className="flex-1 py-3 px-5 rounded-xl text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] transition-colors cursor-pointer"
          >
            Confirm {meta.name} Ride · ${quote.priceMin.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
