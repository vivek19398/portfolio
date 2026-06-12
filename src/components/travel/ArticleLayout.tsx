import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CoverImage from './CoverImage'

interface ArticleLayoutProps {
  backTo: string
  backLabel: string
  kicker: string
  title: string
  meta: ReactNode
  coverUrl: string | null
  coverGlyph?: string
  content: string
  tags: string[]
}

/**
 * Shared long-form reader for stories, hacks, and blog posts.
 * Content paragraphs are split on blank lines; everything renders as
 * escaped text (no HTML injection).
 */
export default function ArticleLayout({
  backTo,
  backLabel,
  kicker,
  title,
  meta,
  coverUrl,
  coverGlyph = '📖',
  content,
  tags,
}: ArticleLayoutProps) {
  const paragraphs = content.split(/\n{2,}/).filter(Boolean)

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Link to={backTo} className="text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors">
          ← {backLabel}
        </Link>

        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mt-6 mb-3 flex items-center gap-2.5">
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0"><path d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z" fill="#c9a84c" /></svg>
          {kicker}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl tracking-wide leading-snug mb-4"><span className="gold-text">{title}</span></h1>
        <div className="text-xs text-ash flex flex-wrap gap-x-4 gap-y-1 mb-8">{meta}</div>

        <div className="img-zoom royal-border rounded-2xl overflow-hidden mb-10 relative">
          <span aria-hidden="true" className="grain-overlay z-10" />
          <CoverImage src={coverUrl} alt={title} fallbackGlyph={coverGlyph} className="w-full h-56 sm:h-72" />
        </div>

        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className={`text-[15px] sm:text-base text-parchment/65 leading-[1.9] ${i === 0 ? 'drop-cap' : ''}`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gold/15" aria-label="Tags">
            {tags.map((t) => (
              <li key={t} className="text-xs font-mono text-gold-light bg-gold/10 border border-gold/30 rounded-md px-2.5 py-1">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </article>
  )
}
