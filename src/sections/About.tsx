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
    <SectionWrapper id="about" kicker="Chapter 01" title="About Me">
      <div className="grid md:grid-cols-5 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3"
        >
          <p className="text-ash leading-[1.9] text-[15px] sm:text-base whitespace-pre-line">{profile.about_text}</p>
        </motion.div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-5 text-center hover:border-voltage/30 transition-colors"
            >
              <p className="font-display text-2xl sm:text-3xl gradient-text">{h.value}</p>
              <p className="text-xs text-ash mt-2 leading-snug">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
