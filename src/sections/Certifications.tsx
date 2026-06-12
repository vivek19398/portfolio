import { motion } from 'framer-motion'
import SectionWrapper, { staggerContainer, fadeUp } from '../components/SectionWrapper'
import type { Certification } from '../types/database'

/** Renders only when certifications exist in the database. */
export default function Certifications({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null
  return (
    <SectionWrapper id="certifications" kicker="Chapter VII" title="Certifications">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {certifications.map((c) => (
          <motion.div key={c.id} variants={fadeUp} className="glass-panel p-6 hover:border-gold/30 transition-colors">
            <h3 className="text-mist font-semibold">{c.title}</h3>
            <p className="text-xs font-mono text-gold mt-1">{c.issuer}</p>
            {c.credential_url && (
              <a
                href={c.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-voltage hover:text-mist mt-3 inline-block transition-colors"
              >
                View credential ↗
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
