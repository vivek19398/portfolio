import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import WormholeTransition from '../components/gateway/WormholeTransition'
import { usePageMeta } from '../hooks/usePageMeta'
import '../styles/atlas.css'
import '../styles/realm.css'
import StoryJourney from '../components/gateway/StoryJourney'

const games = [
  { name: 'Dealz', number: '01', suit: '♦', label: 'THE ART OF THE DEAL', copy: 'Big deals. Little cards. Your people.', meta: '2–5 players', url: 'https://dealgame.vercel.app/', anchor: 'what-i-built', color: 'jade' },
  { name: 'Twenty-Nine', number: '02', suit: '♠', label: 'EVERY TRICK COUNTS', copy: 'Four players. Two teams. One winning hand.', meta: '4 players · Family password required', url: 'https://29game.vercel.app/', anchor: 'twenty-nine', color: 'ice' },
  { name: 'Sequence', number: '03', suit: '●', label: 'THINK A MOVE AHEAD', copy: 'A shared screen. A little strategy.', meta: 'Computer play · Local two-player demo', url: 'https://sequence-family-table.ochre-wood-2173.chatgpt.site/', anchor: 'sequence', color: 'plum' },
  { name: 'Bhabhi / Tulla', number: '04', suit: '♣', label: 'THE LAST HAND', copy: 'A familiar game. Your private table.', meta: '3–8 players · Private invite codes', url: 'https://thullacardgame.vercel.app/', anchor: 'bhabhi-tulla', color: 'ember' },
]

export default function Gateway() {
  usePageMeta('The Atlas Drifter — Vivek Ranjan', 'Engineer. Builder. Explorer. Discover the work, games and unfolding story of Vivek Ranjan.')
  const [flight, setFlight] = useState(false)
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const reveal = { initial: reduced ? false as const : { opacity: 0, y: 70 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .9, ease: 'easeOut' as const } }
  return <main id="main" className="realm">
    <header className="realm-nav">
      <Link to="/" className="realm-wordmark" aria-label="The Atlas Drifter home">AD<span>THE ATLAS DRIFTER</span></Link>
      <nav aria-label="Main navigation"><Link to="/work">Work</Link><Link to="/games">Games</Link><a href="#story">About</a><Link to="/work#contact">Contact ↗</Link></nav>
    </header>
    <StoryJourney />
    <motion.section {...reveal} className="realm-build realm-section" id="build">
      <div className="realm-section-label"><span>01 / BEHIND THE BUILD</span><span>FROM AN IDEA TO SOMETHING REAL</span></div>
      <div className="realm-build-grid"><div><h2>A little curiosity.<br />A lot of <em>building.</em></h2><p className="realm-body">I’m Vivek. I build software that turns complex ideas into things people can actually use. Sometimes that means an intelligent application. Sometimes it means one more game with friends.</p><Link to="/work" className="realm-text-link">Discover the work ↗</Link></div><Link to="/work#projects" className="realm-forge"><span className="realm-forge-orbit" aria-hidden="true">✧</span><span className="realm-kicker">IDEAS, MADE REAL</span><h3>Built with intent.<br />Made to matter.</h3><span>Explore selected projects <b>↗</b></span></Link></div>
    </motion.section>
    <section className="realm-games realm-section" id="games">
      <div className="realm-section-label"><span>02 / THE GAME TABLE</span><span>GOOD COMPANY. GREAT RIVALRIES.</span></div>
      <div className="realm-heading-row"><h2>Your people.<br /><em>One more hand.</em></h2><div><p className="realm-body">Old favourites. New possibilities.<br />Pull up a chair.</p><Link to="/games" className="realm-text-link">All games ↗</Link></div></div>
      <div className="realm-game-grid">{games.map(game => <motion.article {...reveal} key={game.anchor} className={`realm-game ${game.color}`}>
        <a className="realm-game-art" href={game.url} target="_blank" rel="noreferrer" aria-label={`Play ${game.name} (opens in a new tab)`}><span className="realm-game-number">{game.number} / IV</span><div className="realm-card-fan" aria-hidden="true"><span className="realm-playing-card back">AD</span><span className="realm-playing-card middle">{game.suit}</span><span className="realm-playing-card front"><small>{game.number}</small>{game.suit}<small>{game.number}</small></span></div><span className="realm-art-label">{game.label}</span><span className="realm-art-arrow">↗</span></a>
        <div className="realm-game-copy"><h3>{game.name}</h3><p>{game.copy}</p><span>{game.meta}</span><div><a href={game.url} target="_blank" rel="noreferrer">{game.name === 'Sequence' ? 'Play demo' : 'Play game'} ↗</a><Link to={`/work#${game.anchor}`}>Behind the game →</Link></div></div>
      </motion.article>)}</div>
    </section>
    <section className="realm-flight-invite" aria-labelledby="flight-title"><div className="realm-flight-image" aria-hidden="true" /><div className="realm-flight-copy"><p className="realm-kicker">A SMALL DETOUR INTO THE EXTRAORDINARY</p><h2 id="flight-title">Some stories<br />begin with <em>flight.</em></h2><p>Choose your character. Brave the storm.<br />An interactive dragon flight through fire and ice.</p><button className="realm-button" disabled={flight} onClick={() => setFlight(true)}>Take flight <span>↗</span></button><span className="realm-flight-note">9 SECOND ADVENTURE · MOUSE OR TOUCH</span></div></section>
    <section className="realm-story realm-section" id="story"><div className="realm-section-label"><span>03 / THE PERSON BEHIND IT ALL</span><span>STILL CURIOUS. STILL BUILDING.</span></div><p className="realm-kicker">VIVEK RANJAN / THE ATLAS DRIFTER</p><h2>More than the things I build.<br />It’s the <em>why</em> behind them.</h2><div className="realm-story-bottom"><p className="realm-body">An engineer in Dublin, following curiosity wherever it leads. This is a collection of the work, experiments and small obsessions that make up my story.</p><Link to="/work#experience" className="realm-text-link">Follow my journey ↗</Link><a className="realm-text-link" href="/Vivek_Ranjan_Resume.pdf" target="_blank" rel="noreferrer">Read my résumé ↗</a></div></section>
    <footer className="realm-footer"><p className="realm-kicker">EVERY GOOD STORY STARTS WITH A CONVERSATION</p><Link to="/work#contact">Send a <em>raven.</em> <span>↗</span></Link><div><span>© {new Date().getFullYear()} VIVEK RANJAN</span><span>THE ATLAS DRIFTER</span><a href="#main">BACK TO THE SKY ↑</a></div></footer>
    {flight && <WormholeTransition variant="work" onComplete={() => { setFlight(false); window.scrollTo(0, 0); navigate('/work') }} />}
  </main>
}
