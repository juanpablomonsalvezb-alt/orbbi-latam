'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', title: 'Diagnóstico',  body: 'Entendemos tu contexto real. Qué haces, cuánto tiempo pierdes en tareas repetitivas y qué resultados quieres lograr. Una sesión de 60 minutos que lo define todo.', time: '1 sesión · 60 min' },
  { n: '02', title: 'Diseño',       body: 'Creamos tu mapa personalizado de herramientas. No te enseñamos todo lo que existe — te enseñamos exactamente lo que tú necesitas.', time: '1 semana' },
  { n: '03', title: 'Formación',    body: 'Aprendes con ejercicios reales de tu trabajo. Acompañamiento permanente de tu consultora. Sin teoría vacía, sin contenido genérico.', time: '4 a 8 semanas' },
  { n: '04', title: 'Seguimiento',  body: 'Revisamos resultados, ajustamos herramientas y aseguramos que el cambio sea real y duradero. No terminamos cuando termina el programa.', time: '30 días post-programa' },
]

export default function ProcesoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(stepsRef.current?.children ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="section"
      style={{ background: 'rgba(9,9,14,0.98)' }}
    >
      <div className="wrap">

        {/* Header */}
        <div ref={headerRef} className="mb-80 s:mb-120" style={{ opacity: 0 }}>
          <p className="t-tag mb-20">Método</p>
          <h2 className="t-h2" style={{ maxWidth: '56rem' }}>
            Un proceso claro,{' '}
            <em className="t-italic t-gold">sin atajos</em>,{' '}
            con resultados reales.
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="flex flex-col s:grid s:grid-cols-4 gap-0 s:gap-32">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex flex-row s:flex-col gap-24 s:gap-20 py-40 s:py-0"
              style={{
                borderTop: '1px solid rgba(201,169,110,0.08)',
                ...(i === STEPS.length - 1 ? { borderBottom: '1px solid rgba(201,169,110,0.08)' } : {}),
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(3.6rem,5vw,6.4rem)',
                  lineHeight:1, flexShrink:0,
                  color:'rgba(201,169,110,0.12)',
                  letterSpacing:'-0.02em',
                }}
              >
                {s.n}
              </span>

              <div className="flex flex-col gap-12 s:mt-auto s:pt-40">
                <h3
                  style={{
                    fontFamily:'"disp",Georgia,serif',
                    fontSize:'clamp(2rem,2.4vw,2.8rem)',
                    lineHeight:1.2, color:'#F2EDE4', letterSpacing:'-0.01em',
                  }}
                >
                  {s.title}
                </h3>
                <p className="t-body" style={{ fontSize:'1.3rem' }}>{s.body}</p>
                <span
                  className="t-tag mt-8"
                  style={{ color:'rgba(201,169,110,0.45)', fontSize:'1.0rem' }}
                >
                  {s.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col s:flex-row items-start s:items-center gap-24 mt-80 s:mt-100">
          <p style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.5vw,3rem)', color:'#F2EDE4', lineHeight:1.2 }}>
            ¿Lista para empezar?
          </p>
          <a href="/#contacto" className="btn-primary">
            Agenda tu diagnóstico gratuito
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
