/**
 * Lead Magnet PDF Generator
 *
 * Genera un PDF "100 Prompts en Español para Profesionales LATAM"
 * que se sirve como descarga gratuita capturando email.
 *
 * Output: public/recursos/100-prompts-orbbi.pdf
 *
 * Uso: npx tsx scripts/generate-lead-magnet.ts
 */

import PDFDocument from 'pdfkit'
import { createWriteStream, mkdirSync } from 'fs'
import { join } from 'path'

const PROMPTS = [
  // ─── ABOGADOS (10) ─────────────────────────────────────────
  { categoria: 'Abogados', prompt: 'Actúa como abogado tributario de [PAÍS] con 15 años de experiencia. Redacta un dictamen sobre [TEMA] aplicable a [CONTEXTO CLIENTE]. Cita la normativa relevante. Máximo 500 palabras.' },
  { categoria: 'Abogados', prompt: 'Revisa el siguiente contrato y lista TODAS las cláusulas que podrían generar riesgo para [PARTE]. Para cada una: cita el texto, explica el riesgo, propone una alternativa.' },
  { categoria: 'Abogados', prompt: 'Genera una cláusula de [TEMA] aplicable a un contrato de [TIPO] entre [PARTE A] y [PARTE B]. Considera la jurisdicción [PAÍS].' },
  { categoria: 'Abogados', prompt: 'Resume el siguiente fallo en 5 puntos para un cliente no abogado: [PEGAR FALLO]. Termina con la implicación práctica.' },
  { categoria: 'Abogados', prompt: 'Compara los siguientes 3 contratos y dame una tabla con las diferencias en [CRITERIOS]: [CONTRATOS].' },
  { categoria: 'Abogados', prompt: 'Genera 10 preguntas que un juez podría hacerme en audiencia sobre el caso: [DESCRIPCIÓN]. Incluye la respuesta sugerida para cada una.' },
  { categoria: 'Abogados', prompt: 'Redacta una carta de demanda formal contra [PARTE] por [MOTIVO]. Tono profesional, sin amenazas, exigiendo [REMEDIO].' },
  { categoria: 'Abogados', prompt: 'Analiza este expediente y genera un timeline cronológico de los hechos relevantes: [PEGAR EXPEDIENTE].' },
  { categoria: 'Abogados', prompt: 'Genera un memo legal de [TEMA] para un cliente que no entiende términos técnicos. Tono didáctico, máximo 300 palabras.' },
  { categoria: 'Abogados', prompt: 'Prepara una checklist de due diligence para una operación de M&A en el sector [INDUSTRIA] en [PAÍS].' },

  // ─── MÉDICOS (10) ─────────────────────────────────────────
  { categoria: 'Médicos', prompt: 'Actúa como [especialidad]. Paciente [DATOS ANONIMIZADOS: edad, sexo, antecedentes]. Síntomas: [LISTA]. Genera 5 diagnósticos diferenciales en orden de probabilidad. Para cada uno: criterios diagnósticos, exámenes para confirmar, exámenes para descartar.' },
  { categoria: 'Médicos', prompt: 'Resume este paper médico en 5 puntos para un colega: [PEGAR ABSTRACT/PAPER]. Incluye limitaciones del estudio.' },
  { categoria: 'Médicos', prompt: 'Traduce al español de LATAM este artículo médico en inglés manteniendo terminología clínica precisa: [PEGAR TEXTO].' },
  { categoria: 'Médicos', prompt: 'Genera un informe de alta para un paciente que sufrió [PATOLOGÍA] basándote en estos datos: [DATOS ANONIMIZADOS]. Incluye recomendaciones y signos de alarma.' },
  { categoria: 'Médicos', prompt: 'Explica a un paciente sin conocimiento médico qué es [CONDICIÓN], en lenguaje claro, máximo 250 palabras. Incluye qué esperar del tratamiento.' },
  { categoria: 'Médicos', prompt: 'Genera 10 preguntas para hacer en la anamnesis a un paciente que consulta por [SÍNTOMA PRINCIPAL].' },
  { categoria: 'Médicos', prompt: 'Lista las contraindicaciones e interacciones farmacológicas relevantes del medicamento [X] cuando se combina con [Y].' },
  { categoria: 'Médicos', prompt: 'Diseña un plan de seguimiento a 6 meses para un paciente con [CONDICIÓN CRÓNICA]. Incluye controles y exámenes.' },
  { categoria: 'Médicos', prompt: 'Compara las guías clínicas más recientes (≤ 2 años) sobre el manejo de [CONDICIÓN]. Identifica diferencias entre sociedades.' },
  { categoria: 'Médicos', prompt: 'Genera una hoja informativa para apoderado de paciente pediátrico con [DIAGNÓSTICO]. Lenguaje simple, máximo 400 palabras.' },

  // ─── CONTADORES (10) ─────────────────────────────────────────
  { categoria: 'Contadores', prompt: 'Analiza este balance y dame un diagnóstico financiero en 5 puntos clave para el dueño de la empresa: [PEGAR BALANCE].' },
  { categoria: 'Contadores', prompt: 'Detecta anomalías en esta lista de transacciones bancarias [PEGAR LISTA]. Para cada anomalía: explica por qué llama la atención.' },
  { categoria: 'Contadores', prompt: 'Categoriza estos gastos para mi declaración de renta en [PAÍS]: [LISTA]. Indica si son deducibles, parcialmente deducibles o no deducibles.' },
  { categoria: 'Contadores', prompt: 'Genera un informe ejecutivo mensual para el dueño de una pyme con estos datos: [INGRESOS, GASTOS, MÁRGENES]. Incluye 3 recomendaciones.' },
  { categoria: 'Contadores', prompt: 'Calcula las razones financieras clave (liquidez, endeudamiento, rentabilidad) para esta empresa: [DATOS]. Interpreta cada una.' },
  { categoria: 'Contadores', prompt: 'Proyecta el flujo de caja a 6 meses dados estos supuestos: [INGRESOS PROYECTADOS, GASTOS FIJOS, ESTACIONALIDAD].' },
  { categoria: 'Contadores', prompt: 'Compara el costo total de propiedad entre comprar vs leasing del activo [X] en un plazo de 5 años, considerando [TASA, IMPUESTOS, DEPRECIACIÓN].' },
  { categoria: 'Contadores', prompt: 'Audita estos asientos contables y detecta posibles errores u oportunidades de ahorro tributario: [PEGAR ASIENTOS].' },
  { categoria: 'Contadores', prompt: 'Genera el calendario tributario [PAÍS] para una empresa del rubro [INDUSTRIA] con [TAMAÑO]. Incluye fechas y formularios.' },
  { categoria: 'Contadores', prompt: 'Explica al dueño no contador qué es la depreciación y por qué impacta su utilidad pero no su caja. Máximo 300 palabras.' },

  // ─── DOCENTES (10) ─────────────────────────────────────────
  { categoria: 'Docentes', prompt: 'Diseña una planificación de clase de 90 minutos sobre [TEMA] para estudiantes de [NIVEL]. Incluye objetivos, actividades, evaluación formativa.' },
  { categoria: 'Docentes', prompt: 'Genera una evaluación de 10 preguntas (5 selección múltiple, 3 desarrollo, 2 análisis) sobre [TEMA]. Incluye rúbrica.' },
  { categoria: 'Docentes', prompt: 'Adapta esta actividad para estudiantes con [NEE específica]: [PEGAR ACTIVIDAD]. Mantén el objetivo de aprendizaje.' },
  { categoria: 'Docentes', prompt: 'Genera feedback constructivo para este ensayo de estudiante: [PEGAR]. Identifica 3 fortalezas y 3 áreas a mejorar.' },
  { categoria: 'Docentes', prompt: 'Diseña un proyecto interdisciplinario de 4 semanas que conecte [ASIGNATURA A] con [ASIGNATURA B] sobre el tema [TEMA].' },
  { categoria: 'Docentes', prompt: 'Crea 5 actividades por nivel de logro (inicial, intermedio, avanzado) para enseñar [CONCEPTO].' },
  { categoria: 'Docentes', prompt: 'Genera una rúbrica analítica de 4 criterios para evaluar [TAREA]. Cada criterio con 4 niveles (logrado, en desarrollo, inicial, no logrado).' },
  { categoria: 'Docentes', prompt: 'Redacta una comunicación a apoderado sobre el desempeño de [ESTUDIANTE] en [ASIGNATURA]. Tono profesional, equilibrado entre fortalezas y áreas a trabajar.' },
  { categoria: 'Docentes', prompt: 'Genera 10 preguntas tipo "exit ticket" para verificar comprensión al final de una clase sobre [TEMA].' },
  { categoria: 'Docentes', prompt: 'Diseña una secuencia de aprendizaje invertido (flipped classroom) sobre [TEMA] para [NIVEL]. Incluye material previo y actividad presencial.' },

  // ─── EMPRENDEDORES (10) ─────────────────────────────────────────
  { categoria: 'Emprendedores', prompt: 'Analiza esta idea de negocio y dame 5 razones por las que podría fracasar (devil\'s advocate): [DESCRIPCIÓN IDEA].' },
  { categoria: 'Emprendedores', prompt: 'Genera 3 buyer personas detallados para mi producto [DESCRIPCIÓN]. Para cada uno: demografía, dolores, motivaciones, objeciones de compra.' },
  { categoria: 'Emprendedores', prompt: 'Escribe el copy de mi landing page para [PRODUCTO]. Incluye headline, subheadline, 3 beneficios clave, 1 CTA. Tono [TONO].' },
  { categoria: 'Emprendedores', prompt: 'Genera 5 scripts de video corto (30-60 seg) para promocionar [PRODUCTO] en TikTok/Reels.' },
  { categoria: 'Emprendedores', prompt: 'Diseña un email de outreach personalizado para vender [PRODUCTO] a [TIPO DE CLIENTE]. Tono no agresivo, valor primero.' },
  { categoria: 'Emprendedores', prompt: 'Estructura mi pitch de 1 minuto para inversores sobre [STARTUP]: problema, solución, mercado, tracción, equipo, ask.' },
  { categoria: 'Emprendedores', prompt: 'Genera mi análisis FODA detallado considerando [INDUSTRIA, COMPETIDORES, FORTALEZAS ACTUALES].' },
  { categoria: 'Emprendedores', prompt: 'Identifica los 5 KPIs más relevantes para una startup de [SECTOR] en etapa [PRE-SEED/SEED/SERIES A].' },
  { categoria: 'Emprendedores', prompt: 'Compara mi propuesta de valor contra 3 competidores: [LISTA]. Tabla con diferencias en precio, features, target, posicionamiento.' },
  { categoria: 'Emprendedores', prompt: 'Genera 10 preguntas tipo "Mom Test" para validar si la gente realmente tiene el problema que estoy resolviendo con [PRODUCTO].' },

  // ─── EJECUTIVOS (10) ─────────────────────────────────────────
  { categoria: 'Ejecutivos', prompt: 'Resume este reporte de [PÁGINAS] en 5 bullets ejecutivos accionables: [PEGAR DOCUMENTO]. Termina con la decisión recomendada.' },
  { categoria: 'Ejecutivos', prompt: 'Prepara el outline de mi board deck trimestral. Áreas: financiero, operaciones, comercial, talento, riesgos. 2-3 slides por área.' },
  { categoria: 'Ejecutivos', prompt: 'Genera el briefing de mi reunión 1:1 con [PERSONA, ROL]: contexto reciente, temas a tocar, preguntas a hacer.' },
  { categoria: 'Ejecutivos', prompt: 'Investiga al competidor [EMPRESA] y dame: posicionamiento, fortalezas, debilidades, movimientos recientes (último año), señales estratégicas.' },
  { categoria: 'Ejecutivos', prompt: 'Analiza esta propuesta de proveedor y dame: pros, contras, riesgos ocultos, preguntas que debería hacer antes de firmar: [PEGAR PROPUESTA].' },
  { categoria: 'Ejecutivos', prompt: 'Genera 5 OKRs trimestrales para mi equipo de [DEPARTAMENTO] alineados con el objetivo de [META ANUAL].' },
  { categoria: 'Ejecutivos', prompt: 'Prepara mi comunicación interna sobre [TEMA SENSIBLE: layoffs, cambio estratégico, crisis]. Tono honesto, claro, sin corporativismo vacío.' },
  { categoria: 'Ejecutivos', prompt: 'Diseña el agenda de mi town hall mensual. Áreas: visión, números, reconocimientos, Q&A. Máximo 45 minutos.' },
  { categoria: 'Ejecutivos', prompt: 'Genera el storytelling para un stakeholder externo sobre [PROYECTO]. Empieza con el problema del usuario, no con la empresa.' },
  { categoria: 'Ejecutivos', prompt: 'Prepara mi respuesta ejecutiva a este RFP del cliente [X]. Foco en cómo nuestra propuesta resuelve [PROBLEMA ESPECÍFICO DEL CLIENTE].' },

  // ─── PRODUCTIVIDAD GENERAL (20) ─────────────────────────────────────────
  { categoria: 'Productividad', prompt: 'Resume este email/conversación en 3 bullets: contexto, decisión tomada, próxima acción esperada de mí: [PEGAR].' },
  { categoria: 'Productividad', prompt: 'Reescribe este texto para que sea más claro y conciso, sin perder información clave: [PEGAR TEXTO].' },
  { categoria: 'Productividad', prompt: 'Genera 5 preguntas que debería hacer en mi reunión con [PERSONA/TEMA] para llevarme la mayor información útil.' },
  { categoria: 'Productividad', prompt: 'Transforma estos puntos en una propuesta estructurada con introducción, desarrollo y cierre: [PUNTOS].' },
  { categoria: 'Productividad', prompt: 'Identifica las 3 tareas más importantes de mi día dado este contexto: [PEGAR LISTA DE TAREAS]. Justifica por qué.' },
  { categoria: 'Productividad', prompt: 'Genera un email de seguimiento profesional para [SITUACIÓN], tono cordial pero firme, máximo 100 palabras.' },
  { categoria: 'Productividad', prompt: 'Resume esta reunión que duró [X] minutos en: decisiones, asignaciones, próximas acciones, riesgos identificados: [PEGAR TRANSCRIPCIÓN].' },
  { categoria: 'Productividad', prompt: 'Compara estas 3 opciones (A, B, C) según los criterios [LISTA]. Tabla comparativa y recomendación final justificada.' },
  { categoria: 'Productividad', prompt: 'Genera el orden del día para una reunión de [DURACIÓN] sobre [TEMA] con [PARTICIPANTES]. Asigna tiempos.' },
  { categoria: 'Productividad', prompt: 'Reescribe este mensaje difícil/incómodo a un colega con tono asertivo pero respetuoso: [PEGAR].' },
  { categoria: 'Productividad', prompt: 'Genera 10 ideas creativas para [PROBLEMA/OBJETIVO]. Incluye al menos 3 que sean "fuera de lo convencional".' },
  { categoria: 'Productividad', prompt: 'Investiga estos 5 temas y dame un resumen de 200 palabras de cada uno con fuentes verificables.' },
  { categoria: 'Productividad', prompt: 'Diseña un template/checklist reusable para [PROCESO RECURRENTE].' },
  { categoria: 'Productividad', prompt: 'Identifica los gaps en este documento/plan: [PEGAR]. Qué falta abordar, qué riesgos no se mencionan, qué supuestos no están validados.' },
  { categoria: 'Productividad', prompt: 'Convierte este texto largo en 5 tweets virales (con gancho fuerte al inicio): [PEGAR].' },
  { categoria: 'Productividad', prompt: 'Genera el script de una llamada de descubrimiento (discovery call) de 30 min con un prospecto de [SECTOR].' },
  { categoria: 'Productividad', prompt: 'Identifica los stakeholders clave de este proyecto y qué espera cada uno: [DESCRIPCIÓN PROYECTO].' },
  { categoria: 'Productividad', prompt: 'Genera 3 alternativas de respuesta a este email difícil: una formal, una asertiva, una empática. Pega: [EMAIL].' },
  { categoria: 'Productividad', prompt: 'Transforma esta presentación oral aburrida en un storytelling con conflicto, tensión y resolución: [PEGAR].' },
  { categoria: 'Productividad', prompt: 'Genera 5 preguntas Sócrates para clarificar este problema antes de empezar a resolverlo: [PEGAR PROBLEMA].' },

  // ─── INVESTIGACIÓN Y ANÁLISIS (10) ─────────────────────────────────────────
  { categoria: 'Investigación', prompt: 'Investiga la situación de [TEMA] en [PAÍS LATAM] en 2026. Incluye fuentes verificables y diferencia entre hechos y opiniones.' },
  { categoria: 'Investigación', prompt: 'Identifica los 5 expertos más reconocidos en [CAMPO] en LATAM. Para cada uno: credenciales, publicaciones clave, donde encontrarlos.' },
  { categoria: 'Investigación', prompt: 'Compara las regulaciones de [TEMA] entre Chile, México, Argentina y Colombia. Tabla con similitudes y diferencias clave.' },
  { categoria: 'Investigación', prompt: 'Analiza las tendencias del último año en [INDUSTRIA] en LATAM. Identifica 3 tendencias en crecimiento y 2 en declive.' },
  { categoria: 'Investigación', prompt: 'Genera el análisis de mercado de [PRODUCTO/SERVICIO] en [PAÍS]: tamaño, principales jugadores, gaps, oportunidades.' },
  { categoria: 'Investigación', prompt: 'Identifica los 10 papers más citados (últimos 3 años) sobre [TEMA]. Resume cada uno en 2 oraciones.' },
  { categoria: 'Investigación', prompt: 'Construye un timeline de eventos clave en [TEMA] desde [AÑO] hasta hoy. Identifica los 5 puntos de inflexión.' },
  { categoria: 'Investigación', prompt: 'Analiza este conjunto de datos y dame: estadísticas clave, patrones, outliers, hipótesis a validar: [PEGAR DATOS].' },
  { categoria: 'Investigación', prompt: 'Investiga al perfil de [PERSONA] y dame: background, áreas de expertise, posiciones públicas conocidas, contacto.' },
  { categoria: 'Investigación', prompt: 'Compara los argumentos a favor y en contra de [TEMA CONTROVERSIAL]. Sé equilibrado, cita fuentes de ambos lados.' },

  // ─── COMUNICACIÓN (10) ─────────────────────────────────────────
  { categoria: 'Comunicación', prompt: 'Reescribe este mensaje en 3 tonos distintos: formal, cercano, vendedor. Pega: [MENSAJE].' },
  { categoria: 'Comunicación', prompt: 'Genera el discurso de apertura (3 minutos) para mi evento sobre [TEMA] dirigido a [AUDIENCIA].' },
  { categoria: 'Comunicación', prompt: 'Convierte esta noticia/comunicado en 3 versiones según la plataforma: LinkedIn (profesional), Twitter (gancho), Instagram (visual).' },
  { categoria: 'Comunicación', prompt: 'Redacta el guion para un video de 2 minutos donde explico [CONCEPTO COMPLEJO] a alguien sin background técnico.' },
  { categoria: 'Comunicación', prompt: 'Genera 5 hooks (primeras 2 líneas) virales para un post de LinkedIn sobre [TEMA].' },
  { categoria: 'Comunicación', prompt: 'Mejora mi bio de LinkedIn / Twitter para [OBJETIVO PROFESIONAL]. Versión actual: [PEGAR].' },
  { categoria: 'Comunicación', prompt: 'Genera 10 títulos clickbait pero honestos para mi artículo sobre [TEMA].' },
  { categoria: 'Comunicación', prompt: 'Redacta una nota de agradecimiento personalizada a [PERSONA] por [RAZÓN]. Tono genuino, no zalamero, máximo 150 palabras.' },
  { categoria: 'Comunicación', prompt: 'Convierte esta presentación de slides en un storytelling oral fluido, sin leer literalmente las slides: [PEGAR].' },
  { categoria: 'Comunicación', prompt: 'Genera 5 versiones de un mismo título para A/B testing en redes sociales sobre [TEMA].' },
]

function generatePDF() {
  mkdirSync(join(__dirname, '../public/recursos'), { recursive: true })
  const outputPath = join(__dirname, '../public/recursos/100-prompts-orbbi.pdf')

  const doc = new PDFDocument({ size: 'A4', margins: { top: 60, bottom: 60, left: 60, right: 60 } })
  doc.pipe(createWriteStream(outputPath))

  // PORTADA
  doc.fontSize(48).font('Helvetica-Bold').fillColor('#0F0E0D')
  doc.text('100 Prompts', { align: 'center' })
  doc.moveDown(0.2)
  doc.fontSize(32).font('Helvetica').fillColor('#706D66')
  doc.text('en Español', { align: 'center' })
  doc.moveDown(2)
  doc.fontSize(18).fillColor('#0F0E0D')
  doc.text('Para profesionales de Latinoamérica', { align: 'center' })
  doc.moveDown(8)
  doc.fontSize(14).fillColor('#706D66')
  doc.text('Orbbi · Mentoría 1:1 de IA', { align: 'center' })
  doc.text('orbbilatam.com', { align: 'center', link: 'https://orbbilatam.com' })
  doc.moveDown(2)
  doc.fontSize(11).text(`Edición ${new Date().toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}`, { align: 'center' })

  // INDICE
  doc.addPage()
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#0F0E0D').text('Contenido')
  doc.moveDown(1)
  const categorias = Array.from(new Set(PROMPTS.map(p => p.categoria)))
  doc.fontSize(13).font('Helvetica').fillColor('#0F0E0D')
  for (const cat of categorias) {
    const count = PROMPTS.filter(p => p.categoria === cat).length
    doc.text(`${cat}  (${count} prompts)`, { align: 'left' })
    doc.moveDown(0.3)
  }
  doc.moveDown(2)
  doc.fontSize(10).fillColor('#706D66').text('Cada prompt está diseñado para funcionar en ChatGPT, Claude, Gemini y Perplexity. Reemplaza los campos en MAYÚSCULAS con tu contexto específico.')

  // PROMPTS POR CATEGORÍA
  let currentCat = ''
  let counter = 0
  for (const item of PROMPTS) {
    if (item.categoria !== currentCat) {
      doc.addPage()
      doc.fontSize(28).font('Helvetica-Bold').fillColor('#0F0E0D')
      doc.text(item.categoria)
      doc.moveDown(0.5)
      doc.fontSize(10).fillColor('#706D66').text(`${PROMPTS.filter(p => p.categoria === item.categoria).length} prompts probados por profesionales LATAM`)
      doc.moveDown(1)
      currentCat = item.categoria
    }
    counter++
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#0F0E0D')
    doc.text(`${counter}.`, { continued: true })
    doc.font('Helvetica').fillColor('#1A1916').text(' ' + item.prompt, { align: 'justify' })
    doc.moveDown(0.8)
  }

  // CONTRAPORTADA / CTA
  doc.addPage()
  doc.fontSize(32).font('Helvetica-Bold').fillColor('#0F0E0D')
  doc.text('Aprende a aplicar IA', { align: 'center' })
  doc.fontSize(32).text('a tu trabajo real', { align: 'center' })
  doc.moveDown(2)
  doc.fontSize(14).font('Helvetica').fillColor('#706D66')
  doc.text('Estos prompts son el primer paso. La mentoría 1:1 te enseña a crear los tuyos, aplicados exactamente a tu profesión.', { align: 'center', width: 400, lineGap: 4 })
  doc.moveDown(3)
  doc.fontSize(16).fillColor('#0F0E0D').font('Helvetica-Bold')
  doc.text('Diagnóstico inicial gratis · 30 minutos', { align: 'center' })
  doc.moveDown(0.5)
  doc.fontSize(13).font('Helvetica').fillColor('#0F0E0D')
  doc.text('orbbilatam.com/agendar', { align: 'center', link: 'https://orbbilatam.com/agendar', underline: true })
  doc.moveDown(8)
  doc.fontSize(10).fillColor('#706D66')
  doc.text('© 2026 Orbbi Latam · Mentoría 1:1 de IA para profesionales latinoamericanos', { align: 'center' })

  doc.end()
  console.log(`✓ PDF generado: ${outputPath}`)
  console.log(`✓ Total prompts: ${PROMPTS.length}`)
  console.log(`✓ Categorías: ${categorias.length}`)
}

generatePDF()
