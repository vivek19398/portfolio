/** Shimmer placeholder tiles shown while travel media loads. */
export default function MediaSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="status" aria-label="Loading media">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-gradient-to-r from-panel via-white/10 to-panel bg-[length:200%_100%] animate-shimmer"
          style={{ height: 140 + (i % 3) * 40 }}
        />
      ))}
    </div>
  )
}
