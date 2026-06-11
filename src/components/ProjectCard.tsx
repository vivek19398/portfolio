import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types/database'
import TransformCard from './ui/TransformCard'

/**
 * Futuristic mission-panel project card: boot-up reveal, 3D tilt,
 * scanner sweep, data-stream texture, and a full "View Details"
 * case-study modal. Data comes from Supabase or local fallback only.
 */
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [open, setOpen] = useState(false)

  // Close modal on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <TransformCard dataStream bootDelay={index * 0.1} className="neon-border glass-panel">
        <article className="p-6 flex flex-col gap-4 h-full">
          <header className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg sm:text-xl text-mist leading-snug">{project.title}</h3>
            {project.is_featured && (
              <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-ember border border-ember/40 rounded-full px-2.5 py-1 animate-glow-pulse">
                Featured
              </span>
            )}
          </header>

          <p className="text-sm text-ash leading-relaxed flex-1">{project.short_description}</p>

          {project.impact_metrics.length > 0 && (
            <ul className="space-y-1.5">
              {project.impact_metrics.slice(0, 2).map((m) => (
                <li key={m} className="text-sm text-mist flex gap-2">
                  <span className="text-voltage" aria-hidden="true">⚡</span>
                  {m}
                </li>
              ))}
            </ul>
          )}

          <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
            {project.tech_stack.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                whileHover={{ scale: 1.12, boxShadow: '0 0 12px rgba(56,189,248,0.5)' }}
                className="text-xs font-mono text-voltage bg-voltage/10 border border-voltage/20 rounded-md px-2 py-1 cursor-default"
              >
                {t}
              </motion.li>
            ))}
          </ul>

          <footer className="flex flex-wrap gap-3 pt-1">
            <button onClick={() => setOpen(true)} className="btn-ghost !px-4 !py-1.5 text-xs font-mono uppercase tracking-wider">
              ▶ View Details
            </button>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-ember border border-ember/40 bg-ember/5 hover:bg-ember/15 transition-colors"
              >
                ↗ Live
              </a>
            )}
          </footer>
        </article>
      </TransformCard>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-void/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} case study`}
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="neon-border glass-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-voltage mb-2">Case Study</p>
                  <h3 className="font-display text-2xl text-mist">{project.title}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close details"
                  className="shrink-0 w-9 h-9 rounded-lg border border-white/15 text-ash hover:text-mist hover:border-crimson/50 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm sm:text-[15px] text-ash leading-[1.85] mb-6">{project.long_description}</p>

              {project.impact_metrics.length > 0 && (
                <>
                  <h4 className="font-mono text-xs tracking-[0.25em] uppercase text-ember mb-3">Impact</h4>
                  <ul className="space-y-2 mb-6">
                    {project.impact_metrics.map((m) => (
                      <li key={m} className="text-sm text-mist flex gap-2.5">
                        <span className="text-voltage" aria-hidden="true">⚡</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="font-mono text-xs tracking-[0.25em] uppercase text-ember mb-3">Tech Stack</h4>
              <ul className="flex flex-wrap gap-2 mb-6">
                {project.tech_stack.map((t) => (
                  <li key={t} className="text-xs font-mono text-voltage bg-voltage/10 border border-voltage/20 rounded-md px-2.5 py-1">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2 text-sm">
                    ↗ View Live
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2 text-sm">
                    Code Reference
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
