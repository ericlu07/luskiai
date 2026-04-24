'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const WORK_ITEMS = [
  {
    id: 1,
    type: 'VIDEO',
    title: 'How I built a personal AI that actually remembers me',
    desc: 'Full memory architecture — vector DB, context windowing, the real stack.',
    tags: ['AI', 'Engineering'],
    stat: '420K views',
    color: '#00E5FF',
  },
  {
    id: 2,
    type: 'THREAD',
    title: '11 things I learned from running 300 AI experiments',
    desc: 'Patterns nobody talks about. What actually separates good prompts from great ones.',
    tags: ['Research', 'AI'],
    stat: '180K impressions',
    color: '#7B61FF',
  },
  {
    id: 3,
    type: 'TOOL',
    title: 'Prompt OS — a system for thinking with AI',
    desc: 'Open-source framework for structuring how you work with language models.',
    tags: ['Product', 'OSS'],
    stat: '2.4K stars',
    color: '#00E5FF',
  },
  {
    id: 4,
    type: 'ESSAY',
    title: 'The attention economy is broken. AI makes it worse.',
    desc: 'Why every new AI tool is secretly a distraction machine.',
    tags: ['Opinion', 'AI'],
    stat: '94K reads',
    color: '#7B61FF',
  },
  {
    id: 5,
    type: 'VIDEO',
    title: 'I gave an AI my entire life for 30 days. Here\'s what happened.',
    desc: 'Every decision filtered through a model. Sleep scores, finances, relationships.',
    tags: ['Experiment', 'AI'],
    stat: '1.1M views',
    color: '#00E5FF',
  },
  {
    id: 6,
    type: 'THREAD',
    title: 'The real reason most AI tools fail (it\'s not the model)',
    desc: 'It\'s the interface. It\'s the workflow. It\'s you.',
    tags: ['Systems', 'AI'],
    stat: '240K impressions',
    color: '#7B61FF',
  },
]

function WorkCard({ item, index }: { item: typeof WORK_ITEMS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay: (index % 3) * 0.1 }}
      data-cursor-hover
      style={{
        padding: '32px 28px',
        background: '#0E1015',
        border: '1px solid #1E2230',
        borderRadius: 16,
        cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.22s, box-shadow 0.3s, background 0.2s',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${item.color}40`
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${item.color}20, 0 0 40px ${item.color}08`
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
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${item.color}50 40%, ${item.color}50 60%, transparent 100%)`,
        opacity: 0.6,
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute',
        top: -40, right: -40,
        width: 120, height: 120,
        background: `radial-gradient(circle, ${item.color}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 9,
          letterSpacing: '0.28em',
          color: item.color,
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: 5,
          background: `${item.color}12`,
          border: `1px solid ${item.color}30`,
        }}>
          {item.type}
        </span>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 10,
          color: '#4A5060',
          letterSpacing: '0.08em',
        }}>
          {item.stat}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        fontSize: 18,
        fontWeight: 650,
        color: '#F0F2F5',
        lineHeight: 1.4,
        letterSpacing: '-0.02em',
        marginBottom: 14,
        flex: 1,
      }}>
        {item.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 13,
        color: '#4A5060',
        lineHeight: 1.65,
        marginBottom: 24,
        fontFamily: 'var(--font-inter), sans-serif',
      }}>
        {item.desc}
      </p>

      {/* Tags + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              color: '#8A92A0',
              padding: '3px 9px',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'var(--font-inter), sans-serif',
              letterSpacing: '0.03em',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <span style={{ color: item.color, fontSize: 14, opacity: 0.6 }}>↗</span>
      </div>
    </motion.div>
  )
}

export function Work() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '160px 48px',
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
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ width: 28, height: 1, background: 'rgba(0,229,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
        02 / Work
      </motion.div>

      {/* Big heading */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            color: '#F0F2F5',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Selected signals.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10,
            color: '#4A5060',
            letterSpacing: '0.15em',
            maxWidth: 220,
            lineHeight: 1.7,
            textTransform: 'uppercase',
          }}
        >
          3M+ impressions across platforms. The content that cut through.
        </motion.p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {WORK_ITEMS.map((item, i) => (
          <WorkCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
