import { useEffect } from 'react'
import SectionWrapper from '../components/SectionWrapper'
import '../styles/dealz.css'

const STACK = ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Supabase', 'PostgreSQL', 'Vercel']
const FEATURES = [
  { title: 'A table for your people', text: 'Private room codes, seat selection, readiness checks, and QR invitations for 2–5 players.' },
  { title: 'Every move has rules', text: 'A shared TypeScript engine validates turns, rent, payments, wildcards, and counteractions across online and local play.' },
  { title: 'Built to stay in sync', text: 'Versioned commands, duplicate protection, and transactional updates keep concurrent moves consistent. Personalized views keep each hand private.' },
]

export default function WhatIBuilt() {
  useEffect(() => {
    // This section is lazy-loaded, so its anchor may not exist on initial navigation.
    const anchor = window.location.hash.slice(1)
    if (!['what-i-built', 'twenty-nine'].includes(anchor)) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <SectionWrapper id="what-i-built" kicker="From idea to a shared table" title="What I Built">
      <article className="dealz-showcase" aria-labelledby="dealz-title">
        <div className="dealz-overview">
          <p className="dealz-eyebrow">MULTIPLAYER · MADE FOR THE BROWSER</p>
          <h3 id="dealz-title">Dealz<span>.</span></h3>
          <p className="dealz-tagline">A familiar game.<br />A little closer to home.</p>
          <p className="dealz-description">A real-time, Monopoly Deal-inspired card game for 2–5 players. Build property sets across Bihar-inspired locations, collect rent, and turn the table with an action card — all from your browser.</p>
          <div className="dealz-actions">
            <a href="https://dealgame.vercel.app" target="_blank" rel="noopener noreferrer" className="dealz-play">Play Dealz <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/vivek19398/Deal" target="_blank" rel="noopener noreferrer" className="dealz-source">Explore the source <span aria-hidden="true">↗</span></a>
          </div>
          <p className="dealz-mode">Online with Vercel + Supabase · Local Wi-Fi with Node.js + Socket.IO</p>
        </div>
        <div className="dealz-table" aria-hidden="true">
          <span className="dealz-table-label">THE NEXT MOVE IS YOURS</span>
          <div className="dealz-card dealz-card-back"><span>DEALZ</span><span className="dealz-card-mark">D</span><span>MAKE YOUR MOVE</span></div>
          <div className="dealz-card dealz-card-property"><span className="dealz-card-band">PROPERTY</span><span className="dealz-card-place">Bhagalpur</span><span className="dealz-card-house">⌂</span><span className="dealz-card-foot">BIHAR EDITION</span></div>
          <div className="dealz-card dealz-card-action"><span className="dealz-card-band">ACTION</span><span className="dealz-card-place">Collect<br />the rent.</span><span className="dealz-card-currency">₹</span><span className="dealz-card-foot">YOUR TURN. YOUR STRATEGY.</span></div>
          <span className="dealz-table-caption">A visual nod to the game — not a gameplay screenshot.</span>
        </div>
        <div className="dealz-features">
          {FEATURES.map(feature => <div key={feature.title}><h4>{feature.title}</h4><p>{feature.text}</p></div>)}
        </div>
        <div className="dealz-engineering"><span className="dealz-eyebrow">UNDER THE TABLE</span><p>Drag-and-drop cards, guided actions, persistent online games, and seat recovery after a refresh. One rules engine, two ways to play.</p><ul aria-label="Dealz technology stack">{STACK.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
      </article>
      <article id="twenty-nine" className="dealz-showcase twenty-nine-showcase" aria-labelledby="twenty-nine-title">
        <div className="dealz-overview">
          <p className="dealz-eyebrow">FOUR PLAYERS · TWO TEAMS · EIGHT TRICKS</p>
          <h3 id="twenty-nine-title">Twenty-Nine<span>.</span></h3>
          <p className="dealz-tagline">Old-school strategy.<br />One online table.</p>
          <p className="dealz-description">A mobile-friendly version of the traditional Indian card game 29. Create a private table, invite your team with a room code, bid, choose trump, and play through eight tricks. Or practise locally with three computer players.</p>
          <div className="dealz-actions">
            <a href="https://29game.vercel.app/" target="_blank" rel="noopener noreferrer" className="dealz-play">Play Twenty-Nine <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/vivek19398/29game" target="_blank" rel="noopener noreferrer" className="dealz-source">Explore the source <span aria-hidden="true">↗</span></a>
          </div>
          <p className="dealz-mode">Live app requires the host’s family password · Local practice with three computer players</p>
        </div>
        <div className="dealz-table twenty-nine-table" aria-hidden="true">
          <span className="dealz-table-label">BID. CHOOSE TRUMP. TAKE THE TRICK.</span>
          <div className="dealz-card dealz-card-back"><span>TWENTY-NINE</span><span className="dealz-card-mark">29</span><span>FOUR PLAYERS · TWO TEAMS</span></div>
          <div className="dealz-card dealz-card-property"><span className="dealz-card-band">TRUMP</span><span className="dealz-card-place">J</span><span className="dealz-card-house">♠</span><span className="dealz-card-foot">EVERY TRICK COUNTS</span></div>
          <div className="dealz-card dealz-card-action"><span className="dealz-card-band">YOUR HAND</span><span className="dealz-card-place">9</span><span className="dealz-card-currency">♥</span><span className="dealz-card-foot">PLAY YOUR PARTNER’S GAME</span></div>
          <span className="dealz-table-caption">A visual nod to the game — not a gameplay screenshot.</span>
        </div>
        <div className="dealz-features">
          <div><h4>A bidding duel</h4><p>Increase, Stay, Drop, or enter a custom bid. Play with trump suits, Joker/no-trump, and seventh-patti rules.</p></div>
          <div><h4>Your hand stays yours</h4><p>Each player receives only their cards and the public table. The server validates actions, scores tricks, and resolves match results.</p></div>
          <div><h4>Made for a shared table</h4><p>Private room codes, animated card play with player labels, and local practice against three computer players.</p></div>
        </div>
        <div className="dealz-engineering"><span className="dealz-eyebrow">BEHIND THE TABLE</span><p>Browser → Vercel API → rules engine → Supabase PostgreSQL. Validated actions update persistent state; version checks prevent conflicting moves from overwriting each other.</p><p>The project includes 28 automated tests covering bidding, card privacy, scoring, Joker, seventh patti, and multiplayer state handling.</p><ul aria-label="Twenty-Nine technology stack">{['HTML', 'CSS', 'JavaScript', 'Node.js', 'Vercel', 'Supabase PostgreSQL'].map(tech => <li key={tech}>{tech}</li>)}</ul></div>
      </article>
    </SectionWrapper>
  )
}
