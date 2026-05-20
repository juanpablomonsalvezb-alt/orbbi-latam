import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROFESIONES, PAISES, BASE_URL } from '@/lib/seo/data'
import ProgrammaticLanding from '@/components/seo/ProgrammaticLanding'

type Params = { profesion: string; pais: string }

export function generateStaticParams() {
  const result: Params[] = []
  for (const p of PROFESIONES) {
    for (const c of PAISES) {
      result.push({ profesion: p.slug, pais: c.slug })
    }
  }
  return result
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { profesion: profSlug, pais: paisSlug } = await params
  const prof = PROFESIONES.find(x => x.slug === profSlug)
  const pais = PAISES.find(x => x.slug === paisSlug)
  if (!prof || !pais) return {}

  const title = `Mentoría 1:1 de IA para ${prof.pluralMasc} en ${pais.nombre} | Orbbi`
  const description = `Mentoría individual en IA para ${prof.pluralMasc} ${pais.gentilicio}s. Sesiones 1:1 en español, aplicadas a tu trabajo. Diagnóstico gratis 30 min. Considera marco regulatorio ${pais.reguladorDatos}.`
  const url = `${BASE_URL}/ia-para-${prof.slug}/${pais.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        [pais.hreflang]: url,
        'es': `${BASE_URL}/ia-para-${prof.slug}`,
        'x-default': `${BASE_URL}/ia-para-${prof.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Orbbi',
      locale: pais.hreflang.replace('-', '_'),
      type: 'website',
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    keywords: [
      `mentoría IA ${prof.pluralMasc} ${pais.nombre}`,
      `IA para ${prof.pluralMasc} ${pais.nombre}`,
      `ChatGPT ${prof.pluralMasc} ${pais.nombre}`,
      `consultor IA ${pais.capital}`,
      `aprender IA ${pais.nombre}`,
      `mentor IA ${pais.gentilicio}`,
    ].join(', '),
    other: {
      'geo.region': pais.codigoISO,
      'geo.placename': pais.capital,
    },
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { profesion: profSlug, pais: paisSlug } = await params
  const prof = PROFESIONES.find(x => x.slug === profSlug)
  const pais = PAISES.find(x => x.slug === paisSlug)
  if (!prof || !pais) return notFound()
  return <ProgrammaticLanding profesion={prof} pais={pais} slug={`ia-para-${prof.slug}/${pais.slug}`} />
}
