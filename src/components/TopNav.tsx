interface TopNavProps {
  activeTripCount: number;
  savedCount: number;
  onOpenTrips: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export function TopNav({ activeTripCount, savedCount, onOpenTrips, onJumpToSection }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="#top"
          className="text-xl font-bold tracking-tight text-[#0052CC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC] rounded"
        >
          Crossway
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onJumpToSection('compare-section')}
            className="hover:text-slate-900 hover:underline underline-offset-8 decoration-2 decoration-[#0052CC] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            Compare Rides
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('traffic-section')}
            className="hover:text-slate-900 hover:underline underline-offset-8 decoration-2 decoration-[#0052CC] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            Traffic Tips
          </button>
          <button
            type="button"
            onClick={() => onJumpToSection('news-section')}
            className="hover:text-slate-900 hover:underline underline-offset-8 decoration-2 decoration-[#0052CC] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            News Feed
          </button>
          <button
            type="button"
            onClick={onOpenTrips}
            className="hover:text-slate-900 hover:underline underline-offset-8 decoration-2 decoration-[#0052CC] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            Saved Routes{savedCount > 0 ? ` (${savedCount})` : ''}
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenTrips}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
          >
            My Trips{activeTripCount > 0 ? ` (${activeTripCount})` : ''}
          </button>
        </div>
      </div>
    </header>
  );
}
