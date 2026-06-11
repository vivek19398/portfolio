import type { TravelDestination } from '../../types/travel'

interface DestinationFilterProps {
  destinations: TravelDestination[]
  selected: string | null
  onSelect: (id: string | null) => void
}

/** Pill filter row for the gallery. */
export default function DestinationFilter({ destinations, selected, onSelect }: DestinationFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by destination">
      <button
        role="tab"
        aria-selected={selected === null}
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
          selected === null
            ? 'border-ember/60 bg-ember/15 text-ember shadow-[0_0_14px_rgba(245,158,11,0.25)]'
            : 'border-white/10 text-ash hover:text-mist hover:border-white/25'
        }`}
      >
        All
      </button>
      {destinations.map((d) => (
        <button
          key={d.id}
          role="tab"
          aria-selected={selected === d.id}
          onClick={() => onSelect(d.id)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
            selected === d.id
              ? 'border-ember/60 bg-ember/15 text-ember shadow-[0_0_14px_rgba(245,158,11,0.25)]'
              : 'border-white/10 text-ash hover:text-mist hover:border-white/25'
          }`}
        >
          {d.city || d.country}
        </button>
      ))}
    </div>
  )
}
