/**
 * Stylized flat-design SVG scenes for the Travel World journey.
 *
 * Every scene fills its layer (`preserveAspectRatio="xMidYMid slice"`).
 * Animation is driven externally by GSAP (see TravelScrollJourney) via
 * the documented class hooks:
 *   .tw-house .tw-taxi-home #tw-road-path .tw-taxi-road .tw-stamp
 *   .tw-pass-inner .tw-fly-cloud .tw-route .tw-pin .tw-dest-building .tw-dest-title
 *
 * To swap art for real images/Lottie later: replace a scene's <svg> body
 * with an <img>/<video>/<Lottie> while keeping the wrapper class hooks.
 */

import BgVideo from './BgVideo'

const SVG_PROPS = {
  viewBox: '0 0 1200 700',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'w-full h-full',
} as const

// Deterministic starfield (no per-render randomness → stable SSR/build).
const STARS = Array.from({ length: 70 }, (_, i) => ({
  cx: (i * 97) % 1200,
  cy: (i * 53) % 400,
  r: (i % 3) * 0.5 + 0.5,
  o: ((i * 37) % 60) / 100 + 0.35,
}))

/** Stacked sky gradients + stars; GSAP cross-fades the dusk/night/arrival layers. */
export function SkyBackdrop({ staticDusk = false }: { staticDusk?: boolean }) {
  return (
    <div aria-hidden="true" className="tw-layer absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#0a1830 0%,#15355f 55%,#2a567f 100%)' }} />
      <div className="sky-dusk absolute inset-0" style={{ opacity: staticDusk ? 1 : 0, background: 'linear-gradient(180deg,#1a1336 0%,#5a2a4a 55%,#c2592a 100%)' }} />
      <div className="sky-night absolute inset-0 opacity-0" style={{ background: 'linear-gradient(180deg,#03040a 0%,#070c1c 55%,#0d1730 100%)' }} />
      <div className="sky-arrival absolute inset-0 opacity-0" style={{ background: 'linear-gradient(180deg,#0a1830 0%,#5a4a6a 50%,#e8a85a 100%)' }} />
      <svg {...SVG_PROPS} className="tw-stars w-full h-full absolute inset-0 opacity-0">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#f5e6c8" opacity={s.o} />
        ))}
      </svg>
    </div>
  )
}

function Taxi({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" className={className}>
      <ellipse cx="110" cy="108" rx="92" ry="8" fill="#000" opacity="0.3" />
      <path d="M18 78 Q18 58 40 56 L72 38 Q80 32 96 32 L150 32 Q166 32 174 46 L188 56 Q204 58 204 78 L204 86 Q204 92 198 92 L24 92 Q18 92 18 86 Z" fill="#e8b23a" />
      <path d="M82 40 L146 40 Q156 40 160 52 L164 56 L96 56 L84 56 Q80 48 82 40 Z" fill="#bfe3ff" opacity="0.9" />
      <rect x="118" y="40" width="3" height="16" fill="#e8b23a" />
      <rect x="60" y="62" width="104" height="9" rx="2" fill="#1a1208" />
      <rect x="92" y="20" width="40" height="13" rx="3" fill="#fff" />
      <text x="112" y="30" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#1a1208" fontWeight="bold">TAXI</text>
      <circle cx="64" cy="92" r="17" fill="#0a0a0a" />
      <circle cx="64" cy="92" r="7" fill="#888" />
      <circle cx="158" cy="92" r="17" fill="#0a0a0a" />
      <circle cx="158" cy="92" r="7" fill="#888" />
      <circle cx="200" cy="74" r="5" fill="#fff3c4" />
    </svg>
  )
}

export function HomeScene() {
  return (
    <div className="relative w-full h-full">
      <svg {...SVG_PROPS}>
        <rect y="540" width="1200" height="160" fill="#11200f" />
        <path d="M0 560 Q600 520 1200 560 L1200 700 L0 700 Z" fill="#16301a" />
        {/* House */}
        <g className="tw-house">
          <rect x="170" y="360" width="300" height="200" fill="#243042" />
          <path d="M150 360 L320 250 L490 360 Z" fill="#3a2a1a" />
          <rect x="290" y="450" width="64" height="110" fill="#7a6130" rx="3" />
          <rect x="200" y="400" width="60" height="56" fill="#bfe3ff" opacity="0.85" rx="3" />
          <rect x="380" y="400" width="60" height="56" fill="#bfe3ff" opacity="0.85" rx="3" />
          <rect x="404" y="280" width="34" height="50" fill="#2a3646" />
        </g>
        {/* Tree */}
        <g opacity="0.95">
          <rect x="700" y="430" width="20" height="130" fill="#3a2a1a" />
          <circle cx="710" cy="410" r="64" fill="#1f4022" />
          <circle cx="760" cy="440" r="48" fill="#234a26" />
          <circle cx="662" cy="442" r="44" fill="#1c3a1f" />
        </g>
        {/* Driveway */}
        <path d="M520 560 L760 560 L900 700 L420 700 Z" fill="#2b2f38" />
        <rect x="636" y="580" width="14" height="110" fill="#c9a84c" opacity="0.5" />
      </svg>
      <div className="tw-taxi-home absolute" style={{ left: '46%', bottom: '8%', width: '24%' }}>
        <Taxi className="w-full" />
      </div>
    </div>
  )
}

export function RoadScene() {
  return (
    <svg {...SVG_PROPS}>
      {/* Distant hills + airport silhouette */}
      <path d="M0 470 Q300 410 620 460 T1200 440 L1200 700 L0 700 Z" fill="#16223a" />
      <g opacity="0.8">
        <rect x="930" y="360" width="180" height="100" fill="#1d2c4a" rx="4" />
        <rect x="1000" y="300" width="26" height="64" fill="#26395f" />
        <circle cx="1013" cy="296" r="7" fill="#38bdf8" opacity="0.8" />
        <text x="1020" y="420" textAnchor="middle" fontSize="15" fontFamily="monospace" fill="#c9a84c" letterSpacing="3">AIRPORT</text>
      </g>
      {/* Curved road */}
      <path d="M-40 700 C 260 560, 360 560, 560 500 S 940 430, 1240 380" fill="none" stroke="#2b2f38" strokeWidth="120" strokeLinecap="round" />
      <path id="tw-road-path" d="M-40 690 C 260 552, 360 552, 560 492 S 940 422, 1240 372" fill="none" stroke="none" />
      <path d="M-40 690 C 260 552, 360 552, 560 492 S 940 422, 1240 372" fill="none" stroke="#c9a84c" strokeWidth="4" strokeDasharray="26 30" opacity="0.6" />
      {/* Taxi rides the path (GSAP positions this group via #tw-road-path) */}
      <g className="tw-taxi-road">
        <g transform="translate(-46,-26) scale(0.42)">
          <Taxi className="" />
        </g>
      </g>
    </svg>
  )
}

export function AirportScene() {
  return (
    <svg {...SVG_PROPS}>
      <rect width="1200" height="700" fill="#0c1426" opacity="0.4" />
      <rect y="540" width="1200" height="160" fill="#1a2236" />
      {/* Terminal */}
      <path d="M120 540 L120 360 Q120 320 200 312 L1000 312 Q1080 320 1080 360 L1080 540 Z" fill="#243042" />
      <path d="M120 360 Q600 300 1080 360 L1080 392 Q600 332 120 392 Z" fill="#2e3e54" />
      {[...Array(9)].map((_, i) => (
        <rect key={i} x={180 + i * 96} y="420" width="60" height="120" fill="#bfe3ff" opacity="0.7" rx="3" />
      ))}
      {/* Control tower */}
      <rect x="980" y="180" width="40" height="180" fill="#2a3646" />
      <rect x="966" y="150" width="68" height="42" rx="8" fill="#34465f" />
      <circle cx="1000" cy="138" r="6" fill="#e3344e" />
      {/* Signage */}
      <rect x="470" y="470" width="260" height="54" rx="6" fill="#0d1730" stroke="#c9a84c" strokeWidth="2" />
      <text x="600" y="505" textAnchor="middle" fontSize="22" fontFamily="serif" fill="#e8c97a" letterSpacing="4">DEPARTURES</text>
    </svg>
  )
}

export function CheckInScene() {
  const stamps = [
    { x: 250, y: 250, c: '#e3344e', label: 'PAR' },
    { x: 880, y: 220, c: '#38bdf8', label: 'NYC' },
    { x: 980, y: 430, c: '#c9a84c', label: 'TYO' },
    { x: 210, y: 470, c: '#f59e0b', label: 'ROM' },
  ]
  return (
    <svg {...SVG_PROPS}>
      <rect width="1200" height="700" fill="#0d1426" />
      {/* Counter */}
      <rect x="160" y="430" width="880" height="160" rx="10" fill="#243042" />
      <rect x="160" y="430" width="880" height="26" rx="10" fill="#c9a84c" opacity="0.5" />
      {/* Departure board */}
      <rect x="300" y="120" width="600" height="180" rx="10" fill="#070c1c" stroke="#26395f" strokeWidth="2" />
      {[...Array(4)].map((_, i) => (
        <g key={i} opacity="0.9">
          <text x="330" y={166 + i * 38} fontSize="16" fontFamily="monospace" fill="#c9a84c">{['DUB', 'CDG', 'JFK', 'HND'][i]}</text>
          <text x="470" y={166 + i * 38} fontSize="16" fontFamily="monospace" fill="#e7e9f2">{['10:25', '12:40', '15:05', '21:30'][i]}</text>
          <text x="700" y={166 + i * 38} fontSize="16" fontFamily="monospace" fill="#38bdf8">{['BOARDING', 'ON TIME', 'ON TIME', 'GATE 22'][i]}</text>
        </g>
      ))}
      {/* Passport */}
      <rect x="520" y="470" width="160" height="110" rx="8" fill="#5a1c2a" />
      <rect x="536" y="486" width="128" height="78" rx="4" fill="none" stroke="#e8c97a" strokeWidth="1.5" opacity="0.7" />
      <circle cx="600" cy="512" r="14" fill="none" stroke="#e8c97a" strokeWidth="1.5" opacity="0.7" />
      <text x="600" y="552" textAnchor="middle" fontSize="11" fontFamily="serif" fill="#e8c97a" letterSpacing="2">PASSPORT</text>
      {/* Flying stamps */}
      {stamps.map((s, i) => (
        <g key={i} className="tw-stamp" transform={`translate(${s.x},${s.y})`}>
          <circle r="34" fill="none" stroke={s.c} strokeWidth="3" opacity="0.85" />
          <circle r="27" fill="none" stroke={s.c} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <text textAnchor="middle" y="6" fontSize="16" fontFamily="monospace" fill={s.c} fontWeight="bold">{s.label}</text>
        </g>
      ))}
    </svg>
  )
}

export function BoardingScene() {
  return (
    <div className="relative w-full h-full">
      <svg {...SVG_PROPS}>
        <rect width="1200" height="700" fill="#0b1322" />
        <rect y="560" width="1200" height="140" fill="#161e30" />
        {/* Gate sign */}
        <rect x="430" y="120" width="340" height="90" rx="10" fill="#070c1c" stroke="#c9a84c" strokeWidth="2" />
        <text x="600" y="166" textAnchor="middle" fontSize="22" fontFamily="serif" fill="#e8c97a" letterSpacing="3">GATE 22</text>
        <text x="600" y="192" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#38bdf8" letterSpacing="2">NOW BOARDING</text>
        {/* Jet bridge */}
        <path d="M120 420 L780 420 L780 560 L120 560 Z" fill="#1d2840" />
        <path d="M780 430 Q980 430 1020 470 L1020 560 L780 560 Z" fill="#243454" />
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={170 + i * 95} y="450" width="46" height="60" fill="#bfe3ff" opacity="0.55" rx="3" />
        ))}
        {/* Queue posts */}
        {[...Array(4)].map((_, i) => (
          <g key={i}>
            <rect x={360 + i * 70} y="500" width="6" height="60" fill="#c9a84c" opacity="0.7" />
            <circle cx={363 + i * 70} cy="500" r="7" fill="#e8c97a" />
          </g>
        ))}
      </svg>
      {/* Boarding pass — flips on the timeline (.tw-pass-inner) */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2" style={{ width: '36%', maxWidth: 360, aspectRatio: '16/9', perspective: 800 }}>
        <div className="tw-pass-inner relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl royal-border glass-panel p-4 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">Boarding Pass</span>
              <span className="font-mono text-[10px] text-parchment/60">SEAT 12A</span>
            </div>
            <div className="flex items-center justify-between text-mist">
              <span className="font-display text-2xl">DUB</span>
              <span className="text-gold">✈</span>
              <span className="font-display text-2xl">∞</span>
            </div>
            <span className="font-mono text-[9px] text-parchment/40 tracking-widest">GATE 22 · GROUP 1</span>
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl royal-border glass-panel flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Cleared</p>
              <p className="font-display text-xl text-mist">Welcome aboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WindowScene() {
  // Real plane-window footage shows through the punched-out cabin window.
  return (
    <div className="relative w-full h-full">
      <BgVideo src="/journey/flight.mp4" poster="/journey/flight-poster.webp" className="absolute inset-0" />
      <svg {...SVG_PROPS} className="w-full h-full absolute inset-0">
        <defs>
          {/* White = visible cabin wall, black = the see-through window hole */}
          <mask id="tw-window-hole">
            <rect width="1200" height="700" fill="#fff" />
            <rect x="470" y="150" width="260" height="400" rx="120" fill="#000" />
          </mask>
          <linearGradient id="tw-cabin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a212c" />
            <stop offset="1" stopColor="#0a0d13" />
          </linearGradient>
        </defs>
        {/* Cabin wall with the window punched out */}
        <rect width="1200" height="700" fill="url(#tw-cabin)" mask="url(#tw-window-hole)" />
        {/* Metallic window frame */}
        <rect x="452" y="132" width="296" height="436" rx="148" fill="none" stroke="#1c222e" strokeWidth="40" />
        <rect x="470" y="150" width="260" height="400" rx="120" fill="none" stroke="#2a323f" strokeWidth="6" />
        <rect x="470" y="150" width="260" height="400" rx="120" fill="none" stroke="#000" strokeWidth="2" opacity="0.4" />
        {/* Shade + seat hints */}
        <rect x="452" y="132" width="296" height="34" rx="17" fill="#222a36" />
        <rect x="90" y="560" width="320" height="140" rx="22" fill="#161d28" />
        <rect x="790" y="560" width="320" height="140" rx="22" fill="#161d28" />
      </svg>
    </div>
  )
}

export function CloudLayer({ className = '' }: { className?: string }) {
  // Clouds drift through the window during flight (.tw-fly-cloud).
  const clouds = [
    { x: 300, y: 200, s: 1 },
    { x: 560, y: 320, s: 0.7 },
    { x: 720, y: 180, s: 0.85 },
    { x: 460, y: 420, s: 0.6 },
  ]
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ clipPath: 'inset(21.4% 39.2% 21.4% 39.2% round 60px)' }}>
      <svg {...SVG_PROPS}>
        {clouds.map((c, i) => (
          <g key={i} className="tw-fly-cloud" transform={`translate(${c.x},${c.y}) scale(${c.s})`} opacity="0.85">
            <ellipse cx="0" cy="0" rx="90" ry="34" fill="#dfe9f5" />
            <ellipse cx="-50" cy="10" rx="50" ry="26" fill="#cdd9ea" />
            <ellipse cx="55" cy="12" rx="56" ry="28" fill="#eef4fb" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function MapRouteScene() {
  return (
    <div className="relative w-[88%] max-w-3xl aspect-[16/10] royal-border glass-panel p-4">
      <span aria-hidden="true" className="grain-overlay rounded-2xl" />
      <svg viewBox="0 0 800 500" className="relative w-full h-full">
        {/* abstract continents */}
        <g fill="#1c2c1f" opacity="0.7">
          <path d="M80 140 Q180 90 280 150 T420 160 L400 280 Q260 320 140 280 Z" />
          <path d="M520 120 Q640 110 720 190 L700 300 Q600 340 540 280 Z" />
        </g>
        <g stroke="#26395f" strokeWidth="1" opacity="0.4">
          {[...Array(7)].map((_, i) => <line key={i} x1="0" y1={i * 80} x2="800" y2={i * 80} />)}
          {[...Array(10)].map((_, i) => <line key={i} x1={i * 90} y1="0" x2={i * 90} y2="500" />)}
        </g>
        {/* Flight path (.tw-route draws via dashoffset) */}
        <path className="tw-route" d="M170 250 Q380 60 620 220" fill="none" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" />
        {/* Pins */}
        <g className="tw-pin" transform="translate(170,250)">
          <circle r="9" fill="#38bdf8" />
          <circle r="16" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.5" />
        </g>
        <g className="tw-pin" transform="translate(400,120)">
          <circle r="6" fill="#f59e0b" />
        </g>
        <g className="tw-pin" transform="translate(620,220)">
          <path d="M0 -26 C 16 -26 16 -6 0 8 C -16 -6 -16 -26 0 -26 Z" fill="#e3344e" />
          <circle cy="-16" r="6" fill="#0b1322" />
        </g>
      </svg>
      <p className="absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.3em] uppercase text-gold">In transit · 38,000 ft</p>
    </div>
  )
}

export function DestinationScene() {
  // Real arrival footage (a misty lakeside) with a cinematic scrim + title.
  return (
    <div className="relative w-full h-full">
      <BgVideo src="/journey/dest.mp4" poster="/journey/dest-poster.webp" className="absolute inset-0" objectPosition="center" />
      {/* Legibility scrims */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.05) 35%, rgba(5,5,7,0.15) 70%, rgba(5,5,7,0.85) 100%)' }} />
      <span aria-hidden="true" className="vignette-overlay" />
      <span aria-hidden="true" className="grain-overlay" />
      {/* Runway-light flourish along the base (kept from the original) */}
      <svg {...SVG_PROPS} className="w-full h-full absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <circle key={i} className="tw-dest-building" cx={120 + i * 90} cy={648} r="4" fill="#c9a84c" opacity="0.75" />
        ))}
      </svg>
      <div className="tw-dest-title absolute inset-x-0 top-[18%] text-center px-6">
        <p className="font-mono text-[11px] tracking-[0.45em] uppercase text-gold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">You have arrived</p>
        <h2 className="font-display text-4xl sm:text-6xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
          <span className="gold-text">Destination Unlocked</span>
        </h2>
      </div>
    </div>
  )
}

export function Plane({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 140" className={`w-full ${className}`}>
      {/* contrail */}
      <path d="M10 86 Q120 80 150 78" fill="none" stroke="#f5e6c8" strokeWidth="10" strokeLinecap="round" opacity="0.18" />
      <g>
        <path d="M150 70 Q250 50 306 64 Q312 66 306 72 Q250 86 150 80 Z" fill="#e7e9f2" />
        <path d="M150 76 L120 74 L96 96 L116 80 L60 80 Q40 80 42 74 Q44 68 60 68 L150 66 Z" fill="#cdd6e6" />
        <path d="M196 70 L214 40 L228 42 L218 70 Z" fill="#9fb0c8" />
        <path d="M196 78 L214 104 L228 102 L218 78 Z" fill="#b9c5d8" />
        <path d="M276 60 L292 44 L300 48 L292 64 Z" fill="#9fb0c8" />
        {[...Array(5)].map((_, i) => <circle key={i} cx={170 + i * 18} cy="72" r="2.4" fill="#38bdf8" opacity="0.8" />)}
        <path d="M298 64 Q312 64 306 72 Z" fill="#e3344e" />
      </g>
    </svg>
  )
}
