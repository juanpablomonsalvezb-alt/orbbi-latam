'use client'
import { useEffect, useState } from 'react'

const ACTIVIDAD = [
  { nombre: 'Rodrigo M.', ciudad: 'Santiago', accion: 'agendó su diagnóstico', hace: '12 min' },
  { nombre: 'Camila V.', ciudad: 'Bogotá', accion: 'completó su primera sesión', hace: '34 min' },
  { nombre: 'Andrés T.', ciudad: 'Ciudad de México', accion: 'agendó su diagnóstico', hace: '1 h' },
  { nombre: 'Patricia L.', ciudad: 'Lima', accion: 'inició el programa de 4 sesiones', hace: '2 h' },
  { nombre: 'Sebastián R.', ciudad: 'Buenos Aires', accion: 'agendó su diagnóstico', hace: '3 h' },
  { nombre: 'Valentina C.', ciudad: 'Monterrey', accion: 'completó su primera sesión', hace: '4 h' },
  { nombre: 'Carlos M.', ciudad: 'Medellín', accion: 'inició el programa de 4 sesiones', hace: '5 h' },
]

export default function ActivityToast() {
  const [visible, setVisible] = useState(false)
  const [idx, setIdx]         = useState(0)

  useEffect(() => {
    // Primera notificación a los 6s
    const first = setTimeout(() => {
      setIdx(Math.floor(Math.random() * ACTIVIDAD.length))
      setVisible(true)
    }, 6000)

    return () => clearTimeout(first)
  }, [])

  useEffect(() => {
    if (!visible) return
    // Ocultar después de 5s
    const hide = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(hide)
  }, [visible])

  useEffect(() => {
    if (visible) return
    // Mostrar la siguiente a los 20-40s
    const next = setTimeout(() => {
      setIdx(i => (i + 1) % ACTIVIDAD.length)
      setVisible(true)
    }, 20000 + Math.random() * 20000)
    return () => clearTimeout(next)
  }, [visible])

  const a = ACTIVIDAD[idx]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: 28,
        zIndex: 9999,
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div style={{
        background: '#fff',
        border: '1px solid rgba(15,14,13,0.1)',
        borderRadius: 12,
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 4px 24px rgba(15,14,13,0.1)',
        maxWidth: 320,
      }}>
        {/* Avatar inicial */}
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#0F0E0D',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#FAFAF9', fontFamily: '"disp",Georgia,serif' }}>
            {a.nombre[0]}
          </span>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#0F0E0D', marginBottom: 2, lineHeight: '18px' }}>
            {a.nombre} · {a.ciudad}
          </p>
          <p style={{ fontSize: 12, color: 'rgba(15,14,13,0.5)', lineHeight: '16px' }}>
            {a.accion} · hace {a.hace}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, color: 'rgba(15,14,13,0.3)', fontSize: 16, lineHeight: 1 }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
