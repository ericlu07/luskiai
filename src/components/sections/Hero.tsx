'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Hero({ visible }: { visible: boolean }) {
  return (
    <section
      id="hero"
      style={{ position: 'relative', zIndex: 1, height: '100svh', overflow: 'hidden' }}
    >
      {/* Video */}
      <motion.video
        src="/luski-hero.mp4"
        autoPlay loop muted playsInline preload="auto"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease, delay: 0.2 }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 65%',
          zIndex: 1, pointerEvents: 'none',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(8,10,15,0.92) 0%, rgba(8,10,15,0.3) 40%, rgba(8,10,15,0.15) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content — bottom left */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(32px, 5vw, 64px)',
        paddingBottom: 'clamp(48px, 8vh, 88px)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(60px, 13vw, 180px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            color: '#F0F2F5',
          }}>
            LUSKI
          </div>
          <div style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(60px, 13vw, 180px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            color: 'rgba(240,242,245,0.28)',
          }}>
            COLLECTION
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 40px)', flexWrap: 'wrap' }}
        >
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(13px, 1.3vw, 16px)',
            color: 'rgba(240,242,245,0.45)',
            margin: 0, letterSpacing: '0.01em',
          }}>
            Film-quality. Undetectably AI.
          </p>

          <a
            href="#reel"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10, letterSpacing: '0.2em',
              color: '#00E5FF', textDecoration: 'none', textTransform: 'uppercase',
              padding: '10px 20px',
              border: '1px solid rgba(0,229,255,0.3)', borderRadius: 4,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(0,229,255,0.08)'
              el.style.borderColor = 'rgba(0,229,255,0.6)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(0,229,255,0.3)'
            }}
          >
            Watch the Reel ↓
          </a>

          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10, letterSpacing: '0.2em',
              color: 'rgba(240,242,245,0.5)', textDecoration: 'none', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F0F2F5' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,242,245,0.5)' }}
          >
            Work with us →
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        style={{
          position: 'absolute', right: 'clamp(24px, 4vw, 48px)',
          bottom: 'clamp(48px, 8vh, 88px)', zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.35))' }} />
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 8, letterSpacing: '0.25em',
          color: 'rgba(0,229,255,0.35)', writingMode: 'vertical-rl',
        }}>SCROLL</span>
      </motion.div>
    </section>
  )
}
