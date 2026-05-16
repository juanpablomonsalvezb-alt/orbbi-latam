'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const PROFILES = [
  {
    role: 'Ejecutiva & Directiva',
    desc: 'Decisiones más rápidas, mejor fundamentadas. La IA amplifica tu liderazgo.',
    img: '/images/pay-equity.jpg',
    color: '#1E3A2F',
  },
  {
    role: 'Emprendedora',
    desc: 'Automatiza operaciones y escala sin contratar más. Tu capacidad se multiplica.',
    img: '/images/gender.png',
    color: '#2C4A3E',
  },
  {
    role: 'Docente & Educadora',
    desc: 'Experiencias de aprendizaje más impactantes. La IA transforma cómo enseñas.',
    img: '/images/restaurant.png',
    color: '#1E3A2F',
  },
  {
    role: 'Consultora & Profesional independiente',
    desc: 'Diferénciate y entrega proyectos más rápido. La IA es tu ventaja real.',
    img: '/images/hero.jpg',
    color: '#2C4A3E',
  },
]

export default function ParaQuienSection() {
  return (
    <section id="para-quien" className="section" style={{ background:'#EDEAE3' }}>
      <div className="wrap">

        <motion.div
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.9, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:'7rem' }}
        >
          <p className="t-tag" style={{ marginBottom:'1.6rem' }}>Para quién</p>
          <h2 className="t-h2" style={{ maxWidth:'60rem' }}>
            Diseñado para mujeres que{' '}
            <em style={{ fontStyle:'italic', color:'#B8924A' }}>ya lideran</em>
            {' '}y quieren ir más lejos.
          </h2>
        </motion.div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(2,1fr)',
          gap:'1.6rem',
        }} className="s:grid-cols-4">
          {PROFILES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:.8, delay:i*0.1, ease:[0.16,1,0.3,1] }}
              style={{
                background:'#F7F3EE',
                borderRadius:'2rem',
                overflow:'hidden',
                display:'flex', flexDirection:'column',
                cursor:'none',
              }}
            >
              {/* Image */}
              <div style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden' }}>
                <Image
                  src={p.img} alt={p.role}
                  fill style={{ objectFit:'cover', objectPosition:'center', transition:'transform .6s' }}
                  sizes="25vw"
                />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(30,58,47,0.65) 0%, transparent 50%)',
                }} />
                <div style={{ position:'absolute', bottom:'2rem', left:'2rem', right:'2rem' }}>
                  <h3 style={{
                    fontFamily:'"disp",Georgia,serif',
                    fontSize:'clamp(1.6rem,1.8vw,2.2rem)',
                    lineHeight:1.2,
                    color:'#F7F3EE',
                    letterSpacing:'-0.01em',
                  }}>{p.role}</h3>
                </div>
              </div>
              {/* Text */}
              <div style={{ padding:'2rem 2.4rem 2.4rem' }}>
                <p className="t-small" style={{ lineHeight:1.7 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
