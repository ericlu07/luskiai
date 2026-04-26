'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const BREAKDOWN = [
  { label: 'Director + crew (1 day)', cost: '$3,500' },
  { label: 'Camera & lighting gear', cost: '$1,200' },
  { label: 'Studio / location', cost: '$1,800' },
  { label: 'Styling & art direction', cost: '$1,500' },
  { label: 'Post production & edit', cost: '$2,500' },
  { label: 'Colour grade', cost: '$1,200' },
  { label: 'VFX & motion', cost: '$2,800' },
  { label: 'Music license', cost: '$500' },
]

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
            style={{ borderRadius: '8px 0 0 8px', overflow: 'hidden', border: '1px solid #1E2230', background: '#0E1015', borderRight: 'none' }}
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
              display: 'grid',
              gridTemplateRows: '1fr auto 1fr',
              overflow: 'hidden',
            }}
          >
            {/* Traditional */}
            <div style={{ padding: 'clamp(20px, 2.5vw, 32px)', borderBottom: '1px solid #1A1D26' }}>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 16,
              }}>
                Traditional Production
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                {BREAKDOWN.map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, color: 'rgba(240,242,245,0.3)' }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10, color: 'rgba(240,242,245,0.4)', whiteSpace: 'nowrap' }}>
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #1E2230', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, color: 'rgba(240,242,245,0.4)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(240,242,245,0.45)' }}>
                  $15,000
                </span>
              </div>
            </div>

            {/* VS divider */}
            <div style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(240,242,245,0.15)', textTransform: 'uppercase' }}>
                vs
              </span>
            </div>

            {/* AI */}
            <div style={{ padding: 'clamp(20px, 2.5vw, 32px)', borderTop: '1px solid #1A1D26', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: '-40%', right: '-10%',
                width: 180, height: 180,
                background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
              }}>
                Luski Collection
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                {[
                  { label: 'AI generation & direction', cost: '$—' },
                  { label: 'Post & refinement', cost: '$—' },
                  { label: 'Music', cost: '$—' },
                  { label: 'Revisions', cost: '$—' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, color: 'rgba(240,242,245,0.3)' }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10, color: 'rgba(0,229,255,0.3)' }}>
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(0,229,255,0.1)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 11, color: 'rgba(240,242,245,0.4)' }}>Total</span>
                <span style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  &lt;$500
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
