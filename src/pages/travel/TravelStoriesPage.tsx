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
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-ember mb-3">Journey Logs</p>
        <h1 className="font-display text-3xl sm:text-5xl text-mist tracking-wide">Travel Stories</h1>
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
