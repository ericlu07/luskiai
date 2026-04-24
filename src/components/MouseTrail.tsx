'use client'

import { useEffect, useRef } from 'react'

const DURATION = 2500

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

    const trail: { x: number; y: number; t: number }[] = []
    let raf: number

    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      while (trail.length && now - trail[0].t > DURATION) trail.shift()

      for (const p of trail) {
        const life = 1 - (now - p.t) / DURATION
        const alpha = life * life * 0.55
        const r = 26 + (1 - life) * 14

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        grad.addColorStop(0, `rgba(0,229,255,${alpha})`)
        grad.addColorStop(0.45, `rgba(123,97,255,${alpha * 0.55})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')

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
