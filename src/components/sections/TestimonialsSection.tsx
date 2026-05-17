'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* Harvey testimonials:
   - Light cream background
   - Horizontal scroll — 4 "slides"
   - Each slide: photo LEFT, quote RIGHT
   - Progress bar navigation at bottom
   - "Real impact for real clients" header
*/

const T = [
  {
    quote: '"Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos de trabajo."',
    name: 'María Fernanda Ríos',
    role: 'Directora Comercial',
    company: 'Grupo Empresarial',
    img: '/images/pay-equity.jpg',
  },
  {
    quote: '"Lo que más valoro es que el aprendizaje es 100% aplicado a mi trabajo real, no a ejemplos genéricos."',
    name: 'Luciana Reyes',
    role: 'Docente Universitaria',
    company: 'Universidad Nacional',
    img: '/images/gender.png',
  },
  {
    quote: '"En 6 semanas automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo real para crecer."',
    name: 'Camila Torres',
    role: 'Fundadora & CEO',
    company: 'Consultora RRHH',
    img: '/images/restaurant.png',
  },
  {
    quote: '"Tenía miedo de quedarme atrás. Orbbi me demostró que la experiencia acumulada es una ventaja enorme."',
    name: 'Patricia Vidal',
    role: 'Abogada Senior',
    company: 'Estudio Jurídico',
    img: '/images/hero.jpg',
  },
]

export default function TestimonialsSection() {
  const [i, setI] = useState(0)

  return (
    <section id="testimonios" className="sec-paper" style={{ paddingTop:'8rem', paddingBottom:'0' }}>
      <div className="wrap">

        {/* Harvey: "Real impact for real clients" header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'5.6rem' }}>
          <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.5vw,3.2rem)', fontWeight:'normal', letterSpacing:'-.02em', color:'#0D0C0A' }}>
            Impacto real para clientas reales
          </h2>
          <a href="/#contacto" className="btn-outline-d" style={{ flexShrink:0 }}>
            Ver más
          </a>
        </div>

        {/* Testimonial — photo left, quote right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:.5 }}
            style={{ display:'grid', gridTemplateColumns:'1fr', gap:'4rem', marginBottom:'4rem' }}
            className="l:grid-cols-[38rem_1fr]"
          >
            {/* Photo — Harvey: portrait editorial, no frame */}
            <div style={{ borderRadius:'1.2rem', overflow:'hidden', aspectRatio:'3/4', position:'relative', background:'#E0DDD8' }}>
              <Image src={T[i].img} alt={T[i].name} fill style={{ objectFit:'cover',objectPosition:'center top' }} sizes="40vw" />
            </div>

            {/* Quote — right side */}
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2rem 0' }}>
              <blockquote style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.8vw,3.6rem)', lineHeight:1.38, letterSpacing:'-.015em', fontStyle:'normal', color:'#0D0C0A', fontWeight:'normal' }}>
                {T[i].quote}
              </blockquote>
              <div style={{ marginTop:'4rem' }}>
                <p style={{ fontSize:'1.5rem', fontWeight:500, color:'#0D0C0A' }}>{T[i].name}</p>
                <p style={{ fontSize:'1.3rem', color:'rgba(13,12,10,0.5)', marginTop:'.2rem' }}>{T[i].role}</p>
                <p style={{ fontSize:'1.3rem', color:'rgba(13,12,10,0.4)', fontStyle:'italic' }}>{T[i].company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bars — Harvey style */}
        <div style={{ display:'flex', gap:'.6rem', paddingBottom:'6rem' }}>
          {T.map((_,j) => (
            <button
              key={j}
              onClick={()=>setI(j)}
              style={{
                flex:1, height:'2px',
                background: j===i ? '#0D0C0A' : 'rgba(13,12,10,0.15)',
                border:'none', cursor:'none',
                transition:'background .3s',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
