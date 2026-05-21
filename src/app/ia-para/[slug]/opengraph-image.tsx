import { ImageResponse } from 'next/og'
import { PROFESIONES, PAISES } from '@/lib/seo/data'


export const alt = 'Orbbi — Mentoría 1:1 de IA para profesionales LATAM'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const dynamicParams = false

export async function generateStaticParams() {
  const out: { slug: string }[] = []
  PROFESIONES.forEach(p => {
    out.push({ slug: p.slug })
    PAISES.forEach(c => out.push({ slug: `${p.slug}-${c.slug}` }))
  })
  return out
}

function resolve(slug: string | undefined) {
  if (!slug) return { prof: undefined, pais: undefined }
  const exact = PROFESIONES.find(x => x.slug === slug)
  if (exact) return { prof: exact, pais: undefined }
  const parts = slug.split('-')
  for (const c of PAISES) {
    if (parts[parts.length - 1] === c.slug) {
      const profSlug = parts.slice(0, -1).join('-')
      const prof = PROFESIONES.find(x => x.slug === profSlug)
      if (prof) return { prof, pais: c }
    }
  }
  return { prof: undefined, pais: undefined }
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { prof, pais } = resolve(slug)

  const title = prof
    ? (pais ? `Mentoría IA para ${prof.pluralMasc} en ${pais.nombre}` : `Mentoría IA para ${prof.pluralMasc}`)
    : 'Orbbi — Mentoría 1:1 de IA'
  const subtitle = pais
    ? `${pais.gentilicio.charAt(0).toUpperCase() + pais.gentilicio.slice(1)}s · ${prof?.industria || ''}`
    : prof
      ? `${prof.industria} · Latinoamérica`
      : 'Profesionales LATAM'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F0E0D',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          padding: '64px 80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Inicial gigante background */}
        <div style={{
          position: 'absolute',
          bottom: -60, right: 40,
          fontSize: 480, fontWeight: 400,
          color: 'rgba(250,250,249,0.04)',
          lineHeight: 1, letterSpacing: '-0.05em',
          display: 'flex',
        }}>
          {prof ? prof.emoji : 'O'}
        </div>

        {/* Marca */}
        <div style={{
          fontSize: 28, fontWeight: 400,
          color: '#FAFAF9', letterSpacing: '-0.5px',
          marginBottom: 'auto',
          display: 'flex',
        }}>
          Orbbi
        </div>

        {/* Categoría */}
        <div style={{
          fontSize: 18, fontWeight: 500,
          color: 'rgba(250,250,249,0.5)',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          marginBottom: 24,
          display: 'flex',
        }}>
          {subtitle}
        </div>

        {/* Título */}
        <div style={{
          fontSize: 80, fontWeight: 400,
          color: '#FAFAF9',
          lineHeight: 1.05, letterSpacing: '-0.04em',
          maxWidth: 920,
          marginBottom: 32,
          display: 'flex',
        }}>
          {title}
        </div>

        {/* CTA */}
        <div style={{
          fontSize: 20, fontWeight: 400,
          color: 'rgba(250,250,249,0.65)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span>Diagnóstico gratis · 30 min</span>
          <span style={{ color: 'rgba(250,250,249,0.3)' }}>·</span>
          <span>orbbilatam.com</span>
        </div>
      </div>
    ),
    size
  )
}
