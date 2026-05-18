'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    n: '01',
    title: 'Formación Esencial',
    sub: 'Las herramientas de IA más importantes.',
    body: 'Aprende ChatGPT, Claude, Gemini y las herramientas de IA más utilizadas globalmente. Curso práctico, aplicado a tu trabajo. Ideal para quien quiere empezar o ir más a fondo.',
    tags: ['8 semanas', 'Grupal o individual', 'Certificado'],
  },
  {
    n: '02',
    title: 'Orientación 1:1',
    sub: 'IA aplicada a tu profesión.',
    body: 'Sesiones individuales donde mapeamos qué herramientas necesitas para tu cargo específico. Tú trabajas, nosotros te guiamos. Sin contenido genérico, sin teoría vacía.',
    tags: ['4 sesiones 1:1', 'Plan a medida', 'Seguimiento 30 días'],
  },
  {
    n: '03',
    title: 'Programa a tu Medida',
    sub: 'Aprendes lo que tú necesitas aprender.',
    body: '¿Tienes un programa específico en mente? ¿Necesitas dominar una herramienta concreta para tu trabajo? Diseñamos las sesiones exactamente para eso.',
    tags: ['Desarrollo completo', 'Capacitación incluida', 'Soporte técnico'],
  },
  {
    n: '04',
    title: 'Equipos y Empresas',
    sub: 'IA para todo tu equipo.',
    body: 'Programas para equipos completos adaptados a tu industria. Diagnóstico, formación y métricas de impacto reales.',
    tags: ['Diagnóstico organizacional', 'Programa personalizado', 'Métricas de impacto'],
  },
]

export default function ServicesSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="servicios" className="sec-light sec-pad">
      <div className="page-wrap">

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:80, flexWrap:'wrap', gap:24 }}
        >
          <div>
            <p style={{ fontSize:14, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,14,13,0.4)', marginBottom:16 }}>Servicios</p>
            <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,4vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', maxWidth:560 }}>
              Cómo trabajamos{' '}
              <em style={{ fontStyle:'italic', color:'#706D66' }}>contigo.</em>
            </h2>
          </div>
          <a href="/#contacto" className="btn-explore" style={{ flexShrink:0 }}>
            Hablar con nosotros
          </a>
        </motion.div>

        <div>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.5, delay:i*.06 }}
            >
              <div className="rule-light" />
              <div
                style={{ padding:'28px 0', cursor:'pointer' }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:40 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:28, flex:1 }}>
                    <span style={{ fontSize:14, fontWeight:500, color:'rgba(15,14,13,0.25)', minWidth:28, flexShrink:0 }}>{s.n}</span>
                    <div style={{ flex:1 }}>
                      <h3 style={{
                        fontFamily:'"disp",Georgia,serif',
                        fontSize:'clamp(24px,2.8vw,40px)',
                        lineHeight:1.1,
                        letterSpacing:'-0.02em',
                        fontWeight:400,
                        color:'#0F0E0D',
                        marginBottom:6,
                      }}>
                        {s.title}
                      </h3>
                      <p style={{ fontSize:14, color:'#706D66' }}>{s.sub}</p>
                    </div>
                  </div>
                  <svg
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ color:'rgba(15,14,13,0.3)', flexShrink:0, transition:'transform .3s', transform: open===i ? 'rotate(45deg)' : 'none' }}
                  >
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:.4, ease:[0.16,1,0.3,1] }}
                      style={{ overflow:'hidden' }}
                    >
                      <div style={{ paddingTop:24, paddingLeft:56, paddingBottom:8, display:'flex', alignItems:'flex-start', gap:48, flexWrap:'wrap' }}>
                        <p style={{ fontSize:16, lineHeight:'24px', color:'rgba(15,14,13,0.65)', maxWidth:520 }}>{s.body}</p>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                          {s.tags.map(t => (
                            <span key={t} style={{
                              fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em',
                              color:'#0F0E0D', border:'1px solid rgba(15,14,13,0.2)',
                              borderRadius:100, padding:'6px 12px', whiteSpace:'nowrap',
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ paddingLeft:56, paddingBottom:16 }}>
                        <a href="/#contacto"
                          style={{ fontSize:13, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'#0F0E0D', display:'inline-flex', alignItems:'center', gap:8, transition:'opacity .2s' }}
                          onMouseEnter={e=>(e.currentTarget.style.opacity='.5')}
                          onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
                        >
                          Solicitar información
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
          <div className="rule-light" />
        </div>

      </div>
    </section>
  )
}
