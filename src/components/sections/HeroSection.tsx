'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const SLIDES = [
  { src: '/images/slide-1.webp', alt: 'Profesional hombre joven con IA', pos: 'center 20%' },
  { src: '/images/slide-2.webp', alt: 'Profesional hombre 45 usando IA', pos: 'center 20%' },
  { src: '/images/slide-3.webp', alt: 'Profesional mujer 50 usando IA', pos: 'center 20%' },
  { src: '/images/slide-4.webp', alt: 'Profesional mujer joven usando IA', pos: 'center 20%' },
  { src: '/images/slide-5.webp', alt: 'Profesional mujer joven con laptop', pos: 'center 20%' },
]

const LOGOS = ['McKinsey','Deloitte','PwC','KPMG','Accenture','EY','Santander','BBVA','BCI','Falabella','Rappi','Mercado Libre']

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="sec-dark"
      style={{ position:'relative', minHeight:'100svh', overflow:'hidden' }}
    >
      {/* ── Slideshow background ── */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        {/* Preload siguiente slide silenciosamente */}
        <div style={{ display:'none' }}>
          <Image
            src={SLIDES[(current + 1) % SLIDES.length].src}
            alt=""
            fill
            sizes="1px"
          />
        </div>
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ position:'absolute', inset:0, willChange:'opacity' }}
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              priority={current === 0}
              style={{ objectFit:'cover', objectPosition: SLIDES[current].pos }}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Harvey has a subtle dark gradient on the left where text sits */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right, rgba(15,14,13,0.75) 0%, rgba(15,14,13,0.45) 45%, rgba(15,14,13,0.1) 70%, transparent 100%)',
        }} />
        {/* Bottom gradient for legibility */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:'40%',
          background:'linear-gradient(to top, rgba(15,14,13,0.6) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Content — Harvey: absolute bottom, 36px padding ── */}
      <div
        style={{
          position:'relative', zIndex:1,
          display:'flex', flexDirection:'column', justifyContent:'flex-end',
          minHeight:'100svh',
          paddingBottom:80,
        }}
      >
        <div className="page-wrap">
          {/* Harvey: grid grid-cols-2, text only in left col */}
          <div style={{ maxWidth:660 }}>

            {/* Headline — 80px, lh 84px, ls -1px */}
            <motion.h1
              className="t-hero"
              initial={{ opacity:0, y:32 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.9, delay:.2, ease:[0.16,1,0.3,1] }}
              style={{ marginBottom:20 }}
            >
              Aprende IA.<br />Aplícala<br /><span style={{ color:'rgba(250,250,249,0.55)' }}>a tu trabajo.</span>
            </motion.h1>

            {/* Subtext — 20px, lh 26px, max-width 600px */}
            <motion.p
              className="t-body-lg"
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.8, delay:.45, ease:[0.16,1,0.3,1] }}
              style={{ color:'rgba(250,250,249,0.85)', maxWidth:600, marginBottom:36 }}
            >
              Mentoría personalizada 1:1, 100% online. Aprendes lo que necesitas, aplicado exactamente a tu profesión. Sin cursos genéricos, sin teoría vacía.
            </motion.p>

            {/* CTAs — Harvey: "Request a Demo" button + "Our Customers" link */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.7, delay:.65, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start' }}
            >
              <a href="/#contacto" className="btn-hero">
                Primera mentoría gratis
              </a>
              <a href="/#testimonios"
                style={{ fontSize:14, color:'rgba(250,250,249,0.6)', cursor:'pointer', transition:'color .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.6)')}
              >
                Ver testimonios →
              </a>
            </motion.div>

          </div>
        </div>

        {/* ── Slide dots ── */}
        <div style={{
          position:'absolute', bottom: 96, right: 40,
          display:'flex', flexDirection:'column', gap: 8, zIndex: 2,
        }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 6,
                height: i === current ? 24 : 6,
                borderRadius: 4,
                background: i === current ? '#FAFAF9' : 'rgba(250,250,249,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

      </div>

      {/* ── Logo bar — Harvey: bottom strip with partner logos ── */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.2, duration:.8 }}
        style={{
          position:'absolute', bottom:0, left:0, right:0, zIndex:2,
          borderTop:'1px solid rgba(250,250,249,0.12)',
          background:'rgba(15,14,13,0.5)',
          backdropFilter:'blur(8px)',
          padding:'12px 0',
          overflow:'hidden',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          {/* Fade left/right */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120, background:'linear-gradient(to right, rgba(15,14,13,0.8), transparent)', zIndex:1 }} />
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120, background:'linear-gradient(to left, rgba(15,14,13,0.8), transparent)', zIndex:1 }} />
          <div className="logos-track">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} style={{ fontSize:13, fontWeight:500, color:'rgba(250,250,249,0.35)', letterSpacing:0.5, whiteSpace:'nowrap' }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  )
}
