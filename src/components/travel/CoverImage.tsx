interface CoverImageProps {
  src: string | null
  alt: string
  className?: string
  /** Shown in the gradient placeholder when no image exists. */
  fallbackGlyph?: string
}

/**
 * Lazy travel image with an elegant cosmic-gradient placeholder when the
 * URL is missing (fallback/sample content). Real images come from
 * Supabase Storage public URLs only.
 */
export default function CoverImage({ src, alt, className = '', fallbackGlyph = '✈' }: CoverImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-royal-dim/60 via-charcoal to-voltage-dim/50 ${className}`}
      >
        <span aria-hidden="true" className="text-3xl opacity-50 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
          {fallbackGlyph}
        </span>
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`object-cover ${className}`} />
}
