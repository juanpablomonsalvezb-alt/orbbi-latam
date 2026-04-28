export default function NebbulerSection() {
  return (
    <section id="desarrollo-web" className="bg-yellow">
      <div className="site-max py-80 s:py-120">
        <div className="site-grid items-center gap-y-40">

          {/* Left — texto */}
          <div className="col-span-full s:col-span-8">
            <p className="text-10 font-medium uppercase tracking-[0.28em] text-green/50 mb-20">
              Desarrollo Web · Plataforma propia
            </p>
            <h2
              className="text-32 s:text-52 font-normal text-green leading-[1.05] mb-24"
              style={{ fontFamily: '"disp", Georgia, serif' }}
            >
              Tu negocio también
              <br />
              <em>necesita una web.</em>
            </h2>
            <p className="text-14 s:text-16 text-green/70 leading-[1.75] mb-40" style={{ maxWidth: '44rem', fontFamily: 'system-ui, sans-serif' }}>
              Nebbuler es nuestra plataforma de construcción de sitios web profesionales.
              Diseñada para negocios de toda Latinoamérica — sin necesidad de contratar una agencia ni saber de tecnología.
            </p>

            <a
              href="https://landings.orbbilatam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-12 text-12 font-medium uppercase tracking-[0.14rem] text-white bg-green px-32 py-16 rounded-[10rem] hover:opacity-85 transition-opacity"
            >
              Crear mi sitio web
              <svg viewBox="0 0 16 16" fill="none" className="w-10 h-10">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right — features */}
          <div className="col-span-full s:col-start-10 s:col-span-7">
            <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(30,56,62,0.15)' }}>
              {[
                { n: '01', t: 'Listo en minutos', d: 'La IA construye tu sitio a partir de una descripción de tu negocio.' },
                { n: '02', t: 'Sin agencias ni código', d: 'Tú lo administras desde un panel simple. Sin intermediarios.' },
                { n: '03', t: 'Pago en tu moneda', d: 'Mercado Pago en LATAM y otras pasarelas según tu país.' },
                { n: '04', t: 'Optimizado para vender', d: 'Diseño profesional, velocidad y conversión desde el día uno.' },
              ].map(({ n, t, d }) => (
                <div
                  key={n}
                  className="flex items-start gap-20 py-24"
                  style={{ borderBottom: '1px solid rgba(30,56,62,0.15)' }}
                >
                  <span
                    className="text-11 text-green/30 font-medium flex-shrink-0 mt-2"
                    style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.12rem', minWidth: '2rem' }}
                  >
                    {n}
                  </span>
                  <div>
                    <p
                      className="text-16 s:text-18 font-normal text-green leading-[1.2] mb-8"
                      style={{ fontFamily: '"disp", Georgia, serif' }}
                    >
                      {t}
                    </p>
                    <p className="text-12 text-green/60 leading-[1.65]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://landings.orbbilatam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-8 mt-32 text-11 font-medium uppercase tracking-[0.14rem] text-green/60 hover:text-green transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Ver landings.orbbilatam.com
              <svg viewBox="0 0 12 12" fill="none" className="w-8 h-8">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
