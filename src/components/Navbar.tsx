import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/80 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
      aria-label="Primary navigation"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-widest text-mist hover:text-voltage transition-colors">
          VR<span className="text-crimson">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-ash hover:text-mist transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-voltage after:to-crimson hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={resumeUrl} download className="btn-ghost !px-4 !py-1.5 text-sm">
              Resume
            </a>
          </li>
          <li>
            <Link
              to="/travel"
              className="text-xs font-mono uppercase tracking-wider text-ember border border-ember/40 rounded-lg px-3 py-1.5 hover:bg-ember/10 transition-colors"
            >
              ✈ Travel Galaxy
            </Link>
          </li>
        </ul>

        <button
          className="lg:hidden p-2 text-mist"
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
            className="lg:hidden overflow-hidden bg-void/95 backdrop-blur-lg border-b border-white/5 px-5 pb-4"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-ash hover:text-mist border-b border-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href={resumeUrl} download className="btn-ghost w-full text-sm" onClick={() => setOpen(false)}>
                Download Resume
              </a>
            </li>
            <li className="pt-3">
              <Link
                to="/travel"
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-mono uppercase tracking-wider text-ember border border-ember/40 rounded-lg px-3 py-2.5"
              >
                ✈ Travel Galaxy
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
