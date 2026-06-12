import { motion } from 'framer-motion'
import SectionWrapper, { staggerContainer, fadeUp } from '../components/SectionWrapper'
import type { Education as EducationType } from '../types/database'

/** Wax-seal style archive mark — original SVG. */
function ArchiveSeal() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="18" cy="18" r="15" stroke="#c9a84c" strokeWidth="1.4" />
      <circle cx="18" cy="18" r="11" stroke="#7a6130" strokeWidth="1" strokeDasharray="2.5 3" />
      <path d="M18 10l2 5 5.3.5-4 3.5 1.2 5.2L18 21.4l-4.5 2.8 1.2-5.2-4-3.5 5.3-.5 2-5z" fill="#c9a84c" fillOpacity="0.85" />
    </svg>
  )
}

/** Royal archive: academic records as illuminated ledger entries. */
export default function Education({ education }: { education: EducationType[] }) {
  return (
    <SectionWrapper id="education" kicker="Chapter VI" title="The Royal Archive">
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
            whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(201,168,76,0.12)' }}
            className="royal-border glass-panel relative p-7 overflow-hidden"
          >
            <span aria-hidden="true" className="grain-overlay" />
            <div className="relative flex items-start gap-4">
              <ArchiveSeal />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="font-display text-lg sm:text-xl text-parchment">{ed.institution}</h3>
                  <span className="font-mono text-xs text-gold-light tracking-wider">
                    {ed.start_year} — {ed.end_year ?? 'Present'}
                  </span>
                </div>
                <p className="text-gold text-sm mt-2 font-medium">
                  {ed.degree}, {ed.field}
                </p>
                <p className="text-xs text-ash mt-1">{ed.location}</p>
                {ed.description && (
                  <p className="text-sm text-parchment/55 mt-3 italic border-l border-gold/30 pl-3">
                    {ed.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
