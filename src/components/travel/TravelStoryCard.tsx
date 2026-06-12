import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { TravelStory } from '../../types/travel'
import CoverImage from './CoverImage'

export default function TravelStoryCard({ story, index = 0 }: { story: TravelStory; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="royal-border glass-panel overflow-hidden img-zoom group flex flex-col"
    >
      <div className="relative h-48">
        <CoverImage src={story.cover_image_url} alt={story.title} className="w-full h-full" fallbackGlyph="📖" />
        {story.is_featured && (
          <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest bg-void/70 backdrop-blur-sm text-gold-light border border-gold/50 rounded-full px-2.5 py-1">
            Featured
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold mb-2">
          {story.travel_date
            ? new Date(story.travel_date).toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })
            : 'Travel Story'}
          {' · '}
          {story.reading_time} min read
        </p>
        <h3 className="font-display text-lg text-mist group-hover:text-gold-light transition-colors">{story.title}</h3>
        <p className="text-sm text-ash mt-2 leading-relaxed line-clamp-3 flex-1">{story.excerpt}</p>
        {story.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Tags">
            {story.tags.slice(0, 4).map((t) => (
              <li key={t} className="text-[10px] font-mono text-ash bg-white/5 border border-white/10 rounded-md px-2 py-0.5">
                #{t}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={`/travel/stories/${story.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors"
        >
          Read story →
        </Link>
      </div>
    </motion.article>
  )
}
