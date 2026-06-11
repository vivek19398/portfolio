import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { fallbackData } from '../data/portfolioData'
import type { PortfolioData } from '../types/database'

const CACHE_KEY = 'portfolio-data-v1'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes — keeps Supabase free-tier traffic low

interface CacheEnvelope {
  at: number
  data: PortfolioData
}

function readCache(): PortfolioData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const env = JSON.parse(raw) as CacheEnvelope
    if (Date.now() - env.at > CACHE_TTL_MS) return null
    return env.data
  } catch {
    return null
  }
}

function writeCache(data: PortfolioData) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* storage may be unavailable — non-fatal */
  }
}

/**
 * Loads all public portfolio content in one parallel batch.
 * Falls back to static resume data when Supabase is not configured,
 * the network fails, or tables are empty.
 */
export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(fallbackData)
  const [loading, setLoading] = useState<boolean>(!!supabase)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    if (!supabase) return
    const cached = readCache()
    if (cached) {
      setData(cached)
      setUsingFallback(false)
      setLoading(false)
      return
    }

    let cancelled = false
    async function load() {
      try {
        const sb = supabase!
        const [profile, skills, projects, experience, education, achievements, certifications] =
          await Promise.all([
            sb.from('profile').select('*').limit(1).maybeSingle(),
            sb.from('skills').select('*').order('display_order'),
            sb.from('projects').select('*').order('display_order'),
            sb.from('experience').select('*').order('display_order'),
            sb.from('education').select('*').order('display_order'),
            sb.from('achievements').select('*').order('display_order'),
            sb.from('certifications').select('*').order('display_order'),
          ])

        if (cancelled) return
        if (profile.error || !profile.data) throw profile.error ?? new Error('No profile row')

        // Per-section fallback: an empty/missing Supabase table falls back
        // to the local resume-derived data so sections never render blank.
        // (Certifications intentionally may be empty — the section hides.)
        const merged: PortfolioData = {
          profile: profile.data,
          skills: skills.data?.length ? skills.data : fallbackData.skills,
          projects: projects.data?.length ? projects.data : fallbackData.projects,
          experience: experience.data?.length ? experience.data : fallbackData.experience,
          education: education.data?.length ? education.data : fallbackData.education,
          achievements: achievements.data?.length ? achievements.data : fallbackData.achievements,
          certifications: certifications.data ?? [],
        }
        setData(merged)
        setUsingFallback(false)
        writeCache(merged)
      } catch {
        // Keep the static fallback — the site must always render.
        if (!cancelled) setUsingFallback(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, usingFallback }
}
