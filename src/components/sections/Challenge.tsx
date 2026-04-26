'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Challenge() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [answer, setAnswer] = useState<'ai' | 'traditional' | null>(null)

  const wasCorrect = answer === 'ai'

  return (
    <section
      ref={ref}
      id="challenge"
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)', borderTop: '1px solid #1E2230' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 40, textAlign: 'center' }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
          }}>
            The Challenge
          </div>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#F0F2F5', margin: '0 0 16px',
          }}>
            AI or traditional production?
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: 'rgba(240,242,245,0.35)', margin: 0,
          }}>
            Watch the video. Make your call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #1E2230', marginBottom: 24 }}
        >
          <video
            src="/luskisandals.mp4"
            autoPlay loop muted playsInline
            style={{ width: '100%', display: 'block', maxHeight: '70vh', objectFit: 'cover' }}
          />

          {/* Reveal overlay */}
          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(8,10,15,0.88)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 16, padding: 32, textAlign: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(12px, 2vw, 16px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: wasCorrect ? '#00E5FF' : 'rgba(240,242,245,0.4)',
                    marginBottom: 8,
                  }}
                >
                  {wasCorrect ? 'Correct.' : 'Wrong.'}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(32px, 6vw, 80px)',
                    fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1,
                    background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  100% AI.
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.35 }}
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
                    color: 'rgba(240,242,245,0.45)',
                  }}
                >
                  {wasCorrect
                    ? 'You have a good eye. Most people can\'t tell.'
                    : 'No crew. No studio. No $15,000 bill.'}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease, delay: 0.5 }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(24px, 4vw, 48px)',
                    fontWeight: 700, letterSpacing: '-0.04em',
                    color: '#F0F2F5', marginTop: 8,
                  }}
                >
                  Made for <span style={{
                    background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>$497.</span>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setAnswer(null)}
                  style={{
                    marginTop: 16,
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(240,242,245,0.3)', background: 'transparent',
                    border: 'none', cursor: 'pointer', padding: '8px 16px',
                  }}
                >
                  ↩ Try again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <AnimatePresence>
          {!answer && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
            >
              {[
                { label: 'AI Generated', value: 'ai' as const, color: '#00E5FF' },
                { label: 'Traditional Crew', value: 'traditional' as const, color: '#7B61FF' },
              ].map(btn => (
                <button
                  key={btn.value}
                  onClick={() => setAnswer(btn.value)}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    fontWeight: 700, letterSpacing: '-0.02em',
                    color: '#F0F2F5',
                    background: '#0E1015',
                    border: `1px solid #1E2230`,
                    borderRadius: 8, padding: 'clamp(18px, 3vw, 28px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = `${btn.color}50`
                    el.style.background = '#111318'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = '#1E2230'
                    el.style.background = '#0E1015'
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
