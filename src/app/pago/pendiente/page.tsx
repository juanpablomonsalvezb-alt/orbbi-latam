import Link from 'next/link'

export default function PagoPendiente() {
  return (
    <main style={{ minHeight:'100vh', background:'#0F0E0D', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
      <div style={{ maxWidth:520, textAlign:'center' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', border:'1px solid rgba(250,250,249,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:28, color:'rgba(250,250,249,0.5)' }}>
          ⏳
        </div>
        <h1 style={{ fontFamily:'"disp",Georgia,serif', fontSize:'clamp(36px,5vw,56px)', lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:400, color:'#FAFAF9', marginBottom:20 }}>
          Pago en proceso.
        </h1>
        <p style={{ fontSize:18, lineHeight:'28px', color:'rgba(250,250,249,0.5)', marginBottom:48 }}>
          Tu pago está siendo procesado. Te avisaremos por correo cuando se confirme. Puede tardar hasta 24 horas.
        </p>
        <Link href="/" style={{ fontSize:14, color:'rgba(250,250,249,0.35)', textDecoration:'none' }}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
