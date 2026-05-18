'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,          // más suave → menos carga por frame
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      syncTouch: true,     // nativo en móvil — sin lerp en touch
    })
    lenis.on('scroll', ScrollTrigger.update)

    const rafHandler = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafHandler)
      lenis.destroy()
    }
  }, [])
  return <>{children}</>
}
