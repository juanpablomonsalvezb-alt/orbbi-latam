import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
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
