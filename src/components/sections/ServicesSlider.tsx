'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const SERVICES = [
  {
    title: 'Diagnóstico de Uso IA',
    tags: ['Evaluación', 'Personalizado'],
    status: 'Sesión 1:1',
    statusBg: '#6da479',
    desc: 'Analizamos tu flujo de trabajo actual e identificamos exactamente dónde la IA puede ahorrarte tiempo sin cambiar lo que ya haces bien.',
    image: null,
    bg: '#292929',
  },
  {
    title: 'Mentoría Individual Intensiva',
    tags: ['1:1', 'Resultados rápidos'],
    status: 'Más popular',
    statusBg: '#FCDC9B',
    desc: 'Sesiones privadas adaptadas a tu industria y nivel. En 4 semanas tienes flujos de trabajo nuevos funcionando en tu día a día.',
    image: '/images/pay-equity.jpg',
    bg: null,
  },
  {
    title: 'Talleres para Equipos',
    tags: ['Empresa', 'Grupal'],
    status: 'Disponible',
    statusBg: '#6da479',
    desc: 'Formación práctica para equipos de profesionales sénior. Diseñado para empresas que quieren nivelar a su talento con más experiencia.',
    image: '/images/interns.png',
    bg: null,
  },
  {
    title: 'Acompañamiento Continuo',
    tags: ['Mensual', 'Soporte'],
    status: 'Cupo limitado',
    statusBg: '#c292c1',
    desc: 'Plan mensual de seguimiento: revisamos tus avances, resolvemos dudas nuevas y te mantenemos al día con las herramientas que evolucionan.',
    image: null,
    bg: '#1E383E',
  },
  {
    title: 'Consultoría para Directivos',
    tags: ['C-Suite', 'Estrategia'],
    status: 'Premium',
    statusBg: '#c292c1',
    desc: 'Para líderes que necesitan entender el impacto estratégico de la IA en su industria, su equipo y sus decisiones. Sin jerga técnica.',
    image: '/images/restaurant.png',
    bg: null,
  },
  {
    title: 'Automatización de Procesos',
    tags: ['Técnico', 'Sin código'],
    status: 'Disponible',
    statusBg: '#6da479',
    desc: 'Identificamos y automatizamos tareas repetitivas de tu trabajo usando herramientas de IA — sin necesidad de saber programar.',
    image: '/images/data.png',
    bg: null,
  },
]

export default function ServicesSlider() {
  const trackRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const drag = useRef({ isDragging: false, startX: 0, currentX: 0, targetX: 0, rafId: 0 })

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let animX = 0

    const tick = () => {
      animX = lerp(animX, drag.current.targetX, 0.08)
      if (Math.abs(animX - drag.current.targetX) > 0.1) {
        gsap.set(track, { x: animX })
      } else {
        gsap.set(track, { x: drag.current.targetX })
        animX = drag.current.targetX
      }
      drag.current.rafId = requestAnimationFrame(tick)
    }
    drag.current.rafId = requestAnimationFrame(tick)

    const maxX = () => Math.min(0, -(track.scrollWidth - container.offsetWidth))
    const clamp = (v: number) => Math.max(maxX(), Math.min(0, v))

    const onDown = (e: PointerEvent) => {
      drag.current.isDragging = true
      drag.current.startX = e.clientX - drag.current.currentX
      track.setPointerCapture(e.pointerId)
      track.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!drag.current.isDragging) return
      drag.current.currentX = e.clientX - drag.current.startX
      drag.current.targetX = clamp(drag.current.currentX)
    }
    const onUp = () => {
      drag.current.isDragging = false
      drag.current.currentX = drag.current.targetX
      track.style.cursor = 'grab'
    }

    track.addEventListener('pointerdown', onDown)
    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
    track.style.cursor = 'grab'
    track.style.userSelect = 'none'

    return () => {
      cancelAnimationFrame(drag.current.rafId)
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const goTo = (idx: number) => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return
    const slides = Array.from(track.children) as HTMLElement[]
    const slide = slides[idx]
    if (!slide) return
    const target = Math.max(-(track.scrollWidth - container.offsetWidth), Math.min(0, -slide.offsetLeft))
    drag.current.targetX = target
    drag.current.currentX = target
    setActiveIdx(idx)
  }

  return (
    <section className="relative bg-white-smoke overflow-hidden">
      <div className="site-max site-grid pt-60 s:pt-120 pb-40">
        <div className="col-span-full space-y-32 s:space-y-40 pb-40">
          <h2 className="text-grey text-12 font-medium leading-none tracking-[0.12rem] uppercase">Servicios</h2>
          <h3 className="text-24 s:text-40 font-normal leading-[1.16] text-green" style={{ maxWidth: '102.6rem' }}>
            Formación diseñada para profesionales de 45 a 60 años que quieren resultados concretos, no teoría.
          </h3>
        </div>
        <div className="col-span-full flex items-center justify-between">
          <div className="hidden s:flex">
            <button onClick={() => goTo(Math.max(0, activeIdx - 1))} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/20 transition-colors duration-200">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => goTo(Math.min(SERVICES.length - 1, activeIdx + 1))} className="flex items-center justify-center w-45 h-45 border border-grey-taupe -ml-px hover:bg-grey-taupe/20 transition-colors duration-200">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <a href="#" className="mx-auto s:mx-0 inline-flex items-center gap-8 text-12 font-medium tracking-[0.12rem] text-white py-15 px-25 bg-green uppercase hover:opacity-90 transition-opacity">
            Ver todos los servicios
            <svg className="w-8 h-11" viewBox="0 0 8 11" fill="none"><path d="M1.73438 1L6.23438 5.5L1.73438 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div ref={containerRef} className="site-max overflow-hidden pb-60 s:pb-200">
        <ul ref={trackRef} className="flex gap-25 will-change-transform" style={{ width: 'max-content' }}>
          {SERVICES.map((s, i) => (
            <li key={i} className={`relative flex-shrink-0 ${i === 0 ? 'w-full s:w-[67rem]' : 'w-full s:w-[41rem]'}`}>
              <div className="absolute top-0 left-0 w-full z-10 flex flex-wrap gap-4 p-16 pointer-events-none select-none">
                {s.tags.map(t => <span key={t} className="bg-white text-green text-12 px-16 py-12 rounded-[0.4rem]">{t}</span>)}
              </div>
              <figure className="relative overflow-hidden w-full" style={{ paddingTop: '67%', background: s.bg || '#F0EDE8' }}>
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.title} draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
                )}
                {!s.image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg viewBox="0 0 80 80" fill="none" className="w-80 h-80" style={{ color: s.bg === '#292929' || s.bg === '#1E383E' ? 'white' : '#1E383E' }}>
                      <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1"/>
                      <path d="M40 20V40L52 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="40" cy="40" r="3" fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-16 s:p-24 z-10">
                  <span className="text-green text-12 font-medium tracking-[0.12rem] uppercase px-16 py-10" style={{ backgroundColor: s.statusBg }}>{s.status}</span>
                </div>
              </figure>
              <div className="pt-24 s:pt-32">
                <h4 className="text-24 font-normal leading-[1.4] text-green pb-12">{s.title}</h4>
                <p className="text-14 text-grey leading-[1.6]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
