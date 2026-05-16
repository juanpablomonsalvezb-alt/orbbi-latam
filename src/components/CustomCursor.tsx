'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover:none)').matches) return
    const blob = blobRef.current!
    const dot  = dotRef.current!
    let cx = -200, cy = -200, mx = -200, my = -200, big = false

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const enter = () => { big = true }
    const leave = () => { big = false }
    const addListeners = () => {
      document.querySelectorAll<HTMLElement>('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    addListeners()
    const obs = new MutationObserver(addListeners)
    obs.observe(document.body, { childList:true, subtree:true })
    window.addEventListener('mousemove', move, { passive:true })

    let raf: number
    const tick = () => {
      dot.style.transform  = `translate(${mx-4}px,${my-4}px)`
      cx += (mx-cx) * 0.11; cy += (my-cy) * 0.11
      blob.style.transform = `translate(${cx-20}px,${cy-20}px) scale(${big?2.6:1})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', move); obs.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden style={{ position:'fixed',top:0,left:0,width:8,height:8,borderRadius:'50%',background:'#1E3A2F',pointerEvents:'none',zIndex:99999,willChange:'transform' }} />
      <div ref={blobRef} aria-hidden style={{ position:'fixed',top:0,left:0,width:40,height:40,borderRadius:'50%',border:'1px solid rgba(30,58,47,0.4)',pointerEvents:'none',zIndex:99998,willChange:'transform',transition:'scale 0.4s cubic-bezier(0.2,0.65,0.3,0.9)' }} />
    </>
  )
}
