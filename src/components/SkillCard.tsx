import { motion } from 'framer-motion'
import type { Skill } from '../types/database'
import { fadeUp } from './SectionWrapper'

/** Abstract energy glyphs per category — original symbols, no logos. */
const CATEGORY_GLYPHS: Record<string, string> = {
  'Data Engineering': '⛁',
  'Cloud & DevOps': '☁',
  'AI / ML': '◈',
  'BI & Analytics': '◫',
  Programming: '⌬',
  Databases: '⛃',
  Tools: '⚙',
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.045, y: -3, boxShadow: '0 0 24px rgba(56,189,248,0.18)' }}
      className="glass-panel px-4 py-3 flex items-center gap-3 group cursor-default relative overflow-hidden"
    >
      {/* Energy pulse on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(220px circle at 20% 50%, rgba(56,189,248,0.10), transparent 60%)' }}
      />
      <span
        aria-hidden="true"
        className="text-voltage/70 group-hover:text-voltage group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] transition-all duration-300 text-base shrink-0"
      >
        {CATEGORY_GLYPHS[skill.category] ?? '◇'}
      </span>
      <span className="text-sm sm:text-[15px] text-mist group-hover:text-white transition-colors flex-1 relative">
        {skill.name}
        {skill.is_featured && <span className="ml-2 text-ember" aria-label="featured skill">★</span>}
      </span>
      <div className="w-20 sm:w-24 h-1.5 rounded-full bg-white/10 overflow-hidden shrink-0 relative" aria-hidden="true">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency_level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-voltage to-royal group-hover:from-ember group-hover:to-crimson transition-colors duration-500"
        />
      </div>
    </motion.div>
  )
}
