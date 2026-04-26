'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const SERVICES = [
  { id: '01', name: 'Brand Films', desc: 'Your story. Told in 60 seconds.', color: '#00E5FF' },
  { id: '02', name: 'Product Videos', desc: 'Make your product impossible to ignore.', color: '#7B61FF' },
  { id: '03', name: 'Social Content', desc: 'Reels, TikToks, ads that stop the scroll.', color: '#00E5FF' },
  { id: '04', name: 'Campaigns', desc: 'Full creative direction for launches.', color: '#7B61FF' },
]

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)', borderTop: '1px solid #1E2230' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10, letterSpacing: '0.3em',
              color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
            }}>
              What We Make
            </div>
            <h2 style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 700, letterSpacing: '-0.04em',
              lineHeight: 0.95, color: '#F0F2F5', margin: 0,
            }}>
              Every format.<br />Every platform.
            </h2>
          </motion.div>
        </div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.08 }}
              style={{
                padding: 'clamp(32px, 4vw, 56px)',
                background: '#0A0C11',
                border: '1px solid #1A1D26',
                display: 'flex', flexDirection: 'column',
                minHeight: 'clamp(200px, 22vw, 300px)',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E1015' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0A0C11' }}
            >
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 10, letterSpacing: '0.2em',
                color: s.color, opacity: 0.5, marginBottom: 'auto',
              }}>
                {s.id}
              </div>

              <div style={{ marginTop: 48 }}>
                <h3 style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(22px, 2.8vw, 44px)',
                  fontWeight: 700, letterSpacing: '-0.03em',
                  color: '#F0F2F5', margin: '0 0 10px', lineHeight: 1,
                }}>
                  {s.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  color: 'rgba(240,242,245,0.35)',
                  margin: 0, lineHeight: 1.5,
                }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
