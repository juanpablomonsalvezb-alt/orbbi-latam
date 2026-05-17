'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { v: 847,  s: '+', l: 'mujeres formadas',    sub: 'en toda Latinoamérica' },
  { v: 142,  s: 'k', l: 'horas ahorradas',     sub: 'por nuestras alumnas al mes' },
  { v: 12,   s: '',  l: 'países',              sub: 'de cobertura activa' },
  { v: 94,   s: '%', l: 'satisfacción',        sub: 'al finalizar el programa' },
]

function N({ v, s }: { v: number; s: string }) {
  const r = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = r.current; if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: v, duration: 2.4, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.val).toString() },
      scrollTrigger: { trigger: el, start: 'top 82%', once: true }
    })
  }, [v])
  return <><span ref={r}>0</span>{s}</>
}

export default function StatsSection() {
  return (
    <section className="section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap">
        <p className="label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '7rem' }}>
          Impacto real
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '4rem 2rem' }} className="l:grid-cols-4">
          {METRICS.map((m, i) => (
            <div key={i} style={{ paddingTop: '3.2rem', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              <p style={{ fontFamily: '"disp",Georgia,serif', fontSize: 'clamp(5.6rem,8vw,11.2rem)', lineHeight: 1, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '1.6rem' }}>
                <N v={m.v} s={m.s} />
              </p>
              <p style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 400, marginBottom: '.4rem' }}>{m.l}</p>
              <p className="small" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
