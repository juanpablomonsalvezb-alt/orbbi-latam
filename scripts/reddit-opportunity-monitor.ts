/**
 * Reddit Opportunity Monitor — 100% GRATIS
 *
 * Usa la API JSON pública de Reddit (sin auth requerida) para detectar:
 * - Posts recientes en subreddits LATAM/IA donde Orbbi podría responder genuinamente
 * - Keywords: "mentor IA", "curso IA", "aprender IA", "ChatGPT abogado", etc.
 *
 * Output: scripts/output/reddit-{date}.md
 *
 * Uso: npx tsx scripts/reddit-opportunity-monitor.ts
 *
 * Nota: respeta rate limits de Reddit (1 req/sec). No es spam — solo alerta para responder manual.
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const SUBREDDITS = [
  'chile',
  'mexico',
  'argentina',
  'colombia',
  'peru',
  'uruguay',
  'ChatGPT',
  'ChatGPTPro',
  'ClaudeAI',
  'OpenAI',
  'singularity',
  'artificial',
  'LearnSpanish',
  'AskLatinAmerica',
  'programacion',
  'devs_es',
  'abogados',
  'medicos_es',
]

const KEYWORDS = [
  'mentor ia',
  'mentor de ia',
  'mentoría ia',
  'mentoria ia',
  'aprender ia',
  'curso ia',
  'curso de ia',
  'chatgpt para abogado',
  'chatgpt para médico',
  'chatgpt para contador',
  'ia para abogado',
  'ia para médico',
  'ia para profesional',
  'prompt engineering',
  'como usar chatgpt',
  'aprender inteligencia artificial',
  'recomendaciones ia',
  'mejor curso ia',
  'consultor ia',
]

type Opportunity = {
  subreddit: string
  title: string
  url: string
  permalink: string
  author: string
  created: string
  matchedKeyword: string
  selftext: string
  score: number
  numComments: number
}

async function fetchSubreddit(sub: string): Promise<Opportunity[]> {
  const url = `https://www.reddit.com/r/${sub}/new.json?limit=50`
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'OrbbiOpportunityMonitor/1.0 (by /u/orbbilatam)' } })
    if (!res.ok) {
      console.log(`  r/${sub}: HTTP ${res.status}`)
      return []
    }
    const data = await res.json()
    const posts = data.data?.children || []
    const opportunities: Opportunity[] = []

    for (const post of posts) {
      const p = post.data
      const text = `${p.title} ${p.selftext || ''}`.toLowerCase()
      for (const kw of KEYWORDS) {
        if (text.includes(kw)) {
          opportunities.push({
            subreddit: sub,
            title: p.title,
            url: p.url,
            permalink: `https://reddit.com${p.permalink}`,
            author: p.author,
            created: new Date(p.created_utc * 1000).toISOString(),
            matchedKeyword: kw,
            selftext: (p.selftext || '').slice(0, 300),
            score: p.score || 0,
            numComments: p.num_comments || 0,
          })
          break
        }
      }
    }
    return opportunities
  } catch (e: any) {
    console.log(`  r/${sub}: error ${e.message}`)
    return []
  }
}

async function main() {
  console.log(`[Reddit Monitor] ${SUBREDDITS.length} subreddits × ${KEYWORDS.length} keywords\n`)

  const all: Opportunity[] = []
  for (const sub of SUBREDDITS) {
    process.stdout.write(`→ r/${sub} `)
    const opps = await fetchSubreddit(sub)
    if (opps.length > 0) {
      console.log(`✓ ${opps.length} oportunidades`)
      all.push(...opps)
    } else {
      console.log(`(0)`)
    }
    await new Promise(r => setTimeout(r, 1200)) // rate limit
  }

  // Dedup
  const seen = new Set<string>()
  const unique = all.filter(o => {
    if (seen.has(o.permalink)) return false
    seen.add(o.permalink)
    return true
  })

  // Sort by recency
  unique.sort((a, b) => b.created.localeCompare(a.created))

  // Report
  mkdirSync(join(__dirname, 'output'), { recursive: true })
  const date = new Date().toISOString().slice(0, 10)
  const reportPath = join(__dirname, `output/reddit-${date}.md`)

  let report = `# Reddit Opportunity Monitor — ${date}\n\n`
  report += `**Total oportunidades detectadas:** ${unique.length}\n\n`
  report += `> Estas son menciones recientes en Reddit donde Orbbi podría responder genuinamente.\n`
  report += `> NO hacer spam. Responder solo cuando aportas valor real (no autopromoción).\n\n`
  report += '---\n\n'

  for (const o of unique) {
    report += `## ${o.title}\n\n`
    report += `- **Subreddit:** r/${o.subreddit}\n`
    report += `- **Autor:** /u/${o.author}\n`
    report += `- **Fecha:** ${o.created}\n`
    report += `- **Keyword matchada:** "${o.matchedKeyword}"\n`
    report += `- **Score / Comentarios:** ${o.score} / ${o.numComments}\n`
    report += `- **Link:** ${o.permalink}\n`
    if (o.selftext) report += `- **Texto:** ${o.selftext}...\n`
    report += `\n`
  }

  writeFileSync(reportPath, report)
  console.log(`\n✓ Reporte: ${reportPath}`)
  console.log(`✓ ${unique.length} oportunidades únicas`)
}

main().catch(console.error)
