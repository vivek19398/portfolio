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
    if (!['what-i-built', 'twenty-nine', 'sequence', 'bhabhi-tulla'].includes(anchor)) return
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
      <article id="sequence" className="dealz-showcase sequence-showcase" aria-labelledby="sequence-title">
        <div className="dealz-overview">
          <p className="dealz-eyebrow">COMPUTER PLAY · A SHARED SCREEN</p>
          <h3 id="sequence-title">Sequence<span>.</span></h3>
          <p className="dealz-tagline">Your next move.<br />A new family-table game.</p>
          <p className="dealz-description">A browser-based Sequence game with Twenty-Nine-style card artwork. Play against the computer, or share one device for a two-player match.</p>
          <div className="dealz-actions"><a href="https://sequence-family-table.ochre-wood-2173.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="dealz-play">Play Sequence <span aria-hidden="true">↗</span></a></div>
          <p className="dealz-mode">Hosted demo on OpenAI Sites · Online multiplayer deployment pending</p>
        </div>
        <div className="dealz-table sequence-table" aria-hidden="true"><span className="dealz-table-label">A LITTLE STRATEGY. A SHARED TABLE.</span><div className="sequence-board">{Array.from({ length: 25 }, (_, index) => <span key={index} className={[2, 7, 12, 17, 22].includes(index) ? 'sequence-chip' : ''}>{index % 3 === 0 ? '♠' : index % 3 === 1 ? '♥' : '♦'}</span>)}</div><span className="dealz-table-caption">Card-and-chip artwork inspired by the game.</span></div>
        <div className="dealz-features">
          <div><h4>Take on the computer</h4><p>Start a game without gathering a group. Computer play is available in the hosted version.</p></div>
          <div><h4>Share the screen</h4><p>Same-device two-player mode brings the family-table experience to one browser.</p></div>
          <div><h4>Built for the next step</h4><p>Online multiplayer is implemented with private hands, invite codes, reconnects, and server-validated moves. Its deployment is still pending.</p></div>
        </div>
        <div className="dealz-engineering"><span className="dealz-eyebrow">IN DEVELOPMENT</span><p>Eight automated tests passed during development. The next milestone is completing the online deployment on Vercel and Supabase.</p><ul aria-label="Sequence capabilities"><li>Computer opponents</li><li>Same-device multiplayer</li><li>Private hands</li><li>Validated moves</li></ul></div>
      </article>
      <article id="bhabhi-tulla" className="dealz-showcase tulla-showcase" aria-labelledby="tulla-title">
        <div className="dealz-overview">
          <p className="dealz-eyebrow">3–8 PLAYERS · YOUR PRIVATE TABLE</p>
          <h3 id="tulla-title">Bhabhi / Tulla<span>.</span></h3>
          <p className="dealz-tagline">A classic card game.<br />A place for everyone.</p>
          <p className="dealz-description">A mobile-friendly version of the traditional card game. Gather 3–8 players at a private table with an invite code, play around a circular felt table, and watch cards land with natural throw animations. A custom logo completes the game’s identity.</p>
          <div className="dealz-actions"><a href="https://thullacardgame.vercel.app/" target="_blank" rel="noopener noreferrer" className="dealz-play">Play Bhabhi / Tulla <span aria-hidden="true">↗</span></a><a href="https://github.com/vivek19398/Thulla_Bhabhi" target="_blank" rel="noopener noreferrer" className="dealz-source">Explore the source <span aria-hidden="true">↗</span></a></div>
          <p className="dealz-mode">Private invite-code tables · Individual player hands · Reconnect support</p>
        </div>
        <div className="dealz-table tulla-table" aria-hidden="true"><span className="dealz-table-label">PULL UP A CHAIR. PLAY YOUR HAND.</span><div className="tulla-felt"><span className="tulla-seat tulla-seat-one" /><span className="tulla-seat tulla-seat-two" /><span className="tulla-seat tulla-seat-three" /><span className="tulla-seat tulla-seat-four" /><span className="tulla-playing-card tulla-playing-card-one">A<br />♣</span><span className="tulla-playing-card tulla-playing-card-two">K<br />♥</span><span className="tulla-playing-card tulla-playing-card-three">Q<br />♠</span></div><span className="dealz-table-caption">An illustration of the circular table — not a gameplay screenshot.</span></div>
        <div className="dealz-features">
          <div><h4>Bring your people</h4><p>Private invite-code tables for 3–8 players, individual hands, and reconnect support keep the game personal and accessible.</p></div>
          <div><h4>Every move checked</h4><p>The server validates gameplay. Version checks and duplicate-move protection keep simultaneous actions consistent.</p></div>
          <div><h4>Keep the table going</h4><p>Private Vercel Blob storage persists game state as JSON, supporting the serverless multiplayer experience.</p></div>
        </div>
        <div className="dealz-engineering"><span className="dealz-eyebrow">BUILT AND VALIDATED</span><p>JavaScript and Node.js power server-validated play through Vercel Functions, with JSON persistence in private Vercel Blob storage.</p><p>Validation during development: 35 live checks and 600 simulated games covering over 53,000 moves.</p><ul aria-label="Bhabhi / Tulla technology stack">{['JavaScript', 'Node.js', 'Vercel Functions', 'Vercel Blob', 'HTML', 'CSS'].map(tech => <li key={tech}>{tech}</li>)}</ul></div>
      </article>
    </SectionWrapper>
  )
}
