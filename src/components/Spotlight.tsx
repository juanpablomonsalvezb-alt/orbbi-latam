'use client'
import { useEffect, useState } from 'react'

export default function Spotlight() {
  const [p, setP] = useState({ x:-9999, y:-9999 })
  useEffect(() => {
    const move = (e: MouseEvent) => setP({ x:e.clientX, y:e.clientY })
    window.addEventListener('mousemove', move, { passive:true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div aria-hidden style={{
      position:'fixed', inset:0, zIndex:1, pointerEvents:'none',
      background:`radial-gradient(600px at ${p.x}px ${p.y}px, rgba(184,146,74,0.05), transparent 80%)`,
    }} />
  )
}
