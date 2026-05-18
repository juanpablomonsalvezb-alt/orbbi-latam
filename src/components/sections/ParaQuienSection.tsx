'use client'
import { motion } from 'framer-motion'

const PATHS = [
  {
    tag: 'Tu dimensión personal',
    title: 'Quiero aprender IA',
    desc: 'Curiosidad, ganas de entender este mundo nuevo o necesidad de no quedarte atrás. Sea cual sea tu punto de partida, te acompañamos a dominar las herramientas de IA más importantes — a tu ritmo, con un mentor real, 100% online.',
    items: ['ChatGPT, Claude y Gemini en profundidad', 'Generación de imágenes y video con IA', 'Automatización sin código', 'Productividad personal con IA', 'IA para investigación y escritura'],
    cta: 'Quiero aprender IA →',
  },
  {
    tag: 'Tu dimensión profesional',
    title: 'IA aplicada a mi trabajo',
    desc: 'Ya sea porque lo demanda tu sector, porque quieres destacar en tu carrera o porque tienes un programa específico en mente — diseñamos tu mentoría exactamente para ti. Sin contenido genérico. Solo lo que necesitas para tu profesión.',
    items: ['Diagnóstico de tu flujo de trabajo real', 'Herramientas IA para tu industria específica', 'Programa a pedido: tú defines qué aprender', 'Acompañamiento personalizado sesión a sesión', 'Resultados concretos en semanas'],
    cta: 'Quiero aplicarlo a mi trabajo →',
  },
]

export default function ParaQuienSection() {
  return (
    <section id="para-quien" className="sec-testi sec-pad" style={{ background:'#FAFAF9' }}>
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
            <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,4vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', maxWidth:600 }}>
              Dos dimensiones,{' '}
              <em style={{ fontStyle:'italic', color:'#706D66' }}>una sola persona:</em>
              {' '}tú.
            </h2>
          </div>
          <a href="/#contacto" className="btn-explore" style={{ flexShrink:0 }}>
            Hablar con nosotros
          </a>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }} className="paths-grid">
          {PATHS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:.8, delay:i*0.1, ease:[0.16,1,0.3,1] }}
              style={{
                background:'#0F0E0D',
                borderRadius:16,
                padding:'48px 48px 40px',
                display:'flex',
                flexDirection:'column',
                gap:32,
                position:'relative',
                overflow:'hidden',
              }}
            >
              {/* Número como marca de agua */}
              <span style={{
                position:'absolute',
                top:-20,
                right:32,
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(120px,14vw,180px)',
                lineHeight:1,
                color:'rgba(250,250,249,0.04)',
                letterSpacing:'-0.05em',
                userSelect:'none',
                pointerEvents:'none',
              }}>{i + 1}</span>

              <div style={{ position:'relative', zIndex:1 }}>
                <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(250,250,249,0.35)', marginBottom:20 }}>{p.tag}</p>
                <h3 style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(32px,3.5vw,48px)',
                  lineHeight:1.05,
                  letterSpacing:'-0.03em',
                  fontWeight:400,
                  color:'#FAFAF9',
                  marginBottom:20,
                }}>{p.title}</h3>
                <p style={{ fontSize:16, lineHeight:'24px', color:'rgba(250,250,249,0.55)', maxWidth:460 }}>{p.desc}</p>
              </div>

              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10, position:'relative', zIndex:1 }}>
                {p.items.map((item, j) => (
                  <li key={j} style={{ fontSize:14, color:'rgba(250,250,249,0.7)', display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:18, color:'rgba(250,250,249,0.3)', lineHeight:1 }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/#contacto"
                style={{
                  position:'relative', zIndex:1,
                  alignSelf:'flex-start',
                  fontSize:14, fontWeight:500,
                  color:'rgba(250,250,249,0.7)',
                  cursor:'pointer',
                  transition:'color .2s',
                  textDecoration:'none',
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.7)')}
              >{p.cta}</a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
