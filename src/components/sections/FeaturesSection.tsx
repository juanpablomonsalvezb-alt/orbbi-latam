'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Harvey UseCaseTickerSection — exact behavior:
   - bg: #FAFAF9
   - Label left: "The top legal teams use Harvey for" (small sans, dark)
   - Center: 56px serif list, OPACITY fades by distance from active
     active=opacity:1 color:#0F0E0D, ±1=opacity:0.6, ±2=opacity:0.3, ±3=opacity:0.1
   - Right: "Explore Platform" outlined button
   - SCROLL DRIVEN: section is very tall, content is pinned
*/

const FEATURES = [
  'Formación Esencial',
  'Orientación 1:1',
  'Herramientas a Medida',
  'Diagnóstico IA',
  'Programas Corporativos',
  'Comunidad Activa',
  'Acompañamiento Real',
]

const OPACITIES = [0.1, 0.3, 0.6, 1.0, 0.6, 0.3, 0.1]

export default function FeaturesSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(3) // middle item starts active

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current!,
        start: 'top top',
        end: `+=${FEATURES.length * 200}`,
        pin: innerRef.current!,
        onUpdate(self) {
          const idx = Math.round(self.progress * (FEATURES.length - 1))
          setActive(Math.min(idx, FEATURES.length - 1))
        },
      })
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height:`${FEATURES.length * 200 + 100}vh` }}>
      <div
        ref={innerRef}
        className="sec-light"
        style={{ height:'100vh', display:'flex', alignItems:'center' }}
      >
        <div className="page-wrap" style={{ width:'100%', display:'grid', gridTemplateColumns:'1fr 2fr 1fr', alignItems:'center', gap:40 }}>

          {/* Left: Harvey's "The top legal teams use Harvey for" */}
          <p className="t-body" style={{ color:'#0F0E0D', maxWidth:200 }}>
            Las mejores profesionales de Latam confían en Orbbi para
          </p>

          {/* Center: feature list with opacity fading */}
          <div>
            {FEATURES.map((f, i) => {
              const dist   = Math.abs(i - active)
              const op     = dist === 0 ? 1 : dist === 1 ? 0.6 : dist === 2 ? 0.3 : 0.1
              const isActive = i === active
              return (
                <div
                  key={f}
                  className="feature-item"
                  style={{
                    fontFamily:'"disp",Georgia,serif',
                    fontSize:56, lineHeight:'58.8px', letterSpacing:'-0.56px', fontWeight:400,
                    color: isActive ? '#0F0E0D' : '#706D66',
                    opacity: op,
                    transition:'opacity .4s, color .4s',
                    cursor:'none',
                    userSelect:'none',
                  }}
                >
                  {f}
                </div>
              )
            })}
          </div>

          {/* Right: Explore Platform button */}
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <a href="/#contacto" className="btn-explore">
              Ver plataforma
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
