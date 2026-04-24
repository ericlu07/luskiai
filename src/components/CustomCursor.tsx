'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const blobPos = useRef({ x: -100, y: -100 })
  const isHovering = useRef(false)
  const isClicking = useRef(false)
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const mountTimer = requestAnimationFrame(() => setMounted(true))

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => { isHovering.current = true }
    const onLeave = () => { isHovering.current = false }

    const onDown = () => {
      isClicking.current = true
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(-50%, -50%) scale(0.78)`
      }
    }
    const onUp = () => { isClicking.current = false }

    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachListeners()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const LERP = 0.1
    const loop = () => {
      blobPos.current.x += (pos.current.x - blobPos.current.x) * LERP
      blobPos.current.y += (pos.current.y - blobPos.current.y) * LERP

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top  = `${pos.current.y}px`
      }
      if (blobRef.current) {
        const scale = isHovering.current ? 1.6 : isClicking.current ? 0.78 : 1
        blobRef.current.style.left = `${blobPos.current.x}px`
        blobRef.current.style.top  = `${blobPos.current.y}px`
        if (!isClicking.current) {
          blobRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
        }
        blobRef.current.style.opacity = isHovering.current ? '0.5' : '0.35'
      }

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const obs = new MutationObserver(attachListeners)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(mountTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
      obs.disconnect()
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          background: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={blobRef}
        style={{
          position: 'fixed',
          width: 44,
          height: 44,
          background: 'rgba(0,229,255,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s',
          willChange: 'left, top, transform',
          filter: 'blur(6px)',
        }}
      />
    </>
  )
}
