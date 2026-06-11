export interface Profile {
  id: string
  full_name: string
  headline: string
  short_tagline: string
  location: string
  email: string
  linkedin_url: string
  github_url: string
  resume_url: string
  about_text: string
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  category: string
  name: string
  icon_name: string | null
  proficiency_level: number
  display_order: number
  is_featured: boolean
  created_at?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  short_description: string
  long_description: string
  tech_stack: string[]
  impact_metrics: string[]
  image_url: string | null
  github_url: string | null
  live_url: string | null
  display_order: number
  is_featured: boolean
  created_at?: string
  updated_at?: string
}

export interface Experience {
  id: string
  company_name: string
  role_title: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
  achievements: string[]
  tech_stack: string[]
  display_order: number
  created_at?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  start_year: number
  end_year: number | null
  description: string
  display_order: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  issuer: string
  achievement_date: string | null
  display_order: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issue_date: string | null
  credential_url: string | null
  display_order: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  source_page: string | null
  user_agent: string | null
  is_read: boolean
  created_at: string
}

export interface PortfolioData {
  profile: Profile
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  achievements: Achievement[]
  certifications: Certification[]
}
