'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const PROFILES = [
  {
    role: 'Ejecutiva & Directiva',
    desc: 'Decisiones más rápidas, mejor fundamentadas. La IA amplifica tu liderazgo sin reemplazarlo.',
    img: '/images/pay-equity.jpg',
  },
  {
    role: 'Emprendedora',
    desc: 'Automatiza operaciones y escala sin contratar más. Tu capacidad se multiplica.',
    img: '/images/gender.png',
  },
  {
    role: 'Docente & Educadora',
    desc: 'Experiencias de aprendizaje más impactantes. La IA transforma cómo enseñas y evalúas.',
    img: '/images/restaurant.png',
  },
  {
    role: 'Consultora & Profesional independiente',
    desc: 'Diferénciate y entrega proyectos más rápido. La IA es tu verdadera ventaja competitiva.',
    img: '/images/hero.jpg',
  },
]

export default function ParaQuienSection() {
  return (
    <section id="para-quien" className="sec-testi sec-pad">
      <div className="page-wrap">

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:72, flexWrap:'wrap', gap:24 }}
        >
          <div>
            <p style={{ fontSize:14, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,14,13,0.4)', marginBottom:16 }}>Para quién</p>
            <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,4vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', maxWidth:560 }}>
              Diseñado para profesionales que{' '}
              <em style={{ fontStyle:'italic', color:'#706D66' }}>ya lideran</em>
              {' '}y quieren ir más lejos.
            </h2>
          </div>
          <a href="/#contacto" className="btn-explore" style={{ flexShrink:0 }}>
            Hablar con nosotros
          </a>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {PROFILES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:.8, delay:i*0.08, ease:[0.16,1,0.3,1] }}
              style={{
                background:'#FAFAF9',
                borderRadius:12,
                overflow:'hidden',
                display:'flex', flexDirection:'column',
              }}
            >
              <div style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden' }}>
                <Image
                  src={p.img} alt={p.role}
                  fill
                  style={{ objectFit:'cover', objectPosition:'center' }}
                  sizes="25vw"
                />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(15,14,13,0.72) 0%, transparent 55%)',
                }} />
                <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                  <h3 style={{
                    fontFamily:'"disp",Georgia,serif',
                    fontSize:'clamp(18px,1.6vw,24px)',
                    lineHeight:1.2,
                    color:'#FAFAF9',
                    letterSpacing:'-0.02em',
                    fontWeight:400,
                  }}>{p.role}</h3>
                </div>
              </div>
              <div style={{ padding:'20px 24px 28px' }}>
                <p style={{ fontSize:14, lineHeight:'20px', color:'#706D66' }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
