interface FloatingPlanetProps {
  size?: number
  className?: string
  /** Two CSS colors for the planet surface gradient. */
  colors?: [string, string]
  ringed?: boolean
}

/** Original CSS planet — glowing sphere with optional orbital ring. */
export default function FloatingPlanet({
  size = 90,
  className = '',
  colors = ['#f59e0b', '#e3344e'],
  ringed = true,
}: FloatingPlanetProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none animate-float-slow ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 30%, ${colors[0]}, ${colors[1]} 70%)`,
          boxShadow: `0 0 ${size / 3}px ${colors[0]}55, inset -${size / 8}px -${size / 10}px ${size / 4}px rgba(0,0,0,0.55)`,
        }}
      />
      {ringed && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
          style={{
            width: size * 1.7,
            height: size * 0.5,
            borderColor: `${colors[0]}66`,
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            boxShadow: `0 0 10px ${colors[0]}33`,
          }}
        />
      )}
    </div>
  )
}
