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
        transition={{ duration: 1.6, ease, delay: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 65%',
          zIndex: 1, pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay — top only so face stays visible */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(8,10,15,0.72) 0%, rgba(8,10,15,0.2) 28%, rgba(8,10,15,0) 42%)',
        pointerEvents: 'none',
      }} />

      {/* Text — top center */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        paddingTop: 'clamp(52px, 6vh, 80px)',
        paddingLeft: 'clamp(16px, 4vw, 48px)',
        paddingRight: 'clamp(16px, 4vw, 48px)',
        pointerEvents: 'none',
      }}>
        {/* LUSKI */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(96px, 20vw, 140px)',
            fontWeight: 700, letterSpacing: '0.04em',
            lineHeight: 0.9, margin: 0, marginBottom: 16,
            display: 'flex',
          }}
        >
          {['L','U','S','K','I'].map((letter, i) => (
            <motion.span
              key={letter + i}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.07 }}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(240,242,245,0.72) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 0 32px rgba(0,229,255,0.3)) drop-shadow(0 0 64px rgba(123,97,255,0.18))',
                display: 'inline-block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            fontWeight: 500, color: 'rgba(240,242,245,0.5)',
            marginBottom: 0, letterSpacing: '-0.01em',
          }}
        >
          Building at the edge of{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>what&apos;s possible.</span>
        </motion.p>
      </div>
    </section>
  )
}
