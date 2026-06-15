import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scrolling (Lenis) wired into GSAP's ticker so ScrollTrigger
 * animations stay in sync with the eased scroll position.
 *
 * Disabled entirely under prefers-reduced-motion — native scrolling is
 * used instead so the page stays accessible and lightweight.
 *
 * Returns nothing; mount once near the top of the page that needs it.
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      // gentle ease-out so the cinematic scrub feels weighty, not floaty
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Keep ScrollTrigger in lockstep with Lenis' virtual scroll position.
    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [enabled])
}
