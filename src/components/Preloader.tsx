'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['L', 'U', 'S', 'K', 'I']

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('luski-intro-seen')) {
      setVisible(false)
      onComplete()
      return
    }
    sessionStorage.setItem('luski-intro-seen', '1')

    // Letters stagger in: 0.4s each × 5 = last letter at ~2s
    // Hold for 0.6s, then exit
    const t1 = setTimeout(() => setExiting(true), 2800)
    const t2 = setTimeout(() => { setVisible(false); onComplete() }, 3500)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080A0F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Subtle glow behind wordmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.8 }}
            style={{
              position: 'absolute',
              width: 500, height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, rgba(123,97,255,0.04) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* LUSKI — each letter fades + rises in staggered */}
          <div style={{ display: 'flex', gap: '0.06em', position: 'relative' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 + i * 0.1,
                }}
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(72px, 14vw, 140px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: '#F0F2F5',
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : (
        <div key="exit" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#080A0F' }}
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#080A0F' }}
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
