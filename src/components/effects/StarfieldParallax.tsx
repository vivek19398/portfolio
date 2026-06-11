import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  depth: number // 0..1 — far..near
  size: number
  hue: number
  twinkle: number
  twinkleSpeed: number
}

const STAR_HUES = [210, 199, 270, 38, 0] // cool whites/blues, purple, gold, neutral

/**
 * Multi-depth starfield on a single canvas.
 * Depth drives parallax against both scroll and mouse position,
 * so the page feels like moving through space. Stars twinkle on a
 * per-star phase. Honors prefers-reduced-motion (static frame) and
 * pauses while the tab is hidden.
 */
export default function StarfieldParallax() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let stars: Star[] = []
    let mouseX = 0.5
    let mouseY = 0.5
    let scrollY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        depth: Math.random(),
        size: 0.4 + Math.random() * 1.6,
        hue: STAR_HUES[Math.floor(Math.random() * STAR_HUES.length)],
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.025,
      }))
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.twinkle += s.twinkleSpeed
        const px = (mouseX - 0.5) * 40 * s.depth
        const py = (mouseY - 0.5) * 25 * s.depth
        // Parallax: nearer stars drift faster with scroll; wrap vertically.
        const scrollShift = (scrollY * (0.04 + s.depth * 0.18)) / h
        const x = s.x * w + px
        const y = ((s.y + scrollShift) % 1) * h + py
        const a = (0.25 + s.depth * 0.5) * (0.55 + 0.45 * Math.sin(s.twinkle))
        const r = s.size * (0.6 + s.depth * 0.8)
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = s.hue === 0 ? `rgba(231,233,242,${a})` : `hsla(${s.hue}, 85%, 78%, ${a})`
        if (s.depth > 0.75) {
          ctx.shadowColor = `hsla(${s.hue === 0 ? 210 : s.hue}, 90%, 70%, 0.9)`
          ctx.shadowBlur = 6
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const tick = () => {
      if (!document.hidden) draw()
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduceMotion) {
      draw() // single static frame
    } else {
      window.addEventListener('mousemove', onMouse, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-20 pointer-events-none" />
}
