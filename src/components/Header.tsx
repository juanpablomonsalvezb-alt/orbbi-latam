'use client'
import { useEffect, useState } from 'react'

const Logo = ({ dark }: { dark?: boolean }) => (
  <span style={{ fontFamily:'"sans"',fontWeight:500,letterSpacing:'0.12em',fontSize:'1.3rem',lineHeight:1,color:dark?'#111110':'#FAFAF8',display:'inline-block',transition:'color .4s' }}>
    ORBBI
  </span>
)

const LINKS = [
  { label:'Programas',   href:'/#servicios'   },
  { label:'Para quién',  href:'/#para-quien'  },
  { label:'Método',      href:'/#metodo'       },
  { label:'Testimonios', href:'/#testimonios' },
]

export default function Header() {
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>80)
    window.addEventListener('scroll',h,{passive:true})
    return ()=>window.removeEventListener('scroll',h)
  },[])

  useEffect(()=>{ document.body.style.overflow=open?'hidden':''; return ()=>{ document.body.style.overflow='' } },[open])

  const isDark = scrolled

  return (
    <>
      <header className={`nav ${isDark?'nav-light':'nav-dark'}`}>
        <button onClick={()=>setOpen(v=>!v)} style={{ background:'none',border:'none',cursor:'none',padding:'8px',display:'flex',flexDirection:'column',gap:'5px' }} aria-label="Menú">
          <span className="burger" style={{ background:isDark?'#111110':'#FAFAF8', transform:open?'translateY(6px) rotate(45deg)':undefined }} />
          <span className="burger" style={{ background:isDark?'#111110':'#FAFAF8', transform:open?'translateY(-6px) rotate(-45deg)':undefined, width:open?'2.4rem':'1.6rem' }} />
        </button>

        <a href="/" style={{ position:'absolute',left:'50%',transform:'translateX(-50%)',cursor:'none' }}>
          <Logo dark={isDark} />
        </a>

        <div style={{ display:'flex',alignItems:'center',gap:'2.4rem' }}>
          <a href="/#contacto" className={isDark?'btn-dark':'btn-ghost'} style={{ fontSize:'1.1rem',padding:'1rem 2rem' }}>
            Diagnóstico gratis
          </a>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div className={`menu-panel ${open?'open':''}`}>
        <div style={{ height:'100%',display:'flex',flexDirection:'column',padding:'2.4rem 4.8rem',paddingTop:'8rem' }}>
          <button onClick={()=>setOpen(false)} style={{ position:'absolute',top:'2.4rem',right:'3.2rem',background:'none',border:'none',cursor:'none',color:'rgba(250,250,248,0.35)',fontSize:'2.4rem',lineHeight:1 }}>✕</button>
          <nav style={{ flex:1,display:'flex',flexDirection:'column',justifyContent:'center' }}>
            {[...LINKS,{label:'Contacto',href:'/#contacto'}].map((l,i)=>(
              <a key={l.label} href={l.href} onClick={()=>setOpen(false)}
                style={{ fontFamily:'"disp",Georgia,serif',fontSize:'clamp(4rem,7vw,9.6rem)',lineHeight:1.12,letterSpacing:'-0.025em',color:i===0?'#FAFAF8':'rgba(250,250,248,0.22)',cursor:'none',transition:'color .3s',borderBottom:'1px solid rgba(250,250,248,0.06)',paddingBottom:'1rem',marginBottom:'.4rem' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')}
                onMouseLeave={e=>(e.currentTarget.style.color=i===0?'#FAFAF8':'rgba(250,250,248,0.22)')}
              >{l.label}</a>
            ))}
          </nav>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'2.4rem',borderTop:'1px solid rgba(250,250,248,0.08)' }}>
            <Logo />
            <a href="mailto:contacto@orbbilatam.com" style={{ fontSize:'1.3rem',color:'rgba(250,250,248,0.3)',cursor:'none',transition:'color .3s' }} onMouseEnter={e=>(e.currentTarget.style.color='#C9A96E')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,248,0.3)')}>contacto@orbbilatam.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
