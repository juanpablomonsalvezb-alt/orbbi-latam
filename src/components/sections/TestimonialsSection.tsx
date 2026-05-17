'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const T = [
  {
    q: 'Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos.',
    n: 'María Fernanda Ríos', r: 'Directora Comercial', c: 'Colombia',
    img: '/images/pay-equity.jpg',
  },
  {
    q: 'Lo que más valoro es que el aprendizaje es 100% aplicado a mi trabajo. Mi consultora entendió mi sector desde el primer día.',
    n: 'Luciana Reyes', r: 'Docente Universitaria', c: 'Argentina',
    img: '/images/gender.png',
  },
  {
    q: 'En 6 semanas automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo real para hacer crecer mi empresa.',
    n: 'Camila Torres', r: 'Fundadora & CEO', c: 'Chile',
    img: '/images/restaurant.png',
  },
]

export default function TestimonialsSection() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % T.length), 7000)
    return () => clearInterval(id)
  }, [])

  const t = T[i]

  return (
    <section id="testimonios" className="section-paper">
      <div className="wrap">
        <p className="label" style={{ color: 'rgba(15,15,14,0.35)', marginBottom: '7rem' }}>
          Lo que dicen
        </p>

        {/* 50/50 layout — Harvey style */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5.6rem' }} className="l:grid-cols-2">

          {/* Left: photo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${i}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative', borderRadius: '1.6rem', overflow: 'hidden',
                aspectRatio: '4/5', background: '#0A0A0B',
              }}
            >
              <Image
                src={t.img} alt={t.n} fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="50vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,9,0.4) 0%,transparent 50%)' }} />
            </motion.div>
          </AnimatePresence>

          {/* Right: quote */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '4rem' }}>
            <div>
              <div style={{ fontFamily: '"disp"', fontSize: 'clamp(8rem,12vw,14rem)', lineHeight: 0.75, color: 'rgba(15,15,14,0.10)', marginBottom: '3rem', userSelect: 'none' }}>"</div>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`q-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: '"disp",Georgia,serif',
                    fontSize: 'clamp(2.6rem,3.2vw,4.4rem)',
                    lineHeight: 1.38, letterSpacing: '-0.015em',
                    fontStyle: 'italic', color: '#0F0F0E',
                  }}
                >
                  {t.q}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div key={`n-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#0F0F0E', marginBottom: '.4rem' }}>{t.n}</p>
                  <p style={{ fontSize: '1.3rem', color: 'rgba(15,15,14,0.45)' }}>{t.r} · {t.c}</p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', marginTop: '4rem', paddingTop: '3.2rem', borderTop: '1px solid rgba(15,15,14,0.09)' }}>
                {T.map((_, j) => (
                  <button key={j} onClick={() => setI(j)} style={{ width: j===i?28:8, height:8, borderRadius:4, background: j===i?'#0F0F0E':'rgba(15,15,14,0.2)', border:'none', transition:'width .4s,background .4s', cursor:'none' }} />
                ))}
                <div style={{ display:'flex',gap:'1rem',marginLeft:'auto' }}>
                  {[{l:'←',fn:()=>setI(v=>(v-1+T.length)%T.length)},{l:'→',fn:()=>setI(v=>(v+1)%T.length)}].map(b=>(
                    <button key={b.l} onClick={b.fn} style={{ width:'4rem',height:'4rem',borderRadius:'50%',border:'1px solid rgba(15,15,14,0.2)',background:'transparent',color:'rgba(15,15,14,0.45)',cursor:'none',transition:'all .3s',display:'flex',alignItems:'center',justifyContent:'center' }}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='#0F0F0E';el.style.color='#0F0F0E'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(15,15,14,0.2)';el.style.color='rgba(15,15,14,0.45)'}}
                    >{b.l}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
