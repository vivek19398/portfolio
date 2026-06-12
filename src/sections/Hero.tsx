import { motion } from 'framer-motion'
import type { Profile } from '../types/database'
import { trackEvent } from '../hooks/useAnalytics'
import EnergyVortex from '../components/effects/EnergyVortex'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
}
const item = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Royal cinematic hero: frost (icy blue, upper-left) against fire
 * (ember/crimson, lower-right) with a molten-gold name at the center —
 * film grain and a vignette pull it together like a title sequence.
 */
export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Frost vs fire atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full opacity-25 animate-nebula-drift"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(14,42,72,0.15) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-[20%] -right-[12%] w-[60vw] h-[60vw] rounded-full opacity-25 animate-nebula-drift-slow"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.32) 0%, rgba(139,26,26,0.18) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Slow regal vortex, dimmed to a halo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
      >
        <div className="relative w-full h-full">
          <EnergyVortex size={780} intensity={0.55} />
        </div>
      </motion.div>

      {/* Crossing frost / fire blades on power-up */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: '-120%', opacity: 0 }}
          animate={{ x: '120%', opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.9, 0, 0.1, 1] }}
          className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-voltage to-transparent"
          style={{ transform: 'rotate(-8deg)', filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.9))' }}
        />
        <motion.div
          initial={{ x: '120%', opacity: 0 }}
          animate={{ x: '-120%', opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: 0.65, ease: [0.9, 0, 0.1, 1] }}
          className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent"
          style={{ transform: 'rotate(6deg)', filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.9))' }}
        />
      </div>

      {/* Cinematic texture */}
      <span aria-hidden="true" className="grain-overlay z-[5]" />
      <span aria-hidden="true" className="vignette-overlay z-[4]" />

      {/* Power-up flash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-parchment pointer-events-none"
        initial={{ opacity: 0.18 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center pt-20"
      >
        <motion.p variants={item} className="font-mono text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-8">
          {profile.location} · {profile.headline}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.06em] leading-[1.05] mb-6"
        >
          <span className="gold-text drop-shadow-[0_0_35px_rgba(201,168,76,0.25)]">VIVEK RANJAN</span>
        </motion.h1>

        {/* Ornamental rule */}
        <motion.div variants={item} className="ornament-rule max-w-md mx-auto mb-8" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" />
          </svg>
        </motion.div>

        <motion.p variants={item} className="text-base sm:text-xl text-parchment/75 max-w-2xl mx-auto leading-relaxed mb-12">
          {profile.short_tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="btn-royal w-full sm:w-auto">
            View Projects
          </a>
          <a
            href={profile.resume_url}
            download
            onClick={() => trackEvent('resume_download')}
            className="btn-frost w-full sm:w-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
            Download Resume
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-parchment/70 border border-gold/30 hover:border-gold/70 hover:text-gold transition-all duration-200 hover:shadow-[0_0_24px_rgba(201,168,76,0.15)]"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator — gold descent */}
        <motion.div variants={item} className="mt-16 flex justify-center">
          <a href="#about" aria-label="Scroll to About section" className="group relative block cursor-pointer">
            <motion.svg
              width="34"
              height="46"
              viewBox="0 0 34 46"
              fill="none"
              aria-hidden="true"
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <defs>
                <linearGradient id="arrow-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e8c97a" />
                  <stop offset="1" stopColor="#7a6130" />
                </linearGradient>
              </defs>
              <path d="M17 4 v26 M7 22 l10 12 10-12" stroke="url(#arrow-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.7))' }} />
              <motion.path
                d="M17 4 v26 M7 22 l10 12 10-12"
                stroke="#f5e6c8"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
