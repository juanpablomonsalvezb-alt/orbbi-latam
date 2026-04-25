'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CASES = [
  { title: 'Sector Financiero — Contador Sénior', tags: ['Automatización', 'Eficiencia'], status: 'Caso Resuelto', statusBg: '#6da479', image: null, bg: '#292929' },
  { title: 'Educación Superior — Directora Académica', tags: ['Gestión Académica', 'Documentación'], status: 'Caso Resuelto', statusBg: '#6da479', image: '/images/gender2.png', bg: null },
  { title: 'Consultoría Legal — Abogado Independiente', tags: ['Redacción Legal', 'Investigación'], status: 'Caso Resuelto', statusBg: '#6da479', image: '/images/criminal.jpg', bg: null },
  { title: 'Gerencia Comercial — Director Regional', tags: ['Análisis de datos', 'Reportes'], status: 'En proceso', statusBg: '#c292c1', image: '/images/age.png', bg: null },
  { title: 'Administración Pública — Jefa de Área', tags: ['Gestión documental', 'Comunicaciones'], status: 'En proceso', statusBg: '#c292c1', image: null, bg: '#292929' },
  { title: 'Salud — Médico Especialista', tags: ['Documentación clínica', 'Investigación'], status: 'Caso Resuelto', statusBg: '#6da479', image: '/images/pay-equity.jpg', bg: null },
  { title: 'Empresa Familiar — Gerente General', tags: ['Operaciones', 'Estrategia'], status: 'En proceso', statusBg: '#c292c1', image: '/images/data.png', bg: null },
]

export default function CasesSlider() {
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
          <h2 className="text-grey text-12 font-medium leading-none tracking-[0.12rem] uppercase">Casos de Éxito</h2>
          <h3 className="text-24 s:text-40 font-normal leading-[1.16] text-green" style={{ maxWidth: '102.6rem' }}>
            Profesionales reales de 45 a 60 años que incorporaron la IA a su trabajo con Orbbi Latam.
          </h3>
        </div>
        <div className="col-span-full flex items-center justify-between">
          <div className="hidden s:flex">
            <button onClick={() => goTo(Math.max(0, activeIdx - 1))} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/20 transition-colors duration-200">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => goTo(Math.min(CASES.length - 1, activeIdx + 1))} className="flex items-center justify-center w-45 h-45 border border-grey-taupe -ml-px hover:bg-grey-taupe/20 transition-colors duration-200">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <a href="#" className="mx-auto s:mx-0 inline-flex items-center gap-8 text-12 font-medium tracking-[0.12rem] text-white py-15 px-25 bg-green uppercase hover:opacity-90 transition-opacity">
            Ver todos
            <svg className="w-8 h-11" viewBox="0 0 8 11" fill="none"><path d="M1.73438 1L6.23438 5.5L1.73438 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div ref={containerRef} className="site-max overflow-hidden pb-60 s:pb-200">
        <ul ref={trackRef} className="flex gap-25 will-change-transform" style={{ width: 'max-content' }}>
          {CASES.map((c, i) => (
            <li key={i} className={`relative flex-shrink-0 ${i === 0 ? 'w-full s:w-[67rem]' : 'w-full s:w-[41rem]'}`}>
              <div className="absolute top-0 left-0 w-full z-10 flex flex-wrap gap-4 p-16 pointer-events-none select-none">
                {c.tags.map(t => <span key={t} className="bg-white text-green text-12 px-16 py-12 rounded-[0.4rem]">{t}</span>)}
              </div>
              <figure className="relative overflow-hidden w-full" style={{ paddingTop: '67%', background: c.bg || undefined }}>
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
                )}
                <div className="absolute bottom-0 left-0 p-16 s:p-24 z-10">
                  <span className="text-green text-12 font-medium tracking-[0.12rem] uppercase px-16 py-10" style={{ backgroundColor: c.statusBg }}>{c.status}</span>
                </div>
              </figure>
              <div className="pt-24 s:pt-32">
                <h4 className="text-24 font-normal leading-[1.4] text-green">{c.title}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
