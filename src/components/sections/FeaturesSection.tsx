'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Harvey's EXACT feature section:
   - Light background (#F5F4F0)
   - Left: small label "The top legal teams use Harvey for"
   - Center: big list of features, one ACTIVE (dark), rest muted gray
   - Right: "Explore Platform" button
   - As user scrolls the pinned section, active item advances
*/

const FEATURES = [
  'Formación en IA',
  'Orientación 1:1',
  'Herramientas a Medida',
  'Comunidad Activa',
  'Programas Corporativos',
  'Acompañamiento Continuo',
  'Diagnóstico Personalizado',
]

export default function FeaturesSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const pinRef      = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top top',
        end: `+=${FEATURES.length * 140}`,
        pin: pinRef.current!,
        scrub: false,
        snap: { snapTo: 1 / (FEATURES.length - 1), duration: 0.3, ease: 'power1.inOut' },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (FEATURES.length - 1))
          setActive(Math.min(idx, FEATURES.length - 1))
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    /* Outer wrapper — tall enough to scroll through features */
    <div ref={sectionRef} style={{ height: `${FEATURES.length * 140 + 100}vh` }}>

      {/* Pinned inner panel */}
      <div
        ref={pinRef}
        className="sec-paper"
        style={{ height: '100vh', display:'flex', alignItems:'center' }}
      >
        <div className="wrap" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'4rem' }}>

          {/* Left label — Harvey: "The top legal teams use Harvey for" */}
          <div style={{ flexShrink:0, maxWidth:'18rem' }}>
            <p style={{ fontSize:'1.4rem', lineHeight:1.6, color:'rgba(13,12,10,0.6)', fontWeight:300 }}>
              Las mejores profesionales de Latam confían en Orbbi para
            </p>
          </div>

          {/* Center: Feature list */}
          <div style={{ flex:1, padding:'0 4rem' }}>
            {FEATURES.map((f, i) => (
              <div
                key={f}
                className={`feat-item ${i === active ? 'feat-item-active' : 'feat-item-inactive'}`}
                style={{ display:'block' }}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Right: Explore button */}
          <div style={{ flexShrink:0 }}>
            <a href="/#contacto" className="btn-outline-d">
              Ver plataforma
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
