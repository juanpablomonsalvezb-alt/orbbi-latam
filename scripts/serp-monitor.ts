/**
 * SERP Monitor — 100% GRATIS
 *
 * Scrapea Google y Bing con Playwright (sin API key) y mide:
 * - Si orbbilatam.com aparece en los primeros 30 resultados para 12 queries clave LATAM
 * - Posición exacta del ranking
 * - Qué competidores aparecen
 *
 * Output: scripts/output/serp-{date}.md
 *
 * Uso: npx tsx scripts/serp-monitor.ts
 *
 * Dependencias: playwright (free)
 *   npm install -D playwright
 *   npx playwright install chromium
 */

import { chromium, type Page } from 'playwright'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const QUERIES = [
  'mentoria 1:1 inteligencia artificial profesionales',
  'mentor ia chile',
  'ia para abogados latinoamerica',
  'ia para medicos latinoamerica',
  'aprender chatgpt profesional',
  'curso ia para abogados',
  'mentoria ia chatgpt español',
  'capacitacion ia profesionales chile',
  'ia para contadores mexico',
  'prompt engineering para abogados',
  'aprender ia desde cero español',
  'mentor ia personalizado',
]

const DOMAIN = 'orbbilatam.com'
const COMPETITORS = ['platzi.com', 'crehana.com', 'coderhouse.com', 'domestika.org', 'coursera.org', 'udemy.com', 'edx.org', 'tec.mx']

type SearchResult = {
  query: string
  engine: 'google' | 'bing'
  position: number | null
  totalResults: number
  competitorsTop10: string[]
  url: string | null
}

async function searchGoogle(page: Page, query: string): Promise<SearchResult> {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=es&num=30`
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(1500)

  const results = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('div.g a[href], div[data-snc] a[href]'))
    return items.map(a => (a as HTMLAnchorElement).href).filter(h => h.startsWith('http'))
  })

  let position: number | null = null
  let foundUrl: string | null = null
  const competitorsTop10: string[] = []

  for (let i = 0; i < results.length; i++) {
    const url = results[i]
    if (url.includes(DOMAIN) && position === null) {
      position = i + 1
      foundUrl = url
    }
    if (i < 10) {
      for (const comp of COMPETITORS) {
        if (url.includes(comp) && !competitorsTop10.includes(comp)) {
          competitorsTop10.push(comp)
        }
      }
    }
  }

  return { query, engine: 'google', position, totalResults: results.length, competitorsTop10, url: foundUrl }
}

async function searchBing(page: Page, query: string): Promise<SearchResult> {
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}&setlang=es&cc=cl`
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(1500)

  const results = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('li.b_algo h2 a, ol#b_results li a'))
    return items.map(a => (a as HTMLAnchorElement).href).filter(h => h.startsWith('http'))
  })

  let position: number | null = null
  let foundUrl: string | null = null
  const competitorsTop10: string[] = []

  for (let i = 0; i < results.length; i++) {
    const url = results[i]
    if (url.includes(DOMAIN) && position === null) {
      position = i + 1
      foundUrl = url
    }
    if (i < 10) {
      for (const comp of COMPETITORS) {
        if (url.includes(comp) && !competitorsTop10.includes(comp)) {
          competitorsTop10.push(comp)
        }
      }
    }
  }

  return { query, engine: 'bing', position, totalResults: results.length, competitorsTop10, url: foundUrl }
}

async function main() {
  console.log(`[SERP Monitor] ${QUERIES.length} queries × 2 engines (Google + Bing)\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    locale: 'es-CL',
  })
  const page = await context.newPage()

  const results: SearchResult[] = []

  for (const q of QUERIES) {
    console.log(`→ "${q}"`)
    try {
      const g = await searchGoogle(page, q)
      results.push(g)
      console.log(`  Google: ${g.position ? `#${g.position}` : '✗ no top 30'} (${g.totalResults} results, comp: ${g.competitorsTop10.join(', ') || 'ninguno'})`)
    } catch (e: any) {
      console.log(`  Google: error ${e.message}`)
    }
    await page.waitForTimeout(2000)
    try {
      const b = await searchBing(page, q)
      results.push(b)
      console.log(`  Bing:   ${b.position ? `#${b.position}` : '✗ no top 30'} (${b.totalResults} results, comp: ${b.competitorsTop10.join(', ') || 'ninguno'})`)
    } catch (e: any) {
      console.log(`  Bing: error ${e.message}`)
    }
    await page.waitForTimeout(2000)
  }

  await browser.close()

  // Report
  mkdirSync(join(__dirname, 'output'), { recursive: true })
  const date = new Date().toISOString().slice(0, 10)
  const reportPath = join(__dirname, `output/serp-${date}.md`)

  const ranking = results.filter(r => r.position !== null).length
  const top10 = results.filter(r => r.position !== null && r.position <= 10).length
  const top3 = results.filter(r => r.position !== null && r.position <= 3).length

  let report = `# SERP Monitor — ${date}\n\n`
  report += `**Métricas:**\n`
  report += `- Apariciones en top 30: ${ranking}/${results.length} (${Math.round(ranking / results.length * 100)}%)\n`
  report += `- Apariciones en top 10: ${top10}/${results.length}\n`
  report += `- Apariciones en top 3: ${top3}/${results.length}\n\n`
  report += '---\n\n'

  for (const q of QUERIES) {
    report += `## "${q}"\n\n`
    const g = results.find(r => r.query === q && r.engine === 'google')
    const b = results.find(r => r.query === q && r.engine === 'bing')
    if (g) {
      report += `**Google:** ${g.position ? `posición #${g.position}` : '✗ no top 30'}\n`
      if (g.competitorsTop10.length) report += `  Competidores top 10: ${g.competitorsTop10.join(', ')}\n`
    }
    if (b) {
      report += `**Bing:** ${b.position ? `posición #${b.position}` : '✗ no top 30'}\n`
      if (b.competitorsTop10.length) report += `  Competidores top 10: ${b.competitorsTop10.join(', ')}\n`
    }
    report += '\n'
  }

  writeFileSync(reportPath, report)
  console.log(`\n✓ Reporte: ${reportPath}`)
  console.log(`✓ Apariciones: ${ranking}/${results.length}`)
}

main().catch(console.error)
