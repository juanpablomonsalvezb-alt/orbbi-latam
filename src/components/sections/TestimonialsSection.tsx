'use client'
import { useState } from 'react'

const T = [
  {
    quote: '"En tres semanas automaticé lo que antes me tomaba dos días completos. La orientación 1:1 marcó la diferencia."',
    name: 'Carlos Mendoza',
    role: 'Abogado Senior',
    company: 'Estudio Jurídico',
    accent: '#C9A96E',
  },
  {
    quote: '"El aprendizaje es 100% aplicado a mi trabajo real. Entendieron mi sector desde la primera sesión."',
    name: 'Luciana Reyes',
    role: 'Docente Universitaria',
    company: 'Universidad Nacional',
    accent: '#8FA8C9',
  },
  {
    quote: '"Automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo para lo que realmente importa."',
    name: 'Andrés Torres',
    role: 'Consultor independiente',
    company: 'Finanzas corporativas',
    accent: '#A8C98F',
  },
  {
    quote: '"Pedí aprender Notion IA específicamente para mis proyectos. En dos semanas lo dominaba completamente."',
    name: 'Patricia Vidal',
    role: 'Gerente de Proyectos',
    company: 'Empresa tecnológica',
    accent: '#C98FA8',
  },
]

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] || '') + (parts[parts.length-1]?.[0] || '')).toUpperCase()
}

export default function TestimonialsSection() {
  const [i, setI] = useState(0)

  return (
    <section className="sec-testi sec-pad-t" id="testimonios">
      <div className="page-wrap">

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:64 }}>
          <h3 className="t-h3" style={{ color:'#0F0E0D' }}>
            Impacto real para profesionales reales
          </h3>
          <a href="/#contacto" className="btn-explore">
            Ver más
          </a>
        </div>

        {/* Contenedor relativo para transición CSS entre testimonios */}
        <div style={{ position:'relative', marginBottom:40 }}>
          {T.map((t, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '340px 1fr',
                gap: 48,
                alignItems: 'start',
                position: idx === 0 ? 'relative' : 'absolute',
                inset: idx === 0 ? undefined : 0,
                opacity: idx === i ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: idx === i ? 'auto' : 'none',
              }}
              className="testi-grid"
            >
              <div style={{
                position: 'relative',
                width: 340,
                height: 425,
                borderRadius: 8,
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${t.accent}30 0%, ${t.accent}10 100%)`,
                flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(15,14,13,0.06)',
              }}>
                <div style={{
                  width: 140, height: 140, borderRadius: '50%',
                  background: t.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 56, color: '#FAFAF9', fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}>
                  {initials(t.name)}
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:425, padding:'24px 0' }}>
                <p style={{
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 36,
                  lineHeight: '42px',
                  letterSpacing: '-0.36px',
                  fontWeight: 400,
                  color: '#0F0E0D',
                  marginBottom: 48,
                }}>
                  {t.quote}
                </p>
                <div>
                  <p style={{ fontSize:20, fontWeight:500, color:'#0F0E0D', lineHeight:'26px', marginBottom:4 }}>{t.name}</p>
                  <p className="t-body" style={{ color:'#706D66' }}>{t.role}</p>
                  <p className="t-body" style={{ color:'#706D66' }}>{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:6 }}>
          {T.map((_,j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              className={`testi-progress ${j===i?'active':''}`}
              style={{
                background: j===i ? '#0F0E0D' : 'rgba(15,14,13,0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background .3s',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
