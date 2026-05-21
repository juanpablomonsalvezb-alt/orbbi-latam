'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LeadMagnetPage() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre || !email) return
    setSt('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, email,
          profesion: 'No especificado',
          motivo: 'Descargó el PDF de 100 prompts',
          objetivo: 'Recibir el ebook gratis de 100 prompts en español',
          source: 'lead-magnet-100-prompts',
        }),
      })
      if (r.ok) {
        setSt('ok')
        setTimeout(() => {
          window.location.href = '/recursos/100-prompts-orbbi.pdf'
        }, 1200)
      } else {
        setSt('err')
      }
    } catch { setSt('err') }
  }

  return (
    <main style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid rgba(15,14,13,0.1)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: '"disp",Georgia,serif', fontSize: 22, color: '#0F0E0D', letterSpacing: '-0.5px' }}>Orbbi</span>
          </Link>
          <Link href="/agendar" style={{ background: '#0F0E0D', color: '#FAFAF9', padding: '10px 18px', borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            Agendar diagnóstico gratis →
          </Link>
        </div>
      </header>

      <section style={{ padding: '64px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="lead-magnet-grid">

          {/* LEFT */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
              Recurso gratis · PDF descargable
            </p>
            <h1 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(36px,5vw,56px)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              fontWeight: 400, color: '#0F0E0D', marginBottom: 20,
            }}>
              100 prompts en español para profesionales LATAM
            </h1>
            <p style={{ fontSize: 18, lineHeight: '28px', color: 'rgba(15,14,13,0.6)', marginBottom: 32 }}>
              Colección curada de prompts probados por abogados, médicos, contadores, docentes, emprendedores y ejecutivos de Latinoamérica. Listos para copiar y adaptar en ChatGPT, Claude, Gemini o Perplexity.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, marginBottom: 32 }}>
              {[
                '10 prompts para abogados (contratos, jurisprudencia, demandas)',
                '10 prompts para médicos (con anonimización obligatoria)',
                '10 prompts para contadores (cierre mensual, declaraciones)',
                '10 prompts para docentes (planificación, evaluaciones)',
                '10 prompts para emprendedores (validación, pitches)',
                '10 prompts para ejecutivos (board decks, briefings)',
                '40 prompts de productividad, comunicación e investigación',
              ].map((it, i) => (
                <li key={i} style={{ fontSize: 15, color: '#0F0E0D', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: 'rgba(110,231,160,0.9)', flexShrink: 0, marginTop: 2 }}>✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Form */}
          <div style={{ background: '#fff', border: '1px solid rgba(15,14,13,0.1)', borderRadius: 16, padding: '40px 36px' }}>
            {st === 'ok' ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(15,14,13,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22 }}>
                  ✓
                </div>
                <h2 style={{ fontFamily: '"disp",Georgia,serif', fontSize: 28, fontWeight: 400, color: '#0F0E0D', marginBottom: 12 }}>
                  Listo, descargando…
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(15,14,13,0.55)' }}>
                  Tu PDF se está abriendo. Si no descarga,{' '}
                  <a href="/recursos/100-prompts-orbbi.pdf" style={{ color: '#0F0E0D', textDecoration: 'underline' }}>
                    click acá
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(15,14,13,0.4)' }}>
                  Descarga gratis
                </p>
                <h2 style={{ fontFamily: '"disp",Georgia,serif', fontSize: 26, fontWeight: 400, color: '#0F0E0D', lineHeight: 1.2 }}>
                  Recibí los 100 prompts en mi correo
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(15,14,13,0.4)' }}>Nombre *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    style={{ padding: '11px 0', border: 'none', borderBottom: '1px solid rgba(15,14,13,0.15)', fontSize: 15, outline: 'none', background: 'transparent' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(15,14,13,0.4)' }}>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    style={{ padding: '11px 0', border: 'none', borderBottom: '1px solid rgba(15,14,13,0.15)', fontSize: 15, outline: 'none', background: 'transparent' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={st === 'sending'}
                  style={{
                    marginTop: 12, height: 48, borderRadius: 6,
                    background: '#0F0E0D', color: '#FAFAF9', border: 'none',
                    fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    opacity: st === 'sending' ? 0.6 : 1,
                  }}
                >
                  {st === 'sending' ? 'Enviando…' : 'Descargar PDF gratis'}
                </button>
                {st === 'err' && <p style={{ fontSize: 13, color: 'rgba(200,50,50,.8)' }}>Error. Intenta nuevamente.</p>}
                <p style={{ fontSize: 11, color: 'rgba(15,14,13,0.35)', textAlign: 'center', marginTop: 8 }}>
                  Sin spam · Cancelable en cualquier momento
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      <footer style={{ background: '#0F0E0D', color: 'rgba(250,250,249,0.5)', padding: '32px 20px', textAlign: 'center', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} Orbbi Latam · <Link href="/privacidad" style={{ color: 'rgba(250,250,249,0.6)' }}>Privacidad</Link> · <Link href="/terminos" style={{ color: 'rgba(250,250,249,0.6)' }}>Términos</Link></p>
      </footer>
    </main>
  )
}
