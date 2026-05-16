'use client'
import { useEffect, useRef } from 'react'

export default function VantaBg() {
  const ref    = useRef<HTMLDivElement>(null)
  const effect = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function init() {
      if (!ref.current || effect.current) return
      const w = window as any
      if (!w.VANTA?.NET) return
      effect.current = w.VANTA.NET({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        color: 0xc9a96e,
        backgroundColor: 0x0d0d12,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      })
    }

    function loadScript(src: string, cb: () => void) {
      if (document.querySelector(`script[src="${src}"]`)) { cb(); return }
      const s = document.createElement('script')
      s.src = src
      s.onload = cb
      document.head.appendChild(s)
    }

    const w = window as any
    if (!w.THREE) {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', () => {
        if (!w.VANTA) {
          loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', init)
        } else { init() }
      })
    } else if (!w.VANTA) {
      loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', init)
    } else { init() }

    return () => { if (effect.current) { effect.current.destroy(); effect.current = null } }
  }, [])

  return <div ref={ref} className="fixed inset-0" style={{ zIndex: 0 }} />
}
