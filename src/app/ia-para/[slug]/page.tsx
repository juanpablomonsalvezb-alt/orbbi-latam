import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROFESIONES, PAISES, BASE_URL } from '@/lib/seo/data'
import ProgrammaticLanding from '@/components/seo/ProgrammaticLanding'

type Params = { slug: string }

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = []
  PROFESIONES.forEach(p => {
    out.push({ slug: p.slug })
    PAISES.forEach(c => out.push({ slug: `${p.slug}-${c.slug}` }))
  })
  return out
}

function resolve(slug: string | undefined) {
  if (!slug || typeof slug !== 'string') return { prof: undefined, pais: undefined }
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

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const { prof, pais } = resolve(slug)
  if (!prof) return { title: 'No encontrada | Orbbi' }

  const url = pais
    ? `${BASE_URL}/ia-para/${prof.slug}-${pais.slug}`
    : `${BASE_URL}/ia-para/${prof.slug}`

  const title = pais
    ? `Mentoría 1:1 de IA para ${prof.pluralMasc} en ${pais.nombre} | Orbbi`
    : `Mentoría 1:1 en IA para ${prof.pluralMasc} | Orbbi LATAM`

  const description = pais
    ? `Mentoría individual en IA para ${prof.pluralMasc} ${pais.gentilicio}s. Sesiones 1:1 en español, aplicadas a tu trabajo. Diagnóstico gratis 30 min. Considera marco regulatorio ${pais.reguladorDatos}.`
    : `Programa de mentoría individual en IA para ${prof.pluralMasc} de Latinoamérica. Aprende ${prof.herramientas.slice(0, 3).join(', ')} aplicado a tu trabajo real. Diagnóstico gratis 30 min.`

  const languages: Record<string, string> = {
    es: pais ? `${BASE_URL}/ia-para/${prof.slug}` : url,
    'es-419': pais ? `${BASE_URL}/ia-para/${prof.slug}` : url,
  }
  if (!pais) {
    PAISES.forEach(c => {
      languages[c.hreflang] = `${BASE_URL}/ia-para/${prof.slug}-${c.slug}`
    })
  } else {
    languages[pais.hreflang] = url
    languages['x-default'] = `${BASE_URL}/ia-para/${prof.slug}`
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title, description, url,
      siteName: 'Orbbi',
      locale: pais ? pais.hreflang.replace('-', '_') : 'es_419',
      type: 'website',
      // images: usa opengraph-image.tsx auto-generado por Next.js
    },
    twitter: { card: 'summary_large_image', title, description },
    keywords: pais
      ? [`mentoría IA ${prof.pluralMasc} ${pais.nombre}`, `IA para ${prof.pluralMasc} ${pais.nombre}`, `ChatGPT ${prof.pluralMasc}`, `aprender IA ${pais.nombre}`, `consultor IA ${pais.capital}`].join(', ')
      : [`mentoría IA ${prof.pluralMasc}`, `IA para ${prof.pluralMasc}`, `inteligencia artificial ${prof.industria.toLowerCase()}`, `ChatGPT para ${prof.pluralMasc}`, `Claude para ${prof.pluralMasc}`, `aprender IA ${prof.pluralMasc}`, `mentor IA Latinoamérica`].join(', '),
    other: pais ? { 'geo.region': pais.codigoISO, 'geo.placename': pais.capital } : undefined,
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const { prof, pais } = resolve(slug)
  if (!prof) return notFound()
  const fullSlug = pais ? `ia-para/${prof.slug}-${pais.slug}` : `ia-para/${prof.slug}`
  return <ProgrammaticLanding profesion={prof} pais={pais} slug={fullSlug} />
}
