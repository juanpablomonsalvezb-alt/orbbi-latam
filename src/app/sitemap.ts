import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://orbbilatam.com/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://orbbilatam.com/#servicios', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://orbbilatam.com/#metodologia', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://orbbilatam.com/#contacto', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://orbbilatam.com/#publicaciones', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]
}
