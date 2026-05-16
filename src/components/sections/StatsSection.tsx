'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 847,  suffix: '+', label: 'Mujeres formadas',     detail: 'en toda Latinoamérica' },
  { value: 12,   suffix: '',  label: 'Países',               detail: 'Chile, México, Colombia y más' },
  { value: 94,   suffix: '%', label: 'Satisfacción',         detail: 'de nuestras alumnas' },
  { value: 3.2,  suffix: 'h', label: 'Ahorro diario',        detail: 'en promedio por alumna' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasDecimal = value % 1 !== 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = hasDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString()
      },
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    })
  }, [value, hasDecimal])

  return (
    <span className="stat-number">
      <span ref={ref}>0</span>{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      id="numeros"
      className="section-py"
      style={{
        position: 'relative', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(13,13,18,0.95) 0%, rgba(19,19,26,0.98) 100%)',
      }}
    >
      <div className="site-max">
        <div className="gold-line mb-60 s:mb-80" />
        <div className="grid grid-cols-2 s:grid-cols-4 gap-40 s:gap-20">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-12">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-14 font-medium uppercase tracking-[0.10rem]" style={{ color: '#F5F0E8' }}>
                {s.label}
              </p>
              <p className="text-12 leading-[1.6]" style={{ color: 'rgba(245,240,232,0.35)' }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="gold-line mt-60 s:mt-80" />
      </div>
    </section>
  )
}
