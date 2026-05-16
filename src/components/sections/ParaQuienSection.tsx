'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROFILES = [
  { role: 'Ejecutiva & Directiva',       desc: 'Decisiones más rápidas y fundamentadas. La IA te da ventaja competitiva inmediata.' },
  { role: 'Emprendedora',                desc: 'Automatiza operaciones y escala sin contratar más. Tu capacidad de ejecución se multiplica.' },
  { role: 'Docente & Educadora',         desc: 'Diseña experiencias de aprendizaje más impactantes. La IA transforma cómo enseñas.' },
  { role: 'Consultora independiente',    desc: 'Diferénciate y entrega proyectos más rápido. La IA es tu ventaja competitiva real.' },
  { role: 'Profesional de salud',        desc: 'Menos carga administrativa, más tiempo para las personas que necesitan tu atención.' },
  { role: 'Abogada & Contadora',         desc: 'Automatiza análisis repetitivos y entrega más valor a tus clientes en menos tiempo.' },
]

export default function ParaQuienSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const rowsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(rowsRef.current?.children ?? [],
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: rowsRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="para-quien"
      ref={sectionRef}
      className="section"
      style={{ background: 'rgba(15,15,22,0.97)' }}
    >
      <div className="wrap">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-80 s:mb-100"
          style={{ opacity: 0 }}
        >
          <p className="t-tag mb-20">Para quién</p>
          <h2 className="t-h2" style={{ maxWidth: '60rem' }}>
            Para mujeres que ya{' '}
            <em className="t-italic t-gold">dominan</em>
            {' '}su campo y quieren ir más lejos.
          </h2>
        </div>

        {/* Profile list */}
        <div ref={rowsRef} className="flex flex-col">
          {PROFILES.map((p, i) => (
            <div
              key={i}
              className="flex flex-col s:flex-row s:items-baseline s:justify-between gap-12 s:gap-40 py-32 s:py-36"
              style={{
                borderTop: '1px solid rgba(201,169,110,0.07)',
                ...(i === PROFILES.length - 1 ? { borderBottom: '1px solid rgba(201,169,110,0.07)' } : {}),
              }}
            >
              <h3
                style={{
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 'clamp(2.2rem, 2.8vw, 3.6rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: '#F2EDE4',
                  minWidth: '30rem',
                  flexShrink: 0,
                }}
              >
                {p.role}
              </h3>
              <p className="t-body" style={{ maxWidth: '52rem' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
