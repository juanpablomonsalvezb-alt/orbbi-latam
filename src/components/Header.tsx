'use client'
import { useEffect, useState } from 'react'

const LINKS = ['Programas','Para quién','Clientes','Empresa','Blog']

export default function Header() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onLight, setOnLight]   = useState(false)   // true when hero is past

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      // Hero is 100vh — after that, nav needs dark text
      setOnLight(y > window.innerHeight - 80)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const textColor = (onLight && !open) ? '#0D0C0A' : '#FFFFFF'

  return (
    <>
      <div className="nav-shell">

        {/* Announcement bar — Harvey style */}
        <div className="nav-announce" style={{ display: onLight ? 'none' : 'block' }}>
          Nuevo programa · Mujeres en IA 2025 ·{' '}
          <a href="/#contacto">Reservar lugar →</a>
        </div>

        {/* Main nav */}
        <nav className={onLight ? 'nav-bar nav-on-light' : 'nav-bar nav-on-dark'}>

          {/* Logo — left like Harvey */}
          <a href="/" style={{ cursor:'none', marginRight:'4rem' }}>
            <span style={{
              fontFamily:'"disp",Georgia,serif',
              fontSize:'2rem', fontWeight:'normal', letterSpacing:'-.02em',
              color: textColor, transition:'color .3s',
            }}>Orbbi</span>
          </a>

          {/* Center links — desktop */}
          <div style={{ display:'flex', alignItems:'center', gap:'2.8rem', flex:1 }} className="hidden l:flex">
            {LINKS.map(l => (
              <a key={l} href={`/#${l.toLowerCase().replace(' ','-')}`}
                style={{ fontSize:'1.3rem', color: onLight?'rgba(13,12,10,0.5)':'rgba(255,255,255,0.6)', transition:'color .3s', cursor:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color=textColor)}
                onMouseLeave={e=>(e.currentTarget.style.color=onLight?'rgba(13,12,10,0.5)':'rgba(255,255,255,0.6)')}
              >{l}</a>
            ))}
          </div>

          {/* Right: Login + CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', marginLeft:'auto' }}>
            <a href="mailto:contacto@orbbilatam.com"
              style={{ fontSize:'1.3rem', color:textColor, transition:'color .3s', cursor:'none', padding:'.8rem 1.2rem' }}
              className="hidden l:block"
            >Login</a>
            <a href="/#contacto" className={onLight ? 'btn-outline-d' : 'btn-outline-w'} style={{ fontSize:'1.2rem', padding:'.8rem 1.6rem' }}>
              Diagnóstico gratis
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button onClick={()=>setOpen(v=>!v)}
            style={{ background:'none',border:'none',cursor:'none',padding:'8px 8px 8px 1.6rem',display:'flex',flexDirection:'column',gap:'5px' }}
            className="l:hidden" aria-label="Menú"
          >
            <span className="burger" style={{ background:textColor, transform:open?'translateY(6px) rotate(45deg)':undefined }} />
            <span className="burger" style={{ background:textColor, width:open?'2.2rem':'1.4rem', transform:open?'translateY(-6px) rotate(-45deg)':undefined }} />
          </button>
        </nav>
      </div>

      {/* Full-screen menu — Harvey dark */}
      <div className={`menu-panel ${open?'open':''}`}>
        <div className="wrap" style={{ paddingTop:'9rem', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', paddingBottom:'4rem' }}>
          <button onClick={()=>setOpen(false)} style={{ position:'absolute',top:'3.2rem',right:'2.4rem',background:'none',border:'none',cursor:'none',color:'rgba(255,255,255,0.4)',fontSize:'2rem',lineHeight:1 }}>✕</button>
          <nav style={{ display:'flex', flexDirection:'column' }}>
            {[...LINKS,'Contacto'].map((l,i)=>(
              <a key={l} href={`/#${l.toLowerCase().replace(' ','-')}`} onClick={()=>setOpen(false)}
                style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(4rem,7vw,9.6rem)', lineHeight:1.1, letterSpacing:'-.025em', color:i===0?'#FFFFFF':'rgba(255,255,255,0.2)', cursor:'none', transition:'color .3s', borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:'1rem', marginBottom:'.4rem' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FFFFFF')}
                onMouseLeave={e=>(e.currentTarget.style.color=i===0?'#FFFFFF':'rgba(255,255,255,0.2)')}
              >{l}</a>
            ))}
          </nav>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'2.4rem',borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily:'"disp"',fontSize:'1.8rem',color:'rgba(255,255,255,0.35)' }}>Orbbi</span>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.3rem',color:'rgba(255,255,255,0.35)',cursor:'none' }}>contacto@orbbilatam.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
