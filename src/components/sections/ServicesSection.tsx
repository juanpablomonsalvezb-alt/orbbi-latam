'use client'
import { useState } from 'react'
import Image from 'next/image'

type ServiceCard = {
  tag: string
  title: string
  body: string
  bullets: string[]
  image?: string
  bg?: string
  cta?: string
}

const tabs: { id: string; label: string; cards: ServiceCard[] }[] = [
  {
    id: 'personas',
    label: 'Para personas',
    cards: [
      {
        tag: 'Formación Esencial',
        title: 'Aprende a usar la IA desde cero, sin tecnicismos',
        body: 'Para quien nunca ha usado inteligencia artificial y quiere empezar bien. Aprendes a tu ritmo, con casos reales de tu propia vida y trabajo.',
        bullets: ['ChatGPT, Copilot y otras herramientas clave', 'Sin conocimientos previos requeridos', 'Individual o grupal, 100% online'],
        image: '/images/pay-equity.jpg',
      },
      {
        tag: 'Orientación Profesional',
        title: 'Las mejores herramientas de IA para tu cargo específico',
        body: 'Analizamos tu trabajo real y te mostramos exactamente qué herramientas usar y cómo. Sin perder tiempo explorando cientos de opciones.',
        bullets: ['Diagnóstico de tu función y tareas diarias', '3 a 5 herramientas seleccionadas para ti', 'Práctica con tus propios documentos'],
        bg: 'bg-green',
      },
      {
        tag: 'Herramienta a Medida',
        title: 'Construimos una herramienta de IA diseñada para tu trabajo',
        body: 'Tú defines qué necesitas. Nosotros lo construimos. Tú lo usas desde el primer día — sin necesitar saber de tecnología.',
        bullets: ['Diseño y construcción completa', 'Entrega con capacitación incluida', 'Ajustes incluidos el primer mes'],
        image: '/images/criminal.jpg',
      },
    ],
  },
  {
    id: 'empresas',
    label: 'Para empresas',
    cards: [
      {
        tag: 'Charla Introductoria',
        title: '2 horas para que tu equipo entienda qué es la IA y qué no es',
        body: 'El punto de partida ideal para organizaciones que quieren acercar a sus equipos a la inteligencia artificial sin presión ni tecnicismos.',
        bullets: ['Online o presencial', 'Hasta 100 participantes', 'Sin requisitos previos'],
        image: '/images/interns.png',
      },
      {
        tag: 'Taller Intensivo',
        title: 'De 4 a 8 horas de formación práctica aplicada a tu sector',
        body: 'Diseñado a medida para el sector, nivel y necesidades del grupo. Cada participante termina con herramientas funcionando en su propio trabajo.',
        bullets: ['Contenido 100% personalizado', 'Ejercicios con casos reales del sector', 'Material de apoyo incluido'],
        bg: 'bg-green',
      },
      {
        tag: 'Programa Corporativo',
        title: 'Programa por etapas o acompañamiento anual para tu organización',
        body: 'Para empresas que quieren un cambio real y sostenido. Incluye diagnóstico, formación, seguimiento e informe de resultados.',
        bullets: ['Diagnóstico inicial del equipo', 'Seguimiento de resultados medibles', 'Sesión de cierre y próximos pasos'],
        image: '/images/data.png',
      },
    ],
  },
]

function ServiceCard({ card }: { card: ServiceCard }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] min-h-[36rem] s:min-h-[44rem] flex flex-col">
      {/* Background */}
      {card.image ? (
        <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className={`absolute inset-0 ${card.bg || 'bg-grey-taupe'}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full p-24 s:p-28">
        {/* Top */}
        <div className="flex items-center justify-between">
          <span className="text-white text-11 uppercase tracking-[0.12rem] font-medium bg-white/20 backdrop-blur-sm rounded-[10rem] px-12 py-5">
            {card.tag}
          </span>
          <span className="text-white/60 text-11 uppercase tracking-[0.10rem] font-medium">100% Online</span>
        </div>

        {/* Bottom */}
        <div>
          <h3 className="text-white text-18 s:text-22 font-normal leading-[1.25] mb-16" style={{ fontFamily: '"disp", Georgia, serif' }}>
            {card.title}
          </h3>
          <p className="text-white/65 text-13 leading-[1.6] mb-20" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {card.body}
          </p>
          <ul className="space-y-6 mb-24">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-8 text-white/55 text-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
                <span className="w-4 h-4 rounded-full bg-white/30 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href="mailto:contacto@orbbi.lat"
            className="inline-flex items-center gap-8 text-white text-12 uppercase tracking-[0.12rem] font-medium border border-white/40 rounded-[10rem] px-16 py-8 hover:bg-white hover:text-green transition-colors"
          >
            Consultar
            <svg viewBox="0 0 16 16" fill="none" className="w-10 h-10">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('personas')
  const activeData = tabs.find(t => t.id === activeTab)!

  return (
    <section className="bg-white">
      <div className="site-max py-80 s:py-120">
        {/* Header */}
        <div className="site-grid mb-40 s:mb-60">
          <div className="col-span-full s:col-span-8 mb-24 s:mb-0">
            <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-12">Servicios · 100% Online</p>
            <h2
              className="text-32 s:text-48 font-normal text-green leading-[1.1]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              Elige el camino que se adapta a tu momento.
            </h2>
          </div>
          <div className="col-span-full s:col-start-9 s:col-span-8 flex flex-col s:flex-row items-start s:items-end justify-between gap-16">
            <div className="flex gap-8">
              {tabs.map(tab => (
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
            <a href="mailto:contacto@orbbi.lat" className="text-12 uppercase tracking-[0.12rem] font-medium text-green ulink flex-shrink-0">
              Contáctanos
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid-layout-newsroom">
          {activeData.cards.map((card, i) => (
            <ServiceCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
