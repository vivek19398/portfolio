import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TravelHero from '../../components/travel/TravelHero'
import TravelHighlights from '../../components/travel/TravelHighlights'
import FeaturedTrips from '../../components/travel/FeaturedTrips'
import TravelMasonryGrid from '../../components/travel/TravelMasonryGrid'
import TravelLightbox from '../../components/travel/TravelLightbox'
import TravelStoryCard from '../../components/travel/TravelStoryCard'
import TravelHackCard from '../../components/travel/TravelHackCard'
import BlogPostCard from '../../components/travel/BlogPostCard'
import MediaSkeleton from '../../components/travel/MediaSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { usePageView } from '../../hooks/useAnalytics'
import {
  getFeaturedTravelMedia,
  getPersonalBlogPosts,
  getTravelDestinations,
  getTravelHacks,
  getTravelHighlights,
  getTravelStories,
} from '../../lib/travelQueries'
import type { BlogPost, TravelDestination, TravelHack, TravelHighlight, TravelMedia, TravelStory } from '../../types/travel'

function SectionHeading({ kicker, title, link, linkLabel }: { kicker: string; title: string; link?: string; linkLabel?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-between gap-4 mb-8"
    >
      <div>
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-ember mb-2">{kicker}</p>
        <h2 className="font-display text-2xl sm:text-3xl text-mist tracking-wide">{title}</h2>
      </div>
      {link && (
        <Link to={link} className="shrink-0 text-xs font-mono uppercase tracking-wider text-ember hover:text-mist transition-colors">
          {linkLabel ?? 'View all'} →
        </Link>
      )}
    </motion.div>
  )
}

/** Travel blog home — the Travel Galaxy overview. */
export default function TravelHome() {
  usePageMeta(
    'Travel Galaxy — Vivek Ranjan',
    'Travel stories, photo galleries, field-tested travel hacks, and personal writing from Vivek Ranjan — exploring the world one orbit at a time.',
  )
  usePageView()
  const navigate = useNavigate()

  const [highlights, setHighlights] = useState<TravelHighlight[]>([])
  const [destinations, setDestinations] = useState<TravelDestination[]>([])
  const [media, setMedia] = useState<TravelMedia[] | null>(null)
  const [stories, setStories] = useState<TravelStory[]>([])
  const [hacks, setHacks] = useState<TravelHack[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      getTravelHighlights(),
      getTravelDestinations(),
      getFeaturedTravelMedia(),
      getTravelStories(),
      getTravelHacks(),
      getPersonalBlogPosts(),
    ]).then(([hl, dest, med, st, hk, bp]) => {
      if (cancelled) return
      setHighlights(hl)
      setDestinations(dest)
      setMedia(med)
      setStories(st)
      setHacks(hk)
      setPosts(bp)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <TravelHero />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-24 pb-10">
        {/* Story circles */}
        <section aria-label="Highlights">
          <TravelHighlights
            highlights={highlights}
            onSelect={(destinationId) =>
              navigate(destinationId ? `/travel/gallery?destination=${destinationId}` : '/travel/gallery')
            }
          />
        </section>

        <section aria-label="Featured trips">
          <SectionHeading kicker="Orbit 01" title="Featured Trips" link="/travel/gallery" />
          <FeaturedTrips destinations={destinations} />
        </section>

        <section aria-label="Featured photos">
          <SectionHeading kicker="Orbit 02" title="From the Lens" link="/travel/gallery" linkLabel="Full gallery" />
          {media === null ? (
            <MediaSkeleton count={6} />
          ) : (
            <>
              <TravelMasonryGrid media={media} onOpen={setLightbox} />
              <TravelLightbox media={media} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
            </>
          )}
        </section>

        <section aria-label="Travel stories">
          <SectionHeading kicker="Orbit 03" title="Travel Stories" link="/travel/stories" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 3).map((s, i) => (
              <TravelStoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>

        <section aria-label="Travel hacks">
          <SectionHeading kicker="Orbit 04" title="Travel Hacks" link="/travel/hacks" />
          <div className="grid sm:grid-cols-2 gap-6">
            {hacks.slice(0, 4).map((h, i) => (
              <TravelHackCard key={h.id} hack={h} index={i} />
            ))}
          </div>
        </section>

        <section aria-label="Personal blog">
          <SectionHeading kicker="Orbit 05" title="Personal Writing" link="/blog" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((p, i) => (
              <BlogPostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </section>

        {/* Follow / contact */}
        <motion.section
          aria-label="Follow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="neon-border glass-panel p-8 sm:p-12 text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-ember mb-3">Stay in Orbit</p>
          <h2 className="font-display text-2xl sm:text-3xl text-mist mb-4">Follow the Journey</h2>
          <p className="text-sm sm:text-base text-ash max-w-xl mx-auto mb-8">
            New destinations, photo drops, and travel hacks land here first. Say hello or follow along.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@mydomain.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-ember to-crimson text-white shadow-lg shadow-ember/25 transition-transform hover:scale-[1.04]"
            >
              ✉ Say Hello
            </a>
            <a
              href="https://linkedin.com/in/my-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold border border-ember/40 text-ember bg-ember/5 hover:bg-ember/15 transition-all hover:scale-[1.04]"
            >
              Follow on LinkedIn
            </a>
            <Link
              to="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold border border-voltage/40 text-voltage bg-voltage/5 hover:bg-voltage/15 transition-all hover:scale-[1.04]"
            >
              ⌬ Visit Work Universe
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}
