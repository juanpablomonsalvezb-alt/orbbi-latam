import Link from 'next/link'
import type { Metadata } from 'next'
import { ARTICLES } from '@/lib/seo/articles'
import { BASE_URL } from '@/lib/seo/data'

export const metadata: Metadata = {
  title: 'Blog | Orbbi — IA aplicada para profesionales LATAM',
  description: 'Guías prácticas, comparativas y casos reales de IA aplicada para profesionales de Latinoamérica. Prompt engineering, ChatGPT vs Claude, IA por profesión y más.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'Blog Orbbi — IA aplicada para profesionales LATAM',
    description: 'Guías prácticas, comparativas y casos reales de IA aplicada para profesionales de Latinoamérica.',
    url: `${BASE_URL}/blog`,
    siteName: 'Orbbi',
    locale: 'es_419',
    type: 'website',
  },
}

const CATEGORIA_LABEL: Record<string, string> = {
  fundamentos: 'Fundamentos',
  comparativas: 'Comparativas',
  profesion: 'Por profesión',
  herramientas: 'Herramientas',
  'casos-uso': 'Casos de uso',
  pais: 'Por país',
}

export default function Blog() {
  const ordenado = [...ARTICLES].sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))

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

      <section style={{ padding: '64px 20px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
          Blog Orbbi
        </p>
        <h1 style={{
          fontFamily: '"disp",Georgia,serif',
          fontSize: 'clamp(36px,5vw,56px)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          fontWeight: 400, color: '#0F0E0D', marginBottom: 16,
        }}>
          IA aplicada para profesionales de Latinoamérica
        </h1>
        <p style={{ fontSize: 19, lineHeight: '30px', color: 'rgba(15,14,13,0.55)', maxWidth: 720, marginBottom: 48 }}>
          Guías prácticas, comparativas honestas y casos reales para integrar inteligencia artificial en tu trabajo. Sin hype, sin teoría vacía.
        </p>
      </section>

      <section style={{ padding: '0 20px 96px', maxWidth: 1100, margin: '0 auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {ordenado.map(a => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}`} style={{
                display: 'block', textDecoration: 'none',
                background: '#fff', borderRadius: 12,
                padding: '28px 26px',
                border: '1px solid rgba(15,14,13,0.08)',
                height: '100%',
                transition: 'transform .2s, border-color .2s',
              }}>
                <p style={{
                  fontSize: 11, fontWeight: 500, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: 'rgba(15,14,13,0.4)', marginBottom: 14,
                }}>
                  {CATEGORIA_LABEL[a.categoria]} · {a.tiempoLectura} min
                </p>
                <h2 style={{
                  fontFamily: '"disp",Georgia,serif',
                  fontSize: 22, lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  fontWeight: 400, color: '#0F0E0D',
                  marginBottom: 12,
                }}>
                  {a.titulo}
                </h2>
                <p style={{ fontSize: 14, lineHeight: '22px', color: 'rgba(15,14,13,0.55)' }}>
                  {a.intro}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ background: '#0F0E0D', color: 'rgba(250,250,249,0.5)', padding: '32px 20px', textAlign: 'center', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} Orbbi Latam · <Link href="/privacidad" style={{ color: 'rgba(250,250,249,0.6)' }}>Privacidad</Link> · <Link href="/terminos" style={{ color: 'rgba(250,250,249,0.6)' }}>Términos</Link></p>
      </footer>
    </main>
  )
}
