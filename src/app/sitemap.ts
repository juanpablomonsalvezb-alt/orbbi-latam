import { MetadataRoute } from 'next'
import { PROFESIONES, PAISES, BASE_URL } from '@/lib/seo/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  entries.push({
    url: `${BASE_URL}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        es: `${BASE_URL}/`,
        'es-419': `${BASE_URL}/`,
        'es-CL': `${BASE_URL}/`,
        'es-MX': `${BASE_URL}/`,
        'es-CO': `${BASE_URL}/`,
        'es-AR': `${BASE_URL}/`,
        'es-PE': `${BASE_URL}/`,
      },
    },
  })

  ;['/agendar', '/tu-plan'].forEach(path => {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  })

  ;['/privacidad', '/terminos'].forEach(path => {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  })

  PROFESIONES.forEach(p => {
    const url = `${BASE_URL}/ia-para-${p.slug}`
    const langAlternates: Record<string, string> = {
      es: url,
      'es-419': url,
    }
    PAISES.forEach(c => {
      langAlternates[c.hreflang] = `${url}/${c.slug}`
    })
    entries.push({
      url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: langAlternates },
    })
  })

  PROFESIONES.forEach(p => {
    PAISES.forEach(c => {
      entries.push({
        url: `${BASE_URL}/ia-para-${p.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            [c.hreflang]: `${BASE_URL}/ia-para-${p.slug}/${c.slug}`,
            es: `${BASE_URL}/ia-para-${p.slug}`,
            'x-default': `${BASE_URL}/ia-para-${p.slug}`,
          },
        },
      })
    })
  })

  return entries
}
