import Link from 'next/link'
import Script from 'next/script'
import { BASE_URL } from '@/lib/seo/data'
import type { Article } from '@/lib/seo/articles'
import { getRelated } from '@/lib/seo/articles'
import { schemaFAQ, schemaBreadcrumb } from '@/lib/seo/schemas'
import { PROFESIONES } from '@/lib/seo/data'

type Props = { article: Article }

const CATEGORIA_LABEL: Record<string, string> = {
  fundamentos: 'Fundamentos de IA',
  comparativas: 'Comparativas',
  profesion: 'Por profesión',
  herramientas: 'Herramientas',
  'casos-uso': 'Casos de uso',
  pais: 'Por país',
}

export default function BlogArticle({ article }: Props) {
  const url = `${BASE_URL}/blog/${article.slug}`
  const ctaProf = article.ctaProfesion
    ? PROFESIONES.find(p => p.slug === article.ctaProfesion)
    : undefined

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.titulo,
    description: article.intro,
    datePublished: article.fechaPublicacion,
    dateModified: article.fechaPublicacion,
    author: { '@id': `${BASE_URL}/#mentor` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    image: `${BASE_URL}/og-image.jpg`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: article.keywords.join(', '),
    articleSection: CATEGORIA_LABEL[article.categoria] || 'Blog',
    inLanguage: 'es-419',
    wordCount: article.secciones.reduce((acc, s) => acc + s.contenido.split(' ').length, 0) + article.respuestaDirecta.split(' ').length,
  }

  const schemas = [
    articleSchema,
    schemaFAQ(article.faqs),
    schemaBreadcrumb([
      { name: 'Inicio', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: article.titulo, url },
    ]),
  ]

  const relacionados = getRelated(article.relacionados)

  return (
    <>
      {schemas.map((s, i) => (
        <Script
          key={i}
          id={`schema-article-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main style={{ background: '#FAFAF9', minHeight: '100vh' }}>
        {/* Header compacto */}
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

        {/* Hero del artículo */}
        <article style={{ maxWidth: 780, margin: '0 auto', padding: '64px 20px' }}>
          {/* Meta superior */}
          <div style={{ marginBottom: 24, fontSize: 13, color: 'rgba(15,14,13,0.5)' }}>
            <Link href="/blog" style={{ color: 'rgba(15,14,13,0.5)', textDecoration: 'none' }}>
              ← Blog
            </Link>
            <span style={{ margin: '0 10px' }}>·</span>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, fontWeight: 500 }}>
              {CATEGORIA_LABEL[article.categoria]}
            </span>
            <span style={{ margin: '0 10px' }}>·</span>
            <span>{article.tiempoLectura} min lectura</span>
          </div>

          <h1 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(32px,5vw,52px)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            fontWeight: 400, color: '#0F0E0D',
            marginBottom: 24,
          }}>
            {article.titulo}
          </h1>

          <p style={{ fontSize: 20, lineHeight: '32px', color: 'rgba(15,14,13,0.6)', marginBottom: 48 }}>
            {article.intro}
          </p>

          {/* Respuesta directa — formato extraíble por LLMs */}
          <div style={{
            background: '#fff',
            borderLeft: '3px solid #0F0E0D',
            padding: '20px 24px',
            borderRadius: '0 8px 8px 0',
            marginBottom: 48,
          }}>
            <p style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 10 }}>
              Respuesta directa
            </p>
            <p style={{ fontSize: 16, lineHeight: '26px', color: '#0F0E0D' }}>
              {article.respuestaDirecta}
            </p>
          </div>

          {/* Secciones del cuerpo */}
          {article.secciones.map((s, i) => (
            <section key={i} style={{ marginBottom: 40 }}>
              <h2 style={{
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(24px,3vw,32px)',
                lineHeight: 1.2, letterSpacing: '-0.02em',
                fontWeight: 400, color: '#0F0E0D', marginBottom: 16,
              }}>
                {s.titulo}
              </h2>
              <p style={{ fontSize: 17, lineHeight: '30px', color: 'rgba(15,14,13,0.75)' }}>
                {s.contenido}
              </p>
            </section>
          ))}

          {/* CTA mid-content */}
          {ctaProf && (
            <div style={{
              background: '#0F0E0D', color: '#FAFAF9',
              borderRadius: 12, padding: '32px 28px', margin: '56px 0',
            }}>
              <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(250,250,249,0.5)', marginBottom: 12 }}>
                Aplicado a tu profesión
              </p>
              <h3 style={{
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(22px,2.5vw,28px)',
                lineHeight: 1.2, fontWeight: 400, marginBottom: 12,
              }}>
                ¿Quieres aprender esto aplicado a tu trabajo como {ctaProf.nombre.toLowerCase()}?
              </h3>
              <p style={{ fontSize: 15, lineHeight: '24px', color: 'rgba(250,250,249,0.6)', marginBottom: 20 }}>
                Orbbi ofrece mentoría 1:1 personalizada para {ctaProf.pluralMasc} de Latinoamérica. Diagnóstico inicial gratis de 30 minutos.
              </p>
              <Link href={`/ia-para/${ctaProf.slug}`} style={{ display: 'inline-block', background: '#FAFAF9', color: '#0F0E0D', padding: '12px 24px', borderRadius: 4, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Ver mentoría IA para {ctaProf.pluralMasc} →
              </Link>
            </div>
          )}

          {/* FAQ visible + schema */}
          {article.faqs.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <h2 style={{
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(24px,3vw,32px)',
                lineHeight: 1.2, fontWeight: 400, color: '#0F0E0D', marginBottom: 24,
              }}>
                Preguntas frecuentes
              </h2>
              {article.faqs.map((f, i) => (
                <details key={i} style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }}>
                  <summary style={{
                    padding: '20px 0', cursor: 'pointer',
                    fontSize: 17, fontWeight: 500, color: '#0F0E0D',
                    listStyle: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span>{f.q}</span>
                    <span style={{ color: 'rgba(15,14,13,0.4)', fontSize: 20 }}>+</span>
                  </summary>
                  <p style={{ paddingBottom: 20, fontSize: 16, lineHeight: '26px', color: 'rgba(15,14,13,0.65)' }}>
                    {f.a}
                  </p>
                </details>
              ))}
              <div style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }} />
            </section>
          )}

          {/* CTA final */}
          <section style={{ marginTop: 72 }}>
            <div style={{ background: '#0F0E0D', color: '#FAFAF9', borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: '"disp",Georgia,serif',
                fontSize: 'clamp(28px,3.5vw,40px)',
                lineHeight: 1.1, fontWeight: 400, marginBottom: 14,
              }}>
                Aprende a aplicar IA en tu profesión
              </h2>
              <p style={{ fontSize: 17, lineHeight: '26px', color: 'rgba(250,250,249,0.6)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                Mentoría 1:1 personalizada para profesionales LATAM. Diagnóstico gratis de 30 minutos.
              </p>
              <Link href="/agendar" style={{ display: 'inline-block', background: '#FAFAF9', color: '#0F0E0D', padding: '14px 32px', borderRadius: 6, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                Agendar diagnóstico gratis →
              </Link>
            </div>
          </section>

          {/* Relacionados */}
          {relacionados.length > 0 && (
            <section style={{ marginTop: 80 }}>
              <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 24 }}>
                Lectura relacionada
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                {relacionados.map(r => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} style={{
                      display: 'block', textDecoration: 'none',
                      padding: '20px 24px', borderRadius: 10,
                      border: '1px solid rgba(15,14,13,0.08)',
                      background: '#fff',
                      transition: 'border-color .2s',
                    }}>
                      <p style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(15,14,13,0.4)', marginBottom: 6 }}>
                        {CATEGORIA_LABEL[r.categoria]}
                      </p>
                      <p style={{ fontSize: 17, fontWeight: 500, color: '#0F0E0D', lineHeight: '24px' }}>
                        {r.titulo}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Footer */}
        <footer style={{ background: '#0F0E0D', color: 'rgba(250,250,249,0.5)', padding: '32px 20px', textAlign: 'center', fontSize: 13 }}>
          <p>© {new Date().getFullYear()} Orbbi Latam · <Link href="/privacidad" style={{ color: 'rgba(250,250,249,0.6)' }}>Privacidad</Link> · <Link href="/terminos" style={{ color: 'rgba(250,250,249,0.6)' }}>Términos</Link></p>
        </footer>
      </main>
    </>
  )
}
