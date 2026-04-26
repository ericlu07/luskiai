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
          style={{ marginBottom: 48 }}
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

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.15 }}
          style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #1E2230', background: '#0E1015' }}
        >
          <video
            src="/luskisandals.mp4"
            controls playsInline preload="metadata"
            style={{ width: '100%', display: 'block' }}
          />
        </motion.div>

        {/* Cost comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          style={{
            marginTop: 2,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            background: '#08090E',
            border: '1px solid #1A1D26',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            overflow: 'hidden',
          }}
        >
          {/* Left — traditional */}
          <div style={{ padding: 'clamp(20px, 3vw, 36px)' }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9, letterSpacing: '0.25em',
              color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 16,
            }}>
              Traditional Production
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {BREAKDOWN.map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 12, color: 'rgba(240,242,245,0.35)',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 11, color: 'rgba(240,242,245,0.45)',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #1E2230', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12, fontWeight: 600, color: 'rgba(240,242,245,0.5)',
              }}>
                Total
              </span>
              <span style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em',
                color: 'rgba(240,242,245,0.55)',
              }}>
                ~$15,000
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '24px 20px',
            borderLeft: '1px solid #1A1D26', borderRight: '1px solid #1A1D26',
          }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(240,242,245,0.2)', textTransform: 'uppercase',
              writingMode: 'vertical-rl', userSelect: 'none',
            }}>
              vs
            </div>
          </div>

          {/* Right — AI */}
          <div style={{
            padding: 'clamp(20px, 3vw, 36px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Subtle glow */}
            <div style={{
              position: 'absolute', top: '-40%', right: '-20%',
              width: 200, height: 200,
              background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
              }}>
                Luski Collection
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {[
                  { label: 'AI generation & direction', cost: '$—' },
                  { label: 'Post & refinement', cost: '$—' },
                  { label: 'Music', cost: '$—' },
                  { label: 'Revisions', cost: '$—' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 12, color: 'rgba(240,242,245,0.35)',
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 11, color: 'rgba(0,229,255,0.3)',
                    }}>
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,229,255,0.12)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12, fontWeight: 600, color: 'rgba(240,242,245,0.5)',
              }}>
                Total
              </span>
              <span style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                &lt;$500
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
