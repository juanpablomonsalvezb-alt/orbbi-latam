'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { val: 847,  sfx: '+',  label: 'Mujeres formadas',  sub: 'en Latinoamérica' },
  { val: 12,   sfx: '',   label: 'Países',             sub: 'de cobertura activa' },
  { val: 94,   sfx: '%',  label: 'Satisfacción',       sub: 'al finalizar el programa' },
  { val: 3.2,  sfx: 'h',  label: 'Ahorro diario',      sub: 'en promedio por alumna' },
]

function Num({ val, sfx }: { val: number; sfx: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const dec = val % 1 !== 0

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: val, duration: 2.2, ease: 'power2.out',
      onUpdate: () => { el.textContent = dec ? obj.v.toFixed(1) : Math.round(obj.v).toString() },
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    })
  }, [val, dec])

  return (
    <span className="counter-num">
      <span ref={ref}>0</span>{sfx}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="numeros" className="section-sm" style={{ background: 'rgba(9,9,14,0.97)' }}>
      <div className="wrap">
        <div className="line-gold mb-64 s:mb-80" />
        <div className="grid grid-cols-2 s:grid-cols-4 gap-48 s:gap-32">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item flex flex-col gap-12" style={{ opacity: 0 }}>
              <Num val={s.val} sfx={s.sfx} />
              <p style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(1.6rem,1.8vw,2rem)', color:'#F2EDE4', lineHeight:1.2 }}>{s.label}</p>
              <p className="stat-label">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="line-gold mt-64 s:mt-80" />
      </div>
    </section>
  )
}
