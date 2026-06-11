export interface TravelDestination {
  id: string
  country: string
  city: string
  region: string
  title: string
  description: string
  cover_image_url: string | null
  travel_date: string | null
  display_order: number
  is_featured: boolean
  created_at?: string
  updated_at?: string
}

export interface TravelMedia {
  id: string
  destination_id: string | null
  media_type: 'image' | 'video'
  title: string
  caption: string
  storage_path: string
  thumbnail_url: string | null
  public_url: string
  alt_text: string
  location_name: string
  country: string
  city: string
  tags: string[]
  display_order: number
  is_featured: boolean
  created_at?: string
}

export interface TravelStory {
  id: string
  destination_id: string | null
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  tags: string[]
  travel_date: string | null
  reading_time: number
  is_featured: boolean
  created_at?: string
  updated_at?: string
}

export type HackCategory =
  | 'Budget Travel'
  | 'Visa & Documents'
  | 'Flights'
  | 'Hotels'
  | 'Food'
  | 'Local Transport'
  | 'Safety'
  | 'Packing'
  | 'Hidden Gems'
  | 'Itinerary'

export interface TravelHack {
  id: string
  title: string
  slug: string
  category: HackCategory
  excerpt: string
  content: string
  country: string
  city: string
  difficulty_level: 'Easy' | 'Medium' | 'Advanced'
  estimated_savings: string
  tags: string[]
  cover_image_url: string | null
  is_featured: boolean
  created_at?: string
  updated_at?: string
}

export type BlogCategory =
  | 'Life Abroad'
  | 'Student Life'
  | 'Career'
  | 'AI & Data'
  | 'Travel Reflections'
  | 'Ireland Life'
  | 'Personal Stories'

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: BlogCategory
  excerpt: string
  content: string
  cover_image_url: string | null
  tags: string[]
  reading_time: number
  is_featured: boolean
  published_at: string
  created_at?: string
  updated_at?: string
}

export interface TravelHighlight {
  id: string
  title: string
  cover_image_url: string | null
  destination_id: string | null
  display_order: number
  created_at?: string
}
