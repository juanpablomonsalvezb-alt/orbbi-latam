import { ImageResponse } from 'next/og'
import { ARTICLES, getArticleBySlug } from '@/lib/seo/articles'


export const alt = 'Orbbi Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const dynamicParams = false

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

const CATEGORIA_LABEL: Record<string, string> = {
  fundamentos: 'Fundamentos de IA',
  comparativas: 'Comparativas',
  herramientas: 'Herramientas',
  'casos-uso': 'Casos de uso',
  pais: 'Por país',
  profesion: 'Por profesión',
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticleBySlug(slug)
  const title = a?.titulo || 'Orbbi Blog'
  const categoria = a ? CATEGORIA_LABEL[a.categoria] : 'Blog'

  return new ImageResponse(
    (
      <div style={{
        background: '#0F0E0D',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '64px 80px',
        position: 'relative',
      }}>
        <div style={{
          fontSize: 28, fontWeight: 400,
          color: '#FAFAF9', letterSpacing: '-0.5px',
          marginBottom: 'auto',
          display: 'flex',
        }}>Orbbi · Blog</div>

        <div style={{
          fontSize: 16, fontWeight: 500,
          color: 'rgba(201,169,110,0.9)',
          textTransform: 'uppercase', letterSpacing: '0.14em',
          marginBottom: 28,
          display: 'flex',
        }}>{categoria}</div>

        <div style={{
          fontSize: 64, fontWeight: 400,
          color: '#FAFAF9',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          maxWidth: 980,
          marginBottom: 32,
          display: 'flex',
        }}>{title}</div>

        <div style={{
          fontSize: 18, fontWeight: 400,
          color: 'rgba(250,250,249,0.55)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span>{a?.tiempoLectura || 5} min lectura</span>
          <span style={{ color: 'rgba(250,250,249,0.3)' }}>·</span>
          <span>orbbilatam.com/blog</span>
        </div>
      </div>
    ),
    size
  )
}
