'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STEPS = [
  { n: '01', title: 'Brief', body: 'Tell us your brand, your audience, your goal. 15 minutes.' },
  { n: '02', title: 'Create', body: 'We handle everything. First draft in 7 days.' },
  { n: '03', title: 'Deliver', body: 'Final files in any format — ready to post, run as ads, or broadcast.' },
]

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="process"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)',
        borderTop: '1px solid #1E2230',
        borderBottom: '1px solid #1E2230',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase',
            marginBottom: 72,
          }}
        >
          How It Works
        </motion.div>

        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(32px, 5vw, 80px)' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.12 }}
            >
              <div style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(80px, 11vw, 160px)',
                fontWeight: 700,
                color: 'rgba(240,242,245,0.04)',
                lineHeight: 1, letterSpacing: '-0.05em',
                marginBottom: -12, userSelect: 'none',
              }}>
                {step.n}
              </div>

              <div style={{ width: 28, height: 1, background: 'rgba(0,229,255,0.3)', marginBottom: 20 }} />

              <h3 style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(20px, 2.2vw, 32px)',
                fontWeight: 700, letterSpacing: '-0.03em',
                color: '#F0F2F5', margin: '0 0 12px',
              }}>
                {step.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: 'rgba(240,242,245,0.35)',
                margin: 0, lineHeight: 1.65,
              }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
