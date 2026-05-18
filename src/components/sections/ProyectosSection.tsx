'use client'
import { motion } from 'framer-motion'

const PROYECTOS = [
  {
    nombre: 'Nebbuler',
    url: 'nebbuler.com',
    href: 'https://www.nebbuler.com',
    tag: 'Monetización de conocimiento',
    headline: 'Tu conocimiento ya tiene precio.',
    desc: 'Plataforma para que profesionales latinoamericanos cobren por su expertise. Suscripciones ilimitadas, 0% de comisión, editor premium y analíticas completas. El conocimiento que antes no se vendía, ahora sí.',
    cta: 'Ver plataforma →',
    accent: '#C9A96E',
    accentBg: 'rgba(201,169,110,0.07)',
  },
  {
    nombre: 'Sokra',
    url: 'sokraapp.com',
    href: 'https://www.sokraapp.com',
    tag: 'Preuniversitario online con IA · Chile',
    headline: 'El pre que no te da las respuestas — te enseña a encontrarlas.',
    desc: 'Plataforma de preparación PAES 2026 con inteligencia artificial socrática. 414 lecciones, +5.800 preguntas en 7 asignaturas, ensayos simulados, mentor IA 24/7 y predicción de puntaje. La IA no te da las respuestas: te hace las preguntas correctas hasta que tú llegas solo.',
    cta: 'Conocer Sokra →',
    accent: '#8FA8C9',
    accentBg: 'rgba(143,168,201,0.07)',
  },
]

export default function ProyectosSection() {
  return (
    <section className="sec-light" style={{ padding: '144px 0' }}>
      <div className="page-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <p style={{
            fontSize: 13, fontWeight: 500, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16,
          }}>
            Ecosistema
          </p>
          <h2 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(36px,4vw,56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            color: '#0F0E0D',
            maxWidth: 560,
          }}>
            Nuestros{' '}
            <em style={{ fontStyle: 'italic', color: '#8F8B85' }}>otros proyectos</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
          className="proyectos-grid"
        >
          {PROYECTOS.map((p, i) => (
            <motion.a
              key={p.nombre}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: .8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                background: '#0F0E0D',
                borderRadius: 16,
                padding: '52px 48px 44px',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform .3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Fondo sutil con color de acento */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${p.accentBg}, transparent)`,
                pointerEvents: 'none',
              }} />

              {/* Marca de agua nombre */}
              <span style={{
                position: 'absolute',
                bottom: -24,
                right: 32,
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(80px,10vw,140px)',
                lineHeight: 1,
                color: 'rgba(250,250,249,0.04)',
                letterSpacing: '-0.05em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {p.nombre}
              </span>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Tag + URL */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
                  <span style={{
                    fontSize: 12, fontWeight: 500, textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: p.accent,
                  }}>
                    {p.tag}
                  </span>
                  <span style={{
                    fontSize: 13, color: 'rgba(250,250,249,0.3)',
                    fontFamily: '"sans",system-ui,sans-serif',
                  }}>
                    {p.url}
                  </span>
                </div>

                {/* Nombre del proyecto */}
                <p style={{
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 'clamp(28px,3vw,40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                  color: '#FAFAF9',
                  marginBottom: 8,
                }}>
                  {p.nombre}
                </p>

                {/* Headline */}
                <p style={{
                  fontSize: 18,
                  lineHeight: '24px',
                  fontWeight: 500,
                  color: p.accent,
                  marginBottom: 20,
                }}>
                  {p.headline}
                </p>

                {/* Descripción */}
                <p style={{
                  fontSize: 15,
                  lineHeight: '23px',
                  color: 'rgba(250,250,249,0.5)',
                  maxWidth: 440,
                  marginBottom: 40,
                }}>
                  {p.desc}
                </p>

                {/* CTA */}
                <span style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(250,250,249,0.6)',
                  transition: 'color .2s',
                  display: 'inline-block',
                  borderBottom: '1px solid rgba(250,250,249,0.15)',
                  paddingBottom: 2,
                }}>
                  {p.cta}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
