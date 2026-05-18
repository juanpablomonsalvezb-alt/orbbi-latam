'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { n:'01', title:'Diagnóstico', body:'Entendemos tu contexto real: qué haces, cuánto tiempo pierdes y qué resultados concretos quieres lograr con IA.', time:'1 sesión · 60 min' },
  { n:'02', title:'Diseño',      body:'Creamos tu mapa personalizado de herramientas. No te enseñamos todo — te enseñamos exactamente lo que necesitas.', time:'1 semana' },
  { n:'03', title:'Formación',   body:'Aprendes con ejercicios reales de tu trabajo. Acompañamiento permanente. Sin teoría vacía, sin contenido genérico.', time:'4 a 8 semanas' },
  { n:'04', title:'Seguimiento', body:'Revisamos resultados, ajustamos herramientas y aseguramos que el cambio sea real, sostenido y duradero.', time:'30 días post-programa' },
]

export default function ProcesoSection() {
  return (
    <section id="metodo" className="sec-dark sec-pad">
      <div className="page-wrap">

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:80 }}
        >
          <p style={{ fontSize:14, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(250,250,249,0.35)', marginBottom:16 }}>Método</p>
          <h2 className="t-h3" style={{ color:'rgba(250,250,249,0.5)', maxWidth:640 }}>
            Un proceso claro,{' '}
            <em style={{ fontFamily:'"disp",Georgia,serif', fontStyle:'italic', color:'#FAFAF9', fontWeight:400 }}>
              sin atajos
            </em>
            {', '}con resultados reales.
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
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
            ¿Listo/a para empezar?
          </p>
          <a href="/#contacto" className="btn-hero">
            Agenda tu diagnóstico gratuito
          </a>
        </motion.div>

      </div>
    </section>
  )
}
