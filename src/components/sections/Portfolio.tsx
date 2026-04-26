'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)', borderTop: '1px solid #1E2230' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 40 }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
          }}>
            The Work
          </div>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#F0F2F5', margin: 0,
          }}>
            See it to<br />believe it.
          </h2>
        </motion.div>

        {/* Side-by-side layout */}
        <div className="portfolio-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 2, alignItems: 'stretch' }}>

          {/* Left — video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            style={{ borderRadius: '8px 0 0 8px', overflow: 'hidden', border: '1px solid #1E2230', borderRight: 'none', background: '#0E1015' }}
          >
            <video
              src="/luskisandals.mp4"
              controls playsInline preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          {/* Right — comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            style={{
              background: '#08090E',
              border: '1px solid #1A1D26',
              borderRadius: '0 8px 8px 0',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(24px, 3vw, 48px)',
              gap: 0,
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute', top: '-30%', right: '-20%',
              width: 200, height: 200,
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Traditional */}
            <div style={{ paddingBottom: 'clamp(24px, 4vw, 40px)', borderBottom: '1px solid #1A1D26' }}>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 14,
              }}>
                Traditional Production
              </div>
              <div style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700, letterSpacing: '-0.04em',
                color: 'rgba(240,242,245,0.4)', lineHeight: 1,
              }}>
                $16,000
              </div>
            </div>

            {/* Luski Collection */}
            <div style={{ paddingTop: 'clamp(24px, 4vw, 40px)', position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 14,
              }}>
                Luski Collection
              </div>
              <div style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700, letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1,
              }}>
                &lt;$500
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
