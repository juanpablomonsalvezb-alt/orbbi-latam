'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function HighlightSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    // Exact replica: split by words+chars, animate chars from autoAlpha 0.3
    const split = new SplitText(text, { type: 'words, chars', autoSplit: true })
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          scrub: true,
          trigger: section,
          start: 'top 80%',
          end: 'center 40%',
        },
      }).from(split.chars, {
        autoAlpha: 0.3,
        stagger: 0.2,
        ease: 'linear',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-yellow" data-component="highlight">
      <div className="site-max py-60 s:py-120">
        <div className="site-grid">
          <div className="highlight-col">
            <h2 className="text-black text-12 uppercase tracking-[0.12rem] font-medium mb-24 s:mb-32">
              Una consultora diseñada para tu generación
            </h2>
            <h3
              ref={textRef}
              className="text-black text-26 s:text-48 font-normal leading-[1.2]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              En Orbbi Latam acompañamos a profesionales de 45 a 60 años a incorporar la inteligencia artificial en su trabajo diario antes de que la brecha generacional los deje fuera del mercado. No somos una plataforma de cursos. Somos profesionales de tu misma generación que ya cruzamos al otro lado, y volvimos a enseñarte cómo.
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
