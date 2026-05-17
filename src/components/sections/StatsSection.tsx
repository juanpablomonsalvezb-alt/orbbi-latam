'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

/* Harvey EXACT metrics layout:
   - Dark background
   - Header: italic serif "...measurable results"
   - Each row: [label LEFT] [huge number RIGHT]
   - Thin horizontal rule between rows
*/

const METRICS = [
  { label: 'Horas ahorradas por alumna al mes',          val: 20,   suffix: '+',    display: '20+' },
  { label: 'Mujeres formadas en toda Latinoamérica',     val: 847,  suffix: '+',    display: '847+' },
  { label: 'Países de cobertura activa',                 val: 12,   suffix: '',     display: '12' },
  { label: 'Tasa de satisfacción al finalizar',          val: 94,   suffix: '%',    display: '94%' },
  { label: 'Sectores profesionales cubiertos',           val: 18,   suffix: '+',    display: '18+' },
]

function AnimNum({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: target, duration: 2, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix },
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    })
  }, [target, suffix])
  return <span ref={ref}>0</span>
}

export default function StatsSection() {
  return (
    <section className="sec-dark" style={{ padding:'8rem 0' }}>
      <div className="wrap">

        {/* Harvey header: italic serif + "measurable results" */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:'6rem' }}
        >
          <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2.8rem,4vw,5.6rem)', fontWeight:'normal', letterSpacing:'-.025em', lineHeight:1.1, color:'rgba(255,255,255,0.5)' }}>
            Ayudamos a las mejores profesionales a <br/>
            <em style={{ fontStyle:'italic', color:'#FFFFFF' }}>obtener resultados medibles</em>
          </h2>
        </motion.div>

        {/* Metric rows — Harvey two-column: label left, number right */}
        <div>
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.6, delay: i * 0.05 }}
              style={{
                display:'flex', alignItems:'baseline', justifyContent:'space-between',
                padding:'3.2rem 0',
                borderTop:'1px solid rgba(255,255,255,0.1)',
                ...(i === METRICS.length-1 ? { borderBottom:'1px solid rgba(255,255,255,0.1)' } : {}),
                gap:'4rem',
              }}
            >
              {/* Label — left, small */}
              <p style={{ fontSize:'1.5rem', color:'rgba(255,255,255,0.55)', maxWidth:'44rem', lineHeight:1.5 }}>
                {m.label}
              </p>
              {/* Number — right, ENORMOUS */}
              <p className="metric-num" style={{ flexShrink:0, textAlign:'right' }}>
                <AnimNum target={m.val} suffix={m.suffix} />
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
