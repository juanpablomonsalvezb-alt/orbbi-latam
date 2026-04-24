import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata = {
  title: 'Blog — IA Seniors',
  description: 'Artículos para aprender sobre inteligencia artificial de forma práctica, sencilla y sin apuro.',
}

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navbar */}
      <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border'>
        <div className='max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold'
              style={{ background: '#C9A96E' }}
            >
              IA
            </div>
            <span className='font-display font-semibold text-navy text-lg'>IA Seniors</span>
          </Link>
          <Link
            href='/#reserva'
            className='text-sm font-medium px-5 py-2.5 bg-gold text-white rounded-full hover:bg-gold-dark transition-colors'
          >
            Reservá tu sesión gratis
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className='py-20 lg:py-28 bg-warm'>
        <div className='max-w-7xl mx-auto px-6 lg:px-10'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='h-px w-10 bg-gold' />
            <span className='text-gold text-xs tracking-[0.2em] uppercase font-medium'>A tu ritmo</span>
          </div>
          <h1 className='font-display text-5xl lg:text-7xl font-semibold text-navy leading-tight mb-6'>
            Artículos para aprender<br className='hidden lg:block' /> sin apuro
          </h1>
          <p className='text-muted text-xl leading-relaxed max-w-2xl'>
            Notas cortas, prácticas y escritas para personas como vos. Sin tecnicismos,
            sin prisa. Cada una explica una cosa concreta que podés usar hoy mismo.
          </p>
        </div>
      </header>

      {/* Grid de artículos */}
      <main className='py-20 lg:py-28'>
        <div className='max-w-7xl mx-auto px-6 lg:px-10'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.map((art) => (
              <Link
                key={art.slug}
                href={`/blog/${art.slug}`}
                className='group bg-white rounded-2xl overflow-hidden border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 flex flex-col'
              >
                {/* Card top */}
                <div
                  className='h-44 flex items-center justify-center text-6xl relative overflow-hidden'
                  style={{ background: `${art.color}12` }}
                >
                  <span className='group-hover:scale-110 transition-transform duration-300 block'>
                    {art.icon}
                  </span>
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300'
                    style={{ background: art.color }}
                  />
                </div>

                <div className='p-7 flex flex-col flex-1'>
                  {/* Meta */}
                  <div className='flex items-center gap-3 mb-4'>
                    <span
                      className='text-xs font-medium px-3 py-1 rounded-full'
                      style={{ background: `${art.color}15`, color: art.color }}
                    >
                      {art.category}
                    </span>
                    <span className='text-muted text-xs'>{art.time}</span>
                  </div>

                  <h2 className='font-display text-xl font-semibold text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-300 flex-1'>
                    {art.title}
                  </h2>
                  <p className='text-muted text-sm leading-relaxed mb-6'>{art.excerpt}</p>

                  <span
                    className='inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200'
                    style={{ color: art.color }}
                  >
                    Leer artículo
                    <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                      <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className='py-16 bg-warm border-t border-border'>
        <div className='max-w-3xl mx-auto px-6 lg:px-10 text-center'>
          <h2 className='font-display text-3xl lg:text-4xl font-semibold text-navy mb-4'>
            ¿Querés aprender con acompañamiento?
          </h2>
          <p className='text-muted text-lg mb-8 leading-relaxed'>
            Los artículos son un buen comienzo. Pero si querés aprender de verdad, nada como
            una sesión personalizada con uno de nuestros guías.
          </p>
          <Link
            href='/#reserva'
            className='inline-flex items-center gap-2 px-8 py-4 bg-gold text-white text-base font-medium rounded-full hover:bg-gold-dark transition-colors duration-300'
          >
            Reservar sesión gratuita
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-border'>
        <div className='max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <Link href='/' className='font-display font-semibold text-navy'>IA Seniors</Link>
          <p className='text-muted text-sm'>© {new Date().getFullYear()} IA Seniors · Orbilatam</p>
        </div>
      </footer>
    </div>
  )
}
