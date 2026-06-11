import { motion } from 'framer-motion'

interface EnergyBurstProps {
  className?: string
  color?: string
}

/**
 * One-shot radial energy burst fired when its section scrolls into
 * view — a ring shockwave plus a soft flash. Pure transform/opacity.
 */
export default function EnergyBurst({ className = '', color = 'rgba(56,189,248,0.5)' }: EnergyBurstProps) {
  return (
    <div aria-hidden="true" className={`absolute pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        initial={{ scale: 0.2, opacity: 0 }}
        whileInView={{ scale: [0.2, 2.4], opacity: [0, 0.8, 0] }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 65%)` }}
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: [0.4, 1.8], opacity: [0, 0.5, 0] }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </div>
  )
}
