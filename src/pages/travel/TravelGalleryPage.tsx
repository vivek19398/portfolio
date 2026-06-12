import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import TravelMasonryGrid from '../../components/travel/TravelMasonryGrid'
import TravelLightbox from '../../components/travel/TravelLightbox'
import DestinationFilter from '../../components/travel/DestinationFilter'
import MediaSkeleton from '../../components/travel/MediaSkeleton'
import EmptyState from '../../components/travel/EmptyState'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getTravelDestinations, getTravelMedia } from '../../lib/travelQueries'
import type { TravelDestination, TravelMedia } from '../../types/travel'

/**
 * Instagram-style gallery: masonry grid, destination filters, paged
 * loading (auto-extends near the bottom via IntersectionObserver),
 * thumbnails in grid, full media only inside the lightbox.
 */
export default function TravelGalleryPage() {
  usePageMeta(
    'Travel Gallery — Vivek Ranjan',
    'A visual journey: travel photography and short clips from destinations around the world, served from compressed, optimized media.',
  )
  const [params, setParams] = useSearchParams()
  const destinationId = params.get('destination')

  const [destinations, setDestinations] = useState<TravelDestination[]>([])
  const [media, setMedia] = useState<TravelMedia[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    getTravelDestinations().then(setDestinations)
  }, [])

  // Reset and load first page whenever the filter changes.
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setMedia([])
    setPage(0)
    getTravelMedia({ page: 0, destinationId }).then(({ items, hasMore: more }) => {
      if (cancelled) return
      setMedia(items)
      setHasMore(more)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [destinationId])

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    const nextPage = page + 1
    const { items, hasMore: more } = await getTravelMedia({ page: nextPage, destinationId })
    setMedia((prev) => [...prev, ...items])
    setPage(nextPage)
    setHasMore(more)
    loadingRef.current = false
  }, [page, hasMore, destinationId])

  // Infinite scroll sentinel.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) void loadMore()
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore, hasMore])

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mb-3 flex items-center gap-2.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0"><path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" /></svg>The Visual Log</p>
        <h1 className="font-display text-3xl sm:text-5xl tracking-wide mb-6"><span className="gold-text">Gallery</span></h1>
        <DestinationFilter
          destinations={destinations}
          selected={destinationId}
          onSelect={(id) => setParams(id ? { destination: id } : {})}
        />
      </motion.header>

      {loading ? (
        <MediaSkeleton count={9} />
      ) : media.length === 0 ? (
        <EmptyState
          title="No media for this destination yet"
          message="Photos will appear here once uploaded to Supabase Storage and registered in the travel_media table."
        />
      ) : (
        <>
          <TravelMasonryGrid media={media} onOpen={setLightbox} />
          {hasMore && (
            <div ref={sentinelRef} className="py-10 flex justify-center">
              <button
                onClick={() => void loadMore()}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold border border-gold/40 text-gold-light bg-gold/5 hover:bg-gold/15 hover:border-gold/70 transition-all cursor-pointer"
              >
                Load more
              </button>
            </div>
          )}
          <TravelLightbox media={media} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
        </>
      )}
    </div>
  )
}
