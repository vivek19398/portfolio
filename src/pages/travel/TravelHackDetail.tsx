import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleLayout from '../../components/travel/ArticleLayout'
import EmptyState from '../../components/travel/EmptyState'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getTravelHackBySlug } from '../../lib/travelQueries'
import type { TravelHack } from '../../types/travel'

export default function TravelHackDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [hack, setHack] = useState<TravelHack | null | undefined>(undefined)

  useEffect(() => {
    if (slug) getTravelHackBySlug(slug).then((h) => setHack(h))
  }, [slug])

  usePageMeta(
    hack ? `${hack.title} — Travel Hacks` : 'Travel Hack — Vivek Ranjan',
    hack?.excerpt ?? 'A travel hack by Vivek Ranjan.',
  )

  if (hack === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <LoadingSkeleton lines={6} />
      </div>
    )
  }
  if (hack === null) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20">
        <EmptyState title="Hack not found" message="This hack may have been moved or unpublished." />
      </div>
    )
  }

  return (
    <ArticleLayout
      backTo="/travel/hacks"
      backLabel="All hacks"
      kicker={hack.category}
      title={hack.title}
      coverUrl={hack.cover_image_url}
      coverGlyph="🧭"
      content={hack.content}
      tags={hack.tags}
      meta={
        <>
          {(hack.city || hack.country) && <span>◎ {[hack.city, hack.country].filter(Boolean).join(', ')}</span>}
          <span>Difficulty: {hack.difficulty_level}</span>
          {hack.estimated_savings && <span className="text-voltage">💰 saves {hack.estimated_savings}</span>}
        </>
      }
    />
  )
}
