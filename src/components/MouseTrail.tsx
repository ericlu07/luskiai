'use client'

import { useEffect, useRef } from 'react'

const DURATION = 2500
const LERP = 0.055  // lower = more lag / smoother at high velocity
const RADIUS = 40   // base glow radius

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Real cursor position (updated instantly on mousemove)
    const mouse = { x: -300, y: -300 }
    // Smoothed position that lags behind — this is what we draw
    const smooth = { x: -300, y: -300 }

    const trail: { x: number; y: number; t: number }[] = []
    let raf: number
    let active = false

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!active) {
        smooth.x = mouse.x
        smooth.y = mouse.y
        active = true
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const now = performance.now()

      // Lerp smooth position toward real cursor each frame
      smooth.x += (mouse.x - smooth.x) * LERP
      smooth.y += (mouse.y - smooth.y) * LERP

      // Record smoothed position each frame
      if (active) {
        trail.push({ x: smooth.x, y: smooth.y, t: now })
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Prune expired points
      while (trail.length && now - trail[0].t > DURATION) trail.shift()

      for (const p of trail) {
        const life = 1 - (now - p.t) / DURATION
        const alpha = life * life * 0.5
        const r = RADIUS + (1 - life) * 16

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        grad.addColorStop(0,    `rgba(0,229,255,${alpha})`)
        grad.addColorStop(0.4,  `rgba(123,97,255,${alpha * 0.6})`)
        grad.addColorStop(1,    'rgba(0,0,0,0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
