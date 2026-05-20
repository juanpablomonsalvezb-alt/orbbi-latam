'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const PAISES     = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const PROFESIONES = ['Abogado/a','Médico/a o salud','Docente / Educador/a','Consultor/a independiente','Ejecutivo/a o directivo/a','Emprendedor/a','Marketing / Comunicaciones','Finanzas / Contabilidad','Recursos Humanos','Ingeniero/a / Tecnología','Otro']

type F = { nombre: string; email: string; profesion: string; pais: string; motivo: string; objetivo: string }
type E = Partial<Record<keyof F, string>>

export default function ContactSection() {
  const [form, setForm] = useState<F>({ nombre: '', email: '', profesion: '', pais: '', motivo: '', objetivo: '' })
  const [errs, setErrs] = useState<E>({})
  const [st, setSt]     = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrs(er => ({ ...er, [k]: undefined }))
  }

  function validate() {
    const e: E = {}
    if (!form.nombre.trim())  e.nombre   = 'Requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.profesion)      e.profesion = 'Selecciona'
    if (!form.pais)           e.pais      = 'Selecciona'
    if (!form.motivo.trim())  e.motivo    = 'Requerido'
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
        body: JSON.stringify({ ...form, source: 'landing', msg: form.objetivo }),
      })
      setSt(r.ok ? 'ok' : 'err')
    } catch {
      setSt('err')
    }
  }

  return (
    <section id="contacto" className="sec-dark" style={{ padding: '144px 0', borderTop: '1px solid rgba(250,250,249,0.08)' }}>
      <div className="page-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="contact-grid">

          {/* Columna izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-label" style={{ color: 'rgba(250,250,249,0.4)', marginBottom: 32, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Contacto
            </p>
            <h2 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 56, lineHeight: '58.8px', letterSpacing: '-0.56px',
              fontWeight: 400, color: '#FAFAF9', marginBottom: 20,
            }}>
              Cuéntanos tu caso.
            </h2>
            <p className="t-body-lg" style={{ color: 'rgba(250,250,249,0.45)', maxWidth: 380, marginBottom: 48, lineHeight: '28px' }}>
              Respondemos en menos de 24 horas. Con lo que nos cuentes, preparamos la primera sesión exactamente para ti.
            </p>

            {/* CTA directo a diagnóstico */}
            <div style={{ borderTop: '1px solid rgba(250,250,249,0.1)', paddingTop: 40 }}>
              <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.3)', marginBottom: 16 }}>
                ¿Quieres arrancar ya?
              </p>
              <p style={{ fontSize: 15, color: 'rgba(250,250,249,0.45)', marginBottom: 20, lineHeight: '22px' }}>
                Reserva tu diagnóstico gratis de 30 min y coordinamos la sesión directamente.
              </p>
              <a
                href="/#precios"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(250,250,249,0.25)',
                  borderRadius: 4,
                  fontSize: 14, fontWeight: 500, color: '#FAFAF9',
                  textDecoration: 'none',
                  transition: 'border-color .2s, background .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,250,249,0.6)'; e.currentTarget.style.background = 'rgba(250,250,249,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,250,249,0.25)'; e.currentTarget.style.background = 'transparent' }}
              >
                Ver diagnóstico gratis →
              </a>
            </div>
          </motion.div>

          {/* Columna derecha — Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8, delay: .12, ease: [0.16, 1, 0.3, 1] }}
          >
            {st === 'ok' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: '1px solid rgba(250,250,249,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FAFAF9', fontSize: 20,
                }}>✓</div>
                <h3 style={{ fontFamily: '"disp"', fontSize: 40, lineHeight: '44px', color: '#FAFAF9', fontWeight: 400 }}>
                  Mensaje recibido.
                </h3>
                <p className="t-body-lg" style={{ color: 'rgba(250,250,249,0.45)', lineHeight: '26px' }}>
                  Te respondemos en menos de 24 horas. Si quieres avanzar más rápido, reserva tu diagnóstico directamente:
                </p>
                <a
                  href="/#precios"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex', alignItems: 'center',
                    height: 44, padding: '0 20px',
                    background: '#FAFAF9', color: '#0F0E0D',
                    borderRadius: 4, fontSize: 14, fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Agendar diagnóstico gratis
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Nombre + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {([
                    { k: 'nombre' as keyof F, l: 'Nombre', t: 'text',  p: 'Tu nombre' },
                    { k: 'email'  as keyof F, l: 'Email',  t: 'email', p: 'tu@email.com' },
                  ] as const).map(f => (
                    <div key={String(f.k)} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                        {f.l} *
                      </label>
                      <input className="field-dark" type={f.t} value={form[f.k] as string} onChange={set(f.k)} placeholder={f.p} />
                      {errs[f.k] && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs[f.k]}</span>}
                    </div>
                  ))}
                </div>

                {/* Profesión + País */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                      Profesión *
                    </label>
                    <select className="field-dark" value={form.profesion} onChange={set('profesion')}>
                      <option value="">Selecciona</option>
                      {PROFESIONES.map(p => <option key={p}>{p}</option>)}
                    </select>
                    {errs.profesion && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.profesion}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                      País *
                    </label>
                    <select className="field-dark" value={form.pais} onChange={set('pais')}>
                      <option value="">Selecciona</option>
                      {PAISES.map(p => <option key={p}>{p}</option>)}
                    </select>
                    {errs.pais && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.pais}</span>}
                  </div>
                </div>

                {/* Motivación */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(250,250,249,0.35)' }}>
                    ¿Qué te motivó a contactarnos? *
                  </label>
                  <textarea
                    className="field-dark"
                    value={form.motivo}
                    onChange={set('motivo')}
                    placeholder="¿Qué está pasando en tu trabajo que te llevó a buscar ayuda con IA? Puede ser una situación concreta, una presión, una oportunidad..."
                    rows={3}
                    style={{ resize: 'none' }}
                  />
                  {errs.motivo && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.motivo}</span>}
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
                    placeholder="Cuéntanos en tus propias palabras. Eso nos permite prepararnos antes de la primera sesión."
                    rows={5}
                    style={{ resize: 'none' }}
                  />
                  {errs.objetivo && <span style={{ fontSize: 12, color: 'rgba(255,100,100,.8)' }}>{errs.objetivo}</span>}
                </div>

                <button
                  type="submit"
                  className="btn-hero"
                  style={{ alignSelf: 'flex-start', opacity: st === 'sending' ? 0.6 : 1, height: 44 }}
                  disabled={st === 'sending'}
                >
                  {st === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>

                {st === 'err' && (
                  <p style={{ fontSize: 13, color: 'rgba(255,100,100,.8)' }}>
                    Error. Escríbenos directamente a cse.coordinacion@gmail.com
                  </p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
