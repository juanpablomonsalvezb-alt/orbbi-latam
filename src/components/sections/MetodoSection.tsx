'use client'
import { useState } from 'react'

const ETAPAS = [
  {
    num: '01',
    name: 'Desmitificar',
    desc: 'Antes de aprender, hay que dejar de tener miedo. La primera barrera no es tecnológica — es emocional.',
    detail: 'El facilitador escucha antes de enseñar. Se trabaja sobre creencias específicas, no se da una clase genérica. Se demuestra que la IA ya está presente en la vida del participante sin que lo sepa. Se establece por qué la experiencia profesional es una ventaja real, no un obstáculo.',
    stat: '25%', source: 'de trabajadores teme quedar obsoleto por la IA — Gallup, 2024',
  },
  {
    num: '02',
    name: 'Conectar',
    desc: 'Identificar con precisión dónde la IA cambia este trabajo específico. Foco total. Nada más.',
    detail: 'Se construye un mapa del flujo de trabajo real del participante. Se seleccionan 2 o 3 herramientas específicas para su cargo y sector — y se descarta el resto con justificación explícita.',
    stat: '66%', source: 'de aumento de productividad en tareas cognitivas — McKinsey, 2025',
  },
  {
    num: '03',
    name: 'Resolver',
    desc: 'Aprender usando el trabajo real como material de práctica. No ejercicios genéricos.',
    detail: 'Cada herramienta se aprende con una tarea real del participante. El facilitador observa y guía. Cada sesión termina con un resultado concreto producido con IA en su propio trabajo.',
    stat: '56%', source: 'de prima salarial para trabajadores con habilidades en IA — WEF, 2025',
  },
  {
    num: '04',
    name: 'Dominar',
    desc: 'Trabajar con IA sin pensar en IA. La autonomía real como objetivo final.',
    detail: 'Seguimiento del uso real entre sesiones. Desarrollo del criterio propio para evaluar herramientas nuevas. La prueba final: una tarea nunca trabajada, resuelta con autonomía completa.',
    stat: '92%', source: 'de usuarios diarios de IA reportan ganancias de productividad — PwC, 2025',
  },
]

export default function MetodoSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="metodologia" className="bg-white">
      <div className="site-max py-80 s:py-120">

        {/* Header */}
        <div className="site-grid mb-60 s:mb-80">
          <div className="col-span-full s:col-start-2 s:col-span-9">
            <p className="text-grey text-12 uppercase tracking-[0.12rem] mb-16">Metodología</p>
            <h2
              className="text-32 s:text-52 font-normal text-green leading-[1.05]"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              Un marco diseñado para el profesional que ya sabe trabajar.
            </h2>
          </div>
          <div className="col-span-full s:col-start-12 s:col-span-4 flex items-end">
            <p className="text-grey text-13 leading-[1.7] s:text-right" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Fundamentado en investigación sobre aprendizaje adulto y adopción tecnológica.
            </p>
          </div>
        </div>

        {/* Etapas */}
        <div className="site-grid">
          <div className="col-span-full s:col-start-2 s:col-span-14">
            {ETAPAS.map((e, i) => (
              <div key={e.num}>
                {/* Row */}
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start s:items-center justify-between gap-20 py-28 s:py-32"
                    style={{ borderTop: '1px solid #DEDAD3' }}>
                    <div className="flex items-start s:items-center gap-24 s:gap-40 flex-1">
                      {/* Number */}
                      <span className="text-12 text-grey/35 font-medium flex-shrink-0 mt-1 s:mt-0"
                        style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12rem', minWidth: '2.4rem' }}>
                        {e.num}
                      </span>
                      {/* Name */}
                      <span
                        className="text-24 s:text-36 font-normal text-green leading-[1.1] group-hover:opacity-70 transition-opacity"
                        style={{ fontFamily: '"disp", Georgia, serif' }}
                      >
                        {e.name}
                      </span>
                      {/* Desc — hidden on mobile when open */}
                      <span className="hidden s:block text-14 text-grey leading-[1.6] flex-1"
                        style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '40rem' }}>
                        {e.desc}
                      </span>
                    </div>
                    {/* Arrow */}
                    <span
                      className="flex-shrink-0 mt-1 s:mt-0 transition-transform duration-300"
                      style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', color: '#7A7871' }}
                    >
                      <svg viewBox="0 0 14 14" fill="none" className="w-14 h-14">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Expanded */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: open === i ? '40rem' : '0' }}
                >
                  <div className="grid grid-cols-1 s:grid-cols-[auto_1fr_auto] gap-40 pb-40 pl-0 s:pl-[6.4rem]">
                    {/* Detail text */}
                    <div className="s:col-span-1" style={{ maxWidth: '52rem' }}>
                      <p className="text-15 text-grey leading-[1.75]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {e.detail}
                      </p>
                    </div>
                    {/* Stat */}
                    <div className="flex flex-col justify-center" />
                    <div className="flex flex-col items-start s:items-end justify-center">
                      <span
                        className="text-56 s:text-72 font-normal text-green leading-none mb-8"
                        style={{ fontFamily: '"disp", Georgia, serif' }}
                      >
                        {e.stat}
                      </span>
                      <p className="text-12 text-grey/60 s:text-right" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '22rem', lineHeight: '1.5' }}>
                        {e.source}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Last border */}
            <div style={{ borderTop: '1px solid #DEDAD3' }} />
          </div>
        </div>

        {/* Quote */}
        <div className="site-grid mt-80">
          <div className="col-span-full s:col-start-2 s:col-span-14 text-center">
            <p
              className="text-22 s:text-32 font-normal text-green/60 leading-[1.4] italic mx-auto"
              style={{ fontFamily: '"disp", Georgia, serif', maxWidth: '72rem' }}
            >
              "Tus 20 años de experiencia más las herramientas de hoy. Esa combinación no la puede imitar nadie."
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
