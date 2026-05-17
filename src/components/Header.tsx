'use client'
import { useEffect, useState } from 'react'

export default function Header() {
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const LINKS = ['Programas','Para quién','Método','Testimonios']

  return (
    <>
      {/* Shell */}
      <div className="nav-shell">
        {/* Announcement bar */}
        <div className="announce">
          <span>Nuevo programa online · Mujeres en IA 2025</span>
          <a href="/#contacto" style={{ fontWeight:500, textDecoration:'underline', textUnderlineOffset:'3px', cursor:'none' }}>
            Solicitar lugar →
          </a>
        </div>

        {/* Nav */}
        <nav className={`nav-bar ${scrolled ? 'nav-light' : 'nav-dark'}`}>
          {/* Burger */}
          <button
            onClick={() => setOpen(v => !v)}
            style={{ background:'none', border:'none', cursor:'none', padding:'8px', display:'flex', flexDirection:'column', gap:'5px' }}
            aria-label="Menú"
          >
            <span className="burger-ln" style={{
              background: scrolled ? '#0F0F0E' : '#FFFFFF',
              transform: open ? 'translateY(6px) rotate(45deg)' : undefined,
            }} />
            <span className="burger-ln" style={{
              background: scrolled ? '#0F0F0E' : '#FFFFFF',
              width: open ? '2.4rem' : '1.6rem',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : undefined,
            }} />
          </button>

          {/* Logo */}
          <a href="/" style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', cursor:'none' }}>
            <span style={{
              fontFamily:'"disp",Georgia,serif',
              fontSize:'2.2rem',
              fontWeight:'normal',
              letterSpacing:'-0.02em',
              color: scrolled ? '#0F0F0E' : '#FFFFFF',
              transition:'color .4s',
            }}>
              Orbbi
            </span>
          </a>

          {/* Right: links + CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:'3.2rem' }}>
            <div style={{ display:'none' }} className="l:flex items-center gap-32">
              {LINKS.map(l => (
                <a key={l} href={`/#${l.toLowerCase().replace(' ','-')}`}
                  style={{
                    fontSize:'1.3rem', fontWeight:500,
                    color: scrolled ? 'rgba(15,15,14,0.5)' : 'rgba(255,255,255,0.55)',
                    transition:'color .3s', cursor:'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#0F0F0E' : '#FFFFFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'rgba(15,15,14,0.5)' : 'rgba(255,255,255,0.55)')}
                >{l}</a>
              ))}
            </div>
            <a href="/#contacto" className={scrolled ? 'btn-dark' : 'btn-ghost-w'} style={{ fontSize:'1.2rem', padding:'1rem 2rem' }}>
              Diagnóstico gratis
            </a>
          </div>
        </nav>
      </div>

      {/* Fullscreen menu */}
      <div className={`menu-panel ${open ? 'open' : ''}`} style={{ paddingTop:'12rem' }}>
        <button onClick={() => setOpen(false)} style={{ position:'absolute', top:'6rem', right:'3.2rem', background:'none', border:'none', cursor:'none', color:'rgba(255,255,255,0.35)', fontSize:'2.4rem', lineHeight:1 }}>✕</button>
        <div className="wrap" style={{ height:'calc(100% - 12rem)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <nav style={{ display:'flex', flexDirection:'column' }}>
            {[...LINKS, 'Contacto'].map((l, i) => (
              <a key={l} href={`/#${l.toLowerCase().replace(' ','-')}`}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(4.8rem,8vw,11.2rem)',
                  lineHeight:1.08, letterSpacing:'-0.03em',
                  color: i===0 ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                  cursor:'none', transition:'color .3s',
                  borderBottom:'1px solid rgba(255,255,255,0.06)',
                  paddingBottom:'1.2rem', marginBottom:'.4rem',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                onMouseLeave={e => (e.currentTarget.style.color = i===0 ? '#FFFFFF' : 'rgba(255,255,255,0.2)')}
              >{l}</a>
            ))}
          </nav>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'3.2rem', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily:'"disp"', fontSize:'2rem', color:'rgba(255,255,255,0.3)' }}>Orbbi</span>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.4rem', color:'rgba(255,255,255,0.3)', cursor:'none', transition:'color .3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >contacto@orbbilatam.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
