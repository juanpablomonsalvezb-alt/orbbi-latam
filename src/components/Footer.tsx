'use client'
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background:'#06060A', position:'relative', zIndex:2 }}>
      <div className="wrap" style={{ paddingTop:'10rem', paddingBottom:'5rem' }}>
        <div className="line-gold mb-60 s:mb-80" />

        <div className="grid grid-cols-1 s:grid-cols-[2fr_1fr_1fr_1fr] gap-48 s:gap-32 pb-48 s:pb-64" style={{ borderBottom:'1px solid rgba(201,169,110,0.07)' }}>

          {/* Brand */}
          <div className="flex flex-col gap-20">
            <span style={{ fontFamily:'"sans",system-ui,sans-serif', fontWeight:500, letterSpacing:'0.12em', fontSize:'1.3rem', color:'#C9A96E' }}>
              ORBBI LATAM
            </span>
            <p style={{ fontSize:'1.4rem', lineHeight:1.8, color:'rgba(242,237,228,0.32)', maxWidth:'28rem' }}>
              Formamos a mujeres líderes en Latinoamérica para dominar la inteligencia artificial. Sin tecnicismos. Con impacto real.
            </p>
            <a
              href="mailto:contacto@orbbilatam.com"
              style={{ fontSize:'1.3rem', color:'rgba(242,237,228,0.35)', transition:'color 0.3s', cursor:'none' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,237,228,0.35)')}
            >
              contacto@orbbilatam.com
            </a>
          </div>

          {[
            { heading:'Programas', items:[['Formación Esencial','/#servicios'],['Orientación Profesional','/#servicios'],['Herramienta a Medida','/#servicios'],['Programas Corporativos','/#servicios']] },
            { heading:'Empresa',   items:[['Para quién','/#para-quien'],['Método','/#metodo'],['Testimonios','/#testimonios'],['Contacto','/#contacto']] },
            { heading:'Latam',     items:[['Chile','#'],['México','#'],['Colombia','#'],['Argentina','#'],['Perú','#'],['Ecuador','#']] },
          ].map(col => (
            <div key={col.heading} className="flex flex-col gap-16">
              <p style={{ fontSize:'1.1rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.16em', color:'rgba(242,237,228,0.22)' }}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-10">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      style={{ fontSize:'1.3rem', color:'rgba(242,237,228,0.38)', transition:'color 0.3s', cursor:'none' }}
                      onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
                      onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,237,228,0.38)')}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col s:flex-row items-start s:items-center justify-between gap-12 pt-32">
          <p style={{ fontSize:'1.2rem', color:'rgba(242,237,228,0.18)' }}>
            © {year} Orbbi Latam · Todos los derechos reservados
          </p>
          <div className="flex gap-24">
            {['Privacidad','Términos'].map(t => (
              <a key={t} href="#" style={{ fontSize:'1.2rem', color:'rgba(242,237,228,0.18)', transition:'color 0.3s', cursor:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(201,169,110,0.5)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,237,228,0.18)')}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
