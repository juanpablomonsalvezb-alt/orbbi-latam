'use client'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:'#0A0A0B', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap" style={{ padding:'6rem 0' }}>
        <div style={{ display:'flex',flexDirection:'column',gap:'4rem' }} className="l:flex-row l:items-end l:justify-between">
          <div style={{ display:'flex',flexDirection:'column',gap:'1.6rem' }}>
            <span style={{ fontFamily:'"disp"',fontSize:'2.4rem',color:'rgba(255,255,255,0.9)',letterSpacing:'-0.02em' }}>Orbbi</span>
            <p style={{ fontSize:'1.4rem',color:'rgba(255,255,255,0.3)',maxWidth:'36rem',lineHeight:1.7 }}>
              Consultora de IA para mujeres profesionales en Latinoamérica. Formación, orientación y herramientas a medida.
            </p>
          </div>
          <div style={{ display:'flex',gap:'6rem',flexWrap:'wrap' }}>
            {[
              { h:'Programas', items:[['Formación Esencial','/#programas'],['Orientación 1:1','/#programas'],['Herramienta a Medida','/#programas'],['Corporativos','/#programas']] },
              { h:'Empresa',   items:[['Para quién','/#para-quién'],['Método','/#metodo'],['Testimonios','/#testimonios'],['Contacto','/#contacto']] },
            ].map(col=>(
              <div key={col.h} style={{ display:'flex',flexDirection:'column',gap:'1.2rem' }}>
                <p style={{ fontSize:'1.1rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.16em',color:'rgba(255,255,255,0.22)' }}>{col.h}</p>
                {col.items.map(([l,h])=>(
                  <a key={l} href={h} style={{ fontSize:'1.3rem',color:'rgba(255,255,255,0.38)',cursor:'none',transition:'color .3s' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.38)')}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem',paddingTop:'4rem',marginTop:'4rem',borderTop:'1px solid rgba(255,255,255,0.06)' }} className="s:flex-row s:justify-between s:items-center">
          <p style={{ fontSize:'1.2rem',color:'rgba(255,255,255,0.2)' }}>© {year} Orbbi Latam · Todos los derechos reservados</p>
          <div style={{ display:'flex',gap:'2.4rem' }}>
            {['Privacidad','Términos'].map(t=>(
              <a key={t} href="#" style={{ fontSize:'1.2rem',color:'rgba(255,255,255,0.2)',cursor:'none',transition:'color .3s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.2)')}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
