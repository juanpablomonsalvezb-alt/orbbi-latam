'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const trackerRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tracker = trackerRef.current
    const screen = screenRef.current
    const heroContent = heroContentRef.current
    const text = textRef.current
    if (!tracker || !screen || !heroContent || !text) return

    // Initial state — exact replica of original JS
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
            gsap.set(screen, {
              top: 'calc(100% + 0rem)',
              clipPath: 'inset(0% 20% 20% 20% round 6.4rem)',
            })
            gsap.set(heroContent, { transform: 'translateY(-5%) scale(0.9)' })
          }
        },
      },
    })

    // Phase 1: screen slides up + clip-path tightens, text fades out
    // top final = 28rem so image stays well below the text (12rem padding + ~8rem text = ~20rem text bottom, image at 28rem)
    tl.fromTo(screen,
      { top: 'calc(100% + 0rem)', clipPath: 'inset(0% 20% 20% 20% round 6.4rem)' },
      { top: 'calc(0% + 28rem)', clipPath: 'inset(8% 12% 12% 12% round 4rem)' }
    )
    tl.fromTo(text,
      { transform: 'none', opacity: 1 },
      { transform: 'translateY(-20%)', opacity: 0 },
      '<'
    )
    // Phase 2: clip-path opens fully, image expands to cover full viewport
    tl.fromTo(screen,
      { clipPath: 'inset(8% 12% 12% 12% round 4rem)', top: 'calc(0% + 28rem)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0rem)', top: 'calc(0% + 8rem)' }
    )
    tl.fromTo(heroContent,
      { transform: 'translateY(-5%) scale(0.9)' },
      { transform: 'translateY(0%) scale(1)' },
      '<'
    )

    return () => { tl.kill() }
  }, [])

  return (
    <div className="w-full relative h-auto s:h-[300vh] mt-0 s:-mt-[8rem]" style={{ zIndex: 1 }}>
      <div ref={trackerRef} className="js-tracker flex items-center justify-center w-full h-full">
        {/* Fixed container — stays in place while tracker scrolls. z-index:1 stays below subsequent content (z:2) */}
        <div className="w-full h-full s:fixed s:top-0 s:left-0 s:right-0" style={{ zIndex: 1 }}>
          <div className="mx-auto relative w-full s:w-[inherit]">

            {/* Text block — js-t-text */}
            <div
              ref={textRef}
              className="text-center pt-[6.5rem] s:pt-[12rem] pb-32 s:pb-0 px-20 s:px-0 js-t-text"
            >
              <p className="text-grey uppercase text-12 tracking-[0.12rem] mb-24">
                Inteligencia Artificial para los que ya saben trabajar
              </p>
              <h1
                className="text-32 s:text-76 font-normal text-green text-center mx-auto leading-[1.1]"
                style={{ fontFamily: '"disp", Georgia, serif', maxWidth: '100rem' }}
              >
                La inteligencia artificial no vino a reemplazarte. Vino a multiplicarte.
              </h1>
            </div>

            {/* Screen / image — js-t-screen */}
            <div
              ref={screenRef}
              className="js-t-screen w-full s:absolute s:left-0 s:right-0 mx-auto h-[50rem] s:h-[calc(100vh-8rem)] overflow-hidden"
            >
              {/* Inner content — js-t-hero-content */}
              <div
                ref={heroContentRef}
                className="js-t-hero-content w-full h-full origin-top"
                style={{ position: 'relative' }}
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Outten & Golden"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
