'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const Logo = ({ className }: { className?: string }) => (
  <span
    className={className}
    style={{
      fontFamily: '"sans", system-ui, sans-serif',
      fontWeight: 500,
      letterSpacing: '0.10em',
      fontSize: '1.4rem',
      lineHeight: 1,
      display: 'inline-block',
      color: '#C9A96E',
    }}
  >
    ORBBI LATAM
  </span>
)

export default function Header() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const headerRef                   = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'Para quién',  href: '/#para-quien'  },
    { label: 'Servicios',   href: '/#servicios'   },
    { label: 'Método',      href: '/#metodo'      },
    { label: 'Testimonios', href: '/#testimonios' },
    { label: 'Contacto',    href: '/#contacto'    },
  ]

  const menuCards = [
    { label: 'Para quién',  img: '/images/gender.png',    href: '/#para-quien'  },
    { label: 'Servicios',   img: '/images/pay-equity.jpg', href: '/#servicios'  },
    { label: 'Método',      img: '/images/restaurant.png', href: '/#metodo'     },
    { label: 'Contacto',    img: '/images/hero.jpg',       href: '/#contacto'   },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{ transition: 'box-shadow 0.4s' }}
      >
        <nav
          className="site-nav"
          style={{ boxShadow: scrolled ? '0 1px 0 rgba(201,169,110,0.08)' : 'none' }}
        >
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex flex-col gap-[5px] p-8 -ml-8 border-none bg-transparent"
            aria-label="Toggle menu"
            style={{ cursor: 'none' }}
          >
            <span className="burger-line" style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : undefined }} />
            <span className="burger-line" style={{ transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : undefined }} />
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden l:flex items-center gap-32">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-12 font-medium uppercase tracking-[0.12rem]"
                style={{ color: 'rgba(245,240,232,0.55)', transition: 'color 0.3s', cursor: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.55)')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="/#contacto" className="btn-gold text-12">
            Diagnóstico gratis
          </a>
        </nav>
      </header>

      {/* Full-screen menu */}
      <div className={`site-menu ${menuOpen ? 'is-open' : ''}`} style={{ zIndex: 200 }}>
        <div className="site-max py-80 s:py-120">
          <div className="flex items-center justify-between mb-60 s:mb-80">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              style={{ color: 'rgba(245,240,232,0.5)', fontSize: '2.4rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'none' }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 s:grid-cols-[1fr_auto] gap-60">
            {/* Cards */}
            <div className="grid grid-cols-2 s:grid-cols-4 gap-16 s:gap-20">
              {menuCards.map(({ label, img, href }) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="group block">
                  <div className="overflow-hidden rounded-24 mb-12 aspect-square" style={{ border: '1px solid rgba(201,169,110,0.1)' }}>
                    <Image
                      src={img} alt={label} width={300} height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-12 s:text-14 font-medium uppercase tracking-[0.12rem]" style={{ color: 'rgba(245,240,232,0.6)' }}>{label}</p>
                </a>
              ))}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-40 s:w-[24rem] s:pl-40 s:border-l" style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
              <div>
                <p className="text-12 uppercase tracking-[0.12rem] mb-16" style={{ color: 'rgba(245,240,232,0.3)' }}>Programas</p>
                {['Formación Esencial', 'Orientación Profesional', 'Herramienta a Medida', 'Programas Corporativos'].map(label => (
                  <a key={label} href="/#servicios" onClick={() => setMenuOpen(false)}
                    className="block text-14 py-8" style={{ color: 'rgba(245,240,232,0.6)', borderBottom: '1px solid rgba(245,240,232,0.06)', transition: 'color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.6)')}
                  >{label}</a>
                ))}
              </div>

              <div>
                <p className="text-12 uppercase tracking-[0.12rem] mb-12" style={{ color: 'rgba(245,240,232,0.3)' }}>Contacto</p>
                <p className="text-12 leading-[1.8]" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  contacto@orbbilatam.com<br />
                  Lunes a viernes<br />
                  Respuesta en &lt;24 horas
                </p>
              </div>

              <a href="https://www.linkedin.com/in/juan-pablo-monsalvez-b7b843321/" target="_blank" rel="noreferrer"
                className="flex items-center gap-8 text-12 uppercase tracking-[0.12rem]"
                style={{ color: 'rgba(245,240,232,0.4)', transition: 'color 0.3s', cursor: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
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
    </>
  )
}
