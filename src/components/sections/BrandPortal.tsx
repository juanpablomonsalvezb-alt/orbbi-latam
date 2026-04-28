'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function BrandPortal() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={rootRef}
      style={{
        minHeight: '100dvh',
        backgroundColor: '#F7F5F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2.4rem 6rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Wordmark */}
      <p
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#1E383E',
          opacity: 0.4,
          marginBottom: '4rem',
        }}
      >
        Orbbi Latam
      </p>

      {/* Headline */}
      <h1
        style={{
          fontFamily: '"disp", Georgia, serif',
          fontSize: 'clamp(3.2rem, 6vw, 6.4rem)',
          fontWeight: 400,
          color: '#1E383E',
          lineHeight: 1.08,
          textAlign: 'center',
          maxWidth: '72rem',
          marginBottom: '1.6rem',
        }}
      >
        Crecemos negocios en LATAM
        <br />
        <em>con inteligencia artificial.</em>
      </h1>

      <p
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '1.4rem',
          color: '#7A7871',
          textAlign: 'center',
          maxWidth: '48rem',
          lineHeight: 1.7,
          marginBottom: '6.4rem',
        }}
      >
        Dos caminos. La misma convicción: la IA amplifica a las personas
        que ya saben trabajar.
      </p>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))',
          gap: '1.6rem',
          width: '100%',
          maxWidth: '72rem',
        }}
      >
        {/* Card — Consultora */}
        <a
          href="#para-quien"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('para-quien')?.scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.4rem',
            padding: '4rem',
            backgroundColor: '#1E383E',
            borderRadius: '1.6rem',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(30,56,62,0.18)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#FCDC9B',
                opacity: 0.7,
              }}
            >
              01
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4V13" stroke="#FCDC9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
          </div>

          <div>
            <h2
              style={{
                fontFamily: '"disp", Georgia, serif',
                fontSize: '2.8rem',
                fontWeight: 400,
                color: '#F7F5F2',
                lineHeight: 1.15,
                marginBottom: '1.2rem',
              }}
            >
              Consultora
              <br />
              <em>Senior IA</em>
            </h2>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '1.3rem',
                color: '#F7F5F2',
                opacity: 0.6,
                lineHeight: 1.7,
              }}
            >
              Para profesionales de 45 a 60 años que quieren
              multiplicar su experiencia con inteligencia artificial.
            </p>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FCDC9B',
            }}
          >
            Ver consultora
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        {/* Card — Landings */}
        <Link
          href="https://landings.orbbilatam.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.4rem',
            padding: '4rem',
            backgroundColor: '#ffffff',
            border: '1.5px solid #E8E4DC',
            borderRadius: '1.6rem',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(30,56,62,0.10)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#1E383E',
                opacity: 0.3,
              }}
            >
              02
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4V13" stroke="#1E383E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            </svg>
          </div>

          <div>
            <h2
              style={{
                fontFamily: '"disp", Georgia, serif',
                fontSize: '2.8rem',
                fontWeight: 400,
                color: '#1E383E',
                lineHeight: 1.15,
                marginBottom: '1.2rem',
              }}
            >
              Landings
              <br />
              <em>para negocios</em>
            </h2>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '1.3rem',
                color: '#7A7871',
                lineHeight: 1.7,
              }}
            >
              Sitios web profesionales para PYMEs en LATAM.
              IA que construye tu sitio en minutos. Pago en tu moneda local.
            </p>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1E383E',
              opacity: 0.5,
            }}
          >
            Ver plataforma
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Scroll hint */}
      <p
        style={{
          marginTop: '6.4rem',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '1rem',
          color: '#7A7871',
          opacity: 0.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        ↓ Scroll para conocer la consultora
      </p>
    </section>
  )
}
