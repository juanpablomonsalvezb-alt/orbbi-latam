'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const T = [
  { quote:'Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos de trabajo.', name:'María Fernanda Ríos', role:'Directora Comercial', country:'Colombia', color:'#B8924A' },
  { quote:'Lo que más valoro es que el aprendizaje es 100% aplicado a mi trabajo real, no a ejemplos genéricos. Mi consultora entendió mi sector desde el primer día.', name:'Luciana Reyes', role:'Docente Universitaria', country:'Argentina', color:'#1E3A2F' },
  { quote:'En 6 semanas automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo para hacer lo que realmente importa.', name:'Camila Torres', role:'Fundadora & CEO', country:'Chile', color:'#B8924A' },
  { quote:'Tenía miedo de quedarme atrás tecnológicamente. Orbbi me demostró que la experiencia acumulada es una ventaja enorme cuando se combina con IA.', name:'Patricia Vidal', role:'Abogada Senior', country:'México', color:'#1E3A2F' },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(v => (v + 1) % T.length), 6000)
    return () => clearInterval(id)
  }, [])

  const t = T[idx]

  return (
    <section id="testimonios" className="section" style={{ background:'#1E3A2F', overflow:'hidden' }}>
      <div className="wrap">
        <div style={{ display:'flex', flexDirection:'column', gap:'6rem' }} className="s:flex-row s:items-start s:justify-between">

          {/* Label + nav */}
          <div style={{ display:'flex', flexDirection:'column', gap:'4rem', flexShrink:0 }}>
            <p className="t-tag" style={{ color:'rgba(247,243,238,0.45)' }}>Testimonios</p>

            <div style={{ display:'flex', gap:'1.2rem' }}>
              {T.map((_,i) => (
                <button key={i} onClick={() => setIdx(i)}
                  style={{ width:i===idx?32:8, height:8, borderRadius:4, background:i===idx?'#D4AD70':'rgba(247,243,238,0.2)', border:'none', transition:'width .4s,background .4s', cursor:'none' }}
                />
              ))}
            </div>

            <div style={{ display:'flex', gap:'1.2rem' }}>
              <button onClick={()=>setIdx(v=>(v-1+T.length)%T.length)} style={{ width:'4.4rem',height:'4.4rem',borderRadius:'50%',border:'1px solid rgba(247,243,238,0.2)',background:'transparent',color:'rgba(247,243,238,0.5)',cursor:'none',transition:'border-color .3s,color .3s',display:'flex',alignItems:'center',justifyContent:'center' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#D4AD70';(e.currentTarget as HTMLElement).style.color='#D4AD70'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(247,243,238,0.2)';(e.currentTarget as HTMLElement).style.color='rgba(247,243,238,0.5)'}}
              >←</button>
              <button onClick={()=>setIdx(v=>(v+1)%T.length)} style={{ width:'4.4rem',height:'4.4rem',borderRadius:'50%',border:'1px solid rgba(247,243,238,0.2)',background:'transparent',color:'rgba(247,243,238,0.5)',cursor:'none',transition:'border-color .3s,color .3s',display:'flex',alignItems:'center',justifyContent:'center' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#D4AD70';(e.currentTarget as HTMLElement).style.color='#D4AD70'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(247,243,238,0.2)';(e.currentTarget as HTMLElement).style.color='rgba(247,243,238,0.5)'}}
              >→</button>
            </div>
          </div>

          {/* Quote */}
          <div style={{ flex:1, maxWidth:'76rem' }}>
            <div style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(7rem,12vw,16rem)', lineHeight:.8, color:'rgba(212,173,112,0.15)', marginBottom:'2.4rem', userSelect:'none' }}>"</div>
            <AnimatePresence mode="wait">
              <motion.div key={idx}
                initial={{ opacity:0, y:24 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-16 }}
                transition={{ duration:.5, ease:[0.16,1,0.3,1] }}
              >
                <blockquote style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2.2rem,3vw,4rem)', lineHeight:1.4, color:'#F7F3EE', fontStyle:'italic', letterSpacing:'-0.01em', marginBottom:'4rem' }}>
                  {t.quote}
                </blockquote>
                <div style={{ display:'flex', alignItems:'center', gap:'1.6rem' }}>
                  <div style={{ width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#D4AD70,#B8924A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',fontWeight:500,color:'#1E3A2F',flexShrink:0 }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontSize:'1.4rem',fontWeight:500,color:'#F7F3EE' }}>{t.name}</p>
                    <p style={{ fontSize:'1.2rem',color:'rgba(247,243,238,0.45)' }}>{t.role} · {t.country}</p>
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
