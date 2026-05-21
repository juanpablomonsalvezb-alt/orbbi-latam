import { ImageResponse } from 'next/og'

export const alt = 'Orbbi — Agendar diagnóstico gratis de IA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
  return new ImageResponse(
    (
      <div style={{
        background: '#0F0E0D',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '64px 80px',
      }}>
        <div style={{ fontSize: 28, color: '#FAFAF9', marginBottom: 'auto', display: 'flex' }}>
          Orbbi
        </div>
        <div style={{
          fontSize: 18, color: 'rgba(110,231,160,0.95)',
          textTransform: 'uppercase', letterSpacing: '0.14em',
          marginBottom: 24, display: 'flex',
        }}>
          Diagnóstico GRATIS · 30 minutos
        </div>
        <div style={{
          fontSize: 76, color: '#FAFAF9',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          maxWidth: 980, marginBottom: 32,
          display: 'flex',
        }}>
          Agendá tu sesión de orientación con un mentor de IA
        </div>
        <div style={{
          fontSize: 20, color: 'rgba(250,250,249,0.55)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span>Sin costo · Sin compromiso</span>
          <span style={{ color: 'rgba(250,250,249,0.3)' }}>·</span>
          <span>orbbilatam.com/agendar</span>
        </div>
      </div>
    ),
    size
  )
}
