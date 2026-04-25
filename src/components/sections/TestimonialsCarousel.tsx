'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const TESTIMONIALS = [
  { quote: 'Llegué sin saber nada de IA. Salí con herramientas concretas para mi trabajo. No esperaba resultados tan rápidos.', source: 'Profesional del sector financiero', date: 'Chile' },
  { quote: 'Lo que más valoré fue que me explicaron desde mi realidad, no desde la tecnología. Es una diferencia enorme.', source: 'Directora de área', date: 'Colombia' },
  { quote: 'Pensaba que esto no era para mí. Me equivoqué completamente.', source: 'Profesional independiente', date: 'Argentina' },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animatingRef = useRef(false)

  const goTo = useCallback((next: number) => {
    if (animatingRef.current || !containerRef.current) return
    const items = containerRef.current.querySelectorAll('.t-item')
    const cur = items[current]
    const nxt = items[next]
    if (!cur || !nxt) return

    animatingRef.current = true
    gsap.set(nxt, { opacity: 0, y: 16, visibility: 'visible', position: 'absolute', inset: 0 })

    gsap.to(cur, {
      opacity: 0, y: -16, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        gsap.set(cur, { visibility: 'hidden', position: 'absolute' })
        gsap.set(nxt, { position: 'relative', inset: 'auto' })
        gsap.to(nxt, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: () => { animatingRef.current = false } })
      }
    })
    setCurrent(next)
  }, [current])

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.t-item')
    items.forEach((el, i) => {
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0, visibility: i === 0 ? 'visible' : 'hidden', position: i === 0 ? 'relative' : 'absolute' })
    })
  }, [])

  useEffect(() => {
    autoRef.current = setInterval(() => goTo((current + 1) % TESTIMONIALS.length), 4500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [current, goTo])

  const step = (dir: number) => { if (autoRef.current) clearInterval(autoRef.current); goTo((current + dir + TESTIMONIALS.length) % TESTIMONIALS.length) }

  return (
    <section className="relative bg-white">
      <div className="site-max py-80 s:py-160">
        <div className="relative site-grid items-center">
          <div className="relative order-2 s:order-none col-start-4 s:col-start-1 col-span-1">
            <button onClick={() => step(-1)} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/10 transition-colors">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="relative pb-50 s:pb-0 order-1 s:order-none s:col-start-2 col-span-full s:col-span-14 flex flex-col items-center">
            <p className="text-green text-32 s:text-40 font-normal leading-[1.15] text-center pb-65">Lo que dicen quienes ya dieron el primer paso</p>
            <div ref={containerRef} className="relative w-full" style={{ minHeight: '20rem' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="t-item w-full flex flex-col items-center top-0 left-0">
                  <blockquote className="text-center italic text-green text-32 font-normal leading-[1.15] pb-25 max-w-[90rem]" style={{ fontFamily: '"disp", Georgia, serif' }}>
                    {t.quote}
                  </blockquote>
                  <div className="w-24 mb-25" style={{ height: '1px', backgroundColor: '#DEDAD3' }} />
                  <p className="text-center text-grey text-20 font-normal pb-10">{t.source}</p>
                  <p className="text-center text-grey text-16 font-normal">{t.date}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-80">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { if (autoRef.current) clearInterval(autoRef.current); goTo(i) }}
                  style={{ width: current === i ? '3.2rem' : '1.6rem', height: '1px', backgroundColor: current === i ? '#1E383E' : '#DEDAD3', transition: 'all 0.3s', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="relative order-3 s:order-none col-start-5 s:col-start-16 col-span-1 flex justify-end">
            <button onClick={() => step(1)} className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/10 transition-colors">
              <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
