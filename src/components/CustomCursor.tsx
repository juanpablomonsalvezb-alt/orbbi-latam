'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!
    let mx = -100, my = -100
    let rx = -100, ry = -100
    let hovering = false

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    document.addEventListener('mousemove', onMove)

    const interactables = 'a, button, [data-cursor]'
    document.querySelectorAll<HTMLElement>(interactables).forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(interactables).forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    let raf: number
    const loop = () => {
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${hovering ? 1.8 : 1})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A96E' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.5)',
          transition: 'transform 0.05s linear, opacity 0.3s',
        }}
      />
    </>
  )
}
