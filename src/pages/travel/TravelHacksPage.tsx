import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import TravelHackCard from '../../components/travel/TravelHackCard'
import EmptyState from '../../components/travel/EmptyState'
import MediaSkeleton from '../../components/travel/MediaSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getTravelHacks } from '../../lib/travelQueries'
import type { TravelHack } from '../../types/travel'

const CATEGORIES = [
  'Budget Travel', 'Visa & Documents', 'Flights', 'Hotels', 'Food',
  'Local Transport', 'Safety', 'Packing', 'Hidden Gems', 'Itinerary',
] as const

/** Searchable, filterable travel hacks. */
export default function TravelHacksPage() {
  usePageMeta(
    'Travel Hacks — Vivek Ranjan',
    'Field-tested travel hacks: budget tricks, visa tips, flight savings, packing strategies, and hidden gems.',
  )
  const [hacks, setHacks] = useState<TravelHack[] | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    getTravelHacks().then(setHacks)
  }, [])

  const visible = useMemo(() => {
    if (!hacks) return []
    const q = search.trim().toLowerCase()
    return hacks.filter((h) => {
      if (category && h.category !== category) return false
      if (!q) return true
      return [h.title, h.excerpt, h.country, h.city, ...h.tags].join(' ').toLowerCase().includes(q)
    })
  }, [hacks, search, category])

  // Only offer categories that exist, so filters never dead-end.
  const activeCategories = useMemo(
    () => CATEGORIES.filter((c) => hacks?.some((h) => h.category === c)),
    [hacks],
  )

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mb-3 flex items-center gap-2.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0"><path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" /></svg>Field Manual</p>
        <h1 className="font-display text-3xl sm:text-5xl tracking-wide mb-6"><span className="gold-text">Travel Hacks</span></h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="relative flex-1 max-w-md">
            <span className="sr-only">Search hacks</span>
            <input
              type="search"
              placeholder="Search hacks, places, tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-charcoal/80 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-mist placeholder:text-ash/50 focus:border-gold outline-none transition-colors"
            />
            <span aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash">⌕</span>
          </label>
        </div>

        {activeCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4" role="tablist" aria-label="Filter by category">
            <button
              role="tab"
              aria-selected={category === null}
              onClick={() => setCategory(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                category === null
                  ? 'border-gold/60 bg-gold/10 text-gold-light'
                  : 'border-white/10 text-ash hover:text-parchment hover:border-gold/30'
              }`}
            >
              All
            </button>
            {activeCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  category === c
                    ? 'border-gold/60 bg-gold/10 text-gold-light'
                    : 'border-white/10 text-ash hover:text-parchment hover:border-gold/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </motion.header>

      {hacks === null ? (
        <MediaSkeleton count={4} />
      ) : visible.length === 0 ? (
        <EmptyState title="No hacks match" message="Try a different search term or category." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {visible.map((h, i) => (
            <TravelHackCard key={h.id} hack={h} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
