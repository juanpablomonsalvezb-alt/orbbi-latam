'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const PROGS  = ['Formación Esencial','Orientación 1:1','Herramienta a Medida','Programa Corporativo','Necesito orientación']

type F = { nombre:string; email:string; cargo:string; pais:string; prog:string; msg:string }
type E = Partial<Record<keyof F,string>>

export default function ContactSection() {
  const [form,setForm] = useState<F>({nombre:'',email:'',cargo:'',pais:'',prog:'',msg:''})
  const [errs,setErrs] = useState<E>({})
  const [st,setSt]     = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set=(k:keyof F)=>(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
    setForm(f=>({...f,[k]:e.target.value})); setErrs(er=>({...er,[k]:undefined}))
  }
  function validate(){
    const e:E={}
    if(!form.nombre.trim()) e.nombre='Requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if(!form.cargo.trim()) e.cargo='Requerido'
    if(!form.pais) e.pais='Selecciona'
    if(!form.msg.trim()) e.msg='Requerido'
    setErrs(e); return Object.keys(e).length===0
  }
  async function submit(ev:React.FormEvent){
    ev.preventDefault(); if(!validate()) return; setSt('sending')
    try { const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setSt(r.ok?'ok':'err') }
    catch { setSt('err') }
  }

  return (
    <section id="contacto" className="sec-dark" style={{ padding:'12rem 0', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'8rem' }} className="l:grid-cols-2">

          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,ease:[0.16,1,0.3,1]}}>
            <p style={{ fontSize:'1.2rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.16em',color:'rgba(255,255,255,0.35)',marginBottom:'3.2rem' }}>Contacto</p>
            <h2 style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(3.2rem,5vw,7.2rem)',fontWeight:'normal',letterSpacing:'-.025em',lineHeight:1.08,color:'#FFFFFF',marginBottom:'2.4rem' }}>
              Empieza hoy.
            </h2>
            <p style={{ fontSize:'1.6rem',color:'rgba(255,255,255,0.45)',lineHeight:1.7,maxWidth:'40rem',marginBottom:'4.8rem' }}>
              Una consultora especializada te contacta en menos de 24 horas. El diagnóstico es completamente gratuito.
            </p>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontFamily:'"disp"',fontSize:'clamp(1.8rem,2.2vw,2.8rem)',color:'rgba(255,255,255,0.6)',cursor:'none',transition:'color .3s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.6)')}
            >contacto@orbbilatam.com</a>
          </motion.div>

          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:.12,ease:[0.16,1,0.3,1]}}>
            {st==='ok' ? (
              <div style={{ display:'flex',flexDirection:'column',gap:'2rem' }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'2rem' }}>✓</div>
                <h3 style={{ fontFamily:'"disp"',fontSize:'clamp(3rem,4vw,4.8rem)',color:'#FFFFFF',lineHeight:1.1 }}>Mensaje recibido.</h3>
                <p style={{ fontSize:'1.5rem',color:'rgba(255,255,255,0.45)' }}>Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:'3.2rem' }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.2rem' }}>
                  {[{k:'nombre' as keyof F,l:'Nombre *',t:'text',p:'Tu nombre'},{k:'email' as keyof F,l:'Email *',t:'email',p:'tu@email.com'}].map(f=>(
                    <div key={f.k} style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                      <label style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,0.3)' }}>{f.l}</label>
                      <input className="field" type={f.t} value={form[f.k] as string} onChange={set(f.k)} placeholder={f.p}/>
                      {errs[f.k]&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,.8)' }}>{errs[f.k]}</span>}
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                  <label style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,0.3)' }}>Cargo *</label>
                  <input className="field" type="text" value={form.cargo} onChange={set('cargo')} placeholder="Directora, Docente, Abogada..."/>
                  {errs.cargo&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,.8)' }}>{errs.cargo}</span>}
                </div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3.2rem' }}>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                    <label style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,0.3)' }}>País *</label>
                    <select className="field" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p}>{p}</option>)}
                    </select>
                    {errs.pais&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,.8)' }}>{errs.pais}</span>}
                  </div>
                  <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                    <label style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,0.3)' }}>Programa</label>
                    <select className="field" value={form.prog} onChange={set('prog')}>
                      <option value="">Selecciona</option>
                      {PROGS.map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:'.6rem' }}>
                  <label style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'.14em',color:'rgba(255,255,255,0.3)' }}>Tu situación *</label>
                  <textarea className="field" value={form.msg} onChange={set('msg')} placeholder="¿Qué quieres lograr con IA?" rows={4} style={{ resize:'none' }}/>
                  {errs.msg&&<span style={{ fontSize:'1.1rem',color:'rgba(255,100,100,.8)' }}>{errs.msg}</span>}
                </div>
                <button type="submit" className="btn-solid-w" style={{ alignSelf:'flex-start',opacity:st==='sending'?.6:1 }} disabled={st==='sending'}>
                  {st==='sending'?'Enviando…':'Enviar mensaje'}
                </button>
                {st==='err'&&<p style={{ fontSize:'1.2rem',color:'rgba(255,100,100,.8)' }}>Error al enviar. Escríbenos directamente.</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
