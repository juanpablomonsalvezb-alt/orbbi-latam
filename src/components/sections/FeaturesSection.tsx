'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FEATURES = [
  { label: 'Formación Esencial', sub: 'De cero a productiva en 8 semanas. Sin tecnicismos.' },
  { label: 'Orientación 1:1',    sub: 'IA diseñada para tu cargo, tu sector, tu flujo de trabajo.' },
  { label: 'Herramienta a Medida', sub: 'Tu propio asistente de IA, construido para ti.' },
  { label: 'Programas Corporativos', sub: 'IA para equipos completos, con foco en liderazgo femenino.' },
  { label: 'Comunidad activa',    sub: 'Red de mujeres líderes en IA en toda Latinoamérica.' },
  { label: 'Acompañamiento real', sub: 'No termina cuando termina el programa. Te seguimos.' },
]

export default function FeaturesSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % FEATURES.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="programas" className="section-dark">
      <div className="wrap">

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }} className="l:flex-row l:items-start l:gap-[12rem]">

          {/* Left: label + description */}
          <div style={{ maxWidth: '44rem', flexShrink: 0 }}>
            <p className="label" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '3.2rem' }}>
              Lo que hacemos
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="title" style={{ color: '#FFFFFF', marginBottom: '2rem' }}>
                  {FEATURES[active].label}
                </h2>
                <p className="body-l" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {FEATURES[active].sub}
                </p>
              </motion.div>
            </AnimatePresence>
            <a href="/#contacto" className="btn-white" style={{ marginTop: '4rem', display: 'inline-flex' }}>
              Solicitar diagnóstico gratuito
            </a>
          </div>

          {/* Right: feature list — Harvey-style */}
          <div style={{ flex: 1 }}>
            {FEATURES.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  width: '100%', background: 'none', border: 'none', cursor: 'none',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  padding: '2.4rem 0',
                  transition: 'opacity .3s',
                  ...(i === FEATURES.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.08)' } : {}),
                }}
              >
                <span style={{
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 'clamp(2.4rem,3.5vw,4.8rem)',
                  lineHeight: 1.1, letterSpacing: '-0.02em',
                  color: i === active ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
                  transition: 'color .4s',
                  textAlign: 'left',
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: i === active ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.12)',
                  transition: 'color .4s', flexShrink: 0, marginLeft: '2rem',
                }}>
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
