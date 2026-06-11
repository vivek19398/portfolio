import { motion } from 'framer-motion'
import type { PortalVariant } from './WormholePortal'

interface WormholeTransitionProps {
  variant: PortalVariant
  onComplete: () => void
}

const COLORS: Record<PortalVariant, string[]> = {
  work: ['rgba(56,189,248,0.9)', 'rgba(168,85,247,0.8)', 'rgba(231,233,242,0.9)'],
  travel: ['rgba(245,158,11,0.9)', 'rgba(227,52,78,0.8)', 'rgba(255,237,213,0.9)'],
}

/**
 * Full-screen wormhole jump: concentric rings rush outward past the
 * viewer while the scene spins slightly and collapses into white,
 * then navigation fires. ~900ms total.
 */
export default function WormholeTransition({ variant, onComplete }: WormholeTransitionProps) {
  const colors = COLORS[variant]
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: variant === 'work' ? 14 : -14, scale: 1.15 }}
        transition={{ duration: 0.9, ease: 'easeIn' }}
      >
        {/* Rings rushing past the viewer */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: 80,
              height: 80,
              borderColor: colors[i % colors.length],
              boxShadow: `0 0 24px ${colors[i % colors.length]}`,
            }}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 30, opacity: [0, 1, 0] }}
            transition={{ duration: 0.85, delay: i * 0.09, ease: [0.7, 0, 0.84, 0] }}
          />
        ))}
        {/* Star streaks */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2
          return (
            <motion.span
              key={`s${i}`}
              className="absolute h-px w-24 origin-left"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors[i % colors.length]})`,
                rotate: `${(angle * 180) / Math.PI}deg`,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scaleX: 0.2 }}
              animate={{
                x: Math.cos(angle) * 700,
                y: Math.sin(angle) * 700,
                opacity: [0, 1, 0],
                scaleX: 3,
              }}
              transition={{ duration: 0.8, delay: 0.1 + (i % 4) * 0.07, ease: 'easeIn' }}
            />
          )
        })}
      </motion.div>
      {/* Collapse to light, then navigate */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.65, ease: 'easeIn' }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  )
}
