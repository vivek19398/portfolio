import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { BlogPost } from '../../types/travel'
import CoverImage from './CoverImage'

export default function BlogPostCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="royal-border glass-panel overflow-hidden img-zoom group flex flex-col"
    >
      <div className="h-44">
        <CoverImage src={post.cover_image_url} alt={post.title} className="w-full h-full" fallbackGlyph="✍" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold mb-2">
          {post.category} · {post.reading_time} min ·{' '}
          {new Date(post.published_at).toLocaleDateString('en-IE', { month: 'short', year: 'numeric' })}
        </p>
        <h3 className="font-display text-lg text-mist group-hover:text-gold-light transition-colors">{post.title}</h3>
        <p className="text-sm text-ash mt-2 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Tags">
            {post.tags.slice(0, 4).map((t) => (
              <li key={t} className="text-[10px] font-mono text-ash bg-white/5 border border-white/10 rounded-md px-2 py-0.5">
                #{t}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-wider text-gold-light hover:text-parchment transition-colors"
        >
          Read post →
        </Link>
      </div>
    </motion.article>
  )
}
