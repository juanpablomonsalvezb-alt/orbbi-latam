/**
 * Data central de SEO programático para LATAM.
 * Genera 100+ landing pages dinámicas por profesión × país.
 */

export const BASE_URL = 'https://orbbilatam.com'

export type Pais = {
  slug: string
  nombre: string
  gentilicio: string
  capital: string
  moneda: string
  prefijoMoneda: string
  codigoISO: string
  hreflang: string
  poblacionProf: string
  reguladorTributario: string
  reguladorSalud: string
  reguladorDatos: string
  contextoLocal: string         // párrafo único país sobre adopción IA
  ciudadesPrincipales: string[] // 3-5 ciudades para SEO local
  husoHorario: string
  precioCLP_a_local: (clp: number) => string
}

export const PAISES: Pais[] = [
  {
    slug: 'chile',
    nombre: 'Chile',
    gentilicio: 'chileno',
    capital: 'Santiago',
    moneda: 'CLP',
    prefijoMoneda: '$',
    codigoISO: 'CL',
    hreflang: 'es-CL',
    poblacionProf: '1.2 millones de profesionales universitarios',
    reguladorTributario: 'SII (Servicio de Impuestos Internos)',
    reguladorSalud: 'Superintendencia de Salud',
    reguladorDatos: 'Ley 19.628 / Ley 21.719',
    contextoLocal: 'Chile es uno de los países LATAM más avanzados en adopción de IA profesional, con la entrada en vigencia de la Ley 21.719 que exige protección reforzada de datos personales y la creación de la Agencia Nacional de Protección de Datos. Los profesionales chilenos enfrentan presión competitiva de equipos remotos internacionales, lo que acelera la necesidad de productividad con IA. El SII ya integra IA en su fiscalización, y la Superintendencia de Salud está actualizando guías sobre IA clínica.',
    ciudadesPrincipales: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'],
    husoHorario: 'CLT (UTC-4)',
    precioCLP_a_local: (clp) => `$${clp.toLocaleString('es-CL')}`,
  },
  {
    slug: 'mexico',
    nombre: 'México',
    gentilicio: 'mexicano',
    capital: 'Ciudad de México',
    moneda: 'MXN',
    prefijoMoneda: '$',
    codigoISO: 'MX',
    hreflang: 'es-MX',
    poblacionProf: '9 millones de profesionales',
    reguladorTributario: 'SAT (Servicio de Administración Tributaria)',
    reguladorSalud: 'COFEPRIS',
    reguladorDatos: 'LFPDPPP',
    contextoLocal: 'México es el mercado profesional más grande de LATAM y está viviendo una adopción acelerada de IA, especialmente en CDMX, Monterrey y Guadalajara. La LFPDPPP exige consentimiento expreso para tratar datos personales, lo que obliga a anonimizar información antes de procesar con LLMs externos. El nearshoring impulsó la demanda de productividad: empresas mexicanas que atienden a EE.UU. compiten con equipos americanos, y la IA es el ecualizador. El SAT empezó a aplicar IA en auditorías electrónicas.',
    ciudadesPrincipales: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro'],
    husoHorario: 'CST (UTC-6)',
    precioCLP_a_local: (clp) => `${Math.round(clp / 50)} MXN aprox.`,
  },
  {
    slug: 'colombia',
    nombre: 'Colombia',
    gentilicio: 'colombiano',
    capital: 'Bogotá',
    moneda: 'COP',
    prefijoMoneda: '$',
    codigoISO: 'CO',
    hreflang: 'es-CO',
    poblacionProf: '4.5 millones de profesionales',
    reguladorTributario: 'DIAN',
    reguladorSalud: 'INVIMA',
    reguladorDatos: 'Habeas Data (Ley 1581)',
    contextoLocal: 'Colombia lidera el ranking de adopción de IA en LATAM 2026 según varios estudios, impulsada por Bogotá y Medellín como hubs de tech. La Ley Habeas Data (1581 de 2012) regula el tratamiento de datos personales y exige autorización previa. La DIAN exige facturación electrónica y nómina electrónica, abriendo casos de uso de IA para conciliación masiva. El gobierno publicó CONPES de IA y MinTIC promueve talleres en empresas.',
    ciudadesPrincipales: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
    husoHorario: 'COT (UTC-5)',
    precioCLP_a_local: (clp) => `${Math.round(clp * 4.2).toLocaleString('es-CO')} COP aprox.`,
  },
  {
    slug: 'argentina',
    nombre: 'Argentina',
    gentilicio: 'argentino',
    capital: 'Buenos Aires',
    moneda: 'ARS',
    prefijoMoneda: '$',
    codigoISO: 'AR',
    hreflang: 'es-AR',
    poblacionProf: '3.8 millones de profesionales',
    reguladorTributario: 'AFIP',
    reguladorSalud: 'ANMAT',
    reguladorDatos: 'Ley 25.326',
    contextoLocal: 'Argentina tiene la mayor densidad de talento técnico de LATAM por habitante, con Buenos Aires como hub fundador de unicornios (Mercado Libre, Globant, Auth0). La adopción de IA es agresiva en sectores de fintech, salud y educación. La inestabilidad económica obliga a profesionales a buscar productividad extra, y el trabajo remoto internacional pagado en dólares aumenta la presión por estar al día. La Ley 25.326 regula datos personales con autoridad propia (AAIP).',
    ciudadesPrincipales: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
    husoHorario: 'ART (UTC-3)',
    precioCLP_a_local: (clp) => `${Math.round(clp * 1.05).toLocaleString('es-AR')} ARS aprox.`,
  },
  {
    slug: 'peru',
    nombre: 'Perú',
    gentilicio: 'peruano',
    capital: 'Lima',
    moneda: 'PEN',
    prefijoMoneda: 'S/',
    codigoISO: 'PE',
    hreflang: 'es-PE',
    poblacionProf: '2.1 millones de profesionales',
    reguladorTributario: 'SUNAT',
    reguladorSalud: 'DIGEMID',
    reguladorDatos: 'Ley 29.733',
    contextoLocal: 'Perú está en una fase de adopción acelerada de IA, con Lima concentrando el ecosistema tech y consultor. La SUNAT impulsó facturación electrónica obligatoria, creando demanda de IA para automatización contable. Las universidades peruanas (PUCP, UPC) están abriendo postgrados en IA. La Ley 29.733 establece principios de protección de datos personales con autoridad propia.',
    ciudadesPrincipales: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura'],
    husoHorario: 'PET (UTC-5)',
    precioCLP_a_local: (clp) => `S/${(clp / 280).toFixed(0)}`,
  },
  {
    slug: 'uruguay',
    nombre: 'Uruguay',
    gentilicio: 'uruguayo',
    capital: 'Montevideo',
    moneda: 'UYU',
    prefijoMoneda: '$',
    codigoISO: 'UY',
    hreflang: 'es-UY',
    poblacionProf: '400.000 profesionales',
    reguladorTributario: 'DGI',
    reguladorSalud: 'MSP',
    reguladorDatos: 'Ley 18.331',
    contextoLocal: 'Uruguay tiene la mayor penetración de talento tecnológico per cápita de LATAM y es un hub de offshoring tech (Globant, Mercado Libre, dLocal nacieron acá). El gobierno publicó la Estrategia Nacional de IA con foco ético. La Ley 18.331 está alineada con el RGPD europeo, lo que permite a Uruguay servir clientes europeos sin fricción de datos. La adopción de IA es alta en abogados corporativos y contadores que trabajan con holdings internacionales.',
    ciudadesPrincipales: ['Montevideo', 'Punta del Este', 'Salto', 'Paysandú'],
    husoHorario: 'UYT (UTC-3)',
    precioCLP_a_local: (clp) => `${Math.round(clp * 0.045).toLocaleString('es-UY')} UYU aprox.`,
  },
  {
    slug: 'ecuador',
    nombre: 'Ecuador',
    gentilicio: 'ecuatoriano',
    capital: 'Quito',
    moneda: 'USD',
    prefijoMoneda: '$',
    codigoISO: 'EC',
    hreflang: 'es-EC',
    poblacionProf: '600.000 profesionales',
    reguladorTributario: 'SRI',
    reguladorSalud: 'ARCSA',
    reguladorDatos: 'LOPDP',
    contextoLocal: 'Ecuador dolarizó su economía hace 25 años, lo que elimina la fricción de pagar herramientas IA en USD. Quito y Guayaquil concentran la actividad profesional, con creciente adopción de IA en estudios contables y jurídicos. La LOPDP (Ley Orgánica de Protección de Datos Personales) entró en plena vigencia en 2023 con sanciones reales. El SRI exige facturación electrónica, generando demanda de automatización contable.',
    ciudadesPrincipales: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato'],
    husoHorario: 'ECT (UTC-5)',
    precioCLP_a_local: (clp) => `$${(clp / 950).toFixed(0)} USD`,
  },
]

export type Profesion = {
  slug: string
  nombre: string
  pluralFem: string
  pluralMasc: string
  herramientas: string[]
  casosUso: string[]
  ejemploTransformacion: string
  industria: string
  emoji: string
}

export const PROFESIONES: Profesion[] = [
  {
    slug: 'abogados',
    nombre: 'Abogado',
    pluralFem: 'abogadas',
    pluralMasc: 'abogados',
    industria: 'Derecho',
    emoji: '⚖️',
    herramientas: ['ChatGPT', 'Claude', 'Perplexity', 'Harvey', 'Lexis+AI'],
    casosUso: [
      'Redacción y revisión de contratos en minutos en lugar de horas',
      'Búsqueda jurisprudencial inteligente cruzando bases de datos',
      'Resumen automático de expedientes largos',
      'Generación de demandas y escritos judiciales con prompts estructurados',
      'Due diligence asistido en operaciones M&A',
      'Análisis comparativo de cláusulas en cientos de contratos',
    ],
    ejemploTransformacion: 'Un abogado tributarista pasó de redactar dictámenes en 4 horas a 45 minutos aplicando flujos con Claude.',
  },
  {
    slug: 'medicos',
    nombre: 'Médico',
    pluralFem: 'médicas',
    pluralMasc: 'médicos',
    industria: 'Salud',
    emoji: '🩺',
    herramientas: ['ChatGPT', 'Claude', 'OpenEvidence', 'Glass AI', 'UpToDate'],
    casosUso: [
      'Diagnóstico diferencial asistido con prompts estructurados',
      'Resúmenes clínicos automáticos a partir de historia clínica',
      'Búsqueda de literatura médica con análisis crítico',
      'Generación de informes de alta y derivaciones',
      'Traducción de papers en inglés con resumen ejecutivo',
      'Apoyo en decisión clínica respetando anonimización de datos',
    ],
    ejemploTransformacion: 'Una internista redujo a 30% el tiempo de elaboración de informes de hospitalización tras 4 sesiones.',
  },
  {
    slug: 'contadores',
    nombre: 'Contador',
    pluralFem: 'contadoras',
    pluralMasc: 'contadores',
    industria: 'Finanzas y Contabilidad',
    emoji: '📊',
    herramientas: ['ChatGPT', 'Claude', 'Excel con Copilot', 'Power BI con IA', 'Defontana IA'],
    casosUso: [
      'Conciliación bancaria asistida con detección de anomalías',
      'Análisis de estados financieros con interpretación experta',
      'Generación automática de informes mensuales',
      'Categorización masiva de gastos con IA',
      'Asistencia en preparación de declaraciones tributarias',
      'Auditoría de transacciones con detección de patrones sospechosos',
    ],
    ejemploTransformacion: 'Un estudio contable de 4 personas redujo en 12 horas semanales el cierre mensual.',
  },
  {
    slug: 'docentes',
    nombre: 'Docente',
    pluralFem: 'docentes',
    pluralMasc: 'docentes',
    industria: 'Educación',
    emoji: '🎓',
    herramientas: ['ChatGPT', 'Claude', 'Diffit', 'Eduaide', 'Canva Magic'],
    casosUso: [
      'Diseño de planificaciones de clase adaptadas al nivel',
      'Generación de evaluaciones con rúbricas claras',
      'Adaptación de contenidos para estudiantes con NEE',
      'Corrección asistida de ensayos con feedback personalizado',
      'Creación de material visual con IA generativa',
      'Diseño de actividades por niveles de logro',
    ],
    ejemploTransformacion: 'Una profesora de lenguaje pasó de 6 a 2 horas semanales en planificación.',
  },
  {
    slug: 'ingenieros',
    nombre: 'Ingeniero',
    pluralFem: 'ingenieras',
    pluralMasc: 'ingenieros',
    industria: 'Ingeniería',
    emoji: '⚙️',
    herramientas: ['ChatGPT', 'Claude', 'GitHub Copilot', 'Cursor', 'Perplexity'],
    casosUso: [
      'Asistente de cálculo y modelación estructural',
      'Redacción técnica de informes y especificaciones',
      'Code review y refactor asistido',
      'Documentación automática de proyectos',
      'Optimización de procesos con análisis de datos',
      'Resolución de incidentes con asistencia contextualizada',
    ],
    ejemploTransformacion: 'Un equipo de ingeniería civil bajó en 40% el tiempo de generación de memorias técnicas.',
  },
  {
    slug: 'ejecutivos',
    nombre: 'Ejecutivo',
    pluralFem: 'ejecutivas',
    pluralMasc: 'ejecutivos',
    industria: 'Dirección y estrategia',
    emoji: '💼',
    herramientas: ['ChatGPT Enterprise', 'Claude Pro', 'Perplexity', 'Otter.ai', 'Notion AI'],
    casosUso: [
      'Síntesis ejecutiva de reportes largos',
      'Preparación de board decks en tiempo récord',
      'Investigación de mercado y benchmarking competitivo',
      'Preparación de reuniones 1:1 con briefing personalizado',
      'Análisis de propuestas comerciales',
      'Apoyo en negociaciones con frameworks estructurados',
    ],
    ejemploTransformacion: 'Un CFO de mid-market liberó 8 horas semanales delegando análisis financiero recurrente a IA.',
  },
  {
    slug: 'emprendedores',
    nombre: 'Emprendedor',
    pluralFem: 'emprendedoras',
    pluralMasc: 'emprendedores',
    industria: 'Startups',
    emoji: '🚀',
    herramientas: ['ChatGPT', 'Claude', 'v0', 'Cursor', 'Lovable', 'n8n'],
    casosUso: [
      'Validación de ideas con análisis de mercado',
      'MVPs construidos con asistencia de IA en código',
      'Generación de contenido para marketing y redes',
      'Automatización de flujos sin programador',
      'Investigación competitiva exhaustiva',
      'Preparación de pitches y decks de inversión',
    ],
    ejemploTransformacion: 'Una founder solo-preneur lanzó su MVP en 2 semanas usando IA de extremo a extremo.',
  },
  {
    slug: 'consultores',
    nombre: 'Consultor independiente',
    pluralFem: 'consultoras',
    pluralMasc: 'consultores',
    industria: 'Consultoría',
    emoji: '🧠',
    herramientas: ['ChatGPT', 'Claude', 'Perplexity', 'Notion AI', 'Otter'],
    casosUso: [
      'Investigación profunda de industria',
      'Generación de propuestas comerciales personalizadas',
      'Análisis cualitativo de entrevistas con IA',
      'Frameworks ejecutivos aplicados a casos del cliente',
      'Deliverables visuales en menos tiempo',
      'Síntesis de discovery calls',
    ],
    ejemploTransformacion: 'Una consultora freelance triplicó capacidad de propuestas sin contratar.',
  },
  {
    slug: 'marketing',
    nombre: 'Profesional de marketing',
    pluralFem: 'marketers',
    pluralMasc: 'marketers',
    industria: 'Marketing y comunicaciones',
    emoji: '📣',
    herramientas: ['ChatGPT', 'Claude', 'Midjourney', 'Runway', 'Jasper'],
    casosUso: [
      'Estrategia editorial multicanal',
      'Copywriting para campañas pagadas',
      'Generación visual con consistencia de marca',
      'Análisis de competidores y posicionamiento',
      'Personalización de mensajes por segmento',
      'Reportes de performance con interpretación ejecutiva',
    ],
    ejemploTransformacion: 'Un equipo de 3 personas escaló a 5x el output de contenido mensual.',
  },
  {
    slug: 'psicologos',
    nombre: 'Psicólogo',
    pluralFem: 'psicólogas',
    pluralMasc: 'psicólogos',
    industria: 'Salud mental',
    emoji: '🧩',
    herramientas: ['ChatGPT', 'Claude', 'Otter.ai', 'Notion AI'],
    casosUso: [
      'Transcripción y resumen de sesiones (con consentimiento)',
      'Investigación de literatura clínica actualizada',
      'Diseño de intervenciones personalizadas',
      'Material psicoeducativo para pacientes',
      'Sistematización de casos para supervisión',
      'Apoyo en informes psicológicos',
    ],
    ejemploTransformacion: 'Una psicóloga clínica redujo en 50% el tiempo de redacción de informes.',
  },
]

export type Plan = {
  id: 'diagnostico' | 'sesion' | 'programa'
  nombre: string
  precio: number
  moneda: string
  duracion: string
  descripcion: string
}

export const PLANES: Plan[] = [
  { id: 'diagnostico', nombre: 'Diagnóstico', precio: 0, moneda: 'USD', duracion: '30 minutos', descripcion: 'Sin costo, sin compromiso. Conversamos sobre tu caso y diseñamos un plan a tu medida.' },
  { id: 'sesion', nombre: '1 Sesión', precio: 90, moneda: 'USD', duracion: '60 minutos', descripcion: 'Una sesión 1:1 aplicada a tu trabajo real.' },
  { id: 'programa', nombre: 'Programa 4 Sesiones', precio: 299, moneda: 'USD', duracion: '4 semanas', descripcion: 'El programa que transforma cómo trabajas.' },
]

export type ToolMatch = {
  slug: string
  nombre: string
  para: string[]
}

export const TOOLS: ToolMatch[] = [
  { slug: 'chatgpt', nombre: 'ChatGPT', para: ['abogados', 'medicos', 'contadores', 'docentes', 'emprendedores', 'marketing'] },
  { slug: 'claude', nombre: 'Claude', para: ['abogados', 'contadores', 'ingenieros', 'ejecutivos', 'consultores'] },
  { slug: 'gemini', nombre: 'Gemini', para: ['emprendedores', 'ejecutivos', 'marketing'] },
  { slug: 'copilot', nombre: 'Microsoft Copilot', para: ['contadores', 'ejecutivos', 'ingenieros'] },
]
