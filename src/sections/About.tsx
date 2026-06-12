import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import type { Profile } from '../types/database'

const HIGHLIGHTS = [
  { value: '4+', label: 'Years of Engineering' },
  { value: '10M+', label: 'Patient Records Processed' },
  { value: '150+', label: 'Warehouse Tables on AWS' },
  { value: '95%', label: 'Reduction in Out-of-Policy LLM Output' },
]

export default function About({ profile }: { profile: Profile }) {
  return (
    <SectionWrapper id="about" kicker="Chapter I" title="The Story So Far">
      <div className="grid md:grid-cols-5 gap-10 items-start">
        {/* Manuscript-style story panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3 royal-border glass-panel relative p-7 sm:p-9 overflow-hidden"
        >
          <span aria-hidden="true" className="grain-overlay" />
          <p className="drop-cap relative text-parchment/70 leading-[1.95] text-[15px] sm:text-base whitespace-pre-line">
            {profile.about_text}
          </p>
        </motion.div>

        {/* Royal metric seals */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(201,168,76,0.12)' }}
              className="glass-panel p-5 text-center border-gold/15 hover:border-gold/40 transition-colors duration-300 cursor-default"
            >
              <p className="font-display text-2xl sm:text-3xl gold-text">{h.value}</p>
              <p className="text-xs text-parchment/55 mt-2 leading-snug">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
