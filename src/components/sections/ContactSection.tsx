'use client'
import { useState } from 'react'

const PAISES = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const SECTORES = ['Educación','Salud','Finanzas y Contabilidad','Derecho','Consultoría','RRHH','Empresa Familiar','Retail','Administración Pública','Otro']
const SERVICIOS = ['Formación Esencial','Orientación Profesional','Herramienta a Medida','Programas Corporativos','Necesito orientación']

type F = { nombre:string; email:string; cargo:string; pais:string; sector:string; servicio:string; mensaje:string }
type E = Partial<Record<keyof F, string>>

export default function ContactSection() {
  const [form, setForm] = useState<F>({ nombre:'',email:'',cargo:'',pais:'',sector:'',servicio:'',mensaje:'' })
  const [errors, setErrors] = useState<E>({})
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const set = (k:keyof F) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm(f=>({...f,[k]:e.target.value}))
    setErrors(er=>({...er,[k]:undefined}))
  }

  function validate() {
    const e:E={}
    if (!form.nombre.trim())                             e.nombre='Requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Email inválido'
    if (!form.cargo.trim())                              e.cargo='Requerido'
    if (!form.pais)                                      e.pais='Selecciona tu país'
    if (!form.mensaje.trim())                            e.mensaje='Cuéntanos algo'
    setErrors(e)
    return Object.keys(e).length===0
  }

  async function submit(ev:React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const r = await fetch('/api/contact',{ method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form) })
      setStatus(r.ok?'ok':'err')
    } catch { setStatus('err') }
  }

  return (
    <section id="contacto" className="section" style={{ background:'rgba(9,9,14,0.98)' }}>
      <div className="wrap">
        <div className="line-gold mb-80 s:mb-100" />

        <div className="grid grid-cols-1 s:grid-cols-2 gap-60 s:gap-100">

          {/* Left */}
          <div className="flex flex-col justify-between gap-48">
            <div>
              <p className="t-tag mb-20">Contacto</p>
              <h2 className="t-h2 mb-24" style={{ maxWidth:'44rem' }}>
                Tu primer paso
                <br />
                empieza{' '}
                <em className="t-italic t-gold">aquí.</em>
              </h2>
              <p className="t-body" style={{ maxWidth:'40rem' }}>
                Escríbenos y una consultora te responderá en menos de 24 horas para entender tu situación y recomendarte el mejor camino.
              </p>
            </div>
            <div className="flex flex-col gap-20">
              <div>
                <p className="t-tag mb-8" style={{ color:'rgba(242,237,228,0.28)' }}>Email directo</p>
                <a
                  href="mailto:contacto@orbbilatam.com"
                  style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(1.8rem,2.2vw,2.6rem)', color:'#C9A96E', cursor:'none', transition:'opacity 0.3s' }}
                  onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')}
                  onMouseLeave={e=>(e.currentTarget.style.opacity='1')}
                >
                  contacto@orbbilatam.com
                </a>
              </div>
              <p className="t-small">
                Lunes a viernes · Respuesta en &lt;24 h
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            {status==='ok' ? (
              <div className="flex flex-col gap-20 pt-12">
                <div
                  style={{
                    width:48, height:48, borderRadius:'50%',
                    border:'1px solid rgba(201,169,110,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#C9A96E', fontSize:'2rem',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(2.4rem,3vw,3.6rem)', color:'#F2EDE4', lineHeight:1.2 }}>
                  Mensaje recibido.
                </h3>
                <p className="t-body">Te responderemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-32">
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 s:grid-cols-2 gap-32">
                  <div className="flex flex-col gap-6">
                    <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>Nombre *</label>
                    <input className="field" type="text" value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" />
                    {errors.nombre && <span style={{ fontSize:'1.1rem', color:'rgba(255,90,90,0.8)' }}>{errors.nombre}</span>}
                  </div>
                  <div className="flex flex-col gap-6">
                    <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>Email *</label>
                    <input className="field" type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" />
                    {errors.email && <span style={{ fontSize:'1.1rem', color:'rgba(255,90,90,0.8)' }}>{errors.email}</span>}
                  </div>
                </div>

                {/* Cargo */}
                <div className="flex flex-col gap-6">
                  <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>Cargo / Profesión *</label>
                  <input className="field" type="text" value={form.cargo} onChange={set('cargo')} placeholder="Ej: Directora de Marketing, Abogada, Docente..." />
                  {errors.cargo && <span style={{ fontSize:'1.1rem', color:'rgba(255,90,90,0.8)' }}>{errors.cargo}</span>}
                </div>

                {/* País + Sector */}
                <div className="grid grid-cols-1 s:grid-cols-2 gap-32">
                  <div className="flex flex-col gap-6">
                    <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>País *</label>
                    <select className="field" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pais && <span style={{ fontSize:'1.1rem', color:'rgba(255,90,90,0.8)' }}>{errors.pais}</span>}
                  </div>
                  <div className="flex flex-col gap-6">
                    <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>Sector</label>
                    <select className="field" value={form.sector} onChange={set('sector')}>
                      <option value="">Selecciona</option>
                      {SECTORES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Servicio */}
                <div className="flex flex-col gap-6">
                  <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>¿Qué te interesa?</label>
                  <select className="field" value={form.servicio} onChange={set('servicio')}>
                    <option value="">Selecciona un programa</option>
                    {SERVICIOS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-6">
                  <label className="t-tag" style={{ color:'rgba(242,237,228,0.28)', fontSize:'1rem' }}>Tu situación *</label>
                  <textarea className="field" value={form.mensaje} onChange={set('mensaje')} placeholder="¿Qué quieres lograr con IA? ¿Qué te frena hoy?" rows={4} style={{ resize:'none' }} />
                  {errors.mensaje && <span style={{ fontSize:'1.1rem', color:'rgba(255,90,90,0.8)' }}>{errors.mensaje}</span>}
                </div>

                <div className="flex items-center gap-20">
                  <button type="submit" className="btn-primary" disabled={status==='sending'} style={{ opacity:status==='sending'?0.6:1 }}>
                    {status==='sending' ? 'Enviando…' : 'Enviar mensaje'}
                    {status!=='sending' && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  {status==='err' && <span className="t-small" style={{ color:'rgba(255,90,90,0.8)' }}>Error al enviar. Escríbenos por email.</span>}
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
