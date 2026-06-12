import { motion } from 'framer-motion'
import type { Skill } from '../types/database'
import { fadeUp } from './SectionWrapper'

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(201,168,76,0.12)' }}
      className="glass-panel px-4 py-3 flex items-center gap-3 group cursor-default relative overflow-hidden border-white/5 hover:border-gold/30 transition-colors duration-300"
    >
      {/* Frost-to-fire pulse on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(220px circle at 15% 50%, rgba(201,168,76,0.08), transparent 60%)' }}
      />
      <svg
        width="10"
        height="10"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
      >
        <path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" />
      </svg>
      <span className="text-sm sm:text-[15px] text-parchment/80 group-hover:text-parchment transition-colors flex-1 relative">
        {skill.name}
        {skill.is_featured && (
          <span className="ml-2 text-gold" aria-label="featured skill">
            ★
          </span>
        )}
      </span>
      <div className="w-20 sm:w-24 h-1.5 rounded-full bg-white/10 overflow-hidden shrink-0 relative" aria-hidden="true">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency_level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-voltage via-gold to-ember"
        />
      </div>
    </motion.div>
  )
}
