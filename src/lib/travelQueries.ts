import { supabase } from './supabase'
import {
  fallbackDestinations,
  fallbackHacks,
  fallbackHighlights,
  fallbackMedia,
  fallbackStories,
} from '../data/travelFallback'
import { fallbackBlogPosts } from '../data/blogFallback'
import type {
  BlogPost,
  TravelDestination,
  TravelHack,
  TravelHighlight,
  TravelMedia,
  TravelStory,
} from '../types/travel'

/**
 * Travel data access. Every function resolves from Supabase first and
 * falls back to clearly-marked local placeholders when Supabase is not
 * configured, errors, or returns no rows. No external APIs.
 */

async function fromTable<T>(table: string, build: (q: any) => any, fallback: T[]): Promise<T[]> {
  if (!supabase) return fallback
  try {
    const { data, error } = await build(supabase.from(table).select('*'))
    if (error || !data || data.length === 0) return fallback
    return data as T[]
  } catch {
    return fallback
  }
}

export function getTravelDestinations(): Promise<TravelDestination[]> {
  return fromTable('travel_destinations', (q) => q.order('display_order'), fallbackDestinations)
}

export async function getFeaturedTravelMedia(): Promise<TravelMedia[]> {
  // Prefer featured rows; if none are marked featured yet, surface the
  // latest real media. Samples only appear while the table is empty.
  if (supabase) {
    try {
      const featured = await supabase
        .from('travel_media')
        .select('*')
        .eq('is_featured', true)
        .order('display_order')
        .limit(12)
      if (!featured.error && featured.data && featured.data.length > 0) return featured.data as TravelMedia[]

      const latest = await supabase
        .from('travel_media')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)
      if (!latest.error && latest.data && latest.data.length > 0) return latest.data as TravelMedia[]
    } catch {
      /* fall through to local fallback */
    }
  }
  return fallbackMedia.filter((m) => m.is_featured)
}

export interface MediaPage {
  items: TravelMedia[]
  hasMore: boolean
}

const GALLERY_PAGE_SIZE = 12

/** Paged gallery fetch — never loads the whole media table at once. */
export async function getTravelMedia(opts: {
  page: number
  destinationId?: string | null
}): Promise<MediaPage> {
  const { page, destinationId } = opts
  const from = page * GALLERY_PAGE_SIZE
  const to = from + GALLERY_PAGE_SIZE // fetch one extra row to detect more pages

  if (supabase) {
    try {
      let q = supabase.from('travel_media').select('*').order('display_order').range(from, to)
      if (destinationId) q = q.eq('destination_id', destinationId)
      const { data, error } = await q
      if (!error && data && (data.length > 0 || page > 0)) {
        return { items: data.slice(0, GALLERY_PAGE_SIZE) as TravelMedia[], hasMore: data.length > GALLERY_PAGE_SIZE }
      }
    } catch {
      /* fall through to local fallback */
    }
  }

  const all = destinationId ? fallbackMedia.filter((m) => m.destination_id === destinationId) : fallbackMedia
  const slice = all.slice(from, from + GALLERY_PAGE_SIZE)
  return { items: slice, hasMore: from + GALLERY_PAGE_SIZE < all.length }
}

export function getTravelStories(): Promise<TravelStory[]> {
  return fromTable('travel_stories', (q) => q.order('created_at', { ascending: false }), fallbackStories)
}

export async function getTravelStoryBySlug(slug: string): Promise<TravelStory | null> {
  const stories = await getTravelStories()
  return stories.find((s) => s.slug === slug) ?? null
}

export function getTravelHacks(): Promise<TravelHack[]> {
  return fromTable('travel_hacks', (q) => q.order('created_at', { ascending: false }), fallbackHacks)
}

export async function getTravelHackBySlug(slug: string): Promise<TravelHack | null> {
  const hacks = await getTravelHacks()
  return hacks.find((h) => h.slug === slug) ?? null
}

export function getPersonalBlogPosts(): Promise<BlogPost[]> {
  return fromTable(
    'personal_blog_posts',
    (q) => q.order('published_at', { ascending: false }),
    fallbackBlogPosts,
  )
}

export async function getPersonalBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPersonalBlogPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export function getTravelHighlights(): Promise<TravelHighlight[]> {
  return fromTable('travel_highlights', (q) => q.order('display_order'), fallbackHighlights)
}
