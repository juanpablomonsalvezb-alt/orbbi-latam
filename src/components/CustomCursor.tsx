'use client'
import { useEffect, useRef } from 'react'

/* Magnetic blob cursor — scales on hover, trails behind pointer */
export default function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const blob = blobRef.current!
    const dot  = dotRef.current!

    let tx = -200, ty = -200   /* blob target */
    let cx = -200, cy = -200   /* blob current */
    let mx = -200, my = -200   /* raw mouse */
    let big = false             /* hovering interactive */

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
    obs.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', move, { passive: true })

    let raf: number
    const tick = () => {
      /* dot snaps instantly */
      dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`

      /* blob follows with inertia */
      cx += (mx - cx) * 0.11
      cy += (my - cy) * 0.11
      const scale = big ? 2.8 : 1
      blob.style.transform = `translate(${cx - 20}px,${cy - 20}px) scale(${scale})`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: '#C9A96E',
          pointerEvents: 'none', zIndex: 99999,
          willChange: 'transform',
        }}
      />
      {/* Blob — lags behind */}
      <div
        ref={blobRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.45)',
          pointerEvents: 'none', zIndex: 99998,
          willChange: 'transform',
          transition: 'transform 0.08s linear, scale 0.4s cubic-bezier(0.2,0.65,0.3,0.9)',
        }}
      />
    </>
  )
}
