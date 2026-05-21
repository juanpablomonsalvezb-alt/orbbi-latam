import { ImageResponse } from 'next/og'

export const alt = 'Orbbi Blog — IA aplicada para profesionales LATAM'
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
          Orbbi · Blog
        </div>
        <div style={{
          fontSize: 64,
          color: '#FAFAF9',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          maxWidth: 980, marginBottom: 32,
          display: 'flex',
        }}>
          IA aplicada para profesionales de Latinoamérica
        </div>
        <div style={{
          fontSize: 20,
          color: 'rgba(250,250,249,0.55)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span>40+ guías, comparativas y casos reales</span>
          <span style={{ color: 'rgba(250,250,249,0.3)' }}>·</span>
          <span>orbbilatam.com/blog</span>
        </div>
      </div>
    ),
    size
  )
}
