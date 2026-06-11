interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <div className="glass-panel p-8 text-center" role="alert">
      <p className="text-crimson font-semibold mb-2">⚠ {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost mt-3 text-sm">
          Try again
        </button>
      )}
    </div>
  )
}
