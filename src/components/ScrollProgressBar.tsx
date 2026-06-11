import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Charging-energy scroll progress: gradient bar plus a glowing spark
 * riding the leading edge that intensifies as the page fills.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const sparkLeft = useTransform(progress, (v) => `${v * 100}%`)
  const sparkGlow = useTransform(
    progress,
    (v) => `0 0 ${8 + v * 18}px rgba(245,158,11,${0.5 + v * 0.5})`,
  )

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[3px] z-[60]">
      <motion.div
        className="absolute inset-0 origin-left bg-gradient-to-r from-voltage via-royal to-crimson shadow-[0_0_10px_rgba(168,85,247,0.7)]"
        style={{ scaleX: progress }}
      />
      <motion.div
        className="absolute -top-[3px] w-[9px] h-[9px] -ml-1 rounded-full bg-ember"
        style={{ left: sparkLeft, boxShadow: sparkGlow }}
      />
    </div>
  )
}
