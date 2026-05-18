import { MetadataRoute } from 'next'

const BASE_URL = 'https://orbbilatam.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pago/exitoso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/pago/fallido`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}
