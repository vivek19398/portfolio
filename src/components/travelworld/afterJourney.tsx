import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FeaturedTrips from '../travel/FeaturedTrips'
import TravelMasonryGrid from '../travel/TravelMasonryGrid'
import TravelLightbox from '../travel/TravelLightbox'
import TravelHackCard from '../travel/TravelHackCard'
import BlogPostCard from '../travel/BlogPostCard'
import MediaSkeleton from '../travel/MediaSkeleton'
import {
  getFeaturedTravelMedia,
  getPersonalBlogPosts,
  getTravelDestinations,
  getTravelHacks,
} from '../../lib/travelQueries'
import type { BlogPost, TravelDestination, TravelHack, TravelMedia } from '../../types/travel'

/**
 * "After the journey" sections. These reuse the existing Supabase-backed
 * queries and card components verbatim — no backend or data-shape changes,
 * just a fresh arrangement for the Travel World landing.
 */

function Heading({ kicker, title, link }: { kicker: string; title: string; link?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-between gap-4 mb-8"
    >
      <div>
        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mb-2 flex items-center gap-2.5">
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" />
          </svg>
          {kicker}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl tracking-wide">
          <span className="gold-text">{title}</span>
        </h2>
      </div>
      {link && (
        <Link to={link} className="shrink-0 text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors">
          View all →
        </Link>
      )}
    </motion.div>
  )
}

export function DestinationCards() {
  const [destinations, setDestinations] = useState<TravelDestination[] | null>(null)
  useEffect(() => {
    getTravelDestinations().then(setDestinations)
  }, [])
  return (
    <section aria-label="Destinations">
      <Heading kicker="Touchdown" title="Where the Journey Lands" link="/travel/gallery" />
      {destinations === null ? <MediaSkeleton count={3} /> : <FeaturedTrips destinations={destinations} />}
    </section>
  )
}

export function TravelGallery() {
  const [media, setMedia] = useState<TravelMedia[] | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  useEffect(() => {
    getFeaturedTravelMedia().then(setMedia)
  }, [])
  return (
    <section aria-label="Gallery">
      <Heading kicker="The Visual Log" title="From the Lens" link="/travel/gallery" />
      {media === null ? (
        <MediaSkeleton count={6} />
      ) : (
        <>
          <TravelMasonryGrid media={media} onOpen={setLightbox} />
          <TravelLightbox media={media} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
        </>
      )}
    </section>
  )
}

export function TravelHacks() {
  const [hacks, setHacks] = useState<TravelHack[] | null>(null)
  useEffect(() => {
    getTravelHacks().then(setHacks)
  }, [])
  return (
    <section aria-label="Travel hacks">
      <Heading kicker="Field Manual" title="Travel Hacks" link="/travel/hacks" />
      {hacks === null ? (
        <MediaSkeleton count={4} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {hacks.slice(0, 4).map((h, i) => (
            <TravelHackCard key={h.id} hack={h} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  useEffect(() => {
    getPersonalBlogPosts().then(setPosts)
  }, [])
  return (
    <section aria-label="Personal blog">
      <Heading kicker="Captain's Log" title="Personal Writing" link="/blog" />
      {posts === null ? (
        <MediaSkeleton count={3} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p, i) => (
            <BlogPostCard key={p.id} post={p} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
