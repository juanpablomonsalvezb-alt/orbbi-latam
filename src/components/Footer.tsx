'use client'

/* Harvey footer:
   - bg #0F0E0D
   - Columns: Products, Solutions, Customers, Security, Resources, About Us, Blog, Legal
   - GIANT logomark centered at bottom ("H" in Harvey → "O" for Orbbi)
   - Bottom bar: copyright + legal links
*/

const COLS = [
  { h:'Plataforma',   links:['Formación Esencial','Orientación 1:1','Herramienta a Medida','Diagnóstico IA'] },
  { h:'Soluciones',   links:['IA General', 'IA para tu Profesión', 'Programa a Medida', 'Equipos y Empresas'] },
  { h:'Clientes',     links:['Casos de éxito','Testimonios','Empresas'] },
  { h:'Seguridad',    links:['Privacidad','Seguridad de datos','GDPR','Términos de uso'] },
  { h:'Recursos',     links:['Blog','Guías de IA','Webinars','FAQ'] },
  { h:'Empresa',      links:['Nosotros','Equipo','Prensa','Contacto'] },
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
                <a key={l} href="#"
                  style={{ fontSize:14, color:'rgba(250,250,249,0.5)', cursor:'pointer', transition:'color .2s', lineHeight:'18.2px' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='#FAFAF9')}
                  onMouseLeave={e=>(e.currentTarget.style.color='rgba(250,250,249,0.5)')}
                >{l}</a>
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
