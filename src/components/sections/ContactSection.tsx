'use client'
import { useState } from 'react'

const SERVICIOS = [
  'Formación Esencial (empezar desde cero)',
  'Orientación Profesional (herramientas para mi cargo)',
  'Herramienta de IA a medida',
  'Formación para mi equipo o empresa',
]

const SECTORES = [
  'Educación', 'Salud', 'Finanzas y Contabilidad', 'Derecho',
  'Consultoría', 'Administración Pública', 'Empresa Familiar',
  'Retail y Comercio', 'Recursos Humanos', 'Otro',
]

const PAISES = [
  'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica',
  'Ecuador', 'México', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela', 'Otro',
]

type FormData = {
  nombre: string; email: string; telefono: string; pais: string
  cargo: string; sector: string; experiencia: string; nivelIA: string
  para: string; servicios: string[]; equipoTamano: string
  desafio: string; comoNosEncontro: string
}

const initial: FormData = {
  nombre: '', email: '', telefono: '', pais: '', cargo: '',
  sector: '', experiencia: '', nivelIA: '', para: '',
  servicios: [], equipoTamano: '', desafio: '', comoNosEncontro: '',
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-11 font-medium uppercase tracking-[0.14rem] text-grey mb-10">{children}</p>
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

function TextInput({ name, placeholder, type = 'text', value, onChange }: {
  name: string; placeholder: string; type?: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full bg-transparent border-b border-[#DEDAD3] py-14 text-green text-16 placeholder-grey/40 outline-none focus:border-green transition-colors"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    />
  )
}

function SelectInput({ name, value, onChange, options, placeholder }: {
  name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]; placeholder: string
}) {
  return (
    <select
      name={name} value={value} onChange={onChange}
      className="w-full bg-transparent border-b border-[#DEDAD3] py-14 text-16 outline-none focus:border-green transition-colors appearance-none cursor-pointer"
      style={{ fontFamily: 'system-ui, sans-serif', color: value ? '#1E383E' : 'rgba(122,120,113,0.5)' }}
    >
      <option value="" disabled style={{ color: '#7A7871' }}>{placeholder}</option>
      {options.map(o => <option key={o} value={o} style={{ color: '#1E383E' }}>{o}</option>)}
    </select>
  )
}

function Radio({ value, checked, onChange, label }: {
  value: string; checked: boolean; onChange: () => void; label: string
}) {
  return (
    <label className="flex items-start gap-12 cursor-pointer group">
      <span
        onClick={onChange}
        className={`mt-[0.2em] w-18 h-18 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'border-green bg-green' : 'border-[#DEDAD3] group-hover:border-green'}`}
      >
        {checked && <span className="w-7 h-7 rounded-full bg-white" />}
      </span>
      <span className="text-14 text-grey leading-[1.5]" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
    </label>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-start gap-12 cursor-pointer group">
      <span
        onClick={onChange}
        className={`mt-[0.2em] w-18 h-18 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'border-green bg-green' : 'border-[#DEDAD3] group-hover:border-green'}`}
      >
        {checked && (
          <svg viewBox="0 0 10 10" fill="none" className="w-9 h-9">
            <path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className="text-14 text-grey leading-[1.5]" style={{ fontFamily: 'system-ui, sans-serif' }}>{label}</span>
    </label>
  )
}

function BlockTitle({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-16 mb-32 pb-16" style={{ borderBottom: '1px solid #DEDAD3' }}>
      <span className="text-11 font-medium text-grey/40 uppercase tracking-[0.14rem]">{num}</span>
      <span className="text-12 font-medium text-green uppercase tracking-[0.14rem]">{label}</span>
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initial)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }))

  const toggleServicio = (s: string) =>
    setForm(p => ({ ...p, servicios: p.servicios.includes(s) ? p.servicios.filter(x => x !== s) : [...p.servicios, s] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <section className="bg-white">
        <div className="site-max py-120 s:py-160 flex flex-col items-center text-center">
          <div className="w-64 h-64 rounded-full border border-green/20 flex items-center justify-center mb-40">
            <svg viewBox="0 0 24 24" fill="none" className="w-28 h-28">
              <path d="M5 12l5 5L19 7" stroke="#1E383E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-32 s:text-48 font-normal text-green leading-[1.1] mb-20" style={{ fontFamily: '"disp", Georgia, serif' }}>
            Recibimos tu mensaje.
          </h3>
          <p className="text-grey text-16 leading-[1.7]" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '44rem' }}>
            Te respondemos en menos de 24 horas, de lunes a viernes.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white">
      <div className="site-max site-grid py-80 s:py-120">

        {/* Left — header */}
        <div className="col-span-full s:col-start-2 s:col-span-5 s:sticky s:top-[10rem] s:h-fit mb-60 s:mb-0">
          <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-20">Contacto</p>
          <h2
            className="text-32 s:text-44 font-normal text-green leading-[1.1] mb-24"
            style={{ fontFamily: '"disp", Georgia, serif' }}
          >
            Cuéntanos sobre ti.
          </h2>
          <p className="text-grey text-15 leading-[1.8] mb-48" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '36rem' }}>
            Mientras más nos cuentes, mejor podremos recomendarte el camino correcto. No hay respuestas incorrectas.
          </p>
          <div className="space-y-16 pb-40" style={{ borderBottom: '1px solid #DEDAD3' }}>
            <p className="text-12 text-grey uppercase tracking-[0.12rem]">Contacto directo</p>
            <a href="mailto:contacto@orbbi.lat" className="block text-green text-18 font-normal hover:opacity-70 transition-opacity">
              contacto@orbbi.lat
            </a>
            <p className="text-grey text-13" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Lunes a viernes · Respuesta en menos de 24 hrs
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="col-span-full s:col-start-8 s:col-span-9">
          <form onSubmit={handleSubmit} className="space-y-56">

            {/* 01 */}
            <div>
              <BlockTitle num="01" label="Datos de contacto" />
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-32">
                <Field><Label>Nombre completo *</Label><TextInput name="nombre" placeholder="Tu nombre completo" value={form.nombre} onChange={set('nombre')} /></Field>
                <Field><Label>Correo electrónico *</Label><TextInput name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} /></Field>
                <Field><Label>Teléfono / WhatsApp</Label><TextInput name="telefono" placeholder="+56 9 1234 5678" value={form.telefono} onChange={set('telefono')} /></Field>
                <Field><Label>País</Label><SelectInput name="pais" value={form.pais} onChange={set('pais')} options={PAISES} placeholder="Selecciona tu país" /></Field>
              </div>
            </div>

            {/* 02 */}
            <div>
              <BlockTitle num="02" label="Tu perfil profesional" />
              <div className="grid grid-cols-1 s:grid-cols-2 gap-x-32 gap-y-32 mb-32">
                <Field><Label>Cargo o función actual</Label><TextInput name="cargo" placeholder="Ej: Gerente, Abogado, Docente..." value={form.cargo} onChange={set('cargo')} /></Field>
                <Field><Label>Sector o industria</Label><SelectInput name="sector" value={form.sector} onChange={set('sector')} options={SECTORES} placeholder="Selecciona tu sector" /></Field>
              </div>
              <div>
                <Label>Años de experiencia laboral</Label>
                <div className="grid grid-cols-2 s:grid-cols-4 gap-y-16 gap-x-24 mt-12">
                  {['10–15 años', '15–20 años', '20–25 años', '25+ años'].map(v => (
                    <Radio key={v} value={v} checked={form.experiencia === v} onChange={() => setForm(p => ({ ...p, experiencia: v }))} label={v} />
                  ))}
                </div>
              </div>
            </div>

            {/* 03 */}
            <div>
              <BlockTitle num="03" label="Tu relación con la IA hoy" />
              <div>
                <Label>¿Qué tan familiarizado estás con la inteligencia artificial?</Label>
                <div className="grid grid-cols-1 s:grid-cols-2 gap-y-16 gap-x-32 mt-12">
                  {[
                    'Nunca la he usado, no sé por dónde empezar',
                    'La he probado alguna vez, pero nada serio',
                    'La uso ocasionalmente, sin mucho orden',
                    'La uso regularmente pero quiero hacerlo mejor',
                  ].map(v => (
                    <Radio key={v} value={v} checked={form.nivelIA === v} onChange={() => setForm(p => ({ ...p, nivelIA: v }))} label={v} />
                  ))}
                </div>
              </div>
            </div>

            {/* 04 */}
            <div>
              <BlockTitle num="04" label="Qué estás buscando" />
              <div className="mb-32">
                <Label>¿El servicio es para ti o para tu equipo?</Label>
                <div className="flex flex-col s:flex-row gap-20 mt-12">
                  {['Para mí, de forma individual', 'Para mi equipo o empresa'].map(v => (
                    <Radio key={v} value={v} checked={form.para === v} onChange={() => setForm(p => ({ ...p, para: v }))} label={v} />
                  ))}
                </div>
              </div>
              {form.para === 'Para mi equipo o empresa' && (
                <div className="mb-32">
                  <Label>¿Cuántas personas aproximadamente?</Label>
                  <div className="grid grid-cols-2 s:grid-cols-4 gap-y-16 gap-x-24 mt-12">
                    {['2–5 personas', '6–15 personas', '16–50 personas', 'Más de 50'].map(v => (
                      <Radio key={v} value={v} checked={form.equipoTamano === v} onChange={() => setForm(p => ({ ...p, equipoTamano: v }))} label={v} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Label>¿Qué servicio te interesa? (puedes marcar más de uno)</Label>
                <div className="grid grid-cols-1 s:grid-cols-2 gap-y-16 gap-x-32 mt-12">
                  {SERVICIOS.map(s => (
                    <Checkbox key={s} checked={form.servicios.includes(s)} onChange={() => toggleServicio(s)} label={s} />
                  ))}
                </div>
              </div>
            </div>

            {/* 05 */}
            <div>
              <BlockTitle num="05" label="Cuéntanos más" />
              <div className="mb-32">
                <Label>¿Cuál es tu principal desafío o lo que quieres lograr?</Label>
                <textarea
                  placeholder="Describe con tus palabras qué te trajo aquí, qué quieres mejorar o qué problema quieres resolver..."
                  value={form.desafio} onChange={set('desafio')} rows={5}
                  className="w-full bg-transparent border-b border-[#DEDAD3] py-14 text-green text-15 placeholder-grey/40 outline-none focus:border-green transition-colors resize-none mt-2"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                />
              </div>
              <Field>
                <Label>¿Cómo nos encontraste?</Label>
                <SelectInput
                  name="comoNosEncontro" value={form.comoNosEncontro} onChange={set('comoNosEncontro')}
                  options={['LinkedIn', 'Recomendación de un colega o amigo', 'Google', 'Instagram', 'Un evento o charla', 'Prensa o medios', 'Otro']}
                  placeholder="Selecciona una opción"
                />
              </Field>
            </div>

            {/* Submit */}
            <div className="flex flex-col s:flex-row s:items-center justify-between gap-20 pt-20" style={{ borderTop: '1px solid #DEDAD3' }}>
              <p className="text-grey/50 text-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
                * Campos requeridos. Tu información es confidencial.
              </p>
              <button
                type="submit"
                disabled={!form.nombre || !form.email || loading}
                className="inline-flex items-center gap-10 text-12 font-medium uppercase tracking-[0.12rem] text-white bg-green px-32 py-16 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
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
