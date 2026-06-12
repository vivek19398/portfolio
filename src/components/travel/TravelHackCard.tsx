import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { TravelHack } from '../../types/travel'

const DIFFICULTY_COLOR: Record<TravelHack['difficulty_level'], string> = {
  Easy: 'text-voltage border-voltage/40 bg-voltage/10',
  Medium: 'text-ember border-ember/40 bg-ember/10',
  Advanced: 'text-crimson border-crimson/40 bg-crimson/10',
}

export default function TravelHackCard({ hack, index = 0 }: { hack: TravelHack; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(201,168,76,0.14)' }}
      className="royal-border glass-panel p-6 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-light border border-gold/40 bg-gold/5 rounded-full px-2.5 py-1">
          {hack.category}
        </span>
        <span className={`text-[10px] font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${DIFFICULTY_COLOR[hack.difficulty_level]}`}>
          {hack.difficulty_level}
        </span>
      </div>

      <h3 className="font-display text-lg text-mist">{hack.title}</h3>

      <p className="text-xs text-ash flex flex-wrap gap-x-3">
        {(hack.city || hack.country) && <span>◎ {[hack.city, hack.country].filter(Boolean).join(', ')}</span>}
        {hack.estimated_savings && <span className="text-voltage">💰 saves {hack.estimated_savings}</span>}
      </p>

      <p className="text-sm text-ash leading-relaxed line-clamp-3 flex-1">{hack.excerpt}</p>

      {hack.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
          {hack.tags.slice(0, 4).map((t) => (
            <li key={t} className="text-[10px] font-mono text-ash bg-white/5 border border-white/10 rounded-md px-2 py-0.5">
              #{t}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/travel/hacks/${hack.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors"
      >
        Read more →
      </Link>
    </motion.article>
  )
}
