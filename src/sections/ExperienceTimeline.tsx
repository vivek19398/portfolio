import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import type { Experience } from '../types/database'

function formatRange(exp: Experience) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-IE', { month: 'short', year: 'numeric' })
  return `${fmt(exp.start_date)} — ${exp.is_current || !exp.end_date ? 'Present' : fmt(exp.end_date)}`
}

/** Pull real metric figures (10M+, 40%, 150+…) out of achievement text for glowing badges. */
function extractMetrics(exp: Experience): string[] {
  const found = new Set<string>()
  for (const a of exp.achievements) {
    for (const m of a.match(/\d+(?:\.\d+)?(?:[MK]\+|\+|%)/g) ?? []) {
      found.add(m)
    }
  }
  return [...found].slice(0, 5)
}

export default function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <SectionWrapper id="experience" kicker="Chapter III" title="Career Campaign">
      <ol className="relative ml-3 sm:ml-6">
        {/* Flowing energy beam replaces the static border */}
        <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[2px] energy-beam rounded-full" />

        {experience.map((exp, i) => {
          const metrics = extractMetrics(exp)
          return (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 sm:pl-12 pb-14 last:pb-0"
            >
              {/* Glowing mission node with spark ring on reveal */}
              <span
                aria-hidden="true"
                className="absolute -left-[8px] top-1.5 w-[17px] h-[17px] rounded-full bg-void border-2 border-gold shadow-[0_0_14px_rgba(201,168,76,0.8)] animate-glow-pulse"
              />
              <motion.span
                aria-hidden="true"
                className="absolute -left-[16px] top-[-2px] w-[33px] h-[33px] rounded-full border border-gold/60"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: [0.4, 1.8], opacity: [0, 1, 0] }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.12 + 0.2, ease: 'easeOut' }}
              />

              <div className="glass-panel p-6 sm:p-7 hover:border-gold/30 transition-colors relative overflow-hidden">
                {/* Light trail sweeping across on reveal */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-24 pointer-events-none"
                  style={{ background: 'linear-gradient(100deg, transparent, rgba(201,168,76,0.10), transparent)' }}
                  initial={{ left: '-25%' }}
                  whileInView={{ left: '110%' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: i * 0.12 + 0.15, ease: 'easeOut' }}
                />

                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                  Campaign {String(experience.length - i).padStart(2, '0')}
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg sm:text-xl text-mist">{exp.role_title}</h3>
                  <span className="font-mono text-xs text-gold-light tracking-wider border border-gold/40 bg-gold/5 rounded-full px-3 py-1 shadow-[0_0_10px_rgba(201,168,76,0.15)]">
                    {formatRange(exp)}
                  </span>
                </div>
                <p className="text-sm text-gold-light mb-1">{exp.company_name}</p>
                <p className="text-xs text-ash mb-4">{exp.location}</p>

                {metrics.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mb-4" aria-label="Key impact metrics">
                    {metrics.map((m, mi) => (
                      <motion.li
                        key={m}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.35 + mi * 0.07, duration: 0.35 }}
                        className="font-mono text-xs text-voltage border border-voltage/40 bg-voltage/10 rounded-md px-2.5 py-1 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                      >
                        {m}
                      </motion.li>
                    ))}
                  </ul>
                )}

                <p className="text-sm text-ash mb-4 leading-relaxed">{exp.description}</p>

                <ul className="space-y-2.5 mb-5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="text-sm text-mist/90 leading-relaxed flex gap-2.5">
                      <span className="text-crimson mt-0.5 shrink-0" aria-hidden="true">▸</span>
                      {a}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {exp.tech_stack.map((t) => (
                    <li key={t} className="text-[11px] font-mono text-parchment/60 bg-white/5 border border-gold/20 rounded-md px-2 py-0.5">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </SectionWrapper>
  )
}
