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

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.15 }}
          style={{
            borderRadius: 8, overflow: 'hidden',
            border: '1px solid #1E2230',
            background: '#0E1015',
          }}
        >
          <video
            src="/luskisandals.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', display: 'block' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
