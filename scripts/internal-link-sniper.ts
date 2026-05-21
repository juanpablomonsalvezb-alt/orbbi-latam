/**
 * Internal Link Sniper
 *
 * Analiza todos los artículos del cluster blog y detecta menciones de keywords
 * que matchean OTROS artículos. Sugiere links internos para mejorar SEO interno.
 *
 * Output: scripts/output/internal-links-report.md
 *
 * Uso: npx tsx scripts/internal-link-sniper.ts
 */

import { ARTICLES } from '../src/lib/seo/articles'
import { PROFESIONES } from '../src/lib/seo/data'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

type Suggestion = {
  source: string       // slug del artículo source
  target: string       // slug del artículo a linkear
  keyword: string      // palabra/frase que dispara el match
  context: string      // contexto de la mención
  type: 'blog' | 'landing'
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[áéíóúñ]/g, c => ({ á:'a', é:'e', í:'i', ó:'o', ú:'u', ñ:'n' }[c] || c))
}

function findMentions(text: string, keyword: string): string[] {
  const normText = normalize(text)
  const normKw = normalize(keyword)
  const idx = normText.indexOf(normKw)
  if (idx < 0) return []
  const start = Math.max(0, idx - 60)
  const end = Math.min(text.length, idx + keyword.length + 60)
  return [`…${text.slice(start, end)}…`]
}

function main() {
  const suggestions: Suggestion[] = []

  for (const source of ARTICLES) {
    const allText = [
      source.intro,
      source.respuestaDirecta,
      ...source.secciones.map(s => `${s.titulo} ${s.contenido}`),
      ...source.faqs.map(f => `${f.q} ${f.a}`),
    ].join(' ')

    // 1. Buscar menciones de TÍTULOS de otros artículos
    for (const target of ARTICLES) {
      if (target.slug === source.slug) continue
      if (source.relacionados.includes(target.slug)) continue // ya linkeado

      // Buscar por keywords del target
      for (const kw of target.keywords) {
        const contexts = findMentions(allText, kw)
        if (contexts.length > 0) {
          suggestions.push({
            source: source.slug,
            target: target.slug,
            keyword: kw,
            context: contexts[0],
            type: 'blog',
          })
          break // un match por target ya es suficiente
        }
      }
    }

    // 2. Buscar menciones de profesiones → linkear a /ia-para/{prof}
    for (const prof of PROFESIONES) {
      const variants = [prof.nombre.toLowerCase(), prof.pluralMasc, prof.pluralFem]
      for (const v of variants) {
        const contexts = findMentions(allText, v)
        if (contexts.length > 0 && source.ctaProfesion !== prof.slug) {
          suggestions.push({
            source: source.slug,
            target: `/ia-para/${prof.slug}`,
            keyword: v,
            context: contexts[0],
            type: 'landing',
          })
          break
        }
      }
    }
  }

  // Output report
  mkdirSync(join(__dirname, 'output'), { recursive: true })
  const reportPath = join(__dirname, 'output/internal-links-report.md')

  let report = '# Internal Link Sniper Report\n\n'
  report += `Generado: ${new Date().toISOString()}\n`
  report += `Total sugerencias: ${suggestions.length}\n\n`
  report += '---\n\n'

  // Agrupar por source
  const bySrc = new Map<string, Suggestion[]>()
  for (const s of suggestions) {
    if (!bySrc.has(s.source)) bySrc.set(s.source, [])
    bySrc.get(s.source)!.push(s)
  }

  for (const [src, sugs] of bySrc) {
    report += `## /blog/${src}\n\n`
    for (const s of sugs) {
      const targetUrl = s.type === 'landing' ? s.target : `/blog/${s.target}`
      report += `- **Linkear a** \`${targetUrl}\`\n`
      report += `  - Keyword: "${s.keyword}"\n`
      report += `  - Contexto: ${s.context}\n\n`
    }
  }

  writeFileSync(reportPath, report)
  console.log(`✓ Report generado: ${reportPath}`)
  console.log(`✓ Total sugerencias: ${suggestions.length}`)
  console.log(`✓ Artículos con sugerencias: ${bySrc.size}/${ARTICLES.length}`)
  console.log(`\nTop 5 artículos con más sugerencias:`)
  Array.from(bySrc.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5)
    .forEach(([slug, sugs]) => console.log(`  ${slug}: ${sugs.length} sugerencias`))
}

main()
