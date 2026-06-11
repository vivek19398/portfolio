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
 * Parallax travel banner — warm cosmic explorer energy.
 * The hero is the first viewport of the page, so plain window scroll
 * (0 → one viewport) drives the parallax without element tracking.
 */
export default function TravelHero() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const yGlow = useTransform(scrollY, [0, vh], ['0%', '35%'])
  const yText = useTransform(scrollY, [0, vh], ['0%', '60%'])
  const opacity = useTransform(scrollY, [0, vh * 0.8], [1, 0])

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Warm nebula glow with parallax */}
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: yGlow }}>
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(ellipse, rgba(245,158,11,0.35) 0%, rgba(227,52,78,0.18) 45%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
        <FloatingPlanet className="top-[18%] right-[12%] opacity-70" size={64} colors={['#f59e0b', '#8f1d30']} />
        <FloatingPlanet className="bottom-[22%] left-[10%] opacity-50" size={40} colors={['#38bdf8', '#0c4a6e']} ringed={false} />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: yText, opacity }}
        className="relative z-10 text-center max-w-3xl mx-auto px-5 pt-24 pb-16"
      >
        <motion.p variants={item} className="font-mono text-xs sm:text-sm tracking-[0.45em] uppercase text-ember mb-6">
          Universe 02 · The Explorer Log
        </motion.p>
        <motion.h1 variants={item} className="font-display text-4xl sm:text-6xl md:text-7xl text-mist tracking-wide leading-[1.08] mb-6">
          Travel{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-ember via-crimson to-royal drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            Galaxy
          </span>
        </motion.h1>
        <motion.p variants={item} className="text-base sm:text-lg text-ash leading-relaxed max-w-xl mx-auto mb-10">
          Journeys, photographs, field-tested travel hacks, and personal writing —
          one orbit at a time.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/travel/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-ember to-crimson text-white shadow-lg shadow-ember/25 transition-transform duration-200 hover:scale-[1.04]"
          >
            ✦ Explore Gallery
          </Link>
          <Link
            to="/travel/stories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold border border-ember/40 text-ember bg-ember/5 hover:bg-ember/15 transition-all duration-200 hover:scale-[1.04]"
          >
            Read Stories
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
