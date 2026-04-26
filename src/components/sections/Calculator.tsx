'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TRADITIONAL = 15000
const LUSKI = 500

export function Calculator() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [videos, setVideos] = useState(4)

  const traditional = TRADITIONAL * videos
  const luski = LUSKI * videos
  const annualSavings = (TRADITIONAL - LUSKI) * videos * 12

  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

  return (
    <section
      ref={ref}
      id="calculator"
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)', borderTop: '1px solid #1E2230' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 56 }}
        >
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10, letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 16,
          }}>
            Savings Calculator
          </div>
          <h2 style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700, letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#F0F2F5', margin: 0,
          }}>
            See what you&apos;re<br />leaving on the table.
          </h2>
        </motion.div>

        <div className="calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
          {/* Left — slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <div style={{ marginBottom: 40 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20,
              }}>
                <div style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14, color: 'rgba(240,242,245,0.4)',
                }}>
                  Videos per month
                </div>
                <div style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em',
                  color: '#F0F2F5', lineHeight: 1,
                }}>
                  {videos}
                </div>
              </div>

              <input
                type="range" min={1} max={20} value={videos}
                onChange={e => setVideos(Number(e.target.value))}
                style={{
                  width: '100%', appearance: 'none',
                  height: 2, background: `linear-gradient(to right, #00E5FF ${(videos - 1) / 19 * 100}%, #1E2230 ${(videos - 1) / 19 * 100}%)`,
                  outline: 'none', cursor: 'pointer', borderRadius: 2,
                }}
              />
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  appearance: none; width: 18px; height: 18px;
                  border-radius: 50%; background: #00E5FF;
                  box-shadow: 0 0 12px rgba(0,229,255,0.4);
                  cursor: pointer;
                }
              `}</style>
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginTop: 8,
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, color: 'rgba(240,242,245,0.2)', letterSpacing: '0.1em',
              }}>
                <span>1</span><span>20</span>
              </div>
            </div>

            {/* Per video comparison */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Traditional', value: `$${TRADITIONAL.toLocaleString()} / video`, color: 'rgba(240,242,245,0.3)' },
                { label: 'Luski Collection', value: `$${LUSKI} / video`, color: '#00E5FF' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 13, color: 'rgba(240,242,245,0.35)' }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 13, color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — numbers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {[
              { label: 'Traditional this month', value: fmt(traditional), muted: true },
              { label: 'Luski Collection this month', value: fmt(luski), muted: false },
            ].map(item => (
              <div key={item.label} style={{
                background: '#08090E', border: '1px solid #1A1D26',
                borderRadius: 8, padding: 'clamp(20px, 3vw, 32px)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 9, letterSpacing: '0.2em',
                  color: 'rgba(240,242,245,0.25)', textTransform: 'uppercase', marginBottom: 10,
                }}>
                  {item.label}
                </div>
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1,
                    color: item.muted ? 'rgba(240,242,245,0.3)' : 'rgba(240,242,245,0.7)',
                  }}
                >
                  {item.value}
                </motion.div>
              </div>
            ))}

            {/* Annual savings */}
            <div style={{
              background: '#08090E',
              border: '1px solid rgba(0,229,255,0.15)',
              borderRadius: 8, padding: 'clamp(20px, 3vw, 32px)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)',
              }} />
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9, letterSpacing: '0.2em',
                color: 'rgba(0,229,255,0.5)', textTransform: 'uppercase', marginBottom: 10,
              }}>
                You save annually
              </div>
              <motion.div
                key={annualSavings}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1,
                  background: 'linear-gradient(135deg, #00E5FF, #7B61FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}
              >
                {fmt(annualSavings)}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
