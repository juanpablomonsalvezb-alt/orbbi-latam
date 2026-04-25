'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG: Record<string, string> = {
  yellow: '#FCDC9B',
  green: '#6da479',
  grey: '#7A7871',
  black: '#292929',
}
const TC: Record<string, string> = {
  black: '#1E383E',
  white: '#F7F5F2',
}

/* Accent fill color per bg — mirrors original JS logic */
const ACCENT: Record<string, string> = {
  yellow: '#FCDC9B',
  green: '#6da479',
  grey: '#7A7871',
  black: '#292929',
}

const STATS = [
  {
    bg: 'yellow', tc: 'black',
    number: '17 millones de empleos en Latam serán transformados por la IA',
    desc: "Según la OIT 2024, ninguna región del mundo enfrenta una transformación laboral tan acelerada como América Latina. Los profesionales con experiencia son los que más tienen que ganar — si saben cómo usarla.",
  },
  {
    bg: 'green', tc: 'white',
    number: 'Solo el 34% de los profesionales mayores de 45 usa IA en el trabajo',
    desc: "Versus el 57% de los menores de 35 (LSE 2025). La brecha existe. Crece cada mes. Y no es por falta de capacidad — es por falta de formación diseñada para esta generación.",
  },
  {
    bg: 'grey', tc: 'white',
    number: '60% quiere aprender IA pero no sabe cómo empezar',
    desc: "La intención existe. El camino no. La mayoría de los recursos de formación en IA están diseñados para el mundo joven y digital — no para quienes llevan 20 años construyendo algo valioso.",
  },
  {
    bg: 'black', tc: 'white',
    number: '1 de cada 2 ejecutivos teme quedar obsoleto por la IA',
    desc: 'No es miedo al futuro. Es la presión del presente. Tu empresa la menciona en cada reunión. Tus colegas más jóvenes ya la usan. Nosotros te mostramos el camino.',
  },
]

/* ─── SVG 1: 17M empleos transformados ─────────────────────────────
   Espiral / onda de transformación: líneas del pasado (horizontales,
   paralelas, apagadas) atravesadas por una ola energética ascendente
   que las reorganiza en crecimiento. Visual de "disrupción productiva".
──────────────────────────────────────────────────────────────────── */
function Svg1() {
  return (
    <svg className="js-svg-color w-full h-auto" style={{ maxWidth: '48rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" fill="none">
      {/* Líneas del viejo mundo — horizontales, uniformes, apagadas */}
      {[40,70,100,130,160,190,220].map((y,i) => (
        <path key={i} d={`M20 ${y} H${180 + i*4}`} stroke="currentColor" strokeWidth="1" strokeOpacity={0.12 + i*0.04} strokeLinecap="round"/>
      ))}

      {/* Eje de tiempo */}
      <path d="M20 240H460" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>

      {/* Flecha de tiempo */}
      <path d="M450 235L460 240L450 245" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>

      {/* Curva principal de transformación — suave, ascendente, decidida */}
      <path
        d="M40 230 C80 230 100 210 130 190 C160 170 175 140 210 110 C245 80 275 55 320 35 C350 22 390 15 450 12"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
      />

      {/* Área bajo la curva — relleno tenue */}
      <path
        d="M40 230 C80 230 100 210 130 190 C160 170 175 140 210 110 C245 80 275 55 320 35 C350 22 390 15 450 12 L460 240 L20 240Z"
        fill="currentColor" fillOpacity="0.06"
      />

      {/* Puntos de inflexión sobre la curva */}
      <circle cx="130" cy="190" r="3.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="210" cy="110" r="3.5" fill="currentColor" fillOpacity="0.7"/>
      <circle cx="320" cy="35" r="3.5" fill="currentColor" fillOpacity="0.9"/>

      {/* Punto final — la cima */}
      <circle cx="450" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="450" cy="12" r="2.5" fill="currentColor"/>

      {/* Líneas verticales de referencia */}
      <path d="M130 240V190" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 3"/>
      <path d="M210 240V110" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 3"/>
      <path d="M320 240V35" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 3"/>

      {/* Etiquetas de eje — pequeñas líneas de tick */}
      <path d="M130 240V246M210 240V246M320 240V246M450 240V246" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── SVG 2: 34% usa IA — comparación visual ──────────────────────
   Dos grupos de barras: el grupo pequeño (34%, sólido, elevado)
   versus el grupo grande (66%, difuso, bajo). Visual inmediato
   de la minoría que avanza frente a la mayoría estancada.
──────────────────────────────────────────────────────────────────── */
function Svg2() {
  /* 34% group: 3 bars, tall, solid. 66% group: 6 bars, short, dashed */
  const solidBars = [
    { x: 60, h: 140 }, { x: 110, h: 160 }, { x: 160, h: 180 },
  ]
  const dashedBars = [
    { x: 240, h: 55 }, { x: 285, h: 48 }, { x: 330, h: 60 },
    { x: 375, h: 52 }, { x: 420, h: 45 }, { x: 465, h: 58 },
  ]
  const baseY = 220
  const barW = 34

  return (
    <svg className="js-svg-color w-full h-auto" style={{ maxWidth: '54rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 250" fill="none">
      {/* Eje base */}
      <path d="M20 220H520" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round"/>

      {/* Líneas de cuadrícula */}
      {[60,120,180].map(h => (
        <path key={h} d={`M20 ${baseY-h}H520`} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"/>
      ))}

      {/* Barras sólidas — el 34% que ya usa IA */}
      {solidBars.map((b, i) => (
        <g key={i}>
          <path
            d={`M${b.x} ${baseY}V${baseY - b.h}H${b.x + barW}V${baseY}`}
            stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
          />
          <path
            d={`M${b.x} ${baseY}H${b.x + barW}V${baseY - b.h}H${b.x}Z`}
            fill="currentColor" fillOpacity="0.18"
          />
        </g>
      ))}

      {/* Divisor */}
      <path d="M210 30V230" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="5 4"/>

      {/* Barras punteadas — el 66% que no usa IA */}
      {dashedBars.map((b, i) => (
        <path key={i}
          d={`M${b.x} ${baseY}V${baseY - b.h}H${b.x + barW}V${baseY}`}
          stroke="currentColor" strokeWidth="1" strokeLinejoin="round"
          strokeDasharray="4 3" strokeOpacity="0.35"
        />
      ))}

      {/* Etiquetas de grupo */}
      <path d="M60 30H194" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round"/>
      <path d="M240 18H499" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round"/>

      {/* Flechas direccionales */}
      <path d="M128 28L128 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M121 20L128 14L135 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>

      <path d="M369 16L369 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25"/>
      <path d="M363 22L369 28L375 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25"/>
    </svg>
  )
}

/* ─── SVG 3: 60% quiere aprender pero no sabe ──────────────────────
   Laberinto simple: un camino claro y corto (la solución Orbbi)
   vs. múltiples caminos ciegos y confusos (la oferta genérica).
   Metáfora visual directa: la mayoría se pierde.
──────────────────────────────────────────────────────────────────── */
function Svg3() {
  return (
    <svg className="js-svg-color w-full h-auto" style={{ maxWidth: '46rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 260" fill="none">
      {/* Punto de partida */}
      <circle cx="40" cy="130" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="40" cy="130" r="3" fill="currentColor"/>

      {/* Caminos perdidos — punteados, llegan a callejones sin salida */}
      {/* Camino 1: sube y choca */}
      <path d="M47 130 H120 V70 H200 V70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" strokeOpacity="0.3"/>
      <path d="M193 63 L200 70 L193 77" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25"/>
      <path d="M200 60 V80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2"/>

      {/* Camino 2: baja y se pierde */}
      <path d="M47 130 H100 V190 H280 V190" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" strokeOpacity="0.25"/>
      <path d="M273 183 L280 190 L273 197" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.2"/>
      <path d="M280 183 V197" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.18"/>

      {/* Camino 3: zigzag y muro */}
      <path d="M47 130 H80 V155 H160 V100 H240 V155 H300" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" strokeOpacity="0.2"/>
      <path d="M300 148 V162" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.15"/>

      {/* CAMINO CORRECTO — sólido, directo, limpio */}
      <path d="M47 130 H420" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Destino */}
      <circle cx="430" cy="130" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M425 130 L429 134 L436 126" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Pequeñas figuras perdidas en los caminos equivocados */}
      <circle cx="160" cy="68" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.3"/>
      <circle cx="230" cy="192" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.25"/>
      <circle cx="270" cy="127" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.22"/>
    </svg>
  )
}

/* ─── SVG 4: 1 de cada 2 teme quedar obsoleto ──────────────────────
   Reloj con manecillas moviéndose rápido + figura humana que mira
   el reloj. El tiempo corre. El profesional que no actúa, se queda
   atrás. Visual de urgencia y presión temporal.
──────────────────────────────────────────────────────────────────── */
function Svg4() {
  return (
    <svg className="js-svg-color w-full h-auto" style={{ maxWidth: '44rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 260" fill="none">
      {/* Reloj — círculo exterior */}
      <circle cx="220" cy="130" r="105" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9"/>
      {/* Círculo interior decorativo */}
      <circle cx="220" cy="130" r="95" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"/>

      {/* Marcas de las horas — 12 ticks, coordenadas pre-computadas para evitar hydration mismatch */}
      <path d="M220 42 L220 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M263.0 52.5 L258.7 61.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M296.5 86.0 L289.0 91.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M308 130 L318 130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M296.5 174.0 L289.0 168.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M263.0 207.5 L258.7 198.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M220 218 L220 208" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M177.0 207.5 L181.3 198.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M143.5 174.0 L151.0 168.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M132 130 L122 130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M143.5 86.0 L151.0 91.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
      <path d="M177.0 52.5 L181.3 61.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>

      {/* Manecilla de horas — apuntando a las 11 */}
      <path d="M220 130 L201 72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      {/* Manecilla de minutos — apuntando a las 12 casi pasado */}
      <path d="M220 130 L220 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Segundero — rápido, a las 2 */}
      <path d="M220 130 L253 65" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55"/>

      {/* Centro del reloj */}
      <circle cx="220" cy="130" r="5" fill="currentColor"/>
      <circle cx="220" cy="130" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>

      {/* Líneas de movimiento rápido — sensación de urgencia */}
      <path d="M120 130 H90M130 95 L112 82M130 165 L112 178" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.3" strokeDasharray="4 3"/>
      <path d="M320 130 H350M310 95 L328 82M310 165 L328 178" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.3" strokeDasharray="4 3"/>

      {/* Figura humana fuera del reloj — mirando hacia él */}
      {/* Cabeza */}
      <circle cx="55" cy="95" r="12" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"/>
      {/* Cuerpo */}
      <path d="M55 107 V150 M40 120 H70 M45 150 L55 150 L65 150" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Brazo apuntando al reloj */}
      <path d="M70 120 L108 124" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M103 120 L108 124 L103 128" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const SVG_COMPONENTS = [Svg1, Svg2, Svg3, Svg4]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = stickyHeaderRef.current
    if (!section) return

    const textEls = section.querySelectorAll<HTMLElement>('.stat-text')
    const articles = section.querySelectorAll<HTMLElement>('[data-stat]')
    const triggers: ScrollTrigger[] = []
    const svgSelector = '.js-svg-color path, .js-svg-color circle, .js-svg-color line, .js-svg-color polyline'

    /* Per-article activate functions stored so we can call them on refresh */
    const activators: (() => void)[] = []

    articles.forEach((article, i) => {
      const stat = STATS[i]
      if (!stat) return
      const bg = BG[stat.bg]
      const tc = TC[stat.tc]
      const els = article.querySelectorAll<SVGGeometryElement>(svgSelector)

      /* Hide elements initially — only paths without fill get dashoffset treatment */
      els.forEach(el => {
        try {
          const len = el.getTotalLength()
          if (len > 0) {
            gsap.set(el, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len, opacity: 0 })
          } else {
            gsap.set(el, { opacity: 0 })
          }
        } catch {
          gsap.set(el, { opacity: 0 })
        }
      })

      const activate = () => {
        gsap.to(section, { backgroundColor: bg, duration: 0.6, ease: 'power2.out' })
        gsap.to(textEls, { color: tc, duration: 0.6, ease: 'power2.out' })
        if (header) gsap.to(header, { backgroundColor: bg, duration: 0.6, ease: 'power2.out' })
        els.forEach((el, pi) => {
          try {
            const len = el.getTotalLength()
            if (len > 0) {
              gsap.to(el, { strokeDashoffset: 0, opacity: 1, duration: 1.6, ease: 'expo.out', delay: pi * 0.06 })
            } else {
              gsap.to(el, { opacity: 1, duration: 0.5, delay: pi * 0.04 })
            }
          } catch {
            gsap.to(el, { opacity: 1, duration: 0.5 })
          }
        })
      }
      activators.push(activate)

      triggers.push(ScrollTrigger.create({
        trigger: article,
        start: 'top 75%',
        end: 'bottom 25%',
        onEnter: activate,
        onEnterBack: activate,
      }))
    })

    /* After setup, check which articles are already in view and activate them */
    const initTimer = setTimeout(() => {
      ScrollTrigger.refresh()
      articles.forEach((article, i) => {
        const rect = article.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          activators[i]?.()
        }
      })
    }, 100)

    return () => {
      clearTimeout(initTimer)
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative js-bg-switcher-section"
      style={{ backgroundColor: BG.yellow }}
    >
      <hr className="m-0 w-full border-none" style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />

      <div className="relative w-full">
        <div className="site-max site-grid relative pt-60 s:pt-120 pb-60 s:pb-0">

          {/* Left sticky header */}
          <div
            ref={stickyHeaderRef}
            className="stats-left pb-60 s:pb-[9.6rem] s:sticky s:top-[16rem] s:h-fit z-10 flex flex-col gap-32 s:gap-25"
            style={{ backgroundColor: BG.yellow }}
          >
            <h2 className="stat-text text-12 font-medium leading-none tracking-[0.12rem] uppercase" style={{ color: TC.black, opacity: 0.6 }}>
              Los Números No Mienten
            </h2>
            <h3
              className="stat-text text-26 s:text-32 font-normal leading-[1.16] tracking-[-0.032rem]"
              style={{ fontFamily: '"disp", Georgia, serif', color: TC.black }}
            >
              La brecha digital generacional es real. En Orbbi Latam la cerramos, un profesional a la vez.
            </h3>
          </div>

          {/* Right: stat articles */}
          <div className="stats-right">
            {STATS.map((stat, i) => {
              const SvgComp = SVG_COMPONENTS[i]
              return (
                <article
                  key={i}
                  data-stat={i}
                  className="relative flex flex-col items-start pt-0 pb-60 s:pb-[9.6rem] s:pl-[9.6rem] s:pr-[9.6rem] gap-40 s:gap-65"
                >
                  {i > 0 && (
                    <div className="absolute top-0 left-0 s:left-[-1.2rem] w-full s:w-[100vw] stat-text" style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />
                  )}

                  <div className="w-full flex justify-center items-center" style={{ minHeight: '16rem' }}>
                    <SvgComp />
                  </div>

                  <div className="space-y-20 s:space-y-22 w-full">
                    <p
                      className="stat-text text-40 s:text-48 font-normal leading-none tracking-[-0.048rem]"
                      style={{ color: TC[stat.tc as keyof typeof TC] }}
                      dangerouslySetInnerHTML={{ __html: stat.number }}
                    />
                    <p
                      className="stat-text text-16 font-normal leading-[1.32]"
                      style={{ color: TC[stat.tc as keyof typeof TC] }}
                    >
                      {stat.desc}
                    </p>
                  </div>

                  {i < STATS.length - 1 && (
                    <div className="absolute bottom-0 left-0 s:left-[-1.2rem] w-full s:w-[100vw] stat-text" style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />
                  )}
                </article>
              )
            })}
          </div>

          <div className="absolute hidden s:block top-0 left-1/2 -translate-x-1/2 stat-text" style={{ width: '1px', height: '100%', backgroundColor: 'currentColor', opacity: 0.2 }} />
        </div>
      </div>
    </section>
  )
}
