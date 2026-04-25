'use client'
import { useState } from 'react'

const PAISES = ['Argentina','Bolivia','Chile','Colombia','Costa Rica','Ecuador','México','Paraguay','Perú','Uruguay','Venezuela','Otro']
const SECTORES = ['Educación','Salud','Finanzas y Contabilidad','Derecho','Consultoría','Administración Pública','Empresa Familiar','Retail y Comercio','Recursos Humanos','Otro']
const SERVICIOS = ['Formación Esencial','Orientación Profesional','Herramienta a Medida','Para mi equipo o empresa']

type F = {
  nombre: string; email: string; telefono: string; pais: string
  cargo: string; sector: string; experiencia: string; nivelIA: string
  para: string; servicios: string[]; desafio: string; comoNosEncontro: string
}
const init: F = { nombre:'', email:'', telefono:'', pais:'', cargo:'', sector:'', experiencia:'', nivelIA:'', para:'', servicios:[], desafio:'', comoNosEncontro:'' }

/* ── primitives ── */
function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group border-b border-[#E8E4DD] pb-0">
      <label className="block text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium pt-16 pb-4">{label}</label>
      {children}
    </div>
  )
}

function TInput({ name, placeholder, type='text', value, onChange }: { name:string; placeholder:string; type?:string; value:string; onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void }) {
  return <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
    className="block w-full pb-14 text-18 text-green placeholder-[#C5C0B8] bg-transparent outline-none font-normal"
    style={{ fontFamily: '"disp", Georgia, serif' }} />
}

function TSelect({ name, value, onChange, opts, placeholder }: { name:string; value:string; onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void; opts:string[]; placeholder:string }) {
  return <select name={name} value={value} onChange={onChange}
    className="block w-full pb-14 text-18 bg-transparent outline-none appearance-none cursor-pointer font-normal"
    style={{ fontFamily: '"disp", Georgia, serif', color: value ? '#1E383E' : '#C5C0B8' }}>
    <option value="" disabled style={{color:'#7A7871'}}>{placeholder}</option>
    {opts.map(o => <option key={o} value={o} style={{color:'#1E383E'}}>{o}</option>)}
  </select>
}

function Pill({ label, active, onClick }: { label:string; active:boolean; onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick}
      className={`text-13 px-18 py-10 rounded-[10rem] border transition-all duration-200 ${active ? 'bg-green text-white border-green' : 'bg-transparent text-grey border-[#E8E4DD] hover:border-green hover:text-green'}`}
      style={{ fontFamily: 'system-ui, sans-serif' }}>
      {label}
    </button>
  )
}

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-14 mb-28">
      <span className="text-[1rem] text-grey/30 uppercase tracking-[0.2rem] font-medium">{n}</span>
      <span className="text-[1.1rem] text-green uppercase tracking-[0.16rem] font-medium">{label}</span>
      <div className="flex-1 h-px bg-[#E8E4DD]" />
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState<F>(init)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))
  const toggle = (k: 'servicios', v: string) =>
    setForm(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x:string)=>x!==v) : [...p[k], v] }))
  const radio = (k: keyof F, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre, email: form.email,
          telefono: form.telefono, pais: form.pais,
          cargo: form.cargo, sector: form.sector,
          experiencia: form.experiencia, nivel_ia: form.nivelIA,
          para: form.para, servicios: form.servicios.join(', '),
          desafio: form.desafio, como_nos_encontro: form.comoNosEncontro,
        }),
      })
      if (res.ok) { setSent(true) }
      else { alert('Hubo un error. Escríbenos a contacto@orbbi.lat') }
    } catch {
      alert('Hubo un error. Escríbenos a contacto@orbbi.lat')
    } finally { setLoading(false) }
  }

  /* ── success state ── */
  if (sent) return (
    <section>
      <div className="grid s:grid-cols-2 min-h-[40rem]">
        <div className="bg-green flex flex-col items-center justify-center py-80 px-40 text-center">
          <div className="w-56 h-56 rounded-full border border-white/20 flex items-center justify-center mb-32">
            <svg viewBox="0 0 20 20" fill="none" className="w-24 h-24">
              <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-28 s:text-36 font-normal text-white leading-[1.1]" style={{ fontFamily: '"disp", Georgia, serif' }}>
            Recibimos tu mensaje.
          </h3>
        </div>
        <div className="bg-white flex flex-col justify-center py-80 px-40 s:px-64">
          <p className="text-grey text-16 leading-[1.8] mb-24" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Te respondemos en menos de 24 horas, de lunes a viernes.
          </p>
          <a href="mailto:contacto@orbbi.lat" className="text-green text-20 font-normal hover:opacity-70 transition-opacity" style={{ fontFamily: '"disp", Georgia, serif' }}>
            contacto@orbbi.lat
          </a>
        </div>
      </div>
    </section>
  )

  return (
    <section>
      <div className="grid s:grid-cols-[1fr_1.6fr]">

        {/* ── Panel izquierdo — verde oscuro ── */}
        <div className="bg-green px-40 s:px-56 py-80 s:py-120 flex flex-col justify-between">
          <div>
            <p className="text-white/40 text-11 uppercase tracking-[0.16rem] mb-24">Contacto</p>
            <h2
              className="text-36 s:text-[4.8rem] font-normal text-white leading-[1.05] mb-32"
              style={{ fontFamily: '"disp", Georgia, serif', maxWidth: '32rem' }}
            >
              Cuéntanos sobre ti.
            </h2>
            <p className="text-white/55 text-15 leading-[1.8]" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '30rem' }}>
              Mientras más nos cuentes, mejor podremos recomendarte el camino correcto. No hay respuestas incorrectas.
            </p>
          </div>

          <div className="mt-64 pt-40" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-white/30 text-11 uppercase tracking-[0.14rem] mb-12">Contacto directo</p>
            <a href="mailto:contacto@orbbi.lat" className="block text-white text-18 font-normal mb-12 hover:opacity-70 transition-opacity" style={{ fontFamily: '"disp", Georgia, serif' }}>
              contacto@orbbi.lat
            </a>
            <p className="text-white/35 text-13" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Lunes a viernes · menos de 24 hrs
            </p>
          </div>
        </div>

        {/* ── Panel derecho — blanco ── */}
        <div className="bg-white px-40 s:px-64 py-80 s:py-120">
          <form onSubmit={submit} className="space-y-52">

            {/* 01 */}
            <div>
              <SectionHead n="01" label="Datos de contacto" />
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-0">
                <Line label="Nombre completo *"><TInput name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')}/></Line>
                <Line label="Correo electrónico *"><TInput name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')}/></Line>
                <Line label="Teléfono / WhatsApp"><TInput name="telefono" placeholder="+56 9 1234 5678" value={form.telefono} onChange={set('telefono')}/></Line>
                <Line label="País"><TSelect name="pais" value={form.pais} onChange={set('pais')} opts={PAISES} placeholder="Selecciona"/></Line>
              </div>
            </div>

            {/* 02 */}
            <div>
              <SectionHead n="02" label="Tu perfil profesional" />
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-0 mb-32">
                <Line label="Cargo o función actual"><TInput name="cargo" placeholder="Gerente, Abogado, Docente..." value={form.cargo} onChange={set('cargo')}/></Line>
                <Line label="Sector o industria"><TSelect name="sector" value={form.sector} onChange={set('sector')} opts={SECTORES} placeholder="Selecciona"/></Line>
              </div>
              <p className="text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium mb-12">Años de experiencia</p>
              <div className="flex flex-wrap gap-10">
                {['10–15 años','15–20 años','20–25 años','25+ años'].map(v =>
                  <Pill key={v} label={v} active={form.experiencia===v} onClick={() => radio('experiencia', v)}/>
                )}
              </div>
            </div>

            {/* 03 */}
            <div>
              <SectionHead n="03" label="Tu relación con la IA" />
              <p className="text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium mb-12">¿Qué tan familiarizado estás hoy?</p>
              <div className="flex flex-col gap-10">
                {[
                  'Nunca la he usado, no sé por dónde empezar',
                  'La he probado alguna vez, pero nada serio',
                  'La uso ocasionalmente, sin mucho orden',
                  'La uso con regularidad y quiero hacerlo mejor',
                ].map(v => <Pill key={v} label={v} active={form.nivelIA===v} onClick={() => radio('nivelIA', v)}/>)}
              </div>
            </div>

            {/* 04 */}
            <div>
              <SectionHead n="04" label="Qué estás buscando" />
              <p className="text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium mb-12">¿Es para ti o para tu equipo?</p>
              <div className="flex flex-wrap gap-10 mb-28">
                {['Para mí, de forma individual','Para mi equipo o empresa'].map(v =>
                  <Pill key={v} label={v} active={form.para===v} onClick={() => radio('para', v)}/>
                )}
              </div>
              <p className="text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium mb-12">¿Qué servicio te interesa?</p>
              <div className="flex flex-wrap gap-10">
                {SERVICIOS.map(v =>
                  <Pill key={v} label={v} active={form.servicios.includes(v)} onClick={() => toggle('servicios', v)}/>
                )}
              </div>
            </div>

            {/* 05 */}
            <div>
              <SectionHead n="05" label="Cuéntanos más" />
              <Line label="¿Cuál es tu principal desafío o lo que quieres lograr?">
                <textarea
                  placeholder="Describe con tus palabras qué te trajo aquí..."
                  value={form.desafio} onChange={set('desafio')} rows={4}
                  className="block w-full pb-14 text-18 text-green placeholder-[#C5C0B8] bg-transparent outline-none resize-none font-normal"
                  style={{ fontFamily: '"disp", Georgia, serif' }}
                />
              </Line>
              <div className="mt-24">
                <p className="text-[1rem] uppercase tracking-[0.18rem] text-grey/50 font-medium mb-12">¿Cómo nos encontraste?</p>
                <div className="flex flex-wrap gap-10">
                  {['LinkedIn','Recomendación','Google','Instagram','Un evento','Otro'].map(v =>
                    <Pill key={v} label={v} active={form.comoNosEncontro===v} onClick={() => radio('comoNosEncontro', v)}/>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-24" style={{ borderTop: '1px solid #E8E4DD' }}>
              <p className="text-grey/40 text-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
                * Campos requeridos
              </p>
              <button
                type="submit"
                disabled={!form.nombre || !form.email || loading}
                className="inline-flex items-center gap-10 text-12 font-medium uppercase tracking-[0.14rem] text-white bg-green px-32 py-16 hover:opacity-85 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
                {!loading && <svg viewBox="0 0 14 14" fill="none" className="w-10 h-10"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
