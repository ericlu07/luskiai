'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Drops() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setJoined(true)
  }

  return (
    <section
      ref={ref}
      id="drops"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)',
        borderTop: '1px solid #1E2230',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(123,97,255,0.05) 0%, rgba(0,229,255,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(123,97,255,0.6)', textTransform: 'uppercase', marginBottom: 24,
          }}>
            The Collection Drops
          </div>

          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700, letterSpacing: '-0.05em',
            lineHeight: 0.9, color: '#F0F2F5',
            margin: '0 0 20px',
          }}>
            New work.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7B61FF, #00E5FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Be first.
            </span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: 'rgba(240,242,245,0.35)',
            margin: '0 auto 40px', maxWidth: 400, lineHeight: 1.6,
          }}>
            Every new video we release, you&apos;ll see it first. No noise. Just drops.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          {joined ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 700, letterSpacing: '-0.03em',
                color: '#00E5FF',
              }}
            >
              You&apos;re in.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: '1 1 240px', minWidth: 0,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14, color: '#F0F2F5',
                  background: '#0A0C11',
                  border: '1px solid #1E2230',
                  borderRadius: 4, padding: '14px 20px',
                  outline: 'none', transition: 'border-color 0.2s',
                  textAlign: 'center',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(123,97,255,0.4)' }}
                onBlur={e => { e.target.style.borderColor = '#1E2230' }}
              />
              <button
                type="submit"
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#F0F2F5',
                  background: 'linear-gradient(135deg, #7B61FF, #00E5FF)',
                  border: 'none', borderRadius: 4, padding: '14px 28px',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                Notify me →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
