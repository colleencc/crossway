import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Plus,
  ThumbsUp,
  X,
} from 'lucide-react';
import type { TrafficCorridor, TrafficSeverity, TrafficTip } from '../types/ride';

interface TrafficInsiderPanelProps {
  tips: TrafficTip[];
  upvotedTipIds: string[];
  onToggleUpvote: (tipId: string) => void;
  onAddTip: (tip: Omit<TrafficTip, 'id' | 'reportedAgo' | 'upvotes'>) => void;
  onApplyDetourRoute: (pickup: string, dropoff: string) => void;
}

const CORRIDORS: TrafficCorridor[] = [
  'All Corridors',
  'CTE & Central',
  'PIE & East',
  'AYE & West',
  'CBD & Marina',
  'Airport & Causeway',
];

export function TrafficInsiderPanel({
  tips,
  upvotedTipIds,
  onToggleUpvote,
  onAddTip,
  onApplyDetourRoute,
}: TrafficInsiderPanelProps) {
  const [selectedCorridor, setSelectedCorridor] = useState<TrafficCorridor>('All Corridors');
  const [showShareModal, setShowShareModal] = useState(false);

  // Share Tip Form State
  const [formCorridor, setFormCorridor] = useState<Exclude<TrafficCorridor, 'All Corridors'>>('CTE & Central');
  const [formSeverity, setFormSeverity] = useState<TrafficSeverity>('Moderate');
  const [formHeadline, setFormHeadline] = useState('');
  const [formDetail, setFormDetail] = useState('');
  const [formShortcut, setFormShortcut] = useState('');
  const [formTimeSaved, setFormTimeSaved] = useState(6);
  const [formError, setFormError] = useState('');

  const filteredTips = useMemo(() => {
    if (selectedCorridor === 'All Corridors') return tips;
    return tips.filter((t) => t.corridor === selectedCorridor);
  }, [tips, selectedCorridor]);

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHeadline.trim() || !formShortcut.trim()) {
      setFormError('Please provide both a condition headline and a practical detour or pickup tip.');
      return;
    }
    onAddTip({
      corridor: formCorridor,
      severity: formSeverity,
      headline: formHeadline.trim(),
      detail:
        formDetail.trim() ||
        'Submitted via Crossway Commuter Network to help riders pick faster pickup bays and avoid bottlenecks.',
      actionableShortcut: formShortcut.trim(),
      timeSavedMins: Math.max(1, formTimeSaved),
      reportedBy: 'You · Commuter Tip',
    });
    setFormHeadline('');
    setFormDetail('');
    setFormShortcut('');
    setFormTimeSaved(6);
    setFormError('');
    setShowShareModal(false);
  };

  return (
    <section id="traffic-section" className="bg-white border-y border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#0052CC] tracking-wide mb-1">
              Commuter Traffic Intelligence
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Insider road conditions &amp; pickup shortcuts
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
              Verified expressway bottlenecks, ERP step-down timing, and driveway pickup hacks before you confirm a ride.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Share Traffic Tip</span>
          </button>
        </div>

        {/* Corridor Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6" role="group" aria-label="Filter traffic tips by corridor">
          {CORRIDORS.map((corridor) => {
            const active = selectedCorridor === corridor;
            return (
              <button
                key={corridor}
                type="button"
                onClick={() => setSelectedCorridor(corridor)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#0052CC] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {corridor}
              </button>
            );
          })}
        </div>

        {/* Traffic Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTips.map((tip) => {
            const isUpvoted = upvotedTipIds.includes(tip.id);
            const severityStyles =
              tip.severity === 'Heavy Delay'
                ? { text: 'text-red-700', bg: 'bg-red-50', Icon: AlertTriangle }
                : tip.severity === 'Moderate'
                ? { text: 'text-amber-800', bg: 'bg-amber-50', Icon: Compass }
                : { text: 'text-emerald-800', bg: 'bg-emerald-50', Icon: CheckCircle2 };
            const SevIcon = severityStyles.Icon;

            return (
              <article
                key={tip.id}
                className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Clean unboxed metadata line + explicit severity label */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">{tip.corridor}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tip.reportedAgo}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${severityStyles.bg} ${severityStyles.text}`}
                    >
                      <SevIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{tip.severity}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {tip.headline}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tip.detail}</p>

                  {/* Actionable Insider Shortcut Box (all-around hairline border, no thick left bar) */}
                  <div className="mt-3.5 p-3.5 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#0052CC] mb-1">
                      <span>Insider Shortcut</span>
                      <span className="font-mono tabular-nums text-emerald-700">
                        Saves ~{tip.timeSavedMins} min
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">{tip.actionableShortcut}</p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">{tip.reportedBy}</span>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onToggleUpvote(tip.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                        isUpvoted
                          ? 'bg-blue-50 border-blue-200 text-[#0052CC]'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="tabular-nums">
                        Helpful ({tip.upvotes + (isUpvoted ? 1 : 0)})
                      </span>
                    </button>

                    {tip.suggestedPickup && tip.suggestedDropoff && (
                      <button
                        type="button"
                        onClick={() =>
                          onApplyDetourRoute(tip.suggestedPickup!, tip.suggestedDropoff!)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-900 hover:border-[#0052CC] hover:text-[#0052CC] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Compare Corridor</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Share Traffic Tip Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-tip-title"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <h3 id="share-tip-title" className="text-lg font-bold text-slate-900">
                Share a Live Traffic or Pickup Tip
              </h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tip-corridor" className="block text-xs font-semibold text-slate-700 mb-1">
                    Corridor
                  </label>
                  <select
                    id="tip-corridor"
                    value={formCorridor}
                    onChange={(e) =>
                      setFormCorridor(e.target.value as Exclude<TrafficCorridor, 'All Corridors'>)
                    }
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                  >
                    {CORRIDORS.filter((c) => c !== 'All Corridors').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tip-severity" className="block text-xs font-semibold text-slate-700 mb-1">
                    Traffic Status
                  </label>
                  <select
                    id="tip-severity"
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value as TrafficSeverity)}
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                  >
                    <option value="Heavy Delay">Heavy Delay</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Smooth Flow">Smooth Flow</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="tip-headline" className="block text-xs font-semibold text-slate-700 mb-1">
                  Road condition headline
                </label>
                <input
                  id="tip-headline"
                  type="text"
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  placeholder="e.g. Orchard Turn taxi queue backed up past Scotts Rd"
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                />
              </div>

              <div>
                <label htmlFor="tip-shortcut" className="block text-xs font-semibold text-slate-700 mb-1">
                  Actionable detour or pickup bay shortcut
                </label>
                <input
                  id="tip-shortcut"
                  type="text"
                  value={formShortcut}
                  onChange={(e) => setFormShortcut(e.target.value)}
                  placeholder="e.g. Walk to Wheelock Place side lane for sub-3 min Gojek pickup"
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="tip-detail" className="block text-xs font-semibold text-slate-700 mb-1">
                    Extra context (optional)
                  </label>
                  <input
                    id="tip-detail"
                    type="text"
                    value={formDetail}
                    onChange={(e) => setFormDetail(e.target.value)}
                    placeholder="Lane closure, weather, or ERP timing note"
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                  />
                </div>
                <div>
                  <label htmlFor="tip-saved" className="block text-xs font-semibold text-slate-700 mb-1">
                    Est. mins saved
                  </label>
                  <input
                    id="tip-saved"
                    type="number"
                    min={1}
                    max={45}
                    value={formTimeSaved}
                    onChange={(e) => setFormTimeSaved(Number(e.target.value))}
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]/25"
                  />
                </div>
              </div>

              {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg cursor-pointer"
                >
                  Publish Tip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
