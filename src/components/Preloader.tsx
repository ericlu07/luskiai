'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const WORD = 'LUSKI'
const LETTER_RESOLVE_TIMES = [800, 1100, 1400, 1700, 2000]
const MAX_RESOLVE_TIME = Math.max(...LETTER_RESOLVE_TIMES)

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [letters, setLetters] = useState(
    WORD.split('').map(() => ({ char: randomChar(), locked: false }))
  )
  const [showGlow, setShowGlow] = useState(false)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (sessionStorage.getItem('luski-intro-seen')) {
      setVisible(false)
      onComplete()
      return
    }
    sessionStorage.setItem('luski-intro-seen', '1')

    let startTime = 0
    function loop(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      setLetters(prev =>
        prev.map((l, i) => {
          if (l.locked) return l
          if (elapsed >= LETTER_RESOLVE_TIMES[i]) return { char: WORD[i], locked: true }
          return { char: randomChar(), locked: false }
        })
      )
      if (elapsed < MAX_RESOLVE_TIME + 100) {
        frameRef.current = requestAnimationFrame(loop)
      }
    }

    const t0 = setTimeout(() => { frameRef.current = requestAnimationFrame(loop) }, 400)
    const t1 = setTimeout(() => setShowGlow(true), 2200)
    const t2 = setTimeout(() => setExiting(true), 2800)
    const t3 = setTimeout(() => { setVisible(false); onComplete() }, 3500)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ;[t0, t1, t2, t3].forEach(clearTimeout)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!exiting ? (
        <div
          key="preloader"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080A0F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(0,229,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          <motion.div
            style={{
              position: 'absolute', width: 600, height: 600, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={showGlow ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em' }}>
            {letters.map((l, i) => (
              <span
                key={i}
                suppressHydrationWarning
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(72px, 14vw, 140px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: l.locked ? '#F0F2F5' : 'rgba(0,229,255,0.45)',
                  transition: l.locked ? 'color 0.1s ease' : 'none',
                  display: 'inline-block',
                  minWidth: '0.6em',
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {l.char}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div key="exit" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#080A0F' }}
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#080A0F' }}
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
