'use client'

/* Harvey footer:
   - bg #0F0E0D
   - Columns: Products, Solutions, Customers, Security, Resources, About Us, Blog, Legal
   - GIANT logomark centered at bottom ("H" in Harvey → "O" for Orbbi)
   - Bottom bar: copyright + legal links
*/

const COLS: { h: string; links: { label: string; href: string }[] }[] = [
  { h: 'Mentoría', links: [
    { label: 'Agendar diagnóstico gratis', href: '/agendar' },
    { label: 'Ver precios', href: '/#precios' },
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Testimonios', href: '/#testimonios' },
  ]},
  { h: 'IA por profesión', links: [
    { label: 'IA para Abogados', href: '/ia-para/abogados' },
    { label: 'IA para Médicos', href: '/ia-para/medicos' },
    { label: 'IA para Contadores', href: '/ia-para/contadores' },
    { label: 'IA para Docentes', href: '/ia-para/docentes' },
    { label: 'IA para Ejecutivos', href: '/ia-para/ejecutivos' },
    { label: 'IA para Emprendedores', href: '/ia-para/emprendedores' },
  ]},
  { h: 'IA por país', links: [
    { label: 'Chile', href: '/ia-para/abogados-chile' },
    { label: 'México', href: '/ia-para/abogados-mexico' },
    { label: 'Colombia', href: '/ia-para/abogados-colombia' },
    { label: 'Argentina', href: '/ia-para/abogados-argentina' },
    { label: 'Perú', href: '/ia-para/abogados-peru' },
  ]},
  { h: 'Blog', links: [
    { label: 'Todos los artículos', href: '/blog' },
    { label: 'Qué es Prompt Engineering', href: '/blog/que-es-prompt-engineering' },
    { label: 'ChatGPT vs Claude', href: '/blog/chatgpt-vs-claude' },
    { label: 'Mejores prompts para abogados', href: '/blog/mejores-prompts-abogados' },
    { label: 'Cuánto cuesta aprender IA', href: '/blog/cuanto-cuesta-aprender-ia-2026' },
    { label: 'Tendencias IA 2026 LATAM', href: '/blog/ia-2026-tendencias-latam' },
  ]},
  { h: 'Empresa', links: [
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Contacto', href: '/#contacto' },
    { label: 'Awesome IA LATAM ↗', href: 'https://github.com/juanpablomonsalvezb-alt/awesome-ia-latam' },
  ]},
  { h: 'Legal', links: [
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Términos de Uso', href: '/terminos' },
  ]},
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="sec-dark" style={{ borderTop:'1px solid rgba(250,250,249,0.08)' }}>
      <div className="page-wrap" style={{ paddingTop:80, paddingBottom:60 }}>

        {/* Columns */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'40px 24px', marginBottom:80 }} className="l:grid-cols-6">
          {COLS.map(col => (
            <div key={col.h} style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <p style={{ fontSize:14, fontWeight:500, color:'rgba(250,250,249,0.35)', letterSpacing:'0.04em' }}>{col.h}</p>
              {col.links.map(l => (
                <a key={l.label} href={l.href}
                  style={{ fontSize:14, color:'rgba(250,250,249,0.5)', cursor:'pointer', transition:'color .2s', lineHeight:'18.2px', textDecoration:'none' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                  onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.5)')}
                >{l.label}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Harvey signature: GIANT logomark centered */}
        <div style={{ textAlign:'center', padding:'40px 0', borderTop:'1px solid rgba(250,250,249,0.06)', borderBottom:'1px solid rgba(250,250,249,0.06)', margin:'0 0 40px' }}>
          <span style={{
            fontFamily:'"disp",Georgia,serif',
            fontSize:'min(20vw,200px)',
            fontWeight:'normal',
            color:'rgba(250,250,249,0.06)',
            lineHeight:1,
            userSelect:'none',
            letterSpacing:'-0.05em',
            display:'block',
          }}>
            Orbbi
          </span>
        </div>

        {/* Bottom */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }} className="s:flex-row s:items-center s:justify-between">
          <p style={{ fontSize:14, color:'rgba(250,250,249,0.28)', lineHeight:'18.2px' }}>
            © {year} Orbbi Latam. Todos los derechos reservados.
          </p>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            {[
              { label:'Política de Privacidad', href:'/privacidad' },
              { label:'Términos de Uso',        href:'/terminos' },
            ].map(t => (
              <a key={t.label} href={t.href}
                style={{ fontSize:14, color:'rgba(250,250,249,0.28)', cursor:'pointer', transition:'color .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(250,250,249,0.6)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.28)')}
              >{t.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
