import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import '../../styles/story-journey.css'

function StoryBeat({ progress, range, children, className = '' }: { progress: MotionValue<number>; range: number[]; children: ReactNode; className?: string }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [30, 0, 0, -25])
  const visibility = useTransform(progress, value => value < range[0] || value > range[3] ? 'hidden' : 'visible')
  return <motion.div className={`journey-beat ${className}`} style={{ opacity, y, visibility }}>{children}</motion.div>
}

export default function StoryJourney() {
  const track = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 28, restDelta: .0001 })
  // One camera moves toward the same citadel. The window remains a shared landmark.
  const scale = useTransform(progress, [0, .3, .6, 1], [1, 1.12, 1.4, 1.48])
  const x = useTransform(progress, [0, .6, 1], ['0%', '-12%', '-15%'])
  const y = useTransform(progress, [0, .6], ['0%', '-5%'])
  const archScale = useTransform(progress, [0, .3, .65, 1], [2.8, 2.3, 1, .95])
  const archOpacity = useTransform(progress, [0, .25, .55], [0, .1, 1])
  const warmth = useTransform(progress, [.32, .68, 1], [0, .75, .9])
  const fogX = useTransform(progress, [0, 1], ['-22%', '22%'])
  const fogOpacity = useTransform(progress, [0, .3, .5, .7, 1], [.15, .4, .6, .18, .05])
  const deskY = useTransform(progress, [.62, .91], ['110%', '0%'])
  const cardsY = useTransform(progress, [.75, .94], [70, 0])
  const cardsOpacity = useTransform(progress, [.76, .9], [0, 1])
  const openingOpacity = useTransform(progress, [0, .13, .22], [1, 1, 0])
  const openingVisibility = useTransform(progress, value => value > .22 ? 'hidden' : 'visible')
  const titleY = useTransform(progress, [0, .22], [0, -45])
  const chapter = useTransform(progress, (value): string => value < .22 ? 'I · THE ARRIVAL' : value < .49 ? 'II · THE CURIOSITY' : value < .77 ? 'III · THE WORKSHOP' : 'IV · THE GATHERING')

  if (reduced) return <section className="journey-static"><p className="realm-kicker">A WORLD BY VIVEK RANJAN</p><h1>The Atlas<br /><em>Drifter.</em></h1><p>Engineer. Builder. Explorer.</p><p>I follow curiosity, build ideas into software, and bring people together through play.</p><Link className="realm-button" to="/work">Explore my work ↗</Link><a className="realm-text-link" href="#games">Discover the games ↓</a></section>

  return <section ref={track} className="journey-track" aria-label="The Atlas Drifter: a journey from curiosity to creation">
    <div className="journey-stage">
      <motion.div className="journey-landscape" aria-hidden="true" style={{ scale, x, y }} />
      <motion.div className="journey-warmth" aria-hidden="true" style={{ opacity: warmth }} />
      <motion.div className="journey-architecture" aria-hidden="true" style={{ scale: archScale, opacity: archOpacity }}>
        <div className="journey-arch" /><div className="journey-mortar" /><span className="journey-lamp lamp-left" /><span className="journey-lamp lamp-right" />
      </motion.div>
      <motion.div className="journey-fog" aria-hidden="true" style={{ x: fogX, opacity: fogOpacity }} />
      <motion.div className="journey-desk" aria-hidden="true" style={{ y: deskY }}><div className="journey-drawing"><span>AN IDEA, TAKING SHAPE</span><svg viewBox="0 0 500 180"><path d="M30 90 H150 M200 90 H300 M350 90 H470 M175 65 V20 H325 V65 M175 115 V160 H325 V115" /><circle cx="175" cy="90" r="25"/><circle cx="325" cy="90" r="25"/><circle cx="30" cy="90" r="7"/><circle cx="470" cy="90" r="7"/></svg></div><motion.div className="journey-cards" style={{ y: cardsY, opacity: cardsOpacity }}>{['♠','♦','♣','♥'].map((suit,i)=><span key={suit} style={{rotate:`${(i-1.5)*12}deg`}}><small>{['29','D','S','T'][i]}</small>{suit}</span>)}</motion.div></motion.div>
      <motion.div className="journey-opening" style={{opacity:openingOpacity,y:titleY,visibility:openingVisibility}}><p className="realm-kicker">A WORLD BY VIVEK RANJAN</p><h1>The Atlas<br /><em>Drifter.</em></h1><p className="journey-lead">Every creation starts with curiosity.</p><p className="journey-sub">Engineer. Builder. Explorer.</p><div className="realm-actions"><Link className="realm-button" to="/work">Explore my work ↗</Link><a className="realm-text-link" href="#games">Play my games ↗</a></div></motion.div>
      <StoryBeat progress={progress} range={[.2,.27,.39,.48]} className="journey-curiosity"><p className="realm-kicker">I / A QUESTION BECOMES A JOURNEY</p><h2>What if an idea<br />could become<br /><em>its own world?</em></h2><p>That question keeps me building.<br />I’m Vivek, an engineer following curiosity.</p></StoryBeat>
      <StoryBeat progress={progress} range={[.47,.56,.66,.76]} className="journey-workshop"><p className="realm-kicker">II / INSIDE THE WORKSHOP</p><h2>So I take it apart.<br />Then build<br /><em>something real.</em></h2><p>From intelligent applications to small experiments.<br />A little imagination. A lot of engineering.</p></StoryBeat>
      <StoryBeat progress={progress} range={[.75,.84,1,1.1]} className="journey-gathering"><p className="realm-kicker">III / SOMETHING WORTH SHARING</p><h2>And sometimes,<br />a world begins<br />with <em>one more hand.</em></h2><p>Games for friends. Familiar rivalries.<br />Things that bring us a little closer.</p><a className="realm-text-link" href="#games">Pull up a chair ↓</a></StoryBeat>
      <div className="journey-footer"><motion.span>{chapter}</motion.span><div className="journey-progress"><motion.i style={{scaleX:progress}} /></div><a href="#build">EXPLORE THE WORK ↓</a></div>
    </div>
  </section>
}
