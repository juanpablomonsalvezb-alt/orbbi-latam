'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const LogoSVG = ({ className, dark }: { className?: string; dark?: boolean }) => (
  <span
    className={className}
    style={{
      fontFamily: '"sans", system-ui, sans-serif',
      fontWeight: 500,
      letterSpacing: '0.08em',
      fontSize: '1.4rem',
      lineHeight: 1,
      display: 'inline-block',
      color: dark ? '#1E383E' : 'currentColor',
    }}
  >
    ORBBI LATAM
  </span>
)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)

  useEffect(() => {
    if (menuOpen || bookOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, bookOpen])

  return (
    <>
      {/* Fixed header wrapper */}
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <nav className="site-nav">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-[5px] p-8 -ml-8 cursor-pointer border-none bg-transparent text-green transition-colors ${menuOpen ? 'is-menu-open' : ''}`}
            aria-label="Toggle menu"
          >
            <span
              className="burger-line burger-line-1"
              style={{
                transform: menuOpen ? 'translateY(4px) rotate(45deg)' : undefined,
              }}
            />
            <span
              className="burger-line burger-line-2"
              style={{
                transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : undefined,
              }}
            />
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2 text-green">
            <LogoSVG dark />
          </a>

          {/* Contact us button */}
          <a
            href="/#contacto"
            className="flex items-center gap-10 text-12 font-medium uppercase tracking-[0.12rem] text-green border border-green rounded-[10rem] px-16 py-8 hover:bg-green hover:text-white transition-colors"
          >
            <span className="hidden s:flex items-center -space-x-6">
              {[1, 2, 3].map((i) => (
                <span key={i} className="w-24 h-24 rounded-full bg-grey-taupe border-2 border-white overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-grey">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </span>
              ))}
            </span>
            Contáctanos
          </a>
        </nav>
      </header>

      {/* Full-screen menu overlay */}
      <div className={`site-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="site-max py-80 s:py-120">
          {/* Menu header */}
          <div className="flex items-center justify-between mb-60 s:mb-80">
            <LogoSVG />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-24 leading-none p-8 -mr-8"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 s:grid-cols-[1fr_auto] gap-60">
            {/* Left: menu boxes */}
            <div className="grid grid-cols-2 s:grid-cols-4 gap-16 s:gap-20">
              {[
                { label: 'Servicios', img: '/images/gender.png', href: '/#servicios' },
                { label: 'Publicaciones', img: '/images/pay-equity.jpg', href: '/#publicaciones' },
                { label: 'Para Quién', img: '/images/restaurant.png', href: '/#para-quien' },
                { label: 'Contacto', img: '/images/hero.jpg', href: '/#contacto' },
              ].map(({ label, img, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="group block">
                  <div className="overflow-hidden rounded-24 mb-12 aspect-square">
                    <Image
                      src={img}
                      alt={label}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-white text-12 s:text-14 font-medium uppercase tracking-[0.12rem]">{label}</p>
                </a>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-40 s:w-[24rem] s:pl-40 s:border-l s:border-white/20">
              {/* Recursos */}
              <div>
                <p className="text-white/60 text-12 uppercase tracking-[0.12rem] mb-16">Recursos</p>
                <a href="/#publicaciones" onClick={() => setMenuOpen(false)} className="block text-white text-14 py-8 border-b border-white/10 hover:opacity-70 transition-opacity">Blog</a>
              </div>

              {/* Orbbi Latam */}
              <div>
                <p className="text-white/60 text-12 uppercase tracking-[0.12rem] mb-16">Orbbi Latam</p>
                {[
                  { label: 'Servicios IA', href: '/#servicios' },
                  { label: 'Desarrollo Web', href: '/#desarrollo-web' },
                  { label: 'Contacto', href: '/#contacto' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block text-white text-14 py-8 border-b border-white/10 hover:opacity-70 transition-opacity">
                    {label}
                  </a>
                ))}
              </div>

              {/* Office */}
              <div>
                <p className="text-white/60 text-12 uppercase tracking-[0.12rem] mb-12">Contacto</p>
                <p className="text-white/80 text-12 leading-[1.8]">
                  contacto@orbbilatam.com<br />
                  Lunes a viernes<br />
                  Respuesta en menos de 24 horas
                </p>
              </div>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/" target="_blank" rel="noreferrer" className="flex items-center gap-8 text-white text-12 uppercase tracking-[0.12rem] hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.38-.5-2.32-1.75-2.32-.95 0-1.52.64-1.77 1.26-.09.22-.11.54-.11.86v5.7h-3v-10h3v1.37c.4-.62 1.12-1.5 2.72-1.5 1.99 0 3.47 1.3 3.47 4.09v6.04z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking overlay */}
      <div
        className={`js-booking-overlay ${bookOpen ? 'is-visible' : ''}`}
        onClick={() => setBookOpen(false)}
      />

      {/* Book a Call panel */}
      <div className={`book-a-call ${bookOpen ? 'is-open' : ''}`}>
        <div className="p-40 s:p-60 h-full flex flex-col">
          <div className="flex items-center justify-between mb-40">
            <h2 className="text-green text-20 font-medium uppercase tracking-[0.12rem]">Escríbenos</h2>
            <button
              onClick={() => setBookOpen(false)}
              className="text-grey text-24 leading-none p-8 -mr-8 hover:text-green transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="flex-1">
            <p className="text-grey text-14 mb-40 leading-[1.8]">
              ¿Tienes dudas? Escríbenos y te respondemos en menos de 24 horas, de lunes a viernes.
            </p>

            <div className="mb-32">
              <p className="text-12 text-grey uppercase tracking-[0.12rem] mb-8">Email</p>
              <a href="mailto:contacto@orbbilatam.com" className="text-green text-32 font-medium hover:opacity-70 transition-opacity">
                contacto@orbbilatam.com
              </a>
            </div>

            <div className="mb-32">
              <p className="text-12 text-grey uppercase tracking-[0.12rem] mb-8">LinkedIn</p>
              <a href="https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/" target="_blank" rel="noreferrer" className="text-green text-16 ulink">
                linkedin.com/in/juan-pablo-monsalvez-b7b843321
              </a>
            </div>

            <div>
              <p className="text-12 text-grey uppercase tracking-[0.12rem] mb-8">Disponibilidad</p>
              <p className="text-black text-14 leading-[1.8]">
                Lunes a viernes<br />
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>

          <div className="mt-auto pt-40 border-t border-light-grey">
            <p className="text-grey text-12">
              Orbbi Latam — Consultora de IA para profesionales de 45 a 60 años en Latinoamérica.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
