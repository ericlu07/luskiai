'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const SOCIALS = [
  { name: 'X',         href: 'https://x.com/ericluski',              handle: '@ericluski', desc: 'Daily thoughts & threads', color: '#00E5FF' },
  { name: 'Instagram', href: 'https://instagram.com/ericywlu',        handle: '@ericywlu',  desc: 'Behind the build',         color: '#7B61FF' },
]

export function Connect() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="connect"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '180px 48px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, rgba(123,97,255,0.04) 35%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 9,
            letterSpacing: '0.4em',
            color: 'rgba(0,229,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: 72,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ width: 28, height: 1, background: 'rgba(0,229,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
          03 / Connect
        </motion.div>

        {/* Giant CTA heading */}
        <div style={{ textAlign: 'center', marginBottom: 88 }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.05 }}
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(48px, 8vw, 120px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.95,
              color: '#F0F2F5',
              marginBottom: 32,
            }}
          >
            Follow<br />
            <span style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              the build.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 17,
              color: '#8A92A0',
              lineHeight: 1.65,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Everything gets documented. Every experiment, failure, and breakthrough.
            No polished PR — just the raw build.
          </motion.p>
        </div>

        {/* Social cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 80,
          }}
        >
          {SOCIALS.map((s, i) => (
            <SocialCard key={s.name} social={s} index={i} inView={inView} />
          ))}
        </motion.div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 12,
              fontWeight: 700,
              color: '#080A0F',
            }}>
              L
            </div>
            <span style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#F0F2F5',
              letterSpacing: '-0.02em',
            }}>
              LUSKI
            </span>
          </div>

          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10,
              color: '#4A5060',
              letterSpacing: '0.1em',
            }}>
              Built in public
            </span>
            <span
              suppressHydrationWarning
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 10,
                color: '#4A5060',
                letterSpacing: '0.1em',
              }}
            >
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialCard({
  social,
  index,
  inView,
}: {
  social: typeof SOCIALS[number]
  index: number
  inView: boolean
}) {
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

  return (
    <motion.a
      href={social.href}
      data-cursor-hover
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: 0.35 + index * 0.07 }}
      style={{
        padding: '28px 24px',
        background: '#0E1015',
        border: '1px solid #1E2230',
        borderRadius: 14,
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'border-color 0.25s, transform 0.2s, box-shadow 0.25s, background 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${social.color}35`
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${social.color}08`
        el.style.background = '#111318'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#1E2230'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.background = '#0E1015'
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${social.color}45, transparent)`,
      }} />

      <div style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 9,
        letterSpacing: '0.25em',
        color: social.color,
        textTransform: 'uppercase',
        marginBottom: 14,
        opacity: 0.7,
      }}>
        {social.name}
      </div>

      <div style={{
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#F0F2F5',
        letterSpacing: '-0.02em',
        marginBottom: 10,
      }}>
        {social.handle}
      </div>

      <div style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 12,
        color: '#4A5060',
        lineHeight: 1.5,
        marginBottom: 20,
      }}>
        {social.desc}
      </div>

      <div style={{
        marginTop: 'auto',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 10,
        color: social.color,
        opacity: 0.6,
        letterSpacing: '0.1em',
      }}>
        Follow →
      </div>
    </motion.a>
  )
}
