import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TrailParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  hue: number
  size: number
}

/**
 * Cursor energy: a soft spring-following glow plus a canvas trail of
 * fading spark particles emitted as the pointer moves. Desktop
 * (pointer: fine) only; honors prefers-reduced-motion; caps particle
 * count and cleans up listeners + rAF.
 */
export default function CursorEnergyTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 130, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 130, damping: 20, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduceMotion) return
    setEnabled(true)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let raf = 0
    let particles: TrailParticle[] = []
    let lastX = -1
    let lastY = -1

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      // Emit sparks proportional to movement speed, capped hard.
      const dist = lastX < 0 ? 0 : Math.hypot(e.clientX - lastX, e.clientY - lastY)
      lastX = e.clientX
      lastY = e.clientY
      const emit = Math.min(3, Math.floor(dist / 14))
      for (let i = 0; i < emit && particles.length < 90; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.3,
          life: 1,
          hue: [199, 270, 348, 38][Math.floor(Math.random() * 4)],
          size: 1 + Math.random() * 1.8,
        })
      }
    }

    const tick = () => {
      if (ctx && canvas && !document.hidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles = particles.filter((p) => p.life > 0.03)
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          p.life *= 0.94
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 92%, 68%, ${p.life * 0.8})`
          ctx.shadowColor = `hsla(${p.hue}, 92%, 60%, 0.9)`
          ctx.shadowBlur = 6
          ctx.fill()
        }
        ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-[55] pointer-events-none" />
      <motion.div
        aria-hidden="true"
        className="fixed -z-[5] pointer-events-none w-[460px] h-[460px] rounded-full"
        style={{
          left: sx,
          top: sy,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(168,85,247,0.06) 35%, transparent 70%)',
        }}
      />
    </>
  )
}
