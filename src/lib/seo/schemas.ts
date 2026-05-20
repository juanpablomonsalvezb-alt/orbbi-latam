import { BASE_URL, type Pais, type Profesion } from './data'

export function schemaOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#organization`,
    name: 'Orbbi',
    alternateName: ['Orbbi Latam', 'Orbbi LATAM', 'Orbbi Mentoría IA'],
    url: BASE_URL,
    logo: `${BASE_URL}/images/hero.webp`,
    image: `${BASE_URL}/og-image.jpg`,
    description: 'Programa de mentoría 1:1 en Inteligencia Artificial para profesionales de Latinoamérica. Enseña a abogados, médicos, contadores, docentes, ingenieros y ejecutivos a aplicar ChatGPT, Claude, Gemini y herramientas de IA a su trabajo diario.',
    foundingDate: '2025',
    email: 'cse.coordinacion@gmail.com',
    areaServed: [
      { '@type': 'Country', name: 'Chile' },
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'Country', name: 'Perú' },
      { '@type': 'Country', name: 'Uruguay' },
      { '@type': 'Country', name: 'Ecuador' },
    ],
    knowsLanguage: ['es', 'es-419', 'es-CL', 'es-MX', 'es-AR', 'es-CO', 'es-PE'],
    knowsAbout: [
      'Inteligencia Artificial',
      'ChatGPT',
      'Claude',
      'Gemini',
      'Perplexity',
      'Prompt Engineering',
      'IA para Abogados',
      'IA para Médicos',
      'IA para Contadores',
      'IA para Docentes',
      'IA para Ingenieros',
      'IA para Ejecutivos',
      'IA para Emprendedores',
      'Automatización con IA',
      'Productividad con IA',
      'Mentoría 1:1',
    ],
    sameAs: [
      'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/',
    ],
    priceRange: '$0 - $299 USD',
    currenciesAccepted: 'USD, CLP, MXN, COP, ARS, PEN, UYU',
    paymentAccepted: 'MercadoPago, Tarjeta de crédito, Transferencia bancaria',
  }
}

export function schemaPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#mentor`,
    name: 'Juan Pablo Monsalvez',
    jobTitle: 'Director y Mentor de Inteligencia Artificial',
    description: 'Mentor 1:1 de IA para profesionales de Latinoamérica. Fundador de Orbbi, Nebbuler y Sokra.',
    url: BASE_URL,
    sameAs: ['https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/'],
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: [
      'Inteligencia Artificial Aplicada',
      'ChatGPT', 'Claude', 'Gemini',
      'Prompt Engineering',
      'Automatización con IA',
      'Anthropic Claude API',
      'OpenAI API',
      'Mentoría profesional',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Mentor de Inteligencia Artificial',
      occupationalCategory: 'Education/AI Training',
      skills: 'ChatGPT, Claude, Gemini, Perplexity, prompt engineering, automatización, RAG, agentes IA',
    },
  }
}

export function schemaService(profesion?: Profesion, pais?: Pais) {
  const audienceType = profesion
    ? `${profesion.pluralMasc} (${profesion.industria})`
    : 'Profesionales universitarios'
  const area = pais
    ? { '@type': 'Country', name: pais.nombre }
    : { '@type': 'GeoShape', name: 'Latinoamérica' }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: profesion
      ? `Mentoría 1:1 en IA para ${profesion.pluralMasc}${pais ? ` en ${pais.nombre}` : ''}`
      : 'Mentoría 1:1 en Inteligencia Artificial',
    serviceType: 'Educación profesional en Inteligencia Artificial',
    provider: { '@id': `${BASE_URL}/#organization` },
    description: profesion
      ? `Mentoría personalizada 1:1 en IA aplicada al trabajo real de ${profesion.pluralMasc}${pais ? `, en ${pais.nombre}` : ' en Latinoamérica'}.`
      : 'Mentoría personalizada 1:1 en IA para profesionales latinoamericanos.',
    audience: {
      '@type': 'Audience',
      audienceType,
      geographicArea: area,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Online',
      serviceUrl: BASE_URL,
      availableLanguage: { '@type': 'Language', name: 'Spanish' },
    },
    hasOfferCatalog: { '@id': `${BASE_URL}/#offers` },
  }
}

export function schemaOfferCatalog() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${BASE_URL}/#offers`,
    name: 'Programas de Mentoría IA Orbbi',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Diagnóstico IA gratis',
        description: 'Sesión de 30 minutos sin costo para diseñar tu plan de aprendizaje.',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/agendar`,
      },
      {
        '@type': 'Offer',
        name: '1 Sesión de Mentoría IA',
        description: 'Sesión individual 1:1 de 60 minutos aplicada a tu trabajo real.',
        price: '90',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Programa 4 Sesiones',
        description: '4 sesiones de 60 min (1 por semana) con soporte WhatsApp.',
        price: '299',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
  }
}

export function schemaCourse(profesion: Profesion, pais?: Pais) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Mentoría IA Aplicada para ${profesion.pluralMasc}${pais ? ` en ${pais.nombre}` : ''}`,
    description: `Programa 1:1 que enseña a ${profesion.pluralMasc} de ${pais ? pais.nombre : 'Latinoamérica'} a aplicar IA (${profesion.herramientas.slice(0, 3).join(', ')}) a su trabajo real.`,
    provider: { '@id': `${BASE_URL}/#organization` },
    inLanguage: pais?.hreflang || 'es',
    educationalLevel: 'Profesional',
    teaches: profesion.herramientas.join(', '),
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: profesion.pluralMasc,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT4H',
      instructor: { '@id': `${BASE_URL}/#mentor` },
      location: { '@type': 'VirtualLocation', url: BASE_URL },
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function schemaFAQ(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function schemaBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function schemaHowTo(name: string, description: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: 'PT30M',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
