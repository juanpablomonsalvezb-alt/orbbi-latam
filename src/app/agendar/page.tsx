'use client'
import { useState, useEffect } from 'react'

const SLOTS_HORA = [9, 10, 11, 14, 15, 16, 17, 18]

// Todo reservado hasta el jueves 21 mayo inclusive, aleatorio desde el viernes 22
function esTomado(fecha: Date, horaIdx: number): boolean {
  const CORTE = new Date(2026, 4, 21) // 21 mayo 2026 (mes 0-indexed)
  CORTE.setHours(23, 59, 59, 999)
  if (fecha <= CORTE) return true
  const seed = fecha.getDate() * 11 + fecha.getMonth() * 37 + horaIdx * 17
  return (seed % 10) < 5
}

function getNombreDia(fecha: Date, tz: string): string {
  return fecha.toLocaleDateString('es', { weekday: 'long', timeZone: tz })
}

function getFechaCorta(fecha: Date, tz: string): string {
  return fecha.toLocaleDateString('es', { day: 'numeric', month: 'short', timeZone: tz })
}

function convertirHora(fecha: Date, horaSantiago: number, userTZ: string): string {
  const iso = `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,'0')}-${String(fecha.getDate()).padStart(2,'0')}T${String(horaSantiago).padStart(2,'0')}:00:00`
  const enSantiago = new Date(new Date(iso).toLocaleString('en-US', { timeZone: 'America/Santiago' }))
  const diff = new Date(iso).getTime() - enSantiago.getTime()
  const fechaReal = new Date(new Date(iso).getTime() + diff)
  return fechaReal.toLocaleTimeString('es', { timeZone: userTZ, hour: '2-digit', minute: '2-digit', hour12: false })
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
    'America/Guatemala': 'Guatemala',
    'America/Costa_Rica': 'San José',
    'America/Panama': 'Panamá',
    'Europe/Madrid': 'Madrid',
  }
  return nombres[tz] || tz.split('/')[1]?.replace('_', ' ') || tz
}

function getDiasDisponibles(): Date[] {
  const dias: Date[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  while (dias.length < 6) {
    if (d.getDay() !== 0) dias.push(new Date(d))
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
    const slotLabel = `${getNombreDia(selected.fecha, 'America/Santiago')} ${getFechaCorta(selected.fecha, 'America/Santiago')} · ${selected.hora}:00 Santiago / ${horaUsuario} ${getNombreTZ(userTZ)}`
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'agendar', msg: `Sesión de orientación: ${slotLabel}`, slot: slotLabel }),
      })
      setSt(r.ok ? 'ok' : 'err')
    } catch { setSt('err') }
  }

  if (st === 'ok') {
    return (
      <main style={{ minHeight:'100vh', background:'#FAFAF9', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
        <div style={{ textAlign:'center', maxWidth:480 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', border:'1px solid rgba(15,14,13,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', fontSize:22, color:'#0F0E0D' }}>✓</div>
          <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(32px,4vw,48px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', marginBottom:16 }}>
            Solicitud recibida.
          </h1>
          <p style={{ fontSize:17, lineHeight:'26px', color:'rgba(15,14,13,0.5)', marginBottom:8 }}>
            Te confirmamos el horario por email en menos de 24 horas.
          </p>
          {selected && (
            <p style={{ fontSize:14, color:'rgba(15,14,13,0.35)', marginBottom:40 }}>
              {convertirHora(selected.fecha, selected.hora, userTZ)} · {getFechaCorta(selected.fecha, userTZ)} · {getNombreTZ(userTZ)}
            </p>
          )}
          <a href="/" style={{ fontSize:14, color:'rgba(15,14,13,0.35)', textDecoration:'none' }}>Volver al inicio</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight:'100vh', background:'#FAFAF9' }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'52px 24px 80px' }}>

        {/* Logo */}
        <a href="/" style={{ display:'block', marginBottom:56, textDecoration:'none' }}>
          <span style={{ fontFamily:'"disp",Georgia,serif', fontSize:26, fontWeight:400, color:'#0F0E0D', letterSpacing:'-0.03em' }}>Orbbi</span>
        </a>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:64, alignItems:'start' }} className="agendar-grid">

          {/* Columna izquierda — calendario */}
          <div>
            {/* Header */}
            <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(15,14,13,0.4)', marginBottom:14 }}>
              Sesión de orientación · 30 min · Gratis
            </p>
            <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(32px,4vw,44px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#0F0E0D', marginBottom:10 }}>
              Elige un horario.
            </h1>
            <p style={{ fontSize:14, color:'rgba(15,14,13,0.45)', marginBottom:40, display:'flex', alignItems:'center', gap:6 }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Tu zona horaria: <strong style={{ color:'#0F0E0D', fontWeight:500 }}>{getNombreTZ(userTZ)}</strong>
            </p>

            {/* Tabs de días */}
            <div style={{ display:'flex', gap:6, marginBottom:28, overflowX:'auto', paddingBottom:2 }}>
              {dias.map((d, i) => {
                const libres = SLOTS_HORA.filter((_, hi) => !esTomado(d, hi)).length
                const activo = diaIdx === i
                return (
                  <button
                    key={i}
                    onClick={() => { setDiaIdx(i); setSelected(null) }}
                    style={{
                      flexShrink:0,
                      padding:'10px 16px',
                      borderRadius:8,
                      border: activo ? '1.5px solid #0F0E0D' : '1px solid rgba(15,14,13,0.12)',
                      background: activo ? '#0F0E0D' : '#fff',
                      color: activo ? '#FAFAF9' : 'rgba(15,14,13,0.6)',
                      cursor:'pointer',
                      textAlign:'center',
                      transition:'all .18s',
                    }}
                  >
                    <div style={{ fontSize:10, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3, opacity:.7 }}>
                      {getNombreDia(d, userTZ).slice(0,3)}
                    </div>
                    <div style={{ fontSize:17, fontWeight:500, marginBottom:2 }}>
                      {d.getDate()}
                    </div>
                    <div style={{ fontSize:10, opacity:.55 }}>
                      {libres} libre{libres !== 1 ? 's' : ''}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Leyenda */}
            <div style={{ display:'flex', gap:20, marginBottom:20 }}>
              {[
                { color:'#0F0E0D', label:'Disponible' },
                { color:'rgba(15,14,13,0.12)', label:'Reservado' },
              ].map(l => (
                <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:l.color }} />
                  <span style={{ fontSize:12, color:'rgba(15,14,13,0.45)' }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Grid de slots */}
            {diaActivo && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }} className="slots-grid">
                {SLOTS_HORA.map((hora, hi) => {
                  const tomado   = esTomado(diaActivo, hi)
                  const elegido  = selected?.hora === hora && selected?.fecha.toDateString() === diaActivo.toDateString()
                  const horaLocal = convertirHora(diaActivo, hora, userTZ)
                  return (
                    <button
                      key={hora}
                      disabled={tomado}
                      onClick={() => setSelected({ fecha: diaActivo, hora })}
                      style={{
                        padding:'14px 10px',
                        borderRadius:8,
                        border: elegido
                          ? '2px solid #0F0E0D'
                          : tomado
                            ? '1px solid rgba(15,14,13,0.07)'
                            : '1px solid rgba(15,14,13,0.18)',
                        background: elegido
                          ? '#0F0E0D'
                          : tomado
                            ? 'rgba(15,14,13,0.04)'
                            : '#fff',
                        cursor: tomado ? 'default' : 'pointer',
                        textAlign:'center',
                        transition:'all .15s',
                        boxShadow: elegido ? '0 2px 12px rgba(15,14,13,0.15)' : 'none',
                      }}
                      onMouseEnter={e => { if (!tomado && !elegido) e.currentTarget.style.borderColor = '#0F0E0D' }}
                      onMouseLeave={e => { if (!tomado && !elegido) e.currentTarget.style.borderColor = 'rgba(15,14,13,0.18)' }}
                    >
                      <p style={{
                        fontSize:15, fontWeight:500, marginBottom:2,
                        color: elegido ? '#FAFAF9' : tomado ? 'rgba(15,14,13,0.25)' : '#0F0E0D',
                      }}>
                        {horaLocal}
                      </p>
                      <p style={{
                        fontSize:10,
                        color: elegido ? 'rgba(250,250,249,0.5)' : 'rgba(15,14,13,0.3)',
                      }}>
                        {tomado ? 'Reservado' : `${hora}:00 SCL`}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Columna derecha — formulario */}
          <div style={{
            background:'#fff',
            border:'1px solid rgba(15,14,13,0.1)',
            borderRadius:16,
            padding:'36px 32px',
            position:'sticky',
            top:40,
          }}>
            <p style={{ fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,14,13,0.4)', marginBottom:20 }}>
              Tu reserva
            </p>

            {/* Slot seleccionado */}
            {selected ? (
              <div style={{ background:'#F2F1F0', borderRadius:8, padding:'14px 16px', marginBottom:28 }}>
                <p style={{ fontSize:15, fontWeight:500, color:'#0F0E0D', marginBottom:3 }}>
                  {convertirHora(selected.fecha, selected.hora, userTZ)} · {getNombreDia(selected.fecha, userTZ)}
                </p>
                <p style={{ fontSize:12, color:'rgba(15,14,13,0.45)' }}>
                  {getFechaCorta(selected.fecha, userTZ)} · {getNombreTZ(userTZ)}
                </p>
                <p style={{ fontSize:11, color:'rgba(15,14,13,0.35)', marginTop:4 }}>
                  {selected.hora}:00 hora Santiago
                </p>
              </div>
            ) : (
              <div style={{ background:'#F2F1F0', borderRadius:8, padding:'14px 16px', marginBottom:28, textAlign:'center' }}>
                <p style={{ fontSize:14, color:'rgba(15,14,13,0.4)' }}>
                  Selecciona un horario
                </p>
              </div>
            )}

            <form onSubmit={confirmar} noValidate style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {[
                { k:'nombre',    l:'Nombre',    t:'text',  p:'Tu nombre' },
                { k:'email',     l:'Email',     t:'email', p:'tu@email.com' },
                { k:'profesion', l:'Profesión', t:'text',  p:'Médico, Abogado, Docente...' },
              ].map(f => (
                <div key={f.k} style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <label style={{ fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(15,14,13,0.4)' }}>
                    {f.l} *
                  </label>
                  <input
                    type={f.t}
                    value={form[f.k as keyof typeof form]}
                    onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))}
                    placeholder={f.p}
                    required
                    style={{
                      width:'100%', padding:'11px 0', background:'transparent',
                      border:'none', borderBottom:'1px solid rgba(15,14,13,0.15)',
                      color:'#0F0E0D', fontFamily:'"sans",system-ui,sans-serif',
                      fontSize:15, outline:'none', transition:'border-color .2s',
                    }}
                    onFocus={e => e.target.style.borderBottomColor = '#0F0E0D'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(15,14,13,0.15)'}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={!selected || st === 'sending'}
                style={{
                  marginTop:8, height:46, borderRadius:6,
                  background: selected ? '#0F0E0D' : 'rgba(15,14,13,0.08)',
                  border:'none', color: selected ? '#FAFAF9' : 'rgba(15,14,13,0.3)',
                  fontSize:14, fontWeight:500,
                  fontFamily:'"sans",system-ui,sans-serif',
                  cursor: selected ? 'pointer' : 'default',
                  transition:'all .2s',
                  opacity: st === 'sending' ? .6 : 1,
                }}
              >
                {st === 'sending' ? 'Enviando…' : selected ? 'Confirmar sesión' : 'Elige un horario primero'}
              </button>

              {st === 'err' && <p style={{ fontSize:12, color:'rgba(200,50,50,.8)' }}>Error. Escríbenos a cse.coordinacion@gmail.com</p>}

              <p style={{ fontSize:11, color:'rgba(15,14,13,0.3)', textAlign:'center', lineHeight:'16px' }}>
                Sin costo · Te confirmamos por email en menos de 24h
              </p>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}
