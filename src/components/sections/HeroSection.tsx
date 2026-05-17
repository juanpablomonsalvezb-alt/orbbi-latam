'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', height: '100svh', overflow: 'hidden', background: '#0A0A0B' }}>

      {/* Full-bleed cinematic image */}
      <Image
        src="/images/hero.jpg"
        alt="Mujeres profesionales líderes en inteligencia artificial — Orbbi Latam"
        fill priority
        style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
        sizes="100vw"
      />

      {/* Multi-layer cinematic gradient — heavy at bottom, light at top */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to top, rgba(8,8,9,0.96) 0%, rgba(8,8,9,0.72) 30%, rgba(8,8,9,0.30) 55%, rgba(8,8,9,0.50) 100%)',
        ].join(','),
      }} />

      {/* Content — LEFT aligned, bottom third */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '4.8rem 2.4rem 5.6rem',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4rem',
        }}
        className="l:px-[6.4rem] l:pb-[7.2rem]"
      >
        {/* Left: headline */}
        <div style={{ flex: 1, maxWidth: '96rem' }}>
          {/* Label */}
          <Reveal delay={0.15}>
            <p style={{ fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)', marginBottom: '2.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.35)', display: 'inline-block' }} />
              IA para Mujeres Profesionales · Latinoamérica
            </p>
          </Reveal>

          {/* Big headline — left aligned */}
          <Reveal delay={0.28}>
            <h1 className="display" style={{ color: '#FFFFFF' }}>
              Tu carrera,
            </h1>
          </Reveal>
          <Reveal delay={0.42}>
            <h1 className="display" style={{ color: '#FFFFFF' }}>
              potenciada
            </h1>
          </Reveal>
          <Reveal delay={0.56}>
            <h1 className="display" style={{ color: '#FFFFFF' }}>
              por{' '}
              <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>IA.</em>
            </h1>
          </Reveal>

          {/* Sub + CTA — mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '3.6rem' }}
          >
            <p style={{ fontSize: '1.6rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.52)', maxWidth: '52rem', marginBottom: '3rem' }}>
              Formamos a mujeres líderes para dominar la inteligencia artificial en su trabajo real. Sin tecnicismos. Con resultados medibles.
            </p>
            <div style={{ display: 'flex', gap: '1.6rem', flexWrap: 'wrap' }}>
              <a href="/#contacto" className="btn-white">
                Diagnóstico gratuito
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/#programas" className="btn-ghost-w">Ver programas</a>
            </div>
          </motion.div>
        </div>

        {/* Right: stats strip — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            display: 'flex', flexDirection: 'column', gap: '2.8rem',
            alignItems: 'flex-end', flexShrink: 0,
          }}
          className="hidden l:flex"
        >
          {[
            { n: '847+', l: 'Mujeres formadas' },
            { n: '12',   l: 'Países de Latam' },
            { n: '94%',  l: 'Satisfacción' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: '"disp",Georgia,serif', fontSize: 'clamp(3.2rem,4vw,5.6rem)', lineHeight: 1, color: '#FFFFFF', letterSpacing: '-0.025em' }}>{s.n}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', marginTop: '.4rem' }}>{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ position: 'absolute', bottom: '2.4rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: '3.6rem', background: 'linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)', margin: '0 auto' }}
        />
      </motion.div>

    </section>
  )
}
