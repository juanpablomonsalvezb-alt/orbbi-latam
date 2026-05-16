'use client'
import { useEffect, useState } from 'react'

const Logo = () => (
  <span style={{
    fontFamily:'"sans",system-ui,sans-serif', fontWeight:500,
    letterSpacing:'0.12em', fontSize:'1.3rem', lineHeight:1,
    color:'#1C1C1A', display:'inline-block',
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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="nav-bar">
        {/* Burger */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{ background:'none',border:'none',cursor:'none',padding:'8px',display:'flex',flexDirection:'column',gap:'5px' }}
          aria-label="Menú"
        >
          <span className="burger-line" style={{ transform:open ? 'translateY(6px) rotate(45deg)':undefined }} />
          <span className="burger-line" style={{ transform:open ? 'translateY(-6px) rotate(-45deg)':undefined, width:open?'2.4rem':'1.6rem' }} />
        </button>

        <a href="/" style={{ position:'absolute',left:'50%',transform:'translateX(-50%)',cursor:'none' }}>
          <Logo />
        </a>

        <div style={{ display:'flex',alignItems:'center',gap:'2.4rem' }}>
          <nav style={{ display:'none' }} className="l:flex items-center gap-28">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize:'1.2rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.12em',color:'rgba(28,28,26,0.45)',transition:'color .3s',cursor:'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#1C1C1A')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(28,28,26,0.45)')}
              >{l.label}</a>
            ))}
          </nav>
          <a href="/#contacto" className="btn-primary" style={{ fontSize:'1.1rem',padding:'1rem 2rem' }}>
            Diagnóstico gratis
          </a>
        </div>
      </header>

      {/* Full-screen menu — forest green */}
      <div className={`menu-overlay ${open ? 'open' : ''}`}>
        <div style={{ height:'100%',display:'flex',flexDirection:'column',padding:'2.4rem 4.8rem',paddingTop:'8rem' }}>
          <button onClick={()=>setOpen(false)} style={{ position:'absolute',top:'2.4rem',right:'3.2rem',background:'none',border:'none',cursor:'none',color:'rgba(247,243,238,0.4)',fontSize:'2.4rem',lineHeight:1 }}>✕</button>

          <nav style={{ flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:0 }}>
            {[...LINKS,{label:'Contacto',href:'/#contacto'}].map((l,i)=>(
              <a key={l.label} href={l.href} onClick={()=>setOpen(false)}
                style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(3.6rem,6vw,8rem)',
                  lineHeight:1.15, letterSpacing:'-0.02em',
                  color:i===0?'#F7F3EE':'rgba(247,243,238,0.28)',
                  cursor:'none', transition:'color .3s',
                  borderBottom:'1px solid rgba(247,243,238,0.08)',
                  paddingBottom:'1rem', marginBottom:'.4rem',
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='#D4AD70')}
                onMouseLeave={e=>(e.currentTarget.style.color=i===0?'#F7F3EE':'rgba(247,243,238,0.28)')}
              >{l.label}</a>
            ))}
          </nav>

          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'2.4rem',borderTop:'1px solid rgba(247,243,238,0.1)' }}>
            <span style={{ fontFamily:'"sans"',fontWeight:500,letterSpacing:'0.12em',fontSize:'1.3rem',color:'rgba(247,243,238,0.4)' }}>ORBBI LATAM</span>
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.3rem',color:'rgba(247,243,238,0.35)',cursor:'none',transition:'color .3s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#D4AD70')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(247,243,238,0.35)')}
            >contacto@orbbilatam.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
