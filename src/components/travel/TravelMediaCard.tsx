import { motion } from 'framer-motion'
import type { TravelMedia } from '../../types/travel'
import CoverImage from './CoverImage'

/**
 * Masonry tile: shows the thumbnail (never the full asset) with a hover
 * zoom + caption veil; videos get a play badge and only ever load in
 * the lightbox.
 */
export default function TravelMediaCard({
  media,
  onOpen,
  index,
}: {
  media: TravelMedia
  onOpen: () => void
  index: number
}) {
  const preview = media.thumbnail_url || (media.media_type === 'image' ? media.public_url : null)
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full mb-3 break-inside-avoid img-zoom rounded-xl overflow-hidden group focus-visible:ring-2 focus-visible:ring-ember"
      aria-label={`Open ${media.title || media.alt_text || 'travel media'}`}
    >
      {preview ? (
        <CoverImage src={preview} alt={media.alt_text || media.title} className="w-full" />
      ) : (
        // Placeholder tile with a varied fixed height so masonry stays organic
        <div style={{ height: 150 + ((index * 53) % 110) }}>
          <CoverImage
            src={null}
            alt={media.alt_text || media.title}
            fallbackGlyph={media.media_type === 'video' ? '🎬' : '📷'}
            className="w-full h-full"
          />
        </div>
      )}

      {media.media_type === 'video' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="w-12 h-12 rounded-full bg-void/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-mist text-lg shadow-[0_0_18px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
            ▶
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-3 text-left bg-gradient-to-t from-void/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="block text-xs text-mist font-medium truncate">{media.title || media.location_name}</span>
        {media.location_name && (
          <span className="block text-[10px] text-ash mt-0.5">◎ {media.location_name}</span>
        )}
      </span>
    </motion.button>
  )
}
