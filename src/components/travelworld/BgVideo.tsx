interface BgVideoProps {
  src: string
  poster: string
  className?: string
  objectPosition?: string
}

/**
 * Muted, looping background video (cover-fit). Under prefers-reduced-motion
 * it renders the still poster instead — no autoplay, no decode cost.
 * Real trip footage lives in /public/journey; swap the files to change it.
 */
export default function BgVideo({ src, poster, className = '', objectPosition = 'center' }: BgVideoProps) {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    return (
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`w-full h-full object-cover ${className}`}
        style={{ objectPosition }}
      />
    )
  }

  return (
    <video
      className={`w-full h-full object-cover ${className}`}
      style={{ objectPosition }}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  )
}
