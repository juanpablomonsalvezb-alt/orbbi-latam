'use client'
import { useState } from 'react'
import Image from 'next/image'

type ServiceCard = {
  category: string
  tag: string
  title: string
  desc: string
  image?: string
  bg?: string
}

const tabs: { id: string; label: string; cards: ServiceCard[] }[] = [
  {
    id: 'descubrir',
    label: 'Descubrir',
    cards: [
      {
        category: 'Servicio 01',
        tag: 'Individual',
        title: 'Sesiones 1 a 1 adaptadas a tu ritmo y punto de partida real',
        desc: 'Por videollamada. Sin tecnicismos. Al ritmo que tú defines.',
        image: '/images/pay-equity.jpg',
      },
      {
        category: 'Servicio 01',
        tag: 'Grupal',
        title: 'Talleres para grupos de hasta 20 personas, presenciales u online',
        desc: 'Para asociaciones, gremios o equipos que quieren empezar juntos.',
        bg: 'bg-green',
      },
      {
        category: 'Servicio 01',
        tag: 'Formación Esencial',
        title: 'De cero a usar IA en tu trabajo sin necesitar saber de tecnología',
        desc: 'ChatGPT, Copilot y otras herramientas clave del día a día profesional.',
        image: '/images/interns.png',
      },
    ],
  },
  {
    id: 'aplicar',
    label: 'Aplicar',
    cards: [
      {
        category: 'Servicio 02A',
        tag: 'Orientación',
        title: 'Las 3 a 5 herramientas de IA más útiles para tu cargo específico',
        desc: 'Nosotros filtramos el ecosistema. Tú aplicas lo que funciona para ti.',
        image: '/images/data.png',
      },
      {
        category: 'Servicio 02B',
        tag: 'A medida',
        title: 'Una herramienta de IA construida específicamente para tu trabajo',
        desc: 'Él se luce. Nosotros construimos. Tú la usas desde el primer día.',
        bg: 'bg-green',
      },
      {
        category: 'Servicio 02',
        tag: 'Resultado',
        title: 'Resultados concretos demostrables en tu organización en semanas',
        desc: 'No teoría. No cursos genéricos. IA aplicada a tu función real.',
        image: '/images/criminal.jpg',
      },
    ],
  },
  {
    id: 'escalar',
    label: 'Escalar',
    cards: [
      {
        category: 'Servicio 03',
        tag: 'Equipos',
        title: 'Formación corporativa a medida para profesionales de 45 a 60 años',
        desc: 'Educación superior, salud, finanzas, gobierno, consultorías y más.',
        image: '/images/gender2.png',
      },
      {
        category: 'Servicio 03',
        tag: 'Formatos',
        title: 'Desde charlas de 2 horas hasta programas anuales de acompañamiento',
        desc: 'Taller intensivo · Programa por etapas · Acompañamiento continuo.',
        bg: 'bg-green',
      },
      {
        category: 'Servicio 03',
        tag: 'Empresas',
        title: 'Cierra la brecha digital interna antes de que sea un problema de negocio',
        desc: 'Informe de avance, seguimiento de resultados y plan de próximos pasos.',
        image: '/images/restaurant.png',
      },
    ],
  },
]

function ServiceCard({ card }: { card: ServiceCard }) {
  return (
    <a href="#" className="group block relative overflow-hidden rounded-[1.6rem] min-h-[32rem] s:min-h-[40rem] cursor-pointer">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative h-full flex flex-col justify-between p-20 s:p-24">
        <div className="flex items-start justify-between">
          <span className="text-white text-12 uppercase tracking-[0.12rem] bg-white/20 backdrop-blur-sm rounded-[10rem] px-12 py-4">
            {card.tag}
          </span>
          <span className="text-white/60 text-11 uppercase tracking-[0.08rem]">{card.category}</span>
        </div>
        <div className="flex items-end justify-between gap-16">
          <h3 className="text-white text-16 s:text-20 font-normal leading-[1.3]" style={{ fontFamily: '"disp", Georgia, serif' }}>
            {card.title}
          </h3>
          <span className="flex-shrink-0 w-32 h-32 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:bg-white group-hover:text-green transition-colors">
            <svg viewBox="0 0 16 16" fill="none" className="w-12 h-12">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('descubrir')
  const activeData = tabs.find(t => t.id === activeTab)!

  return (
    <section className="bg-white">
      <div className="site-max py-80 s:py-120">
        {/* Header */}
        <div className="site-grid mb-40 s:mb-60">
          <div className="col-span-full s:col-span-8 mb-24 s:mb-0">
            <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-12">Servicios</p>
            <h2
              className="text-32 s:text-48 font-normal text-green leading-[1.1]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              Cada profesional necesita un camino distinto.
            </h2>
          </div>
          <div className="col-span-full s:col-start-9 s:col-span-8 flex flex-col s:flex-row items-start s:items-end justify-between gap-16">
            {/* Tabs */}
            <div className="flex gap-8 flex-wrap">
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
              Conversemos
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid-layout-newsroom">
          {activeData.cards.map((card, i) => (
            <ServiceCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
