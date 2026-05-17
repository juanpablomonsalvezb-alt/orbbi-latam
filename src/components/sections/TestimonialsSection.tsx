'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const T = [
  {
    quote: '"Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos."',
    name: 'María Fernanda Ríos',
    role: 'Directora Comercial',
    company: 'Grupo Empresarial',
    img: '/images/pay-equity.jpg',
  },
  {
    quote: '"El aprendizaje es 100% aplicado a mi trabajo real. Mi consultora entendió mi sector desde la primera sesión."',
    name: 'Luciana Reyes',
    role: 'Docente Universitaria',
    company: 'Universidad Nacional',
    img: '/images/gender.png',
  },
  {
    quote: '"En 6 semanas automaticé el 40% de mis tareas. Ahora tengo tiempo para lo que realmente importa."',
    name: 'Camila Torres',
    role: 'Fundadora & CEO',
    company: 'Consultora RRHH',
    img: '/images/restaurant.png',
  },
  {
    quote: '"La experiencia acumulada es una ventaja enorme cuando se combina con IA. Orbbi me lo demostró."',
    name: 'Patricia Vidal',
    role: 'Abogada Senior',
    company: 'Estudio Jurídico',
    img: '/images/hero.jpg',
  },
]

export default function TestimonialsSection() {
  const [i, setI] = useState(0)
  const t = T[i]

  return (
    <section className="sec-testi sec-pad-t" id="testimonios">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:64 }}>
          <h3 className="t-h3" style={{ color:'#0F0E0D' }}>
            Impacto real para clientas reales
          </h3>
          <a href="/#contacto" className="btn-explore">
            Ver más
          </a>
        </div>

        {/* Slide: foto izquierda fija 340px, texto derecha */}
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity:0, x:20 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-20 }}
            transition={{ duration:.4, ease:[0.16,1,0.3,1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '340px 1fr',
              gap: 48,
              marginBottom: 40,
              alignItems: 'start',
            }}
          >
            {/* Foto — 340×425px fijos */}
            <div style={{
              position: 'relative',
              width: 340,
              height: 425,
              borderRadius: 8,
              overflow: 'hidden',
              background: '#E8E5E0',
              flexShrink: 0,
            }}>
              <Image
                src={t.img}
                alt={t.name}
                fill
                style={{ objectFit:'cover', objectPosition:'center top' }}
                sizes="340px"
              />
            </div>

            {/* Quote + attribution */}
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
          </motion.div>
        </AnimatePresence>

        {/* Barra de progreso Harvey */}
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
