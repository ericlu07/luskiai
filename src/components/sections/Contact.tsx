'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const LINKS = [
  { label: 'Email', value: 'ericlu@ultisai.com', href: 'mailto:ericlu@ultisai.com' },
  { label: 'Instagram', value: '@ericywlu', href: 'https://instagram.com/ericywlu' },
  { label: 'X', value: '@ericluski', href: 'https://x.com/ericluski' },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(80px, 14vh, 160px) clamp(20px, 5vw, 64px)',
        borderTop: '1px solid #1E2230',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 600,
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, rgba(123,97,255,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(52px, 9vw, 140px)',
            fontWeight: 700, letterSpacing: '-0.05em',
            lineHeight: 0.9, color: '#F0F2F5',
            marginBottom: 'clamp(48px, 8vh, 80px)',
          }}
        >
          Ready to<br />
          <span style={{
            background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            create?
          </span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {LINKS.map(({ label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 24,
                textDecoration: 'none', width: 'fit-content',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.25em',
                color: 'rgba(0,229,255,0.45)', textTransform: 'uppercase',
                minWidth: 72,
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                fontWeight: 600, letterSpacing: '-0.02em',
                color: 'rgba(240,242,245,0.7)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F0F2F5' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,242,245,0.7)' }}
              >
                {value}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.7 }}
          style={{
            marginTop: 'clamp(60px, 10vh, 120px)', paddingTop: 32,
            borderTop: '1px solid #1A1D26',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 12,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em',
            color: 'rgba(240,242,245,0.2)',
          }}>
            Luski Collection
          </div>
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 9, letterSpacing: '0.15em',
            color: 'rgba(240,242,245,0.12)',
          }}>
            © 2025 — All rights reserved
          </div>
        </motion.div>
      </div>
    </section>
  )
}
