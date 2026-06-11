import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleLayout from '../../components/travel/ArticleLayout'
import EmptyState from '../../components/travel/EmptyState'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getPersonalBlogPostBySlug } from '../../lib/travelQueries'
import type { BlogPost } from '../../types/travel'

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)

  useEffect(() => {
    if (slug) getPersonalBlogPostBySlug(slug).then((p) => setPost(p))
  }, [slug])

  usePageMeta(
    post ? `${post.title} — Vivek Ranjan` : 'Blog Post — Vivek Ranjan',
    post?.excerpt ?? 'A blog post by Vivek Ranjan.',
  )

  if (post === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <LoadingSkeleton lines={6} />
      </div>
    )
  }
  if (post === null) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <EmptyState title="Post not found" message="This post may have been moved or unpublished." />
      </div>
    )
  }

  return (
    <ArticleLayout
      backTo="/blog"
      backLabel="All posts"
      kicker={post.category}
      title={post.title}
      coverUrl={post.cover_image_url}
      coverGlyph="✍"
      content={post.content}
      tags={post.tags}
      meta={
        <>
          <span>{new Date(post.published_at).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>{post.reading_time} min read</span>
        </>
      }
    />
  )
}
