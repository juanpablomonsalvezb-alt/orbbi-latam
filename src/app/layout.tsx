import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScroll from '@/providers/SmoothScroll'

const BASE_URL = 'https://orbbilatam.com'
const TITLE = 'Orbbi | Mentoría 1:1 de Inteligencia Artificial para Profesionales en Latinoamérica'
const DESCRIPTION = 'Aprende a usar IA en tu trabajo real con un mentor personalizado. Sesiones 1:1 online para médicos, abogados, contadores, docentes y directivos en Chile, México, Colombia y toda Latinoamérica. Desde $90 USD.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | Orbbi — Mentoría IA para Profesionales',
  },
  description: DESCRIPTION,
  keywords: [
    'mentoría inteligencia artificial profesionales',
    'aprender IA online latinoamerica',
    'mentor IA Chile',
    'clases inteligencia artificial 1 a 1',
    'chatgpt para médicos',
    'chatgpt para abogados',
    'chatgpt para contadores',
    'ia para profesionales chile',
    'consultoría ia latam',
    'aprender ia desde cero',
    'curso ia personalizado online',
    'inteligencia artificial para el trabajo',
    'mentor ia colombia mexico argentina',
    'sesiones ia individuales',
    'automatización con ia profesionales',
    'formacion ia ejecutivos directivos',
    'ia para docentes universitarios',
    'aprender chatgpt claude gemini',
  ].join(', '),
  authors: [{ name: 'Juan Pablo Monsalvez', url: 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/' }],
  creator: 'Juan Pablo Monsalvez',
  publisher: 'Orbbi',
  category: 'Education, Technology, Artificial Intelligence',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: ['0wJI5OYjkRsnZRjUQKPsIMLzGXHM7KCf7xUrGDyDPUA', 'rv_5iuD9fnmM932X2GipDmN7UFJdDAqvKnC8S019XJc'],
  },
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      'es-CL': `${BASE_URL}/`,
      'es-MX': `${BASE_URL}/`,
      'es-CO': `${BASE_URL}/`,
      'es-AR': `${BASE_URL}/`,
      'es':    `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/`,
    siteName: 'Orbbi',
    title: 'Orbbi | Mentoría 1:1 de IA para Profesionales en Latinoamérica',
    description: 'Aprende a usar inteligencia artificial en tu trabajo real con un mentor 1:1 online. Para médicos, abogados, contadores, docentes y directivos de toda Latinoamérica.',
    locale: 'es_CL',
    alternateLocale: ['es_MX', 'es_AR', 'es_CO', 'es_PE', 'es_UY'],
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Orbbi — Mentoría 1:1 de Inteligencia Artificial para Profesionales en Latinoamérica',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@orbbilatam',
    creator: '@orbbilatam',
    title: 'Orbbi | Mentoría 1:1 de IA para Profesionales en Latinoamérica',
    description: 'Aprende a usar IA en tu trabajo real. Sesiones 1:1 online desde $90 USD. Para profesionales de toda Latinoamérica.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  other: {
    'language': 'Spanish',
    'geo.region': 'CL',
    'geo.placename': 'Santiago, Chile',
    'geo.position': '-33.45;-70.67',
    'ICBM': '-33.45, -70.67',
    'theme-color': '#0F0E0D',
  },
}

// ─── JSON-LD SCHEMAS ──────────────────────────────────────────────────────────

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Orbbi',
  url: BASE_URL,
  description: DESCRIPTION,
  inLanguage: 'es',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#mentor`,
  name: 'Juan Pablo Monsalvez',
  jobTitle: 'Mentor de Inteligencia Artificial',
  description: 'Mentor 1:1 de inteligencia artificial para profesionales en Latinoamérica. Especializado en aplicar IA al flujo de trabajo real de médicos, abogados, contadores, docentes y directivos.',
  url: BASE_URL,
  sameAs: ['https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/'],
  knowsAbout: ['Inteligencia Artificial', 'ChatGPT', 'Claude', 'Gemini', 'Automatización', 'Productividad con IA'],
  worksFor: { '@type': 'Organization', name: 'Orbbi', url: BASE_URL },
}

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#organization`,
  name: 'Orbbi',
  alternateName: 'Orbbi Latam',
  url: BASE_URL,
  logo: `${BASE_URL}/images/hero.jpg`,
  image: `${BASE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  email: 'cse.coordinacion@gmail.com',
  foundingDate: '2025',
  founder: { '@id': `${BASE_URL}/#mentor` },
  areaServed: [
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'Perú' },
    { '@type': 'Country', name: 'Ecuador' },
    { '@type': 'Country', name: 'Uruguay' },
  ],
  knowsLanguage: { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
  serviceType: 'Mentoría de Inteligencia Artificial',
  priceRange: '$40 - $299 USD',
  currenciesAccepted: 'USD, CLP, MXN, COP, ARS',
  paymentAccepted: 'MercadoPago, Tarjeta de crédito, Transferencia bancaria',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Programas de Mentoría IA',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Diagnóstico de IA',
        description: 'Sesión de diagnóstico 1:1 de 30 minutos. Evalúa tu nivel con IA y diseña tu plan de aprendizaje personalizado.',
        price: '40',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/#precios`,
        seller: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'Offer',
        name: '1 Sesión de Mentoría IA',
        description: 'Sesión individual 1:1 de 60 minutos aplicada a tu flujo de trabajo real. Incluye recursos y prompts personalizados.',
        price: '90',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/#precios`,
        seller: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'Offer',
        name: 'Programa 4 Sesiones de Mentoría IA',
        description: '4 sesiones 1:1 de 60 minutos (1 por semana durante 1 mes). Incluye soporte WhatsApp, recursos y plan personalizado.',
        price: '299',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/#precios`,
        seller: { '@id': `${BASE_URL}/#organization` },
      },
    ],
  },
}

const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/#service`,
  name: 'Mentoría 1:1 de Inteligencia Artificial para Profesionales',
  serviceType: 'Educación y formación en Inteligencia Artificial',
  provider: { '@id': `${BASE_URL}/#organization` },
  description: 'Servicio de mentoría personalizada 1:1 online para aprender a usar inteligencia artificial (ChatGPT, Claude, Gemini, herramientas de automatización) aplicada al trabajo real de profesionales latinoamericanos.',
  audience: {
    '@type': 'Audience',
    audienceType: 'Profesionales universitarios',
    geographicArea: { '@type': 'GeoShape', name: 'Latinoamérica' },
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceType: 'Online',
    serviceUrl: BASE_URL,
    availableLanguage: { '@type': 'Language', name: 'Spanish' },
  },
  category: 'Formación profesional en IA',
  termsOfService: `${BASE_URL}/terminos`,
  hasOfferCatalog: { '@id': `${BASE_URL}/#organization` },
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber de tecnología para tomar la mentoría?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Las mentorías están diseñadas para profesionales que no tienen conocimientos técnicos de IA. Partimos desde cero y avanzamos a tu ritmo, siempre aplicado a tu trabajo real.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Las sesiones son en vivo o grabadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todas las sesiones son en vivo, 1:1 por videollamada con el mentor. No hay contenido grabado: cada sesión se adapta exactamente a tu situación y objetivos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Desde qué país puedo tomar la mentoría?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Desde cualquier país de Latinoamérica: Chile, México, Colombia, Argentina, Perú, Ecuador, Uruguay y más. Las sesiones son 100% online por videollamada.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una sesión de mentoría de IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El diagnóstico inicial es $40 USD (30 minutos). Una sesión individual cuesta $90 USD (60 minutos). El programa de 4 sesiones cuesta $299 USD (1 sesión por semana durante 1 mes). Los $40 del diagnóstico se descuentan si contratas el programa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué herramientas de IA aprendo a usar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende de tu profesión y objetivos. Trabajamos con ChatGPT, Claude, Gemini, herramientas de automatización sin código, generación de imágenes, análisis de documentos y muchas más. Siempre enfocados en las herramientas que más impacto tienen en tu trabajo específico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo pago la mentoría?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aceptamos pagos seguros con MercadoPago (tarjeta de crédito, débito, transferencia). El pago se realiza online antes de la primera sesión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si la sesión no me convence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si después de tu primera sesión sientes que no fue lo que esperabas, te devolvemos el dinero. Queremos que el resultado valga tu inversión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué tipo de profesionales es la mentoría?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mentoría está diseñada para profesionales universitarios de cualquier área: médicos, abogados, contadores, docentes, ingenieros, directivos, consultores y cualquier profesional que quiera integrar IA en su trabajo diario.',
      },
    },
  ],
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Mentorías', item: `${BASE_URL}/#mentorias` },
    { '@type': 'ListItem', position: 3, name: 'Precios', item: `${BASE_URL}/#precios` },
    { '@type': 'ListItem', position: 4, name: 'Contacto', item: `${BASE_URL}/#contacto` },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F0E0D" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="Spanish" />
        <meta name="geo.region" content="CL" />
        <meta name="geo.placename" content="Santiago, Chile" />
        <meta name="author" content="Juan Pablo Monsalvez" />

        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.mercadopago.com" />

        {/* PWA manifest + iconos */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="application-name" content="Orbbi" />
        <meta name="apple-mobile-web-app-title" content="Orbbi" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0F0E0D" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* IndexNow key (Bing/Yandex) */}
        <meta name="indexnow-key" content="532cdbb074f00984ba7a9d42c9b5bb63" />

        {/* Canonical + hreflang */}
        <link rel="canonical" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es-CL" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es-MX" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es-CO" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es-AR" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="es-PE" href={`${BASE_URL}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />

        {/* JSON-LD schemas */}
        <Script id="schema-website"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
        <Script id="schema-person"       type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }} />
        <Script id="schema-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
        <Script id="schema-service"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
        <Script id="schema-faq"          type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
        <Script id="schema-breadcrumb"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');
          `}} />
        </>}

        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track','PageView');
          `}} />
        )}
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
