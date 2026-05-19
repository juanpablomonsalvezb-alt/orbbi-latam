'use client'
import { motion } from 'framer-motion'

const FILAS = [
  { atributo: 'Personalizado a tu profesión',        orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Mentor real en tiempo real',          orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Aplicado a tu flujo de trabajo real', orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Sin conocimientos técnicos previos',  orbbi: true,  curso: true,  youtube: true,  solo: false },
  { atributo: 'Resultados en semanas',               orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Soporte entre sesiones',              orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Garantía de devolución',              orbbi: true,  curso: false, youtube: false, solo: false },
  { atributo: 'Sin compromiso largo plazo',          orbbi: true,  curso: false, youtube: true,  solo: true  },
]

const COLS = [
  { label: 'Orbbi',          sub: 'Mentoría 1:1', highlight: true  },
  { label: 'Curso grabado',  sub: 'Udemy, Platzi', highlight: false },
  { label: 'YouTube',        sub: 'Gratis',        highlight: false },
  { label: 'Solo',           sub: 'Trial & error', highlight: false },
]

export default function ComparadorSection() {
  return (
    <section className="sec-light" style={{ padding: '120px 0' }}>
      <div className="page-wrap">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
            ¿Por qué Orbbi?
          </p>
          <h2 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(32px,3.5vw,48px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            fontWeight: 400, color: '#0F0E0D', maxWidth: 520,
          }}>
            No todas las formas de aprender IA son iguales.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflowX: 'auto' }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0 0 20px', width: '36%' }} />
                {COLS.map((col, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: 'center',
                      padding: '0 12px 20px',
                      width: '16%',
                    }}
                  >
                    <div style={{
                      display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      background: col.highlight ? '#0F0E0D' : 'transparent',
                      borderRadius: col.highlight ? 8 : 0,
                      padding: col.highlight ? '12px 20px' : '0',
                    }}>
                      <span style={{
                        fontSize: 14, fontWeight: 500,
                        color: col.highlight ? '#FAFAF9' : '#0F0E0D',
                      }}>
                        {col.label}
                      </span>
                      <span style={{
                        fontSize: 11,
                        color: col.highlight ? 'rgba(250,250,249,0.45)' : 'rgba(15,14,13,0.4)',
                      }}>
                        {col.sub}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILAS.map((fila, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(15,14,13,0.08)' }}>
                  <td style={{ padding: '16px 0', fontSize: 14, color: 'rgba(15,14,13,0.7)', lineHeight: '20px' }}>
                    {fila.atributo}
                  </td>
                  {[fila.orbbi, fila.curso, fila.youtube, fila.solo].map((val, j) => (
                    <td key={j} style={{ textAlign: 'center', padding: '16px 12px' }}>
                      {val ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 24, height: 24, borderRadius: '50%',
                          background: j === 0 ? '#0F0E0D' : 'rgba(15,14,13,0.08)',
                        }}>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l2.5 2.5L10 3" stroke={j === 0 ? '#FAFAF9' : 'rgba(15,14,13,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      ) : (
                        <span style={{ color: 'rgba(15,14,13,0.2)', fontSize: 16, lineHeight: 1 }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  )
}
