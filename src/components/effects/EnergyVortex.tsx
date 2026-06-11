interface EnergyVortexProps {
  /** Diameter in px (CSS scales it responsively via max-width). */
  size?: number
  className?: string
  /** 0..1 overall strength of the effect. */
  intensity?: number
}

/**
 * Rotating energy vortex built from layered conic gradients —
 * pure CSS transforms (GPU-only), no canvas, no JS per frame.
 * Place inside a relatively-positioned parent; it self-centers.
 */
export default function EnergyVortex({ size = 640, className = '', intensity = 1 }: EnergyVortexProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}
      style={{ width: size, height: size, maxWidth: '95vw', maxHeight: '95vw', opacity: intensity }}
    >
      {/* Outer slow ring */}
      <div
        className="absolute inset-0 rounded-full animate-vortex-spin"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(56,189,248,0.20) 12%, transparent 28%, rgba(168,85,247,0.16) 46%, transparent 60%, rgba(227,52,78,0.14) 78%, transparent 95%)',
          filter: 'blur(18px)',
        }}
      />
      {/* Mid counter-rotating ring */}
      <div
        className="absolute inset-[12%] rounded-full animate-vortex-spin-reverse"
        style={{
          background:
            'conic-gradient(from 120deg, transparent 0%, rgba(245,158,11,0.18) 18%, transparent 35%, rgba(56,189,248,0.18) 58%, transparent 75%)',
          filter: 'blur(14px)',
        }}
      />
      {/* Inner fast core */}
      <div
        className="absolute inset-[28%] rounded-full animate-vortex-spin-fast"
        style={{
          background:
            'conic-gradient(from 240deg, transparent 0%, rgba(168,85,247,0.22) 25%, transparent 50%, rgba(56,189,248,0.22) 72%, transparent 95%)',
          filter: 'blur(10px)',
        }}
      />
      {/* Sharp spiral filaments */}
      <div
        className="absolute inset-[6%] rounded-full animate-vortex-spin"
        style={{
          background:
            'repeating-conic-gradient(from 0deg, transparent 0deg 28deg, rgba(231,233,242,0.045) 30deg 32deg)',
          maskImage: 'radial-gradient(circle, transparent 30%, black 55%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 55%, transparent 72%)',
        }}
      />
      {/* Calm glowing eye */}
      <div
        className="absolute inset-[38%] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
