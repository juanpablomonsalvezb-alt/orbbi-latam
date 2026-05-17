'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

/* Harvey metrics section — EXACT layout from screenshot:
   - bg: #0F0E0D, pt 144px pb 144px
   - Header: "Helping teams stay focused and see measurable results" H3 36px weight 500
   - Each row: [label 20px left] --- horizontal rule --- [number 80px right]
   - Numbers: 80px (same as H1!), ls -1px, weight 400, white
   - Labels: 20px, lh 26px, weight 400, white
   - Each row separated by thin rule
*/

const METRICS = [
  { label:'Horas ahorradas por alumna al mes',        num:'20+' },
  { label:'Mujeres formadas en Latinoamérica',        num:'847+' },
  { label:'Países de cobertura activa',               num:'12' },
  { label:'Tasa de satisfacción al finalizar',        num:'94%' },
  { label:'Sectores profesionales cubiertos',         num:'18+' },
]

export default function StatsSection() {
  return (
    <section className="sec-dark sec-pad-sm" id="numeros">
      <div className="page-wrap">

        {/* Harvey: italic serif heading */}
        <motion.h3
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          className="t-h3"
          style={{ color:'rgba(250,250,249,0.5)', marginBottom:80 }}
        >
          Ayudamos a las mejores profesionales a obtener{' '}
          <em style={{ fontFamily:'"disp",Georgia,serif', fontStyle:'italic', color:'#FAFAF9', fontWeight:400 }}>
            resultados medibles
          </em>
        </motion.h3>

        {/* Harvey: rows of label | number separated by rules */}
        <div>
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.5, delay:i*.06 }}
            >
              <div className="rule-dark" />
              <div style={{
                display:'flex', alignItems:'baseline', justifyContent:'space-between',
                padding:'28px 0', gap:40,
              }}>
                {/* Label — left, 20px */}
                <p className="t-body-lg" style={{ color:'rgba(250,250,249,0.7)', maxWidth:480 }}>
                  {m.label}
                </p>
                {/* Number — right, 80px serif */}
                <p className="t-metric" style={{ flexShrink:0, textAlign:'right' }}>
                  {m.num}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="rule-dark" />
        </div>

      </div>
    </section>
  )
}
