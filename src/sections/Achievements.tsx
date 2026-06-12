import { motion } from 'framer-motion'
import SectionWrapper, { staggerContainer, fadeUp } from '../components/SectionWrapper'
import EnergyVortex from '../components/effects/EnergyVortex'
import type { Achievement } from '../types/database'

/** Gold laurel medallion — original SVG, no emoji. */
function LaurelMedal() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="13" r="7" stroke="#e8c97a" strokeWidth="1.6" />
      <path d="M16 8.5l1.2 2.4 2.6.4-1.9 1.9.4 2.6L16 14.6l-2.3 1.2.4-2.6-1.9-1.9 2.6-.4L16 8.5z" fill="#c9a84c" />
      <path d="M6 14c0 7 4 11 7 12M26 14c0 7-4 11-7 12" stroke="#7a6130" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 18.5l-2 .6M9 22l-1.8 1.2M11.5 24.8L10.4 26.6M24.5 18.5l2 .6M23 22l1.8 1.2M20.5 24.8l1.1 1.8" stroke="#7a6130" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Hall of Honors: unlocked gold trophies with shine sweeps. */
export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null
  return (
    <SectionWrapper id="achievements" kicker="Chapter V" title="Hall of Honors">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <EnergyVortex size={700} intensity={0.2} />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="relative grid sm:grid-cols-2 gap-6"
      >
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: '0 0 36px rgba(201,168,76,0.18)' }}
            className="royal-border glass-panel badge-shine-host p-6 flex gap-5 items-start"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 + i * 0.12 }}
              className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center border border-gold/50 bg-gradient-to-b from-gold/15 to-transparent shadow-[0_0_18px_rgba(201,168,76,0.3)] animate-glow-pulse"
            >
              <LaurelMedal />
            </motion.span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-1">
                Honor Unlocked
              </p>
              <h3 className="font-display text-lg text-mist">{a.title}</h3>
              <p className="text-xs font-mono text-gold-light tracking-wider mt-1">{a.issuer}</p>
              <p className="text-sm text-ash mt-2 leading-relaxed">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
