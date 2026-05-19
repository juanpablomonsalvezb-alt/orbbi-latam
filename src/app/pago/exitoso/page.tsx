'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROFESIONES = ['Abogado/a', 'Médico/a o salud', 'Docente / Educador/a', 'Consultor/a independiente', 'Ejecutivo/a o directivo/a', 'Emprendedor/a', 'Marketing / Comunicaciones', 'Finanzas / Contabilidad', 'Recursos Humanos', 'Ingeniero/a / Tecnología', 'Otro']

type F = { nombre: string; email: string; profesion: string; objetivo: string }
type E = Partial<Record<keyof F, string>>

export default function PagoExitoso() {
  const [form, setForm] = useState<F>({ nombre: '', email: '', profesion: '', objetivo: '' })
  const [errs, setErrs] = useState<E>({})
  const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrs(er => ({ ...er, [k]: undefined }))
  }

  function validate() {
    const e: E = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.profesion) e.profesion = 'Selecciona'
    if (!form.objetivo.trim()) e.objetivo = 'Requerido'
    setErrs(e)
    return Object.keys(e).length === 0
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setSt('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'pago', msg: form.objetivo }),
      })
      setSt(r.ok ? 'ok' : 'err')
    } catch {
      setSt('err')
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0F0E0D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>

        {/* Check + título */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '1px solid rgba(250,250,249,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px', fontSize: 22, color: '#FAFAF9',
          }}>
            ✓
          </div>
          <h1 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(36px,5vw,52px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            fontWeight: 400, color: '#FAFAF9', marginBottom: 16,
          }}>
            Pago recibido.
          </h1>
          <p style={{ fontSize: 17, lineHeight: '26px', color: 'rgba(250,250,249,0.45)', maxWidth: 420, margin: '0 auto' }}>
            Antes de tu sesión, cuéntanos un poco sobre ti. Eso nos permite prepararnos y aprovechar mejor el tiempo juntos.
          </p>
        </div>

        {/* Formulario de contexto */}
        {st === 'ok' ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <p style={{ fontSize: 18, lineHeight: '28px', color: 'rgba(250,250,249,0.6)' }}>
              Perfecto. Te escribimos en las próximas horas para coordinar la sesión.
            </p>
            <Link href="/" style={{ fontSize: 14, color: 'rgba(250,250,249,0.3)', textDecoration: 'none' }}>
              Volver al inicio
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                Nombre *
              </label>
              <input
                className="field-dark"
                type="text"
                value={form.nombre}
                onChange={set('nombre')}
                placeholder="Tu nombre"
              />
              {errs.nombre && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.nombre}</span>}
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                Email *
              </label>
              <input
                className="field-dark"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="tu@email.com"
              />
              {errs.email && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.email}</span>}
            </div>

            {/* Profesión */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                Profesión *
              </label>
              <select className="field-dark" value={form.profesion} onChange={set('profesion')}>
                <option value="">Selecciona tu profesión</option>
                {PROFESIONES.map(p => <option key={p}>{p}</option>)}
              </select>
              {errs.profesion && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.profesion}</span>}
            </div>

            {/* La pregunta clave */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                ¿Qué quieres lograr con IA en tu trabajo? *
              </label>
              <textarea
                className="field-dark"
                value={form.objetivo}
                onChange={set('objetivo')}
                placeholder="Ej: ahorrar tiempo en informes, automatizar tareas repetitivas, aprender a usar ChatGPT para mi trabajo específico..."
                rows={5}
                style={{ resize: 'none' }}
              />
              {errs.objetivo && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.objetivo}</span>}
            </div>

            <button
              type="submit"
              className="btn-hero"
              style={{ opacity: st === 'sending' ? 0.6 : 1, marginTop: 8 }}
              disabled={st === 'sending'}
            >
              {st === 'sending' ? 'Enviando…' : 'Enviar y listo'}
            </button>

            {st === 'err' && (
              <p style={{ fontSize: 13, color: 'rgba(255,100,100,.8)' }}>
                Error al enviar. Escríbenos a cse.coordinacion@gmail.com
              </p>
            )}

            <p style={{ fontSize: 13, color: 'rgba(250,250,249,0.25)', textAlign: 'center' }}>
              También puedes escribirnos directo a{' '}
              <a href="mailto:cse.coordinacion@gmail.com" style={{ color: 'rgba(250,250,249,0.4)' }}>
                cse.coordinacion@gmail.com
              </a>
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
