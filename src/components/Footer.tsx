'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#080810', position: 'relative', zIndex: 2 }}>
      <div className="site-max pt-80 s:pt-120 pb-60">

        {/* Top grid */}
        <div
          className="grid grid-cols-1 s:grid-cols-[2fr_1fr_1fr_1fr] gap-60 s:gap-40 pb-60 s:pb-80"
          style={{ borderBottom: '1px solid rgba(201,169,110,0.08)' }}
        >
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: '"sans", system-ui, sans-serif',
              fontWeight: 500, letterSpacing: '0.10em',
              fontSize: '1.4rem', lineHeight: 1,
              color: '#C9A96E', display: 'block', marginBottom: '2.4rem',
            }}>
              ORBBI LATAM
            </span>
            <p className="text-13 leading-[1.9] mb-32" style={{ color: 'rgba(245,240,232,0.35)', fontFamily: 'system-ui, sans-serif', maxWidth: '28rem' }}>
              Formamos a mujeres profesionales de Latinoamérica para liderar con inteligencia artificial. Sin tecnicismos. Con impacto real.
            </p>
            <a href="mailto:contacto@orbbilatam.com" className="text-13" style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'system-ui, sans-serif', transition: 'color 0.3s', cursor: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.45)')}
            >
              contacto@orbbilatam.com
            </a>
          </div>

          {/* Programas */}
          <div>
            <p className="text-11 uppercase tracking-[0.16rem] mb-20" style={{ color: 'rgba(245,240,232,0.25)', fontFamily: 'system-ui, sans-serif' }}>Programas</p>
            <ul className="flex flex-col gap-12">
              {[
                ['Formación Esencial', '/#servicios'],
                ['Orientación Profesional', '/#servicios'],
                ['Herramienta a Medida', '/#servicios'],
                ['Programas Corporativos', '/#servicios'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-13 leading-none" style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'system-ui, sans-serif', transition: 'color 0.3s', cursor: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.45)')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="text-11 uppercase tracking-[0.16rem] mb-20" style={{ color: 'rgba(245,240,232,0.25)', fontFamily: 'system-ui, sans-serif' }}>Empresa</p>
            <ul className="flex flex-col gap-12">
              {[
                ['Para quién', '/#para-quien'],
                ['Método', '/#metodo'],
                ['Testimonios', '/#testimonios'],
                ['Contacto', '/#contacto'],
                ['LinkedIn', 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-13 leading-none"
                    style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'system-ui, sans-serif', transition: 'color 0.3s', cursor: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.45)')}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Países */}
          <div>
            <p className="text-11 uppercase tracking-[0.16rem] mb-20" style={{ color: 'rgba(245,240,232,0.25)', fontFamily: 'system-ui, sans-serif' }}>Disponible en</p>
            <p className="text-12 leading-[2.2]" style={{ color: 'rgba(245,240,232,0.30)', fontFamily: 'system-ui, sans-serif' }}>
              Chile<br />México<br />Colombia<br />Argentina<br />Perú<br />Ecuador<br />Uruguay
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col s:flex-row items-start s:items-center justify-between gap-16 pt-32">
          <p className="text-12" style={{ color: 'rgba(245,240,232,0.18)', fontFamily: 'system-ui, sans-serif' }}>
            © {year} Orbbi Latam · Todos los derechos reservados
          </p>
          <div className="flex gap-24">
            {['Política de Privacidad', 'Términos de Uso'].map(item => (
              <a key={item} href="#" className="text-12"
                style={{ color: 'rgba(245,240,232,0.18)', fontFamily: 'system-ui, sans-serif', transition: 'color 0.3s', cursor: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.18)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
