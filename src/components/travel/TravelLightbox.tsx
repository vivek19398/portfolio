import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TravelMedia } from '../../types/travel'
import CoverImage from './CoverImage'

interface TravelLightboxProps {
  media: TravelMedia[]
  index: number | null
  onClose: () => void
  onNavigate: (next: number) => void
}

/**
 * Modal viewer: full media only loads here (thumbnails everywhere else).
 * Videos use controls + metadata preload — never autoplay. Keyboard:
 * Esc closes, arrows navigate.
 */
export default function TravelLightbox({ media, index, onClose, onNavigate }: TravelLightboxProps) {
  const item = index !== null ? media[index] : null

  const prev = useCallback(() => {
    if (index !== null && media.length > 0) onNavigate((index - 1 + media.length) % media.length)
  }, [index, media.length, onNavigate])
  const next = useCallback(() => {
    if (index !== null && media.length > 0) onNavigate((index + 1) % media.length)
  }, [index, media.length, onNavigate])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, prev, next])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-void/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.figure
            role="dialog"
            aria-modal="true"
            aria-label={item.title || 'Travel media'}
            initial={{ scale: 0.92, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[88vh] flex flex-col royal-border glass-panel overflow-hidden"
          >
            <div className="relative bg-black/40 flex items-center justify-center min-h-[240px] max-h-[62vh] overflow-hidden">
              {item.media_type === 'video' && item.public_url ? (
                <video
                  key={item.id}
                  src={item.public_url}
                  poster={item.thumbnail_url ?? undefined}
                  controls
                  preload="metadata"
                  playsInline
                  className="max-h-[62vh] w-full object-contain"
                />
              ) : (
                <CoverImage
                  src={item.public_url || item.thumbnail_url}
                  alt={item.alt_text || item.title}
                  fallbackGlyph={item.media_type === 'video' ? '🎬' : '📷'}
                  className="max-h-[62vh] w-full !object-contain min-h-[240px]"
                />
              )}

              {media.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous media"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-void/60 backdrop-blur-sm border border-white/20 text-mist hover:border-gold/60 hover:text-gold-light transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next media"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-void/60 backdrop-blur-sm border border-white/20 text-mist hover:border-gold/60 hover:text-gold-light transition-colors"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <figcaption className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {item.title && <h3 className="font-display text-lg text-mist">{item.title}</h3>}
                  {item.caption && <p className="text-sm text-ash mt-1 leading-relaxed">{item.caption}</p>}
                  <p className="text-xs text-ash mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {item.location_name && <span>◎ {item.location_name}</span>}
                    {(item.city || item.country) && (
                      <span>{[item.city, item.country].filter(Boolean).join(', ')}</span>
                    )}
                    {item.created_at && (
                      <span>{new Date(item.created_at).toLocaleDateString('en-IE', { month: 'short', year: 'numeric' })}</span>
                    )}
                  </p>
                  {item.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Tags">
                      {item.tags.map((t) => (
                        <li key={t} className="text-[10px] font-mono text-gold-light bg-gold/10 border border-gold/30 rounded-md px-2 py-0.5">
                          #{t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close viewer"
                  className="shrink-0 w-9 h-9 rounded-lg border border-white/15 text-ash hover:text-mist hover:border-crimson/50 transition-colors"
                >
                  ✕
                </button>
              </div>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
