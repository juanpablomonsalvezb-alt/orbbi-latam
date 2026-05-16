'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section style={{ position:'relative', height:'100svh', overflow:'hidden', background:'#111110' }}>

      {/* ── FULL BLEED IMAGE ── */}
      <Image
        src="/images/hero.jpg"
        alt="Mujeres profesionales latinoamericanas aprendiendo inteligencia artificial"
        fill priority
        style={{ objectFit:'cover', objectPosition:'center 20%' }}
        sizes="100vw"
      />

      {/* ── Cinematic gradient: dark bottom, slight top vignette ── */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(10,10,8,0.92) 0%, rgba(10,10,8,0.55) 35%, rgba(10,10,8,0.15) 65%, rgba(10,10,8,0.35) 100%)',
      }} />

      {/* ── Top-left: badge ── */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:1, delay:.3 }}
        style={{
          position:'absolute', top:'8rem', left:'2.4rem',
          display:'flex', alignItems:'center', gap:'.8rem',
        }}
        className="l:left-48"
      >
        <span style={{ width:5,height:5,borderRadius:'50%',background:'#C9A96E',display:'block' }} />
        <span style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.18em',color:'rgba(250,250,248,0.55)' }}>
          IA para Mujeres Profesionales · Latinoamérica
        </span>
      </motion.div>

      {/* ── Bottom-left: headline ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'4rem 2.4rem',
        display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'4rem',
      }} className="l:px-48 l:pb-56">

        <div>
          {/* Line 1 */}
          <div style={{ overflow:'hidden' }}>
            <motion.h1
              initial={{ y:'108%' }}
              animate={{ y:0 }}
              transition={{ duration:1.1, delay:.25, ease:[0.16,1,0.3,1] }}
              className="display"
              style={{ color:'#FAFAF8', display:'block' }}
            >
              La IA no vino
            </motion.h1>
          </div>
          {/* Line 2 */}
          <div style={{ overflow:'hidden' }}>
            <motion.span
              initial={{ y:'108%' }}
              animate={{ y:0 }}
              transition={{ duration:1.1, delay:.42, ease:[0.16,1,0.3,1] }}
              className="display"
              style={{ color:'#FAFAF8', display:'block' }}
            >
              a{' '}
              <em style={{ fontStyle:'italic', color:'#C9A96E' }}>reemplazarte.</em>
            </motion.span>
          </div>
          {/* Line 3 */}
          <div style={{ overflow:'hidden' }}>
            <motion.span
              initial={{ y:'108%' }}
              animate={{ y:0 }}
              transition={{ duration:1.1, delay:.58, ease:[0.16,1,0.3,1] }}
              className="display"
              style={{ color:'#FAFAF8', display:'block' }}
            >
              Vino a{' '}
              <em style={{ fontStyle:'italic', color:'rgba(250,250,248,0.65)' }}>multiplicarte.</em>
            </motion.span>
          </div>
        </div>

        {/* Bottom-right: CTA + sub */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.9, delay:.9, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', flexDirection:'column', gap:'2rem', alignItems:'flex-end', flexShrink:0 }}
          className="hidden s:flex"
        >
          <p style={{ fontSize:'1.4rem',color:'rgba(250,250,248,0.5)',textAlign:'right',maxWidth:'28rem',lineHeight:1.7 }}>
            Formamos a mujeres líderes en Latinoamérica para dominar la inteligencia artificial.
          </p>
          <div style={{ display:'flex',gap:'1.2rem' }}>
            <a href="/#contacto" className="btn-gold">
              Diagnóstico gratuito
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/#servicios" className="btn-ghost">Ver programas</a>
          </div>
        </motion.div>
      </div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.1, duration:.8 }}
        style={{ position:'absolute', bottom:'2rem', right:'2.4rem' }}
        className="s:hidden"
      >
        <a href="/#contacto" className="btn-gold" style={{ fontSize:'1.1rem',padding:'1rem 2rem' }}>
          Diagnóstico gratis
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.5, duration:1 }}
        style={{ position:'absolute', bottom:'2.4rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.8rem' }}
      >
        <motion.div
          animate={{ y:[0,8,0] }}
          transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
          style={{ width:1, height:'3.2rem', background:'linear-gradient(to bottom, rgba(250,250,248,0.5), transparent)' }}
        />
      </motion.div>

    </section>
  )
}
