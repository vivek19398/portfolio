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
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center bg-hero-radial overflow-hidden">
      {/* Rotating energy vortex behind the hero content */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <div className="relative w-full h-full">
          <EnergyVortex size={760} intensity={0.9} />
        </div>
      </motion.div>

      {/* Energy waves pulsing out behind the name */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-voltage/25"
            style={{ width: 320, height: 320 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 2.6], opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, delay: 1 + i * 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Cinematic slash beams on power-up */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: '-120%', opacity: 0 }}
          animate={{ x: '120%', opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.9, 0, 0.1, 1] }}
          className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent"
          style={{ transform: 'rotate(-8deg)', filter: 'drop-shadow(0 0 10px rgba(227,52,78,0.9)) blur(0.4px)' }}
        />
        <motion.div
          initial={{ x: '120%', opacity: 0 }}
          animate={{ x: '-120%', opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: 0.65, ease: [0.9, 0, 0.1, 1] }}
          className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-voltage to-transparent"
          style={{ transform: 'rotate(6deg)', filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.9)) blur(0.4px)' }}
        />
      </div>

      {/* Power-up flash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center pt-20"
      >
        <motion.p variants={item} className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-voltage mb-6">
          {profile.location} · {profile.headline}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wide leading-[1.05] mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]"
        >
          <span className="hero-name-sheen">VIVEK RANJAN</span>
        </motion.h1>

        <motion.p variants={item} className="text-base sm:text-xl text-ash max-w-2xl mx-auto leading-relaxed mb-10">
          {profile.short_tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="btn-primary w-full sm:w-auto">
            View Projects
          </a>
          <a
            href={profile.resume_url}
            download
            onClick={() => trackEvent('resume_download')}
            className="btn-ghost w-full sm:w-auto"
          >
            ⤓ Download Resume
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-ash border border-white/15 hover:border-ember/50 hover:text-ember transition-all duration-200 hover:scale-[1.04]"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Energy arrow scroll indicator */}
        <motion.div variants={item} className="mt-16 flex justify-center">
          <a href="#about" aria-label="Scroll to About section" className="group relative block">
            <motion.svg
              width="34"
              height="46"
              viewBox="0 0 34 46"
              fill="none"
              aria-hidden="true"
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <defs>
                <linearGradient id="arrow-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M17 4 v26 M7 22 l10 12 10-12" stroke="url(#arrow-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.8))' }} />
              <motion.path
                d="M17 4 v26 M7 22 l10 12 10-12"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
