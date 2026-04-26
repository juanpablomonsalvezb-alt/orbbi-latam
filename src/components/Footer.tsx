'use client'

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F]">

      {/* Main grid */}
      <div className="site-max pt-80 s:pt-120 pb-60">
        <div className="grid grid-cols-1 s:grid-cols-[2fr_1fr_1fr_1fr] gap-60 s:gap-40 pb-60 s:pb-80" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Col 1 — Brand */}
          <div>
            <span style={{
              fontFamily: '"sans", system-ui, sans-serif',
              fontWeight: 500, letterSpacing: '0.08em',
              fontSize: '1.4rem', lineHeight: 1,
              color: 'white', display: 'block', marginBottom: '2rem'
            }}>
              ORBBI LATAM
            </span>
            <p className="text-white/40 text-13 leading-[1.8] mb-32" style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '28rem' }}>
              Inteligencia artificial para profesionales de 45 a 60 años en Latinoamérica. Sin tecnicismos. Con resultados reales.
            </p>
            <a
              href="mailto:contacto@orbbilatam.com"
              className="text-white/60 text-13 hover:text-white transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              contacto@orbbilatam.com
            </a>
          </div>

          {/* Col 2 — Servicios */}
          <div>
            <p className="text-white/25 text-11 uppercase tracking-[0.16rem] mb-20" style={{ fontFamily: 'system-ui, sans-serif' }}>Servicios</p>
            <ul className="space-y-12">
              {[
                { label: 'Formación Esencial', href: '/#servicios' },
                { label: 'Orientación Profesional', href: '/#servicios' },
                { label: 'Herramienta a Medida', href: '/#servicios' },
                { label: 'Para Empresas', href: '/#servicios' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/50 text-13 hover:text-white transition-colors leading-none" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Empresa */}
          <div>
            <p className="text-white/25 text-11 uppercase tracking-[0.16rem] mb-20" style={{ fontFamily: 'system-ui, sans-serif' }}>Empresa</p>
            <ul className="space-y-12">
              {[
                { label: 'Blog', href: '/#publicaciones' },
                { label: 'Contacto', href: '/#contacto' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-white/50 text-13 hover:text-white transition-colors leading-none" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Países */}
          <div>
            <p className="text-white/25 text-11 uppercase tracking-[0.16rem] mb-20" style={{ fontFamily: 'system-ui, sans-serif' }}>Disponible en</p>
            <p className="text-white/35 text-12 leading-[2]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Chile<br/>México<br/>Colombia<br/>Argentina<br/>Perú<br/>Ecuador<br/>Uruguay
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col s:flex-row items-start s:items-center justify-between gap-16 pt-32">
          <p className="text-white/20 text-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
            © 2026 Orbbi Latam · Todos los derechos reservados
          </p>
          <div className="flex gap-24">
            {['Política de Privacidad', 'Términos de Uso'].map(item => (
              <a key={item} href="#" className="text-white/20 text-12 hover:text-white/50 transition-colors" style={{ fontFamily: 'system-ui, sans-serif' }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
