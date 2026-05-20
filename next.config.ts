import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Inyectar env vars en build time (bypass del problema de runtime env vars en Vercel)
  env: {
    BUILD_MP_TOKEN: process.env.MP_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    BUILD_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://orbbilatam.com',
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'orbbi-latam.vercel.app' }],
        destination: 'https://orbbilatam.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
