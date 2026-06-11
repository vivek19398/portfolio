import { motion } from 'framer-motion'
import SectionWrapper, { staggerContainer, fadeUp } from '../components/SectionWrapper'
import EnergyVortex from '../components/effects/EnergyVortex'
import type { Achievement } from '../types/database'

/** Unlocked-trophy badge wall with shine sweeps and glow pulses. */
export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null
  return (
    <SectionWrapper id="achievements" kicker="Chapter 05" title="Recognitions">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <EnergyVortex size={700} intensity={0.25} />
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
            whileHover={{ scale: 1.03, y: -4, boxShadow: '0 0 36px rgba(245,158,11,0.18)' }}
            className="neon-border glass-panel badge-shine-host p-6 flex gap-5 items-start"
          >
            {/* Trophy medallion that "unlocks" on reveal */}
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 + i * 0.12 }}
              className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl border border-ember/50 bg-gradient-to-b from-ember/20 to-transparent shadow-[0_0_18px_rgba(245,158,11,0.35)] animate-glow-pulse"
            >
              🏆
            </motion.span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember/80 mb-1">
                Badge Unlocked
              </p>
              <h3 className="font-display text-lg text-mist">{a.title}</h3>
              <p className="text-xs font-mono text-ember tracking-wider mt-1">{a.issuer}</p>
              <p className="text-sm text-ash mt-2 leading-relaxed">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
