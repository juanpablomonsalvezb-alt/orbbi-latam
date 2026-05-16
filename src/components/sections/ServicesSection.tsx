'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Formación Esencial',
    tagline: 'De cero a productiva en 8 semanas',
    description: 'Un programa intensivo para dominar las herramientas de IA más relevantes para tu trabajo. Aprendes haciendo, con ejercicios aplicados a tu sector.',
    includes: ['ChatGPT avanzado', 'Automatización de tareas', 'IA para presentaciones', 'Herramientas de productividad'],
    cta: 'Ver programa',
    href: '/#contacto',
  },
  {
    number: '02',
    title: 'Orientación Profesional',
    tagline: 'IA diseñada para tu cargo específico',
    description: 'Sesiones 1:1 con una consultora especializada. Mapeamos tu flujo de trabajo y definimos exactamente qué herramientas implementar.',
    includes: ['Diagnóstico personalizado', '4 sesiones 1:1', 'Plan de implementación', 'Seguimiento 30 días'],
    cta: 'Reservar sesión',
    href: '/#contacto',
  },
  {
    number: '03',
    title: 'Herramienta a Medida',
    tagline: 'Tu propio asistente de IA',
    description: 'Construimos una herramienta de IA diseñada exclusivamente para tu trabajo: un asistente, un automatizador, o un analizador de datos. 100% tuyo.',
    includes: ['Análisis de necesidades', 'Desarrollo y configuración', 'Capacitación de uso', 'Soporte técnico'],
    cta: 'Solicitar presupuesto',
    href: '/#contacto',
  },
  {
    number: '04',
    title: 'Programas Corporativos',
    tagline: 'IA para todo tu equipo',
    description: 'Formamos equipos completos en IA con foco en mujeres líderes. Diseñamos el programa según la industria, los roles y los objetivos de tu organización.',
    includes: ['Diagnóstico organizacional', 'Programa personalizado', 'Talleres grupales', 'Métricas de impacto'],
    cta: 'Hablar con nosotros',
    href: '/#contacto',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(gridRef.current?.children ?? [],
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="section-py"
      style={{ position: 'relative', zIndex: 2, background: 'rgba(13,13,18,0.97)' }}
    >
      <div className="site-max">

        {/* Title */}
        <div ref={titleRef} className="mb-60 s:mb-80">
          <p className="text-11 uppercase tracking-[0.18rem] mb-16" style={{ color: '#C9A96E' }}>Servicios</p>
          <div className="flex flex-col s:flex-row s:items-end s:justify-between gap-24">
            <h2
              className="text-32 s:text-56 font-normal leading-[1.1]"
              style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8', maxWidth: '56rem' }}
            >
              Cuatro formas de{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>transformar</em>
              {' '}tu relación con la IA.
            </h2>
            <a href="/#contacto" className="btn-gold shrink-0">
              Hablar con una asesora
            </a>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 s:grid-cols-2 gap-16 s:gap-20">
          {services.map((s, i) => (
            <div
              key={i}
              className="card-dark service-card group p-32 s:p-48 flex flex-col gap-24"
              style={{ cursor: 'none' }}
            >
              {/* Number */}
              <span
                className="text-12 font-medium uppercase tracking-[0.16rem]"
                style={{ color: 'rgba(201,169,110,0.4)', fontFamily: '"sans", system-ui, sans-serif' }}
              >
                {s.number}
              </span>

              {/* Title + tagline */}
              <div>
                <h3
                  className="text-20 s:text-24 font-normal leading-[1.2] mb-8"
                  style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}
                >
                  {s.title}
                </h3>
                <p className="text-12 uppercase tracking-[0.12rem]" style={{ color: '#C9A96E' }}>
                  {s.tagline}
                </p>
              </div>

              {/* Description — visible always */}
              <p className="text-14 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)' }}>
                {s.description}
              </p>

              {/* Includes — hover reveal */}
              <div className="service-reveal">
                <p
                  className="text-11 uppercase tracking-[0.14rem] mb-12"
                  style={{ color: 'rgba(245,240,232,0.3)' }}
                >
                  Incluye
                </p>
                <ul className="flex flex-col gap-8">
                  {s.includes.map(item => (
                    <li key={item} className="flex items-center gap-12">
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A96E', flexShrink: 0 }} />
                      <span className="text-13" style={{ color: 'rgba(245,240,232,0.65)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={s.href}
                className="btn-gold mt-auto self-start service-cta"
              >
                {s.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
