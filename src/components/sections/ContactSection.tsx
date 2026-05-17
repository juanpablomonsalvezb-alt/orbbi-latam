'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES   = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const PROGRAMAS = ['Formación Esencial','Orientación 1:1','Herramienta a Medida','Programa Corporativo','Necesito orientación']

type F = { nombre:string; email:string; cargo:string; pais:string; prog:string; msg:string }
type E = Partial<Record<keyof F,string>>

export default function ContactSection() {
  const [form,setForm] = useState<F>({ nombre:'',email:'',cargo:'',pais:'',prog:'',msg:'' })
  const [errs,setErrs] = useState<E>({})
  const [st,setSt]     = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set = (k:keyof F) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(f=>({...f,[k]:e.target.value})); setErrs(er=>({...er,[k]:undefined}))
  }
  function validate() {
    const e:E={}
    if(!form.nombre.trim()) e.nombre='Requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.cargo.trim()) e.cargo='Requerido'
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
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:80 }} className="l:grid-cols-2">

          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,ease:[0.16,1,0.3,1]}}>
            <p className="t-label" style={{ color:'rgba(250,250,249,0.4)', marginBottom:32, textTransform:'uppercase', letterSpacing:'0.1em' }}>Contacto</p>
            <h2 style={{ fontFamily:'"disp",Georgia,serif', fontSize:56, lineHeight:'58.8px', letterSpacing:'-0.56px', fontWeight:400, color:'#FAFAF9', marginBottom:24 }}>
              Empieza hoy.
            </h2>
            <p className="t-body-lg" style={{ color:'rgba(250,250,249,0.5)', maxWidth:400, marginBottom:56 }}>
              Una consultora especializada se comunica contigo en menos de 24 horas. El diagnóstico es completamente gratuito.
            </p>
            <a href="mailto:contacto@orbbilatam.com"
              style={{ fontFamily:'"disp"', fontSize:28, color:'rgba(250,250,249,0.5)', cursor:'none', transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.5)')}
            >contacto@orbbilatam.com</a>
          </motion.div>

          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:.12,ease:[0.16,1,0.3,1]}}>
            {st==='ok' ? (
              <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(250,250,249,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FAFAF9',fontSize:20 }}>✓</div>
                <h3 style={{ fontFamily:'"disp"', fontSize:48, lineHeight:'52px', color:'#FAFAF9', fontWeight:400 }}>Mensaje recibido.</h3>
                <p className="t-body-lg" style={{ color:'rgba(250,250,249,0.45)' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:32 }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:32 }}>
                  {[{k:'nombre' as keyof F,l:'Nombre',t:'text',p:'Tu nombre'},{k:'email' as keyof F,l:'Email',t:'email',p:'tu@email.com'}].map(f=>(
                    <div key={String(f.k)} style={{ display:'flex',flexDirection:'column',gap:6 }}>
                      <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>{f.l} *</label>
                      <input className="field-dark" type={f.t} value={form[f.k] as string} onChange={set(f.k)} placeholder={f.p}/>
                      {errs[f.k]&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs[f.k]}</span>}
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Cargo *</label>
                  <input className="field-dark" type="text" value={form.cargo} onChange={set('cargo')} placeholder="Directora, Docente, Abogada..."/>
                  {errs.cargo&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs.cargo}</span>}
                </div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:32 }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>País *</label>
                    <select className="field-dark" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p}>{p}</option>)}
                    </select>
                    {errs.pais&&<span style={{ fontSize:12,color:'rgba(255,100,100,.8)' }}>{errs.pais}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Programa</label>
                    <select className="field-dark" value={form.prog} onChange={set('prog')}>
                      <option value="">Selecciona</option>
                      {PROGRAMAS.map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                  <label className="t-label" style={{ color:'rgba(250,250,249,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', fontSize:12 }}>Tu situación *</label>
                  <textarea className="field-dark" value={form.msg} onChange={set('msg')} placeholder="¿Qué quieres lograr con IA? ¿Qué te frena hoy?" rows={4} style={{ resize:'none' }}/>
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
