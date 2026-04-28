'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Custom SVG icons in site colors
function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="rgba(0,229,255,0.08)" />
      <path d="M6 9.5C6 8.67 6.67 8 7.5 8h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13C6.67 20 6 19.33 6 18.5v-9z" stroke="#00E5FF" strokeWidth="1.3" fill="none"/>
      <path d="M6 10l8 5.5 8-5.5" stroke="#00E5FF" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="rgba(123,97,255,0.08)" />
      <rect x="7" y="7" width="14" height="14" rx="4" stroke="#7B61FF" strokeWidth="1.3" fill="none"/>
      <circle cx="14" cy="14" r="3.5" stroke="#7B61FF" strokeWidth="1.3" fill="none"/>
      <circle cx="18.2" cy="9.8" r="0.9" fill="#7B61FF"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="rgba(0,229,255,0.05)" />
      <path d="M8 8h4l2.5 3.5L17.5 8H20l-4.5 6L20 20h-4l-2.8-3.8L10 20H8l5-6.5L8 8z" fill="rgba(240,242,245,0.6)"/>
    </svg>
  )
}

const LINKS = [
  {
    label: 'Email',
    value: 'ericlu@ultisai.com',
    href: 'mailto:ericlu@ultisai.com',
    Icon: EmailIcon,
    accent: '#00E5FF',
  },
  {
    label: 'Instagram',
    value: '@ericywlu',
    href: 'https://instagram.com/ericywlu',
    Icon: InstagramIcon,
    accent: '#7B61FF',
  },
  {
    label: 'X / Twitter',
    value: '@ericluski',
    href: 'https://x.com/ericluski',
    Icon: XIcon,
    accent: 'rgba(240,242,245,0.5)',
  },
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
          Follow<br />
          <span style={{
            background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            the journey.
          </span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LINKS.map(({ label, value, href, Icon, accent }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                textDecoration: 'none',
                background: '#08090E',
                border: '1px solid #1A1D26',
                borderRadius: 10,
                padding: '16px 20px',
                maxWidth: 420,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${accent}30`
                el.style.background = '#0C0E13'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#1A1D26'
                el.style.background = '#08090E'
              }}
            >
              <Icon />
              <div>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 8, letterSpacing: '0.25em',
                  color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 3,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(14px, 1.8vw, 18px)',
                  fontWeight: 600, letterSpacing: '-0.02em',
                  color: 'rgba(240,242,245,0.75)',
                }}>
                  {value}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', color: 'rgba(240,242,245,0.15)', fontSize: 14 }}>↗</div>
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
