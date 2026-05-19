'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const FAQS = [
  {
    q: '¿Necesito saber de tecnología para tomar la mentoría?',
    a: 'No. Las mentorías están diseñadas para profesionales que no tienen conocimientos técnicos de IA. Partimos desde donde estás y avanzamos a tu ritmo, siempre aplicado a tu trabajo real.',
  },
  {
    q: '¿Las sesiones son en vivo o grabadas?',
    a: 'Todas las sesiones son en vivo, 1:1 por videollamada. No hay contenido grabado: cada sesión se adapta exactamente a tu situación y objetivos del momento.',
  },
  {
    q: '¿Desde qué país puedo tomar la mentoría?',
    a: 'Desde cualquier país de Latinoamérica: Chile, México, Colombia, Argentina, Perú, Ecuador, Uruguay y más. Las sesiones son 100% online por videollamada.',
  },
  {
    q: '¿Qué herramientas de IA aprendo a usar?',
    a: 'Depende de tu profesión y objetivos. Trabajamos con ChatGPT, Claude, Gemini, herramientas de automatización sin código, generación de imágenes, análisis de documentos y más. Siempre enfocados en las herramientas de mayor impacto para tu trabajo específico.',
  },
  {
    q: '¿Qué pasa si la sesión no me convence?',
    a: 'Si después de tu primera sesión sientes que no fue lo que esperabas, te devolvemos el dinero. Sin preguntas. Queremos que el resultado valga tu inversión.',
  },
  {
    q: '¿Cómo coordino el horario de la sesión?',
    a: 'Al agendar tu diagnóstico eliges un horario disponible directamente en el calendario. Te mostramos los horarios convertidos a tu zona horaria automáticamente. Confirmamos por email en menos de 24 horas.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="sec-light" style={{ padding: '120px 0' }}>
      <div className="page-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }} className="faq-grid">

          {/* Izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'sticky', top: 100 }}
          >
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
              Preguntas frecuentes
            </p>
            <h2 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(32px,3.5vw,44px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              fontWeight: 400, color: '#0F0E0D', marginBottom: 20,
            }}>
              Todo lo que necesitas saber antes de empezar.
            </h2>
            <p style={{ fontSize: 15, lineHeight: '23px', color: 'rgba(15,14,13,0.5)', marginBottom: 32 }}>
              Si tienes alguna otra duda, escríbenos directamente.
            </p>
            <a
              href="mailto:cse.coordinacion@gmail.com"
              style={{ fontSize: 14, fontWeight: 500, color: '#0F0E0D', textDecoration: 'none', borderBottom: '1px solid rgba(15,14,13,0.25)', paddingBottom: 2 }}
            >
              cse.coordinacion@gmail.com →
            </a>
          </motion.div>

          {/* Derecha — acordeón */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }}
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    background: 'none', border: 'none',
                    padding: '24px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontSize: 16, fontWeight: 500, lineHeight: '22px',
                    color: '#0F0E0D',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0, fontSize: 22, lineHeight: 1,
                    color: 'rgba(15,14,13,0.35)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform .25s ease',
                    display: 'block',
                  }}>
                    +
                  </span>
                </button>
                {open === i && (
                  <div style={{ paddingBottom: 24 }}>
                    <p style={{ fontSize: 15, lineHeight: '24px', color: 'rgba(15,14,13,0.55)' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
