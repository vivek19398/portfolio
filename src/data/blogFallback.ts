import type { BlogPost } from '../types/travel'

/**
 * PLACEHOLDER blog posts — clearly marked samples shown only until real
 * posts exist in Supabase (personal_blog_posts table). No invented
 * personal stories.
 */
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'bp1',
    title: 'Sample Post — Writing Space Reserved',
    slug: 'sample-post',
    category: 'Personal Stories',
    excerpt:
      'Placeholder post. Your real writing — life abroad, student life, career, AI & data, travel reflections — will appear here once published via /admin.',
    content:
      'This is placeholder blog content.\n\nCreate real posts from the /admin dashboard: title, slug, category, excerpt, tags, reading time, and a cover image from the blog-covers bucket.\n\nOnce your first real post is saved, this sample disappears.',
    cover_image_url: null,
    tags: ['sample'],
    reading_time: 1,
    is_featured: true,
    published_at: '2026-01-01T00:00:00Z',
  },
]
