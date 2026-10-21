import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WormholeTransition from '../components/gateway/WormholeTransition'
import Cloudscape from '../components/gateway/Cloudscape'
import type { PortalVariant } from '../components/gateway/WormholePortal'
import { usePageMeta } from '../hooks/usePageMeta'
import { trackEvent } from '../hooks/useAnalytics'
import '../styles/atlas.css'

export default function Gateway() {
  usePageMeta('The Atlas Drifter — Vivek Ranjan', 'One life. Many stories. Explore the story of Vivek Ranjan and the things he builds.')
  const navigate = useNavigate()
  const [jump, setJump] = useState<PortalVariant | null>(null)
  function enter(variant: PortalVariant) {
    if (jump) return
    trackEvent('gateway_enter', { universe: variant })
    setJump(variant)
  }
  return <main id="main" className="atlas-gateway">
    <Cloudscape />
    <header className="atlas-masthead"><Link to="/" className="atlas-brand">AD<span>THE ATLAS DRIFTER</span></Link><span className="atlas-author">A STORY BY VIVEK RANJAN</span><a href="/Vivek_Ranjan_Resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a></header>
    <div className="atlas-embers" aria-hidden="true" />
    <section className="atlas-intro"><p className="atlas-eyebrow">AN ONGOING ORIGINAL</p><h1>The Atlas<br /><em>Drifter.</em></h1><p className="atlas-tagline">One life. Many stories.</p><p className="atlas-description">Every idea has an origin story.<br />Take flight. See where the story takes you.</p></section>
    <section className="atlas-seasons atlas-home-cards" aria-label="Explore my work">
      <button disabled={jump !== null} onClick={() => enter('work')} className="atlas-season atlas-season-build"><span className="atlas-season-copy"><span className="atlas-eyebrow">ENTER THE STORY</span><h2>Behind the Build</h2><span>Ideas. Obstacles. Things that made a difference.</span></span><span className="atlas-play" aria-hidden="true">↗</span></button>
      <article className="atlas-home-dealz" aria-labelledby="home-dealz-title">
        <div className="atlas-home-dealz-art" aria-hidden="true"><span className="atlas-mini-card atlas-mini-card-back">D</span><span className="atlas-mini-card atlas-mini-card-front">₹</span></div>
        <div className="atlas-home-dealz-copy"><span className="atlas-eyebrow">WHAT I BUILT · PLAY ONLINE</span><h2 id="home-dealz-title">Dealz<span>.</span></h2><p>Big deals. Little cards. Your people.</p><span className="atlas-home-dealz-meta">2–5 players · Bihar-inspired card game</span><div className="atlas-home-dealz-links"><a href="https://dealgame.vercel.app" target="_blank" rel="noopener noreferrer">Play Dealz ↗</a><Link to="/work#what-i-built">Behind the game →</Link></div></div>
      </article>
      <article className="atlas-home-dealz atlas-home-twenty-nine" aria-labelledby="home-twenty-nine-title">
        <div className="atlas-home-dealz-art" aria-hidden="true"><span className="atlas-mini-card atlas-mini-card-back">29</span><span className="atlas-mini-card atlas-mini-card-front">♠</span></div>
        <div className="atlas-home-dealz-copy"><span className="atlas-eyebrow">WHAT I BUILT · PLAY ONLINE</span><h2 id="home-twenty-nine-title">Twenty-Nine<span>.</span></h2><p>Four players. Two teams. Every trick counts.</p><span className="atlas-home-dealz-meta">4 players · 2 teams · Family password required</span><div className="atlas-home-dealz-links"><a href="https://29game.vercel.app/" target="_blank" rel="noopener noreferrer">Play Twenty-Nine ↗</a><Link to="/work#twenty-nine">Behind the game →</Link></div></div>
      </article>
    </section>
    <footer className="atlas-gateway-footer"><span>ONE LIFE. AN UNFOLDING STORY.</span><span>ENTER THE STORY TO TAKE FLIGHT</span></footer>
    {jump && <WormholeTransition variant={jump} onComplete={() => { window.scrollTo(0, 0); navigate(jump === 'work' ? '/work' : '/travel') }} />}
  </main>
}
