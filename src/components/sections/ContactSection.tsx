'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES  = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const PROGRAMAS = ['Formación Esencial (8 semanas)','Orientación Profesional 1:1','Herramienta de IA a Medida','Programa Corporativo','Necesito orientación']

type F = { nombre:string; email:string; cargo:string; pais:string; programa:string; mensaje:string }
type E = Partial<Record<keyof F,string>>

export default function ContactSection() {
  const [form,setForm] = useState<F>({nombre:'',email:'',cargo:'',pais:'',programa:'',mensaje:''})
  const [errors,setErrors] = useState<E>({})
  const [status,setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set = (k:keyof F) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(f=>({...f,[k]:e.target.value})); setErrors(er=>({...er,[k]:undefined}))
  }
  function validate() {
    const e:E={}
    if(!form.nombre.trim()) e.nombre='Requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.cargo.trim()) e.cargo='Requerido'
    if(!form.pais) e.pais='Selecciona país'
    if(!form.mensaje.trim()) e.mensaje='Cuéntanos algo'
    setErrors(e); return Object.keys(e).length===0
  }
  async function submit(ev:React.FormEvent) {
    ev.preventDefault(); if(!validate()) return
    setStatus('sending')
    try { const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setStatus(r.ok?'ok':'err') }
    catch { setStatus('err') }
  }

  return (
    <section id="contacto" className="section-dark" style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8rem' }} className="l:grid-cols-[1fr_1fr]">

          {/* Left */}
          <motion.div
            initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
            viewport={{once:true,margin:'-80px'}} transition={{duration:.9,ease:[0.16,1,0.3,1]}}
            style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'4rem' }}
          >
            <div>
              <p className="label" style={{ color:'rgba(255,255,255,0.3)', marginBottom:'3.2rem' }}>Contacto</p>
              <h2 className="headline" style={{ color:'#FFFFFF', maxWidth:'48rem', marginBottom:'2.4rem' }}>
                Empieza hoy.
                <br />
                <em style={{ fontStyle:'italic', color:'rgba(255,255,255,0.35)' }}>Es gratis.</em>
              </h2>
              <p className="body-l" style={{ color:'rgba(255,255,255,0.42)', maxWidth:'40rem' }}>
                Una consultora especializada se comunica contigo en menos de 24 horas.
              </p>
            </div>
            <div>
              <p className="label" style={{ color:'rgba(255,255,255,0.25)', marginBottom:'1.2rem' }}>Email directo</p>
              <a href="mailto:contacto@orbbilatam.com" style={{ fontFamily:'"disp"',fontSize:'clamp(2rem,2.5vw,3rem)',color:'#C9A96E',cursor:'none',transition:'opacity .3s' }}
                onMouseEnter={e=>(e.currentTarget.style.opacity='.7')}
                onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
              >contacto@orbbilatam.com</a>
              <p className="small" style={{ color:'rgba(255,255,255,0.28)', marginTop:'.8rem' }}>Lunes a viernes · &lt;24 h de respuesta</p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
            viewport={{once:true,margin:'-80px'}} transition={{duration:.9,delay:.12,ease:[0.16,1,0.3,1]}}
          >
            {status==='ok' ? (
              <div style={{ display:'flex',flexDirection:'column',gap:'2rem',paddingTop:'2rem' }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'2rem' }}>✓</div>
                <h3 style={{ fontFamily:'"disp"',fontSize:'clamp(3.2rem,4vw,4.8rem)',color:'#FFFFFF',lineHeight:1.1 }}>Mensaje recibido.</h3>
                <p className="body" style={{ color:'rgba(255,255,255,0.42)' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:'3.6rem' }}>
                {[
                  { k:'nombre' as keyof F, l:'Nombre *',  t:'text',  p:'Tu nombre completo' },
                  { k:'email'  as keyof F, l:'Email *',   t:'email', p:'tu@email.com' },
                  { k:'cargo'  as keyof F, l:'Cargo *',   t:'text',  p:'Directora, Docente, Abogada…' },
                ].map(f=>(
                  <div key={f.k} style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                    <label className="label" style={{ color:'rgba(255,255,255,0.3)',fontSize:'1rem' }}>{f.l}</label>
                    <input className="field" type={f.t} value={form[f.k] as string} onChange={set(f.k)} placeholder={f.p}/>
                    {errors[f.k]&&<span style={{ fontSize:'1.1rem',color:'rgba(255,120,120,0.8)' }}>{errors[f.k]}</span>}
                  </div>
                ))}
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.2rem' }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                    <label className="label" style={{ color:'rgba(255,255,255,0.3)',fontSize:'1rem' }}>País *</label>
                    <select className="field" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p}>{p}</option>)}
                    </select>
                    {errors.pais&&<span style={{ fontSize:'1.1rem',color:'rgba(255,120,120,0.8)' }}>{errors.pais}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                    <label className="label" style={{ color:'rgba(255,255,255,0.3)',fontSize:'1rem' }}>Programa</label>
                    <select className="field" value={form.programa} onChange={set('programa')}>
                      <option value="">Selecciona</option>
                      {PROGRAMAS.map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                  <label className="label" style={{ color:'rgba(255,255,255,0.3)',fontSize:'1rem' }}>Tu situación *</label>
                  <textarea className="field" value={form.mensaje} onChange={set('mensaje')} placeholder="¿Qué quieres lograr con IA? ¿Qué te frena hoy?" rows={4} style={{ resize:'none' }}/>
                  {errors.mensaje&&<span style={{ fontSize:'1.1rem',color:'rgba(255,120,120,0.8)' }}>{errors.mensaje}</span>}
                </div>
                <button type="submit" className="btn-white" style={{ alignSelf:'flex-start',opacity:status==='sending'?.6:1 }} disabled={status==='sending'}>
                  {status==='sending'?'Enviando…':'Enviar mensaje'}
                  {status!=='sending'&&<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                {status==='err'&&<p className="small" style={{ color:'rgba(255,120,120,0.8)' }}>Error al enviar. Escríbenos a contacto@orbbilatam.com</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
