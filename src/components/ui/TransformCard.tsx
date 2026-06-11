import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TransformCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  tilt?: number
  /** Render the falling data-stream texture behind content. */
  dataStream?: boolean
  /** Stagger index for the boot-up reveal. */
  bootDelay?: number
}

/**
 * Futuristic panel shell shared by project/skill/achievement cards:
 *  - "system boot" reveal (clip + flash) on first viewport entry
 *  - 3D pointer tilt with a glare highlight that follows the cursor
 *  - hover scanner sweep + glowing corner brackets
 *  - optional data-stream texture
 */
export default function TransformCard({
  children,
  className = '',
  tilt = 7,
  dataStream = false,
  bootDelay = 0,
}: TransformCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const [hover, setHover] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setT({ rx: -(py - 0.5) * tilt, ry: (px - 0.5) * tilt, gx: px * 100, gy: py * 100 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: bootDelay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false)
          setT({ rx: 0, ry: 0, gx: 50, gy: 50 })
        }}
        style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        className={`relative h-full transition-transform duration-150 will-change-transform group/tc overflow-hidden rounded-2xl ${className}`}
      >
        {/* Boot flash line that sweeps once with the clip reveal */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-1 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.9), transparent)' }}
          initial={{ left: '0%', opacity: 1 }}
          whileInView={{ left: '100%', opacity: [1, 1, 0] }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: bootDelay, ease: [0.22, 1, 0.36, 1] }}
        />

        {dataStream && (
          <span aria-hidden="true" className="absolute inset-0 data-stream pointer-events-none rounded-2xl" />
        )}

        {/* Cursor glare */}
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: hover ? 1 : 0,
            background: `radial-gradient(420px circle at ${t.gx}% ${t.gy}%, rgba(56,189,248,0.10), transparent 45%)`,
          }}
        />

        {/* Hover scanner sweep */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-2 h-px z-10 pointer-events-none ${hover ? 'animate-scan-y' : 'hidden'}`}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)',
            boxShadow: '0 0 10px rgba(168,85,247,0.5)',
          }}
        />

        {/* Corner brackets — brighten on hover */}
        {(['top-0 left-0 border-t-2 border-l-2 rounded-tl-md',
          'top-0 right-0 border-t-2 border-r-2 rounded-tr-md',
          'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md',
          'bottom-0 right-0 border-b-2 border-r-2 rounded-br-md'] as const).map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`absolute w-4 h-4 ${pos} border-voltage/40 group-hover/tc:border-voltage transition-colors duration-300 pointer-events-none z-10`}
          />
        ))}

        <div className="relative z-[5] h-full">{children}</div>
      </div>
    </motion.div>
  )
}
