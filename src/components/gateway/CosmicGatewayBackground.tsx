import CosmicBackground from '../effects/CosmicBackground'
import FloatingPlanet from './FloatingPlanet'

/**
 * Gateway atmosphere: the shared starfield + nebulae, plus drifting
 * planets and a central gravitational glow that separates the two
 * portal lanes.
 */
export default function CosmicGatewayBackground() {
  return (
    <>
      <CosmicBackground />
      <div aria-hidden="true" className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden">
        <FloatingPlanet className="top-[12%] left-[6%] opacity-60" size={70} colors={['#38bdf8', '#0c4a6e']} />
        <FloatingPlanet
          className="bottom-[14%] right-[8%] opacity-60"
          size={95}
          colors={['#f59e0b', '#8f1d30']}
        />
        <FloatingPlanet
          className="top-[16%] right-[22%] opacity-40"
          size={36}
          colors={['#a855f7', '#581c87']}
          ringed={false}
        />
        {/* Gravitational lens glow between the portals */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full animate-glow-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(231,233,242,0.05) 0%, rgba(56,189,248,0.04) 35%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
    </>
  )
}
