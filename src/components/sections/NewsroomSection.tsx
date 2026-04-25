'use client'

import { useState } from 'react'
import Image from 'next/image'

type NewsCard = {
  category: string
  date: string
  title: string
  image?: string
  bg?: string
}

const tabs: { id: string; label: string; cards: NewsCard[] }[] = [
  {
    id: 'news',
    label: 'Artículos',
    cards: [
      {
        category: 'Caso de Éxito',
        date: 'Mar 14, 2026',
        title: 'Cómo un contador de 52 años automatizó 3 horas de trabajo diario con una sola herramienta de IA',
        image: '/images/data.png',
      },
      {
        category: 'Artículos',
        date: 'Feb 28, 2026',
        title: 'ChatGPT para abogados: guía práctica para profesionales sin conocimientos técnicos',
        bg: 'bg-green',
      },
      {
        category: 'Artículos',
        date: 'Jan 15, 2026',
        title: 'Por qué los profesionales con más experiencia aprenden IA más rápido de lo que creen',
        image: '/images/criminal.jpg',
      },
    ],
  },
  {
    id: 'articles',
    label: 'Recursos',
    cards: [
      {
        category: 'Pay Equity',
        date: 'Apr 1, 2026',
        title: 'Equal Pay Day 2026: Where Do We Stand on the Gender Pay Gap?',
        image: '/images/gender2.png',
      },
      {
        category: 'Gig Economy',
        date: 'Mar 22, 2026',
        title: 'Mamdani v. Instacart: Securing $5 Million for Gig Workers Denied Overtime',
        image: '/images/instacart.png',
      },
    ],
  },
  {
    id: 'whistleblower',
    label: 'Casos de Éxito',
    cards: [
      {
        category: 'Caso de Éxito',
        date: 'Apr 10, 2026',
        title: "María José, directora académica: 'En 3 semanas usé IA para hacer en 1 hora lo que me tomaba todo el día'",
        bg: 'bg-green',
      },
    ],
  },
]

function NewsCard({ card }: { card: NewsCard }) {
  return (
    <a href="#" className="group block relative overflow-hidden rounded-[1.6rem] min-h-[32rem] s:min-h-[40rem] cursor-pointer">
      {/* Background */}
      {card.image ? (
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className={`absolute inset-0 ${card.bg || 'bg-grey-taupe'}`} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-20 s:p-24">
        <div className="flex items-start justify-between">
          <span className="text-white text-12 uppercase tracking-[0.12rem] bg-white/20 backdrop-blur-sm rounded-[10rem] px-12 py-4">
            {card.category}
          </span>
          <span className="text-white/70 text-12">{card.date}</span>
        </div>
        <div className="flex items-end justify-between gap-16">
          <h3 className="text-white text-16 s:text-20 font-normal leading-[1.3]" style={{ fontFamily: '"disp", Georgia, serif' }}>
            {card.title}
          </h3>
          <span className="flex-shrink-0 w-32 h-32 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:bg-white group-hover:text-green transition-colors">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-12 h-12">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
}

export default function NewsroomSection() {
  const [activeTab, setActiveTab] = useState('news')
  const activeData = tabs.find((t) => t.id === activeTab)!

  return (
    <section className="bg-white">
      <div className="site-max py-80 s:py-120">
        {/* Header */}
        <div className="site-grid mb-40 s:mb-60">
          <div className="col-span-full s:col-span-8 mb-24 s:mb-0">
            <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-12">Blog</p>
            <h2
              className="text-32 s:text-48 font-normal text-green leading-[1.1]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              Lo último de Orbbi
            </h2>
          </div>
          <div className="col-span-full s:col-start-9 s:col-span-8 flex flex-col s:flex-row items-start s:items-end justify-between gap-16">
            {/* Tabs */}
            <div className="flex gap-8 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-12 uppercase tracking-[0.12rem] font-medium px-16 py-8 rounded-[10rem] border transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green text-white border-green'
                      : 'bg-transparent text-grey border-grey-taupe hover:border-green hover:text-green'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <a href="#" className="text-12 uppercase tracking-[0.12rem] font-medium text-green ulink flex-shrink-0">
              Ver todo
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid-layout-newsroom">
          {activeData.cards.map((card, i) => (
            <NewsCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
