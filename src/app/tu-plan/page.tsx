'use client'
import { useState } from 'react'

type PlanId = 'sesion' | 'programa'

async function iniciarPago(planId: PlanId, setLoading: (id: PlanId | null) => void) {
  setLoading(planId)
  try {
    const res = await fetch('/api/mp/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: planId }),
    })
    const data = await res.json()
    if (data.init_point) {
      window.location.href = data.init_point
    } else {
      alert('Error al iniciar el pago. Escríbenos a cseplataforma@gmail.com')
    }
  } catch {
    alert('Error al iniciar el pago. Escríbenos a cseplataforma@gmail.com')
  } finally {
    setLoading(null)
  }
}

const PLANES = [
  {
    id: 'sesion' as PlanId,
    name: '1 Sesión',
    price: '$90',
    currency: 'USD',
    duration: '60 minutos',
    desc: 'Para aplicar lo que conversamos en una sesión concreta. Ideal si tienes un objetivo claro.',
    items: [
      '60 minutos 1:1 aplicados a tu trabajo real',
      'Recursos y prompts personalizados',
      'Acceso por WhatsApp 48h post-sesión',
    ],
    cta: 'Reservar sesión — $90 USD',
    highlight: false,
  },
  {
    id: 'programa' as PlanId,
    name: 'Programa 4 Sesiones',
    price: '$299',
    currency: 'USD',
    duration: '4 semanas · 1 sesión por semana',
    desc: 'El programa completo. Aprendes, implementas y mides resultados con acompañamiento continuo.',
    items: [
      '4 sesiones de 60 min — 1 por semana',
      'Plan de aprendizaje diseñado para ti',
      'Implementación guiada en tu trabajo real',
      'Soporte por WhatsApp entre sesiones',
      'Recursos, prompts y plantillas personalizadas',
      'Ahorras $61 vs. sesiones individuales',
    ],
    cta: 'Empezar el programa — $299 USD',
    highlight: true,
  },
]

export default function TuPlan() {
  const [loading, setLoading] = useState<PlanId | null>(null)

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0F0E0D',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>

      {/* Logo */}
      <a href="/" style={{ marginBottom: 56, textDecoration: 'none' }}>
        <span style={{
          fontFamily: '"disp",Georgia,serif',
          fontSize: 28,
          fontWeight: 400,
          color: '#FAFAF9',
          letterSpacing: '-0.03em',
        }}>
          Orbbi
        </span>
      </a>

      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 520 }}>
        <p style={{
          fontSize: 12, fontWeight: 500, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'rgba(250,250,249,0.35)',
          marginBottom: 16,
        }}>
          Ya conversamos
        </p>
        <h1 style={{
          fontFamily: '"disp",Georgia,serif',
          fontSize: 'clamp(36px,5vw,52px)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          fontWeight: 400, color: '#FAFAF9',
          marginBottom: 16,
        }}>
          Elige tu programa.
        </h1>
        <p style={{
          fontSize: 17, lineHeight: '26px',
          color: 'rgba(250,250,249,0.45)',
        }}>
          Basado en tu diagnóstico, estos son los dos caminos disponibles. Elige el que mejor se ajusta a tu ritmo y objetivos.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        width: '100%',
        maxWidth: 780,
      }}
        className="tu-plan-grid"
      >
        {PLANES.map(p => (
          <div
            key={p.id}
            style={{
              background: p.highlight ? '#FAFAF9' : 'rgba(250,250,249,0.05)',
              border: p.highlight ? 'none' : '1px solid rgba(250,250,249,0.1)',
              borderRadius: 16,
              padding: '40px 36px 36px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {p.highlight && (
              <span style={{
                position: 'absolute', top: 20, right: 20,
                fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: '#0F0E0D',
                background: 'rgba(15,14,13,0.1)',
                borderRadius: 100, padding: '4px 12px',
              }}>
                Más elegido
              </span>
            )}

            <p style={{
              fontSize: 12, fontWeight: 500, textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: p.highlight ? 'rgba(15,14,13,0.45)' : 'rgba(250,250,249,0.4)',
              marginBottom: 20,
            }}>
              {p.name}
            </p>

            <div style={{ marginBottom: 6 }}>
              <span style={{
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(44px,5vw,64px)',
                lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 400,
                color: p.highlight ? '#0F0E0D' : '#FAFAF9',
              }}>
                {p.price}
              </span>
              {' '}
              <span style={{ fontSize: 15, color: p.highlight ? 'rgba(15,14,13,0.4)' : 'rgba(250,250,249,0.35)' }}>
                {p.currency}
              </span>
            </div>

            <p style={{
              fontSize: 13,
              color: p.highlight ? 'rgba(15,14,13,0.4)' : 'rgba(250,250,249,0.35)',
              marginBottom: 24,
            }}>
              {p.duration}
            </p>

            <div style={{ height: 1, background: p.highlight ? 'rgba(15,14,13,0.08)' : 'rgba(250,250,249,0.08)', marginBottom: 20 }} />

            <p style={{
              fontSize: 14, lineHeight: '22px',
              color: p.highlight ? 'rgba(15,14,13,0.6)' : 'rgba(250,250,249,0.5)',
              marginBottom: 24,
            }}>
              {p.desc}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 32 }}>
              {p.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2 7l3.5 3.5L12 3" stroke={p.highlight ? 'rgba(15,14,13,0.4)' : 'rgba(250,250,249,0.35)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, lineHeight: '20px', color: p.highlight ? 'rgba(15,14,13,0.7)' : 'rgba(250,250,249,0.65)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => iniciarPago(p.id, setLoading)}
              disabled={loading !== null}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 48, borderRadius: 6, width: '100%',
                background: p.highlight ? '#0F0E0D' : 'rgba(250,250,249,0.1)',
                border: 'none',
                color: p.highlight ? '#FAFAF9' : '#FAFAF9',
                fontSize: 14, fontWeight: 500,
                fontFamily: '"sans",system-ui,sans-serif',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'opacity .2s',
                opacity: loading && loading !== p.id ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '.75' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
            >
              {loading === p.id ? 'Redirigiendo…' : p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p style={{
        marginTop: 40, fontSize: 13,
        color: 'rgba(250,250,249,0.25)',
        textAlign: 'center',
      }}>
        Pago seguro con MercadoPago · ¿Dudas?{' '}
        <a href="mailto:cseplataforma@gmail.com" style={{ color: 'rgba(250,250,249,0.4)' }}>
          cseplataforma@gmail.com
        </a>
      </p>

    </main>
  )
}
