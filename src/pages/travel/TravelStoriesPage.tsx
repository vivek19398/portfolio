import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TravelStoryCard from '../../components/travel/TravelStoryCard'
import EmptyState from '../../components/travel/EmptyState'
import MediaSkeleton from '../../components/travel/MediaSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getTravelStories } from '../../lib/travelQueries'
import type { TravelStory } from '../../types/travel'

export default function TravelStoriesPage() {
  usePageMeta(
    'Travel Stories — Vivek Ranjan',
    'Long-form travel stories and journey logs from destinations around the world.',
  )
  const [stories, setStories] = useState<TravelStory[] | null>(null)

  useEffect(() => {
    getTravelStories().then(setStories)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mb-3 flex items-center gap-2.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0"><path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" /></svg>Journey Logs</p>
        <h1 className="font-display text-3xl sm:text-5xl tracking-wide"><span className="gold-text">Travel Stories</span></h1>
      </motion.header>

      {stories === null ? (
        <MediaSkeleton count={3} />
      ) : stories.length === 0 ? (
        <EmptyState title="No stories yet" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <TravelStoryCard key={s.id} story={s} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
