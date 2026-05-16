'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const T = [
  {
    quote: 'Pasé de temer la IA a usarla todos los días. En tres semanas automaticé lo que antes me tomaba dos días completos de trabajo.',
    name: 'María Fernanda Ríos', role: 'Directora Comercial', country: 'Colombia',
  },
  {
    quote: 'Lo que más valoro es que el aprendizaje es 100% aplicado a mi trabajo real, no a ejemplos genéricos. Mi consultora entendió mi sector desde el primer día.',
    name: 'Luciana Reyes', role: 'Docente Universitaria', country: 'Argentina',
  },
  {
    quote: 'En 6 semanas automaticé el 40% de mis tareas administrativas. Ahora tengo tiempo para hacer lo que realmente importa: hacer crecer mi empresa.',
    name: 'Camila Torres', role: 'Fundadora & CEO', country: 'Chile',
  },
  {
    quote: 'Tenía miedo de quedarme atrás tecnológicamente. Orbbi me demostró que la experiencia acumulada es una ventaja enorme cuando se combina con IA.',
    name: 'Patricia Vidal', role: 'Abogada Senior', country: 'México',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [idx, setIdx] = useState(0)
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setIdx(v => (v + 1) % T.length), 6000)
    return () => clearInterval(id)
  }, [])

  /* Fade quote on change */
  useEffect(() => {
    if (!quoteRef.current) return
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }, [idx])

  const t = T[idx]

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="section"
      style={{ background: 'rgba(15,15,22,0.97)', opacity: 0 }}
    >
      <div className="wrap">

        <div className="flex flex-col s:flex-row s:items-start s:justify-between gap-40 s:gap-80">

          {/* Left label */}
          <div className="s:w-[24rem] shrink-0 flex s:flex-col items-start justify-between gap-24 s:gap-0 s:pt-12">
            <p className="t-tag">Testimonios</p>
            <div className="flex items-center gap-12 s:mt-auto">
              {T.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 32 : 8, height: 8, borderRadius: 4,
                    background: i === idx ? '#C9A96E' : 'rgba(201,169,110,0.2)',
                    border: 'none', transition: 'width 0.4s, background 0.4s', cursor: 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="flex-1">
            {/* Opening quote mark */}
            <div
              aria-hidden
              style={{
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(6rem,10vw,14rem)',
                lineHeight:0.7,
                color:'rgba(201,169,110,0.10)',
                marginBottom:'1.6rem',
                userSelect:'none',
              }}
            >
              "
            </div>

            <blockquote
              ref={quoteRef}
              style={{
                fontFamily:'"disp",Georgia,serif',
                fontSize:'clamp(2rem,2.8vw,3.6rem)',
                lineHeight:1.4,
                color:'#F2EDE4',
                fontStyle:'italic',
                letterSpacing:'-0.01em',
                marginBottom:'4rem',
              }}
            >
              {t.quote}
            </blockquote>

            <div className="flex items-center gap-16">
              <div
                style={{
                  width:40, height:40, borderRadius:'50%',
                  background:'linear-gradient(135deg,#C9A96E,#8B6914)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.6rem', fontWeight:500, color:'#09090E',
                  flexShrink:0,
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <p style={{ fontSize:'1.4rem', color:'#F2EDE4', fontWeight:500 }}>{t.name}</p>
                <p className="t-small">{t.role} · {t.country}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
