'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const LETTERS = ['L', 'U', 'S', 'K', 'I']

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('lc-intro-seen')) {
      setVisible(false)
      onComplete()
      return
    }
    sessionStorage.setItem('lc-intro-seen', '1')

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
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }}
            style={{
              position: 'absolute',
              width: 600, height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, rgba(123,97,255,0.03) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* LUSKI */}
          <div style={{ display: 'flex', gap: '0.04em', position: 'relative' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.09 }}
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(64px, 14vw, 130px)',
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

          {/* COLLECTION */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.9 }}
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 'clamp(9px, 1.2vw, 12px)',
              letterSpacing: '0.35em',
              color: 'rgba(240,242,245,0.3)',
              textTransform: 'uppercase',
              marginTop: 12,
            }}
          >
            Collection
          </motion.div>
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
