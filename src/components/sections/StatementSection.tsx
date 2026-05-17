'use client'
import { motion } from 'framer-motion'

export default function StatementSection() {
  return (
    <section className="section-paper">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label" style={{ color: 'rgba(15,15,14,0.38)', marginBottom: '4rem' }}>
            — Por qué Orbbi
          </p>
          <h2 className="headline" style={{ color: '#0F0F0E', maxWidth: '112rem' }}>
            Orbbi es IA diseñada para mujeres{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(15,15,14,0.38)' }}>
              que ya lideran
            </em>{' '}
            y quieren ir más lejos.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.4rem',
            marginTop: '8rem',
            paddingTop: '6rem',
            borderTop: '1px solid rgba(15,15,14,0.09)',
          }}
          className="s:flex-row s:items-start s:justify-between"
        >
          <p className="body-l" style={{ color: 'rgba(15,15,14,0.52)', maxWidth: '56rem' }}>
            No somos un curso de YouTube ni una academia genérica. Somos una consultora que trabaja contigo, entiende tu industria y diseña un programa exactamente para ti.
          </p>
          <div style={{ display: 'flex', gap: '1.6rem', flexShrink: 0, flexWrap: 'wrap' }}>
            <a href="/#contacto" className="btn-dark">Solicitar diagnóstico</a>
            <a href="/#programas" className="btn-outline-d">Ver programas</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
