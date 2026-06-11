export type PortalVariant = 'work' | 'travel'

const VARIANT_COLORS: Record<PortalVariant, { a: string; b: string; c: string }> = {
  work: { a: 'rgba(56,189,248,0.55)', b: 'rgba(168,85,247,0.45)', c: 'rgba(231,233,242,0.25)' },
  travel: { a: 'rgba(245,158,11,0.55)', b: 'rgba(227,52,78,0.45)', c: 'rgba(255,237,213,0.25)' },
}

/**
 * The swirling portal mouth: counter-rotating conic rings collapsing
 * toward a bright event horizon. Pure CSS transforms.
 */
export default function WormholePortal({ variant, className = '' }: { variant: PortalVariant; className?: string }) {
  const { a, b, c } = VARIANT_COLORS[variant]
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <div
        className="absolute inset-0 rounded-full animate-vortex-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${a} 18%, transparent 40%, ${b} 62%, transparent 85%)`,
          filter: 'blur(10px)',
        }}
      />
      <div
        className="absolute inset-[14%] rounded-full animate-vortex-spin-reverse"
        style={{
          background: `conic-gradient(from 160deg, transparent 0%, ${b} 25%, transparent 50%, ${a} 75%, transparent 100%)`,
          filter: 'blur(7px)',
        }}
      />
      <div
        className="absolute inset-[30%] rounded-full animate-vortex-spin-fast"
        style={{
          background: `conic-gradient(from 80deg, transparent 0%, ${c} 30%, transparent 55%, ${b} 80%, transparent 100%)`,
          filter: 'blur(4px)',
        }}
      />
      {/* Event horizon */}
      <div
        className="absolute inset-[42%] rounded-full animate-glow-pulse"
        style={{
          background: `radial-gradient(circle, ${c} 0%, ${a} 40%, transparent 75%)`,
          boxShadow: `0 0 30px ${a}`,
        }}
      />
    </div>
  )
}
