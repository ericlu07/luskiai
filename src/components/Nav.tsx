'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'About',  href: '#about'   },
  { label: 'Connect', href: '#connect' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3600)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 32px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        background: scrolled ? 'rgba(8,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontSize: 18,
          fontWeight: 700,
          color: '#F0F2F5',
          textDecoration: 'none',
          letterSpacing: '-0.03em',
        }}
      >
        LUSKI
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontSize: 13,
              color: '#8A92A0',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 0.2s',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 500,
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F0F2F5' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#8A92A0' }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#connect"
        data-cursor-hover
        style={{
          fontSize: 12,
          fontWeight: 600,
          padding: '8px 18px',
          borderRadius: 8,
          background: 'rgba(0,229,255,0.08)',
          border: '1px solid rgba(0,229,255,0.22)',
          color: '#00E5FF',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          transition: 'background 0.2s, box-shadow 0.2s',
          fontFamily: 'var(--font-inter), sans-serif',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(0,229,255,0.15)'
          el.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(0,229,255,0.08)'
          el.style.boxShadow = 'none'
        }}
      >
        Follow →
      </a>
    </motion.header>
  )
}
