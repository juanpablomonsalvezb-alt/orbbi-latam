'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

type PlanId = 'diagnostico' | 'sesion' | 'programa'

async function iniciarPago(planId: PlanId, setLoading: (id: PlanId | null) => void) {
  setLoading(planId)
  try {
    const res = await fetch('/api/mp/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: planId }),
    })
    const data = await res.json()
    if (data.init_point) {
      window.location.href = data.init_point
    } else {
      alert('Error al iniciar el pago. Escríbenos a cseplataforma@gmail.com')
    }
  } catch {
    alert('Error al iniciar el pago. Escríbenos a cseplataforma@gmail.com')
  } finally {
    setLoading(null)
  }
}

const PLANES: {
  badge: string | null
  planId: PlanId
  name: string
  price: string
  period: string
  sub: string
  desc: string
  items: string[]
  cta: string
  highlight: boolean
}[] = [
  {
    badge: 'Gratis',
    planId: 'diagnostico',
    name: 'Diagnóstico',
    price: '$0',
    period: '',
    sub: '30 minutos · Sin costo',
    desc: 'Conversamos, entendemos tu situación y diseñamos tu plan de aprendizaje personalizado.',
    items: [
      'Videollamada de 30 minutos 1:1',
      'Diagnóstico de tu nivel actual con IA',
      'Plan de aprendizaje personalizado para ti',
      'Sin compromiso de compra',
    ],
    cta: 'Agendar diagnóstico gratis',
    highlight: false,
  },
  {
    badge: null,
    planId: 'sesion',
    name: '1 Sesión',
    price: '$90',
    period: 'USD',
    sub: '60 minutos',
    desc: 'Para quien quiere probar antes de comprometerse. Una sesión aplicada a tu trabajo real.',
    items: [
      '60 minutos de mentoría individual online',
      'Enfoque en tu flujo de trabajo concreto',
      'Recursos y prompts personalizados post-sesión',
      'Acceso por WhatsApp 48h post-sesión',
    ],
    cta: 'Empezar con 1 sesión',
    highlight: false,
  },
  {
    badge: 'Más elegido',
    planId: 'programa',
    name: '4 Sesiones',
    price: '$299',
    period: 'USD',
    sub: '1 sesión por semana durante 1 mes',
    desc: 'El programa que realmente transforma cómo trabajas. Resultados concretos en 4 semanas.',
    items: [
      '4 sesiones de 60 min — 1 por semana',
      'Plan de aprendizaje diseñado para ti',
      'Implementación guiada en tu trabajo real',
      'Soporte por WhatsApp entre sesiones',
      'Recursos, prompts y plantillas personalizadas',
      'Ahorras $61 vs. sesiones individuales',
    ],
    cta: 'Empezar el programa',
    highlight: true,
  },
]

export default function PreciosSection() {
  const [loading, setLoading] = useState<PlanId | null>(null)

  return (
    <section id="precios" className="sec-light sec-pad">
      <div className="page-wrap">

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:.8, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:80 }}
        >
          <p style={{ fontSize:14, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,14,13,0.4)', marginBottom:16 }}>Precios</p>
          <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,4vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', maxWidth:560 }}>
            Simple, claro,{' '}
            <em style={{ fontStyle:'italic', color:'#706D66' }}>sin sorpresas.</em>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, alignItems:'stretch' }}>
          {PLANES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:.7, delay:i*.08, ease:[0.16,1,0.3,1] }}
              style={{
                background: p.highlight ? '#0F0E0D' : '#FAFAF9',
                border: p.highlight ? 'none' : '1px solid rgba(15,14,13,0.1)',
                borderRadius:12,
                padding:'40px 36px 36px',
                display:'flex',
                flexDirection:'column',
                position:'relative',
              }}
            >
              {p.badge && (
                <span style={{
                  position:'absolute', top:20, right:20,
                  fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em',
                  color: p.badge === 'Gratis' ? '#0F0E0D' : '#FAFAF9',
                  background: p.badge === 'Gratis' ? '#6EE7A0' : 'rgba(250,250,249,0.15)',
                  borderRadius:100, padding:'4px 12px',
                }}>
                  {p.badge}
                </span>
              )}

              <p style={{
                fontSize:13, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em',
                color: p.highlight ? 'rgba(250,250,249,0.4)' : 'rgba(15,14,13,0.4)',
                marginBottom:24,
              }}>{p.name}</p>

              <div style={{ marginBottom:8 }}>
                <span style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(48px,5vw,72px)',
                  lineHeight:1, letterSpacing:'-0.03em', fontWeight:400,
                  color: p.highlight ? '#FAFAF9' : '#0F0E0D',
                }}>{p.price}</span>
                {' '}
                <span style={{ fontSize:16, color: p.highlight ? 'rgba(250,250,249,0.4)' : 'rgba(15,14,13,0.4)' }}>{p.period}</span>
              </div>

              <p style={{
                fontSize:13,
                color: p.highlight ? 'rgba(250,250,249,0.35)' : 'rgba(15,14,13,0.4)',
                marginBottom:24,
              }}>{p.sub}</p>

              <div style={{ height:1, background: p.highlight ? 'rgba(250,250,249,0.1)' : 'rgba(15,14,13,0.08)', marginBottom:24 }} />

              <p style={{
                fontSize:14, lineHeight:'22px',
                color: p.highlight ? 'rgba(250,250,249,0.6)' : 'rgba(15,14,13,0.55)',
                marginBottom:28,
              }}>{p.desc}</p>

              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12, flex:1, marginBottom:36 }}>
                {p.items.map((item, j) => (
                  <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, marginTop:3 }}>
                      <path d="M2 7l3.5 3.5L12 3" stroke={p.highlight ? 'rgba(250,250,249,0.5)' : 'rgba(15,14,13,0.35)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize:14, lineHeight:'20px', color: p.highlight ? 'rgba(250,250,249,0.7)' : 'rgba(15,14,13,0.65)' }}>{item}</span>
                  </li>
                ))}
              </ul>

              {p.planId === 'diagnostico' ? (
                <a
                  href="/#contacto"
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    height:44, borderRadius:4, width:'100%',
                    background:'#0F0E0D',
                    border:'none',
                    color:'#FAFAF9',
                    fontSize:14, fontWeight:500,
                    fontFamily:'"sans",system-ui,sans-serif',
                    cursor:'pointer',
                    transition:'opacity .2s',
                    textDecoration:'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '.8' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {p.cta}
                </a>
              ) : (
                <button
                  onClick={() => iniciarPago(p.planId, setLoading)}
                  disabled={loading !== null}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    height:44, borderRadius:4, width:'100%',
                    background: p.highlight ? '#FAFAF9' : 'transparent',
                    border: p.highlight ? 'none' : '1px solid rgba(15,14,13,0.25)',
                    color: '#0F0E0D',
                    fontSize:14, fontWeight:500,
                    fontFamily:'"sans",system-ui,sans-serif',
                    cursor: loading ? 'wait' : 'pointer',
                    transition:'opacity .2s',
                    opacity: loading && loading !== p.planId ? 0.4 : 1,
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '.8' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
                >
                  {loading === p.planId ? 'Redirigiendo…' : p.cta}
                </button>
              )}

            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:.6, delay:.3 }}
          style={{ textAlign:'center', fontSize:13, color:'rgba(15,14,13,0.35)', marginTop:32 }}
        >
          Pago seguro con MercadoPago · El diagnóstico es siempre sin costo
        </motion.p>

      </div>
    </section>
  )
}
