'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const SPECS = [
  { label: 'Focus',    value: 'AI Systems'       },
  { label: 'Method',   value: 'Build in Public'  },
  { label: 'Stack',    value: 'LLMs + Code'      },
  { label: 'Output',   value: 'Content + Tools'  },
  { label: 'Platform', value: 'Multi-channel'    },
  { label: 'Mode',     value: 'Always On'        },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '180px 48px',
        maxWidth: 1300,
        margin: '0 auto',
      }}
    >
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
          marginBottom: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ width: 28, height: 1, background: 'rgba(0,229,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
        01 / About
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>
        {/* Left — quote + bio */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.05 }}
        >
          {/* Giant quote */}
          <div style={{ position: 'relative', marginBottom: 48 }}>
            {/* Decorative quotation mark */}
            <span style={{
              position: 'absolute',
              top: -28,
              left: -12,
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 120,
              lineHeight: 1,
              color: 'rgba(0,229,255,0.07)',
              fontWeight: 700,
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              &ldquo;
            </span>
            <blockquote style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#F0F2F5',
              letterSpacing: '-0.03em',
              margin: 0,
              paddingTop: 8,
            }}>
              I make AI useful.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Not just impressive.
              </span>
            </blockquote>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg, rgba(0,229,255,0.3), rgba(123,97,255,0.2), transparent)',
              transformOrigin: 'left',
              marginBottom: 36,
            }}
          />

          <p style={{
            fontSize: 16,
            color: '#8A92A0',
            lineHeight: 1.85,
            maxWidth: 420,
            marginBottom: 48,
          }}>
            I build at the intersection of AI systems and human behaviour.
            Every experiment ships in public — the failures and the wins.
            The goal is to find what actually works, not what sounds impressive.
          </p>

          {/* Identity chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#080A0F',
              flexShrink: 0,
              boxShadow: '0 0 20px rgba(0,229,255,0.25)',
            }}>
              L
            </div>
            <div>
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#F0F2F5',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-space-grotesk), sans-serif',
              }}>
                LUSKI
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(0,229,255,0.5)',
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                letterSpacing: '0.15em',
                marginTop: 2,
              }}>
                AI Creator · Builder
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — spec grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#1E2230', border: '1px solid #1E2230', borderRadius: 16, overflow: 'hidden' }}>
            {SPECS.map((item, i) => (
              <SpecCell key={item.label} item={item} index={i} inView={inView} />
            ))}
          </div>

          {/* Footnote */}
          <p style={{
            marginTop: 24,
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10,
            color: '#4A5060',
            letterSpacing: '0.15em',
          }}>
            {`// updated live as the build evolves`}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function SpecCell({ item, index, inView }: { item: { label: string; value: string }; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
      style={{
        padding: '24px 22px',
        background: '#111318',
        transition: 'background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#191D24' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111318' }}
    >
      <div style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 9,
        letterSpacing: '0.25em',
        color: 'rgba(0,229,255,0.4)',
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        {item.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        fontSize: 16,
        fontWeight: 600,
        color: '#F0F2F5',
        letterSpacing: '-0.01em',
      }}>
        {item.value}
      </div>
    </motion.div>
  )
}
