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

interface LetterState {
  char: string
  locked: boolean
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [letters, setLetters] = useState<LetterState[]>(
    WORD.split('').map(() => ({ char: randomChar(), locked: false }))
  )
  const [showScanLine, setShowScanLine] = useState(false)
  const [showSubtext, setShowSubtext] = useState(false)
  const [showCorners, setShowCorners] = useState(false)
  const [showGlow, setShowGlow] = useState(false)

  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (sessionStorage.getItem('luski-intro-seen')) {
      const t = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 0)
      return () => clearTimeout(t)
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

    const t0 = setTimeout(() => {
      frameRef.current = requestAnimationFrame(loop)
    }, 400)

    const t1 = setTimeout(() => setShowGlow(true), 2400)
    const t2 = setTimeout(() => setShowScanLine(true), 2700)
    const t3 = setTimeout(() => setShowSubtext(true), 3000)
    const t4 = setTimeout(() => setShowCorners(true), 3400)
    const t5 = setTimeout(() => setExiting(true), 3800)
    const t6 = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 4500)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ;[t0, t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!exiting ? (
        <div
          key="preloader"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#080A0F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/* Dot grid texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(0,229,255,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.8,
            }}
          />

          {/* Glow bloom */}
          <motion.div
            style={{
              position: 'absolute',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, rgba(123,97,255,0.05) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={showGlow ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Corner brackets */}
          {[
            { top: 32, left: 32, borderTop: true, borderLeft: true },
            { top: 32, right: 32, borderTop: true, borderRight: true },
            { bottom: 32, left: 32, borderBottom: true, borderLeft: true },
            { bottom: 32, right: 32, borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                width: 24,
                height: 24,
                borderColor: 'rgba(0,229,255,0.3)',
                borderStyle: 'solid',
                borderWidth: 0,
                borderTopWidth: pos.borderTop ? 1.5 : 0,
                borderLeftWidth: pos.borderLeft ? 1.5 : 0,
                borderRightWidth: pos.borderRight ? 1.5 : 0,
                borderBottomWidth: pos.borderBottom ? 1.5 : 0,
              }}
              initial={{ opacity: 0 }}
              animate={showCorners ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            />
          ))}

          {/* Main wordmark area */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* LUSKI letters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em' }}>
              {letters.map((l, i) => (
                <span
                  key={i}
                  suppressHydrationWarning
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(80px, 15vw, 140px)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: l.locked ? '#F0F2F5' : 'rgba(0,229,255,0.5)',
                    transition: l.locked ? 'color 0.08s ease' : 'none',
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

            {/* Scan line */}
            <motion.div
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent 0%, #00E5FF 30%, #7B61FF 70%, transparent 100%)',
                marginTop: 16,
                borderRadius: 2,
                width: '100%',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={showScanLine ? { scaleX: 1, opacity: 0.7 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Subtext */}
            <motion.p
              style={{
                marginTop: 20,
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'rgba(0,229,255,0.6)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={showSubtext ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              SYSTEM ONLINE
            </motion.p>

          </div>
        </div>
      ) : (
        <div key="exit" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '50%',
              background: '#080A0F',
              transformOrigin: 'top',
            }}
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '50%',
              background: '#080A0F',
              transformOrigin: 'bottom',
            }}
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
