'use client'

import { useState } from 'react'

const LogoSVG = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.98 16.58">
    <path d="M71.88,7.06l-1.45.59c.58.77.97,1.67.97,2.81,0,2.53-2.05,4.59-4.58,4.59s-4.58-2.06-4.58-4.59c0-1.53.9-2.68,2.3-3.98l1.28,1.12c-1.02.93-1.6,1.86-1.6,2.96,0,1.44,1.17,2.6,2.6,2.6s2.6-1.17,2.6-2.6c0-1.25-.78-2.26-1.46-2.91,1.1-1.03,2.73-2.58,2.73-4.94,0-.68-.11-1.33-.32-1.94h-1.65c.28.59.43,1.25.43,1.94,0,1.53-.9,2.68-2.3,3.98l-1.28-1.12c1.02-.93,1.6-1.86,1.6-2.96,0-1.44-1.17-2.6-2.6-2.6s-2.6,1.17-2.6,2.6c0,1.25.78,2.26,1.46,2.91-1.1,1.03-2.73,2.58-2.73,4.94,0,3.38,2.74,6.12,6.11,6.12s6.11-2.75,6.11-6.12c0-1.4-.45-2.51-1.04-3.4h0ZM66.82,8.47c.4.36,1.25,1.24,1.25,2.19,0,.69-.56,1.26-1.25,1.26s-1.25-.56-1.25-1.26c0-.95.85-1.83,1.25-2.19ZM63.32,2.51c0-.69.56-1.26,1.25-1.26s1.25.56,1.25,1.26c0,.95-.85,1.83-1.25,2.19-.4-.36-1.25-1.24-1.25-2.19Z" />
    <path d="M7.2.33C2.18.33,0,4.36,0,8.32s2.18,7.86,7.2,7.86,7.13-3.92,7.13-7.86S12.17.33,7.2.33ZM7.2,14.45c-3.55,0-5.08-3.06-5.08-6.12S3.65,2.07,7.2,2.07s5.02,3.15,5.02,6.25-1.52,6.12-5.02,6.12Z" />
    <path d="M22.47,10.42c0,1.82-.11,2.48-.68,3.19-.49.6-1.02.94-1.9.94-.98,0-1.56-.45-1.79-.81-.34-.47-.43-1.05-.43-2.5v-5.72h-1.9v5.72c0,1.78.09,2.59.75,3.49.73.98,1.84,1.35,2.84,1.35,1.79,0,2.9-1.09,3.14-1.93v1.67h1.86V5.51h-1.88v4.91Z" />
    <path d="M43.05,5.24c-3.1,0-4.72,2.61-4.72,5.44s1.5,5.4,4.95,5.4c2.44,0,4.02-1.88,4.31-3.3l-1.82-.39c-.21.98-.96,2.2-2.59,2.2-2.07,0-2.93-1.78-2.95-3.47h7.48c.02-.09.02-.26.02-.41,0-3.13-1.71-5.48-4.7-5.48ZM40.28,9.65c0-1.61,1-2.93,2.78-2.93s2.71,1.54,2.71,2.93h-5.49Z" />
    <path d="M57.13,6.59c-.73-.98-1.84-1.35-2.84-1.35-1.79,0-2.97,1.09-3.2,1.93v-1.65h-1.86v10.3h1.9v-4.92c0-1.67.11-2.48.66-3.19.47-.6,1.09-.94,1.96-.94.96,0,1.56.45,1.79.81.34.47.43,1.05.43,2.5v5.74h1.88v-5.74c0-1.78-.06-2.59-.73-3.49h0Z" />
    <path d="M35.44,2.77h0V.77l-1.9.77v3.98h-4.19V.77l-1.9.77v3.98h-1.99v1.52h1.99v6.49c0,1.67,1,2.44,2.61,2.44.64,0,1.17-.11,1.47-.17v-1.52c-.32.06-.71.11-1.02.11-.75,0-1.15-.32-1.15-1.31v-6.04h4.19v6.49c0,1.67,1,2.44,2.61,2.44.64,0,1.17-.11,1.47-.17v-1.52c-.32.06-.71.11-1.02.11-.75,0-1.15-.32-1.15-1.31v-6.04h2.18v-1.52h-2.18v-2.74Z" />
    <path d="M95.32,5.24c-3.23,0-4.98,2.78-4.98,5.44s1.75,5.4,4.98,5.4,4.95-2.76,4.95-5.4-1.75-5.44-4.95-5.44ZM95.32,14.55c-2.07,0-3.05-2.01-3.05-3.88s.98-3.92,3.05-3.92,3.01,2.05,3.01,3.92-.96,3.88-3.01,3.88Z" />
    <path d="M121.17,5.24c-3.1,0-4.72,2.61-4.72,5.44s1.5,5.4,4.95,5.4c2.44,0,4.02-1.88,4.31-3.3l-1.82-.39c-.21.98-.96,2.2-2.58,2.2-2.07,0-2.93-1.78-2.95-3.47h7.48c.02-.09.02-.26.02-.41,0-3.13-1.71-5.48-4.7-5.48ZM118.39,9.65c0-1.61,1-2.93,2.78-2.93s2.71,1.54,2.71,2.93h-5.49Z" />
    <path d="M135.25,6.59h0c-.73-.98-1.84-1.35-2.84-1.35-1.79,0-2.97,1.09-3.2,1.93v-1.65h-1.86v10.3h1.9v-4.92c0-1.67.11-2.48.66-3.19.47-.6,1.09-.94,1.97-.94.96,0,1.56.45,1.79.81.34.47.43,1.05.43,2.5v5.74h1.88v-5.74c0-1.78-.07-2.59-.73-3.49Z" />
    <polygon points="101.75 15.82 103.65 15.82 103.65 0 101.75 .77 101.75 15.82" />
    <path d="M82.11,9.31h4.8c-.09,3.9-2.5,5.14-4.53,5.14-3.38,0-5.06-2.87-5.06-6.19s1.84-6.19,5.06-6.19c2.09,0,3.46,1.26,4.17,2.89l1.91-.77c-1.02-2.22-3.06-3.85-6.08-3.85-4.55,0-7.18,3.7-7.18,7.92s2.52,7.92,7.09,7.92c2.44,0,3.84-1.11,4.66-2.55v2.18h1.92V7.65h-6.77v1.65Z" />
    <path d="M113.03,7.02h0c-.43-.94-1.75-1.78-3.08-1.78-3.59,0-4.83,3.17-4.83,5.44,0,2.08,1.11,5.4,4.74,5.4,1.37,0,2.82-.81,3.23-1.82v1.56h1.84V0l-1.9.77v6.25ZM110.14,14.55h0c-2.24,0-3.1-2.27-3.1-3.9,0-1.9.98-3.9,3.18-3.9,1.02,0,2.84.77,2.84,3.92s-1.82,3.88-2.93,3.88Z" />
  </svg>
)

type AccordionProps = { title: string; children: React.ReactNode }

function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 s:border-none">
      <button
        className="w-full flex items-center justify-between py-16 s:py-0 s:cursor-default text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-12 text-grey uppercase tracking-[0.12rem] font-medium">{title}</span>
        <span className="s:hidden text-white/40 text-16">{open ? '−' : '+'}</span>
      </button>
      <div className={`s:block overflow-hidden transition-all duration-300 ${open ? 'max-h-[100rem]' : 'max-h-0 s:max-h-none'}`}>
        {children}
      </div>
    </div>
  )
}

export default function Footer() {
  const allEmployeesLinks = [
    'Profesionales 45-60', 'Gerentes y directores', 'Contadores y financieros', 'Abogados independientes',
    'Docentes universitarios', 'Dueños de negocio', 'Consultores', 'Administrativos sénior',
    'Médicos y especialistas', 'Comerciales y vendedores',
  ]

  const execLinks = [
    { label: 'Formación Esencial', href: '/#servicios' },
    { label: 'Orientación Profesional', href: '/#servicios' },
    { label: 'Herramienta a Medida', href: '/#servicios' },
    { label: 'Para Empresas', href: '/#servicios' },
  ]
  const whistleblowerLinks = [
    { label: 'Desmitificar la IA', href: '/#servicios' },
    { label: 'Aplicar en tu trabajo', href: '/#servicios' },
    { label: 'Construir a medida', href: '/#servicios' },
  ]
  const newsroomLinks = [
    { label: 'Blog', href: '/#publicaciones' },
  ]
  const ogLinks = [
    { label: 'Sobre nosotros', href: '/#contacto' },
    { label: 'Contacto', href: '/#contacto' },
  ]

  return (
    <footer className="bg-[#0F0F0F]">
      {/* Top section */}
      <div className="site-max py-40 s:py-60">
        <div className="flex flex-col s:flex-row items-start s:items-center justify-between gap-24 pb-40 s:pb-60 border-b border-white/10">
          <div className="flex flex-col gap-12">
            <LogoSVG className="w-[13.5rem] fill-white" />
            <p className="text-white/40 text-12 max-w-[40rem] leading-[1.6]">
              Inteligencia Artificial para los que ya saben trabajar.
            </p>
          </div>
          <button className="btn-link text-green border-green hover:bg-green hover:text-white flex-shrink-0">
            Habla con nosotros
          </button>
        </div>
      </div>

      {/* Nav grid */}
      <div className="site-max pb-60 s:pb-80">
        <div className="grid grid-cols-1 s:grid-cols-[repeat(16,minmax(0,1fr))] gap-0 s:gap-x-25">
          {/* All Employees - cols 1-5 */}
          <div className="s:col-span-5">
            <Accordion title="Para quién">
              <ul className="flex flex-col gap-4 pb-20 s:pb-0 s:pt-16">
                {allEmployeesLinks.map((link) => (
                  <li key={link}>
                    <a href="/#contacto" className="text-12 text-white/60 hover:text-white transition-colors leading-[2.0]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>

          {/* Middle column - cols 6-10 */}
          <div className="s:col-start-6 s:col-span-5 flex flex-col gap-0 s:gap-40">
            <Accordion title="Nuestros Servicios">
              <ul className="flex flex-col gap-4 pb-20 s:pb-0 s:pt-16">
                {execLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-12 text-white/60 hover:text-white transition-colors leading-[2.0]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Metodología">
              <ul className="flex flex-col gap-4 pb-20 s:pb-0 s:pt-16">
                {whistleblowerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-12 text-white/60 hover:text-white transition-colors leading-[2.0]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Recursos">
              <ul className="flex flex-col gap-4 pb-20 s:pb-0 s:pt-16">
                {newsroomLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-12 text-white/60 hover:text-white transition-colors leading-[2.0]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>

          {/* Right column - cols 11-16 */}
          <div className="s:col-start-11 s:col-span-6 flex flex-col gap-0 s:gap-40">
            <Accordion title="Orbbi Latam">
              <ul className="flex flex-col gap-4 pb-20 s:pb-0 s:pt-16">
                {ogLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-12 text-white/60 hover:text-white transition-colors leading-[2.0]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>

            <div className="py-16 s:py-0">
              <p className="text-12 text-white/30 uppercase tracking-[0.12rem] mb-16">Síguenos</p>
              <a
                href="https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-8 text-12 text-white/60 font-medium uppercase tracking-[0.12rem] hover:text-white transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.38-.5-2.32-1.75-2.32-.95 0-1.52.64-1.77 1.26-.09.22-.11.54-.11.86v5.7h-3v-10h3v1.37c.4-.62 1.12-1.5 2.72-1.5 1.99 0 3.47 1.3 3.47 4.09v6.04z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-max py-24 border-t border-white/10">
        <div className="flex flex-col s:flex-row items-start s:items-center justify-between gap-16">
          <p className="text-12 text-grey">
            &copy; 2026 Orbbi Latam. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-16 s:gap-24">
            {['Política de Privacidad', 'Términos de Uso', 'Prensa'].map((item) => (
              <a key={item} href="#" className="text-12 text-white/30 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
