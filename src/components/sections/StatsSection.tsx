'use client'
import { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import type { LottieRefCurrentProps } from 'lottie-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import growthAnim from '../../../public/animations/growth.json'
import statsAnim from '../../../public/animations/stats.json'
import lightbulbAnim from '../../../public/animations/lightbulb.json'
import clockAnim from '../../../public/animations/clock.json'

gsap.registerPlugin(ScrollTrigger)

const BG: Record<string, string> = {
  yellow: '#FCDC9B',
  green: '#6da479',
  grey:   '#7A7871',
  black:  '#292929',
}
const TC: Record<string, string> = {
  black: '#1E383E',
  white: '#F7F5F2',
}

const STATS = [
  {
    bg: 'yellow', tc: 'black',
    number: '17 millones de empleos en Latam serán transformados por la IA',
    desc: 'Según la OIT 2024, ninguna región del mundo enfrenta una transformación laboral tan acelerada como América Latina. Los profesionales con experiencia son los que más tienen que ganar — si saben cómo usarla.',
  },
  {
    bg: 'green', tc: 'white',
    number: 'Solo el 34% de los profesionales mayores de 45 usa IA en el trabajo',
    desc: 'Versus el 57% de los menores de 35 (LSE 2025). La brecha existe. Crece cada mes. Y no es por falta de capacidad — es por falta de formación diseñada para esta generación.',
  },
  {
    bg: 'grey', tc: 'white',
    number: '60% quiere aprender IA pero no sabe cómo empezar',
    desc: 'La intención existe. El camino no. La mayoría de los recursos de formación en IA están diseñados para el mundo joven y digital — no para quienes llevan 20 años construyendo algo valioso.',
  },
  {
    bg: 'black', tc: 'white',
    number: '1 de cada 2 ejecutivos teme quedar obsoleto por la IA',
    desc: 'No es miedo al futuro. Es la presión del presente. Tu empresa la menciona en cada reunión. Tus colegas más jóvenes ya la usan. Nosotros te mostramos el camino.',
  },
]

const ANIMATIONS = [growthAnim, statsAnim, lightbulbAnim, clockAnim]

function StatLottie({ animData, playing }: { animData: object; playing: boolean }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (!lottieRef.current) return
    if (playing) {
      lottieRef.current.play()
    } else {
      lottieRef.current.stop()
    }
  }, [playing])

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animData}
      loop
      autoplay={false}
      style={{ width: '100%', maxWidth: '32rem', height: 'auto' }}
    />
  )
}

export default function StatsSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const stickyHeaderRef = useRef<HTMLDivElement>(null)
  const lottieRef0      = useRef<LottieRefCurrentProps>(null)
  const lottieRef1      = useRef<LottieRefCurrentProps>(null)
  const lottieRef2      = useRef<LottieRefCurrentProps>(null)
  const lottieRef3      = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header  = stickyHeaderRef.current
    if (!section) return

    const textEls = section.querySelectorAll<HTMLElement>('.stat-text')
    const articles = section.querySelectorAll<HTMLElement>('[data-stat]')
    const allLottieRefs = [lottieRef0, lottieRef1, lottieRef2, lottieRef3]
    const triggers: ScrollTrigger[] = []
    const activators: (() => void)[] = []

    articles.forEach((article, i) => {
      const stat = STATS[i]
      if (!stat) return
      const bg = BG[stat.bg]
      const tc = TC[stat.tc]

      const activate = () => {
        gsap.to(section,  { backgroundColor: bg, duration: 0.6, ease: 'power2.out' })
        gsap.to(textEls,  { color: tc, duration: 0.6, ease: 'power2.out' })
        if (header) gsap.to(header, { backgroundColor: bg, duration: 0.6, ease: 'power2.out' })
        allLottieRefs.forEach((ref, j) => {
          if (!ref.current) return
          if (j === i) ref.current.play()
          else ref.current.stop()
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

    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      articles.forEach((article, i) => {
        const rect = article.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) activators[i]?.()
      })
    }, 150)

    return () => { clearTimeout(t); triggers.forEach(tr => tr.kill()) }
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ backgroundColor: BG.yellow }}>
      <hr className="m-0 w-full border-none" style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />

      <div className="relative w-full">
        <div className="site-max site-grid relative pt-60 s:pt-120 pb-60 s:pb-0">

          {/* Sticky left header */}
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
            {STATS.map((stat, i) => (
              <article
                key={i}
                data-stat={i}
                className="relative flex flex-col items-start pt-0 pb-60 s:pb-[9.6rem] s:pl-[9.6rem] s:pr-[9.6rem] gap-40 s:gap-65"
              >
                {i > 0 && (
                  <div className="absolute top-0 left-0 s:left-[-1.2rem] w-full s:w-[100vw] stat-text"
                    style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />
                )}

                {/* Lottie animation */}
                <div className="w-full flex justify-center items-center" style={{ minHeight: '20rem' }}>
                  <Lottie
                    lottieRef={[lottieRef0, lottieRef1, lottieRef2, lottieRef3][i]}
                    animationData={ANIMATIONS[i]}
                    loop
                    autoplay={false}
                    style={{ width: '100%', maxWidth: i >= 2 ? '25.9rem' : '32.4rem', height: 'auto' }}
                  />
                </div>

                {/* Text */}
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
                  <div className="absolute bottom-0 left-0 s:left-[-1.2rem] w-full s:w-[100vw] stat-text"
                    style={{ height: '1px', backgroundColor: 'currentColor', opacity: 0.2 }} />
                )}
              </article>
            ))}
          </div>

          <div className="absolute hidden s:block top-0 left-1/2 -translate-x-1/2 stat-text"
            style={{ width: '1px', height: '100%', backgroundColor: 'currentColor', opacity: 0.2 }} />
        </div>
      </div>
    </section>
  )
}
