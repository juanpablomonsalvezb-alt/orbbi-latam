'use client'

const items = [
  'Mujeres que lideran',
  'IA sin tecnicismos',
  'Impacto real',
  'Aprende a tu ritmo',
  'Latinoamérica',
  '100% Online',
  'Transforma tu carrera',
  'Comunidad activa',
  'Sin límites',
  'Tecnología con propósito',
]

export default function TickerSection() {
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-20 s:py-24"
      style={{
        borderTop: '1px solid rgba(201,169,110,0.10)',
        borderBottom: '1px solid rgba(201,169,110,0.10)',
        position: 'relative',
        zIndex: 2,
        background: 'rgba(13,13,18,0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="ticker-track flex items-center gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-0"
          >
            <span
              className="text-12 s:text-13 uppercase tracking-[0.18rem] font-medium px-32 s:px-40"
              style={{ color: 'rgba(245,240,232,0.45)' }}
            >
              {item}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#C9A96E',
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
