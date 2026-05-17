'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

/* Line-clip reveal — used by Harvey hero */
function R({ d = 0, children, style = {} }: { d?: number; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div initial={{ y: '106%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: d, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </div>
  )
}

const LOGOS = ['pwc', "O'Melveny", 'Bridgewater', 'MacFarlanes', 'KKR', 'Baker McKenzie', 'Cuatrecasas', 'EY']

export default function HeroSection() {
  return (
    <section className="sec-dark" style={{ minHeight: '100svh', position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* ── SPLIT LAYOUT ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', minHeight: '100svh' }} className="l:grid-cols-[1fr_1fr]">

        {/* LEFT: content — matches Harvey's ~45% left column */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '12rem 2.4rem 4rem',
          gap: '2.8rem',
        }} className="l:px-[5.6rem] l:py-[8rem]">

          {/* Headline — Harvey ~4-5rem serif */}
          <div>
            <R d={0.25}><h1 className="hero-headline">Tu carrera,</h1></R>
            <R d={0.38}><h1 className="hero-headline">potenciada</h1></R>
            <R d={0.50}><h1 className="hero-headline" style={{ color:'rgba(255,255,255,0.45)' }}>por IA.</h1></R>
          </div>

          {/* Subtext — Harvey style */}
          <R d={0.65}>
            <p style={{ fontSize:'1.6rem', lineHeight:1.65, color:'rgba(255,255,255,0.55)', maxWidth:'44rem' }}>
              Las mejores profesionales de Latinoamérica confían en Orbbi para potenciar su trabajo con inteligencia artificial y navegar la complejidad del futuro.
            </p>
          </R>

          {/* CTA — Harvey: single outlined button */}
          <R d={0.78}>
            <a href="/#contacto" className="btn-outline-w" style={{ alignSelf:'flex-start' }}>
              Diagnóstico gratis
            </a>
          </R>

          {/* "Our Customers" style link */}
          <R d={0.88}>
            <a href="/#testimonios" style={{ fontSize:'1.3rem', color:'rgba(255,255,255,0.45)', cursor:'none', display:'inline-flex', alignItems:'center', gap:'.8rem', transition:'color .3s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}
            >
              Nuestras clientas →
            </a>
          </R>
        </div>

        {/* RIGHT: photo — Harvey editorial dark photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          style={{ position: 'relative', minHeight: '50vh', overflow: 'hidden' }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Mujer profesional latinoamericana dominando la inteligencia artificial"
            fill priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            sizes="50vw"
          />
          {/* Dark overlay to blend with dark bg — Harvey signature */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(13,12,10,0.35) 0%, rgba(13,12,10,0.0) 40%), linear-gradient(to top, rgba(13,12,10,0.5) 0%, transparent 30%)',
          }} />
        </motion.div>
      </div>

      {/* LOGO STRIP — bottom, Harvey has partner logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '2rem 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5.6rem', flexWrap: 'wrap', gap: '2rem' }} className="wrap">
          <span style={{ fontSize:'1.1rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'.16em', color:'rgba(255,255,255,0.28)', flexShrink:0 }}>
            Profesionales en
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:'4rem', flexWrap:'wrap' }}>
            {LOGOS.map(l => (
              <span key={l} style={{ fontSize:'1.3rem', color:'rgba(255,255,255,0.35)', fontWeight:400, whiteSpace:'nowrap' }}>{l}</span>
            ))}
          </div>
          <a href="/#testimonios" style={{ fontSize:'1.2rem', color:'rgba(255,255,255,0.4)', cursor:'none', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'.5rem', padding:'.6rem 1.2rem', transition:'border-color .3s' }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.5)')}
            onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.2)')}
          >Nuestras clientas</a>
        </div>
      </motion.div>

    </section>
  )
}
