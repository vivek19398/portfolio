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
    if (window.location.hash !== '#what-i-built') return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('what-i-built')?.scrollIntoView({ block: 'start', behavior: 'instant' })
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
    </SectionWrapper>
  )
}
