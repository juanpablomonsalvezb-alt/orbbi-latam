'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES   = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const CAMINOS  = ['IA General (ChatGPT, Claude, herramientas populares)', 'IA para mi profesión específica', 'Aprender un programa concreto', 'Programa para mi equipo/empresa', 'No estoy seguro/a aún']
const PROFESIONES = ['Abogado/a', 'Médico/a o salud', 'Docente / Educador/a', 'Consultor/a independiente', 'Ejecutivo/a o directivo/a', 'Emprendedor/a', 'Marketing / Comunicaciones', 'Finanzas / Contabilidad', 'Recursos Humanos', 'Ingeniero/a / Tecnología', 'Otro']

type F = { nombre:string; email:string; profesion:string; pais:string; camino:string; herramienta:string; msg:string }
type E = Partial<Record<keyof F,string>>

export default function ContactSection() {
  const [form,setForm] = useState<F>({ nombre:'',email:'',profesion:'',pais:'',camino:'',herramienta:'',msg:'' })
  const [errs,setErrs] = useState<E>({})
  const [st,setSt]     = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set = (k:keyof F) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(f=>({...f,[k]:e.target.value})); setErrs(er=>({...er,[k]:undefined}))
  }
  function validate() {
    const e:E={}
    if(!form.nombre.trim()) e.nombre='Requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.profesion) e.profesion='Selecciona'
    if(!form.pais) e.pais='Selecciona'
    if(!form.msg.trim()) e.msg='Requerido'
    setErrs(e); return Object.keys(e).length===0
  }
  async function submit(ev:React.FormEvent) {
    ev.preventDefault(); if(!validate()) return; setSt('sending')
    try { const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setSt(r.ok?'ok':'err') }
    catch { setSt('err') }
  }

  return (
    <section id="contacto" className="sec-dark" style={{ padding:'144px 0', borderTop:'1px solid rgba(250,250,249,0.08)' }}>
      <div className="page-wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }} className="contact-grid">

          {/* Columna izquierda */}
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,ease:[0.16,1,0.3,1]}}>
            <p className="t-label" style={{ color:'rgba(250,250,249,0.4)', marginBottom:32, textTransform:'uppercase', letterSpacing:'0.1em' }}>Contacto</p>
            <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:56, lineHeight:'58.8px', letterSpacing:'-0.56px', fontWeight:400, color:'#FAFAF9', marginBottom:24 }}>
              Hablemos.
            </h2>
            <p className="t-body-lg" style={{ color:'rgba(250,250,249,0.5)', maxWidth:400, marginBottom:40 }}>
              Una sesión 1:1. Sin compromiso. Te orientamos sobre el camino correcto para ti y diseñamos tu plan.
            </p>
            <a href="mailto:cseplataforma@gmail.com"
              style={{ fontFamily:'"disp"', fontSize:28, color:'rgba(250,250,249,0.5)', cursor:'pointer', transition:'color .2s', display:'block', marginBottom:48 }}
              onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.5)')}
            >Escríbenos directamente</a>

            {/* Bloque calendario */}
            <div style={{ borderTop:'1px solid rgba(250,250,249,0.1)', paddingTop:40 }}>
              <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(250,250,249,0.3)', marginBottom:20 }}>O agenda directamente tu sesión gratuita</p>
              <a
                href="https://calendly.com/orbbi-latam/diagnostico"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  padding:'14px 24px',
                  background:'transparent',
                  border:'1px solid rgba(250,250,249,0.3)',
                  borderRadius:8,
                  fontSize:14, fontWeight:500, color:'#FAFAF9',
                  cursor:'pointer', transition:'border-color .2s, background .2s',
                  textDecoration:'none',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(250,250,249,0.7)'; e.currentTarget.style.background='rgba(250,250,249,0.05)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(250,250,249,0.3)'; e.currentTarget.style.background='transparent' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                  <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 7h14M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Reservar sesión gratuita
              </a>
            </div>
          </motion.div>

          {/* Columna derecha — Formulario */}
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:.12,ease:[0.16,1,0.3,1]}}>
            {st==='ok' ? (
              <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(250,250,249,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FAFAF9',fontSize:20 }}>✓</div>
                <h3 style={{ fontFamily:'"disp"', fontSize:48, lineHeight:'52px', color:'#FAFAF9', fontWeight:400 }}>Mensaje recibido.</h3>
                <p className="t-body-lg" style={{ color:'rgba(250,250,249,0.45)' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:28 }}>

                {/* Nombre + Email */}
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:24 }}>
                  {([
                    {k:'nombre' as keyof F,l:'Nombre',t:'text',p:'Tu nombre',req:true},
                    {k:'email'  as keyof F,l:'Email', t:'email',p:'tu@email.com',req:true},
                  ] as const).map(f=>(
                    <div key={String(f.k)} style={{ display:'flex',flexDirection:'column',gap:6 }}>
                      <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>{f.l}{f.req?' *':''}</label>
                      <input className="field-dark" type={f.t} value={form[f.k] as string} onChange={set(f.k)} placeholder={f.p}/>
                      {errs[f.k]&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs[f.k]}</span>}
                    </div>
                  ))}
                </div>

                {/* Profesión */}
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Profesión *</label>
                  <select className="field-dark" value={form.profesion} onChange={set('profesion')}>
                    <option value="">Selecciona tu profesión</option>
                    {PROFESIONES.map(p=><option key={p}>{p}</option>)}
                  </select>
                  {errs.profesion&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs.profesion}</span>}
                </div>

                {/* País + Camino */}
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:24 }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>País *</label>
                    <select className="field-dark" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p}>{p}</option>)}
                    </select>
                    {errs.pais&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs.pais}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Camino de interés</label>
                    <select className="field-dark" value={form.camino} onChange={set('camino')}>
                      <option value="">Selecciona</option>
                      {CAMINOS.map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Herramienta específica */}
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Herramienta o programa específico <span style={{ opacity:.5 }}>(opcional)</span></label>
                  <input className="field-dark" type="text" value={form.herramienta} onChange={set('herramienta')} placeholder="Ej: Notion, Excel con IA, Midjourney..."/>
                </div>

                {/* Situación */}
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Tu situación *</label>
                  <textarea className="field-dark" value={form.msg} onChange={set('msg')} placeholder="¿Qué quieres lograr? ¿Qué te frena hoy?" rows={4} style={{ resize:'none' }}/>
                  {errs.msg&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs.msg}</span>}
                </div>

                <button type="submit" className="btn-hero" style={{ alignSelf:'flex-start', opacity:st==='sending'?.6:1, height:44 }} disabled={st==='sending'}>
                  {st==='sending'?'Enviando…':'Enviar mensaje'}
                </button>
                {st==='err'&&<p style={{ fontSize:13,color:'rgba(255,100,100,.8)' }}>Error. Escríbenos directamente.</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
