'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const T = [
  { q:'Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos.', n:'María Fernanda Ríos', r:'Directora Comercial', c:'Colombia' },
  { q:'Lo que más valoro es que el aprendizaje es 100% aplicado a mi trabajo real. Mi consultora entendió mi sector desde el primer día.', n:'Luciana Reyes', r:'Docente Universitaria', c:'Argentina' },
  { q:'En 6 semanas automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo para hacer crecer mi empresa.', n:'Camila Torres', r:'Fundadora & CEO', c:'Chile' },
  { q:'Tenía miedo de quedarme atrás. Orbbi me demostró que mi experiencia es una ventaja enorme cuando se combina con IA.', n:'Patricia Vidal', r:'Abogada Senior', c:'México' },
]

export default function TestimonialsSection() {
  const [i, setI] = useState(0)
  useEffect(()=>{ const id=setInterval(()=>setI(v=>(v+1)%T.length),6500); return ()=>clearInterval(id) },[])
  const t = T[i]

  return (
    <section id="testimonios" style={{ background:'#F0EBE3', padding:'12rem 0' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'6rem' }} className="l:grid-cols-[28rem_1fr]">

          {/* Left */}
          <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between',gap:'4rem' }}>
            <p className="label">Lo que dicen</p>
            <div style={{ display:'flex',flexDirection:'column',gap:'2rem' }}>
              <div style={{ display:'flex',gap:'1rem' }}>
                {T.map((_,j)=>(
                  <button key={j} onClick={()=>setI(j)} style={{ width:j===i?28:8,height:8,borderRadius:4,background:j===i?'#1A3328':'rgba(17,17,16,0.18)',border:'none',transition:'width .4s,background .4s',cursor:'none' }} />
                ))}
              </div>
              <div style={{ display:'flex',gap:'1.2rem' }}>
                {[{label:'←',fn:()=>setI(v=>(v-1+T.length)%T.length)},{label:'→',fn:()=>setI(v=>(v+1)%T.length)}].map(b=>(
                  <button key={b.label} onClick={b.fn} style={{ width:'4.4rem',height:'4.4rem',borderRadius:'50%',border:'1px solid rgba(17,17,16,0.18)',background:'transparent',color:'rgba(17,17,16,0.45)',cursor:'none',transition:'border-color .3s,color .3s',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#1A3328';(e.currentTarget as HTMLElement).style.color='#1A3328'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(17,17,16,0.18)';(e.currentTarget as HTMLElement).style.color='rgba(17,17,16,0.45)'}}
                  >{b.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quote */}
          <div>
            <div style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(8rem,14vw,18rem)',lineHeight:.75,color:'rgba(26,51,40,0.12)',marginBottom:'2rem',userSelect:'none' }}>"</div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.5,ease:[0.16,1,0.3,1]}}>
                <blockquote style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(2.4rem,3.2vw,4.4rem)',lineHeight:1.38,color:'#111110',fontStyle:'italic',letterSpacing:'-0.015em',marginBottom:'4rem' }}>
                  {t.q}
                </blockquote>
                <div style={{ display:'flex',alignItems:'center',gap:'1.6rem' }}>
                  <div style={{ width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#C9A96E,#8B6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',fontWeight:500,color:'#FAFAF8',flexShrink:0 }}>{t.n[0]}</div>
                  <div>
                    <p style={{ fontSize:'1.4rem',fontWeight:500,color:'#111110' }}>{t.n}</p>
                    <p className="small">{t.r} · {t.c}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
