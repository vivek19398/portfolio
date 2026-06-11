import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleLayout from '../../components/travel/ArticleLayout'
import EmptyState from '../../components/travel/EmptyState'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getTravelStoryBySlug } from '../../lib/travelQueries'
import type { TravelStory } from '../../types/travel'

export default function TravelStoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [story, setStory] = useState<TravelStory | null | undefined>(undefined)

  useEffect(() => {
    if (slug) getTravelStoryBySlug(slug).then((s) => setStory(s))
  }, [slug])

  usePageMeta(
    story ? `${story.title} — Travel Stories` : 'Travel Story — Vivek Ranjan',
    story?.excerpt ?? 'A travel story by Vivek Ranjan.',
  )

  if (story === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <LoadingSkeleton lines={6} />
      </div>
    )
  }
  if (story === null) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <EmptyState title="Story not found" message="This story may have been moved or unpublished." />
      </div>
    )
  }

  return (
    <ArticleLayout
      backTo="/travel/stories"
      backLabel="All stories"
      kicker="Travel Story"
      title={story.title}
      coverUrl={story.cover_image_url}
      coverGlyph="📖"
      content={story.content}
      tags={story.tags}
      meta={
        <>
          {story.travel_date && (
            <span>{new Date(story.travel_date).toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })}</span>
          )}
          <span>{story.reading_time} min read</span>
        </>
      }
    />
  )
}
