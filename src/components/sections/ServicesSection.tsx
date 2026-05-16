'use client'
import { motion } from 'framer-motion'

const SERVICES = [
  { n:'01', title:'Formación Esencial', sub:'De cero a productiva en 8 semanas.', body:'Un programa intensivo y práctico para dominar ChatGPT, herramientas de automatización y IA de productividad. Todo aplicado a tu trabajo real.', tags:['8 semanas','Grupal o individual','Certificado'] },
  { n:'02', title:'Orientación Profesional', sub:'IA diseñada para tu cargo específico.', body:'Sesiones 1:1 donde mapeamos exactamente qué herramientas necesitas para tu rol. Diagnóstico, plan e implementación personalizada.', tags:['4 sesiones 1:1','Plan a medida','Seguimiento 30 días'] },
  { n:'03', title:'Herramienta a Medida', sub:'Tu propio asistente de IA.', body:'Desarrollamos una herramienta de IA diseñada exclusivamente para tus procesos. Un asistente que conoce tu sector y trabaja contigo.', tags:['Desarrollo completo','Capacitación','Soporte técnico'] },
  { n:'04', title:'Programas Corporativos', sub:'IA para todo tu equipo.', body:'Formamos equipos completos con un programa diseñado para tu industria y objetivos. Métricas de impacto y seguimiento continuo.', tags:['Diagnóstico organizacional','Programa personalizado','Métricas de impacto'] },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="section" style={{ background:'#F7F3EE' }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.9, ease:[0.16,1,0.3,1] }}
          style={{ display:'flex', flexDirection:'column', gap:'2rem', marginBottom:'7rem' }}
          className="s:flex-row s:items-end s:justify-between"
        >
          <div>
            <p className="t-tag" style={{ marginBottom:'1.6rem' }}>Servicios</p>
            <h2 className="t-h2" style={{ maxWidth:'52rem' }}>
              Cuatro formas de transformar tu relación con la{' '}
              <em style={{ fontStyle:'italic', color:'#B8924A' }}>IA.</em>
            </h2>
          </div>
          <a href="/#contacto" className="btn-outline" style={{ flexShrink:0 }}>Hablar con una asesora</a>
        </motion.div>

        <div>
          {SERVICES.map((s,i) => (
            <motion.div
              key={s.n}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:.7, delay:i*.08, ease:[0.16,1,0.3,1] }}
              className="svc-row"
            >
              <div style={{ padding:'3.2rem 0' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'2.4rem' }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'2.4rem', flex:1 }}>
                    <span className="svc-num t-tag" style={{ color:'rgba(28,28,26,0.25)', minWidth:'3rem', flexShrink:0 }}>{s.n}</span>
                    <div style={{ flex:1 }}>
                      <h3 className="svc-title" style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2rem,2.8vw,3.6rem)', lineHeight:1.15, color:'#1C1C1A', letterSpacing:'-0.01em', marginBottom:'.6rem' }}>
                        {s.title}
                      </h3>
                      <p className="t-small">{s.sub}</p>
                    </div>
                  </div>
                  <svg className="svc-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color:'rgba(28,28,26,0.3)', flexShrink:0, marginTop:'8px' }}>
                    <path d="M4 10h12M12 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div className="svc-body">
                  <div style={{ paddingTop:'2.4rem', paddingLeft:'7.4rem', paddingBottom:'1.2rem', display:'flex', flexDirection:'column', gap:'2rem' }} className="s:flex-row s:gap-48">
                    <p className="t-body" style={{ maxWidth:'52rem', fontSize:'1.4rem' }}>{s.body}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'.8rem', flexShrink:0 }}>
                      {s.tags.map(t => (
                        <span key={t} style={{ fontSize:'1.1rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', color:'#1E3A2F', border:'1px solid rgba(30,58,47,0.2)', borderRadius:'10rem', padding:'.6rem 1.2rem', whiteSpace:'nowrap', background:'rgba(30,58,47,0.05)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ paddingLeft:'7.4rem', paddingBottom:'1rem' }}>
                    <a href="/#contacto" style={{ fontSize:'1.1rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'.14em', color:'#B8924A', cursor:'none', display:'inline-flex', alignItems:'center', gap:'.8rem', transition:'opacity .3s' }}
                      onMouseEnter={e=>(e.currentTarget.style.opacity='.7')}
                      onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
                    >
                      Solicitar información
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
