'use client'
import { useState } from 'react'

const SERVICIOS = [
  'Formación Esencial (empezar desde cero)',
  'Orientación Profesional (herramientas para mi cargo)',
  'Herramienta de IA a medida',
  'Formación para mi equipo o empresa',
]

const SECTORES = [
  'Educación',
  'Salud',
  'Finanzas y Contabilidad',
  'Derecho',
  'Consultoría',
  'Administración Pública',
  'Empresa Familiar',
  'Retail y Comercio',
  'Recursos Humanos',
  'Otro',
]

const PAISES = [
  'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica',
  'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México',
  'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana',
  'Uruguay', 'Venezuela', 'Otro',
]

type FormData = {
  nombre: string
  email: string
  telefono: string
  pais: string
  cargo: string
  sector: string
  experiencia: string
  nivelIA: string
  para: string
  servicios: string[]
  equipoTamano: string
  desafio: string
  comoNosEncontro: string
}

const initial: FormData = {
  nombre: '', email: '', telefono: '', pais: '', cargo: '',
  sector: '', experiencia: '', nivelIA: '', para: '',
  servicios: [], equipoTamano: '', desafio: '', comoNosEncontro: '',
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-11 font-medium uppercase tracking-[0.12rem] text-white/50 mb-8">{children}</p>
}

function Input({ name, placeholder, type = 'text', value, onChange }: {
  name: string; placeholder: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-white/20 py-12 text-white text-16 placeholder-white/30 outline-none focus:border-white/60 transition-colors"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    />
  )
}

function Select({ name, value, onChange, options, placeholder }: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; placeholder: string
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-white/20 py-12 text-16 outline-none focus:border-white/60 transition-colors appearance-none cursor-pointer"
      style={{ fontFamily: 'system-ui, sans-serif', color: value ? 'white' : 'rgba(255,255,255,0.3)' }}
    >
      <option value="" disabled style={{ color: '#7A7871', background: '#1E383E' }}>{placeholder}</option>
      {options.map(o => (
        <option key={o} value={o} style={{ color: 'white', background: '#1E383E' }}>{o}</option>
      ))}
    </select>
  )
}

function Radio({ name, value, checked, onChange, label }: {
  name: string; value: string; checked: boolean; onChange: () => void; label: string
}) {
  return (
    <label className="flex items-center gap-10 cursor-pointer group">
      <span
        className={`w-18 h-18 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${checked ? 'border-white bg-white' : 'border-white/30 group-hover:border-white/60'}`}
        onClick={onChange}
      >
        {checked && <span className="w-8 h-8 rounded-full bg-green" />}
      </span>
      <span className="text-14 text-white/75 leading-[1.4]" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
    </label>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-start gap-10 cursor-pointer group">
      <span
        className={`w-18 h-18 rounded-[4px] border flex items-center justify-center transition-all flex-shrink-0 mt-[0.15em] ${checked ? 'border-white bg-white' : 'border-white/30 group-hover:border-white/60'}`}
        onClick={onChange}
      >
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className="w-10 h-10">
            <path d="M2 6l3 3 5-5" stroke="#1E383E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className="text-14 text-white/75 leading-[1.4]" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
    </label>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initial)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const toggleServicio = (s: string) =>
    setForm(f => ({ ...f, servicios: f.servicios.includes(s) ? f.servicios.filter(x => x !== s) : [...f.servicios, s] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <section className="bg-green">
        <div className="site-max py-120 s:py-160 flex flex-col items-center text-center">
          <div className="w-64 h-64 rounded-full border border-white/30 flex items-center justify-center mb-40">
            <svg viewBox="0 0 24 24" fill="none" className="w-28 h-28">
              <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-32 s:text-48 font-normal text-white leading-[1.1] mb-20" style={{ fontFamily: '"disp", Georgia, serif' }}>
            Recibimos tu mensaje.
          </h3>
          <p className="text-white/60 text-16 leading-[1.7]" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '44rem' }}>
            Te respondemos en menos de 24 horas, de lunes a viernes. Si necesitas algo urgente escríbenos a{' '}
            <a href="mailto:contacto@orbbi.lat" className="text-white underline">contacto@orbbi.lat</a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-green">
      <div className="site-max site-grid py-80 s:py-120">

        {/* Left — copy */}
        <div className="col-span-full s:col-start-2 s:col-span-5 s:sticky s:top-[10rem] s:h-fit mb-60 s:mb-0">
          <p className="text-white/50 text-12 uppercase tracking-[0.12rem] mb-20">Contacto</p>
          <h2
            className="text-32 s:text-44 font-normal text-white leading-[1.1] mb-24"
            style={{ fontFamily: '"disp", Georgia, serif' }}
          >
            Cuéntanos sobre ti.
          </h2>
          <p className="text-white/60 text-15 leading-[1.8] mb-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Mientras más nos cuentes, mejor podremos recomendarte el camino correcto. No hay respuestas incorrectas.
          </p>
          <div className="space-y-16">
            {[
              { icon: '✉', text: 'contacto@orbbi.lat' },
              { icon: '⏱', text: 'Respuesta en menos de 24 hrs' },
              { icon: '📅', text: 'Lunes a viernes' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-12">
                <span className="text-16">{icon}</span>
                <span className="text-white/55 text-14" style={{ fontFamily: 'system-ui, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="col-span-full s:col-start-8 s:col-span-9">
          <form onSubmit={handleSubmit} className="space-y-48">

            {/* Bloque 1 — Datos básicos */}
            <div>
              <p className="text-white text-12 font-medium uppercase tracking-[0.16rem] mb-28 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                01 — Datos de contacto
              </p>
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-28">
                <div>
                  <Label>Nombre completo *</Label>
                  <Input name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} />
                </div>
                <div>
                  <Label>Correo electrónico *</Label>
                  <Input name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} />
                </div>
                <div>
                  <Label>Teléfono / WhatsApp</Label>
                  <Input name="telefono" placeholder="+56 9 1234 5678" value={form.telefono} onChange={set('telefono')} />
                </div>
                <div>
                  <Label>País</Label>
                  <Select name="pais" value={form.pais} onChange={set('pais')} options={PAISES} placeholder="Selecciona tu país" />
                </div>
              </div>
            </div>

            {/* Bloque 2 — Perfil profesional */}
            <div>
              <p className="text-white text-12 font-medium uppercase tracking-[0.16rem] mb-28 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                02 — Tu perfil profesional
              </p>
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-28 mb-28">
                <div>
                  <Label>Cargo o función actual</Label>
                  <Input name="cargo" placeholder="Ej: Gerente Comercial, Abogado, Docente..." value={form.cargo} onChange={set('cargo')} />
                </div>
                <div>
                  <Label>Sector o industria</Label>
                  <Select name="sector" value={form.sector} onChange={set('sector')} options={SECTORES} placeholder="Selecciona tu sector" />
                </div>
              </div>
              <div>
                <Label>Años de experiencia laboral</Label>
                <div className="grid grid-cols-2 s:grid-cols-4 gap-12 mt-4">
                  {['10–15 años', '15–20 años', '20–25 años', '25+ años'].map(v => (
                    <Radio key={v} name="experiencia" value={v} checked={form.experiencia === v} onChange={() => setForm(f => ({ ...f, experiencia: v }))} label={v} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bloque 3 — Relación con la IA */}
            <div>
              <p className="text-white text-12 font-medium uppercase tracking-[0.16rem] mb-28 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                03 — Tu relación con la IA hoy
              </p>
              <div className="mb-28">
                <Label>¿Qué tan familiarizado estás con la inteligencia artificial?</Label>
                <div className="grid grid-cols-1 s:grid-cols-2 gap-12 mt-4">
                  {[
                    'Nunca la he usado, no sé por dónde empezar',
                    'La he visto o probado alguna vez, pero nada serio',
                    'La uso ocasionalmente, sin mucho orden',
                    'La uso regularmente pero quiero hacerlo mejor',
                  ].map(v => (
                    <Radio key={v} name="nivelIA" value={v} checked={form.nivelIA === v} onChange={() => setForm(f => ({ ...f, nivelIA: v }))} label={v} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bloque 4 — Qué buscas */}
            <div>
              <p className="text-white text-12 font-medium uppercase tracking-[0.16rem] mb-28 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                04 — Qué estás buscando
              </p>
              <div className="mb-28">
                <Label>¿El servicio es para ti o para tu equipo?</Label>
                <div className="flex flex-wrap gap-20 mt-4">
                  {['Para mí, de forma individual', 'Para mi equipo o empresa'].map(v => (
                    <Radio key={v} name="para" value={v} checked={form.para === v} onChange={() => setForm(f => ({ ...f, para: v }))} label={v} />
                  ))}
                </div>
              </div>
              {form.para === 'Para mi equipo o empresa' && (
                <div className="mb-28">
                  <Label>¿Cuántas personas aproximadamente?</Label>
                  <div className="flex flex-wrap gap-20 mt-4">
                    {['2–5 personas', '6–15 personas', '16–50 personas', 'Más de 50'].map(v => (
                      <Radio key={v} name="equipoTamano" value={v} checked={form.equipoTamano === v} onChange={() => setForm(f => ({ ...f, equipoTamano: v }))} label={v} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Label>¿Qué servicio te interesa? (puedes marcar más de uno)</Label>
                <div className="grid grid-cols-1 s:grid-cols-2 gap-12 mt-4">
                  {SERVICIOS.map(s => (
                    <Checkbox key={s} checked={form.servicios.includes(s)} onChange={() => toggleServicio(s)} label={s} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bloque 5 — Cuéntanos más */}
            <div>
              <p className="text-white text-12 font-medium uppercase tracking-[0.16rem] mb-28 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                05 — Cuéntanos más
              </p>
              <div className="mb-28">
                <Label>¿Cuál es tu principal desafío o lo que quieres lograr?</Label>
                <textarea
                  name="desafio"
                  placeholder="Describe con tus propias palabras qué te trajo aquí, qué quieres mejorar o qué problema quieres resolver..."
                  value={form.desafio}
                  onChange={set('desafio')}
                  rows={5}
                  className="w-full bg-transparent border-b border-white/20 py-12 text-white text-15 placeholder-white/30 outline-none focus:border-white/60 transition-colors resize-none mt-4"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                />
              </div>
              <div>
                <Label>¿Cómo nos encontraste?</Label>
                <Select
                  name="comoNosEncontro"
                  value={form.comoNosEncontro}
                  onChange={set('comoNosEncontro')}
                  options={['LinkedIn', 'Recomendación de un colega o amigo', 'Google', 'Instagram', 'Un evento o charla', 'Prensa o medios', 'Otro']}
                  placeholder="Selecciona una opción"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-white/35 text-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
                * Campos requeridos. Tu información es confidencial.
              </p>
              <button
                type="submit"
                disabled={!form.nombre || !form.email || loading}
                className="inline-flex items-center gap-10 text-12 font-medium uppercase tracking-[0.12rem] text-green bg-white px-32 py-16 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
                {!loading && (
                  <svg viewBox="0 0 16 16" fill="none" className="w-10 h-10">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
