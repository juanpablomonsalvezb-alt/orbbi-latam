import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, getArticle } from '@/lib/articles'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — IA Seniors`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <div className='min-h-screen bg-white'>
      {/* Navbar simple */}
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
            href='/blog'
            className='text-sm text-muted hover:text-navy transition-colors flex items-center gap-1.5'
          >
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path d='M13 8H3M7 4L3 8l4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            Todos los artículos
          </Link>
        </div>
      </nav>

      {/* Hero del artículo */}
      <header className='py-16 lg:py-24' style={{ background: `${article.color}08` }}>
        <div className='max-w-3xl mx-auto px-6 lg:px-10'>
          <div className='flex items-center gap-3 mb-8'>
            <span
              className='text-xs font-medium px-3 py-1.5 rounded-full'
              style={{ background: `${article.color}20`, color: article.color }}
            >
              {article.category}
            </span>
            <span className='text-muted text-sm'>{article.time}</span>
            <span className='text-muted text-sm'>·</span>
            <span className='text-muted text-sm'>{article.date}</span>
          </div>

          <h1 className='font-display text-4xl lg:text-5xl xl:text-6xl font-semibold text-navy leading-tight mb-6'>
            {article.title}
          </h1>
          <p className='text-muted text-xl leading-relaxed'>{article.excerpt}</p>

          <div
            className='mt-12 w-24 h-24 rounded-3xl flex items-center justify-center text-5xl'
            style={{ background: `${article.color}18` }}
          >
            {article.icon}
          </div>
        </div>
      </header>

      {/* Cuerpo del artículo */}
      <article className='py-16 lg:py-24'>
        <div className='max-w-3xl mx-auto px-6 lg:px-10 space-y-8'>
          {article.content.map((section, i) => {
            if (section.type === 'paragraph') {
              return (
                <p key={i} className='text-navy/80 text-lg leading-relaxed'>
                  {section.text}
                </p>
              )
            }
            if (section.type === 'heading') {
              return (
                <h2 key={i} className='font-display text-3xl lg:text-4xl font-semibold text-navy pt-4'>
                  {section.text}
                </h2>
              )
            }
            if (section.type === 'list') {
              return (
                <ul key={i} className='space-y-4'>
                  {section.items?.map((item, j) => (
                    <li key={j} className='flex gap-4 text-navy/80 text-lg leading-relaxed'>
                      <div
                        className='mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0'
                        style={{ background: `${article.color}20` }}
                      >
                        <div className='w-1.5 h-1.5 rounded-full' style={{ background: article.color }} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            if (section.type === 'tip') {
              return (
                <div
                  key={i}
                  className='rounded-2xl p-6 border-l-4'
                  style={{ background: `${article.color}0D`, borderColor: article.color }}
                >
                  <p className='text-navy text-base leading-relaxed'>{section.text}</p>
                </div>
              )
            }
            if (section.type === 'quote') {
              return (
                <blockquote
                  key={i}
                  className='border-l-4 pl-6 py-2'
                  style={{ borderColor: article.color }}
                >
                  <p className='font-display text-2xl text-navy/70 italic leading-snug'>{section.text}</p>
                </blockquote>
              )
            }
            return null
          })}
        </div>
      </article>

      {/* CTA al pie */}
      <section className='py-16 lg:py-24 bg-navy'>
        <div className='max-w-3xl mx-auto px-6 lg:px-10 text-center'>
          <p className='text-gold text-xs tracking-[0.2em] uppercase font-medium mb-5'>Para vos</p>
          <h2 className='font-display text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6'>
            ¿Querés aprender esto con calma y sin apuro?
          </h2>
          <p className='text-white/60 text-lg mb-10 leading-relaxed'>
            En IA Seniors te acompañamos paso a paso, en tu idioma, a tu ritmo.
            La primera sesión es gratuita y dura 30 minutos.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/#reserva'
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-white text-base font-medium rounded-full hover:bg-gold-dark transition-colors duration-300'
            >
              Reservar mi sesión gratis
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </Link>
            <Link
              href='/blog'
              className='inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white text-base font-medium rounded-full hover:border-white/50 transition-colors duration-300'
            >
              Leer más artículos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className='py-8 border-t border-border'>
        <div className='max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <Link href='/' className='font-display font-semibold text-navy'>IA Seniors</Link>
          <p className='text-muted text-sm'>© {new Date().getFullYear()} IA Seniors · Orbilatam</p>
        </div>
      </footer>
    </div>
  )
}
