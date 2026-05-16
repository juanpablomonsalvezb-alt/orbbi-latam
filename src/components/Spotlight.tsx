'use client'
import { useEffect, useState } from 'react'

export default function Spotlight() {
  const [p, setP] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const move = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 1,
        pointerEvents: 'none',
        background: `radial-gradient(700px at ${p.x}px ${p.y}px, rgba(201,169,110,0.07), transparent 80%)`,
      }}
    />
  )
}
