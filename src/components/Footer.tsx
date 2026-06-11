import type { Profile } from '../types/database'

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 bg-charcoal/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display tracking-widest text-mist">
            VIVEK RANJAN<span className="text-crimson">.</span>
          </p>
          <p className="text-xs text-ash mt-1">
            © {year} {profile.full_name}. Crafted with React, Supabase & far too much coffee.
          </p>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-5">
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-ash hover:text-voltage transition-colors" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z" />
            </svg>
          </a>
          <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-ash hover:text-voltage transition-colors" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} className="text-ash hover:text-voltage transition-colors" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
          </a>
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-ghost !px-4 !py-2 text-sm"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  )
}
