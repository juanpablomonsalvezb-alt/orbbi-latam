'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const rootRef   = useRef<HTMLElement>(null)
  const tagRef    = useRef<HTMLDivElement>(null)
  const line1Ref  = useRef<HTMLDivElement>(null)
  const line2Ref  = useRef<HTMLDivElement>(null)
  const subRef    = useRef<HTMLParagraphElement>(null)
  const ctasRef   = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      .fromTo([line1Ref.current, line2Ref.current],
        { opacity: 0, y: 60, skewX: -3 },
        { opacity: 1, y: 0, skewX: 0, duration: 1.1, stagger: 0.12 },
        '-=0.3'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(ctasRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.2'
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col justify-center"
      style={{
        minHeight: '100svh',
        paddingTop: '10rem',
        paddingBottom: '8rem',
        zIndex: 1,
      }}
    >
      <div className="wrap">

        {/* Tag */}
        <div
          ref={tagRef}
          className="t-tag flex items-center gap-10 mb-40 s:mb-56"
          style={{ opacity: 0 }}
        >
          <span
            style={{
              display: 'inline-block', width: 20, height: 1,
              background: '#C9A96E', opacity: 0.6,
            }}
          />
          Consultora de IA · Mujeres Profesionales · Latinoamérica
        </div>

        {/* Headline */}
        <div className="overflow-hidden mb-12" style={{ opacity: 0 }} ref={line1Ref}>
          <h1 className="t-hero">
            La IA no vino a
          </h1>
        </div>
        <div
          className="overflow-hidden mb-48 s:mb-64"
          style={{ opacity: 0 }}
          ref={line2Ref}
        >
          <h1 className="t-hero">
            <em className="t-italic t-gold">multiplicarte.</em>
          </h1>
        </div>

        {/* Sub + CTA row */}
        <div className="flex flex-col s:flex-row s:items-end s:justify-between gap-40 s:gap-0">
          <p
            ref={subRef}
            className="t-body"
            style={{ maxWidth: '44rem', opacity: 0 }}
          >
            Formamos a mujeres líderes en Latinoamérica
            para dominar la inteligencia artificial.
            Sin tecnicismos. Con impacto real.
          </p>

          <div
            ref={ctasRef}
            className="flex flex-col s:flex-row items-start s:items-center gap-16"
            style={{ opacity: 0 }}
          >
            <a href="/#contacto" className="btn-primary">
              Diagnóstico gratuito
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/#servicios" className="btn-outline">
              Ver programas
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="hidden s:flex items-center gap-16 mt-80 s:mt-120"
          style={{ opacity: 0 }}
        >
          <div
            style={{
              width: 28, height: 44, borderRadius: 14,
              border: '1px solid rgba(201,169,110,0.2)',
              display: 'flex', alignItems: 'flex-start',
              justifyContent: 'center', padding: '6px 0',
            }}
          >
            <span
              className="scroll-dot"
              style={{
                width: 4, height: 8, borderRadius: 2,
                background: '#C9A96E', display: 'block',
              }}
            />
          </div>
          <span className="t-tag" style={{ color: 'rgba(201,169,110,0.4)' }}>Scroll</span>
        </div>

      </div>
    </section>
  )
}
