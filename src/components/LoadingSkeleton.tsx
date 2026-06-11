interface LoadingSkeletonProps {
  lines?: number
  className?: string
}

export default function LoadingSkeleton({ lines = 3, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-gradient-to-r from-panel via-white/10 to-panel bg-[length:200%_100%] animate-shimmer"
          style={{ width: `${85 - i * 12}%` }}
        />
      ))}
    </div>
  )
}
