'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { n:'01', title:'Diagnóstico', body:'Entendemos tu contexto real: qué haces, cuánto tiempo pierdes y qué resultados quieres lograr con IA.', time:'1 sesión · 60 min' },
  { n:'02', title:'Diseño',      body:'Creamos tu mapa personalizado de herramientas. No te enseñamos todo — te enseñamos exactamente lo que necesitas.', time:'1 semana' },
  { n:'03', title:'Formación',   body:'Aprendes con ejercicios reales de tu trabajo. Acompañamiento permanente. Sin teoría vacía, sin contenido genérico.', time:'4 a 8 semanas' },
  { n:'04', title:'Seguimiento', body:'Revisamos resultados, ajustamos herramientas y aseguramos que el cambio sea real y duradero.', time:'30 días post-programa' },
]

export default function ProcesoSection() {
  return (
    <section id="metodo" className="section" style={{ background:'#EDEAE3' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.9, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:'8rem' }}
        >
          <p className="t-tag" style={{ marginBottom:'1.6rem' }}>Método</p>
          <h2 className="t-h2" style={{ maxWidth:'56rem' }}>
            Un proceso claro,{' '}
            <em style={{ fontStyle:'italic', color:'#B8924A' }}>sin atajos</em>,
            {' '}con resultados reales.
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'0' }} className="s:grid-cols-4">
          {STEPS.map((s,i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.7, delay:i*.12, ease:[0.16,1,0.3,1] }}
              style={{
                padding:'4rem 3.2rem',
                borderLeft: i>0?'1px solid rgba(28,28,26,0.08)':undefined,
                borderTop:'1px solid rgba(28,28,26,0.08)',
                background:'#F7F3EE',
                display:'flex', flexDirection:'column', gap:'1.6rem',
              }}
            >
              <span style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(4rem,5vw,7.2rem)', lineHeight:1, color:'rgba(30,58,47,0.1)', letterSpacing:'-0.02em' }}>{s.n}</span>
              <h3 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.2vw,2.8rem)', lineHeight:1.2, color:'#1C1C1A', letterSpacing:'-0.01em' }}>{s.title}</h3>
              <p className="t-body" style={{ fontSize:'1.3rem' }}>{s.body}</p>
              <span style={{ fontSize:'1.1rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'.14em', color:'#B8924A' }}>{s.time}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', flexDirection:'column', gap:'2rem', marginTop:'6rem', alignItems:'flex-start' }}
          className="s:flex-row s:items-center"
        >
          <p style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.5vw,3rem)', color:'#1C1C1A', lineHeight:1.2 }}>¿Lista para empezar?</p>
          <a href="/#contacto" className="btn-primary">
            Agenda tu diagnóstico gratuito
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
