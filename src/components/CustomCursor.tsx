'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window==='undefined'||window.matchMedia('(hover:none)').matches) return
    let mx=-200,my=-200,rx=-200,ry=-200,big=false
    const move = (e:MouseEvent) => { mx=e.clientX; my=e.clientY }
    const enter = () => { big=true }
    const leave = () => { big=false }
    const add = () => document.querySelectorAll<HTMLElement>('a,button').forEach(el=>{
      el.addEventListener('mouseenter',enter); el.addEventListener('mouseleave',leave)
    })
    add()
    const obs = new MutationObserver(add)
    obs.observe(document.body,{childList:true,subtree:true})
    window.addEventListener('mousemove',move,{passive:true})
    let raf:number
    const tick = () => {
      dot.current!.style.transform=`translate(${mx-4}px,${my-4}px)`
      rx+=(mx-rx)*0.10; ry+=(my-ry)*0.10
      ring.current!.style.transform=`translate(${rx-16}px,${ry-16}px) scale(${big?2.2:1})`
      raf=requestAnimationFrame(tick)
    }
    raf=requestAnimationFrame(tick)
    return ()=>{ window.removeEventListener('mousemove',move); obs.disconnect(); cancelAnimationFrame(raf) }
  },[])

  return (
    <>
      <div ref={dot} className="c-dot" />
      <div ref={ring} className="c-ring" style={{ transition:'scale .35s cubic-bezier(.2,.65,.3,.9)' }} />
    </>
  )
}
