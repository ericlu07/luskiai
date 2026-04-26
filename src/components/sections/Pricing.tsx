'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PLANS = [
  {
    name: 'Starter',
    price: '$500',
    per: 'per video',
    desc: 'One video up to 60 seconds. The perfect first look at what we can do.',
    features: ['1 video (up to 60s)', '1 revision round', 'Delivered in 7 days', 'All formats included'],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Brand',
    price: '$1,500',
    per: 'per project',
    desc: 'Three videos. Your brand identity in motion.',
    features: ['3 videos (up to 90s)', '3 revision rounds', 'Social cuts included', 'Creative direction', 'Delivered in 10 days'],
    cta: 'Most popular',
    highlight: true,
  },
  {
    name: 'Studio',
    price: 'Custom',
    per: 'monthly retainer',
    desc: 'Ongoing partnership. Unlimited campaigns, dedicated creative.',
    features: ['Unlimited videos', 'Priority turnaround', 'Full campaign creative', 'Monthly strategy call', 'Dedicated account'],
    cta: "Let's talk",
    highlight: false,
  },
]

export function Pricing() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)', borderTop: '1px solid #1E2230' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Packages
          </div>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#F0F2F5', margin: 0,
          }}>
            Simple pricing.<br />No surprises.
          </h2>
        </motion.div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.1 }}
              style={{
                padding: 'clamp(28px, 3.5vw, 48px)',
                background: plan.highlight ? '#0E1015' : '#080A0F',
                border: plan.highlight ? '1px solid rgba(0,229,255,0.18)' : '1px solid #1A1D26',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
                }} />
              )}

              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 10, letterSpacing: '0.3em',
                color: plan.highlight ? '#00E5FF' : 'rgba(240,242,245,0.3)',
                textTransform: 'uppercase', marginBottom: 24,
              }}>
                {plan.name}
              </div>

              <div style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700, letterSpacing: '-0.04em',
                color: '#F0F2F5', lineHeight: 1, marginBottom: 6,
              }}>
                {plan.price}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12, color: 'rgba(240,242,245,0.25)', marginBottom: 24,
              }}>
                {plan.per}
              </div>

              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13, color: 'rgba(240,242,245,0.38)',
                lineHeight: 1.6, margin: '0 0 32px',
              }}>
                {plan.desc}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {plan.features.map(f => (
                  <li key={f} style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13, color: 'rgba(240,242,245,0.55)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ color: plan.highlight ? '#00E5FF' : '#7B61FF', fontSize: 9 }}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                style={{
                  marginTop: 36, display: 'block', textAlign: 'center',
                  padding: '14px 24px',
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: plan.highlight ? '#080A0F' : '#00E5FF',
                  background: plan.highlight ? '#00E5FF' : 'transparent',
                  border: plan.highlight ? 'none' : '1px solid rgba(0,229,255,0.22)',
                  borderRadius: 4, transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  if (plan.highlight) { el.style.opacity = '0.85' }
                  else { el.style.background = 'rgba(0,229,255,0.08)'; el.style.borderColor = 'rgba(0,229,255,0.5)' }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  if (plan.highlight) { el.style.opacity = '1' }
                  else { el.style.background = 'transparent'; el.style.borderColor = 'rgba(0,229,255,0.22)' }
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
