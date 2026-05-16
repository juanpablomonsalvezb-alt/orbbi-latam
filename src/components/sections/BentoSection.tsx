'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const anim = (delay = 0) => ({
  initial: { opacity:0, y:32 },
  whileInView: { opacity:1, y:0 },
  viewport: { once:true, margin:'-60px' },
  transition: { duration:.8, delay, ease:[0.16,1,0.3,1] as any },
})

export default function BentoSection() {
  return (
    <section className="section" style={{ background:'#FAFAF8' }}>
      <div className="wrap">

        <motion.div {...anim()} style={{ marginBottom:'6rem' }}>
          <p className="label" style={{ marginBottom:'1.6rem' }}>Programas & Perfiles</p>
          <h2 className="headline" style={{ maxWidth:'64rem' }}>
            Cuatro programas. Seis perfiles. Una sola misión:{' '}
            <em style={{ fontStyle:'italic', color:'#C9A96E' }}>que la IA trabaje para ti.</em>
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <div className="bento">

          {/* A — Large dark card: Formación + imagen */}
          <motion.div
            {...anim(.05)}
            className="bento-a"
            style={{
              background:'#1A3328', borderRadius:'2rem',
              overflow:'hidden', position:'relative',
              minHeight:'48rem', display:'flex', flexDirection:'column', justifyContent:'flex-end',
            }}
          >
            <Image src="/images/pay-equity.jpg" alt="Formación en IA" fill style={{ objectFit:'cover', objectPosition:'center', opacity:.35 }} sizes="55vw" />
            <div style={{ position:'relative', zIndex:1, padding:'3.6rem 4rem' }}>
              <span style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.18em',color:'rgba(201,169,110,0.7)',display:'block',marginBottom:'1.2rem' }}>01 · Formación Esencial</span>
              <h3 className="title" style={{ color:'#FAFAF8', marginBottom:'1.2rem' }}>De cero a productiva en 8 semanas.</h3>
              <p style={{ fontSize:'1.3rem',lineHeight:1.75,color:'rgba(250,250,248,0.5)',maxWidth:'44rem' }}>
                Domina ChatGPT, automatización y herramientas de productividad. Todo aplicado a tu trabajo real.
              </p>
              <a href="/#contacto" className="btn-gold" style={{ marginTop:'2.4rem',display:'inline-flex' }}>
                Solicitar información
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.div>

          {/* B — Warm cream card: Orientación */}
          <motion.div
            {...anim(.1)}
            className="bento-b"
            style={{
              background:'#F0EBE3', borderRadius:'2rem',
              padding:'3.6rem 3.6rem', display:'flex', flexDirection:'column', justifyContent:'space-between',
              minHeight:'48rem',
            }}
          >
            <div>
              <span className="label" style={{ display:'block', marginBottom:'2.4rem' }}>02 · Orientación Profesional</span>
              <h3 className="title" style={{ color:'#111110', marginBottom:'1.6rem' }}>IA diseñada para tu cargo específico.</h3>
              <p style={{ fontSize:'1.3rem',lineHeight:1.75,color:'rgba(17,17,16,0.52)' }}>
                Sesiones 1:1. Diagnóstico, plan de implementación y acompañamiento 30 días.
              </p>
            </div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:'.8rem' }}>
              {['4 sesiones 1:1','Plan a medida','Seguimiento'].map(t=>(
                <span key={t} style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.12em',color:'#1A3328',border:'1px solid rgba(26,51,40,0.2)',borderRadius:'10rem',padding:'.6rem 1.2rem',background:'rgba(26,51,40,0.05)' }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* C — Image card: Ejecutiva */}
          <motion.div {...anim(.15)} className="bento-c" style={{ borderRadius:'2rem',overflow:'hidden',position:'relative',minHeight:'32rem' }}>
            <Image src="/images/gender.png" alt="Ejecutiva" fill style={{ objectFit:'cover',objectPosition:'center' }} sizes="33vw" />
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,8,0.8) 0%,transparent 55%)' }} />
            <div style={{ position:'absolute',bottom:'2.4rem',left:'2.8rem',right:'2.8rem' }}>
              <p className="label" style={{ color:'rgba(201,169,110,0.7)',marginBottom:'.8rem' }}>Perfil</p>
              <h3 style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(2rem,2.4vw,2.8rem)',color:'#FAFAF8',lineHeight:1.2,letterSpacing:'-0.01em' }}>Ejecutiva & Directiva</h3>
            </div>
          </motion.div>

          {/* D — Forest green: Herramienta a Medida */}
          <motion.div
            {...anim(.2)}
            className="bento-d"
            style={{
              background:'#1A3328', borderRadius:'2rem',
              padding:'3.6rem 3.6rem', minHeight:'32rem',
              display:'flex', flexDirection:'column', justifyContent:'space-between',
            }}
          >
            <div>
              <span className="label" style={{ color:'rgba(201,169,110,0.6)',display:'block',marginBottom:'2.4rem' }}>03 · Herramienta a Medida</span>
              <h3 className="title" style={{ color:'#FAFAF8',lineHeight:1.15,marginBottom:'1.6rem' }}>Tu propio asistente de IA, construido para ti.</h3>
              <p style={{ fontSize:'1.3rem',lineHeight:1.75,color:'rgba(250,250,248,0.45)' }}>Desarrollamos una herramienta que conoce tu sector y trabaja contigo.</p>
            </div>
            <a href="/#contacto" style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'#C9A96E',cursor:'none',display:'inline-flex',alignItems:'center',gap:'.8rem' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='.7')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
            >
              Solicitar
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>

          {/* E — Image: Emprendedora */}
          <motion.div {...anim(.25)} className="bento-e" style={{ borderRadius:'2rem',overflow:'hidden',position:'relative',minHeight:'32rem' }}>
            <Image src="/images/restaurant.png" alt="Emprendedora" fill style={{ objectFit:'cover',objectPosition:'center' }} sizes="33vw" />
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,8,0.8) 0%,transparent 55%)' }} />
            <div style={{ position:'absolute',bottom:'2.4rem',left:'2.8rem',right:'2.8rem' }}>
              <p className="label" style={{ color:'rgba(201,169,110,0.7)',marginBottom:'.8rem' }}>Perfil</p>
              <h3 style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(2rem,2.4vw,2.8rem)',color:'#FAFAF8',lineHeight:1.2,letterSpacing:'-0.01em' }}>Emprendedora</h3>
            </div>
          </motion.div>

        </div>

        {/* "Ver todos los servicios" link */}
        <motion.div {...anim(.3)} style={{ display:'flex',justifyContent:'center',marginTop:'4rem' }}>
          <a href="/#contacto" className="btn-outline">
            04 · Programas Corporativos — Conocer más
          </a>
        </motion.div>

      </div>
    </section>
  )
}
