'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TYPES = [
  { id: 'social', label: 'Social Content', sub: 'Reels, TikTok, Ads', base: 350 },
  { id: 'product', label: 'Product Video', sub: 'Up to 60 seconds', base: 500 },
  { id: 'brand', label: 'Brand Film', sub: 'Up to 60 seconds', base: 600 },
  { id: 'campaign', label: 'Campaign', sub: 'Full creative direction', base: 900 },
]

const QUANTITIES = [
  { id: '1', label: '1', sub: 'Video', multiplier: 1 },
  { id: '2-3', label: '2–3', sub: 'Videos', multiplier: 0.85 },
  { id: '4+', label: '4+', sub: 'Videos', multiplier: 0.75 },
]

function calcPrice(typeId: string, qtyId: string): { total: number; label: string } {
  const type = TYPES.find(t => t.id === typeId)!
  const qty = QUANTITIES.find(q => q.id === qtyId)!
  const count = qtyId === '1' ? 1 : qtyId === '2-3' ? 2.5 : 4
  const total = Math.round(type.base * qty.multiplier * count / 50) * 50
  const label = qtyId === '4+' ? 'starting at' : ''
  return { total, label }
}

export function BriefBuilder() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [type, setType] = useState<string | null>(null)
  const [qty, setQty] = useState<string | null>(null)

  const price = type && qty ? calcPrice(type, qty) : null

  return (
    <section
      ref={ref}
      id="brief"
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
            Build Your Brief
          </div>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#F0F2F5', margin: '0 0 12px',
          }}>
            Get an instant price.
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 14, color: 'rgba(240,242,245,0.3)', margin: 0,
          }}>
            No forms. No calls. Just pick what you need.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Step 1: Type */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9, letterSpacing: '0.25em',
              color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 16,
            }}>
              01 / What do you need?
            </div>
            <div className="brief-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  style={{
                    background: type === t.id ? '#0E1015' : '#08090E',
                    border: `1px solid ${type === t.id ? 'rgba(0,229,255,0.3)' : '#1A1D26'}`,
                    borderRadius: 8, padding: 'clamp(16px, 2vw, 24px)',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s', position: 'relative',
                  }}
                >
                  {type === t.id && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                      background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)',
                    }} />
                  )}
                  <div style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(13px, 1.5vw, 16px)', fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: type === t.id ? '#F0F2F5' : 'rgba(240,242,245,0.5)',
                    marginBottom: 4,
                  }}>
                    {t.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11, color: 'rgba(240,242,245,0.25)',
                  }}>
                    {t.sub}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Quantity */}
          <AnimatePresence>
            {type && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 9, letterSpacing: '0.25em',
                  color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 16,
                }}>
                  02 / How many videos?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {QUANTITIES.map(q => (
                    <button
                      key={q.id}
                      onClick={() => setQty(q.id)}
                      style={{
                        background: qty === q.id ? '#0E1015' : '#08090E',
                        border: `1px solid ${qty === q.id ? 'rgba(0,229,255,0.3)' : '#1A1D26'}`,
                        borderRadius: 8, padding: 'clamp(16px, 2vw, 28px)',
                        cursor: 'pointer', textAlign: 'center',
                        transition: 'all 0.2s', position: 'relative',
                      }}
                    >
                      {qty === q.id && (
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)',
                        }} />
                      )}
                      <div style={{
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700,
                        letterSpacing: '-0.04em',
                        color: qty === q.id ? '#F0F2F5' : 'rgba(240,242,245,0.35)',
                      }}>
                        {q.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: 9, letterSpacing: '0.2em',
                        color: 'rgba(240,242,245,0.2)', textTransform: 'uppercase',
                      }}>
                        {q.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price reveal */}
          <AnimatePresence>
            {price && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                style={{
                  background: '#08090E',
                  border: '1px solid rgba(0,229,255,0.15)',
                  borderRadius: 8, padding: 'clamp(24px, 4vw, 48px)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)',
                }} />
                <div style={{
                  position: 'absolute', top: '-50%', right: '-10%',
                  width: 300, height: 300,
                  background: 'radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 9, letterSpacing: '0.25em',
                    color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    Your estimate
                  </div>
                  <motion.div
                    key={price.total}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease }}
                    style={{
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                      fontSize: 'clamp(48px, 8vw, 96px)',
                      fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1,
                      background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    {price.label && <span style={{ fontSize: '0.4em', WebkitTextFillColor: 'rgba(240,242,245,0.3)', marginRight: 8 }}>{price.label}</span>}
                    ${price.total.toLocaleString()}
                  </motion.div>
                  <div style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13, color: 'rgba(240,242,245,0.3)', marginTop: 8,
                  }}>
                    Traditional production would cost ~${(price.total * 28).toLocaleString()}
                  </div>
                </div>

                <a
                  href="#contact"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#080A0F', background: '#00E5FF',
                    padding: '16px 32px', borderRadius: 4,
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s', flexShrink: 0,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  Let&apos;s make it →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
