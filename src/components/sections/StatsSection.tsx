'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { v:847, s:'+', l:'Mujeres formadas' },
  { v:12,  s:'',  l:'Países de Latam'  },
  { v:94,  s:'%', l:'Satisfacción'     },
  { v:3.2, s:'h', l:'Ahorro diario'    },
]

function N({ v, s }: { v:number; s:string }) {
  const r = useRef<HTMLSpanElement>(null)
  const d = v%1!==0
  useEffect(()=>{
    const el=r.current; if(!el) return
    const o={val:0}
    gsap.to(o,{ val:v, duration:2.2, ease:'power2.out',
      onUpdate:()=>{ el.textContent = d?o.val.toFixed(1):Math.round(o.val).toString() },
      scrollTrigger:{ trigger:el, start:'top 82%', once:true }
    })
  },[v,d])
  return <><span ref={r}>0</span>{s}</>
}

export default function StatsSection() {
  return (
    <section style={{ background:'#1A3328', padding:'8rem 0' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'5rem 3rem' }} className="s:grid-cols-4">
          {STATS.map((s,i)=>(
            <div key={i} style={{ display:'flex',flexDirection:'column',gap:'1.2rem',paddingTop:'2rem',borderTop:'1px solid rgba(250,250,248,0.1)' }}>
              <p className="stat-num" style={{ color:'#FAFAF8' }}><N v={s.v} s={s.s} /></p>
              <p style={{ fontSize:'1.3rem',textTransform:'uppercase',letterSpacing:'.12em',color:'rgba(250,250,248,0.38)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
