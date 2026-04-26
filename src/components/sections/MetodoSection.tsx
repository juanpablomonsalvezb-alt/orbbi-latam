'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ETAPAS = [
  {
    num: '01',
    name: 'Desmitificar',
    sub: 'Antes de aprender, hay que dejar de tener miedo.',
    stat: '25%',
    statLabel: 'de los trabajadores teme que su trabajo quede obsoleto por la IA — Gallup, 2024',
    insight: 'La primera barrera no es tecnológica. Es emocional. El miedo bloquea la cognición antes de que el contenido llegue a procesarse.',
    pasos: [
      'El facilitador escucha antes de enseñar — qué sabe, qué teme, qué ha escuchado',
      'Se trabaja sobre creencias específicas, no se da una clase genérica',
      'Se demuestra que la IA ya está presente en su vida sin que lo sepa',
      'Se establece por qué la experiencia profesional es una ventaja real, no un obstáculo',
    ],
    indicador: 'El participante explica con sus propias palabras qué es la IA. El tono cambió: de la resistencia a la curiosidad.',
    dark: true,
    science: 'Andragogía · Knowles (1984) · Neurociencia del aprendizaje · Immordino-Yang & Damasio (2007)',
  },
  {
    num: '02',
    name: 'Conectar',
    sub: 'Identificar con precisión dónde la IA cambia este trabajo específico.',
    stat: '66%',
    statLabel: 'de aumento de productividad en tareas cognitivas complejas — McKinsey & St. Louis Fed, 2025',
    insight: 'El error más común es la dispersión. Mostrar decenas de herramientas sin foco produce el efecto contrario: el participante se abruma y no adopta ninguna.',
    pasos: [
      'Se construye un mapa del flujo de trabajo actual: tareas, tiempos, fricciones',
      'Se clasifican tareas entre rutinarias (automatización) y estratégicas (potenciación)',
      'Se seleccionan 2 o 3 herramientas específicas para el cargo y sector',
      'Se descarta el resto con justificación explícita: por qué eso no es necesario ahora',
    ],
    indicador: 'El participante identifica sin ambigüedad las 2 o 3 tareas donde la IA puede intervenir hoy. Tiene un plan claro.',
    dark: false,
    science: 'Teoría de carga cognitiva · Sweller (1988) · Principio de relevancia · Knowles (1984)',
  },
  {
    num: '03',
    name: 'Resolver',
    sub: 'Aprender usando el trabajo real como material de práctica.',
    stat: '56%',
    statLabel: 'de prima salarial para trabajadores con habilidades en IA vs sin ellas — WEF, 2025',
    insight: 'El conocimiento que no se practica en contexto real no se retiene ni se transfiere. En Orbbi todo se practica con documentos, correos e informes reales del participante.',
    pasos: [
      'Cada herramienta se aprende con una tarea real, no con ejercicios diseñados para el curso',
      'El participante opera la herramienta en la sesión — el facilitador observa y guía',
      'Se construyen flujos de trabajo en el lenguaje específico del sector del participante',
      'Cada sesión termina con un resultado concreto producido con IA en su propio trabajo',
    ],
    indicador: 'El participante usa al menos 2 herramientas de forma autónoma entre sesiones. Mide el impacto: tiempo, calidad o capacidad nueva.',
    dark: true,
    science: 'Aprendizaje situado · Lave & Wenger (1991) · Principio de experiencia · Knowles (1984)',
  },
  {
    num: '04',
    name: 'Dominar',
    sub: 'Trabajar con IA sin pensar en IA.',
    stat: '92%',
    statLabel: 'de los usuarios diarios de IA reportan ganancias de productividad — PwC, 2025',
    insight: 'La autonomía real se demuestra con un criterio simple: el participante puede enfrentarse a una situación nueva — nunca trabajada juntos — y resolverla con IA por su cuenta.',
    pasos: [
      'Seguimiento del uso real: qué funciona, qué obstáculos aparecieron',
      'Incorporación de una herramienta adicional cuando el nivel de autonomía lo permite',
      'Desarrollo del criterio propio: cómo evaluar si una herramienta nueva vale la pena',
      'La prueba final: tarea nueva, no trabajada antes, resuelta con autonomía completa',
    ],
    indicador: 'El participante usa IA diariamente sin esfuerzo consciente. Puede evaluar herramientas nuevas solo. Tiene resultados medibles.',
    dark: false,
    science: 'Teoría de scaffolding · Vygotsky (1978) · Difusión de innovaciones · Rogers (1983)',
  },
]

const BG_DARK = '#1E383E'
const BG_LIGHT = '#F7F5F2'

export default function MetodoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const panels = section.querySelectorAll<HTMLElement>('.metodo-panel')

      panels.forEach((panel, i) => {
        // Stat number count-up feel
        const statEl = panel.querySelector<HTMLElement>('.metodo-stat')
        if (statEl) {
          gsap.fromTo(statEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 65%', toggleActions: 'play none none none' }
            }
          )
        }

        // Title split
        const titleEl = panel.querySelector<HTMLElement>('.metodo-title')
        if (titleEl) {
          const split = new SplitText(titleEl, { type: 'chars' })
          gsap.fromTo(split.chars,
            { opacity: 0, yPercent: 60 },
            {
              opacity: 1, yPercent: 0, duration: 0.7, ease: 'power3.out',
              stagger: 0.025,
              scrollTrigger: { trigger: panel, start: 'top 70%', toggleActions: 'play none none none' }
            }
          )
        }

        // Content
        const contentEls = panel.querySelectorAll<HTMLElement>('.metodo-content')
        gsap.fromTo(contentEls,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.3,
            scrollTrigger: { trigger: panel, start: 'top 65%', toggleActions: 'play none none none' }
          }
        )

        // Active state for progress nav
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="metodologia">

      {/* Sticky progress nav */}
      <div
        ref={progressRef}
        className="sticky top-[6rem] z-[50] hidden s:flex items-center justify-center gap-0 py-16 px-40"
        style={{ background: 'rgba(247,245,242,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        {ETAPAS.map((e, i) => (
          <button
            key={e.num}
            onClick={() => document.querySelector(`.metodo-panel-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="flex items-center gap-0 group"
          >
            <div className="flex items-center gap-10 px-20 py-6 transition-all duration-300">
              <span className={`text-10 font-medium transition-colors duration-300 ${active === i ? 'text-green' : 'text-grey/40'}`}
                style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12rem' }}>
                {e.num}
              </span>
              <span className={`text-11 font-medium uppercase tracking-[0.12rem] transition-all duration-300 ${active === i ? 'text-green' : 'text-grey/40'}`}
                style={{ fontFamily: 'system-ui, sans-serif' }}>
                {e.name}
              </span>
              {active === i && <span className="w-16 h-px bg-green ml-4" />}
            </div>
            {i < ETAPAS.length - 1 && (
              <span className="text-grey/20 text-12 mx-4">·</span>
            )}
          </button>
        ))}
      </div>

      {/* Intro */}
      <div style={{ background: BG_DARK }}>
        <div className="site-max py-80 s:py-120">
          <div className="site-grid">
            <div className="col-span-full s:col-start-2 s:col-span-7">
              <p className="text-white/40 text-12 uppercase tracking-[0.16rem] mb-24" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Metodología
              </p>
              <h2
                className="text-36 s:text-60 font-normal text-white leading-[1.05] mb-32"
                style={{ fontFamily: '"disp", Georgia, serif' }}
              >
                Un marco de aprendizaje diseñado para el profesional que ya sabe trabajar.
              </h2>
              <p className="text-white/55 text-16 leading-[1.8]" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '56rem' }}>
                Fundamentado en investigación sobre aprendizaje adulto, adopción de tecnología y transformación laboral. No es intuición — es la aplicación sistemática de lo que la ciencia ya sabe sobre cómo aprenden los adultos.
              </p>
            </div>
            <div className="col-span-full s:col-start-10 s:col-span-6 flex flex-col justify-end mt-60 s:mt-0">
              {/* Key stat */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3.2rem' }}>
                <p className="text-white text-64 s:text-80 font-normal leading-none mb-12" style={{ fontFamily: '"disp", Georgia, serif' }}>92%</p>
                <p className="text-white/45 text-13 leading-[1.6]" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '28rem' }}>
                  de los usuarios diarios de IA reporta ganancias de productividad. La diferencia no está en la herramienta — está en cómo se aprendió.
                </p>
                <p className="text-white/25 text-11 mt-12" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08rem' }}>
                  PwC Global Workforce Hopes & Fears Survey, 2025 · 50.000 trabajadores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 stages */}
      {ETAPAS.map((e, i) => (
        <div
          key={e.num}
          className={`metodo-panel metodo-panel-${i}`}
          style={{ background: e.dark ? BG_DARK : BG_LIGHT }}
        >
          <div className="site-max py-80 s:py-[14rem]">
            <div className="site-grid items-start">

              {/* Left: number + science */}
              <div className="col-span-full s:col-start-2 s:col-span-3 mb-48 s:mb-0">
                <span
                  className="block text-[14rem] s:text-[20rem] font-normal leading-none"
                  style={{
                    fontFamily: '"disp", Georgia, serif',
                    color: e.dark ? 'rgba(255,255,255,0.06)' : 'rgba(30,56,62,0.06)',
                    letterSpacing: '-0.04em',
                    marginLeft: '-1rem',
                  }}
                >
                  {e.num}
                </span>
                <p
                  className="text-11 leading-[1.8] mt-16"
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    color: e.dark ? 'rgba(255,255,255,0.2)' : 'rgba(30,56,62,0.3)',
                    letterSpacing: '0.02rem',
                  }}
                >
                  {e.science}
                </p>
              </div>

              {/* Right: content */}
              <div className="col-span-full s:col-start-6 s:col-span-10">

                {/* Stage name */}
                <p className="metodo-content text-12 uppercase tracking-[0.16rem] mb-16"
                  style={{ fontFamily: 'system-ui, sans-serif', color: e.dark ? 'rgba(255,255,255,0.4)' : 'rgba(30,56,62,0.4)' }}>
                  Etapa {e.num}
                </p>
                <h3
                  className="metodo-title text-48 s:text-72 font-normal leading-[1.0] mb-24"
                  style={{ fontFamily: '"disp", Georgia, serif', color: e.dark ? '#F7F5F2' : '#1E383E' }}
                >
                  {e.name}
                </h3>
                <p
                  className="metodo-content text-18 s:text-22 font-normal leading-[1.3] mb-48"
                  style={{ fontFamily: '"disp", Georgia, serif', color: e.dark ? 'rgba(247,245,242,0.7)' : 'rgba(30,56,62,0.7)', maxWidth: '56rem' }}
                >
                  {e.sub}
                </p>

                {/* Stat */}
                <div className="metodo-stat mb-48" style={{ borderTop: `1px solid ${e.dark ? 'rgba(255,255,255,0.1)' : 'rgba(30,56,62,0.1)'}`, paddingTop: '4rem' }}>
                  <div className="flex items-end gap-24 mb-12">
                    <span
                      className="text-64 s:text-80 font-normal leading-none"
                      style={{ fontFamily: '"disp", Georgia, serif', color: e.dark ? '#FCDC9B' : '#1E383E' }}
                    >
                      {e.stat}
                    </span>
                  </div>
                  <p className="text-13 leading-[1.6]" style={{ fontFamily: 'system-ui, sans-serif', color: e.dark ? 'rgba(255,255,255,0.4)' : 'rgba(30,56,62,0.45)', maxWidth: '48rem' }}>
                    {e.statLabel}
                  </p>
                </div>

                {/* Insight */}
                <p
                  className="metodo-content text-16 leading-[1.75] mb-40"
                  style={{ fontFamily: 'system-ui, sans-serif', color: e.dark ? 'rgba(255,255,255,0.6)' : 'rgba(30,56,62,0.65)', maxWidth: '60rem' }}
                >
                  {e.insight}
                </p>

                {/* Steps */}
                <div className="metodo-content grid grid-cols-1 s:grid-cols-2 gap-x-40 gap-y-0 mb-48">
                  {e.pasos.map((paso, pi) => (
                    <div key={pi} className="flex items-start gap-14 py-16"
                      style={{ borderTop: `1px solid ${e.dark ? 'rgba(255,255,255,0.07)' : 'rgba(30,56,62,0.07)'}` }}>
                      <span className="text-11 font-medium mt-[0.3em] flex-shrink-0"
                        style={{ color: e.dark ? 'rgba(255,255,255,0.2)' : 'rgba(30,56,62,0.25)', fontFamily: 'system-ui, sans-serif' }}>
                        {String(pi + 1).padStart(2, '0')}
                      </span>
                      <p className="text-14 leading-[1.6]"
                        style={{ fontFamily: 'system-ui, sans-serif', color: e.dark ? 'rgba(255,255,255,0.65)' : 'rgba(30,56,62,0.7)' }}>
                        {paso}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Indicator */}
                <div
                  className="metodo-content p-28 s:p-32"
                  style={{ background: e.dark ? 'rgba(255,255,255,0.04)' : 'rgba(30,56,62,0.04)', borderLeft: `2px solid ${e.dark ? 'rgba(252,220,155,0.5)' : '#1E383E'}` }}
                >
                  <p className="text-11 uppercase tracking-[0.14rem] mb-10"
                    style={{ fontFamily: 'system-ui, sans-serif', color: e.dark ? 'rgba(252,220,155,0.6)' : 'rgba(30,56,62,0.4)' }}>
                    Indicador de avance
                  </p>
                  <p className="text-15 leading-[1.65] italic"
                    style={{ fontFamily: '"disp", Georgia, serif', color: e.dark ? 'rgba(247,245,242,0.75)' : 'rgba(30,56,62,0.8)' }}>
                    {e.indicador}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Cierre */}
      <div style={{ background: BG_DARK }}>
        <div className="site-max py-80 s:py-120">
          <div className="site-grid">
            <div className="col-span-full s:col-start-2 s:col-span-14">
              <blockquote
                className="text-28 s:text-44 font-normal text-white leading-[1.2] mb-32"
                style={{ fontFamily: '"disp", Georgia, serif', maxWidth: '80rem' }}
              >
                "Tus 20 años de experiencia más las herramientas de hoy. Esa combinación no la puede imitar nadie."
              </blockquote>
              <p className="text-white/35 text-13" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Método Orbbi · Desmitificar · Conectar · Resolver · Dominar
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
