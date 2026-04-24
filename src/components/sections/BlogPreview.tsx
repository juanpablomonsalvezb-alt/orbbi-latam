'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export default function BlogPreview() {
  return (
    <section id='blog' className='py-24 lg:py-32 bg-warm'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16'
        >
          <div>
            <div className='flex items-center gap-3 mb-5'>
              <div className='h-px w-10 bg-gold' />
              <span className='text-gold text-xs tracking-[0.2em] uppercase font-medium'>A tu ritmo</span>
            </div>
            <h2 className='font-display text-5xl lg:text-6xl font-semibold text-navy leading-tight'>
              Artículos para aprender<br />sin apuro
            </h2>
          </div>
          <p className='text-muted text-lg max-w-sm leading-relaxed'>
            Notas cortas, prácticas y escritas para personas como vos. Sin tecnicismos,
            sin prisa. Cada una explica una cosa concreta que podés usar hoy mismo.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((art, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className='group bg-white rounded-2xl overflow-hidden border border-border hover:border-transparent hover:shadow-xl transition-all duration-400'
            >
            <Link href={`/blog/${art.slug}`} className='block h-full'>
              {/* Card top */}
              <div
                className='h-40 flex items-center justify-center text-5xl relative overflow-hidden'
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

              <div className='p-7'>
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

                <h3 className='font-display text-xl font-semibold text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-300'>
                  {art.title}
                </h3>
                <p className='text-muted text-sm leading-relaxed mb-5'>{art.excerpt}</p>

                <span
                  className='inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover-line'
                  style={{ color: art.color }}
                >
                  Leer artículo
                  <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                    <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </span>
              </div>
            </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className='mt-12 text-center'
        >
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 px-8 py-4 border border-border text-navy text-base font-medium rounded-full hover:border-gold hover:text-gold transition-colors duration-300'
          >
            Ver todos los artículos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
