'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const JOURNEY = [
  { num: '01', label: 'Descubrir' },
  { num: '02', label: 'Aplicar' },
  { num: '03', label: 'Escalar' },
]

const SERVICES = [
  {
    num: '01',
    stage: 'Descubrir',
    title: 'Formación Esencial',
    tagline: 'Descubrir la IA sin miedo ni tecnicismos',
    para: 'Para cualquier persona de 45–60 años que quiere entender qué es la inteligencia artificial y cómo usarla en su vida y trabajo. Sin conocimientos previos. Sin lenguaje técnico. Sin quedar en ridículo.',
    modalities: [
      { label: 'Individual', desc: 'Sesiones 1 a 1 por videollamada al ritmo del cliente.' },
      { label: 'Grupal', desc: 'Talleres para hasta 20 personas. Presencial u online.' },
    ],
    bullets: [
      'Qué es la IA y qué no es',
      'Herramientas esenciales del día a día (ChatGPT, Copilot y otras)',
      'Primeros ejercicios prácticos con casos reales',
      'Cómo no perderse en el ecosistema de herramientas',
      'Material de apoyo y recursos curados',
    ],
    result: 'Al finalizar, el participante usa al menos 2 herramientas de IA en su vida cotidiana y ha perdido el miedo inicial a la tecnología.',
    dark: false,
  },
  {
    num: '02',
    stage: 'Aplicar',
    title: 'Acompañamiento Profesional',
    tagline: 'Aplicar la IA en tu trabajo concreto',
    para: 'Para el profesional que quiere ir más allá del conocimiento general y aplicar la IA directamente a su cargo, función y responsabilidades reales. Dos caminos según tu necesidad.',
    sub: [
      {
        code: '02A',
        title: 'Orientación y herramientas',
        tagline: 'Él se orienta. Nosotros filtramos.',
        bullets: [
          'Diagnóstico de tu función y responsabilidades',
          'Selección de las 3–5 herramientas más útiles para tu cargo',
          'Sesiones prácticas con tus propios documentos y tareas',
          'Guía personalizada con ejemplos de tu sector',
          'Seguimiento posterior para resolver dudas reales',
        ],
      },
      {
        code: '02B',
        title: 'Construcción a medida',
        tagline: 'Él se luce. Nosotros construimos.',
        bullets: [
          'Levantamiento detallado de tu necesidad específica',
          'Diseño y construcción de la herramienta de IA',
          'Sesión de entrega y capacitación completa',
          'Ajustes post-entrega incluidos el primer mes',
          'Documentación simple de uso para el cliente',
        ],
      },
    ],
    result: 'El profesional trabaja de forma más eficiente en su cargo y puede demostrar resultados concretos en su organización.',
    dark: true,
  },
  {
    num: '03',
    stage: 'Escalar',
    title: 'Empresas y Grupos',
    tagline: 'Formación corporativa a medida',
    para: 'Para organizaciones, equipos, instituciones o gremios que necesitan capacitar a sus colaboradores de 45–60 años. Diseñado completamente a medida según el sector, nivel y necesidades del grupo.',
    bullets: [
      'Diagnóstico inicial del equipo y nivel de conocimiento en IA',
      'Diseño del programa formativo a medida para el sector',
      'Charlas, talleres y sesiones prácticas presenciales u online',
      'Herramientas específicas seleccionadas para el área',
      'Informe de avance y seguimiento de resultados',
      'Sesión de cierre y plan de próximos pasos',
    ],
    sectors: 'Educación superior · Salud · Servicios profesionales · Retail · Finanzas · Gobierno · Consultorías · Empresas familiares',
    formats: [
      { label: 'Charla introductoria', time: '2 hrs' },
      { label: 'Taller intensivo', time: '4–8 hrs' },
      { label: 'Programa por etapas', time: '4–8 semanas' },
      { label: 'Programa anual', time: 'Continuo' },
    ],
    result: 'El equipo cuenta con conocimiento práctico de IA aplicada a su función, reduce la brecha digital interna y mejora su productividad de forma medible.',
    dark: false,
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>('.svc-row').forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white">

      {/* Header */}
      <div className="site-max site-grid pt-80 s:pt-140 pb-60 s:pb-80">
        <div className="col-span-full s:col-start-2 s:col-span-14 flex flex-col s:flex-row s:items-end s:justify-between gap-40">
          <div>
            <p className="text-grey text-12 uppercase tracking-[0.12rem] font-medium mb-20">Servicios</p>
            <h2
              className="text-32 s:text-56 font-normal leading-[1.05] text-green"
              style={{ fontFamily: '"disp", Georgia, serif', maxWidth: '56rem' }}
            >
              Cada profesional necesita un camino distinto.
            </h2>
          </div>
          {/* Journey indicator */}
          <div className="flex items-center gap-0 flex-shrink-0">
            {JOURNEY.map((j, i) => (
              <div key={j.num} className="flex items-center">
                <div className="flex flex-col items-center px-16 s:px-20">
                  <span className="text-10 text-grey/50 font-medium tracking-[0.08rem] mb-4">{j.num}</span>
                  <span className="text-11 s:text-12 text-green font-medium uppercase tracking-[0.10rem]">{j.label}</span>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div style={{ width: '2.4rem', height: '1px', backgroundColor: '#DEDAD3' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="site-max">
        <div style={{ height: '1px', backgroundColor: '#DEDAD3' }} />
      </div>

      {/* Services */}
      {SERVICES.map((svc, si) => (
        <div
          key={svc.num}
          className={`svc-row ${svc.dark ? 'bg-green' : 'bg-white'}`}
        >
          <div className="site-max site-grid py-60 s:py-100">

            {/* Left: number + stage */}
            <div className="col-span-full s:col-start-2 s:col-span-3 flex s:flex-col justify-between s:justify-start gap-16 s:gap-24 mb-40 s:mb-0">
              <span
                className={`block text-80 s:text-[12rem] font-normal leading-none tracking-[-0.04em] ${svc.dark ? 'text-white/15' : 'text-black/8'}`}
                style={{ fontFamily: '"disp", Georgia, serif' }}
              >
                {svc.num}
              </span>
              <span className={`inline-block text-11 font-medium uppercase tracking-[0.12rem] px-12 py-8 self-start s:self-auto ${svc.dark ? 'bg-white/10 text-white/70' : 'bg-black/6 text-green/70'}`}>
                {svc.stage}
              </span>
            </div>

            {/* Right: content */}
            <div className="col-span-full s:col-start-6 s:col-span-10">

              <h3
                className={`text-28 s:text-44 font-normal leading-[1.08] mb-12 ${svc.dark ? 'text-white' : 'text-green'}`}
                style={{ fontFamily: '"disp", Georgia, serif' }}
              >
                {svc.title}
              </h3>
              <p className={`text-14 s:text-16 font-medium uppercase tracking-[0.10rem] mb-24 ${svc.dark ? 'text-white/50' : 'text-grey'}`}>
                {svc.tagline}
              </p>
              <p className={`text-16 leading-[1.7] mb-48 ${svc.dark ? 'text-white/70' : 'text-grey'}`} style={{ maxWidth: '64rem' }}>
                {svc.para}
              </p>

              {/* Modalities (service 01) */}
              {'modalities' in svc && svc.modalities && (
                <div className="grid grid-cols-1 s:grid-cols-2 gap-24 mb-48">
                  {svc.modalities.map((m) => (
                    <div key={m.label} className="border border-black/10 p-28 s:p-32">
                      <p className={`text-12 font-medium uppercase tracking-[0.12rem] mb-10 ${svc.dark ? 'text-white' : 'text-green'}`}>{m.label}</p>
                      <p className={`text-14 leading-[1.6] ${svc.dark ? 'text-white/60' : 'text-grey'}`}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-services 02A / 02B */}
              {'sub' in svc && svc.sub && (
                <div className="grid grid-cols-1 s:grid-cols-2 gap-40 s:gap-48 mb-48">
                  {svc.sub.map((s) => (
                    <div key={s.code}>
                      <div className="flex items-center gap-12 mb-16">
                        <span className={`text-11 font-medium uppercase tracking-[0.12rem] px-10 py-6 ${svc.dark ? 'bg-white/10 text-white/60' : 'bg-black/6 text-green/60'}`}>{s.code}</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: svc.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
                      </div>
                      <h4 className={`text-20 s:text-24 font-normal leading-[1.2] mb-8 ${svc.dark ? 'text-white' : 'text-green'}`} style={{ fontFamily: '"disp", Georgia, serif' }}>
                        {s.title}
                      </h4>
                      <p className={`text-12 italic mb-20 ${svc.dark ? 'text-white/40' : 'text-grey/60'}`}>{s.tagline}</p>
                      <ul className="space-y-10">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className={`flex items-start gap-12 text-14 leading-[1.5] ${svc.dark ? 'text-white/65' : 'text-grey'}`}>
                            <span className={`mt-[0.5em] flex-shrink-0 w-4 h-4 rounded-full ${svc.dark ? 'bg-white/30' : 'bg-green/30'}`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullets (service 01 and 03) */}
              {'bullets' in svc && !('sub' in svc) && svc.bullets && (
                <ul className="grid grid-cols-1 s:grid-cols-2 gap-x-40 gap-y-12 mb-48">
                  {svc.bullets.map((b, bi) => (
                    <li key={bi} className={`flex items-start gap-12 text-14 leading-[1.5] ${svc.dark ? 'text-white/65' : 'text-grey'}`}>
                      <span className={`mt-[0.55em] flex-shrink-0 w-4 h-4 rounded-full ${svc.dark ? 'bg-white/30' : 'bg-green/30'}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Sectors (service 03) */}
              {'sectors' in svc && svc.sectors && (
                <div className="mb-40">
                  <p className="text-12 text-grey/60 uppercase tracking-[0.12rem] mb-10">Sectores</p>
                  <p className="text-14 text-grey leading-[1.7]">{svc.sectors}</p>
                </div>
              )}

              {/* Formats (service 03) */}
              {'formats' in svc && svc.formats && (
                <div className="grid grid-cols-2 s:grid-cols-4 gap-16 mb-48">
                  {svc.formats.map((f) => (
                    <div key={f.label} className="border border-black/10 p-20">
                      <p className="text-20 font-normal text-green mb-4" style={{ fontFamily: '"disp", Georgia, serif' }}>{f.time}</p>
                      <p className="text-12 text-grey leading-[1.4]">{f.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Result */}
              <div className={`flex items-start gap-16 pt-32 border-t ${svc.dark ? 'border-white/15' : 'border-black/8'}`}>
                <span className={`text-10 font-medium uppercase tracking-[0.12rem] flex-shrink-0 mt-1 ${svc.dark ? 'text-white/40' : 'text-grey/50'}`}>Resultado</span>
                <p className={`text-14 leading-[1.6] italic ${svc.dark ? 'text-white/55' : 'text-grey'}`}>{svc.result}</p>
              </div>

            </div>
          </div>

          {si < SERVICES.length - 1 && (
            <div className={`site-max ${svc.dark ? 'hidden' : ''}`}>
              <div style={{ height: '1px', backgroundColor: '#DEDAD3' }} />
            </div>
          )}
        </div>
      ))}

      {/* CTA */}
      <div className="bg-yellow">
        <div className="site-max site-grid py-80 s:py-120">
          <div className="col-span-full s:col-start-2 s:col-span-14 flex flex-col s:flex-row s:items-center s:justify-between gap-40">
            <div>
              <h3
                className="text-28 s:text-48 font-normal leading-[1.1] text-green mb-16"
                style={{ fontFamily: '"disp", Georgia, serif' }}
              >
                ¿Por dónde empezamos?
              </h3>
              <p className="text-16 text-green/70 leading-[1.6]" style={{ maxWidth: '50rem' }}>
                Una conversación de 20 minutos puede cambiar la forma en que trabajas para siempre. Sin compromiso. Sin presión. Sin tecnicismos.
              </p>
            </div>
            <a
              href="mailto:contacto@orbbi.lat"
              className="flex-shrink-0 inline-flex items-center gap-10 text-12 font-medium uppercase tracking-[0.12rem] text-white bg-green px-32 py-18 hover:opacity-90 transition-opacity"
            >
              Conversemos
              <svg className="w-8 h-11" viewBox="0 0 8 11" fill="none"><path d="M1.73 1L6.23 5.5L1.73 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
