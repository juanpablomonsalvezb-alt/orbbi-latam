'use client'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:'#1C1C1A' }}>
      <div className="wrap" style={{ paddingTop:'10rem',paddingBottom:'5rem' }}>
        <div className="line-gold" style={{ marginBottom:'6rem' }} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'4.8rem' }} className="s:grid-cols-[2fr_1fr_1fr_1fr]">
          <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            <span style={{ fontFamily:'"sans"',fontWeight:500,letterSpacing:'0.12em',fontSize:'1.3rem',color:'#F7F3EE' }}>ORBBI LATAM</span>
            <p style={{ fontSize:'1.4rem',lineHeight:1.8,color:'rgba(247,243,238,0.32)',maxWidth:'28rem' }}>Formamos a mujeres líderes en Latinoamérica para dominar la inteligencia artificial. Con impacto real.</p>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.3rem',color:'rgba(247,243,238,0.4)',cursor:'none',transition:'color .3s' }} onMouseEnter={e=>(e.currentTarget.style.color='#D4AD70')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(247,243,238,0.4)')}>contacto@orbbilatam.com</a>
          </div>
          {[
            { h:'Programas', items:[['Formación Esencial','/#servicios'],['Orientación Profesional','/#servicios'],['Herramienta a Medida','/#servicios'],['Corporativos','/#servicios']] },
            { h:'Empresa',   items:[['Para quién','/#para-quien'],['Método','/#metodo'],['Testimonios','/#testimonios'],['Contacto','/#contacto']] },
            { h:'Latam',     items:[['Chile','#'],['México','#'],['Colombia','#'],['Argentina','#'],['Perú','#'],['Ecuador','#']] },
          ].map(col=>(
            <div key={col.h} style={{ display:'flex',flexDirection:'column',gap:'1.6rem' }}>
              <p style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.16em',color:'rgba(247,243,238,0.22)' }}>{col.h}</p>
              <ul style={{ display:'flex',flexDirection:'column',gap:'1rem',listStyle:'none' }}>
                {col.items.map(([label,href])=>(
                  <li key={label}><a href={href} style={{ fontSize:'1.3rem',color:'rgba(247,243,238,0.4)',cursor:'none',transition:'color .3s' }} onMouseEnter={e=>(e.currentTarget.style.color='#D4AD70')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(247,243,238,0.4)')}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'1.2rem',paddingTop:'3.2rem',marginTop:'4rem',borderTop:'1px solid rgba(247,243,238,0.07)' }} className="s:flex-row s:justify-between s:items-center">
          <p style={{ fontSize:'1.2rem',color:'rgba(247,243,238,0.2)' }}>© {year} Orbbi Latam · Todos los derechos reservados</p>
          <div style={{ display:'flex',gap:'2.4rem' }}>
            {['Privacidad','Términos'].map(t=><a key={t} href="#" style={{ fontSize:'1.2rem',color:'rgba(247,243,238,0.2)',cursor:'none',transition:'color .3s' }} onMouseEnter={e=>(e.currentTarget.style.color='rgba(212,173,112,0.6)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(247,243,238,0.2)')}>{t}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
