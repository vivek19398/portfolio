import { fallbackData } from './portfolioData'
import type { Project } from '../types/database'

/**
 * Local resume-derived project data — the only fallback source.
 * Display rule (see usePortfolioData): Supabase `projects` rows win;
 * if Supabase is unreachable or the table is empty, these render.
 * No external sources, no GitHub API.
 */
export const fallbackProjects: Project[] = fallbackData.projects
