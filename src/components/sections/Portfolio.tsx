'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const WORK = [
  { id: 1, title: 'Brand Film', tag: 'Brand', gradient: 'linear-gradient(135deg, #08121E 0%, #0A1A2E 100%)', color: '#00E5FF' },
  { id: 2, title: 'Product Launch', tag: 'Product', gradient: 'linear-gradient(135deg, #100820 0%, #180E30 100%)', color: '#7B61FF' },
  { id: 3, title: 'Social Campaign', tag: 'Social', gradient: 'linear-gradient(135deg, #081420 0%, #0C1C2E 100%)', color: '#00E5FF' },
  { id: 4, title: 'Identity Film', tag: 'Brand', gradient: 'linear-gradient(135deg, #12081C 0%, #1C0E2C 100%)', color: '#7B61FF' },
  { id: 5, title: 'Event Promo', tag: 'Campaign', gradient: 'linear-gradient(135deg, #081220 0%, #0A182E 100%)', color: '#00E5FF' },
  { id: 6, title: 'Cinematic Ad', tag: 'Social', gradient: 'linear-gradient(135deg, #10081E 0%, #180C2C 100%)', color: '#7B61FF' },
]

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{ padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13, color: 'rgba(240,242,245,0.3)',
              maxWidth: 260, margin: 0, lineHeight: 1.6,
            }}
          >
            No crew. No studio. No six-figure budget. You wouldn&apos;t know.
          </motion.p>
        </div>

        <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {WORK.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ item, index, inView }: { item: typeof WORK[number], index: number, inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 + index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', aspectRatio: '4/5',
        overflow: 'hidden', background: item.gradient, cursor: 'pointer',
      }}
    >
      {/* Subtle noise texture feel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, ${item.color}08 0%, transparent 60%)`,
      }} />

      {/* Play button */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0.2, transition: 'opacity 0.3s',
      }}>
        <div style={{
          width: hovered ? 60 : 48, height: hovered ? 60 : 48,
          border: `1px solid ${item.color}`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
          background: hovered ? `${item.color}12` : 'transparent',
        }}>
          <div style={{
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: `14px solid ${item.color}`,
            marginLeft: 4,
          }} />
        </div>
      </div>

      {/* Info overlay on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '32px 24px 24px',
        background: 'linear-gradient(to top, rgba(8,10,15,0.95), transparent)',
        transform: hovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <div style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 9, letterSpacing: '0.2em',
          color: item.color, textTransform: 'uppercase', marginBottom: 6, opacity: 0.7,
        }}>
          {item.tag}
        </div>
        <div style={{
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F2F5',
        }}>
          {item.title}
        </div>
      </div>

      {/* Top tag */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 8, letterSpacing: '0.2em',
        color: item.color, textTransform: 'uppercase',
        opacity: hovered ? 0 : 0.45, transition: 'opacity 0.2s',
      }}>
        {item.tag}
      </div>
    </motion.div>
  )
}
