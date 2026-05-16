'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { val:847,  sfx:'+',  label:'Mujeres formadas',     sub:'en toda Latinoamérica' },
  { val:12,   sfx:'',   label:'Países',               sub:'de cobertura activa' },
  { val:94,   sfx:'%',  label:'Satisfacción',         sub:'al finalizar el programa' },
  { val:3.2,  sfx:'h',  label:'Ahorro diario',        sub:'en promedio por alumna' },
]

function Counter({ val, sfx }: { val:number; sfx:string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const dec  = val % 1 !== 0
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { v:0 }
    gsap.to(obj, {
      v:val, duration:2.4, ease:'power2.out',
      onUpdate:() => { el.textContent = dec ? obj.v.toFixed(1) : Math.round(obj.v).toString() },
      scrollTrigger:{ trigger:el, start:'top 82%', once:true },
    })
  }, [val,dec])
  return <><span ref={ref}>0</span>{sfx}</>
}

export default function StatsSection() {
  return (
    <section className="section-sm" style={{ background:'#F7F3EE' }}>
      <div className="wrap">
        <div className="line-h" style={{ marginBottom:'5rem' }} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'4rem 2rem' }} className="s:grid-cols-4">
          {STATS.map((s,i) => (
            <div key={i}>
              <p className="stat-num" style={{ color:'#1E3A2F' }}>
                <Counter val={s.val} sfx={s.sfx} />
              </p>
              <p style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(1.6rem,1.8vw,2rem)', color:'#1C1C1A', margin:'0.8rem 0 0.4rem', lineHeight:1.2 }}>{s.label}</p>
              <p className="stat-label">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="line-h" style={{ marginTop:'5rem' }} />
      </div>
    </section>
  )
}
