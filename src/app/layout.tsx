import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/providers/SmoothScroll'

export const metadata: Metadata = {
  title: 'Orbbi Latam — Inteligencia Artificial para profesionales de 45 a 60 años',
  description: 'Consultora de IA diseñada para profesionales de 45 a 60 años en Latinoamérica. Sin tecnicismos. Con resultados reales en tu trabajo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
