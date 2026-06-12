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
            ? 'border-gold/60 bg-gold/10 text-gold-light shadow-[0_0_14px_rgba(201,168,76,0.2)]'
            : 'border-white/10 text-ash hover:text-parchment hover:border-gold/30'
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
              ? 'border-gold/60 bg-gold/10 text-gold-light shadow-[0_0_14px_rgba(201,168,76,0.2)]'
              : 'border-white/10 text-ash hover:text-parchment hover:border-gold/30'
          }`}
        >
          {d.city || d.country}
        </button>
      ))}
    </div>
  )
}
