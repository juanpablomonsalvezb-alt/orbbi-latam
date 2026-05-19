import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso | Orbbi Latam',
  description: 'Términos y condiciones de uso de los servicios de Orbbi Latam.',
}

export default function Terminos() {
  const year = new Date().getFullYear()
  return (
    <main style={{ background: '#FAFAF9', minHeight: '100vh', padding: '80px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <Link href="/" style={{ fontSize: 14, color: 'rgba(15,14,13,0.45)', textDecoration: 'none', display: 'block', marginBottom: 48 }}>
          ← Volver a Orbbi
        </Link>

        <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(15,14,13,0.4)', marginBottom: 16 }}>
          Legal
        </p>
        <h1 style={{ fontFamily: '"disp",Georgia,serif', fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 400, color: '#0F0E0D', marginBottom: 12 }}>
          Términos de Uso
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(15,14,13,0.4)', marginBottom: 56 }}>
          Última actualización: mayo {year}
        </p>

        {[
          {
            titulo: '1. Aceptación de los términos',
            texto: 'Al acceder y utilizar el sitio web orbbilatam.com y contratar cualquiera de nuestros servicios, usted acepta quedar vinculado por estos Términos de Uso. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestros servicios.',
          },
          {
            titulo: '2. Descripción del servicio',
            texto: 'Orbbi Latam ofrece servicios de mentoría personalizada 1:1 en inteligencia artificial para profesionales, impartidos mediante videollamada. Los servicios incluyen: sesión de diagnóstico (gratuita, 30 minutos), sesión individual (60 minutos) y programa de 4 sesiones (1 sesión semanal durante 1 mes).',
          },
          {
            titulo: '3. Contratación y pago',
            texto: 'Los servicios se contratan a través del sitio web y se abonan mediante MercadoPago. Los precios están expresados en dólares estadounidenses (USD). El pago debe realizarse antes del inicio de la primera sesión pagada. Los precios pueden modificarse sin previo aviso, aunque los servicios ya pagados se prestarán en las condiciones acordadas.',
          },
          {
            titulo: '4. Política de cancelación y reembolso',
            texto: 'Orbbi ofrece una garantía de satisfacción de 7 días: si después de su primera sesión pagada el servicio no cumple sus expectativas, le reembolsaremos el importe íntegro sin preguntas. Para solicitar el reembolso, escríbanos a cse.coordinacion@gmail.com dentro de los 7 días posteriores a la primera sesión. Las sesiones de diagnóstico gratuitas no generan derecho a reembolso al no implicar pago.',
          },
          {
            titulo: '5. Cancelación de sesiones',
            texto: 'Las sesiones pueden reprogramarse con un mínimo de 24 horas de anticipación. Las cancelaciones con menos de 24 horas de antelación o la inasistencia sin aviso previo se considerarán sesión realizada y no serán reembolsables.',
          },
          {
            titulo: '6. Obligaciones del usuario',
            texto: 'El usuario se compromete a: (a) proporcionar información veraz en los formularios; (b) asistir puntualmente a las sesiones acordadas; (c) utilizar los recursos y materiales compartidos exclusivamente para uso personal y profesional; (d) no compartir, reproducir ni comercializar el contenido de las sesiones sin autorización expresa.',
          },
          {
            titulo: '7. Propiedad intelectual',
            texto: 'Todo el contenido del sitio web, incluyendo textos, diseño, logotipos y materiales de sesión, es propiedad de Orbbi Latam o de sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables.',
          },
          {
            titulo: '8. Limitación de responsabilidad',
            texto: 'Orbbi proporciona sus servicios con la diligencia profesional debida, pero no garantiza resultados específicos. Los resultados dependen del esfuerzo y aplicación del usuario. Orbbi no será responsable por pérdidas indirectas, lucro cesante o daños consecuentes derivados del uso de sus servicios.',
          },
          {
            titulo: '9. Ley aplicable',
            texto: 'Estos términos se rigen por la legislación chilena. Para cualquier controversia derivada de la interpretación o ejecución de estos términos, las partes se someten a los tribunales competentes de Santiago de Chile.',
          },
          {
            titulo: '10. Contacto',
            texto: 'Para cualquier consulta sobre estos términos, escríbanos a: cse.coordinacion@gmail.com',
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#0F0E0D', marginBottom: 10 }}>{s.titulo}</h2>
            <p style={{ fontSize: 15, lineHeight: '26px', color: 'rgba(15,14,13,0.6)' }}>{s.texto}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid rgba(15,14,13,0.1)', paddingTop: 32, marginTop: 48 }}>
          <Link href="/privacidad" style={{ fontSize: 14, color: 'rgba(15,14,13,0.5)', marginRight: 24, textDecoration: 'none' }}>
            Política de Privacidad →
          </Link>
          <Link href="/" style={{ fontSize: 14, color: 'rgba(15,14,13,0.5)', textDecoration: 'none' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
