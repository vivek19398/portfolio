import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { TravelDestination } from '../../types/travel'
import CoverImage from './CoverImage'

/** Floating destination cards for featured trips. */
export default function FeaturedTrips({ destinations }: { destinations: TravelDestination[] }) {
  const featured = destinations.filter((d) => d.is_featured)
  const list = featured.length > 0 ? featured : destinations.slice(0, 3)
  if (list.length === 0) return null

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((d, i) => (
        <motion.article
          key={d.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, boxShadow: '0 16px 50px rgba(201,168,76,0.16)' }}
          className="royal-border glass-panel overflow-hidden img-zoom group"
        >
          <div className="relative h-44">
            <CoverImage src={d.cover_image_url} alt={d.title} className="w-full h-full" fallbackGlyph="🏔" />
            <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest bg-void/70 backdrop-blur-sm text-gold-light border border-gold/40 rounded-full px-2.5 py-1">
              {d.country}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg text-mist group-hover:text-gold-light transition-colors">{d.title}</h3>
            <p className="text-xs text-ash mt-0.5">
              {[d.city, d.region].filter(Boolean).join(' · ')}
            </p>
            <p className="text-sm text-ash mt-3 leading-relaxed line-clamp-3">{d.description}</p>
            <Link
              to={`/travel/gallery?destination=${d.id}`}
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors"
            >
              View photos →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
