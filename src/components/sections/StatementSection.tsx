'use client'
import { motion } from 'framer-motion'

export default function StatementSection() {
  return (
    <section className="sec-paper" style={{ padding:'8rem 0 0' }}>
      <div className="wrap" style={{ paddingBottom:'6rem' }}>

        {/* Harvey's exact layout: bold statement left, muted continuation */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-100px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ maxWidth:'72rem' }}
        >
          <p>
            <span className="statement-text">
              Orbbi es IA diseñada para mujeres profesionales en Latinoamérica.{' '}
            </span>
            <span className="statement-sub">
              Potencia tu experiencia en una plataforma que te permite enfocarte en el trabajo que importa.
            </span>
          </p>
        </motion.div>

      </div>

      {/* Dark product card — Harvey's rounded dark rectangle showing the interface */}
      <motion.div
        initial={{ opacity:0, y:32 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-80px' }}
        transition={{ duration:.9, delay:.15, ease:[0.16,1,0.3,1] }}
        style={{
          margin:'0 2.4rem 0',
          borderRadius:'1.6rem 1.6rem 0 0',
          background:'#1A1916',
          minHeight:'36rem',
          display:'flex', alignItems:'center', justifyContent:'center',
          overflow:'hidden',
          position:'relative',
        }}
        className="l:mx-[5.6rem]"
      >
        {/* Logo mark — Harvey shows their H logomark */}
        <div style={{
          fontFamily:'"disp",Georgia,serif',
          fontSize:'clamp(8rem,12vw,16rem)',
          color:'rgba(255,255,255,0.12)',
          lineHeight:1,
          userSelect:'none',
        }}>
          O
        </div>
        {/* Subtle grid overlay */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize:'8rem 8rem',
        }} />
      </motion.div>

    </section>
  )
}
