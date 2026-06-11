import { motion } from 'framer-motion'
import SectionWrapper, { staggerContainer, fadeUp } from '../components/SectionWrapper'
import type { Education as EducationType } from '../types/database'

export default function Education({ education }: { education: EducationType[] }) {
  return (
    <SectionWrapper id="education" kicker="Chapter 06" title="Education">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid md:grid-cols-2 gap-6"
      >
        {education.map((ed) => (
          <motion.div
            key={ed.id}
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-7 hover:border-voltage/30 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="font-display text-lg sm:text-xl text-mist">{ed.institution}</h3>
              <span className="font-mono text-xs text-ember">
                {ed.start_year} — {ed.end_year ?? 'Present'}
              </span>
            </div>
            <p className="text-voltage text-sm mt-2">
              {ed.degree}, {ed.field}
            </p>
            <p className="text-xs text-ash mt-1">{ed.location}</p>
            {ed.description && <p className="text-sm text-ash mt-3">{ed.description}</p>}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
