'use client'
import { useEffect, useState } from 'react'

/* Harvey nav:
   - Announce bar: #FAFAF9 bg, 34px, dark text, "Harvey Agents execute..."
   - Nav: transparent on hero, fixed height 72px, logo LEFT, links CENTER, Login+Demo RIGHT
   - After scrolling past hero (~800px), nav gets light bg
*/

const LINKS = [
  { label: 'Mentorías',      href: '/#mentorias' },
  { label: 'Para quién',     href: '/#para-quien' },
  { label: 'Cómo funciona',  href: '/#como-funciona' },
  { label: 'Testimonios',    href: '/#testimonios' },
  { label: 'Contacto',       href: '/#contacto' },
]

export default function Header() {
  const [open,setOpen]     = useState(false)
  const [onLight,setLight] = useState(false)

  useEffect(() => {
    const fn = () => setLight(window.scrollY > 760)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className="harvey-nav">
        {/* Announce bar */}
        <div className="announce-bar">
          <span className="t-small">Mentoría 1:1 en inteligencia artificial · 100% online · Para profesionales de Latinoamérica</span>
          <a href="/agendar" className="t-label" style={{ textDecoration:'underline', textUnderlineOffset:'2px', cursor:'pointer' }}>
            Agendar diagnóstico gratis →
          </a>
        </div>

        {/* Nav bar */}
        <nav className={`nav-inner ${onLight ? 'nav-on-light' : 'nav-on-dark'}`}>

          {/* Logo — Harvey: serif wordmark left */}
          <a href="/" style={{ marginRight:40, cursor:'pointer' }}>
            <span style={{
              fontFamily:'"disp",Georgia,serif',
              fontSize:20, fontWeight:'normal',
              color: onLight ? '#0F0E0D' : '#FAFAF9',
              letterSpacing:-0.4,
              transition:'color .3s',
            }}>
              Orbbi
            </span>
          </a>

          {/* Center links — desktop only */}
          <div style={{ display:'flex', alignItems:'center', gap:28, flex:1 }} className="hidden l:flex">
            {LINKS.map(l => (
              <a key={l.label} href={l.href}
                style={{ fontSize:14, fontWeight:400, color: onLight ? 'rgba(15,14,13,0.55)' : 'rgba(250,250,249,0.7)', transition:'color .2s', cursor:'pointer' }}
                onMouseEnter={e=>(e.currentTarget.style.color = onLight ? '#0F0E0D' : '#FAFAF9')}
                onMouseLeave={e=>(e.currentTarget.style.color = onLight ? 'rgba(15,14,13,0.55)' : 'rgba(250,250,249,0.7)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: Login + CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:'auto' }}>
            <a href="/agendar" className="btn-demo">
              Agendar diagnóstico →
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(v => !v)}
            className="l:hidden"
            style={{ background:'none', border:'none', cursor:'pointer', padding:'8px', display:'flex', flexDirection:'column', gap:5, marginLeft:16 }}
            aria-label="Menú"
          >
            <span className="burger-l" style={{ background: onLight?'#0F0E0D':'#FAFAF9', transform:open?'translateY(6px) rotate(45deg)':undefined }} />
            <span className="burger-l" style={{ background: onLight?'#0F0E0D':'#FAFAF9', width:open?22:14, transform:open?'translateY(-6px) rotate(-45deg)':undefined }} />
          </button>
        </nav>
      </div>

      {/* Full-screen menu */}
      <div className={`menu-overlay ${open?'open':''}`}>
        <div className="page-wrap" style={{ paddingTop:106, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', paddingBottom:40 }}>
          <button onClick={()=>setOpen(false)} style={{ position:'absolute', top:32, right:36, background:'none', border:'none', cursor:'pointer', color:'rgba(250,250,249,0.4)', fontSize:24, lineHeight:1 }}>✕</button>
          <nav style={{ display:'flex', flexDirection:'column' }}>
            {LINKS.map((l, i) => (
              <a key={l.label} href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily:'"disp",Georgia,serif',
                  fontSize:'clamp(40px,7vw,96px)',
                  lineHeight:1.1, letterSpacing:'-0.025em', fontWeight:'normal',
                  color: i===0 ? '#FAFAF9' : 'rgba(250,250,249,0.2)',
                  cursor:'pointer', transition:'color .3s',
                  borderBottom:'1px solid rgba(250,250,249,0.06)',
                  paddingBottom:10, marginBottom:4,
                }}
                onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                onMouseLeave={e=>(e.currentTarget.style.color=i===0?'#FAFAF9':'rgba(250,250,249,0.2)')}
              >{l.label}</a>
            ))}
          </nav>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:24, borderTop:'1px solid rgba(250,250,249,0.08)' }}>
            <span style={{ fontFamily:'"disp"', fontSize:20, color:'rgba(250,250,249,0.35)' }}>Orbbi</span>
            <a href="mailto:cse.coordinacion@gmail.com" style={{ fontSize:14, color:'rgba(250,250,249,0.35)', cursor:'pointer' }}>Contacto</a>
          </div>
        </div>
      </div>
    </>
  )
}
