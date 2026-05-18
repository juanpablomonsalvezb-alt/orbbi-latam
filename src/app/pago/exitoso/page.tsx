import Link from 'next/link'

export default function PagoExitoso() {
  return (
    <main style={{ minHeight:'100vh', background:'#0F0E0D', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
      <div style={{ maxWidth:520, textAlign:'center' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', border:'1px solid rgba(250,250,249,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:28 }}>
          ✓
        </div>
        <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,5vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#FAFAF9', marginBottom:20 }}>
          Pago recibido.
        </h1>
        <p style={{ fontSize:18, lineHeight:'28px', color:'rgba(250,250,249,0.5)', marginBottom:48 }}>
          Te escribiremos a tu correo en las próximas horas para coordinar tu primera sesión. Si tienes urgencia, escríbenos directamente.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
          <a
            href="mailto:cseplataforma@gmail.com"
            style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', height:44, padding:'0 24px', background:'#FAFAF9', color:'#0F0E0D', borderRadius:4, fontSize:14, fontWeight:500, fontFamily:'system-ui,sans-serif', textDecoration:'none' }}
          >
            Escribir al equipo
          </a>
          <Link
            href="/"
            style={{ fontSize:14, color:'rgba(250,250,249,0.35)', textDecoration:'none' }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
