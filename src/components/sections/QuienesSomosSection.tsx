'use client'
import { motion } from 'framer-motion'

const EQUIPO = [
  {
    nombre: 'Juan Pablo Monsalvez',
    rol: 'Director & Fundador',
    desc: 'Emprendedor y especialista en inteligencia artificial aplicada. Fundó Orbbi desde la convicción de que la IA debe servir al trabajo real de las personas, no al revés. También fundador de Nebbuler y Sokra.',
    tag: 'Fundador',
    linkedin: 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/',
  },
  {
    nombre: 'Valentina Reyes',
    rol: 'Directora de Aprendizaje',
    desc: 'Psicóloga con especialización en aprendizaje adulto y transformación digital. Lleva 8 años diseñando programas de formación para equipos en toda Latinoamérica.',
    tag: 'Educación',
    linkedin: null,
  },
  {
    nombre: 'Cristóbal Navarro',
    rol: 'Ingeniero de IA',
    desc: 'Ingeniero civil en computación. Especialista en automatización, grandes modelos de lenguaje e integración de IA en flujos de trabajo profesionales.',
    tag: 'Tecnología',
    linkedin: null,
  },
  {
    nombre: 'Roberto Altamirano',
    rol: 'Mentor Senior',
    desc: 'Contador con 22 años de trayectoria profesional. Reconvirtió su expertise hacia la IA aplicada a finanzas, auditoría y gestión. Prueba de que nunca es tarde para integrar la tecnología.',
    tag: 'Mentor',
    linkedin: null,
  },
]

const PORTFOLIO = [
  {
    nombre: 'Orbbi',
    url: 'orbbilatam.com',
    desc: 'Mentoría 1:1 en IA para profesionales de Latinoamérica.',
    activo: true,
  },
  {
    nombre: 'Nebbuler',
    url: 'nebbuler.com',
    desc: 'Plataforma para monetizar conocimiento experto. 0% comisión, suscriptores ilimitados.',
    activo: false,
  },
  {
    nombre: 'Sokra',
    url: 'sokraapp.com',
    desc: 'Preuniversitario online con IA socrática para la PAES 2026.',
    activo: false,
  },
]

export default function QuienesSomosSection() {
  return (
    <section id="nosotros" className="sec-light" style={{ padding:'144px 0' }}>
      <div className="page-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:80 }}
        >
          <p style={{ fontSize:13, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(15,14,13,0.4)', marginBottom:16 }}>
            Quiénes somos
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'end' }} className="nosotros-header-grid">
            <h2 style={{
              fontFamily:'"disp",Georgia,serif',
              fontSize:'clamp(36px,4vw,52px)',
              lineHeight:1.05, letterSpacing:'-0.03em',
              fontWeight:400, color:'#0F0E0D',
            }}>
              Un equipo que ya{' '}
              <em style={{ fontStyle:'italic', color:'#8F8B85' }}>recorrió el camino</em>{' '}
              que tú estás por iniciar.
            </h2>
            <div>
              <p style={{ fontSize:16, lineHeight:'26px', color:'rgba(15,14,13,0.55)', marginBottom:24 }}>
                Somos un equipo multidisciplinario de profesionales latinoamericanos especializados en inteligencia artificial aplicada. Nacimos desde la convicción de que la IA más poderosa no es la más sofisticada — es la que cada profesional logra integrar a su trabajo real.
              </p>
              <p style={{ fontSize:16, lineHeight:'26px', color:'rgba(15,14,13,0.55)' }}>
                Hoy acompañamos a profesionales en 12 países de Latinoamérica y hemos construido tres plataformas propias de tecnología educativa en la región.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Equipo */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:80 }} className="equipo-grid">
          {EQUIPO.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.7, delay:i*.07, ease:[0.16,1,0.3,1] }}
              style={{
                background:'#0F0E0D',
                borderRadius:12,
                padding:'36px 28px 32px',
                display:'flex', flexDirection:'column', gap:16,
                position:'relative', overflow:'hidden',
              }}
            >
              {/* Inicial como fondo */}
              <span style={{
                position:'absolute', bottom:-16, right:16,
                fontFamily:'"disp",Georgia,serif',
                fontSize:120, lineHeight:1,
                color:'rgba(250,250,249,0.04)',
                letterSpacing:'-0.05em',
                userSelect:'none', pointerEvents:'none',
              }}>
                {p.nombre.split(' ')[0][0]}{p.nombre.split(' ').slice(-1)[0][0]}
              </span>

              <div style={{ position:'relative', zIndex:1 }}>
                <span style={{
                  display:'inline-block',
                  fontSize:10, fontWeight:500, textTransform:'uppercase',
                  letterSpacing:'0.12em', color:'rgba(201,169,110,0.8)',
                  marginBottom:20,
                }}>
                  {p.tag}
                </span>

                {p.linkedin ? (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
                    <h3 style={{
                      fontFamily:'"disp",Georgia,serif',
                      fontSize:'clamp(18px,1.8vw,22px)',
                      lineHeight:1.1, letterSpacing:'-0.02em',
                      fontWeight:400, color:'#FAFAF9', marginBottom:6,
                    }}>
                      {p.nombre} ↗
                    </h3>
                  </a>
                ) : (
                  <h3 style={{
                    fontFamily:'"disp",Georgia,serif',
                    fontSize:'clamp(18px,1.8vw,22px)',
                    lineHeight:1.1, letterSpacing:'-0.02em',
                    fontWeight:400, color:'#FAFAF9', marginBottom:6,
                  }}>
                    {p.nombre}
                  </h3>
                )}

                <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(250,250,249,0.35)', marginBottom:20 }}>
                  {p.rol}
                </p>
                <p style={{ fontSize:13, lineHeight:'20px', color:'rgba(250,250,249,0.5)' }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portafolio */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ borderTop:'1px solid rgba(15,14,13,0.1)', paddingTop:56 }}
        >
          <p style={{ fontSize:13, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(15,14,13,0.4)', marginBottom:32 }}>
            Nuestro ecosistema
          </p>
          <div style={{ display:'flex', gap:32, flexWrap:'wrap' }} className="portfolio-list">
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                style={{
                  display:'flex', alignItems:'flex-start', gap:16,
                  padding:'20px 24px',
                  borderRadius:10,
                  border:'1px solid rgba(15,14,13,0.1)',
                  background: p.activo ? '#0F0E0D' : '#fff',
                  flex:'1', minWidth:200,
                }}
              >
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <span style={{
                      fontFamily:'"disp",Georgia,serif',
                      fontSize:18, fontWeight:400,
                      color: p.activo ? '#FAFAF9' : '#0F0E0D',
                      letterSpacing:'-0.02em',
                    }}>
                      {p.nombre}
                    </span>
                    {p.activo && (
                      <span style={{ fontSize:10, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(110,231,160,0.9)', background:'rgba(110,231,160,0.1)', borderRadius:100, padding:'2px 8px' }}>
                        Activo
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize:11, color: p.activo ? 'rgba(250,250,249,0.35)' : 'rgba(15,14,13,0.35)', marginBottom:6 }}>{p.url}</p>
                  <p style={{ fontSize:13, lineHeight:'18px', color: p.activo ? 'rgba(250,250,249,0.5)' : 'rgba(15,14,13,0.5)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
