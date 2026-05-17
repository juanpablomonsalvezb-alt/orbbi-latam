'use client'

/* Harvey footer: dark bg, big serif logo mark "H" bottom-center, footer links */
export default function Footer() {
  const year = new Date().getFullYear()
  const COLS = [
    { h:'Plataforma', links:['Formación Esencial','Orientación 1:1','Herramienta a Medida','Corporativos'] },
    { h:'Soluciones', links:['Ejecutivas','Emprendedoras','Docentes','Consultoras'] },
    { h:'Empresa',    links:['Nosotros','Blog','Clientes','Prensa'] },
    { h:'Recursos',   links:['FAQ','Contacto','LinkedIn','Newsletter'] },
  ]

  return (
    <footer className="sec-dark" style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
      <div className="wrap" style={{ paddingTop:'6rem', paddingBottom:'5rem' }}>

        {/* Top: columns */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'4rem', marginBottom:'6rem' }} className="s:grid-cols-2 l:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            <span style={{ fontFamily:'"disp"',fontSize:'2rem',color:'rgba(255,255,255,0.9)',letterSpacing:'-.02em' }}>Orbbi</span>
            <p style={{ fontSize:'1.4rem',color:'rgba(255,255,255,0.35)',maxWidth:'28rem',lineHeight:1.7 }}>
              IA diseñada para mujeres profesionales en Latinoamérica. Formación, orientación y herramientas a medida.
            </p>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.3rem',color:'rgba(255,255,255,0.4)',cursor:'none',transition:'color .3s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.4)')}
            >contacto@orbbilatam.com</a>
          </div>
          {COLS.map(col=>(
            <div key={col.h} style={{ display:'flex',flexDirection:'column',gap:'1.6rem' }}>
              <p style={{ fontSize:'1.2rem',fontWeight:500,color:'rgba(255,255,255,0.28)',textTransform:'uppercase',letterSpacing:'.14em' }}>{col.h}</p>
              <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
                {col.links.map(l=>(
                  <a key={l} href="#" style={{ fontSize:'1.3rem',color:'rgba(255,255,255,0.42)',cursor:'none',transition:'color .3s' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.42)')}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Harvey signature: BIG logomark centered */}
        <div style={{ textAlign:'center', padding:'4rem 0', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', margin:'0 0 4rem' }}>
          <span style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(8rem,15vw,20rem)', fontWeight:'normal', color:'rgba(255,255,255,0.07)', lineHeight:1, userSelect:'none', letterSpacing:'-.03em', display:'block' }}>
            Orbbi
          </span>
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }} className="s:flex-row s:items-center s:justify-between">
          <p style={{ fontSize:'1.2rem',color:'rgba(255,255,255,0.22)' }}>© {year} Orbbi Latam. Todos los derechos reservados.</p>
          <div style={{ display:'flex',gap:'2.4rem' }}>
            {['Privacidad','Términos','Cookies'].map(t=>(
              <a key={t} href="#" style={{ fontSize:'1.2rem',color:'rgba(255,255,255,0.22)',cursor:'none',transition:'color .3s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.6)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.22)')}
              >{t}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
