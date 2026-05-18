'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

/* Harvey hero — exact structure:
   - section position:relative, bg #0F0E0D, height ~804px (100vh)
   - video: absolute inset-0, z-0, object-cover
   - content: grid grid-cols-2, px 36px, absolute bottom ~80px
   - H1: 80px, lh 84px, ls -1px, weight 400, white
   - Sub: 20px, lh 26px, max-width 600px, white
   - CTA: btn-demo style (solid white), slightly bigger for hero
   - "Our Customers" link below CTA
   - Logo bar at very bottom
*/

const LOGOS = ['McKinsey','Deloitte','PwC','KPMG','Accenture','EY','Santander','BBVA','BCI','Falabella','Rappi','Mercado Libre']

export default function HeroSection() {
  return (
    <section
      className="sec-dark"
      style={{ position:'relative', minHeight:'100svh', overflow:'hidden' }}
    >
      {/* ── Video/Image background — absolute inset-0 ── */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Image
          src="/images/hero.jpg"
          alt="Profesionales usando inteligencia artificial"
          fill priority
          style={{ objectFit:'cover', objectPosition:'center 20%' }}
          sizes="100vw"
        />
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
              Tu carrera,<br />potenciada<br /><span style={{ color:'rgba(250,250,249,0.55)' }}>por IA.</span>
            </motion.h1>

            {/* Subtext — 20px, lh 26px, max-width 600px */}
            <motion.p
              className="t-body-lg"
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.8, delay:.45, ease:[0.16,1,0.3,1] }}
              style={{ color:'rgba(250,250,249,0.85)', maxWidth:600, marginBottom:36 }}
            >
              Los mejores profesionales de Latinoamérica confían en Orbbi para integrar inteligencia artificial a su trabajo y multiplicar sus resultados.
            </motion.p>

            {/* CTAs — Harvey: "Request a Demo" button + "Our Customers" link */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:.7, delay:.65, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start' }}
            >
              <a href="/#contacto" className="btn-hero">
                Diagnóstico gratis
              </a>
              <a href="/#testimonios"
                style={{ fontSize:14, color:'rgba(250,250,249,0.6)', cursor:'pointer', transition:'color .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.6)')}
              >
                Ver casos de éxito →
              </a>
            </motion.div>

          </div>
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
