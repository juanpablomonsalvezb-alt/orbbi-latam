import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Orbbi — Mentoría 1:1 de IA para Profesionales en Latinoamérica'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0F0E0D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top: logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 28, color: 'rgba(250,250,249,0.9)', letterSpacing: '-0.5px' }}>
            Orbbi
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{
            fontSize: 72,
            lineHeight: 1.0,
            letterSpacing: '-2px',
            color: '#FAFAF9',
            fontWeight: 400,
            maxWidth: 900,
          }}>
            Mentoría 1:1 de IA para profesionales de Latinoamérica.
          </span>
          <span style={{
            fontSize: 24,
            color: 'rgba(250,250,249,0.45)',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.2px',
          }}>
            Aprende a usar inteligencia artificial en tu trabajo real. Desde $90 USD.
          </span>
        </div>

        {/* Bottom: trust signals */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['100% online', 'Sesiones 1:1', 'Chile · México · Colombia · Argentina'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 15,
                color: 'rgba(250,250,249,0.4)',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <span style={{ color: 'rgba(250,250,249,0.2)', fontSize: 18 }}>·</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
