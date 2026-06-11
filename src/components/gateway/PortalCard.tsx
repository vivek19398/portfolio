import { motion } from 'framer-motion'
import WormholePortal, { type PortalVariant } from './WormholePortal'

interface PortalCardProps {
  variant: PortalVariant
  title: string
  subtitle: string
  hint: string
  onEnter: () => void
  delay?: number
}

const VARIANT_STYLE: Record<PortalVariant, { ring: string; text: string; glow: string }> = {
  work: {
    ring: 'border-voltage/40 hover:border-voltage',
    text: 'text-voltage',
    glow: 'hover:shadow-[0_0_60px_rgba(56,189,248,0.25)]',
  },
  travel: {
    ring: 'border-ember/40 hover:border-ember',
    text: 'text-ember',
    glow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.25)]',
  },
}

/** One galaxy door: swirling portal, identity glyphs, expands open on hover. */
export default function PortalCard({ variant, title, subtitle, hint, onEnter, delay = 0 }: PortalCardProps) {
  const s = VARIANT_STYLE[variant]
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative w-full max-w-sm rounded-3xl border bg-panel/40 backdrop-blur-md p-8 sm:p-10 text-center transition-all duration-300 ${s.ring} ${s.glow}`}
    >
      {/* Portal mouth — opens wider on hover */}
      <div className="relative mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48 transition-transform duration-500 group-hover:scale-110">
        <WormholePortal variant={variant} className="w-full h-full" />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
        >
          {variant === 'work' ? '⌬' : '✈'}
        </span>
      </div>

      <p className={`font-mono text-[10px] tracking-[0.4em] uppercase mb-3 ${s.text}`}>{subtitle}</p>
      <h2 className="font-display text-2xl sm:text-3xl text-mist mb-3 tracking-wide">{title}</h2>
      <p className="text-sm text-ash leading-relaxed mb-6">{hint}</p>

      <span
        className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] ${s.text} opacity-80 group-hover:opacity-100 transition-opacity`}
      >
        Enter
        <motion.span aria-hidden="true" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          →
        </motion.span>
      </span>
    </motion.button>
  )
}
