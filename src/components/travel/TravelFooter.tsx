import { Link } from 'react-router-dom'

export default function TravelFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-gold/10 bg-charcoal/60 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display tracking-widest text-mist">
            TRAVEL GALAXY<span className="text-gold">.</span>
          </p>
          <p className="text-xs text-ash mt-1">© {year} Vivek Ranjan. Wander often, wonder always.</p>
        </div>

        <nav aria-label="Travel footer links" className="flex items-center gap-5 text-sm">
          <Link to="/" className="text-ash hover:text-gold-light transition-colors">Gateway</Link>
          <Link to="/work" className="text-ash hover:text-voltage transition-colors">Work Universe</Link>
          <a href="https://linkedin.com/in/ranjanvivek19" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-gold-light transition-colors">
            LinkedIn
          </a>
          <a href="mailto:info@atlasdrifter.com" className="text-ash hover:text-gold-light transition-colors">Email</a>
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border border-gold/40 text-gold-light bg-gold/5 hover:bg-gold/15 transition-all hover:scale-[1.04]"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  )
}
