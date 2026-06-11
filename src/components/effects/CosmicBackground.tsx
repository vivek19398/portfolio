import StarfieldParallax from './StarfieldParallax'

/**
 * Full-page cosmic atmosphere: parallax starfield + slow-breathing
 * nebula glows. The nebulae are pure CSS (GPU-composited transforms
 * and opacity only) so the whole background costs one canvas + three
 * blurred divs.
 */
export default function CosmicBackground() {
  return (
    <>
      <StarfieldParallax />
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] left-[10%] w-[60vw] h-[60vw] rounded-full opacity-25 animate-nebula-drift"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0.05) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full opacity-20 animate-nebula-drift-slow"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.06) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-15 animate-nebula-drift"
          style={{
            background: 'radial-gradient(circle, rgba(227,52,78,0.35) 0%, rgba(227,52,78,0.05) 45%, transparent 70%)',
            filter: 'blur(70px)',
            animationDelay: '-12s',
          }}
        />
      </div>
    </>
  )
}
