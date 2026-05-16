'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    description: 'Comenzamos entendiendo tu contexto: qué haces, cuánto tiempo pierdes en tareas repetitivas y qué resultados quieres lograr con IA.',
    duration: '1 sesión · 60 min',
  },
  {
    n: '02',
    title: 'Diseño',
    description: 'Creamos tu mapa personalizado de herramientas IA. No te enseñamos todo — te enseñamos exactamente lo que necesitas.',
    duration: '1 semana',
  },
  {
    n: '03',
    title: 'Formación',
    description: 'Aprendes en sesiones prácticas con ejercicios reales de tu trabajo. Sin teoría vacía. Con acompañamiento permanente.',
    duration: '4 a 8 semanas',
  },
  {
    n: '04',
    title: 'Seguimiento',
    description: 'Te apoyamos mientras implementas. Revisamos resultados, ajustamos herramientas y aseguramos que el cambio sea real y duradero.',
    duration: '30 días post-programa',
  },
]

export default function ProcesoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(stepsRef.current?.children ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="section-py"
      style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(13,13,18,0.98)',
      }}
    >
      <div className="site-max">

        {/* Title */}
        <div ref={titleRef} className="mb-60 s:mb-80">
          <p className="text-11 uppercase tracking-[0.18rem] mb-16" style={{ color: '#C9A96E' }}>Método</p>
          <h2
            className="text-32 s:text-56 font-normal leading-[1.1]"
            style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8', maxWidth: '56rem' }}
          >
            Un proceso claro,{' '}
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>sin atajos</em>,{' '}
            con resultados reales.
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col s:flex-row s:items-start gap-24 s:gap-60 py-40 s:py-48"
              style={{
                borderTop: '1px solid rgba(201,169,110,0.08)',
                ...(i === steps.length - 1 ? { borderBottom: '1px solid rgba(201,169,110,0.08)' } : {}),
              }}
            >
              {/* Number + duration */}
              <div className="flex s:flex-col items-start gap-16 s:gap-12 s:w-[18rem] shrink-0">
                <span
                  className="text-40 s:text-56 font-normal leading-none"
                  style={{ fontFamily: '"disp", Georgia, serif', color: 'rgba(201,169,110,0.15)' }}
                >
                  {step.n}
                </span>
                <span
                  className="text-11 uppercase tracking-[0.14rem] px-12 py-6 rounded-full"
                  style={{ color: 'rgba(201,169,110,0.6)', border: '1px solid rgba(201,169,110,0.15)', whiteSpace: 'nowrap' }}
                >
                  {step.duration}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-12">
                <h3
                  className="text-24 s:text-32 font-normal leading-[1.2]"
                  style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}
                >
                  {step.title}
                </h3>
                <p className="text-14 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)', maxWidth: '56rem' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col s:flex-row items-start s:items-center gap-24 mt-60 s:mt-80">
          <p className="text-16 s:text-20 font-normal" style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}>
            ¿Lista para empezar?
          </p>
          <a href="/#contacto" className="btn-cream">
            Agenda tu diagnóstico gratuito
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
