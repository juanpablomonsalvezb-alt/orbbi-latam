'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const SERVICIOS = ['Formación Esencial','Orientación Profesional','Herramienta a Medida','Programas Corporativos','No sé aún, necesito orientación']

type F = { nombre:string; email:string; cargo:string; pais:string; servicio:string; mensaje:string }
type E = Partial<Record<keyof F,string>>

export default function ContactSection() {
  const [form,setForm]=useState<F>({nombre:'',email:'',cargo:'',pais:'',servicio:'',mensaje:''})
  const [errors,setErrors]=useState<E>({})
  const [status,setStatus]=useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set=(k:keyof F)=>(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
    setForm(f=>({...f,[k]:e.target.value})); setErrors(er=>({...er,[k]:undefined}))
  }
  function validate(){
    const e:E={}
    if(!form.nombre.trim()) e.nombre='Requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.cargo.trim()) e.cargo='Requerido'
    if(!form.pais) e.pais='Selecciona tu país'
    if(!form.mensaje.trim()) e.mensaje='Cuéntanos algo'
    setErrors(e); return Object.keys(e).length===0
  }
  async function submit(ev:React.FormEvent){
    ev.preventDefault(); if(!validate()) return
    setStatus('sending')
    try { const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setStatus(r.ok?'ok':'err') }
    catch { setStatus('err') }
  }

  return (
    <section id="contacto" style={{ background:'#1A3328', padding:'16rem 0' }}>
      <div className="wrap">
        <div style={{ display:'grid',gridTemplateColumns:'1fr',gap:'8rem' }} className="l:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
            viewport={{once:true,margin:'-80px'}} transition={{duration:.9,ease:[0.16,1,0.3,1]}}
            style={{ display:'flex',flexDirection:'column',justifyContent:'space-between',gap:'4rem' }}
          >
            <div>
              <p className="label" style={{ color:'rgba(201,169,110,0.6)',marginBottom:'2rem' }}>Contacto</p>
              <h2 className="headline" style={{ color:'#FAFAF8',maxWidth:'44rem',marginBottom:'2.4rem' }}>
                Tu primer paso empieza{' '}
                <em style={{ fontStyle:'italic',color:'#C9A96E' }}>aquí.</em>
              </h2>
              <p style={{ fontSize:'1.5rem',lineHeight:1.8,color:'rgba(250,250,248,0.45)',maxWidth:'40rem' }}>
                Escríbenos. Una consultora te responde en menos de 24 horas.
              </p>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:'1.6rem' }}>
              <p className="label" style={{ color:'rgba(250,250,248,0.28)' }}>Email directo</p>
              <a href="mailto:contacto@orbbilatam.com" style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(2rem,2.5vw,3.2rem)',color:'#C9A96E',cursor:'none',transition:'opacity .3s' }}
                onMouseEnter={e=>(e.currentTarget.style.opacity='.7')}
                onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
              >contacto@orbbilatam.com</a>
              <p style={{ fontSize:'1.3rem',color:'rgba(250,250,248,0.3)' }}>Lunes a viernes · Respuesta en &lt;24 h</p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
            viewport={{once:true,margin:'-80px'}} transition={{duration:.9,delay:.15,ease:[0.16,1,0.3,1]}}
          >
            {status==='ok' ? (
              <div style={{ display:'flex',flexDirection:'column',gap:'2rem',paddingTop:'2rem' }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(201,169,110,0.4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#C9A96E',fontSize:'2rem' }}>✓</div>
                <h3 style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(2.8rem,3.5vw,4rem)',color:'#FAFAF8',lineHeight:1.2 }}>Mensaje recibido.</h3>
                <p style={{ fontSize:'1.5rem',color:'rgba(250,250,248,0.45)' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:'3.2rem' }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.2rem' }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                    <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>Nombre *</label>
                    <input className="field field-white" type="text" value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre"/>
                    {errors.nombre&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,0.8)' }}>{errors.nombre}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                    <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>Email *</label>
                    <input className="field field-white" type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com"/>
                    {errors.email&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,0.8)' }}>{errors.email}</span>}
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                  <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>Cargo *</label>
                  <input className="field field-white" type="text" value={form.cargo} onChange={set('cargo')} placeholder="Ej: Directora, Docente, Abogada..."/>
                  {errors.cargo&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,0.8)' }}>{errors.cargo}</span>}
                </div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.2rem' }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                    <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>País *</label>
                    <select className="field field-white" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pais&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,0.8)' }}>{errors.pais}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                    <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>Programa</label>
                    <select className="field field-white" value={form.servicio} onChange={set('servicio')}>
                      <option value="">Selecciona</option>
                      {SERVICIOS.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:'.8rem' }}>
                  <label className="label" style={{ color:'rgba(250,250,248,0.3)',fontSize:'1rem' }}>Tu situación *</label>
                  <textarea className="field field-white" value={form.mensaje} onChange={set('mensaje')} placeholder="¿Qué quieres lograr con IA?" rows={4} style={{ resize:'none' }}/>
                  {errors.mensaje&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,0.8)' }}>{errors.mensaje}</span>}
                </div>
                <button type="submit" className="btn-gold" disabled={status==='sending'} style={{ alignSelf:'flex-start',opacity:status==='sending'?.6:1 }}>
                  {status==='sending'?'Enviando…':'Enviar mensaje'}
                  {status!=='sending'&&<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                {status==='err'&&<p style={{ fontSize:'1.2rem',color:'rgba(255,100,100,0.8)' }}>Error al enviar. Escríbenos a contacto@orbbilatam.com</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
