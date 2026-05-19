import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada | Orbbi Latam',
}

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0F0E0D',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <span style={{
        fontFamily: '"disp",Georgia,serif',
        fontSize: 'clamp(100px,20vw,180px)',
        lineHeight: 1,
        color: 'rgba(250,250,249,0.05)',
        letterSpacing: '-0.05em',
        userSelect: 'none',
        display: 'block',
        marginBottom: 24,
      }}>
        404
      </span>

      <p style={{
        fontSize: 13, fontWeight: 500, textTransform: 'uppercase',
        letterSpacing: '0.12em', color: 'rgba(250,250,249,0.35)',
        marginBottom: 16,
      }}>
        Página no encontrada
      </p>

      <h1 style={{
        fontFamily: '"disp",Georgia,serif',
        fontSize: 'clamp(28px,4vw,44px)',
        lineHeight: 1.05, letterSpacing: '-0.03em',
        fontWeight: 400, color: '#FAFAF9',
        marginBottom: 16, maxWidth: 480,
      }}>
        Esta página no existe.
      </h1>

      <p style={{
        fontSize: 16, lineHeight: '24px',
        color: 'rgba(250,250,249,0.45)',
        marginBottom: 48, maxWidth: 380,
      }}>
        Puede que el enlace haya cambiado o que la dirección esté mal escrita.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 44, padding: '0 24px',
            background: '#FAFAF9', color: '#0F0E0D',
            borderRadius: 4, fontSize: 14, fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Volver al inicio
        </Link>
        <Link
          href="/agendar"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 44, padding: '0 24px',
            background: 'transparent', color: '#FAFAF9',
            border: '1px solid rgba(250,250,249,0.25)',
            borderRadius: 4, fontSize: 14, fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Agendar diagnóstico
        </Link>
      </div>
    </main>
  )
}
