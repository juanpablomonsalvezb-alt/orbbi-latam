'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

function Line({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow:'hidden', ...style }}>
      <motion.div
        initial={{ y:'106%' }}
        animate={{ y:0 }}
        transition={{ duration:1.1, delay, ease:[0.16,1,0.3,1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight:'100svh',
        display:'grid',
        gridTemplateColumns:'1fr',
        position:'relative',
        background:'#F7F3EE',
      }}
    >
      {/* ── Desktop: split layout ── */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr',
        minHeight:'100svh',
      }} className="l:grid-cols-[1fr_1fr]" >

        {/* Left — text */}
        <div
          style={{
            display:'flex', flexDirection:'column', justifyContent:'flex-end',
            padding:'10rem 2.4rem 6rem',
            position:'relative', zIndex:2,
          }}
          className="l:px-48 l:py-80"
        >
          {/* Tag */}
          <div style={{ overflow:'hidden', marginBottom:'3.2rem' }}>
            <motion.div
              initial={{ y:'120%' }}
              animate={{ y:0 }}
              transition={{ duration:.7, delay:.15, ease:[0.16,1,0.3,1] }}
            >
              <span className="pill">
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#1E3A2F',flexShrink:0 }} />
                IA para mujeres profesionales
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="t-hero" style={{ marginBottom:'3.2rem' }}>
            <Line delay={.3}>La IA no vino</Line>
            <Line delay={.45}>
              a{' '}
              <em style={{ fontStyle:'italic', color:'#B8924A' }}>reemplazarte.</em>
            </Line>
            <Line delay={.6}>
              Vino a{' '}
              <em style={{ fontStyle:'italic', color:'#1E3A2F' }}>multiplicarte.</em>
            </Line>
          </h1>

          {/* Sub */}
          <div style={{ overflow:'hidden', marginBottom:'4rem' }}>
            <motion.p
              className="t-body"
              initial={{ y:'100%' }}
              animate={{ y:0 }}
              transition={{ duration:.9, delay:.8, ease:[0.16,1,0.3,1] }}
              style={{ maxWidth:'44rem' }}
            >
              Formamos a mujeres líderes en Latinoamérica para dominar
              la inteligencia artificial en su trabajo real.
              Sin tecnicismos. Con resultados medibles.
            </motion.p>
          </div>

          {/* CTAs */}
          <div style={{ overflow:'hidden' }}>
            <motion.div
              initial={{ y:'100%' }}
              animate={{ y:0 }}
              transition={{ duration:.8, delay:1, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexWrap:'wrap', gap:'1.6rem', alignItems:'center' }}
            >
              <a href="/#contacto" className="btn-primary">
                Diagnóstico gratuito
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/#servicios" className="btn-outline">Ver programas</a>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.8, delay:1.3, ease:'easeOut' }}
            style={{
              display:'flex', gap:'4rem', flexWrap:'wrap',
              marginTop:'6rem', paddingTop:'4rem',
              borderTop:'1px solid rgba(28,28,26,0.1)',
            }}
          >
            {[
              { n:'847+', label:'Mujeres formadas' },
              { n:'12',   label:'Países' },
              { n:'94%',  label:'Satisfacción' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2.8rem,3.5vw,4.8rem)', lineHeight:1, color:'#1E3A2F', letterSpacing:'-0.02em' }}>{s.n}</p>
                <p className="t-small" style={{ marginTop:'.6rem' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — image (hidden on mobile, visible on desktop) */}
        <motion.div
          initial={{ opacity:0, scale:1.04 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:1.4, delay:.2, ease:[0.16,1,0.3,1] }}
          style={{
            position:'relative',
            minHeight:'50vh',
            overflow:'hidden',
            display:'none',
          }}
          className="l:block"
        >
          <Image
            src="/images/hero.jpg"
            alt="Mujeres profesionales aprendiendo inteligencia artificial en Latinoamérica"
            fill
            priority
            style={{ objectFit:'cover', objectPosition:'center' }}
            sizes="50vw"
          />
          {/* Subtle gradient on left edge to blend with content */}
          <div style={{
            position:'absolute', top:0, left:0, bottom:0, width:'12rem',
            background:'linear-gradient(to right, #F7F3EE, transparent)',
          }} />
        </motion.div>

        {/* Mobile image below text */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:1, delay:.5 }}
          style={{
            position:'relative', height:'50vw', minHeight:'28rem',
            overflow:'hidden', margin:'0 2.4rem 4rem', borderRadius:'1.6rem',
          }}
          className="l:hidden"
        >
          <Image
            src="/images/hero.jpg"
            alt="Mujeres profesionales aprendiendo inteligencia artificial"
            fill
            priority
            style={{ objectFit:'cover', objectPosition:'center top' }}
            sizes="100vw"
          />
        </motion.div>

      </div>
    </section>
  )
}
