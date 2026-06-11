import { motion } from 'framer-motion'

/**
 * Anime-style energy slash between sections: two diagonal blade lines
 * draw across on scroll reveal with a bright leading edge and a few
 * spark particles thrown off the cut. SVG + Framer Motion only.
 */
export default function SlashTransition() {
  return (
    <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-16 -translate-y-1/2 pointer-events-none overflow-visible">
      <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="slash-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="transparent" />
            <stop offset="0.35" stopColor="#e3344e" />
            <stop offset="0.6" stopColor="#f59e0b" />
            <stop offset="0.85" stopColor="#38bdf8" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="slash-b" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="transparent" />
            <stop offset="0.4" stopColor="#38bdf8" />
            <stop offset="0.7" stopColor="#a855f7" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
          <filter id="slash-glow" x="-20%" y="-300%" width="140%" height="700%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary blade cut */}
        <motion.path
          d="M 60 44 L 1140 20"
          stroke="url(#slash-a)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#slash-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.9, 0, 0.1, 1] }}
        />
        {/* Secondary counter-slash */}
        <motion.path
          d="M 1100 52 L 240 30"
          stroke="url(#slash-b)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          filter="url(#slash-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.9, 0, 0.1, 1] }}
        />
        {/* Sparks thrown off the cut */}
        {[
          { cx: 380, cy: 37, c: '#f59e0b', d: 0.35, dx: -14, dy: -16 },
          { cx: 640, cy: 31, c: '#38bdf8', d: 0.42, dx: 10, dy: -20 },
          { cx: 870, cy: 26, c: '#e3344e', d: 0.5, dx: 16, dy: -12 },
          { cx: 520, cy: 34, c: '#a855f7', d: 0.55, dx: -8, dy: -22 },
        ].map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r="2.2"
            fill={s.c}
            filter="url(#slash-glow)"
            initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
            whileInView={{ opacity: [0, 1, 0], x: s.dx, y: s.dy, scale: [1, 1.4, 0.3] }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: s.d, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
