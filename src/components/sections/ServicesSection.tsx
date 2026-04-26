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
        image: '/images/svc-formacion.jpg', // hombre ~50 home
      },
      {
        tag: 'Orientación Profesional',
        title: 'Las mejores herramientas de IA para tu cargo específico',
        body: 'Analizamos tu trabajo real y te mostramos exactamente qué herramientas usar y cómo. Sin perder tiempo explorando cientos de opciones.',
        bullets: ['Diagnóstico de tu función y tareas diarias', '3 a 5 herramientas seleccionadas para ti', 'Práctica con tus propios documentos'],
        image: '/images/svc-herramienta.jpg',
      },
      {
        tag: 'Herramienta a Medida',
        title: 'Construimos una herramienta de IA diseñada para tu trabajo',
        body: 'Tú defines qué necesitas. Nosotros lo construimos. Tú lo usas desde el primer día — sin necesitar saber de tecnología.',
        bullets: ['Diseño y construcción completa', 'Entrega con capacitación incluida', 'Ajustes incluidos el primer mes'],
        image: '/images/svc-medida.jpg', // mujer ejecutiva blazer azul
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
        image: '/images/svc-charla.jpg',
      },
      {
        tag: 'Taller Intensivo',
        title: 'De 4 a 8 horas de formación práctica aplicada a tu sector',
        body: 'Diseñado a medida para el sector, nivel y necesidades del grupo. Cada participante termina con herramientas funcionando en su propio trabajo.',
        bullets: ['Contenido 100% personalizado', 'Ejercicios con casos reales del sector', 'Material de apoyo incluido'],
        image: '/images/svc-taller.jpg',
      },
    ],
  },
]

function ServiceCard({ card, onInfo }: { card: ServiceCard; onInfo: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.6rem] min-h-[36rem] s:min-h-[44rem] flex flex-col cursor-pointer" onClick={onInfo}>
      {/* Background */}
      {card.image ? (
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover object-center group-hover:scale-103 transition-transform duration-1000"
        />
      ) : (
        <div className={`absolute inset-0 ${card.bg || 'bg-grey-taupe'}`} />
      )}
      {/* Gradiente solo sobre imágenes, nunca sobre la card verde */}
      {card.image && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />
      )}

      {/* Gradiente superior para legibilidad del título */}
      {card.image && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)' }} />
      )}

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full p-28 s:p-32">
        {/* Top — título + tag */}
        <div>
          <div className="flex items-start justify-between mb-16">
            <span className="text-white/60 text-10 uppercase tracking-[0.2rem] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {card.tag}
            </span>
            <span className="text-white/40 text-10 uppercase tracking-[0.16rem]" style={{ fontFamily: 'system-ui, sans-serif' }}>Online</span>
          </div>
          <h3
            className="text-white text-24 s:text-28 font-normal leading-[1.2]"
            style={{ fontFamily: '"disp", Georgia, serif' }}
          >
            {card.title}
          </h3>
        </div>

        {/* Bottom — botón */}
        <div className="flex items-center gap-12 group/btn">
          <span
            className="text-white/70 text-11 uppercase tracking-[0.2rem] font-medium transition-all duration-300 group-hover/btn:text-white"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Ver detalle
          </span>
          <span className="flex-1 h-px bg-white/20 group-hover/btn:bg-white/50 transition-colors duration-300" style={{ maxWidth: '4rem' }} />
          <svg viewBox="0 0 20 10" fill="none" className="w-16 h-8 text-white/50 group-hover/btn:text-white transition-colors duration-300">
            <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function Modal({ card, onClose }: { card: ServiceCard; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-20 s:p-40"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-[2rem] max-w-[52rem] w-full p-40 s:p-56 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-24 right-24 text-grey hover:text-green transition-colors text-24 leading-none"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Tag */}
        <span className="inline-block text-11 font-medium uppercase tracking-[0.12rem] text-green/70 bg-black/5 rounded-[10rem] px-12 py-5 mb-20">
          {card.tag}
        </span>

        {/* Title */}
        <h3
          className="text-24 s:text-32 font-normal text-green leading-[1.2] mb-20"
          style={{ fontFamily: '"disp", Georgia, serif' }}
        >
          {card.title}
        </h3>

        {/* Divider */}
        <div className="w-full mb-24" style={{ height: '1px', backgroundColor: '#DEDAD3' }} />

        {/* Body */}
        <p className="text-grey text-15 leading-[1.7] mb-28" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {card.body}
        </p>

        {/* Bullets */}
        <ul className="space-y-12 mb-36">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-12 text-14 text-grey leading-[1.5]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              <span className="mt-[0.55em] w-4 h-4 rounded-full bg-green/30 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:contacto@orbbilatam.com"
          className="inline-flex items-center gap-10 text-12 font-medium uppercase tracking-[0.12rem] text-white bg-green px-28 py-14 rounded-[10rem] hover:opacity-90 transition-opacity"
        >
          Consultar por este servicio
          <svg viewBox="0 0 16 16" fill="none" className="w-10 h-10">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('personas')
  const [openCard, setOpenCard] = useState<ServiceCard | null>(null)
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
            <div className="flex items-center gap-0" style={{ borderBottom: '1px solid #DEDAD3' }}>
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative pb-12 transition-colors"
                  style={{
                    marginRight: i < tabs.length - 1 ? '2.8rem' : 0,
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    letterSpacing: '0.14rem',
                    textTransform: 'uppercase',
                    color: activeTab === tab.id ? '#1E383E' : '#7A7871',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 0 1.2rem 0',
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full" style={{ height: '1px', backgroundColor: '#1E383E' }} />
                  )}
                </button>
              ))}
            </div>
            <a href="mailto:contacto@orbbilatam.com" className="text-12 uppercase tracking-[0.12rem] font-medium text-green ulink flex-shrink-0">
              Contáctanos
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid-layout-newsroom">
          {activeData.cards.map((card, i) => (
            <ServiceCard key={i} card={card} onInfo={() => setOpenCard(card)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openCard && <Modal card={openCard} onClose={() => setOpenCard(null)} />}
    </section>
  )
}
