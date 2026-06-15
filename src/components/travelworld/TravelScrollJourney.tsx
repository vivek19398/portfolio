import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import {
  AirportScene,
  BoardingScene,
  CheckInScene,
  CloudLayer,
  DestinationScene,
  HomeScene,
  MapRouteScene,
  Plane,
  RoadScene,
  SkyBackdrop,
  WindowScene,
} from './scenes'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/**
 * Six milestones surfaced to the progress indicator, keyed to scroll
 * fraction (0–1). The active milestone is the last one whose `at` has
 * been passed.
 */
export const JOURNEY_STAGES = [
  { key: 'home', label: 'Home', at: 0 },
  { key: 'airport', label: 'Airport', at: 0.22 },
  { key: 'checkin', label: 'Check-in', at: 0.36 },
  { key: 'boarding', label: 'Boarding', at: 0.5 },
  { key: 'flight', label: 'Flight', at: 0.66 },
  { key: 'destination', label: 'Destination', at: 0.9 },
] as const

interface TravelScrollJourneyProps {
  /** Reports scroll progress (0–1) so the parent can drive the indicator. */
  onProgress?: (progress: number) => void
}

/**
 * One continuous cinematic scene. A tall wrapper scrolls while the stage
 * stays pinned; a single scrubbed GSAP timeline cross-fades and morphs
 * each travel stage into the next:
 *   taxi arrives → drives a curved road → airport → check-in → boarding
 *   → into the cabin → takeoff → flight through clouds + route map → landing.
 *
 * Honors prefers-reduced-motion: instead of pinning/scrubbing it renders
 * the same stages as plain stacked panels (the story still reads, with no
 * heavy animation).
 */
export default function TravelScrollJourney({ onProgress }: TravelScrollJourneyProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useLayoutEffect(() => {
    if (reduceMotion || !rootRef.current || !stageRef.current) return

    const ctx = gsap.context((self) => {
      const q = self.selector!
      // Route dash length so the flight-path line can "draw" itself.
      const route = q('.tw-route')[0] as SVGPathElement | undefined
      const routeLen = route?.getTotalLength?.() ?? 1000
      if (route) gsap.set(route, { strokeDasharray: routeLen, strokeDashoffset: routeLen })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => onProgress?.(st.progress),
        },
      })

      // Absolute label times along the master timeline (total ≈ 12 units).
      tl.addLabel('home', 0)
        .addLabel('drive', 1.4)
        .addLabel('airport', 2.7)
        .addLabel('checkin', 3.9)
        .addLabel('boarding', 5.1)
        .addLabel('enter', 6.2)
        .addLabel('takeoff', 7.0)
        .addLabel('flight', 7.8)
        .addLabel('land', 10.2)
        .addLabel('arrive', 11.2)

      // ── Sky: a slow day → dusk → night → arrival-dawn progression ──
      tl.to('.sky-dusk', { opacity: 1, duration: 3 }, 'drive')
        .to('.sky-night', { opacity: 1, duration: 2 }, 'enter')
        .to('.tw-stars', { opacity: 1, duration: 2 }, 'enter')
        .to('.sky-arrival', { opacity: 1, duration: 1.6 }, 'land')
        .to('.tw-stars', { opacity: 0, duration: 1 }, 'land')

      // ── 1. HOME — taxi pulls up outside the house ──
      tl.from('.tw-house', { opacity: 0, y: 24, duration: 0.6 }, 'home')
        .from('.tw-taxi-home', { xPercent: 140, duration: 1 }, 'home')

      // ── 2. DRIVE — home exits, taxi follows the curved road, airport nears ──
      tl.to('.scene-home', { opacity: 0, xPercent: -28, duration: 1 }, 'drive')
        .fromTo('.scene-road', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 'drive')
        .fromTo(
          '.tw-taxi-road',
          { motionPath: { path: '#tw-road-path', align: '#tw-road-path', alignOrigin: [0.5, 0.9], autoRotate: true, start: 0, end: 0 } },
          { motionPath: { path: '#tw-road-path', align: '#tw-road-path', alignOrigin: [0.5, 0.9], autoRotate: true, start: 0, end: 1 }, duration: 1.3 },
          'drive',
        )

      // ── 3. AIRPORT — approach the terminal (camera push-in) ──
      tl.to('.scene-road', { opacity: 0, scale: 1.12, duration: 1 }, 'airport')
        .fromTo('.scene-airport', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 'airport')

      // ── 4. CHECK-IN — zoom through the doors to the counter, stamps fly in ──
      tl.to('.scene-airport', { opacity: 0, scale: 1.45, duration: 1 }, 'checkin')
        .fromTo('.scene-checkin', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1 }, 'checkin')
        .from('.tw-stamp', { opacity: 0, scale: 0, rotate: -35, stagger: 0.12, duration: 0.5, ease: 'back.out(2)' }, 'checkin+=0.5')

      // ── 5. BOARDING — gate appears, boarding pass flips ──
      tl.to('.scene-checkin', { opacity: 0, y: -40, duration: 1 }, 'boarding')
        .fromTo('.scene-boarding', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 'boarding')
        .fromTo('.tw-pass-inner', { rotateY: 0 }, { rotateY: 180, duration: 0.9, ease: 'power2.inOut' }, 'boarding+=0.4')

      // ── 6. ENTER CABIN — push into the window seat ──
      tl.to('.scene-boarding', { opacity: 0, scale: 1.3, duration: 1 }, 'enter')
        .fromTo('.scene-window', { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1, duration: 1 }, 'enter')

      // ── 7. TAKEOFF — the plane climbs across the view ──
      tl.fromTo(
        '.tw-plane',
        { xPercent: -135, yPercent: 35, opacity: 0, rotate: -8 },
        { xPercent: 45, yPercent: -18, opacity: 1, rotate: -2, duration: 1.5, ease: 'power1.in' },
        'takeoff',
      )

      // ── 8. FLIGHT — clouds rush past the window, the route map draws ──
      tl.fromTo('.tw-fly-cloud', { xPercent: 130 }, { xPercent: -170, stagger: 0.25, duration: 2.4 }, 'flight')
      tl.to('.scene-map', { opacity: 1, duration: 0.6 }, 'flight+=0.2')
      if (route) tl.to(route, { strokeDashoffset: 0, duration: 2 }, 'flight+=0.4')
      tl.from('.tw-pin', { scale: 0, opacity: 0, transformOrigin: '50% 100%', stagger: 0.5, duration: 0.4, ease: 'back.out(2)' }, 'flight+=0.9')
        .to('.scene-map', { opacity: 0, duration: 0.6 }, 'land')

      // ── 9. LANDING + DESTINATION — window exits, the city rises into dawn ──
      tl.to('.tw-plane', { xPercent: 135, yPercent: 28, opacity: 0, duration: 1.2 }, 'land')
        .to('.scene-window', { opacity: 0, scale: 0.82, duration: 1 }, 'land')
        .fromTo('.scene-destination', { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 'land+=0.3')
        .from('.tw-dest-building', { yPercent: 120, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'back.out(1.4)' }, 'arrive')
        .from('.tw-dest-title', { opacity: 0, y: 30, duration: 0.8 }, 'arrive+=0.3')
    }, rootRef)

    return () => ctx.revert()
  }, [reduceMotion, onProgress])

  // ── Reduced-motion / fallback: stacked static panels, same story ──
  if (reduceMotion) {
    const panels: Array<{ node: React.ReactNode; label: string }> = [
      { node: <HomeScene />, label: 'A taxi waits outside home' },
      { node: <RoadScene />, label: 'On the road to the airport' },
      { node: <AirportScene />, label: 'Arriving at the terminal' },
      { node: <CheckInScene />, label: 'Check-in & passport stamps' },
      { node: <BoardingScene />, label: 'At the boarding gate' },
      { node: <WindowScene />, label: 'Window seat, ready for takeoff' },
      { node: <DestinationScene />, label: 'Touchdown at the destination' },
    ]
    return (
      <div className="relative">
        <SkyBackdrop staticDusk />
        {panels.map((p, i) => (
          <section key={i} className="relative h-[70vh] min-h-[420px] flex items-end justify-center overflow-hidden border-b border-white/5">
            <div className="absolute inset-0">{p.node}</div>
            <p className="relative z-10 mb-10 font-mono text-xs tracking-[0.3em] uppercase text-gold bg-void/60 backdrop-blur-sm rounded-full px-4 py-2">
              {p.label}
            </p>
          </section>
        ))}
      </div>
    )
  }

  return (
    // 900vh of scroll powers ~12 timeline units while the stage stays pinned.
    <div ref={rootRef} className="relative h-[900vh]">
      <div
        ref={stageRef}
        className="tw-stage sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Back → front layer order */}
        <SkyBackdrop />

        <div className="scene-home tw-layer absolute inset-0">
          <HomeScene />
        </div>
        <div className="scene-road tw-layer absolute inset-0 opacity-0">
          <RoadScene />
        </div>
        <div className="scene-airport tw-layer absolute inset-0 opacity-0">
          <AirportScene />
        </div>
        <div className="scene-checkin tw-layer absolute inset-0 opacity-0">
          <CheckInScene />
        </div>
        <div className="scene-boarding tw-layer absolute inset-0 opacity-0">
          <BoardingScene />
        </div>
        <div className="scene-window tw-layer absolute inset-0 opacity-0">
          <WindowScene />
          <CloudLayer className="tw-fly-clouds" />
        </div>
        <div className="scene-map tw-layer absolute inset-0 opacity-0 flex items-center justify-center">
          <MapRouteScene />
        </div>
        <div className="scene-destination tw-layer absolute inset-0 opacity-0">
          <DestinationScene />
        </div>

        {/* Plane flies above the scenes during takeoff/flight */}
        <div className="tw-plane absolute left-0 top-1/2 z-20 w-40 sm:w-56 opacity-0 pointer-events-none">
          <Plane />
        </div>

        {/* Cinematic finish */}
        <span aria-hidden="true" className="grain-overlay z-[40]" />
        <span aria-hidden="true" className="vignette-overlay z-[30]" />
      </div>
    </div>
  )
}
