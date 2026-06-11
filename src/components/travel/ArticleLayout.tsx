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
        <Link to={backTo} className="text-xs font-mono uppercase tracking-wider text-ember hover:text-mist transition-colors">
          ← {backLabel}
        </Link>

        <p className="font-mono text-xs tracking-[0.35em] uppercase text-ember mt-6 mb-3">{kicker}</p>
        <h1 className="font-display text-3xl sm:text-4xl text-mist tracking-wide leading-snug mb-4">{title}</h1>
        <div className="text-xs text-ash flex flex-wrap gap-x-4 gap-y-1 mb-8">{meta}</div>

        <div className="img-zoom rounded-2xl overflow-hidden mb-10">
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
              className="text-[15px] sm:text-base text-ash leading-[1.9]"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-white/10" aria-label="Tags">
            {tags.map((t) => (
              <li key={t} className="text-xs font-mono text-ember bg-ember/10 border border-ember/25 rounded-md px-2.5 py-1">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </article>
  )
}
