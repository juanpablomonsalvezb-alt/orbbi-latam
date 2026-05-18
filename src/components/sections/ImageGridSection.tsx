'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const GRID_IMAGES = [
  { src: '/images/svc-formacion.jpg',   label: 'Formación personalizada', span: 'tall' },
  { src: '/images/svc-corporativo.jpg', label: 'Equipos corporativos',     span: 'normal' },
  { src: '/images/svc-herramienta.jpg', label: 'Herramientas de IA',       span: 'normal' },
  { src: '/images/svc-taller.jpg',      label: 'Talleres prácticos',       span: 'wide' },
  { src: '/images/svc-charla.jpg',      label: 'Charlas y conferencias',   span: 'normal' },
]

export default function ImageGridSection() {
  return (
    <section className="sec-dark sec-pad" style={{ background: '#0F0E0D' }}>
      <div className="page-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)', marginBottom: 14 }}>
              Cómo trabajamos
            </p>
            <h2 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(32px,3.5vw,52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 400,
              color: '#FAFAF9',
              maxWidth: 560,
            }}>
              IA que se ve,{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(250,250,249,0.45)' }}>se aprende</em>
              {' '}y se aplica.
            </h2>
          </div>
          <a
            href="/#contacto"
            style={{
              flexShrink: 0,
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(250,250,249,0.6)',
              textDecoration: 'none',
              transition: 'color .2s',
              paddingBottom: 2,
              borderBottom: '1px solid rgba(250,250,249,0.2)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FAFAF9')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,249,0.6)')}
          >
            Ver todos los programas →
          </a>
        </motion.div>

        {/* Grid editorial — 3 columnas con alturas variadas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: 12,
        }}>

          {/* Col 1 — imagen tall, ocupa 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .9, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: '1',
              gridRow: '1 / 3',
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              minHeight: 540,
            }}
          >
            <Image
              src="/images/svc-formacion.jpg"
              alt="Formación personalizada en IA"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,14,13,0.7) 0%, transparent 50%)',
            }} />
            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(250,250,249,0.5)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>01</p>
              <p style={{ fontSize: 18, fontWeight: 400, color: '#FAFAF9', lineHeight: '22px', fontFamily: '"disp",Georgia,serif' }}>Formación personalizada</p>
            </div>
          </motion.div>

          {/* Col 2, Row 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: '2',
              gridRow: '1',
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              minHeight: 260,
            }}
          >
            <Image
              src="/images/svc-corporativo.jpg"
              alt="Equipos corporativos"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,13,0.65) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(250,250,249,0.5)', marginBottom: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>02</p>
              <p style={{ fontSize: 17, fontWeight: 400, color: '#FAFAF9', lineHeight: '21px', fontFamily: '"disp",Georgia,serif' }}>Equipos corporativos</p>
            </div>
          </motion.div>

          {/* Col 3, Row 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: '3',
              gridRow: '1',
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              minHeight: 260,
            }}
          >
            <Image
              src="/images/svc-herramienta.jpg"
              alt="Herramientas de IA"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,13,0.65) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(250,250,249,0.5)', marginBottom: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>03</p>
              <p style={{ fontSize: 17, fontWeight: 400, color: '#FAFAF9', lineHeight: '21px', fontFamily: '"disp",Georgia,serif' }}>Herramientas de IA</p>
            </div>
          </motion.div>

          {/* Col 2+3, Row 2 — wide, spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: '2 / 4',
              gridRow: '2',
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              minHeight: 268,
            }}
          >
            <Image
              src="/images/svc-taller.jpg"
              alt="Talleres prácticos de IA"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              sizes="(max-width:768px) 100vw, 66vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,14,13,0.6) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(250,250,249,0.5)', marginBottom: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>04</p>
              <p style={{ fontSize: 20, fontWeight: 400, color: '#FAFAF9', lineHeight: '24px', fontFamily: '"disp",Georgia,serif' }}>Talleres y workshops prácticos</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
