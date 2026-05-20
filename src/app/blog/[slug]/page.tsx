import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ARTICLES, getArticleBySlug } from '@/lib/seo/articles'
import { BASE_URL } from '@/lib/seo/data'
import BlogArticle from '@/components/seo/BlogArticle'

type Params = { slug: string }

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const a = getArticleBySlug(slug)
  if (!a) return {}

  const url = `${BASE_URL}/blog/${a.slug}`

  return {
    title: `${a.titulo} | Orbbi Blog`,
    description: a.intro,
    alternates: { canonical: url, languages: { es: url, 'es-419': url, 'x-default': url } },
    openGraph: {
      title: a.titulo,
      description: a.intro,
      url,
      siteName: 'Orbbi',
      locale: 'es_419',
      type: 'article',
      publishedTime: a.fechaPublicacion,
      authors: ['Juan Pablo Monsalvez'],
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: a.titulo }],
    },
    twitter: { card: 'summary_large_image', title: a.titulo, description: a.intro, images: [`${BASE_URL}/og-image.jpg`] },
    keywords: a.keywords.join(', '),
    authors: [{ name: 'Juan Pablo Monsalvez', url: BASE_URL }],
    category: a.categoria,
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const a = getArticleBySlug(slug)
  if (!a) return notFound()
  return <BlogArticle article={a} />
}
