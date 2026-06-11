import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import BlogPostCard from '../../components/travel/BlogPostCard'
import EmptyState from '../../components/travel/EmptyState'
import MediaSkeleton from '../../components/travel/MediaSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getPersonalBlogPosts } from '../../lib/travelQueries'
import type { BlogPost } from '../../types/travel'

/** Personal blog: longer written posts with category filters. */
export default function BlogPage() {
  usePageMeta(
    'Blog — Vivek Ranjan',
    'Personal writing by Vivek Ranjan: life abroad, student life in Ireland, career, AI & data, and travel reflections.',
  )
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    getPersonalBlogPosts().then(setPosts)
  }, [])

  const categories = useMemo(() => [...new Set((posts ?? []).map((p) => p.category))], [posts])
  const visible = useMemo(
    () => (posts ?? []).filter((p) => !category || p.category === category),
    [posts, category],
  )

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-royal mb-3">Captain's Log</p>
        <h1 className="font-display text-3xl sm:text-5xl text-mist tracking-wide mb-6">Personal Blog</h1>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            <button
              role="tab"
              aria-selected={category === null}
              onClick={() => setCategory(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                category === null
                  ? 'border-royal/60 bg-royal/15 text-royal'
                  : 'border-white/10 text-ash hover:text-mist hover:border-white/25'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  category === c
                    ? 'border-royal/60 bg-royal/15 text-royal'
                    : 'border-white/10 text-ash hover:text-mist hover:border-white/25'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </motion.header>

      {posts === null ? (
        <MediaSkeleton count={3} />
      ) : visible.length === 0 ? (
        <EmptyState title="No posts yet" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <BlogPostCard key={p.id} post={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
