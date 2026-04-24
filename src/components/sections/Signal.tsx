'use client'

const ROW_1 = ['AI SYSTEMS', '✦', 'BUILT IN PUBLIC', '✦', 'MACHINE LEARNING', '✦', 'CONTENT', '✦', 'EXPERIMENTS', '✦', 'LUSKI', '✦']
const ROW_2 = ['PROMPT ENGINEERING', '✦', 'RAW FOOTAGE', '✦', 'NO FILTERS', '✦', 'REAL BUILDS', '✦', 'OPEN SOURCE', '✦', 'SIGNAL', '✦']

function MarqueeRow({ items, reverse = false, speed = 28 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
      }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: i % 2 === 1 ? 'var(--font-space-grotesk), sans-serif' : 'var(--font-jetbrains-mono), monospace',
              fontSize: i % 2 === 1 ? 10 : 10,
              letterSpacing: i % 2 === 1 ? '0.05em' : '0.3em',
              textTransform: 'uppercase',
              color: i % 2 === 1 ? 'rgba(0,229,255,0.4)' : '#4A5060',
              paddingLeft: 36,
              paddingRight: 36,
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Signal() {
  return (
    <div
      id="signal"
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(8,10,15,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Top gradient fade */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, #080A0F 0%, transparent 8%, transparent 92%, #080A0F 100%)',
      }} />

      <div style={{ padding: '18px 0 6px' }}>
        <MarqueeRow items={ROW_1} speed={32} />
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.03)', margin: '0 48px' }} />
      <div style={{ padding: '6px 0 18px' }}>
        <MarqueeRow items={ROW_2} reverse speed={40} />
      </div>
    </div>
  )
}
