interface EmptyStateProps {
  title?: string
  message?: string
}

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'New adventures are loading onto this part of the galaxy — check back soon.',
}: EmptyStateProps) {
  return (
    <div className="glass-panel p-10 text-center">
      <p aria-hidden="true" className="text-4xl mb-4 opacity-60">🌌</p>
      <h3 className="font-display text-xl text-mist mb-2">{title}</h3>
      <p className="text-sm text-ash max-w-md mx-auto">{message}</p>
    </div>
  )
}
