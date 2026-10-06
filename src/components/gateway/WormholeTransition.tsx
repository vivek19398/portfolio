import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { PortalVariant } from './WormholePortal'
import Cloudscape from './Cloudscape'

type Character = 'jon' | 'daenerys'
const HAZARDS = [{ time: 1.8, x: 50, y: 68 }, { time: 3.0, x: 28, y: 48 }, { time: 4.2, x: 72, y: 72 }, { time: 5.4, x: 45, y: 35 }, { time: 6.6, x: 65, y: 55 }, { time: 7.8, x: 35, y: 75 }]
export default function WormholeTransition({ onComplete }: { variant: PortalVariant; onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [character, setCharacter] = useState<Character | null>(null)
  const [position, setPosition] = useState({ x: 50, y: 68, angle: 0 })
  const [elapsed, setElapsed] = useState(0)
  const [score, setScore] = useState(0)
  const [damage, setDamage] = useState(0)
  const [impact, setImpact] = useState(-1)
  const [finished, setFinished] = useState(false)
  const x = useRef(50)
  const y = useRef(68)
  const heading = useRef(0)
  const keys = useRef({ left: false, right: false })
  const judged = useRef(new Set<number>())
  const complete = useRef(onComplete)
  complete.current = onComplete
  const done = useRef(false)
  function leave() { if (!done.current) { done.current = true; complete.current() } }
  useEffect(() => {
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = old }
  }, [])
  useEffect(() => {
    if (!character) return
    let frame = 0
    const start = performance.now()
    let previous = start
    function loop(now: number) {
      const dt = Math.min((now - previous) / 1000, .05)
      previous = now
      const t = Math.min((now - start) / 1000, 9)
      x.current = Math.max(12, Math.min(88, x.current + ((keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0)) * dt * 42))
      setPosition({ x: x.current, y: y.current, angle: heading.current }); setElapsed(t)
      HAZARDS.forEach((hazard, index) => {
        if (t >= hazard.time && !judged.current.has(index)) {
          judged.current.add(index)
          const hit = Math.hypot((x.current - hazard.x) / 14, (y.current - hazard.y) / 12) < 1
          if (hit) { setDamage(d => d + 1); setImpact(index) }
          else setScore(s => s + 1)
        }
      })
      if (t < 9) frame = requestAnimationFrame(loop)
      else { keys.current = { left: false, right: false }; setFinished(true) }
    }
    function key(event: KeyboardEvent, down: boolean) {
      if (['ArrowLeft', 'a', 'A'].includes(event.key)) { event.preventDefault(); keys.current.left = down }
      if (['ArrowRight', 'd', 'D'].includes(event.key)) { event.preventDefault(); keys.current.right = down }
    }
    const keydown = (event: KeyboardEvent) => key(event, true)
    const keyup = (event: KeyboardEvent) => key(event, false)
    const blur = () => { keys.current = { left: false, right: false } }
    window.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup); window.addEventListener('blur', blur)
    frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); window.removeEventListener('blur', blur) }
  }, [character])
  useEffect(() => {
    if (!finished) return
    const timer = window.setTimeout(leave, 700)
    return () => window.clearTimeout(timer)
  }, [finished])
  function steer(clientX: number, clientY: number, rect: DOMRect) {
    if (finished) return
    const nextX = Math.max(10, Math.min(90, (clientX - rect.left) / rect.width * 100))
    const nextY = Math.max(28, Math.min(84, (clientY - rect.top) / rect.height * 100))
    const dx = nextX - x.current
    const dy = nextY - y.current
    if (Math.abs(dx) + Math.abs(dy) > .3) heading.current = Math.max(-30, Math.min(30, dx * .6 + dy * .45))
    x.current = nextX
    y.current = nextY
    setPosition({ x: nextX, y: nextY, angle: heading.current })
  }
  return <div className={`atlas-game atlas-flight-game ${character ? `atlas-weather-${character}` : ''} ${reduced ? 'atlas-game-reduced' : ''}`} role="dialog" aria-modal="true" aria-label="Ride the dragon">
    {!character && <Cloudscape />}
    {character && <div className="atlas-battle-sky" aria-hidden="true"><div className="atlas-storm-fog atlas-storm-fog-one" /><div className="atlas-storm-fog atlas-storm-fog-two" /><div className="atlas-weather-particles">{Array.from({length:28}, (_,i)=><i key={i} style={{left:`${(i*37)%100}%`,animationDelay:`${-(i%7)}s`,animationDuration:`${2+i%4}s`}} />)}</div></div>}<div className="atlas-game-shade" />
    <button autoFocus className="atlas-skip" onClick={leave}>Skip to portfolio →</button>
    {!character ? <section className="atlas-character-select"><p className="atlas-eyebrow">BEHIND THE BUILD · RIDE THE DRAGON</p><h2>Choose your character.</h2><p>Nine seconds in the skies. Fire or ice — survive the storm.</p><div className="atlas-character-options">
      <button className="atlas-character-card atlas-character-jon" onClick={() => setCharacter('jon')}><img className="atlas-character-portrait" src="/images/northern-rider-anime.png" alt="Anime northern warrior with dark hair and a winter cloak" /><h3>Jon Snow</h3><p>Navigate an icy storm and dodge incoming snowballs.</p><span className="atlas-character-action">Mount the dragon →</span></button>
      <button className="atlas-character-card atlas-character-daenerys" onClick={() => setCharacter('daenerys')}><img className="atlas-character-portrait" src="/images/dragon-queen-anime.png" alt="Anime dragon queen with silver braided hair" /><h3>Daenerys</h3><p>Navigate the burning skies and dodge incoming fireballs.</p><span className="atlas-character-action">Mount the dragon →</span></button>
    </div><p className="atlas-game-instructions">Click anywhere in the sky, or touch and drag freely. Move freely in every direction to dodge the incoming hazards.</p></section> : <>
      <div className="atlas-steering-field" onPointerMove={event => { if (event.buttons || event.pointerType === "touch") steer(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect()) }} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); steer(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect()) }} aria-hidden="true" />
      <header className="atlas-game-hud"><div><p className="atlas-eyebrow">{character === 'jon' ? 'JON SNOW' : 'DAENERYS'} · DRAGON RIDER</p><h2>{finished ? 'The kingdom awaits.' : 'Take the reins.'}</h2><p>{finished ? 'Entering Behind the Build…' : character === 'jon' ? 'Drag freely to dodge the incoming snowballs.' : 'Drag freely to dodge the incoming fireballs.'}</p></div><div className="atlas-game-clock" role="timer">{Math.max(0, Math.ceil(9 - elapsed))}<span>SECONDS</span></div></header>
      <div className="atlas-hazard-field" aria-hidden="true">{HAZARDS.map((hazard, index) => {
        const distance = elapsed - hazard.time
        const progress = (distance + 1.6) / 1.6
        return distance > -1.6 && distance < .5 ? <div key={index} className={`atlas-projectile ${character === 'jon' ? 'atlas-snowball' : 'atlas-fireball'}`} style={{left:`${50 + (hazard.x - 50) * progress}%`,top:`${15 + (hazard.y - 15) * progress}%`,transform:`translate(-50%,-50%) scale(${.1 + progress * 1.6})`,opacity:distance > 0 ? Math.max(0, 1-distance/.5) : 1}}><i className="atlas-projectile-trail" /><i className="atlas-projectile-core" /></div> : null
      })}</div>
      {impact >= 0 && <div key={impact} className="atlas-hit-flash" aria-hidden="true" />}
      <div className="atlas-player-dragon" style={{ left:`${position.x}%`, top:`${position.y}%`, transform:`translate(-50%,-50%) rotate(${position.angle}deg) scale(${.55 + (position.y - 28) / 80})` }}><div className="atlas-player-wingbeat"><img className="atlas-mounted-dragon" src={character === 'jon' ? '/images/northern-rider-mounted.png' : '/images/dragon-queen-mounted.png'} alt={character === 'jon' ? 'Northern warrior seated on a flying dragon' : 'Silver-haired queen seated on a flying dragon'} draggable={false} /></div></div>
      <footer className="atlas-flight-score" aria-live="polite">{score} / 6 HAZARDS DODGED · {damage === 0 ? 'UNSCATHED' : `${damage} HITS`}</footer>

      <div className="atlas-game-progress" style={{animation:'none',transform:`scaleX(${elapsed/9})`}} aria-hidden="true" />
      {finished && <div className="atlas-game-arrival" />}
    </>}
  </div>
}
