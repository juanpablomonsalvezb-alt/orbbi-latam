/**
 * Hacker News Opportunity Monitor — 100% GRATIS
 *
 * Usa Algolia HN Search API (sin auth, sin rate limits estrictos).
 * Detecta posts y comentarios recientes con keywords LATAM/IA donde Orbbi
 * podría participar.
 *
 * Output: scripts/output/hn-{date}.md
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const QUERIES = [
  'AI mentor latin america',
  'ChatGPT for lawyers',
  'AI for doctors latam',
  'learn AI spanish',
  'AI mentoring program',
  'IA español profesionales',
  'prompt engineering professionals',
  'AI training latin america',
]

type HNHit = {
  objectID: string
  title?: string
  url?: string
  story_text?: string
  comment_text?: string
  author: string
  created_at: string
  points?: number
  num_comments?: number
  query: string
}

async function search(query: string): Promise<HNHit[]> {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=(story,comment)&hitsPerPage=20`
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.hits || []).map((h: any) => ({ ...h, query }))
  } catch {
    return []
  }
}

async function main() {
  console.log(`[HN Monitor] ${QUERIES.length} queries\n`)

  const all: HNHit[] = []
  for (const q of QUERIES) {
    process.stdout.write(`→ "${q}" `)
    const hits = await search(q)
    console.log(`${hits.length} hits`)
    all.push(...hits)
    await new Promise(r => setTimeout(r, 500))
  }

  // Dedup
  const seen = new Set<string>()
  const unique = all.filter(h => {
    if (seen.has(h.objectID)) return false
    seen.add(h.objectID)
    return true
  })

  // Filter: last 90 days
  const cutoff = Date.now() - 90 * 86400 * 1000
  const recent = unique.filter(h => new Date(h.created_at).getTime() > cutoff)
  recent.sort((a, b) => b.created_at.localeCompare(a.created_at))

  // Report
  mkdirSync(join(__dirname, 'output'), { recursive: true })
  const date = new Date().toISOString().slice(0, 10)
  const reportPath = join(__dirname, `output/hn-${date}.md`)

  let report = `# Hacker News Monitor — ${date}\n\n`
  report += `**Hits últimos 90 días:** ${recent.length}\n\n`
  report += '---\n\n'

  for (const h of recent.slice(0, 30)) {
    const itemUrl = `https://news.ycombinator.com/item?id=${h.objectID}`
    report += `## ${h.title || (h.comment_text || '').slice(0, 80) + '...'}\n\n`
    report += `- **Tipo:** ${h.title ? 'story' : 'comment'}\n`
    report += `- **Autor:** ${h.author}\n`
    report += `- **Fecha:** ${h.created_at}\n`
    report += `- **Query matchada:** "${h.query}"\n`
    if (h.points) report += `- **Puntos:** ${h.points}\n`
    if (h.num_comments) report += `- **Comentarios:** ${h.num_comments}\n`
    report += `- **HN:** ${itemUrl}\n`
    if (h.url) report += `- **URL externa:** ${h.url}\n`
    if (h.story_text) report += `- **Texto:** ${h.story_text.slice(0, 200)}...\n`
    if (h.comment_text) report += `- **Comentario:** ${h.comment_text.slice(0, 200)}...\n`
    report += `\n`
  }

  writeFileSync(reportPath, report)
  console.log(`\n✓ Reporte: ${reportPath}`)
  console.log(`✓ ${recent.length} hits relevantes (90d)`)
}

main().catch(console.error)
