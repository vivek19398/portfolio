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
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.45em] uppercase text-gold mb-3 flex items-center gap-3">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" />
                </svg>
                {kicker}
              </p>
            )}
            <h2 className="section-heading">
              <span className="gold-text">{title}</span>
            </h2>
            <span aria-hidden="true" className="block h-px w-24 mt-5 bg-gradient-to-r from-gold/70 to-transparent" />
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
