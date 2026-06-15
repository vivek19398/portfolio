import { JOURNEY_STAGES } from './TravelScrollJourney'

/**
 * Fixed milestone rail: Home → Airport → Check-in → Boarding → Flight →
 * Destination. The fill width and active dots are driven by the live
 * scroll progress (0–1) reported by TravelScrollJourney.
 */
export default function JourneyProgress({ progress }: { progress: number }) {
  const activeIndex = JOURNEY_STAGES.reduce((acc, s, i) => (progress >= s.at ? i : acc), 0)

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl rounded-full glass-panel border-gold/15 px-4 sm:px-6 py-3">
        <div className="relative">
          {/* Track + gold fill */}
          <div className="absolute top-[7px] left-0 right-0 h-0.5 bg-white/10 rounded-full" />
          <div
            className="absolute top-[7px] left-0 h-0.5 rounded-full bg-gradient-to-r from-gold-light to-gold transition-[width] duration-150 ease-out"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
          <ol className="relative flex justify-between">
            {JOURNEY_STAGES.map((s, i) => {
              const active = i <= activeIndex
              return (
                <li key={s.key} className="flex flex-col items-center gap-1.5" style={{ flex: '0 0 auto' }}>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${
                      active ? 'bg-gold border-gold shadow-[0_0_10px_rgba(201,168,76,0.6)]' : 'bg-void border-white/25'
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-colors duration-200 ${
                      i === activeIndex ? 'text-gold-light' : active ? 'text-parchment/60' : 'text-ash/50'
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
