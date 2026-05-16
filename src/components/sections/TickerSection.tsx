const ITEMS = [
  'Mujeres que lideran', 'IA aplicada a tu trabajo', 'Sin tecnicismos',
  'Latinoamérica', 'Impacto real', '100% Online', 'Aprende a tu ritmo',
  'Resultados medibles', 'Tu carrera, amplificada',
]

export default function TickerSection() {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div
      className="section-sm overflow-hidden"
      style={{ borderTop:'1px solid rgba(201,169,110,0.07)', borderBottom:'1px solid rgba(201,169,110,0.07)' }}
    >
      <div className="ticker items-center gap-0 select-none">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="t-tag px-40 s:px-56 whitespace-nowrap"
              style={{ color:'rgba(242,237,228,0.28)' }}
            >
              {item}
            </span>
            <span
              style={{
                display:'inline-block', width:4, height:4,
                borderRadius:'50%', background:'rgba(201,169,110,0.4)', flexShrink:0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
