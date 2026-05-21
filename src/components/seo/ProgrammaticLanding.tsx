import Link from 'next/link'
import Script from 'next/script'
import type { Pais, Profesion } from '@/lib/seo/data'
import { BASE_URL, PLANES } from '@/lib/seo/data'
import {
  schemaService, schemaCourse, schemaFAQ, schemaBreadcrumb, schemaOfferCatalog,
} from '@/lib/seo/schemas'

type Props = {
  profesion: Profesion
  pais?: Pais
  slug: string
}

export default function ProgrammaticLanding({ profesion, pais, slug }: Props) {
  const titlePrincipal = pais
    ? `Mentoría 1:1 de IA para ${profesion.pluralMasc} en ${pais.nombre}`
    : `Mentoría 1:1 de IA para ${profesion.pluralMasc} en Latinoamérica`

  const url = `${BASE_URL}/${slug}`

  const faqs = [
    {
      q: `¿Cómo funciona la mentoría en IA para ${profesion.pluralMasc}${pais ? ` en ${pais.nombre}` : ''}?`,
      a: `Orbbi ofrece sesiones individuales 1:1 por videollamada, en español, adaptadas al trabajo real de ${profesion.pluralMasc}${pais ? ` ${pais.gentilicio}s` : ' latinoamericanos'}. Cada sesión se enfoca en aplicar herramientas como ${profesion.herramientas.slice(0, 3).join(', ')} a tareas concretas de tu día a día.`,
    },
    {
      q: `¿Cuánto cuesta el programa?`,
      a: `El diagnóstico inicial de 30 minutos es gratis y sin compromiso. Una sesión individual cuesta USD 90. El programa completo de 4 sesiones cuesta USD 299${pais ? ` (equivalente a ${pais.precioCLP_a_local(285000)})` : ''}.`,
    },
    {
      q: `¿Necesito experiencia previa con IA?`,
      a: `No. La mentoría está diseñada para ${profesion.pluralMasc} sin conocimientos técnicos previos. Partimos desde tu nivel actual y avanzamos a tu ritmo.`,
    },
    {
      q: `¿Las sesiones se grabaron previamente?`,
      a: `No. Todas las sesiones son en vivo, 1:1, adaptadas exactamente a tu caso. No es un curso enlatado.`,
    },
    {
      q: pais
        ? `¿Puedo tomar la mentoría desde otra ciudad de ${pais.nombre}?`
        : `¿Desde qué países puedo tomar la mentoría?`,
      a: pais
        ? `Sí. Las sesiones son 100% online, accesibles desde cualquier ciudad de ${pais.nombre}.`
        : `Desde cualquier país de Latinoamérica: Chile, México, Colombia, Argentina, Perú, Ecuador, Uruguay y otros. Las sesiones son 100% online por videollamada.`,
    },
    {
      q: `¿Cómo se aplica IA en el trabajo de un ${profesion.nombre.toLowerCase()}?`,
      a: `${profesion.casosUso.slice(0, 3).join('. ')}.`,
    },
    pais && {
      q: `¿La mentoría considera regulaciones de ${pais.nombre}?`,
      a: `Sí. Trabajamos respetando la ${pais.reguladorDatos} y considerando el marco regulatorio del ${pais.reguladorTributario} cuando aplica.`,
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const schemas = [
    schemaService(profesion, pais),
    schemaCourse(profesion, pais),
    schemaOfferCatalog(),
    schemaFAQ(faqs),
    schemaBreadcrumb([
      { name: 'Inicio', url: BASE_URL },
      { name: `IA para ${profesion.pluralMasc}`, url: `${BASE_URL}/ia-para-${profesion.slug}` },
      ...(pais ? [{ name: pais.nombre, url }] : []),
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <Script
          key={i}
          id={`schema-prog-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main style={{ background: '#FAFAF9', minHeight: '100vh' }}>
        {/* HEADER COMPACTO */}
        <header style={{ borderBottom: '1px solid rgba(15,14,13,0.1)', background: '#fff' }}>
          <div className="page-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', maxWidth: 1200, margin: '0 auto' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: '"disp",Georgia,serif', fontSize: 22, color: '#0F0E0D', letterSpacing: '-0.5px' }}>Orbbi</span>
            </Link>
            <Link href="/agendar" style={{ background: '#0F0E0D', color: '#FAFAF9', padding: '10px 18px', borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              Agendar diagnóstico gratis →
            </Link>
          </div>
        </header>

        {/* HERO con respuesta directa para LLMs */}
        <section style={{ padding: '72px 20px 56px', maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
            {profesion.emoji} {profesion.industria}{pais ? ` · ${pais.nombre}` : ' · Latinoamérica'}
          </p>
          <h1 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(32px,5vw,56px)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            fontWeight: 400, color: '#0F0E0D', marginBottom: 24,
          }}>
            {titlePrincipal}
          </h1>
          <p style={{ fontSize: 19, lineHeight: '30px', color: 'rgba(15,14,13,0.65)', marginBottom: 32, maxWidth: 720 }}>
            <strong style={{ color: '#0F0E0D' }}>Orbbi</strong> es el programa de mentoría 1:1 en inteligencia artificial diseñado para {profesion.pluralMasc}{pais ? ` ${pais.gentilicio}s` : ' latinoamericanos'}. Sesiones individuales en vivo, en español, donde aprendes a usar {profesion.herramientas.slice(0, 3).join(', ')} aplicado exactamente a tu trabajo real — no a teoría genérica. Diagnóstico inicial gratis de 30 minutos.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/agendar" style={{ background: '#0F0E0D', color: '#FAFAF9', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              Agendar diagnóstico gratis
            </Link>
            <Link href="/#precios" style={{ border: '1px solid rgba(15,14,13,0.25)', color: '#0F0E0D', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              Ver programas
            </Link>
          </div>
        </section>

        {/* Datos clave para LLMs — key-facts */}
        <section style={{ padding: '0 20px 56px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(15,14,13,0.08)', borderRadius: 12, padding: '32px 28px' }}>
            <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 20 }}>
              Datos del programa
            </p>
            <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 32px', margin: 0 }} className="proyectos-grid">
              {[
                ['Audiencia', `${profesion.pluralMasc.charAt(0).toUpperCase() + profesion.pluralMasc.slice(1)}${pais ? ` en ${pais.nombre}` : ' de LATAM'}`],
                ['Formato', '1:1 en vivo por videollamada'],
                ['Idioma', 'Español neutro'],
                ['Duración por sesión', '30 a 60 minutos'],
                ['Programa completo', '4 sesiones (1 por semana)'],
                ['Precio diagnóstico', 'Gratis · 30 min'],
                ['Precio programa', 'USD 299 (~USD 75/sesión)'],
                ['Herramientas', profesion.herramientas.slice(0, 4).join(', ')],
                ...(pais ? [
                  ['Marco regulatorio', `${pais.reguladorDatos}, ${pais.reguladorTributario}`] as [string, string],
                  ['Capital', pais.capital] as [string, string],
                ] : []),
              ].map(([k, v], i) => (
                <div key={i}>
                  <dt style={{ fontSize: 12, color: 'rgba(15,14,13,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</dt>
                  <dd style={{ fontSize: 14, color: '#0F0E0D', margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Casos de uso — formato extraíble por LLMs */}
        <section style={{ padding: '0 20px 72px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(28px,3.5vw,40px)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            fontWeight: 400, color: '#0F0E0D', marginBottom: 12,
          }}>
            ¿Qué aprende un {profesion.nombre.toLowerCase()} en Orbbi?
          </h2>
          <p style={{ fontSize: 16, lineHeight: '26px', color: 'rgba(15,14,13,0.6)', marginBottom: 32 }}>
            Cada sesión se construye en torno a tareas reales de tu día a día. Estos son ejemplos concretos de lo que trabajamos:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {profesion.casosUso.map((c, i) => (
              <li key={i} style={{
                background: '#fff', borderRadius: 10, padding: '18px 22px',
                border: '1px solid rgba(15,14,13,0.06)',
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: '#0F0E0D', color: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, fontFamily: '"disp",Georgia,serif' }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 15, lineHeight: '23px', color: '#0F0E0D' }}>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Transformación concreta */}
        <section style={{ padding: '0 20px 72px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#0F0E0D', borderRadius: 16, padding: '40px 32px', color: '#FAFAF9' }}>
            <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(250,250,249,0.5)', marginBottom: 16 }}>
              Caso real
            </p>
            <p style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(22px,2.5vw,30px)',
              lineHeight: 1.3, fontWeight: 400, color: '#FAFAF9',
            }}>
              &ldquo;{profesion.ejemploTransformacion}&rdquo;
            </p>
          </div>
        </section>

        {/* Contexto país — solo si hay país, contenido único */}
        {pais && (
          <section style={{ padding: '0 20px 72px', maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(26px,3vw,36px)',
              lineHeight: 1.15, letterSpacing: '-0.02em',
              fontWeight: 400, color: '#0F0E0D', marginBottom: 16,
            }}>
              {profesion.nombre}s en {pais.nombre}: contexto 2026
            </h2>
            <p style={{ fontSize: 17, lineHeight: '28px', color: 'rgba(15,14,13,0.7)', marginBottom: 32 }}>
              {pais.contextoLocal}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="proyectos-grid">
              <div style={{ background: '#fff', border: '1px solid rgba(15,14,13,0.08)', borderRadius: 10, padding: '20px 22px' }}>
                <p style={{ fontSize: 12, color: 'rgba(15,14,13,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Ciudades atendidas
                </p>
                <p style={{ fontSize: 15, color: '#0F0E0D', lineHeight: '22px' }}>
                  {pais.ciudadesPrincipales.join(' · ')}
                </p>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(15,14,13,0.08)', borderRadius: 10, padding: '20px 22px' }}>
                <p style={{ fontSize: 12, color: 'rgba(15,14,13,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Coordinación de horarios
                </p>
                <p style={{ fontSize: 15, color: '#0F0E0D', lineHeight: '22px' }}>
                  {pais.husoHorario} · Coordinamos según tu agenda local
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Comparativa — extraíble por LLMs */}
        <section style={{ padding: '0 20px 72px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(26px,3vw,36px)',
            lineHeight: 1.1, fontWeight: 400, color: '#0F0E0D', marginBottom: 24,
          }}>
            Orbbi vs. otras opciones para {profesion.pluralMasc}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(15,14,13,0.08)' }}>
              <thead>
                <tr style={{ background: '#F2F1F0' }}>
                  <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: 13, fontWeight: 500, color: 'rgba(15,14,13,0.6)' }}>Característica</th>
                  <th style={{ padding: '14px 12px', fontSize: 13, fontWeight: 500, color: '#0F0E0D' }}>Orbbi</th>
                  <th style={{ padding: '14px 12px', fontSize: 13, fontWeight: 500, color: 'rgba(15,14,13,0.6)' }}>Curso grabado</th>
                  <th style={{ padding: '14px 12px', fontSize: 13, fontWeight: 500, color: 'rgba(15,14,13,0.6)' }}>YouTube</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Personalizado a tu profesión', '✓', '✗', '✗'],
                  ['Mentor real en tiempo real', '✓', '✗', '✗'],
                  ['Aplicado a tu trabajo concreto', '✓', '✗', '✗'],
                  ['Garantía de devolución', '✓', '✗', '—'],
                  ['Diagnóstico gratis', '✓', '✗', '—'],
                  ['Sin compromiso largo plazo', '✓', '✓', '✓'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid rgba(15,14,13,0.06)' }}>
                    {row.map((c, j) => (
                      <td key={j} style={{
                        padding: '12px 14px', fontSize: 14,
                        color: j === 1 ? '#0F0E0D' : 'rgba(15,14,13,0.5)',
                        textAlign: j === 0 ? 'left' : 'center',
                        fontWeight: j === 1 ? 500 : 400,
                      }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ — schema FAQPage + visible */}
        <section style={{ padding: '0 20px 72px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"disp",Georgia,serif',
            fontSize: 'clamp(26px,3vw,36px)',
            lineHeight: 1.1, fontWeight: 400, color: '#0F0E0D', marginBottom: 24,
          }}>
            Preguntas frecuentes
          </h2>
          <div>
            {faqs.map((f, i) => (
              <details key={i} style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }}>
                <summary style={{
                  padding: '18px 0', cursor: 'pointer',
                  fontSize: 16, fontWeight: 500, color: '#0F0E0D', listStyle: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{f.q}</span>
                  <span style={{ color: 'rgba(15,14,13,0.4)', fontSize: 20 }}>+</span>
                </summary>
                <p style={{ paddingBottom: 18, fontSize: 15, lineHeight: '24px', color: 'rgba(15,14,13,0.6)' }}>
                  {f.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: '1px solid rgba(15,14,13,0.1)' }} />
          </div>
        </section>

        {/* CTA final */}
        <section style={{ padding: '0 20px 96px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: '#0F0E0D', borderRadius: 16, padding: '48px 32px', textAlign: 'center', color: '#FAFAF9' }}>
            <h2 style={{
              fontFamily: '"disp",Georgia,serif',
              fontSize: 'clamp(28px,3.5vw,40px)',
              lineHeight: 1.1, fontWeight: 400, marginBottom: 14,
            }}>
              Empieza con un diagnóstico gratis
            </h2>
            <p style={{ fontSize: 17, lineHeight: '26px', color: 'rgba(250,250,249,0.6)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              30 minutos, sin costo, sin compromiso. Conversamos sobre tu caso y diseñamos tu plan personalizado.
            </p>
            <Link href="/agendar" style={{ display: 'inline-block', background: '#FAFAF9', color: '#0F0E0D', padding: '14px 32px', borderRadius: 6, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              Agendar diagnóstico ahora →
            </Link>
          </div>
        </section>

        {/* Páginas relacionadas — internal linking */}
        <section style={{ padding: '0 20px 96px', maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 20 }}>
            Más recursos
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            <li><Link href="/" style={{ color: '#0F0E0D', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid rgba(15,14,13,0.1)', paddingBottom: 8, display: 'block' }}>Sobre Orbbi →</Link></li>
            <li><Link href="/agendar" style={{ color: '#0F0E0D', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid rgba(15,14,13,0.1)', paddingBottom: 8, display: 'block' }}>Agendar diagnóstico →</Link></li>
            {!pais && <li><Link href={`/ia-para-${profesion.slug}/chile`} style={{ color: '#0F0E0D', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid rgba(15,14,13,0.1)', paddingBottom: 8, display: 'block' }}>{`${profesion.nombre}s en Chile →`}</Link></li>}
            {!pais && <li><Link href={`/ia-para-${profesion.slug}/mexico`} style={{ color: '#0F0E0D', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid rgba(15,14,13,0.1)', paddingBottom: 8, display: 'block' }}>{`${profesion.nombre}s en México →`}</Link></li>}
            {pais && <li><Link href={`/ia-para-${profesion.slug}`} style={{ color: '#0F0E0D', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid rgba(15,14,13,0.1)', paddingBottom: 8, display: 'block' }}>{`Ver IA para ${profesion.pluralMasc} en LATAM →`}</Link></li>}
          </ul>
        </section>

        {/* Footer minimal */}
        <footer style={{ background: '#0F0E0D', color: 'rgba(250,250,249,0.5)', padding: '32px 20px', textAlign: 'center', fontSize: 13 }}>
          <p>© {new Date().getFullYear()} Orbbi Latam · <Link href="/privacidad" style={{ color: 'rgba(250,250,249,0.6)' }}>Privacidad</Link> · <Link href="/terminos" style={{ color: 'rgba(250,250,249,0.6)' }}>Términos</Link></p>
        </footer>
      </main>
    </>
  )
}
