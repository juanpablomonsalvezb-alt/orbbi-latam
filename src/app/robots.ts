import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'GoogleOther',
    'Applebot-Extended',
    'Bingbot',
    'CCBot',
    'cohere-ai',
    'YouBot',
    'Meta-ExternalAgent',
    'Bytespider',
    'DuckAssistBot',
  ]
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/pago/', '/tu-plan'] },
      ...aiBots.map(bot => ({ userAgent: bot, allow: '/' })),
    ],
    sitemap: 'https://orbbilatam.com/sitemap.xml',
    host: 'https://orbbilatam.com',
  }
}
