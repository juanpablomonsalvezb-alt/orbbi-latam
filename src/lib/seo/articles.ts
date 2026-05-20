/**
 * Cluster de contenido informacional para capturar tráfico top-of-funnel.
 * 30+ artículos optimizados para LATAM con keywords reales.
 */

export type ArticleCategory = 'fundamentos' | 'comparativas' | 'profesion' | 'herramientas' | 'casos-uso' | 'pais'

export type Article = {
  slug: string
  titulo: string
  intro: string
  categoria: ArticleCategory
  keywords: string[]
  fechaPublicacion: string
  tiempoLectura: number
  // Contenido estructurado para SEO + AEO
  respuestaDirecta: string // Para featured snippets y citation por LLMs
  secciones: { titulo: string; contenido: string }[]
  faqs: { q: string; a: string }[]
  relacionados: string[] // slugs de artículos relacionados
  ctaProfesion?: string // slug profesión sugerida en CTA
}

export const ARTICLES: Article[] = [
  // ─── FUNDAMENTOS ──────────────────────────────────────────────
  {
    slug: 'que-es-prompt-engineering',
    titulo: 'Qué es Prompt Engineering: Guía completa para profesionales LATAM',
    intro: 'El prompt engineering es la habilidad más rentable de la era IA. Aprende qué es, cómo aplicarlo a tu trabajo y los frameworks que usan los mejores profesionales latinoamericanos.',
    categoria: 'fundamentos',
    keywords: ['qué es prompt engineering', 'prompt engineering español', 'ingeniería de prompts', 'cómo escribir prompts efectivos'],
    fechaPublicacion: '2026-05-15',
    tiempoLectura: 8,
    respuestaDirecta: 'El prompt engineering es la práctica de diseñar instrucciones de forma estructurada para obtener resultados precisos de modelos de inteligencia artificial como ChatGPT, Claude o Gemini. En lugar de hacer preguntas vagas, se aplican frameworks (rol, contexto, tarea, formato, restricciones) que aumentan la calidad de la respuesta entre 3x y 10x.',
    secciones: [
      {
        titulo: 'Qué es realmente el prompt engineering',
        contenido: 'El prompt engineering no es escribir preguntas largas. Es entender cómo procesan información los modelos de lenguaje (LLMs) y construir instrucciones que aprovechan esa lógica. Un prompt mal diseñado produce respuestas genéricas; uno bien diseñado produce respuestas casi ejecutables. Para profesionales latinoamericanos, dominar prompt engineering significa multiplicar productividad sin necesidad de saber programar.'
      },
      {
        titulo: 'El framework CRISPE: estructura básica de cualquier prompt profesional',
        contenido: 'CRISPE = Capacity (rol), Insight (contexto), Statement (tarea), Personality (tono), Experiment (restricciones). Ejemplo aplicado a un abogado: "Actúa como abogado tributario chileno con 15 años de experiencia [C]. Trabajo con clientes pyme del rubro retail [I]. Necesito un dictamen sobre IVA en operaciones de comercio electrónico cross-border [S]. Usa lenguaje técnico pero claro, citando Ley sobre Impuesto a las Ventas y Servicios [P]. Máximo 500 palabras, con conclusión accionable al final [E]."'
      },
      {
        titulo: 'Errores típicos que cometen los profesionales LATAM',
        contenido: 'Los tres errores más comunes: (1) hacer preguntas sin contexto profesional, (2) no especificar formato de salida, (3) no iterar el prompt cuando la primera respuesta no convence. El 80% de quienes dicen que "ChatGPT no sirve" simplemente no aprendieron a hacerle preguntas correctamente.'
      },
      {
        titulo: 'Frameworks avanzados: Chain-of-Thought y Few-Shot',
        contenido: 'Chain-of-Thought (CoT) consiste en pedirle al modelo que "piense paso a paso" antes de responder. Few-Shot Learning consiste en darle ejemplos de input/output deseado dentro del propio prompt. Combinados, estos dos frameworks son la diferencia entre un usuario casual y uno que extrae 10x el valor del mismo modelo.'
      },
    ],
    faqs: [
      { q: '¿Necesito programar para aprender prompt engineering?', a: 'No. El prompt engineering se hace en lenguaje natural (español). No requiere ninguna habilidad técnica previa.' },
      { q: '¿Qué modelo es mejor para empezar?', a: 'ChatGPT (GPT-5) y Claude (Sonnet 4.6) son los más capaces hoy. Cualquiera de los dos sirve para aprender los frameworks. Para profesionales LATAM, Claude tiende a dar respuestas más estructuradas en español.' },
      { q: '¿Cuánto tarda aprender prompt engineering bien?', a: 'Los fundamentos: 4 a 8 horas de práctica deliberada. La maestría: meses de aplicación a casos reales. Por eso la mentoría 1:1 acelera tanto la curva.' },
    ],
    relacionados: ['chatgpt-vs-claude', 'mejores-prompts-abogados', 'que-es-llm'],
    ctaProfesion: 'abogados',
  },
  {
    slug: 'que-es-llm',
    titulo: 'Qué es un LLM (Modelo de Lenguaje Grande) explicado para no técnicos',
    intro: 'Si trabajas con IA seguramente escuchaste "LLM". Te explicamos qué es, cómo funciona en simple, y por qué importa para tu profesión.',
    categoria: 'fundamentos',
    keywords: ['qué es un LLM', 'modelo de lenguaje grande', 'large language model español', 'cómo funciona ChatGPT'],
    fechaPublicacion: '2026-05-12',
    tiempoLectura: 6,
    respuestaDirecta: 'Un LLM (Large Language Model) es un programa de inteligencia artificial entrenado con miles de millones de textos para predecir cuál es la palabra más probable que viene a continuación. ChatGPT, Claude y Gemini son LLMs. No "piensan" como humanos: completan patrones aprendidos a una escala que produce respuestas coherentes y útiles para la mayoría de tareas profesionales.',
    secciones: [
      { titulo: 'La idea simple detrás de un LLM', contenido: 'Imagina un autocompletar de Google extremadamente sofisticado. Le das un inicio de texto ("El IVA en Chile es...") y predice las palabras siguientes basándose en patrones aprendidos en internet, libros y artículos. La magia: a escala suficiente (cientos de miles de millones de parámetros), esta predicción de texto se vuelve indistinguible de "razonar".' },
      { titulo: 'Por qué los LLMs no son magia ni reemplazo humano', contenido: 'Un LLM no entiende lo que dice. No tiene experiencia profesional propia ni juicio ético. Puede alucinar (inventar datos confiadamente). Su valor está en automatizar tareas de procesamiento de lenguaje (resúmenes, redacción, análisis) que antes requerían horas de trabajo manual. La supervisión humana sigue siendo crítica.' },
      { titulo: 'Los principales LLMs disponibles en 2026', contenido: 'GPT-5 (OpenAI / ChatGPT): el más popular, fortaleza en versatilidad. Claude (Anthropic): mejor en razonamiento estructurado y análisis legal/médico. Gemini (Google): fortaleza en búsqueda en tiempo real. Llama (Meta): open source, para empresas con datos sensibles. Perplexity: LLM + búsqueda web en tiempo real con citas.' },
    ],
    faqs: [
      { q: '¿Los LLMs aprenden de mis preguntas?', a: 'Depende del plan. ChatGPT Free y Plus pueden usar tus conversaciones para entrenar futuros modelos (puedes desactivarlo). Claude por defecto NO entrena con tus conversaciones. Para datos sensibles profesionales, siempre revisa la política de cada plan.' },
      { q: '¿Cuánto cuesta usar un LLM profesionalmente?', a: 'ChatGPT Plus: USD 20/mes. Claude Pro: USD 20/mes. Gemini Advanced: USD 20/mes. Para uso profesional intenso, el ROI se paga en 1 hora ahorrada al mes.' },
    ],
    relacionados: ['que-es-prompt-engineering', 'chatgpt-vs-claude'],
    ctaProfesion: 'ejecutivos',
  },
  {
    slug: 'que-es-ia-generativa',
    titulo: 'IA Generativa: qué es y cómo cambia tu trabajo profesional en 2026',
    intro: 'La IA generativa creó la categoría que está transformando el trabajo profesional. Esta guía explica qué es, qué puede hacer hoy, y dónde aún falla.',
    categoria: 'fundamentos',
    keywords: ['qué es la ia generativa', 'inteligencia artificial generativa', 'generative AI español', 'IA que crea contenido'],
    fechaPublicacion: '2026-05-10',
    tiempoLectura: 7,
    respuestaDirecta: 'La IA generativa es la rama de inteligencia artificial capaz de crear contenido nuevo (texto, imagen, audio, video, código) a partir de instrucciones en lenguaje natural. Ejemplos: ChatGPT escribe textos, Midjourney crea imágenes, Suno compone música, Runway genera video. Su llegada masiva en 2022-2024 marcó el cambio más grande en productividad profesional desde Excel.',
    secciones: [
      { titulo: 'La diferencia con la IA "tradicional"', contenido: 'La IA tradicional (machine learning predictivo) clasifica o predice basándose en datos: "este cliente probablemente comprará". La IA generativa CREA contenido nuevo: "escribe esta propuesta comercial". Esta capacidad de generación abrió aplicaciones impensables hace 3 años.' },
      { titulo: 'Las 4 modalidades de IA generativa más útiles para profesionales', contenido: '1. TEXTO (ChatGPT, Claude): redacción, análisis, resúmenes. 2. IMAGEN (Midjourney, DALL-E): material visual sin necesidad de diseñador. 3. CÓDIGO (Copilot, Cursor): automatización sin programar. 4. AUDIO/VIDEO (Suno, Runway, ElevenLabs): contenido multimedia.' },
    ],
    faqs: [
      { q: '¿La IA generativa va a reemplazar mi trabajo?', a: 'No reemplaza profesionales, reemplaza profesionales que NO usan IA. Los que la integran en su flujo trabajan 3-5x más rápido en tareas repetitivas y se concentran en lo que requiere juicio humano.' },
    ],
    relacionados: ['que-es-llm', 'que-es-prompt-engineering'],
  },
  {
    slug: 'que-es-rag',
    titulo: 'Qué es RAG (Retrieval-Augmented Generation) explicado simple',
    intro: 'RAG es la técnica que permite a una IA responder con tus propios documentos. Te explicamos qué es, cuándo aplicarlo y cómo evita las alucinaciones.',
    categoria: 'fundamentos',
    keywords: ['qué es rag', 'rag inteligencia artificial', 'retrieval augmented generation', 'ia con mis documentos'],
    fechaPublicacion: '2026-05-08',
    tiempoLectura: 6,
    respuestaDirecta: 'RAG (Retrieval-Augmented Generation) es una técnica donde un LLM consulta primero una base de documentos propios antes de generar la respuesta. Esto le permite responder con información actualizada y específica de tu organización, en vez de solo lo que aprendió durante el entrenamiento. Reduce drásticamente las alucinaciones y permite que un abogado pregunte por su jurisprudencia o un médico por sus protocolos clínicos sin que el modelo invente.',
    secciones: [
      { titulo: 'El problema que RAG resuelve', contenido: 'Un LLM solo "sabe" lo que aprendió hasta su fecha de corte. Si le preguntas sobre tu manual interno de procesos, no tiene idea. RAG le permite "leer" tu manual al momento de responder.' },
      { titulo: 'Cómo funciona en 3 pasos simples', contenido: '1. Tus documentos se transforman en vectores numéricos y se guardan en una base de datos. 2. Cuando haces una pregunta, el sistema busca los fragmentos más relevantes. 3. El LLM genera la respuesta usando esos fragmentos como contexto.' },
    ],
    faqs: [
      { q: '¿Necesito programar para usar RAG?', a: 'No siempre. Hoy existen plataformas no-code (NotebookLM de Google, ChatGPT con "Custom GPTs", Claude con "Projects") que implementan RAG sin código.' },
    ],
    relacionados: ['que-es-llm', 'que-es-prompt-engineering'],
  },
  {
    slug: 'que-es-agente-ia',
    titulo: 'Agentes de IA: qué son y por qué son la próxima revolución',
    intro: 'Los agentes de IA no solo responden: ejecutan tareas completas. Aquí te explicamos qué son, qué pueden hacer hoy y qué se viene.',
    categoria: 'fundamentos',
    keywords: ['qué es un agente de ia', 'agente ia', 'ai agent español', 'agentes autónomos'],
    fechaPublicacion: '2026-05-05',
    tiempoLectura: 7,
    respuestaDirecta: 'Un agente de IA es un sistema basado en LLMs que no solo responde preguntas, sino que ejecuta tareas completas de forma autónoma: navega web, escribe código, agenda reuniones, envía emails, completa formularios. La diferencia con ChatGPT clásico: un agente actúa, no solo conversa. En 2026 son la categoría de mayor crecimiento (Claude Computer Use, OpenAI Operator, etc.).',
    secciones: [
      { titulo: 'Agente vs chatbot: la diferencia clave', contenido: 'Chatbot: "¿Cómo agendo una reunión?" → te explica. Agente: "Agéndame una reunión con Juan el jueves a las 15h" → abre tu calendario, busca disponibilidad, la crea, envía invitación, te confirma. El agente ejecuta acciones reales en herramientas externas.' },
    ],
    faqs: [
      { q: '¿Los agentes son seguros?', a: 'En 2026 todavía requieren supervisión humana en tareas críticas. Para tareas repetitivas de bajo riesgo (recolección de información, completar formularios) ya son confiables.' },
    ],
    relacionados: ['que-es-llm', 'que-es-mcp'],
  },
  {
    slug: 'que-es-mcp',
    titulo: 'Qué es MCP (Model Context Protocol): el "USB-C de la IA"',
    intro: 'MCP es el protocolo abierto creado por Anthropic que permite a los LLMs conectarse a cualquier herramienta o dato. Te explicamos qué es y por qué importa.',
    categoria: 'fundamentos',
    keywords: ['qué es mcp', 'model context protocol', 'anthropic mcp', 'integración llm'],
    fechaPublicacion: '2026-05-02',
    tiempoLectura: 5,
    respuestaDirecta: 'MCP (Model Context Protocol) es un estándar abierto creado por Anthropic en 2024 que define cómo los LLMs como Claude se conectan a fuentes de datos y herramientas externas (bases de datos, APIs, archivos, servicios). Es comparable al USB-C: un solo protocolo universal que reemplaza decenas de integraciones a medida.',
    secciones: [
      { titulo: 'Por qué importa para tu negocio', contenido: 'Antes, integrar una IA a tu sistema interno requería desarrollo custom. Con MCP, basta con instalar el "MCP server" de la herramienta (Notion, Slack, tu CRM) y el LLM ya sabe interactuar con ella. Reduce el costo de integración de meses a días.' },
    ],
    faqs: [],
    relacionados: ['que-es-agente-ia', 'que-es-llm'],
  },

  // ─── COMPARATIVAS ──────────────────────────────────────────────
  {
    slug: 'chatgpt-vs-claude',
    titulo: 'ChatGPT vs Claude 2026: comparativa honesta para profesionales LATAM',
    intro: '¿Cuál conviene más para tu trabajo? Una comparativa práctica entre los dos mejores LLMs del mercado, con casos de uso reales para LATAM.',
    categoria: 'comparativas',
    keywords: ['chatgpt vs claude', 'claude vs chatgpt 2026', 'cuál es mejor chatgpt o claude', 'comparativa ia profesionales'],
    fechaPublicacion: '2026-05-18',
    tiempoLectura: 9,
    respuestaDirecta: 'ChatGPT (OpenAI) y Claude (Anthropic) son los dos mejores LLMs en 2026. Para profesionales LATAM: Claude es superior en análisis estructurado, razonamiento legal/médico y redacción larga en español. ChatGPT es superior en versatilidad, generación de imágenes integrada (DALL-E), búsqueda web y ecosistema de plugins. Ambos cuestan USD 20/mes en plan Pro. La elección depende del tipo de trabajo: análisis profundo = Claude, multitarea creativa = ChatGPT.',
    secciones: [
      { titulo: 'Ventajas concretas de Claude para LATAM', contenido: 'Mejor calidad de español, especialmente en textos largos. Respuestas más estructuradas y honestas (te dice cuando no sabe). Mayor ventana de contexto (puede leer documentos de 200+ páginas). Más cuidadoso con datos sensibles (no entrena con tus conversaciones por defecto). Mejor para abogados, médicos, contadores y analistas.' },
      { titulo: 'Ventajas concretas de ChatGPT para LATAM', contenido: 'Genera imágenes integradas (DALL-E 3). Búsqueda web nativa más rápida. Ecosistema de "Custom GPTs" muy maduro. Más rápido en respuestas cortas. Mejor para emprendedores, marketing y trabajo creativo multitarea.' },
      { titulo: 'Mi recomendación según profesión', contenido: 'Abogados, médicos, contadores, analistas, investigadores → Claude. Emprendedores, marketers, diseñadores, ejecutivos generalistas → ChatGPT. Si solo vas a pagar uno y tu trabajo es mayormente texto: Claude. Si necesitas generar imágenes también: ChatGPT.' },
    ],
    faqs: [
      { q: '¿Puedo usar los dos?', a: 'Muchos profesionales pagan ambos (USD 40/mes total) porque cada uno tiene casos donde es claramente mejor. Si tu trabajo paga eso en 1 hora, vale la pena.' },
      { q: '¿Cuál es mejor en español?', a: 'Claude tiende a producir español más natural en LATAM. ChatGPT a veces usa expresiones de España. Ambos entienden español perfectamente.' },
    ],
    relacionados: ['que-es-llm', 'que-es-prompt-engineering'],
  },
  {
    slug: 'chatgpt-vs-gemini',
    titulo: 'ChatGPT vs Gemini: cuál conviene para profesionales en 2026',
    intro: 'Google Gemini ya compite seriamente con ChatGPT. Aquí la comparativa práctica con casos reales LATAM.',
    categoria: 'comparativas',
    keywords: ['chatgpt vs gemini', 'gemini vs chatgpt', 'cuál es mejor', 'google gemini opinion'],
    fechaPublicacion: '2026-05-16',
    tiempoLectura: 7,
    respuestaDirecta: 'En 2026 ChatGPT sigue siendo más popular pero Gemini (Google) ya iguala o supera en varias áreas: integración con Workspace (Gmail, Docs, Drive), búsqueda web en tiempo real, generación de video con Veo, análisis multimodal. ChatGPT mantiene ventaja en ecosistema de plugins y Custom GPTs. Para profesionales que ya usan Google Workspace, Gemini Advanced (USD 20/mes) suele tener mejor relación costo-beneficio.',
    secciones: [
      { titulo: 'Cuándo elegir Gemini sobre ChatGPT', contenido: 'Si tu organización ya usa Google Workspace, Gemini se integra nativamente con tus emails y documentos. Para análisis de videos largos o audio (transcripción + análisis), Gemini es superior. Para investigación con citaciones web actualizadas, también gana Gemini.' },
    ],
    faqs: [],
    relacionados: ['chatgpt-vs-claude', 'que-es-llm'],
  },
  {
    slug: 'mejor-ia-para-escribir-espanol',
    titulo: 'La mejor IA para escribir en español latinoamericano (test 2026)',
    intro: 'Testeamos los 5 principales LLMs generando textos en español LATAM. Quién gana, quién pierde, y por qué.',
    categoria: 'comparativas',
    keywords: ['mejor ia para escribir', 'ia para redactar español', 'chatgpt vs claude español', 'redacción ia latinoamerica'],
    fechaPublicacion: '2026-05-14',
    tiempoLectura: 8,
    respuestaDirecta: 'Para escritura en español latinoamericano, el ranking 2026 es: 1) Claude (Sonnet 4.6) — español más natural y neutro, mejor para textos largos y formales. 2) ChatGPT (GPT-5) — versátil, mejor para tono creativo. 3) Gemini Advanced — bueno para textos integrados con Google Docs. 4) Perplexity — específico para textos con investigación. 5) Llama — open source, calidad inferior pero útil para datos sensibles.',
    secciones: [
      { titulo: 'Test 1: redacción de email comercial formal', contenido: 'Claude produjo el email más profesional, con tono neutro LATAM. ChatGPT usó "vosotros" en una versión (problema). Gemini quedó bien pero algo plano. Ganador: Claude.' },
      { titulo: 'Test 2: post creativo para Instagram', contenido: 'ChatGPT ganó claramente. Más juego con el lenguaje, mejor sentido del humor LATAM. Claude más conservador. Gemini correcto pero predecible.' },
    ],
    faqs: [],
    relacionados: ['chatgpt-vs-claude', 'chatgpt-vs-gemini'],
  },

  // ─── HERRAMIENTAS × PROFESIÓN ──────────────────────────────────
  {
    slug: 'mejores-prompts-abogados',
    titulo: '15 prompts probados para abogados que automatizan el 40% del trabajo',
    intro: 'Una colección curada de prompts para ChatGPT y Claude que abogados LATAM están usando hoy. Listos para copiar y adaptar.',
    categoria: 'herramientas',
    keywords: ['prompts chatgpt abogados', 'prompts ia para abogados', 'ia para derecho', 'chatgpt abogados latam'],
    fechaPublicacion: '2026-05-17',
    tiempoLectura: 12,
    respuestaDirecta: 'Los 15 prompts más usados por abogados LATAM en 2026 cubren: redacción de contratos, revisión de cláusulas, generación de demandas, búsqueda jurisprudencial, due diligence, resumen de expedientes y briefings ejecutivos. Funcionan en ChatGPT, Claude y Gemini. Cada prompt incluye un "rol" claro, contexto profesional, formato esperado y restricciones (jurisdicción, idioma, extensión).',
    secciones: [
      { titulo: 'Prompt 1: Generador de cláusulas contractuales', contenido: '"Actúa como abogado corporativo de [PAÍS] con 15 años de experiencia en contratos de [TIPO]. Genera una cláusula de [TEMA] aplicable a [CONTEXTO]. Cita la normativa aplicable. Máximo 200 palabras."' },
      { titulo: 'Prompt 2: Resumen ejecutivo de jurisprudencia', contenido: '"Resume el siguiente fallo en 5 puntos para un cliente no-abogado: [PEGAR TEXTO]. Termina con la implicación práctica del fallo."' },
      { titulo: 'Prompt 3: Detector de cláusulas riesgosas', contenido: '"Revisa el siguiente contrato y lista TODAS las cláusulas que podrían generar riesgo para [PARTE]. Para cada una: cita el texto, explica el riesgo y propone una alternativa."' },
    ],
    faqs: [
      { q: '¿Es seguro pegar contratos de clientes en ChatGPT?', a: 'Depende del cliente y del plan. Con ChatGPT Team o Enterprise, los datos NO se usan para entrenar. Con planes gratis o Plus, puedes desactivar el entrenamiento en configuración. Para datos altamente sensibles, mejor usar Claude (no entrena por defecto) o instalar Llama localmente.' },
    ],
    relacionados: ['ia-para-abogados-chile', 'chatgpt-vs-claude'],
    ctaProfesion: 'abogados',
  },
  {
    slug: 'mejores-prompts-medicos',
    titulo: '12 prompts para médicos LATAM (respetando privacidad de pacientes)',
    intro: 'Prompts diseñados para médicos clínicos. Incluyen el patrón obligatorio de anonimización de datos del paciente.',
    categoria: 'herramientas',
    keywords: ['prompts chatgpt medicos', 'ia para medicos', 'chatgpt medicina', 'ia clinica latam'],
    fechaPublicacion: '2026-05-15',
    tiempoLectura: 10,
    respuestaDirecta: 'Los 12 prompts más útiles para médicos LATAM en 2026 cubren: diagnóstico diferencial, búsqueda de literatura, resumen clínico, generación de informes, traducción de papers, y educación al paciente. Cada prompt incluye un patrón obligatorio: anonimizar nombre, RUT/identificación, fecha de nacimiento exacta, dirección y cualquier dato identificable antes de pegarlo.',
    secciones: [
      { titulo: 'Patrón base: anonimización obligatoria', contenido: '"Paciente femenino, 54 años, antecedentes de [PATOLOGÍA], consulta por [SÍNTOMAS]. NUNCA: nombre completo, RUT, dirección, hospital específico, número de ficha."' },
      { titulo: 'Prompt: diagnóstico diferencial estructurado', contenido: '"Actúa como [especialidad]. Paciente [datos anonimizados]. Síntomas: [lista]. Genera 5 diagnósticos diferenciales en orden de probabilidad. Para cada uno: criterios diagnósticos, exámenes para confirmar, exámenes para descartar."' },
    ],
    faqs: [],
    relacionados: ['ia-para-medicos-chile', 'chatgpt-vs-claude'],
    ctaProfesion: 'medicos',
  },
  {
    slug: 'mejores-prompts-contadores',
    titulo: '10 prompts para contadores: cierre mensual en mitad de tiempo',
    intro: 'Prompts probados por contadores LATAM para análisis financiero, conciliación y declaraciones.',
    categoria: 'herramientas',
    keywords: ['prompts chatgpt contadores', 'ia para contadores', 'automatización contable ia', 'chatgpt contabilidad'],
    fechaPublicacion: '2026-05-13',
    tiempoLectura: 8,
    respuestaDirecta: 'Los 10 prompts más usados por contadores LATAM cubren: análisis de estados financieros, detección de anomalías en conciliación bancaria, categorización masiva de gastos, generación de informes mensuales, preparación de declaraciones tributarias (SII Chile, SAT México, AFIP Argentina), análisis de razones financieras, y predicción de flujo de caja.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-contadores-chile', 'chatgpt-vs-claude'],
    ctaProfesion: 'contadores',
  },
  {
    slug: 'mejores-prompts-docentes',
    titulo: '20 prompts para docentes: planificaciones, evaluaciones y rúbricas',
    intro: 'La colección más extensa de prompts para docentes LATAM. Cubre planificación de clase, evaluaciones diferenciadas y feedback personalizado.',
    categoria: 'herramientas',
    keywords: ['prompts chatgpt docentes', 'ia para profesores', 'chatgpt educación', 'planificación clase ia'],
    fechaPublicacion: '2026-05-11',
    tiempoLectura: 14,
    respuestaDirecta: 'Los 20 prompts más útiles para docentes LATAM cubren: planificación de unidades, diseño de evaluaciones con rúbricas, adaptación de contenidos para necesidades educativas especiales (NEE), generación de actividades por niveles, corrección con feedback formativo, comunicación con apoderados, y diseño de proyectos interdisciplinarios.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-docentes-chile'],
    ctaProfesion: 'docentes',
  },
  {
    slug: 'prompts-espanol-chatgpt',
    titulo: 'Los 30 prompts en español que todo profesional debería tener guardados',
    intro: 'Una colección general de los prompts más útiles en español neutro para cualquier profesión.',
    categoria: 'herramientas',
    keywords: ['prompts en español', 'prompts chatgpt español', 'mejores prompts ia', 'prompts productividad'],
    fechaPublicacion: '2026-05-09',
    tiempoLectura: 15,
    respuestaDirecta: 'Los 30 prompts en español más útiles para profesionales se agrupan en 6 categorías: redacción profesional (5), análisis de datos (5), investigación (5), creatividad (5), productividad personal (5), y comunicación interpersonal (5). Funcionan en cualquier LLM y están optimizados para español neutro LATAM.',
    secciones: [],
    faqs: [],
    relacionados: ['que-es-prompt-engineering', 'chatgpt-vs-claude'],
  },

  // ─── HERRAMIENTAS GENERALES ──────────────────────────────────────
  {
    slug: 'que-es-perplexity',
    titulo: 'Qué es Perplexity AI y cuándo conviene más que ChatGPT',
    intro: 'Perplexity es el "Google del futuro" según muchos. Te explicamos qué es, cuándo brilla y cuándo no.',
    categoria: 'herramientas',
    keywords: ['qué es perplexity', 'perplexity ai español', 'perplexity vs chatgpt', 'mejor buscador ia'],
    fechaPublicacion: '2026-05-07',
    tiempoLectura: 6,
    respuestaDirecta: 'Perplexity AI es un motor de búsqueda potenciado por LLMs que responde directamente con citaciones a fuentes web verificables. A diferencia de ChatGPT, no genera respuestas desde memoria sino que consulta la web en tiempo real y muestra de dónde sacó cada dato. Es ideal para investigación profesional, debido a sus citas trazables.',
    secciones: [
      { titulo: 'Cuándo Perplexity gana a ChatGPT', contenido: 'Investigación de actualidad (datos del mes actual), comparativas con fuentes verificables, búsqueda académica con citas, investigación de competencia. Cualquier tarea donde necesites saber DE DÓNDE viene cada dato.' },
    ],
    faqs: [],
    relacionados: ['chatgpt-vs-claude'],
  },
  {
    slug: 'que-es-n8n',
    titulo: 'Qué es n8n: automatización sin código con IA integrada',
    intro: 'n8n es la herramienta favorita de los profesionales que automatizan sin programar. Te explicamos qué es y para qué sirve.',
    categoria: 'herramientas',
    keywords: ['qué es n8n', 'n8n español', 'automatización sin código', 'n8n vs zapier'],
    fechaPublicacion: '2026-05-04',
    tiempoLectura: 7,
    respuestaDirecta: 'n8n es una plataforma open-source de automatización visual que permite conectar más de 400 servicios (Gmail, Slack, Notion, Sheets, ChatGPT, Claude, tu CRM) sin escribir código. Su ventaja sobre Zapier o Make: gratis para uso personal, self-hosted (datos privados), e integración nativa con LLMs para crear "agentes" de automatización inteligente.',
    secciones: [],
    faqs: [],
    relacionados: ['que-es-agente-ia'],
    ctaProfesion: 'emprendedores',
  },

  // ─── CASOS DE USO POR INDUSTRIA ────────────────────────────────
  {
    slug: 'ia-en-salud-chile',
    titulo: 'IA en el sector salud chileno: casos reales y normativa Ley 21.719',
    intro: 'Cómo se está aplicando la IA en hospitales y consultorios chilenos en 2026, respetando la nueva Ley 21.719 de protección de datos.',
    categoria: 'casos-uso',
    keywords: ['ia salud chile', 'ia médica chilena', 'ia hospitales chile', 'ley 21719 ia'],
    fechaPublicacion: '2026-05-19',
    tiempoLectura: 9,
    respuestaDirecta: 'En Chile, la IA en salud crece rápido en 2026: clínicas usan ChatGPT/Claude para informes de alta, diagnóstico diferencial asistido, traducción de papers y resumen clínico. La Ley 21.719 (Protección de Datos Personales) obliga a anonimizar todo dato identificable antes de procesarlo con LLMs externos. Para datos sensibles, instituciones grandes usan instancias propias de Llama o Mistral self-hosted.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-medicos-chile'],
    ctaProfesion: 'medicos',
  },
  {
    slug: 'ia-derecho-mexico',
    titulo: 'IA aplicada al derecho en México: casos prácticos y LFPDPPP',
    intro: 'Cómo abogados mexicanos están usando IA en 2026, y qué cuidados exige la Ley Federal de Protección de Datos.',
    categoria: 'casos-uso',
    keywords: ['ia derecho mexico', 'ia legal mexico', 'lfpdppp ia', 'abogados ia mexico'],
    fechaPublicacion: '2026-05-19',
    tiempoLectura: 9,
    respuestaDirecta: 'Estudios jurídicos mexicanos están usando Claude y ChatGPT para due diligence, revisión de contratos, generación de demandas y búsqueda jurisprudencial. La LFPDPPP obliga a tratar datos personales con cuidado: nunca pegar datos identificables de clientes en LLMs sin anonimizar. Los grandes despachos usan instancias enterprise (ChatGPT Team, Claude for Work) con cláusulas de no-entrenamiento.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-abogados-mexico', 'mejores-prompts-abogados'],
    ctaProfesion: 'abogados',
  },
  {
    slug: 'ia-aplicada-marketing',
    titulo: 'IA aplicada al marketing: 8 casos de uso reales para LATAM',
    intro: 'Equipos de marketing LATAM ya escalaron 5x su output usando IA. Estos son los casos de uso más rentables.',
    categoria: 'casos-uso',
    keywords: ['ia marketing', 'chatgpt marketing', 'inteligencia artificial marketing', 'ia para marketers'],
    fechaPublicacion: '2026-05-06',
    tiempoLectura: 11,
    respuestaDirecta: 'En marketing LATAM 2026, los 8 casos de uso de IA con mejor ROI son: 1) Copywriting multicanal en escala, 2) Investigación competitiva profunda, 3) Personalización por segmento, 4) Generación visual con consistencia de marca (Midjourney + brand assets), 5) Análisis de performance con interpretación ejecutiva, 6) Email marketing personalizado, 7) Creación de scripts para video corto (TikTok, Reels), 8) Optimización SEO programática.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-marketing', 'mejores-prompts-emprendedores'],
    ctaProfesion: 'marketing',
  },
  {
    slug: 'ia-aplicada-finanzas',
    titulo: 'IA aplicada a finanzas: del análisis financiero a la predicción de flujo',
    intro: 'Cómo los profesionales financieros LATAM están integrando IA al análisis, reportes y proyecciones.',
    categoria: 'casos-uso',
    keywords: ['ia finanzas', 'ia análisis financiero', 'chatgpt finanzas', 'automatización financiera ia'],
    fechaPublicacion: '2026-05-03',
    tiempoLectura: 10,
    respuestaDirecta: 'En finanzas LATAM 2026, la IA se aplica a: análisis automatizado de estados financieros con interpretación contextual, conciliación bancaria con detección de anomalías, generación de informes mensuales en minutos, predicción de flujo de caja con escenarios, análisis de portafolios, y preparación de declaraciones tributarias (con supervisión humana). Claude y ChatGPT son los más usados; Excel con Copilot también ganó terreno.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-contadores', 'mejores-prompts-contadores'],
    ctaProfesion: 'contadores',
  },

  // ─── ARTÍCULOS PAÍS-ESPECÍFICOS ────────────────────────────────
  {
    slug: 'aprender-ia-chile',
    titulo: 'Cómo aprender IA desde cero en Chile: guía 2026',
    intro: 'Si eres profesional en Chile y quieres aprender IA aplicada, esta guía paso a paso te muestra cómo, dónde y cuándo.',
    categoria: 'pais',
    keywords: ['aprender ia chile', 'curso ia chile', 'donde aprender ia chile', 'capacitación ia chile'],
    fechaPublicacion: '2026-05-17',
    tiempoLectura: 8,
    respuestaDirecta: 'En Chile, las mejores opciones para aprender IA aplicada en 2026 son: 1) Mentorías 1:1 personalizadas (Orbbi, consultores LinkedIn) — más caras pero más rápidas. 2) Diplomados universitarios (UC, UDP, Adolfo Ibáñez) — formales pero largos. 3) Cursos online (Platzi, Crehana, Domestika) — baratos pero genéricos. 4) Comunidades gratuitas (LinkedIn, WhatsApp groups, eventos como AI Chile). Para profesionales con poco tiempo y necesidad de resultados aplicados, la mentoría 1:1 entrega ROI más rápido.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-abogados-chile', 'ia-para-medicos-chile'],
  },
  {
    slug: 'aprender-ia-mexico',
    titulo: 'Cómo aprender IA en México: opciones reales para profesionales 2026',
    intro: 'Las 5 mejores rutas para que un profesional mexicano aprenda IA aplicada en 2026.',
    categoria: 'pais',
    keywords: ['aprender ia mexico', 'curso ia mexico', 'capacitación ia mexico', 'donde estudiar ia mexico'],
    fechaPublicacion: '2026-05-16',
    tiempoLectura: 8,
    respuestaDirecta: 'En México, las opciones principales para aprender IA aplicada profesionalmente son: mentorías 1:1 (Orbbi, consultores), maestrías y diplomados del Tec de Monterrey o ITAM, cursos online de Platzi y Crehana, programas corporativos del INADEM, y comunidades como Data Mexico. Para resultados rápidos aplicados al trabajo, la mentoría individual es la opción con mejor ROI.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-abogados-mexico'],
  },
  {
    slug: 'aprender-ia-colombia',
    titulo: 'Aprender IA en Colombia: rutas y opciones para profesionales 2026',
    intro: 'Si eres profesional en Colombia y quieres dominar la IA, aquí están las mejores opciones para empezar hoy.',
    categoria: 'pais',
    keywords: ['aprender ia colombia', 'curso ia colombia', 'capacitación ia bogota', 'ia medellin'],
    fechaPublicacion: '2026-05-13',
    tiempoLectura: 7,
    respuestaDirecta: 'En Colombia, las rutas para aprender IA profesionalmente en 2026 son: mentorías 1:1 personalizadas (Orbbi), diplomados de la Universidad de Los Andes y EAFIT, programas de ColombiaTec, cursos online en Platzi, y comunidades como Data Science Bogotá. Para profesionales con poco tiempo, la mentoría 1:1 entrega resultados aplicables en semanas.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-emprendedores-colombia'],
  },
  {
    slug: 'aprender-ia-argentina',
    titulo: 'Aprender IA en Argentina: opciones reales 2026',
    intro: 'Profesionales argentinos: estas son las mejores formas de aprender IA aplicada en 2026.',
    categoria: 'pais',
    keywords: ['aprender ia argentina', 'curso ia argentina', 'ia buenos aires', 'capacitación ia argentina'],
    fechaPublicacion: '2026-05-11',
    tiempoLectura: 7,
    respuestaDirecta: 'En Argentina, las opciones principales en 2026 incluyen: mentorías 1:1 con Orbbi y consultores especializados, programas de la UBA y la UTN, cursos en Platzi y Coderhouse, eventos como AIxArgentina, y comunidades de Data Science Argentina. Para profesionales que necesitan resultados aplicados a su trabajo específico, la mentoría individual es la opción con mejor relación tiempo/resultado.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-emprendedores-argentina'],
  },
  {
    slug: 'aprender-ia-peru',
    titulo: 'Aprender IA en Perú: guía 2026 para profesionales',
    intro: 'Mentorías, diplomados, cursos: las opciones reales para profesionales peruanos en 2026.',
    categoria: 'pais',
    keywords: ['aprender ia peru', 'curso ia peru', 'ia lima', 'capacitación ia peruana'],
    fechaPublicacion: '2026-05-10',
    tiempoLectura: 7,
    respuestaDirecta: 'En Perú, las rutas profesionales para aprender IA en 2026 son: mentorías 1:1 (Orbbi), programas de PUCP y UPC, cursos en Platzi y Crehana, comunidades como Data Science Perú, y eventos en Lima. Para resultados rápidos aplicados a tu profesión específica, la mentoría individual es la opción más eficiente.',
    secciones: [],
    faqs: [],
    relacionados: ['ia-para-contadores-peru'],
  },

  // ─── COMERCIAL / FUNNEL ─────────────────────────────────────────
  {
    slug: 'mentoria-ia-vs-curso-online',
    titulo: 'Mentoría 1:1 vs curso online: cuál conviene para aprender IA',
    intro: 'Comparativa honesta entre las dos formas más comunes de aprender IA en 2026. Cuándo conviene cada una.',
    categoria: 'comparativas',
    keywords: ['mentoría vs curso online', 'mejor forma aprender ia', 'mentoría 1 a 1 ia', 'curso online ia opinion'],
    fechaPublicacion: '2026-05-18',
    tiempoLectura: 7,
    respuestaDirecta: 'La mentoría 1:1 conviene cuando: necesitas aprender aplicado a tu profesión específica, tienes poco tiempo, ya intentaste cursos genéricos y no funcionaron, valoras el feedback en tiempo real. El curso online conviene cuando: tienes mucho tiempo disponible, eres altamente disciplinado, quieres aprender conceptos generales sin urgencia, presupuesto muy limitado. El factor decisivo: tiempo vs dinero. La mentoría cuesta más por sesión pero entrega resultados aplicados en semanas, no meses.',
    secciones: [],
    faqs: [],
    relacionados: ['aprender-ia-chile'],
  },
  {
    slug: 'cuanto-cuesta-aprender-ia-2026',
    titulo: 'Cuánto cuesta aprender IA en 2026 (rango realista por opción)',
    intro: 'Una guía honesta de precios para aprender IA profesionalmente en LATAM: gratis, pago bajo, pago medio, pago alto.',
    categoria: 'comparativas',
    keywords: ['cuanto cuesta aprender ia', 'precio curso ia', 'precio mentoría ia', 'aprender ia gratis'],
    fechaPublicacion: '2026-05-14',
    tiempoLectura: 6,
    respuestaDirecta: 'Aprender IA en 2026 cuesta desde USD 0 (YouTube + práctica autodirigida) hasta USD 3.000+ (diplomados universitarios completos). Rangos típicos: cursos online genéricos USD 30-300, mentorías 1:1 USD 90-300 por sesión, programas estructurados (4-12 semanas) USD 300-1.500, diplomados universitarios USD 1.500-3.500. El ROI real depende de aplicación: una persona que aplica IA bien recupera USD 1.000 en 1-2 meses de productividad.',
    secciones: [],
    faqs: [],
    relacionados: ['mentoria-ia-vs-curso-online'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(cat: ArticleCategory): Article[] {
  return ARTICLES.filter(a => a.categoria === cat)
}

export function getRelated(slugs: string[]): Article[] {
  return ARTICLES.filter(a => slugs.includes(a.slug))
}
