import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScroll from '@/providers/SmoothScroll'

const BASE_URL = 'https://orbbilatam.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Orbbi Latam | Inteligencia Artificial para Profesionales de 45 a 60 años en Latinoamérica',
  description: 'Consultora de IA especializada en profesionales de 45 a 60 años en Latinoamérica. Aprende a usar inteligencia artificial en tu trabajo sin tecnicismos. Coaching personal, talleres grupales y herramientas a medida. Chile, México, Colombia, Argentina y toda Latam.',
  keywords: 'inteligencia artificial para profesionales, IA para mayores de 45, aprender IA latinoamerica, consultora IA Chile, IA para trabajadores con experiencia, ChatGPT profesionales, automatización trabajo, brecha digital generación, IA para empresas latam, coaching inteligencia artificial',
  authors: [{ name: 'Juan Pablo Monsalvez', url: 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/' }],
  robots: { index: true, follow: true },
  verification: { google: ['0wJI5OYjkRsnZRjUQKPsIMLzGXHM7KCf7xUrGDyDPUA', 'rv_5iuD9fnmM932X2GipDmN7UFJdDAqvKnC8S019XJc'] },
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/`,
    siteName: 'Orbbi Latam',
    title: 'Orbbi Latam | IA para profesionales de 45 a 60 años',
    description: 'La inteligencia artificial no vino a reemplazarte. Vino a multiplicarte. Consultora especializada en tu generación.',
    locale: 'es_CL',
    alternateLocale: ['es_MX', 'es_AR', 'es_CO', 'es_PE'],
    images: [{ url: `${BASE_URL}/images/hero.jpg`, width: 1200, height: 630, alt: 'Orbbi Latam — IA para profesionales de 45 a 60 años' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbbi Latam | IA para profesionales de 45 a 60 años',
    description: 'La inteligencia artificial no vino a reemplazarte. Vino a multiplicarte. Consultora especializada en tu generación.',
    images: [`${BASE_URL}/images/hero.jpg`],
  },
  other: {
    'language': 'Spanish',
    'geo.region': 'CL',
    'geo.placename': 'Chile',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Orbbi Latam',
  url: BASE_URL,
  logo: `${BASE_URL}/images/hero.jpg`,
  description: 'Consultora de inteligencia artificial especializada en profesionales de 45 a 60 años en Latinoamérica',
  email: 'contacto@orbbilatam.com',
  areaServed: ['Chile', 'México', 'Colombia', 'Argentina', 'Perú', 'Ecuador', 'Uruguay', 'Bolivia', 'Paraguay', 'Venezuela', 'Costa Rica'],
  knowsLanguage: 'es',
  founder: {
    '@type': 'Person',
    name: 'Juan Pablo Monsalvez',
    jobTitle: 'Fundador',
    url: 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/',
  },
  offers: [
    { '@type': 'Offer', name: 'Formación Esencial en IA', description: 'Aprende IA desde cero sin tecnicismos' },
    { '@type': 'Offer', name: 'Orientación Profesional en IA', description: 'Herramientas de IA para tu cargo específico' },
    { '@type': 'Offer', name: 'Herramienta de IA a Medida', description: 'Construimos una herramienta de IA diseñada para tu trabajo' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="geo.region" content="CL" />
        <meta name="geo.placename" content="Chile" />
        <meta name="author" content="Juan Pablo Monsalvez" />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
