'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    n: '01',
    title: 'Formación Esencial',
    sub: 'De cero a productiva en 8 semanas.',
    body: 'Un programa intensivo y práctico para dominar ChatGPT, herramientas de automatización y IA de productividad. Todo aplicado a tu trabajo real, no a ejemplos genéricos.',
    tags: ['8 semanas', 'Grupal o individual', 'Certificado'],
  },
  {
    n: '02',
    title: 'Orientación Profesional',
    sub: 'IA diseñada para tu cargo específico.',
    body: 'Sesiones 1:1 donde mapeamos exactamente qué herramientas necesitas para tu rol. Diagnóstico, plan de implementación y acompañamiento personalizado.',
    tags: ['4 sesiones 1:1', 'Plan a medida', 'Seguimiento 30 días'],
  },
  {
    n: '03',
    title: 'Herramienta a Medida',
    sub: 'Tu propio asistente de IA, construido para ti.',
    body: 'Desarrollamos una herramienta de IA diseñada exclusivamente para tus procesos. Un asistente que habla tu idioma, conoce tu sector y trabaja contigo.',
    tags: ['Desarrollo completo', 'Capacitación incluida', 'Soporte técnico'],
  },
  {
    n: '04',
    title: 'Programas Corporativos',
    sub: 'IA para todo tu equipo, con foco en liderazgo femenino.',
    body: 'Formamos equipos completos con un programa diseñado para tu industria y objetivos. Métricas de impacto, reportes de avance y seguimiento continuo.',
    tags: ['Diagnóstico organizacional', 'Programa personalizado', 'Métricas de impacto'],
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(listRef.current?.children ?? [],
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="section" style={{ background: 'rgba(9,9,14,0.95)' }}>
      <div className="wrap">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col s:flex-row s:items-end s:justify-between gap-32 mb-80 s:mb-100" style={{ opacity: 0 }}>
          <div>
            <p className="t-tag mb-20">Servicios</p>
            <h2 className="t-h2" style={{ maxWidth: '52rem' }}>
              Cuatro formas de transformar
              tu relación con la{' '}
              <em className="t-italic t-gold">IA.</em>
            </h2>
          </div>
          <a href="/#contacto" className="btn-outline shrink-0">Hablar con una asesora</a>
        </div>

        {/* Service rows */}
        <div ref={listRef}>
          {SERVICES.map((s) => (
            <div key={s.n} className="svc-row">
              <div className="py-32 s:py-40 px-0 s:px-8">
                {/* Top row */}
                <div className="flex items-start justify-between gap-24">
                  <div className="flex items-baseline gap-24 s:gap-40">
                    <span
                      className="svc-num t-tag shrink-0"
                      style={{ color: 'rgba(201,169,110,0.3)', minWidth: '3rem' }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3
                        className="svc-title"
                        style={{
                          fontFamily: '"disp",Georgia,serif',
                          fontSize: 'clamp(2rem, 3vw, 3.6rem)',
                          lineHeight: 1.15,
                          color: '#F2EDE4',
                          letterSpacing: '-0.01em',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {s.title}
                      </h3>
                      <p className="t-small" style={{ fontSize: '1.3rem' }}>{s.sub}</p>
                    </div>
                  </div>
                  <svg
                    className="svc-arrow shrink-0 mt-8"
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ color: 'rgba(242,237,228,0.3)' }}
                  >
                    <path d="M4 10h12M12 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Expand body */}
                <div className="svc-body">
                  <div className="pt-24 pl-0 s:pl-[7.4rem] pb-8 flex flex-col s:flex-row gap-24 s:gap-40">
                    <p className="t-body" style={{ maxWidth: '52rem', fontSize: '1.4rem' }}>
                      {s.body}
                    </p>
                    <div className="flex flex-wrap s:flex-col gap-8 s:gap-10 shrink-0">
                      {s.tags.map(tag => (
                        <span
                          key={tag}
                          className="t-tag whitespace-nowrap px-12 py-6 rounded-full"
                          style={{
                            color: 'rgba(201,169,110,0.6)',
                            border: '1px solid rgba(201,169,110,0.15)',
                            fontSize: '1.0rem',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pl-0 s:pl-[7.4rem] pb-8">
                    <a
                      href="/#contacto"
                      className="t-tag inline-flex items-center gap-8"
                      style={{ color: '#C9A96E', cursor: 'none' }}
                    >
                      Solicitar información
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
