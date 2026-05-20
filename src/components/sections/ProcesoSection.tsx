'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { n:'01', title:'Conversamos', body:'Cuéntanos tu caso por el formulario. Entendemos quién eres, qué haces y qué quieres lograr con IA — aplicado exactamente a tu trabajo.', time:'Diagnóstico · 30 min · Gratis' },
  { n:'02', title:'Diseñamos',   body:'Construimos tu ruta de aprendizaje personalizada. Solo lo que necesitas, en el orden correcto, aplicado a tu realidad.', time:'Plan en 48 horas' },
  { n:'03', title:'Aprendemos',  body:'Sesiones 1:1 online, a tu ritmo. Ejercicios reales de tu trabajo. Tu mentor te acompaña en cada paso, sin dejarte solo.', time:'Sesiones semanales' },
  { n:'04', title:'Aplicamos',   body:'Medimos resultados concretos. Ajustamos lo que necesitas. El objetivo es que la IA trabaje para ti — de forma sostenida.', time:'Seguimiento continuo' },
]

export default function ProcesoSection() {
  return (
    <section id="como-funciona" className="sec-dark sec-pad">
      <div className="page-wrap">

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:80 }}
        >
          <p style={{ fontSize:14, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(250,250,249,0.35)', marginBottom:16 }}>Cómo funciona</p>
          <h2 className="t-h3" style={{ color:'rgba(250,250,249,0.5)', maxWidth:640 }}>
            Tu mentoría,{' '}
            <em style={{ fontFamily:'"disp",Georgia,serif', fontStyle:'italic', color:'#FAFAF9', fontWeight:400 }}>
              paso a paso
            </em>
            {'. '}100% online.
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }} className="proceso-grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.7, delay:i*.1, ease:[0.16,1,0.3,1] }}
              style={{
                padding:'40px 32px',
                borderLeft: i > 0 ? '1px solid rgba(250,250,249,0.08)' : undefined,
                borderTop: '1px solid rgba(250,250,249,0.08)',
                display:'flex', flexDirection:'column', gap:20,
              }}
            >
              <span style={{
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(56px,6vw,96px)',
                lineHeight:1,
                color:'rgba(250,250,249,0.06)',
                letterSpacing:'-0.03em',
              }}>{s.n}</span>
              <h3 style={{
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(22px,2vw,32px)',
                lineHeight:1.15,
                letterSpacing:'-0.02em',
                fontWeight:400,
                color:'#FAFAF9',
              }}>{s.title}</h3>
              <p style={{ fontSize:14, lineHeight:'20px', color:'rgba(250,250,249,0.5)', flex:1 }}>{s.body}</p>
              <span style={{
                fontSize:12, fontWeight:500, textTransform:'uppercase',
                letterSpacing:'0.12em', color:'rgba(250,250,249,0.3)',
              }}>{s.time}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, delay:.2, ease:[0.16,1,0.3,1] }}
          style={{
            borderTop:'1px solid rgba(250,250,249,0.08)',
            marginTop:0,
            paddingTop:48,
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24,
          }}
        >
          <p style={{
            fontFamily:'"disp",Georgia,serif',
            fontSize:'clamp(28px,3vw,40px)',
            lineHeight:1.1,
            letterSpacing:'-0.02em',
            fontWeight:400,
            color:'rgba(250,250,249,0.5)',
          }}>
            El diagnóstico es gratis — 30 min para entender tu caso y diseñar tu plan.
          </p>
          <a href="/agendar" className="btn-hero">
            Agendar diagnóstico gratis
          </a>
        </motion.div>

      </div>
    </section>
  )
}
