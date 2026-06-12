import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { to: '/travel', label: 'Home', end: true },
  { to: '/travel/gallery', label: 'Gallery' },
  { to: '/travel/stories', label: 'Stories' },
  { to: '/travel/hacks', label: 'Hacks' },
  { to: '/blog', label: 'Blog' },
]

/** Warm, explorer-toned navbar for the Travel Galaxy. */
export default function TravelNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] tracking-[0.12em] uppercase transition-colors duration-200 relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gradient-to-r after:from-gold after:to-gold-light after:transition-all after:duration-300 ${isActive ? 'text-gold-light after:w-full' : 'text-parchment/60 hover:text-parchment after:w-0 hover:after:w-full'}`

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/85 backdrop-blur-lg border-b border-gold/15 shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
      aria-label="Travel navigation"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-base tracking-[0.3em] uppercase text-gold hover:text-gold-light transition-colors">
          Travel Galaxy
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/work"
              className="text-xs font-mono uppercase tracking-wider text-voltage border border-voltage/40 rounded-lg px-3 py-1.5 hover:bg-voltage/10 transition-colors"
            >
              Work Universe
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden p-2 text-mist"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-void/95 backdrop-blur-lg border-b border-white/5 px-5 pb-4"
          >
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-ash hover:text-mist border-b border-white/5"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/work"
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-mono uppercase tracking-wider text-voltage border border-voltage/40 rounded-lg px-3 py-2.5"
              >
                Work Universe
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
