import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import SlashTransition from './effects/SlashTransition'
import EnergyBurst from './effects/EnergyBurst'

interface SectionWrapperProps {
  id: string
  title?: string
  kicker?: string
  children: ReactNode
  className?: string
}

/**
 * Shared section shell: anchors navigation, reveals on scroll, fires an
 * anime-style slash transition + energy burst on entry, and renders the
 * dramatic chapter heading treatment.
 */
export default function SectionWrapper({ id, title, kicker, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <SlashTransition />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        {title && (
          <motion.header
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 sm:mb-16 relative"
          >
            <EnergyBurst className="w-28 h-28 -left-8 -top-6" />
            {kicker && (
              <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-voltage mb-3">
                {kicker}
              </p>
            )}
            <h2 className="section-heading">
              <span className="gradient-text">{title}</span>
            </h2>
          </motion.header>
        )}
        {children}
      </div>
    </section>
  )
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
