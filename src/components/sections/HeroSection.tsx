'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const trackerRef    = useRef<HTMLDivElement>(null)
  const screenRef     = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const textRef       = useRef<HTMLDivElement>(null)
  const tagRef        = useRef<HTMLParagraphElement>(null)
  const h1Ref         = useRef<HTMLHeadingElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const ctasRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tracker    = trackerRef.current
    const screen     = screenRef.current
    const heroContent = heroContentRef.current
    const text       = textRef.current
    if (!tracker || !screen || !heroContent || !text) return

    /* Entrance animation */
    const entranceTl = gsap.timeline({ delay: 0.2 })
    entranceTl
      .fromTo(tagRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .fromTo(h1Ref.current,   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .fromTo(subRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo(ctasRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')

    /* Scroll reveal */
    gsap.set(screen, {
      top: 'calc(100% + 0rem)',
      clipPath: 'inset(0% 20% 20% 20% round 6.4rem)',
      position: 'absolute',
    })
    gsap.set(heroContent, { transform: 'translateY(-5%) scale(0.9)' })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: tracker,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          if (self.progress === 0) {
            gsap.set(screen, { top: 'calc(100% + 0rem)', clipPath: 'inset(0% 20% 20% 20% round 6.4rem)' })
            gsap.set(heroContent, { transform: 'translateY(-5%) scale(0.9)' })
          }
        },
      },
    })

    tl.fromTo(screen,
      { top: 'calc(100% + 0rem)', clipPath: 'inset(0% 20% 20% 20% round 6.4rem)' },
      { top: 'calc(0% + 28rem)', clipPath: 'inset(8% 12% 12% 12% round 4rem)' }
    )
    tl.fromTo(text,
      { transform: 'none', opacity: 1 },
      { transform: 'translateY(-20%)', opacity: 0 },
      '<'
    )
    tl.fromTo(screen,
      { clipPath: 'inset(8% 12% 12% 12% round 4rem)', top: 'calc(0% + 28rem)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0rem)', top: 'calc(0% + 8rem)' }
    )
    tl.fromTo(heroContent,
      { transform: 'translateY(-5%) scale(0.9)' },
      { transform: 'translateY(0%) scale(1)' },
      '<'
    )

    return () => { tl.kill(); entranceTl.kill() }
  }, [])

  return (
    <div className="w-full relative h-auto s:h-[300vh] mt-0 s:-mt-[8rem]" style={{ zIndex: 1, isolation: 'isolate' }}>
      <div ref={trackerRef} className="flex items-center justify-center w-full h-full">
        <div className="w-full h-full s:fixed s:top-0 s:left-0 s:right-0" style={{ zIndex: 1 }}>
          <div className="mx-auto relative w-full s:w-[inherit]">

            {/* Text block */}
            <div
              ref={textRef}
              className="text-center pt-[6.5rem] s:pt-[12rem] pb-32 s:pb-0 px-20 s:px-0"
            >
              {/* Badge */}
              <p
                ref={tagRef}
                className="inline-flex items-center gap-8 text-11 uppercase tracking-[0.18rem] mb-24 px-16 py-8 rounded-full"
                style={{
                  color: '#C9A96E',
                  border: '1px solid rgba(201,169,110,0.25)',
                  background: 'rgba(201,169,110,0.06)',
                  opacity: 0,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A96E', display: 'inline-block' }} />
                Consultora de IA · 100% para Mujeres Profesionales
              </p>

              {/* Headline */}
              <h1
                ref={h1Ref}
                className="text-32 s:text-76 font-normal text-center mx-auto leading-[1.08]"
                style={{
                  fontFamily: '"disp", Georgia, serif',
                  maxWidth: '100rem',
                  color: '#F5F0E8',
                  opacity: 0,
                }}
              >
                La IA no vino a{' '}
                <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>reemplazarte</em>.
                <br className="hidden s:block" />
                {' '}Vino a multiplicarte.
              </h1>

              {/* Sub */}
              <p
                ref={subRef}
                className="text-14 s:text-16 mt-24 s:mt-32 mx-auto leading-[1.8]"
                style={{
                  maxWidth: '56rem',
                  color: 'rgba(245,240,232,0.55)',
                  fontFamily: '"sans", system-ui, sans-serif',
                  opacity: 0,
                }}
              >
                Formamos a mujeres líderes en Latinoamérica para dominar la inteligencia artificial.
                Sin tecnicismos. Con impacto real en tu carrera.
              </p>

              {/* CTAs */}
              <div
                ref={ctasRef}
                className="flex flex-col s:flex-row items-center justify-center gap-16 mt-40 s:mt-48"
                style={{ opacity: 0 }}
              >
                <a href="/#contacto" className="btn-cream text-12">
                  Diagnóstico gratuito
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="/#servicios" className="btn-gold text-12">
                  Ver programas
                </a>
              </div>

              {/* Scroll hint */}
              <div className="hidden s:flex flex-col items-center gap-8 mt-48" style={{ color: 'rgba(245,240,232,0.25)' }}>
                <span className="text-11 uppercase tracking-[0.16rem]">Scroll</span>
                <div style={{ width: 1, height: '3rem', background: 'linear-gradient(180deg, rgba(201,169,110,0.4), transparent)' }} />
              </div>
            </div>

            {/* Image screen */}
            <div
              ref={screenRef}
              className="w-full s:absolute s:left-0 s:right-0 mx-auto h-[50rem] s:h-[calc(100vh-8rem)] overflow-hidden"
            >
              <div ref={heroContentRef} className="w-full h-full origin-top" style={{ position: 'relative' }}>
                <Image
                  src="/images/hero.jpg"
                  alt="Orbbi Latam — Mujeres profesionales aprendiendo inteligencia artificial"
                  fill priority
                  className="object-cover object-top"
                  sizes="100vw"
                />
                {/* Gold overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(13,13,18,0.3) 0%, transparent 40%, rgba(13,13,18,0.5) 100%)' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
