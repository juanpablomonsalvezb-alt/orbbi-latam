/**
 * Submit todas las URLs del sitio a IndexNow (Bing, Yandex, DuckDuckGo, Seznam).
 * Endpoint protocolo IndexNow: https://www.indexnow.org/
 *
 * Uso: npx tsx scripts/indexnow-submit.ts
 */

const KEY = '532cdbb074f00984ba7a9d42c9b5bb63'
const HOST = 'orbbilatam.com'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

// Importar data programática
import { PROFESIONES, PAISES, BASE_URL } from '../src/lib/seo/data'
import { ARTICLES } from '../src/lib/seo/articles'

function generarUrls(): string[] {
  const urls: string[] = [
    `${BASE_URL}/`,
    `${BASE_URL}/agendar`,
    `${BASE_URL}/tu-plan`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/privacidad`,
    `${BASE_URL}/terminos`,
  ]

  // Landing profesión + país
  PROFESIONES.forEach(p => {
    urls.push(`${BASE_URL}/ia-para/${p.slug}`)
    PAISES.forEach(c => {
      urls.push(`${BASE_URL}/ia-para/${p.slug}-${c.slug}`)
    })
  })

  // Blog articles
  ARTICLES.forEach(a => {
    urls.push(`${BASE_URL}/blog/${a.slug}`)
  })

  return urls
}

async function submitToIndexNow(urls: string[]) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: urls,
  }

  console.log(`[IndexNow] Submitting ${urls.length} URLs to ${ENDPOINT}`)
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (res.ok || res.status === 202) {
    console.log(`[IndexNow] ✓ Success: ${res.status} ${res.statusText}`)
  } else {
    const text = await res.text().catch(() => '(no body)')
    console.error(`[IndexNow] ✗ Failed: ${res.status} ${res.statusText}\n${text}`)
  }
}

async function main() {
  const urls = generarUrls()
  console.log(`[IndexNow] Generated ${urls.length} URLs`)
  console.log('[IndexNow] Sample:', urls.slice(0, 5))
  await submitToIndexNow(urls)
}

main().catch(console.error)
