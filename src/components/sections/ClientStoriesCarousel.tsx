'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const STORIES = [
  {
    title: 'Cómo automaticé 3 horas de trabajo diario en mi primer mes con Orbbi',
    body: 'Era contador sénior con 28 años de experiencia y pasaba horas generando reportes que mis colegas más jóvenes hacían en minutos. Orbbi me mostró el camino en dos sesiones.',
    image: '/images/restaurant.png',
    href: '#',
  },
  {
    title: 'De no saber qué era ChatGPT a usarlo para gestionar mi facultad entera',
    body: 'Directora académica de una universidad privada. La IA parecía para otro mundo — hasta que alguien me lo explicó desde mi experiencia, no desde la tecnología.',
    image: '/images/instacart.png',
    href: '#',
  },
  {
    title: 'Cómo recuperé la confianza profesional que creí haber perdido',
    body: 'A los 54 años sentía que me estaban quedando atrás. Orbbi no solo me enseñó a usar IA — me demostró que mi experiencia es exactamente lo que la hace más poderosa.',
    image: '/images/interns.png',
    href: '#',
  },
]

export default function ClientStoriesCarousel() {
  const [current, setCurrent] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(false)

  const goTo = useCallback((next: number) => {
    if (animatingRef.current || !carouselRef.current) return
    const items = carouselRef.current.querySelectorAll('.story-item')
    const cur = items[current]
    const nxt = items[next]
    if (!cur || !nxt) return

    animatingRef.current = true
    gsap.set(nxt, { xPercent: 100, visibility: 'visible' })
    gsap.to(cur, { xPercent: -100, duration: 0.6, ease: 'power2.inOut' })
    gsap.to(nxt, {
      xPercent: 0, duration: 0.6, ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(cur, { visibility: 'hidden', xPercent: 0 })
        animatingRef.current = false
      }
    })
    setCurrent(next)
  }, [current])

  useEffect(() => {
    if (!carouselRef.current) return
    const items = carouselRef.current.querySelectorAll('.story-item')
    items.forEach((el, i) => {
      gsap.set(el, { xPercent: 0, visibility: i === 0 ? 'visible' : 'hidden' })
    })
  }, [])

  const step = (dir: number) => goTo((current + dir + STORIES.length) % STORIES.length)

  return (
    <section className="relative bg-white">
      <div className="site-max pt-60 pb-60 s:pb-160">
        <div className="site-grid">
          <div className="col-span-full">
            <div className="flex flex-col items-center space-y-32 s:space-y-40 pb-60 s:pb-95">
              <h2 className="text-center text-grey text-12 font-medium leading-none tracking-[0.12rem] uppercase">Casos de Éxito</h2>
              <h3 className="text-center text-24 s:text-40 font-normal leading-[1.16] text-green s:max-w-[65rem]">
                Profesionales de 45 a 60 años que incorporaron la IA a su trabajo real. Sin tecnicismos. Con resultados concretos.
              </h3>
              <a href="#" className="inline-flex items-center gap-8 text-12 font-medium tracking-[0.12rem] text-white py-15 px-25 bg-green uppercase hover:opacity-90 transition-opacity">
                Ver todos
                <svg className="w-8 h-11" viewBox="0 0 8 11" fill="none"><path d="M1.73438 1L6.23438 5.5L1.73438 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            <div className="site-grid items-center">
              <div className="col-start-1 col-span-1 hidden s:block">
                <button onClick={() => step(-1)} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/20 transition-colors">
                  <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              <div className="s:col-start-2 col-span-full s:col-span-14">
                <div ref={carouselRef} className="relative overflow-hidden w-full" style={{ height: '64rem' }}>
                  {STORIES.map((s, i) => (
                    <div key={i} className="story-item absolute inset-0 w-full h-full flex flex-col s:flex-row items-start bg-green">
                      <div className="relative w-full s:w-1/2 h-[32rem] s:h-full overflow-hidden flex-shrink-0">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="relative w-full s:w-1/2 h-full p-24 s:p-32 flex flex-col justify-start space-y-24 s:space-y-32">
                        <h4 className="text-32 s:text-56 text-white-smoke font-normal leading-[1.2]" style={{ fontFamily: '"disp", Georgia, serif' }}>
                          {s.title}
                        </h4>
                        <p className="text-16 text-white-smoke font-normal leading-[1.32]">{s.body}</p>
                        <a href={s.href} className="inline-flex items-center gap-8 text-12 font-medium tracking-[0.12rem] text-white-smoke uppercase">
                          Leer el caso completo
                          <svg className="w-8 h-11" viewBox="0 0 8 11" fill="none"><path d="M1.73438 1L6.23438 5.5L1.73438 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-start-16 col-span-1 hidden s:flex justify-end">
                <button onClick={() => step(1)} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/20 transition-colors">
                  <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              <div className="col-span-full flex justify-center gap-10 pt-32 s:hidden">
                <button onClick={() => step(-1)} className="flex items-center justify-center w-45 h-45 border border-grey-taupe">
                  <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={() => step(1)} className="flex items-center justify-center w-45 h-45 border-l-0 border border-grey-taupe">
                  <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
