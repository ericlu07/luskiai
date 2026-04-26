'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Showreel() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="reel"
      ref={ref}
      style={{ padding: 'clamp(80px, 10vh, 120px) clamp(20px, 5vw, 64px)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          The Reel
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            background: '#0E1015',
            border: '1px solid #1E2230',
            aspectRatio: '16/9',
            position: 'relative',
          }}
        >
          <video
            src="/luski-hero.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 12, color: 'rgba(240,242,245,0.2)',
            textAlign: 'center', marginTop: 20, letterSpacing: '0.05em',
          }}
        >
          Every frame. Made with AI.
        </motion.p>
      </div>
    </section>
  )
}
