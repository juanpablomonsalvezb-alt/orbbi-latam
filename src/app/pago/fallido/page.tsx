import Link from 'next/link'

export default function PagoFallido() {
  return (
    <main style={{ minHeight:'100vh', background:'#0F0E0D', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
      <div style={{ maxWidth:520, textAlign:'center' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', border:'1px solid rgba(250,250,249,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:28, color:'rgba(250,100,100,0.6)' }}>
          ✕
        </div>
        <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,5vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#FAFAF9', marginBottom:20 }}>
          El pago no se completó.
        </h1>
        <p style={{ fontSize:18, lineHeight:'28px', color:'rgba(250,250,249,0.5)', marginBottom:48 }}>
          No se realizó ningún cobro. Puedes intentarlo nuevamente o escribirnos para pagar por transferencia.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
          <Link
            href="/#precios"
            style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', height:44, padding:'0 24px', background:'#FAFAF9', color:'#0F0E0D', borderRadius:4, fontSize:14, fontWeight:500, fontFamily:'system-ui,sans-serif', textDecoration:'none' }}
          >
            Intentar nuevamente
          </Link>
          <a href="mailto:cse.coordinacion@gmail.com" style={{ fontSize:14, color:'rgba(250,250,249,0.35)', textDecoration:'none' }}>
            Pagar por transferencia
          </a>
        </div>
      </div>
    </main>
  )
}
