import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingPlanet from '../gateway/FloatingPlanet'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Royal explorer's chronicle hero — molten-gold title over warm fire
 * nebulae with film grain and vignette, parallax-driven by window
 * scroll (hero is the first viewport of the page).
 */
export default function TravelHero() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const yGlow = useTransform(scrollY, [0, vh], ['0%', '35%'])
  const yText = useTransform(scrollY, [0, vh], ['0%', '60%'])
  const opacity = useTransform(scrollY, [0, vh * 0.8], [1, 0])

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Warm fire nebula with parallax */}
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: yGlow }}>
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(ellipse, rgba(201,168,76,0.32) 0%, rgba(227,52,78,0.16) 45%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
        <FloatingPlanet className="top-[18%] right-[12%] opacity-70" size={64} colors={['#e8c97a', '#8f1d30']} />
        <FloatingPlanet className="bottom-[22%] left-[10%] opacity-50" size={40} colors={['#38bdf8', '#0c4a6e']} ringed={false} />
      </motion.div>

      {/* Cinematic texture */}
      <span aria-hidden="true" className="grain-overlay z-[5]" />
      <span aria-hidden="true" className="vignette-overlay z-[4]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: yText, opacity }}
        className="relative z-10 text-center max-w-3xl mx-auto px-5 pt-24 pb-16"
      >
        <motion.p variants={item} className="font-mono text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-8">
          Universe 02 · The Explorer's Chronicle
        </motion.p>
        <motion.h1 variants={item} className="font-display text-4xl sm:text-6xl md:text-7xl tracking-[0.06em] leading-[1.08] mb-6">
          <span className="gold-text drop-shadow-[0_0_35px_rgba(201,168,76,0.25)]">TRAVEL GALAXY</span>
        </motion.h1>

        <motion.div variants={item} className="ornament-rule max-w-md mx-auto mb-8" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" />
          </svg>
        </motion.div>

        <motion.p variants={item} className="text-base sm:text-lg text-parchment/70 leading-relaxed max-w-xl mx-auto mb-12">
          Journeys, photographs, field-tested travel hacks, and personal writing —
          one expedition at a time.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/travel/gallery" className="btn-royal w-full sm:w-auto">
            Explore Gallery
          </Link>
          <Link
            to="/travel/stories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold border border-gold/40 text-gold-light bg-gold/5 hover:bg-gold/15 hover:border-gold/70 transition-all duration-200"
          >
            Read Stories
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
