'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 14, color: '#F0F2F5',
  background: '#0A0C11',
  border: '1px solid #1E2230',
  borderRadius: 4, padding: '14px 16px',
  outline: 'none', width: '100%',
  transition: 'border-color 0.2s',
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

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
      {/* Ambient */}
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
            lineHeight: 0.9, color: '#F0F2F5', marginBottom: 80,
          }}
        >
          Ready to<br />
          <span style={{
            background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            create?
          </span>
        </motion.h2>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 120px)', alignItems: 'start' }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'rgba(240,242,245,0.4)', lineHeight: 1.7,
              margin: '0 0 48px', maxWidth: 380,
            }}>
              Tell us what you need. We&apos;ll come back with a concept within 48 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Instagram', value: '@ericywlu', href: 'https://instagram.com/ericywlu' },
                { label: 'X', value: '@ericluski', href: 'https://x.com/ericluski' },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 9, letterSpacing: '0.25em',
                    color: 'rgba(0,229,255,0.4)', textTransform: 'uppercase', marginBottom: 4,
                  }}>
                    {label}
                  </div>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14, color: 'rgba(240,242,245,0.55)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F0F2F5' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,242,245,0.55)' }}
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            {sent ? (
              <div style={{ padding: '48px 0' }}>
                <div style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 700, color: '#00E5FF',
                  letterSpacing: '-0.03em', marginBottom: 12,
                }}>
                  We&apos;ll be in touch.
                </div>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14, color: 'rgba(240,242,245,0.35)', margin: 0,
                }}>
                  Expect a reply within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {[
                  { name: 'name', placeholder: 'Your name', type: 'text', required: true },
                  { name: 'company', placeholder: 'Company (optional)', type: 'text', required: false },
                  { name: 'email', placeholder: 'Email address', type: 'email', required: true },
                ].map(f => (
                  <input
                    key={f.name} name={f.name} type={f.type}
                    placeholder={f.placeholder} required={f.required}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.35)' }}
                    onBlur={e => { e.target.style.borderColor = '#1E2230' }}
                  />
                ))}

                <textarea
                  name="brief" placeholder="Tell us about your project"
                  rows={4} required
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.35)' }}
                  onBlur={e => { e.target.style.borderColor = '#1E2230' }}
                />

                <button
                  type="submit"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#080A0F', background: '#00E5FF',
                    border: 'none', borderRadius: 4, padding: '16px 32px',
                    cursor: 'pointer', transition: 'opacity 0.2s', alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  Send Brief →
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.6 }}
          style={{
            marginTop: 120, paddingTop: 32,
            borderTop: '1px solid #1A1D26',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em',
            color: 'rgba(240,242,245,0.25)',
          }}>
            Luski Collection
          </div>
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 9, letterSpacing: '0.15em',
            color: 'rgba(240,242,245,0.15)',
          }}>
            © 2025 — All rights reserved
          </div>
        </motion.div>
      </div>
    </section>
  )
}
