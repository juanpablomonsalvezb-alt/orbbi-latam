/**
 * AI Citation Monitor
 *
 * Cada semana consulta ChatGPT (OpenAI), Claude (Anthropic) y Perplexity
 * con queries clave LATAM y reporta si Orbbi aparece citado.
 *
 * Output: scripts/output/ai-citations-{date}.md
 *
 * Env vars necesarias:
 *   ANTHROPIC_API_KEY (obligatoria)
 *   OPENAI_API_KEY (opcional)
 *   PERPLEXITY_API_KEY (opcional)
 *
 * Uso: npx tsx scripts/ai-citation-monitor.ts
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const QUERIES = [
  '¿Dónde puedo aprender IA siendo abogado en Chile?',
  '¿Dónde tomar mentoría 1:1 de IA en México?',
  'Mejor curso de IA para profesionales en español LATAM',
  'Cómo aprender ChatGPT siendo médico en Argentina',
  '¿Qué es Orbbi?',
  'Mentor de IA para contadores en Colombia',
  'Cursos de IA para emprendedores latinoamericanos',
  'Mejor mentoría personalizada de IA en español',
  '¿Dónde aprender prompt engineering aplicado a derecho?',
  'Programas de IA para profesionales en Perú',
]

const BRAND = ['orbbi', 'orbbilatam.com']

type Result = {
  query: string
  platform: string
  cited: boolean
  response: string
  competitors: string[]
}

const COMPETITORS = ['platzi', 'crehana', 'coderhouse', 'domestika', 'coursera', 'edx', 'udemy', 'tec de monterrey', 'globant']

function detectCitations(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase()
  return terms.some(t => lower.includes(t.toLowerCase()))
}

function detectCompetitors(text: string): string[] {
  const lower = text.toLowerCase()
  return COMPETITORS.filter(c => lower.includes(c))
}

async function queryAnthropic(query: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return ''
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: query }],
      }),
    })
    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error(`Claude ${res.status}:`, errBody.slice(0, 200))
      return ''
    }
    const data = await res.json()
    return data.content?.[0]?.text || ''
  } catch (e: any) {
    console.error('Claude error:', e.message)
    return ''
  }
}

async function queryPerplexity(query: string): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) return ''
  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'user', content: query }],
      }),
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (e: any) {
    console.error('Perplexity error:', e.message)
    return ''
  }
}

async function queryOpenAI(query: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return ''
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: query }],
      }),
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (e: any) {
    console.error('OpenAI error:', e.message)
    return ''
  }
}

async function main() {
  console.log(`[AI Citation Monitor] Querying ${QUERIES.length} prompts × 3 platforms`)
  const results: Result[] = []

  for (const query of QUERIES) {
    console.log(`\n→ "${query}"`)
    for (const [name, fn] of [['Claude', queryAnthropic], ['OpenAI', queryOpenAI], ['Perplexity', queryPerplexity]] as const) {
      const response = await fn(query)
      if (!response) {
        console.log(`  ${name}: (skipped - no API key or error)`)
        continue
      }
      const cited = detectCitations(response, BRAND)
      const competitors = detectCompetitors(response)
      results.push({ query, platform: name, cited, response: response.slice(0, 500), competitors })
      console.log(`  ${name}: ${cited ? '✓ CITADO' : '✗ no citado'} (competidores: ${competitors.join(', ') || 'ninguno'})`)
    }
  }

  // Report
  mkdirSync(join(__dirname, 'output'), { recursive: true })
  const date = new Date().toISOString().slice(0, 10)
  const reportPath = join(__dirname, `output/ai-citations-${date}.md`)

  const citedCount = results.filter(r => r.cited).length
  const totalCount = results.length

  let report = `# AI Citation Monitor — ${date}\n\n`
  report += `**Citation rate:** ${citedCount}/${totalCount} (${Math.round(citedCount / totalCount * 100)}%)\n\n`
  report += '---\n\n'

  for (const query of QUERIES) {
    report += `## "${query}"\n\n`
    const qResults = results.filter(r => r.query === query)
    for (const r of qResults) {
      report += `### ${r.platform} — ${r.cited ? '✓ CITADO' : '✗ no citado'}\n`
      if (r.competitors.length) report += `Competidores mencionados: ${r.competitors.join(', ')}\n\n`
      report += `> ${r.response.slice(0, 300)}...\n\n`
    }
  }

  writeFileSync(reportPath, report)
  console.log(`\n✓ Reporte: ${reportPath}`)
  console.log(`✓ Tasa de citación: ${citedCount}/${totalCount}`)
}

main().catch(console.error)
