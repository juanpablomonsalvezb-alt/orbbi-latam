'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* Harvey UseCaseTickerSection — exact visual behavior:
   - bg: #FAFAF9
   - Left label: small sans, dark, max 200px
   - Center: 56px serif list, opacity fades by distance from active
     active=1.0, ±1=0.6, ±2=0.3, ±3=0.1
   - Right: "Ver plataforma" outlined button
   - Auto-cycles every 2.2s (no 1500vh scroll bloat)
*/

const FEATURES = [
  'ChatGPT & Claude al máximo',
  'IA para tu profesión específica',
  'Automatización sin código',
  'Herramientas de imagen y video',
  'Productividad con IA',
  'Tu programa elegido',
  'Resultados medibles',
]

export default function FeaturesSection() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startCycle() {
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % FEATURES.length)
    }, 2200)
  }

  useEffect(() => {
    startCycle()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <section className="sec-dark" style={{ padding: '144px 0', overflow: 'hidden' }}>
      <div className="page-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            alignItems: 'center',
            gap: 40,
          }}
          className="features-grid"
        >

          {/* Left */}
          <p className="t-body" style={{ color: 'rgba(250,250,249,0.5)', maxWidth: 200, lineHeight: '22px' }}>
            Los mejores profesionales de Latam eligen Orbbi para
          </p>

          {/* Center: opacity-fade list */}
          <div style={{ overflow: 'hidden' }}>
            {FEATURES.map((f, i) => {
              const dist = Math.abs(i - active)
              const wrapDist = Math.min(dist, FEATURES.length - dist)
              const op = wrapDist === 0 ? 1 : wrapDist === 1 ? 0.6 : wrapDist === 2 ? 0.3 : 0.1
              const isActive = i === active
              return (
                <button
                  key={f}
                  onClick={() => {
                    setActive(i)
                    if (intervalRef.current) clearInterval(intervalRef.current)
                    startCycle()
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'none',
                    fontFamily: '"disp",Georgia,serif',
                    fontSize: 56,
                    lineHeight: '62px',
                    letterSpacing: '-0.56px',
                    fontWeight: 400,
                    color: isActive ? '#FAFAF9' : 'rgba(250,250,249,0.4)',
                    opacity: op,
                    transition: 'opacity .5s cubic-bezier(.16,1,.3,1), color .5s cubic-bezier(.16,1,.3,1)',
                    userSelect: 'none',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start', paddingTop: 8 }}>
            <a href="/#contacto" className="btn-login">
              Ver plataforma
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
