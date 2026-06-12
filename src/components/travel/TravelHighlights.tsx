import { motion } from 'framer-motion'
import type { TravelHighlight } from '../../types/travel'
import CoverImage from './CoverImage'

/** Instagram-highlight style story circles with rotating energy rings. */
export default function TravelHighlights({
  highlights,
  onSelect,
}: {
  highlights: TravelHighlight[]
  onSelect?: (destinationId: string | null) => void
}) {
  if (highlights.length === 0) return null
  return (
    <div className="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1" role="list" aria-label="Travel highlights">
      {highlights.map((h, i) => (
        <motion.button
          key={h.id}
          role="listitem"
          type="button"
          onClick={() => onSelect?.(h.destination_id)}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.08 }}
          className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer"
        >
          <span className="story-ring block w-16 h-16 sm:w-20 sm:h-20">
            <CoverImage
              src={h.cover_image_url}
              alt={h.title}
              fallbackGlyph="🌍"
              className="w-full h-full rounded-full border-2 border-void"
            />
          </span>
          <span className="text-xs text-parchment/60 group-hover:text-gold-light transition-colors">{h.title}</span>
        </motion.button>
      ))}
    </div>
  )
}
