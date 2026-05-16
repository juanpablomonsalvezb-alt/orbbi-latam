'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Gracias a Orbbi, pasé de temer la IA a usarla todos los días en mis presentaciones ejecutivas. En tres semanas automaticé lo que antes me tomaba dos días de trabajo.',
    name: 'María Fernanda Ríos',
    role: 'Directora Comercial',
    company: 'Grupo Empresarial, Colombia',
    initial: 'M',
  },
  {
    quote: 'Lo que más valoro es que el aprendizaje es 100% aplicado a MI trabajo, no ejemplos genéricos. Mi consultora entendió mi sector desde el primer día.',
    name: 'Luciana Reyes',
    role: 'Docente Universitaria',
    company: 'Universidad Nacional, Argentina',
    initial: 'L',
  },
  {
    quote: 'En solo 6 semanas logré automatizar el 40% de mis tareas administrativas. Ahora tengo tiempo para hacer lo que realmente importa: crecer mi negocio.',
    name: 'Camila Torres',
    role: 'Fundadora & CEO',
    company: 'Consultora de RRHH, Chile',
    initial: 'C',
  },
  {
    quote: 'Tenía miedo de quedarme atrás tecnológicamente. Orbbi me demostró que la experiencia acumulada es una ventaja enorme cuando se combina con IA.',
    name: 'Patricia Vidal',
    role: 'Abogada Senior',
    company: 'Estudio Jurídico, México',
    initial: 'P',
  },
]

export default function TestimonialsSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[active]

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="section-py"
      style={{
        position: 'relative', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(19,19,26,0.98) 0%, rgba(13,13,18,0.97) 100%)',
      }}
    >
      <div className="site-max">

        {/* Title */}
        <div ref={titleRef} className="mb-60 s:mb-80">
          <p className="text-11 uppercase tracking-[0.18rem] mb-16" style={{ color: '#C9A96E' }}>Testimonios</p>
          <h2
            className="text-32 s:text-56 font-normal leading-[1.1]"
            style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8', maxWidth: '48rem' }}
          >
            Lo dicen quienes ya{' '}
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>dieron el paso</em>.
          </h2>
        </div>

        {/* Main testimonial */}
        <div
          className="card-dark p-40 s:p-64 mb-32"
          key={active}
          style={{ animation: 'fadeIn 0.5s ease' }}
        >
          {/* Quote mark */}
          <div
            className="text-76 font-normal leading-none mb-24"
            style={{ fontFamily: '"disp", Georgia, serif', color: 'rgba(201,169,110,0.2)', lineHeight: 0.8 }}
          >
            "
          </div>

          <blockquote
            className="text-20 s:text-26 font-normal leading-[1.5] mb-40"
            style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8', maxWidth: '72rem', fontStyle: 'italic' }}
          >
            {t.quote}
          </blockquote>

          <div className="flex items-center gap-20">
            {/* Avatar */}
            <div
              className="w-48 h-48 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #8B6914)', fontSize: '2rem', fontWeight: 500, color: '#0D0D12' }}
            >
              {t.initial}
            </div>
            <div>
              <p className="text-14 font-medium" style={{ color: '#F5F0E8' }}>{t.name}</p>
              <p className="text-12" style={{ color: 'rgba(245,240,232,0.45)' }}>{t.role} · {t.company}</p>
            </div>
          </div>
        </div>

        {/* Navigation dots + prev/next */}
        <div className="flex items-center gap-20">
          {/* Dots */}
          <div className="flex items-center gap-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? '#C9A96E' : 'rgba(201,169,110,0.2)',
                  border: 'none',
                  transition: 'width 0.3s, background 0.3s',
                  cursor: 'none',
                }}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-12 font-medium uppercase tracking-[0.12rem]" style={{ color: 'rgba(245,240,232,0.3)' }}>
            {active + 1} / {testimonials.length}
          </span>

          {/* Arrows */}
          <div className="flex items-center gap-8 ml-auto">
            <button
              onClick={() => setActive(v => (v - 1 + testimonials.length) % testimonials.length)}
              className="flex items-center justify-center"
              style={{
                width: '4rem', height: '4rem', borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.2)',
                background: 'transparent', color: 'rgba(245,240,232,0.5)',
                transition: 'border-color 0.3s, color 0.3s', cursor: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A96E'; (e.currentTarget as HTMLElement).style.color = '#C9A96E' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.5)' }}
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => setActive(v => (v + 1) % testimonials.length)}
              className="flex items-center justify-center"
              style={{
                width: '4rem', height: '4rem', borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.2)',
                background: 'transparent', color: 'rgba(245,240,232,0.5)',
                transition: 'border-color 0.3s, color 0.3s', cursor: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A96E'; (e.currentTarget as HTMLElement).style.color = '#C9A96E' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.5)' }}
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  )
}
