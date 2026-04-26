'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = [
  { value: 23, label: 'Brands Served', prefix: '', suffix: '' },
  { value: 340, label: 'Saved in Production', prefix: '$', suffix: 'K+' },
  { value: 47, label: 'Videos Delivered', prefix: '', suffix: '' },
  { value: 7, label: 'Days Avg Delivery', prefix: '', suffix: '' },
]

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' })
    count.on('change', v => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString() + suffix
    })
    return controls.stop
  }, [inView, count, value, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid #1E2230',
        borderBottom: '1px solid #1E2230',
        padding: 'clamp(20px, 3vh, 28px) clamp(20px, 5vw, 64px)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <div style={{
        display: 'flex',
        gap: 'clamp(32px, 6vw, 80px)',
        alignItems: 'center',
        minWidth: 'max-content',
        margin: '0 auto',
        maxWidth: 1400,
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}
          >
            <div style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 700, letterSpacing: '-0.03em',
              color: '#F0F2F5', lineHeight: 1,
            }}>
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(240,242,245,0.3)', textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}

        {/* Dividers between stats */}
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 1, height: 32, background: '#1E2230', flexShrink: 0, margin: '0 -40px' }} />
        ))}
      </div>
    </div>
  )
}
