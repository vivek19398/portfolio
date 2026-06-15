import { Link } from 'react-router-dom'
import HeroSection from '../../components/travelworld/HeroSection'
import TravelScrollJourney from '../../components/travelworld/TravelScrollJourney'
import { BlogSection, DestinationCards, TravelGallery, TravelHacks } from '../../components/travelworld/afterJourney'
import TravelFooter from '../../components/travel/TravelFooter'
import { useLenis } from '../../hooks/useLenis'
import { usePageMeta } from '../../hooks/usePageMeta'
import { usePageView } from '../../hooks/useAnalytics'

/**
 * "Travel World" — a single continuous, scroll-driven cinematic journey
 * (home → airport → check-in → boarding → flight → destination), followed
 * by the Supabase-powered travel blog sections.
 *
 * Backend untouched: the after-journey sections reuse the existing travel
 * queries and card components. Only presentation lives here.
 */
export default function TravelWorld() {
  usePageMeta(
    'Travel World — A Scroll Journey | Vivek Ranjan',
    'A cinematic, scroll-driven travel journey from home pickup to flight landing — then dive into the gallery, travel hacks, and stories.',
  )
  usePageView()
  useLenis() // smooth scroll (auto-disabled under prefers-reduced-motion)

  return (
    <div className="relative bg-void text-mist min-h-screen">
      {/* Minimal cross-universe nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 h-16" aria-label="Travel World navigation">
        <Link to="/travel" className="font-display text-base tracking-[0.3em] uppercase text-gold hover:text-gold-light transition-colors">
          Travel World
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/travel" className="text-xs font-mono uppercase tracking-wider text-parchment/60 hover:text-parchment transition-colors">
            Galaxy
          </Link>
          <Link
            to="/work"
            className="text-xs font-mono uppercase tracking-wider text-voltage border border-voltage/40 rounded-lg px-3 py-1.5 hover:bg-voltage/10 transition-colors"
          >
            Work Universe
          </Link>
        </div>
      </nav>

      <HeroSection />

      {/* The cinematic journey */}
      <TravelScrollJourney />

      {/* After the journey: existing Supabase-backed content */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 space-y-24">
        <DestinationCards />
        <TravelGallery />
        <TravelHacks />
        <BlogSection />
      </div>

      <TravelFooter />
    </div>
  )
}
