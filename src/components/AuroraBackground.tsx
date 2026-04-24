'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Fewer particles, no O(n²) connections
    const count = 55
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.2,
      o: Math.random() * 0.35 + 0.06,
    }))

    let t = 0

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // ── Layer 1: top-center light source ──────────────
      const cx = w / 2
      const cy = -h * 0.08
      const pulse = 0.8 + Math.sin(t * 0.7) * 0.2

      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 1.1)
      g1.addColorStop(0,    'rgba(180,240,255,0.05)')
      g1.addColorStop(0.08, 'rgba(0,229,255,0.08)')
      g1.addColorStop(0.22, 'rgba(123,97,255,0.06)')
      g1.addColorStop(0.45, 'rgba(50,20,120,0.03)')
      g1.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.45)
      g2.addColorStop(0,    `rgba(255,255,255,${0.06 * pulse})`)
      g2.addColorStop(0.04, `rgba(100,240,255,${0.10 * pulse})`)
      g2.addColorStop(0.12, `rgba(0,229,255,${0.07 * pulse})`)
      g2.addColorStop(0.3,  `rgba(123,97,255,${0.04 * pulse})`)
      g2.addColorStop(1,    'rgba(0,0,0,0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // ── Layer 2: aurora streaks ────────────────────────
      for (let i = 0; i < 3; i++) {
        const yOff = h * (0.25 + i * 0.18) + Math.sin(t * 0.3 + i * 2.1) * 40
        const xShift = Math.sin(t * 0.2 + i) * 60
        const grad = ctx.createLinearGradient(0, yOff - 60, 0, yOff + 60)
        const colors = ['0,229,255', '123,97,255', '0,180,255']
        const amp = [0.025, 0.02, 0.015]
        const base = amp[i] + Math.sin(t * (0.5 + i * 0.1) + i) * 0.008
        grad.addColorStop(0,   `rgba(${colors[i]},0)`)
        grad.addColorStop(0.5, `rgba(${colors[i]},${base})`)
        grad.addColorStop(1,   `rgba(${colors[i]},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.ellipse(cx + xShift, yOff, w * 0.7, 80, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Layer 3: particles (no connections) ───────────
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0

        const distToLight = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2)
        const proximity = Math.max(0, 1 - distToLight / (h * 0.8))
        const alpha = p.o * (1 + proximity * 1.2)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${alpha})`
        ctx.fill()
      }

      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current)
      else rafRef.current = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
