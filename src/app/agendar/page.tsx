'use client'
import { useState, useEffect } from 'react'

// Slots base en hora Santiago (UTC-4 en invierno, UTC-3 en verano)
// Se muestran como hora Santiago y se convierten al timezone del usuario
const SLOTS_HORA = [9, 11, 15, 17] // 9am, 11am, 3pm, 5pm

// Patrón de slots bloqueados determinístico por fecha (no cambia en refresh)
// Retorna true si el slot está "tomado"
function esTomado(fecha: Date, horaIdx: number): boolean {
  const seed = fecha.getDate() * 7 + fecha.getMonth() * 31 + horaIdx * 13
  // ~65% de slots tomados
  return (seed % 10) < 6
}

function getNombreDia(fecha: Date, tz: string): string {
  return fecha.toLocaleDateString('es', { weekday: 'long', timeZone: tz })
}

function getFechaNombreCorto(fecha: Date, tz: string): string {
  return fecha.toLocaleDateString('es', { day: 'numeric', month: 'short', timeZone: tz })
}

// Convierte hora Santiago a timezone del usuario
function convertirHora(fecha: Date, horaSantiago: number, userTZ: string): string {
  // Santiago = America/Santiago
  const iso = `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,'0')}-${String(fecha.getDate()).padStart(2,'0')}T${String(horaSantiago).padStart(2,'0')}:00:00`
  // Crear fecha como si fuera en Santiago
  const enSantiago = new Date(new Date(iso).toLocaleString('en-US', { timeZone: 'America/Santiago' }))
  const diff = new Date(iso).getTime() - enSantiago.getTime()
  const fechaReal = new Date(new Date(iso).getTime() + diff)

  return fechaReal.toLocaleTimeString('es', {
    timeZone: userTZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function getNombreTZ(tz: string): string {
  const nombres: Record<string, string> = {
    'America/Santiago': 'Santiago',
    'America/Mexico_City': 'Ciudad de México',
    'America/Bogota': 'Bogotá',
    'America/Lima': 'Lima',
    'America/Buenos_Aires': 'Buenos Aires',
    'America/Argentina/Buenos_Aires': 'Buenos Aires',
    'America/Montevideo': 'Montevideo',
    'America/Guayaquil': 'Guayaquil',
    'America/Asuncion': 'Asunción',
    'America/La_Paz': 'La Paz',
    'America/Caracas': 'Caracas',
    'America/Managua': 'Managua',
    'America/Guatemala': 'Guatemala',
    'America/Costa_Rica': 'San José',
    'America/Panama': 'Panamá',
    'Europe/Madrid': 'Madrid',
  }
  return nombres[tz] || tz.split('/')[1]?.replace('_', ' ') || tz
}

// Genera los próximos 7 días hábiles (lun-sáb)
function getDiasDisponibles(): Date[] {
  const dias: Date[] = []
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  let d = new Date(hoy)
  d.setDate(d.getDate() + 1) // empieza mañana
  while (dias.length < 7) {
    const dow = d.getDay()
    if (dow !== 0) { // excluye domingo
      dias.push(new Date(d))
    }
    d.setDate(d.getDate() + 1)
  }
  return dias
}

type Slot = { fecha: Date; hora: number }

export default function Agendar() {
  const [userTZ, setUserTZ]     = useState('America/Santiago')
  const [diaIdx, setDiaIdx]     = useState(0)
  const [selected, setSelected] = useState<Slot | null>(null)
  const [form, setForm]         = useState({ nombre: '', email: '', profesion: '' })
  const [st, setSt]             = useState<'idle'|'sending'|'ok'|'err'>('idle')
  const [dias, setDias]         = useState<Date[]>([])

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setUserTZ(tz)
    setDias(getDiasDisponibles())
  }, [])

  const diaActivo = dias[diaIdx]

  async function confirmar(e: React.FormEvent) {
    e.preventDefault()
    if (!selected || !form.nombre || !form.email) return
    setSt('sending')

    const horaUsuario = convertirHora(selected.fecha, selected.hora, userTZ)
    const slotLabel = `${getNombreDia(selected.fecha, 'America/Santiago')} ${getFechaNombreCorto(selected.fecha, 'America/Santiago')} · ${selected.hora}:00 Santiago / ${horaUsuario} ${getNombreTZ(userTZ)}`

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'agendar',
          msg: `Solicitud de diagnóstico: ${slotLabel}`,
          slot: slotLabel,
        }),
      })
      setSt(r.ok ? 'ok' : 'err')
    } catch {
      setSt('err')
    }
  }

  if (st === 'ok') {
    return (
      <main style={{ minHeight:'100vh', background:'#0F0E0D', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
        <div style={{ textAlign:'center', maxWidth:480 }}>
          <div style={{ width:56,height:56,borderRadius:'50%',border:'1px solid rgba(250,250,249,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',fontSize:22,color:'#FAFAF9' }}>✓</div>
          <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(32px,4vw,48px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#FAFAF9', marginBottom:16 }}>
            Solicitud recibida.
          </h1>
          <p style={{ fontSize:17, lineHeight:'26px', color:'rgba(250,250,249,0.45)', marginBottom:8 }}>
            Te confirmamos el horario por email en menos de 24 horas.
          </p>
          {selected && (
            <p style={{ fontSize:14, color:'rgba(250,250,249,0.3)', marginBottom:40 }}>
              Slot solicitado: {convertirHora(selected.fecha, selected.hora, userTZ)} ({getNombreTZ(userTZ)}) · {getFechaNombreCorto(selected.fecha, userTZ)}
            </p>
          )}
          <a href="/" style={{ fontSize:14, color:'rgba(250,250,249,0.3)', textDecoration:'none' }}>Volver al inicio</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight:'100vh', background:'#0F0E0D', padding:'60px 20px' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>

        {/* Logo */}
        <a href="/" style={{ display:'block', marginBottom:52, textDecoration:'none' }}>
          <span style={{ fontFamily:'"disp",Georgia,serif', fontSize:26, fontWeight:400, color:'#FAFAF9', letterSpacing:'-0.03em' }}>Orbbi</span>
        </a>

        {/* Header */}
        <div style={{ marginBottom:48 }}>
          <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(250,250,249,0.35)', marginBottom:14 }}>
            Diagnóstico gratis · 30 min
          </p>
          <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(32px,4vw,48px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#FAFAF9', marginBottom:12 }}>
            Elige un horario.
          </h1>
          <p style={{ fontSize:15, color:'rgba(250,250,249,0.4)', display:'flex', alignItems:'center', gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}>
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Horarios en tu zona horaria: <strong style={{ color:'rgba(250,250,249,0.7)', fontWeight:500 }}>{getNombreTZ(userTZ)}</strong>
          </p>
        </div>

        {!selected ? (
          <>
            {/* Selector de días */}
            <div style={{ display:'flex', gap:8, marginBottom:32, overflowX:'auto', paddingBottom:4 }}>
              {dias.map((d, i) => {
                const disponibles = SLOTS_HORA.filter(h => !esTomado(d, SLOTS_HORA.indexOf(h))).length
                return (
                  <button
                    key={i}
                    onClick={() => setDiaIdx(i)}
                    style={{
                      flexShrink:0,
                      padding:'12px 20px',
                      borderRadius:8,
                      border: diaIdx === i ? 'none' : '1px solid rgba(250,250,249,0.12)',
                      background: diaIdx === i ? '#FAFAF9' : 'transparent',
                      color: diaIdx === i ? '#0F0E0D' : 'rgba(250,250,249,0.6)',
                      cursor:'pointer',
                      textAlign:'center',
                      transition:'all .2s',
                    }}
                  >
                    <div style={{ fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, opacity:.7 }}>
                      {getNombreDia(d, userTZ).slice(0,3)}
                    </div>
                    <div style={{ fontSize:18, fontWeight:500, fontFamily:'"disp",Georgia,serif', marginBottom:2 }}>
                      {d.getDate()}
                    </div>
                    <div style={{ fontSize:11, opacity:.5 }}>
                      {disponibles} libre{disponibles !== 1 ? 's' : ''}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Slots del día activo */}
            {diaActivo && (
              <>
                <p style={{ fontSize:13, fontWeight:500, color:'rgba(250,250,249,0.3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>
                  {getNombreDia(diaActivo, userTZ)} {getFechaNombreCorto(diaActivo, userTZ)}
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                  {SLOTS_HORA.map((hora, hi) => {
                    const tomado = esTomado(diaActivo, hi)
                    const horaLocal = convertirHora(diaActivo, hora, userTZ)
                    return (
                      <div
                        key={hora}
                        onClick={() => !tomado && setSelected({ fecha: diaActivo, hora })}
                        style={{
                          padding:'18px 24px',
                          borderRadius:10,
                          border: tomado
                            ? '1px solid rgba(250,250,249,0.06)'
                            : '1px solid rgba(250,250,249,0.18)',
                          background: tomado ? 'transparent' : 'rgba(250,250,249,0.04)',
                          cursor: tomado ? 'default' : 'pointer',
                          display:'flex', alignItems:'center', justifyContent:'space-between',
                          transition:'all .2s',
                          opacity: tomado ? 0.4 : 1,
                        }}
                        onMouseEnter={e => { if (!tomado) e.currentTarget.style.background = 'rgba(250,250,249,0.08)' }}
                        onMouseLeave={e => { if (!tomado) e.currentTarget.style.background = 'rgba(250,250,249,0.04)' }}
                      >
                        <div>
                          <p style={{ fontSize:17, fontWeight:500, color: tomado ? 'rgba(250,250,249,0.3)' : '#FAFAF9', marginBottom:2 }}>
                            {horaLocal}
                          </p>
                          <p style={{ fontSize:12, color:'rgba(250,250,249,0.3)' }}>
                            {hora}:00 Santiago
                          </p>
                        </div>
                        <span style={{
                          fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em',
                          color: tomado ? 'rgba(250,250,249,0.25)' : 'rgba(250,250,249,0.5)',
                          borderRadius:100,
                          padding:'3px 10px',
                          border: `1px solid ${tomado ? 'rgba(250,250,249,0.08)' : 'rgba(250,250,249,0.2)'}`,
                        }}>
                          {tomado ? 'Reservado' : 'Disponible'}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <p style={{ fontSize:12, color:'rgba(250,250,249,0.2)', marginTop:20, textAlign:'center' }}>
                  Los horarios mostrados están en tu zona horaria local · Santiago confirma por email
                </p>
              </>
            )}
          </>
        ) : (
          /* Formulario de confirmación */
          <div style={{ maxWidth:480 }}>
            <button
              onClick={() => setSelected(null)}
              style={{ background:'none', border:'none', color:'rgba(250,250,249,0.4)', cursor:'pointer', fontSize:14, marginBottom:32, padding:0, display:'flex', alignItems:'center', gap:6 }}
            >
              ← Cambiar horario
            </button>

            {/* Slot confirmado */}
            <div style={{ background:'rgba(250,250,249,0.06)', border:'1px solid rgba(250,250,249,0.12)', borderRadius:10, padding:'20px 24px', marginBottom:36 }}>
              <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(250,250,249,0.35)', marginBottom:8 }}>
                Horario seleccionado
              </p>
              <p style={{ fontSize:20, fontWeight:500, color:'#FAFAF9', marginBottom:4 }}>
                {convertirHora(selected.fecha, selected.hora, userTZ)} — {getNombreDia(selected.fecha, userTZ)}, {getFechaNombreCorto(selected.fecha, userTZ)}
              </p>
              <p style={{ fontSize:13, color:'rgba(250,250,249,0.35)' }}>
                {selected.hora}:00 Santiago · {getNombreTZ(userTZ)}
              </p>
            </div>

            <form onSubmit={confirmar} noValidate style={{ display:'flex', flexDirection:'column', gap:24 }}>
              {[
                { k:'nombre', l:'Nombre', t:'text', p:'Tu nombre completo' },
                { k:'email',  l:'Email',  t:'email', p:'tu@email.com' },
                { k:'profesion', l:'Profesión', t:'text', p:'Ej: Abogado, Médico, Docente...' },
              ].map(f => (
                <div key={f.k} style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <label style={{ fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(250,250,249,0.35)' }}>
                    {f.l} *
                  </label>
                  <input
                    className="field-dark"
                    type={f.t}
                    value={form[f.k as keyof typeof form]}
                    onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))}
                    placeholder={f.p}
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="btn-hero"
                disabled={st === 'sending'}
                style={{ opacity: st === 'sending' ? .6 : 1, marginTop:8 }}
              >
                {st === 'sending' ? 'Enviando…' : 'Confirmar diagnóstico'}
              </button>
              {st === 'err' && <p style={{ fontSize:13, color:'rgba(255,100,100,.8)' }}>Error. Escríbenos a cseplataforma@gmail.com</p>}
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
