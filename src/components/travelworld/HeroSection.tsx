import { motion } from 'framer-motion'

const float = (delay: number, dist = 14) => ({
  animate: { y: [0, -dist, 0], rotate: [0, 2, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' as const, delay },
})

/** Floating travel tokens — passport, ticket, suitcase (original SVG, no emoji). */
function Passport() {
  return (
    <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <rect x="6" y="6" width="108" height="138" rx="10" fill="#5a1c2a" />
      <rect x="6" y="6" width="14" height="138" rx="6" fill="#4a141f" />
      <circle cx="68" cy="58" r="24" fill="none" stroke="#e8c97a" strokeWidth="2" />
      <path d="M68 34 v48 M44 58 h48 M50 42 q18 16 0 32 M86 42 q-18 16 0 32" stroke="#e8c97a" strokeWidth="1.2" fill="none" opacity="0.8" />
      <text x="68" y="118" textAnchor="middle" fontSize="11" fontFamily="serif" fill="#e8c97a" letterSpacing="2">PASSPORT</text>
    </svg>
  )
}
function Ticket() {
  return (
    <svg viewBox="0 0 170 96" className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <path d="M8 8 H120 V40 a8 8 0 0 0 0 16 V88 H8 V56 a8 8 0 0 0 0-16 Z" fill="#0d1730" stroke="#c9a84c" strokeWidth="2" />
      <path d="M120 8 H162 V88 H120 V56 a8 8 0 0 1 0-16 Z" fill="#15203c" stroke="#c9a84c" strokeWidth="2" />
      <line x1="120" y1="14" x2="120" y2="82" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="24" y="40" fontSize="15" fontFamily="monospace" fill="#e8c97a">DUB → ∞</text>
      <text x="24" y="64" fontSize="10" fontFamily="monospace" fill="#7fb6d8">SEAT 12A · GATE 22</text>
      <text x="141" y="52" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#e8c97a" transform="rotate(90 141 52)">BOARDING</text>
    </svg>
  )
}
function Suitcase() {
  return (
    <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <rect x="44" y="10" width="32" height="26" rx="8" fill="none" stroke="#c9a84c" strokeWidth="5" />
      <rect x="16" y="34" width="88" height="86" rx="12" fill="#243042" />
      <rect x="16" y="34" width="88" height="86" rx="12" fill="none" stroke="#c9a84c" strokeWidth="2" opacity="0.6" />
      <rect x="36" y="34" width="8" height="86" fill="#c9a84c" opacity="0.5" />
      <rect x="76" y="34" width="8" height="86" fill="#c9a84c" opacity="0.5" />
      <circle cx="60" cy="60" r="9" fill="none" stroke="#e8c97a" strokeWidth="2" />
    </svg>
  )
}

/** Full-screen landing hero with floating travel tokens and a scroll cue. */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 text-center">
      <span aria-hidden="true" className="grain-overlay z-[5]" />
      <span aria-hidden="true" className="vignette-overlay z-[4]" />

      {/* Floating tokens */}
      <motion.div aria-hidden="true" className="absolute left-[12%] top-[24%] w-20 sm:w-28 z-[3]" {...float(0)}>
        <Passport />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute right-[12%] top-[30%] w-28 sm:w-40 z-[3]" {...float(1.2)}>
        <Ticket />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute left-[18%] bottom-[18%] w-20 sm:w-24 z-[3]" {...float(0.6)}>
        <Suitcase />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-6">A scroll-driven journey</p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.06em] leading-[1.04]">
          <span className="gold-text drop-shadow-[0_0_35px_rgba(201,168,76,0.25)]">TRAVEL WORLD</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-parchment/70">Scroll to begin your journey</p>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 z-10"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
          <rect x="2" y="2" width="24" height="36" rx="12" stroke="#c9a84c" strokeWidth="2" />
          <circle cx="14" cy="12" r="3" fill="#e8c97a" />
        </svg>
      </motion.div>
    </section>
  )
}
