'use client'
import { useEffect, useState } from 'react'

const LOGO = () => (
  <span style={{
    fontFamily:'"sans",system-ui,sans-serif',
    fontWeight:500, letterSpacing:'0.12em',
    fontSize:'1.3rem', lineHeight:1,
    color:'#C9A96E', display:'inline-block',
  }}>
    ORBBI
  </span>
)

const LINKS = [
  { label:'Para quién',  href:'/#para-quien'  },
  { label:'Servicios',   href:'/#servicios'   },
  { label:'Método',      href:'/#metodo'       },
  { label:'Testimonios', href:'/#testimonios' },
]

export default function Header() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive:true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="nav-bar" style={{ borderBottomColor: scrolled ? 'rgba(201,169,110,0.08)' : 'transparent' }}>

        {/* Hamburger */}
        <button
          onClick={()=>setOpen(v=>!v)}
          style={{ background:'none', border:'none', cursor:'none', padding:'8px', display:'flex', flexDirection:'column', gap:'5px' }}
          aria-label="Menú"
        >
          <span className="burger-line" style={{ transform: open ? 'translateY(6px) rotate(45deg)' : undefined }} />
          <span className="burger-line" style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : undefined, width: open ? '2.4rem' : '1.6rem' }} />
        </button>

        {/* Logo — centered */}
        <a href="/" style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', cursor:'none' }}>
          <LOGO />
        </a>

        {/* Desktop links + CTA */}
        <div className="flex items-center gap-32">
          <nav className="hidden l:flex items-center gap-28">
            {LINKS.map(l => (
              <a
                key={l.label} href={l.href}
                style={{ fontSize:'1.2rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(242,237,228,0.4)', transition:'color 0.3s', cursor:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,237,228,0.4)')}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="/#contacto" className="btn-outline" style={{ padding:'1rem 2rem', fontSize:'1.1rem' }}>
            Diagnóstico gratis
          </a>
        </div>
      </header>

      {/* Full-screen menu */}
      <div className={`menu-overlay ${open ? 'open' : ''}`}>
        <div style={{ height:'100%', display:'flex', flexDirection:'column', padding:'2.4rem 4.8rem', paddingTop:'7rem' }}>

          {/* Close */}
          <button
            onClick={()=>setOpen(false)}
            style={{ position:'absolute', top:'2rem', right:'2.4rem', background:'none', border:'none', cursor:'none', color:'rgba(242,237,228,0.35)', fontSize:'2rem', lineHeight:1 }}
          >✕</button>

          {/* Main links */}
          <nav className="flex flex-col gap-0 flex-1 justify-center">
            {[...LINKS, { label:'Contacto', href:'/#contacto' }].map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={()=>setOpen(false)}
                style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(3.6rem,6vw,8rem)',
                  lineHeight:1.15,
                  color: i===0 ? '#F2EDE4' : 'rgba(242,237,228,0.25)',
                  letterSpacing:'-0.02em',
                  cursor:'none',
                  transition:'color 0.3s',
                  borderBottom:'1px solid rgba(201,169,110,0.06)',
                  paddingBottom:'1.2rem',
                  marginBottom:'0.4rem',
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
                onMouseLeave={e=>(e.currentTarget.style.color= i===0 ? '#F2EDE4' : 'rgba(242,237,228,0.25)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Footer of menu */}
          <div className="flex items-center justify-between pt-32" style={{ borderTop:'1px solid rgba(201,169,110,0.08)' }}>
            <LOGO />
            <a
              href="mailto:contacto@orbbilatam.com"
              style={{ fontSize:'1.3rem', color:'rgba(242,237,228,0.3)', cursor:'none', transition:'color 0.3s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,237,228,0.3)')}
            >
              contacto@orbbilatam.com
            </a>
          </div>

        </div>
      </div>
    </>
  )
}
