import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import '../styles/games.css'

const GAMES = [
  { id: 'dealz', name: 'Dealz', mark: 'D', suit: '₹', genre: 'PROPERTY & STRATEGY', players: '2–5 players', description: 'Build your property empire across Bihar-inspired locations. Collect rent, play your action cards, and turn the table on your friends.', note: 'Private rooms · Online multiplayer', url: 'https://dealgame.vercel.app/', story: '/work#what-i-built', source: 'https://github.com/vivek19398/Deal', action: 'Play Dealz' },
  { id: 'twenty-nine', name: 'Twenty-Nine', mark: '29', suit: '♠', genre: 'BIDDING & PARTNERSHIPS', players: '4 players · 2 teams', description: 'Bid with confidence, choose your trump, and make every trick count. A traditional Indian favourite, brought to the browser.', note: 'Family password required · Computer practice available', url: 'https://29game.vercel.app/', story: '/work#twenty-nine', source: 'https://github.com/vivek19398/29game', action: 'Play Twenty-Nine' },
  { id: 'sequence', name: 'Sequence', mark: 'S', suit: '●', genre: 'CARDS & CONNECTIONS', players: 'Solo or 2 on one device', description: 'A little planning goes a long way. Take on the computer or share a screen for a two-player game with familiar card artwork.', note: 'Hosted demo · Online multiplayer deployment pending', url: 'https://sequence-family-table.ochre-wood-2173.chatgpt.site/', story: '/work#sequence', source: null, action: 'Play Sequence demo' },
  { id: 'bhabhi-tulla', name: 'Bhabhi / Tulla', mark: 'T', suit: '♣', genre: 'THE FAMILY TABLE', players: '3–8 players', description: 'Pull up a chair at a circular felt table. Invite your people with a code and play from your own phone, with your own private hand.', note: 'Private tables · Rejoin after a refresh', url: 'https://thullacardgame.vercel.app/', story: '/work#bhabhi-tulla', source: 'https://github.com/vivek19398/Thulla_Bhabhi', action: 'Play Bhabhi / Tulla' },
]

export default function Games() {
  usePageMeta('Games — The Atlas Drifter', 'Play Dealz, Twenty-Nine, Sequence, and Bhabhi / Tulla. Browser-based card games built by Vivek Ranjan for friends and family.')
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return <div className="games-page">
    <header className="games-header"><Link to="/" className="games-brand">AD<span>THE ATLAS DRIFTER</span></Link><nav aria-label="Games navigation"><Link to="/">Home</Link><Link to="/work">My work</Link><a href="#game-library">Choose a game ↓</a></nav></header>
    <main id="main" className="games-main">
      <section className="games-intro" aria-labelledby="games-title"><p className="games-kicker">THE ATLAS DRIFTER · GAMES COLLECTION</p><h1 id="games-title">Your people.<br /><em>One more hand.</em></h1><div className="games-intro-bottom"><p>Old favourites. New rivalries.<br />Card games I built for a little more time around the table.</p><span>04 GAMES · MADE FOR THE BROWSER</span></div></section>
      <section id="game-library" className="games-library" aria-label="Choose a game">
        {GAMES.map((game, index) => <article key={game.id} className={`games-card games-card-${game.id}`} aria-labelledby={`game-title-${game.id}`}>
          <div className="games-card-art" aria-hidden="true"><span className="games-card-index">0{index + 1}</span><div className="games-art-deck games-art-back">{game.mark}</div><div className="games-art-deck games-art-front"><span>{game.suit}</span><small>THE FAMILY TABLE</small></div><span className="games-art-caption">{game.genre}</span></div>
          <div className="games-card-content"><p className="games-player-count">{game.players}</p><h2 id={`game-title-${game.id}`}>{game.name}</h2><p className="games-card-description">{game.description}</p><p className="games-access-note">{game.note}</p><div className="games-card-actions"><a className="games-play-link" href={game.url} target="_blank" rel="noopener noreferrer">{game.action} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><Link className="games-story-link" to={game.story}>How I built it →</Link>{game.source && <a className="games-source-link" href={game.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${game.name} source on GitHub`}>Source ↗</a>}</div></div>
        </article>)}
      </section>
      <p className="games-host-note">Play opens each game on its current hosted site in a new tab. Sequence is a hosted demo; its online multiplayer deployment is still in progress.</p>
    </main>
    <footer className="games-footer"><Link to="/">← Back to The Atlas Drifter</Link><span>BUILT BY VIVEK RANJAN · PLAYED TOGETHER</span></footer>
  </div>
}
