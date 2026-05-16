'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  {
    icon: '◆',
    title: 'Ejecutiva & Directiva',
    description: 'Quieres tomar decisiones más rápidas y con datos. La IA te da ventaja competitiva inmediata en cada reunión.',
    tags: ['Análisis de datos', 'Reportes', 'Presentaciones'],
  },
  {
    icon: '◈',
    title: 'Emprendedora',
    description: 'Quieres automatizar operaciones y escalar sin contratar más. La IA multiplica tu capacidad de ejecución.',
    tags: ['Marketing', 'Atención al cliente', 'Operaciones'],
  },
  {
    icon: '◉',
    title: 'Docente & Educadora',
    description: 'Quieres diseñar experiencias de aprendizaje más impactantes. La IA transforma cómo enseñas.',
    tags: ['Planificación', 'Evaluación', 'Contenidos'],
  },
  {
    icon: '◇',
    title: 'Consultora independiente',
    description: 'Quieres diferenciarte y entregar proyectos más rápido. La IA es tu ventaja competitiva.',
    tags: ['Investigación', 'Propuestas', 'Automatización'],
  },
  {
    icon: '○',
    title: 'Profesional de salud',
    description: 'Quieres optimizar tu práctica y reducir carga administrativa. La IA cuida de los detalles para que tú te enfoques en las personas.',
    tags: ['Documentación', 'Diagnóstico asistido', 'Gestión'],
  },
  {
    icon: '□',
    title: 'Abogada & Contadora',
    description: 'Quieres automatizar análisis repetitivos y entregar más valor a tus clientes. La IA acelera tu productividad legal y financiera.',
    tags: ['Análisis de contratos', 'Reportes', 'Investigación'],
  },
]

export default function ParaQuienSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(cardsRef.current?.children ?? [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="para-quien"
      ref={sectionRef}
      className="section-py"
      style={{ position: 'relative', zIndex: 2, background: 'rgba(13,13,18,0.95)' }}
    >
      <div className="site-max">

        {/* Title */}
        <div ref={titleRef} className="mb-60 s:mb-80">
          <p className="text-11 uppercase tracking-[0.18rem] mb-16" style={{ color: '#C9A96E' }}>Para quién</p>
          <h2
            className="text-32 s:text-56 font-normal leading-[1.1]"
            style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8', maxWidth: '64rem' }}
          >
            Diseñado para mujeres que ya{' '}
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>dominan su campo</em>
            {' '}y quieren dominarlo aún más.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 s:grid-cols-2 l:grid-cols-3 gap-16 s:gap-20"
        >
          {profiles.map((p, i) => (
            <div
              key={i}
              className="card-dark service-card p-32 s:p-40 flex flex-col gap-20"
              data-cursor
              style={{ cursor: 'none' }}
            >
              {/* Icon */}
              <span className="text-20" style={{ color: '#C9A96E', fontFamily: 'monospace' }}>{p.icon}</span>

              {/* Title */}
              <h3
                className="text-16 s:text-20 font-normal leading-[1.3]"
                style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-13 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)' }}>
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-8 mt-auto">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-11 uppercase tracking-[0.12rem] px-12 py-6 rounded-full"
                    style={{ color: 'rgba(201,169,110,0.7)', border: '1px solid rgba(201,169,110,0.15)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
