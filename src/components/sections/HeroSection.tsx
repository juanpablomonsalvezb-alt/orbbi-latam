'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

/* Three.js canvas — SSR off to avoid hydration mismatch */
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

/* —— Line clip reveal — the Awwwards standard —— */
function Line({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div
        className={className}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* —— Scramble text badge —— */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·'
function ScrambleBadge({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const itersRef = useRef(0)

  useEffect(() => {
    let frame: number
    const interval = setInterval(() => {
      setDisplay(prev =>
        prev.split('').map((char, i) => {
          if (i < itersRef.current) return text[i]
          return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (itersRef.current >= text.length) clearInterval(interval)
      itersRef.current += 0.5
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>{display}</span>
  )
}

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '8rem',
        zIndex: 1,
        isolation: 'isolate',
      }}
    >
      {/* ── 3D Canvas ── */}
      <HeroCanvas />

      {/* ── Gradient: keeps text readable over sphere ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(9,9,14,0.96) 0%, rgba(9,9,14,0.55) 40%, rgba(9,9,14,0.15) 70%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>

        {/* Badge */}
        <div style={{ overflow: 'hidden', marginBottom: '3.2rem' }}>
          <motion.div
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '1rem',
                fontSize: '1.1rem', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.18em',
                color: 'rgba(201,169,110,0.65)',
                border: '1px solid rgba(201,169,110,0.18)',
                borderRadius: '10rem', padding: '0.8rem 1.6rem',
                background: 'rgba(201,169,110,0.04)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A96E' }} />
              <ScrambleBadge text="IA · MUJERES PROFESIONALES · LATINOAMÉRICA" />
            </span>
          </motion.div>
        </div>

        {/* Headline — word-by-word clip reveal */}
        <h1
          style={{
            fontFamily: '"disp", Georgia, serif',
            fontSize: 'clamp(4.8rem, 9.5vw, 13rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: '#F2EDE4',
            marginBottom: '4rem',
          }}
        >
          <Line delay={0.35}>
            La IA no vino
          </Line>
          <Line delay={0.5}>
            a{' '}
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #E8C987, #C9A96E 50%, #A07C45)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              reemplazarte.
            </em>
          </Line>
          <Line delay={0.65}>
            Vino a{' '}
            <em style={{ fontStyle: 'italic', color: '#F2EDE4' }}>
              multiplicarte.
            </em>
          </Line>
        </h1>

        {/* Sub + CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3.2rem',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1.4rem, 1.8vw, 1.8rem)',
                lineHeight: 1.75,
                color: 'rgba(242,237,228,0.52)',
                maxWidth: '52rem',
              }}
            >
              Formamos a mujeres líderes en Latinoamérica para dominar
              la inteligencia artificial. Sin tecnicismos. Con impacto real.
            </motion.p>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', flexWrap: 'wrap' }}
            >
              <a href="/#contacto" className="btn-primary">
                Diagnóstico gratuito
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/#servicios" className="btn-outline">Ver programas</a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '1.2rem',
            marginTop: '6rem',
          }}
        >
          <div style={{
            width: 24, height: 40, borderRadius: 12,
            border: '1px solid rgba(201,169,110,0.2)',
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', padding: '5px 0',
          }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 3, height: 7, borderRadius: 2,
                background: '#C9A96E',
              }}
            />
          </div>
          <span style={{
            fontSize: '1.1rem', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.18em',
            color: 'rgba(201,169,110,0.35)',
          }}>
            Scroll
          </span>
        </motion.div>

      </div>
    </section>
  )
}
