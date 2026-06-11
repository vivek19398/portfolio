import type {
  TravelDestination,
  TravelHack,
  TravelHighlight,
  TravelMedia,
  TravelStory,
} from '../types/travel'

/**
 * PLACEHOLDER travel content — shown only until real content exists in
 * Supabase. Every entry is clearly marked as a sample; nothing here
 * claims to be a real trip or personal experience. Replace via /admin
 * (or the Supabase dashboard) and these disappear automatically.
 *
 * cover_image_url is intentionally null — the UI renders an elegant
 * cosmic gradient placeholder instead of hotlinking external images.
 */

export const fallbackDestinations: TravelDestination[] = [
  {
    id: 'td1',
    country: 'Ireland',
    city: 'Cork',
    region: 'Munster',
    title: 'Sample Destination — Cork',
    description:
      'Placeholder destination card. Add your real destinations, photos, and dates from the /admin dashboard — this sample disappears once your first destination is saved.',
    cover_image_url: null,
    travel_date: null,
    display_order: 1,
    is_featured: true,
  },
  {
    id: 'td2',
    country: 'Ireland',
    city: 'Limerick',
    region: 'Munster',
    title: 'Sample Destination — Limerick',
    description:
      'Placeholder destination card. Describe the trip, link a cover image from Supabase Storage, and mark it featured to surface it here.',
    cover_image_url: null,
    travel_date: null,
    display_order: 2,
    is_featured: true,
  },
  {
    id: 'td3',
    country: '—',
    city: '—',
    region: '',
    title: 'Your Next Adventure',
    description:
      'This galaxy is waiting for its first real journey. Upload compressed photos to the travel-media bucket and add entries in /admin.',
    cover_image_url: null,
    travel_date: null,
    display_order: 3,
    is_featured: false,
  },
]

export const fallbackMedia: TravelMedia[] = Array.from({ length: 9 }, (_, i) => ({
  id: `tm${i + 1}`,
  destination_id: i < 3 ? 'td1' : i < 6 ? 'td2' : 'td3',
  media_type: 'image' as const,
  title: `Sample photo slot ${i + 1}`,
  caption:
    'Placeholder media tile — real photos will load from Supabase Storage (travel-media bucket) once metadata rows are added.',
  storage_path: '',
  thumbnail_url: null,
  public_url: '',
  alt_text: 'Placeholder travel media slot',
  location_name: i < 3 ? 'Cork (sample)' : i < 6 ? 'Limerick (sample)' : 'Unknown (sample)',
  country: i < 6 ? 'Ireland' : '—',
  city: i < 3 ? 'Cork' : i < 6 ? 'Limerick' : '—',
  tags: ['sample'],
  display_order: i + 1,
  is_featured: i < 3,
}))

export const fallbackStories: TravelStory[] = [
  {
    id: 'ts1',
    destination_id: 'td1',
    title: 'Sample Story — Your First Travel Tale',
    slug: 'sample-story',
    excerpt:
      'Placeholder story. Your real travel writing will appear here once added via /admin — this sample makes no claims about real trips.',
    content:
      'This is placeholder story content.\n\nAdd your real travel stories from the /admin dashboard: give each one a title, slug, excerpt, cover image (blog-covers bucket), tags, and the full text.\n\nParagraphs are separated by blank lines and render automatically.\n\nOnce your first real story is saved in Supabase, every sample disappears.',
    cover_image_url: null,
    tags: ['sample', 'placeholder'],
    travel_date: null,
    reading_time: 1,
    is_featured: true,
  },
]

/**
 * Generic, factual travel tips — not personal claims — clearly labelled
 * as starter samples until real hacks are written.
 */
export const fallbackHacks: TravelHack[] = [
  {
    id: 'th1',
    title: 'Sample Hack — Book Flights in Incognito Mode',
    slug: 'sample-hack-flights',
    category: 'Flights',
    excerpt:
      'Starter sample: comparison sites may show different prices across repeat searches — compare in a private window and across two devices before booking.',
    content:
      'This is a starter sample hack (generic advice, not a personal claim).\n\nReplace it with your own tested travel hacks from the /admin dashboard.\n\nFields you can use: category, country/city, difficulty level, estimated savings, tags, and a cover image.',
    country: '',
    city: '',
    difficulty_level: 'Easy',
    estimated_savings: '',
    tags: ['sample', 'flights'],
    cover_image_url: null,
    is_featured: true,
  },
  {
    id: 'th2',
    title: 'Sample Hack — Carry a Document Folder Scan',
    slug: 'sample-hack-documents',
    category: 'Visa & Documents',
    excerpt:
      'Starter sample: keep encrypted digital scans of passport, visa, and insurance in offline storage so border or hotel checks never depend on connectivity.',
    content:
      'This is a starter sample hack (generic advice, not a personal claim).\n\nReplace it with your own visa and document tips via /admin.',
    country: '',
    city: '',
    difficulty_level: 'Easy',
    estimated_savings: '',
    tags: ['sample', 'documents'],
    cover_image_url: null,
    is_featured: false,
  },
]

export const fallbackHighlights: TravelHighlight[] = [
  { id: 'th-1', title: 'Cork', cover_image_url: null, destination_id: 'td1', display_order: 1 },
  { id: 'th-2', title: 'Limerick', cover_image_url: null, destination_id: 'td2', display_order: 2 },
  { id: 'th-3', title: 'Soon…', cover_image_url: null, destination_id: 'td3', display_order: 3 },
]
