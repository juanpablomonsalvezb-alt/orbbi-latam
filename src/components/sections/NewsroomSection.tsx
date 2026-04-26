'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

type NewsCard = {
  category: string
  date: string
  title: string
  image?: string
  bg?: string
  href?: string
}

const CARDS: NewsCard[] = [
  {
    category: 'Inteligencia Artificial',
    date: 'Mar 14, 2026',
    title: 'Cómo un contador de 52 años automatizó 3 horas de trabajo diario con una sola herramienta de IA',
    image: '/images/data.png',
  },
  {
    category: 'IA para Profesionales',
    date: 'Feb 28, 2026',
    title: 'ChatGPT para abogados: guía práctica para profesionales sin conocimientos técnicos',
    bg: 'bg-green',
  },
  {
    category: 'Brecha Digital',
    date: 'Jan 15, 2026',
    title: 'Por qué los profesionales con más experiencia aprenden IA más rápido de lo que creen',
    image: '/images/criminal.jpg',
  },
  {
    category: 'Caso Real',
    date: 'Apr 10, 2026',
    title: "De no saber qué era ChatGPT a usarlo para gestionar mi facultad entera",
    image: '/images/gender2.png',
  },
  {
    category: 'Reflexión',
    date: 'Mar 22, 2026',
    title: 'La IA no vino a reemplazarte. Pero sí va a reemplazar a quienes no sepan usarla.',
    image: '/images/pay-equity.jpg',
  },
]

function NewsCard({ card }: { card: NewsCard }) {
  return (
    <a
      href={card.href || 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/'}
      target="_blank"
      rel="noreferrer"
      className="group block relative overflow-hidden rounded-[1.6rem] min-h-[38rem] s:min-h-[44rem] flex-shrink-0 w-[28rem] s:w-[36rem] cursor-pointer"
    >
      {card.image ? (
        <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className={`absolute inset-0 ${card.bg || 'bg-grey-taupe'}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative h-full flex flex-col justify-between p-24">
        <div className="flex items-start justify-between">
          <span className="text-white text-11 uppercase tracking-[0.12rem] bg-white/20 backdrop-blur-sm rounded-[10rem] px-12 py-5">
            {card.category}
          </span>
          <span className="text-white/60 text-11">{card.date}</span>
        </div>
        <div className="flex items-end justify-between gap-16">
          <h3 className="text-white text-16 s:text-18 font-normal leading-[1.3]" style={{ fontFamily: '"disp", Georgia, serif' }}>
            {card.title}
          </h3>
          <span className="flex-shrink-0 w-32 h-32 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:bg-white group-hover:text-green transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-12 h-12">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
}

export default function NewsroomSection() {
  const [current, setCurrent] = useState(0)
  const total = CARDS.length
  const visible = 3

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(total - visible, c + 1)), [total, visible])

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c >= total - visible ? 0 : c + 1)), 4000)
    return () => clearInterval(id)
  }, [total, visible])

  const offset = current * (36 * 10 + 25)

  return (
    <section className="bg-white-smoke overflow-hidden">
      <div className="site-max py-80 s:py-120">
        {/* Header */}
        <div className="site-grid mb-40 s:mb-60">
          <div className="col-span-full s:col-span-10 mb-24 s:mb-0">
            <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-12">Blog</p>
            <h2
              className="text-32 s:text-48 font-normal text-green leading-[1.1]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              La IA no vino a reemplazarte. Vino a multiplicarte.
            </h2>
          </div>
          <div className="col-span-full s:col-start-12 s:col-span-5 flex items-end justify-between s:justify-end gap-16">
            <div className="flex gap-0">
              <button
                onClick={prev}
                disabled={current === 0}
                className="flex items-center justify-center w-45 h-45 border border-grey-taupe hover:bg-grey-taupe/20 disabled:opacity-30 transition-colors"
              >
                <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M5.75 10L1.25 5.5L5.75 1" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={next}
                disabled={current >= total - visible}
                className="flex items-center justify-center w-45 h-45 border border-grey-taupe -ml-px hover:bg-grey-taupe/20 disabled:opacity-30 transition-colors"
              >
                <svg className="w-7" viewBox="0 0 7 11" fill="none"><path d="M1.25 1L5.75 5.5L1.25 10" stroke="#1E383E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <a
              href="https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/"
              target="_blank"
              rel="noreferrer"
              className="text-12 uppercase tracking-[0.12rem] font-medium text-green ulink"
            >
              Ver en LinkedIn
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-25 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * (360 + 25)}px)` }}
          >
            {CARDS.map((card, i) => (
              <NewsCard key={i} card={card} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-6 mt-32">
          {Array.from({ length: total - visible + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? '3.2rem' : '0.8rem',
                height: '2px',
                backgroundColor: current === i ? '#1E383E' : '#DEDAD3',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
              aria-label={`Noticia ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
