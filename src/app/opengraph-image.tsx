import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Luski Collection — AI Video Production for Brands'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#080A0F',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid lines for texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          display: 'flex',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: -100, left: -100,
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Label */}
        <div style={{
          fontSize: 14, letterSpacing: '0.3em',
          color: 'rgba(0,229,255,0.6)',
          textTransform: 'uppercase', marginBottom: 24,
          display: 'flex',
        }}>
          AI Video Production Studio
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 96, fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.9,
          color: '#F0F2F5', marginBottom: 32,
          display: 'flex', flexDirection: 'column',
        }}>
          <span>LUSKI</span>
          <span style={{ color: 'rgba(240,242,245,0.3)' }}>COLLECTION</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 22, color: 'rgba(240,242,245,0.45)', display: 'flex' }}>
          Film-quality video. Undetectably AI. Under $500.
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute', top: 80, right: 80,
          fontSize: 14, letterSpacing: '0.1em',
          color: 'rgba(240,242,245,0.2)',
          display: 'flex',
        }}>
          luskicollection.com
        </div>
      </div>
    ),
    { ...size }
  )
}
