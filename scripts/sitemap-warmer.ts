/**
 * Sitemap Warmer + IndexNow re-submit
 *
 * Hace HEAD/GET request a todas las URLs del sitemap para:
 * 1. Mantener cache CDN de Vercel caliente
 * 2. Forzar regeneración de ISR si caducó
 * 3. Re-notificar a IndexNow para que Bing/Yandex re-crawleen
 *
 * Uso: npx tsx scripts/sitemap-warmer.ts
 */

import { PROFESIONES, PAISES, BASE_URL } from '../src/lib/seo/data'
import { ARTICLES } from '../src/lib/seo/articles'

const INDEXNOW_KEY = '532cdbb074f00984ba7a9d42c9b5bb63'

function generateUrls(): string[] {
  const urls: string[] = [
    `${BASE_URL}/`,
    `${BASE_URL}/agendar`,
    `${BASE_URL}/tu-plan`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/privacidad`,
    `${BASE_URL}/terminos`,
  ]
  PROFESIONES.forEach(p => {
    urls.push(`${BASE_URL}/ia-para/${p.slug}`)
    PAISES.forEach(c => urls.push(`${BASE_URL}/ia-para/${p.slug}-${c.slug}`))
  })
  ARTICLES.forEach(a => urls.push(`${BASE_URL}/blog/${a.slug}`))
  return urls
}

async function warm(url: string): Promise<{ status: number; ms: number }> {
  const start = Date.now()
  try {
    const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'OrbbiSitemapWarmer/1.0' } })
    return { status: res.status, ms: Date.now() - start }
  } catch {
    return { status: 0, ms: Date.now() - start }
  }
}

async function pingIndexNow(urls: string[]) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'orbbilatam.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
  console.log(`[IndexNow] HTTP ${res.status}`)
}

async function main() {
  const urls = generateUrls()
  console.log(`[Warmer] ${urls.length} URLs · concurrency 5`)

  const results: { url: string; status: number; ms: number }[] = []
  // Concurrency limit
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5)
    const batchResults = await Promise.all(batch.map(async u => ({ url: u, ...(await warm(u)) })))
    results.push(...batchResults)
    process.stdout.write(`\r[Warmer] ${results.length}/${urls.length}`)
  }
  console.log('')

  const ok = results.filter(r => r.status === 200).length
  const errors = results.filter(r => r.status !== 200)
  const avgMs = Math.round(results.reduce((acc, r) => acc + r.ms, 0) / results.length)

  console.log(`\n✓ Warmed: ${ok}/${urls.length} (avg ${avgMs}ms)`)
  if (errors.length) {
    console.log(`✗ Errors:`)
    errors.forEach(e => console.log(`  ${e.status} ${e.url}`))
  }

  console.log(`\n[Warmer] Re-submit IndexNow…`)
  await pingIndexNow(urls)

  console.log(`\n✓ Done.`)
}

main().catch(console.error)
