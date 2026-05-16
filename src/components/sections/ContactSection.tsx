'use client'
import { useState } from 'react'

const PAISES = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const SECTORES = ['Educación','Salud','Finanzas y Contabilidad','Derecho','Consultoría','Administración Pública','Empresa Familiar','Retail y Comercio','Recursos Humanos','Otro']

type FormData = {
  nombre: string
  email: string
  cargo: string
  pais: string
  sector: string
  mensaje: string
  servicio: string
}
type FormErrors = Partial<Record<keyof FormData, string>>

const SERVICIOS = ['Formación Esencial','Orientación Profesional','Herramienta a Medida','Programas Corporativos','No sé aún, quiero orientación']

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    nombre: '', email: '', cargo: '', pais: '', sector: '', mensaje: '', servicio: '',
  })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [status, setStatus]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: undefined }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.nombre.trim())                 e.nombre  = 'Ingresa tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.cargo.trim())                  e.cargo   = 'Ingresa tu cargo'
    if (!form.pais)                          e.pais    = 'Selecciona tu país'
    if (!form.mensaje.trim())                e.mensaje = 'Cuéntanos algo'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = {
    width: '100%',
    background: 'rgba(245,240,232,0.04)',
    border: '1px solid rgba(201,169,110,0.15)',
    borderRadius: '1rem',
    padding: '1.4rem 1.8rem',
    color: '#F5F0E8',
    fontSize: '1.4rem',
    fontFamily: '"sans", system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section
      id="contacto"
      className="section-py"
      style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(13,13,18,0.98)',
      }}
    >
      <div className="site-max">

        <div className="grid grid-cols-1 s:grid-cols-2 gap-60 s:gap-80">

          {/* Left — text */}
          <div className="flex flex-col justify-between gap-40">
            <div>
              <p className="text-11 uppercase tracking-[0.18rem] mb-16" style={{ color: '#C9A96E' }}>Contacto</p>
              <h2
                className="text-32 s:text-48 font-normal leading-[1.1] mb-24"
                style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}
              >
                Tu primer paso hacia la IA empieza{' '}
                <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>aquí</em>.
              </h2>
              <p className="text-14 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)', maxWidth: '44rem' }}>
                Escríbenos y una consultora te responderá en menos de 24 horas para entender tu situación y recomendarte el mejor programa.
              </p>
            </div>

            <div className="flex flex-col gap-24">
              <div>
                <p className="text-11 uppercase tracking-[0.14rem] mb-8" style={{ color: 'rgba(245,240,232,0.3)' }}>Email directo</p>
                <a
                  href="mailto:contacto@orbbilatam.com"
                  className="text-16 s:text-20 font-normal"
                  style={{ color: '#C9A96E', fontFamily: '"disp", Georgia, serif', transition: 'opacity 0.3s', cursor: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  contacto@orbbilatam.com
                </a>
              </div>
              <div>
                <p className="text-11 uppercase tracking-[0.14rem] mb-8" style={{ color: 'rgba(245,240,232,0.3)' }}>Disponibilidad</p>
                <p className="text-13 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  Lunes a viernes<br />Respuesta en menos de 24 horas
                </p>
              </div>
              <div>
                <p className="text-11 uppercase tracking-[0.14rem] mb-8" style={{ color: 'rgba(245,240,232,0.3)' }}>Cobertura</p>
                <p className="text-13" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  Chile · México · Colombia · Argentina · Perú · Ecuador · Uruguay y más
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div
                className="card-dark p-40 s:p-48 flex flex-col items-center text-center gap-20"
                style={{ minHeight: '40rem', justifyContent: 'center' }}
              >
                <div
                  className="w-60 h-60 rounded-full flex items-center justify-center mb-8"
                  style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)' }}
                >
                  <span style={{ fontSize: '2.4rem' }}>✓</span>
                </div>
                <h3 className="text-24 font-normal" style={{ fontFamily: '"disp", Georgia, serif', color: '#F5F0E8' }}>
                  ¡Mensaje recibido!
                </h3>
                <p className="text-14 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)', maxWidth: '36rem' }}>
                  Te responderemos en menos de 24 horas. Mientras tanto, puedes explorar nuestros programas.
                </p>
                <a href="/#servicios" className="btn-gold mt-8">Ver programas</a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-dark p-32 s:p-48 flex flex-col gap-20"
                noValidate
              >
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 s:grid-cols-2 gap-16">
                  <div className="flex flex-col gap-8">
                    <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={set('nombre')}
                      placeholder="Tu nombre"
                      style={{
                        ...fieldStyle,
                        borderColor: errors.nombre ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = errors.nombre ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)')}
                    />
                    {errors.nombre && <p className="text-11" style={{ color: 'rgba(255,100,100,0.8)' }}>{errors.nombre}</p>}
                  </div>
                  <div className="flex flex-col gap-8">
                    <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="tu@email.com"
                      style={{
                        ...fieldStyle,
                        borderColor: errors.email ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)')}
                    />
                    {errors.email && <p className="text-11" style={{ color: 'rgba(255,100,100,0.8)' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Cargo */}
                <div className="flex flex-col gap-8">
                  <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    Cargo / Profesión *
                  </label>
                  <input
                    type="text"
                    value={form.cargo}
                    onChange={set('cargo')}
                    placeholder="Ej: Directora de Marketing, Abogada, Docente..."
                    style={{
                      ...fieldStyle,
                      borderColor: errors.cargo ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                    onBlur={e => (e.target.style.borderColor = errors.cargo ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)')}
                  />
                  {errors.cargo && <p className="text-11" style={{ color: 'rgba(255,100,100,0.8)' }}>{errors.cargo}</p>}
                </div>

                {/* País + Sector */}
                <div className="grid grid-cols-1 s:grid-cols-2 gap-16">
                  <div className="flex flex-col gap-8">
                    <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      País *
                    </label>
                    <select
                      value={form.pais}
                      onChange={set('pais')}
                      style={{
                        ...fieldStyle,
                        borderColor: errors.pais ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)',
                        cursor: 'none',
                      }}
                    >
                      <option value="">Selecciona</option>
                      {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pais && <p className="text-11" style={{ color: 'rgba(255,100,100,0.8)' }}>{errors.pais}</p>}
                  </div>
                  <div className="flex flex-col gap-8">
                    <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      Sector
                    </label>
                    <select
                      value={form.sector}
                      onChange={set('sector')}
                      style={{ ...fieldStyle, cursor: 'none' }}
                    >
                      <option value="">Selecciona</option>
                      {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Servicio de interés */}
                <div className="flex flex-col gap-8">
                  <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    ¿Qué te interesa?
                  </label>
                  <select
                    value={form.servicio}
                    onChange={set('servicio')}
                    style={{ ...fieldStyle, cursor: 'none' }}
                  >
                    <option value="">Selecciona un programa</option>
                    {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-8">
                  <label className="text-11 uppercase tracking-[0.14rem]" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    Cuéntanos tu situación *
                  </label>
                  <textarea
                    value={form.mensaje}
                    onChange={set('mensaje')}
                    placeholder="¿Qué quieres lograr con IA? ¿Qué te frena hoy?"
                    rows={4}
                    style={{
                      ...fieldStyle,
                      resize: 'none',
                      borderColor: errors.mensaje ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                    onBlur={e => (e.target.style.borderColor = errors.mensaje ? 'rgba(255,80,80,0.5)' : 'rgba(201,169,110,0.15)')}
                  />
                  {errors.mensaje && <p className="text-11" style={{ color: 'rgba(255,100,100,0.8)' }}>{errors.mensaje}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-cream mt-8 self-start"
                  style={{ opacity: status === 'sending' ? 0.6 : 1 }}
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  {status !== 'sending' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-12" style={{ color: 'rgba(255,100,100,0.8)' }}>
                    Hubo un error. Escríbenos directamente a contacto@orbbilatam.com
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
