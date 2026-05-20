import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROFESIONES, BASE_URL } from '@/lib/seo/data'
import ProgrammaticLanding from '@/components/seo/ProgrammaticLanding'

type Params = { profesion: string }

export function generateStaticParams() {
  return PROFESIONES.map(p => ({ profesion: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { profesion: slug } = await params
  const p = PROFESIONES.find(x => x.slug === slug)
  if (!p) return {}

  const title = `Mentoría 1:1 en IA para ${p.pluralMasc} | Orbbi LATAM`
  const description = `Programa de mentoría individual en inteligencia artificial para ${p.pluralMasc} de Latinoamérica. Aprende ${p.herramientas.slice(0, 3).join(', ')} aplicado a tu trabajo real. Diagnóstico gratis 30 min.`
  const url = `${BASE_URL}/ia-para-${p.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'es': url,
        'es-419': url,
        'es-CL': `${url}/chile`,
        'es-MX': `${url}/mexico`,
        'es-CO': `${url}/colombia`,
        'es-AR': `${url}/argentina`,
        'es-PE': `${url}/peru`,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Orbbi',
      locale: 'es_419',
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
      `mentoría IA ${p.pluralMasc}`,
      `IA para ${p.pluralMasc}`,
      `inteligencia artificial ${p.industria.toLowerCase()}`,
      `ChatGPT para ${p.pluralMasc}`,
      `Claude para ${p.pluralMasc}`,
      `aprender IA ${p.pluralMasc}`,
      `mentor IA Latinoamérica`,
      `IA aplicada a ${p.industria.toLowerCase()}`,
    ].join(', '),
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { profesion: slug } = await params
  const p = PROFESIONES.find(x => x.slug === slug)
  if (!p) return notFound()
  return <ProgrammaticLanding profesion={p} slug={`ia-para-${p.slug}`} />
}
