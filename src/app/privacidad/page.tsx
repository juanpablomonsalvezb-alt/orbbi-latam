import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Orbbi Latam',
  description: 'Política de privacidad y tratamiento de datos personales de Orbbi Latam.',
}

export default function Privacidad() {
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
          Política de Privacidad
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(15,14,13,0.4)', marginBottom: 56 }}>
          Última actualización: mayo {year}
        </p>

        {[
          {
            titulo: '1. Responsable del tratamiento',
            texto: 'Orbbi Latam, operado por Juan Pablo Monsalvez (en adelante "Orbbi"), con domicilio en Santiago de Chile, es responsable del tratamiento de los datos personales que recopila a través del sitio web orbbilatam.com.',
          },
          {
            titulo: '2. Datos que recopilamos',
            texto: 'Recopilamos los datos que usted nos proporciona voluntariamente al completar formularios en nuestro sitio: nombre, dirección de correo electrónico, profesión, país de residencia y cualquier información adicional que incluya en los campos de texto libre. También recopilamos datos de navegación estándar (dirección IP, tipo de navegador, páginas visitadas) a través de herramientas de análisis web.',
          },
          {
            titulo: '3. Finalidad del tratamiento',
            texto: 'Utilizamos sus datos para: (a) responder a sus consultas y gestionar la relación de mentoría; (b) procesar pagos a través de MercadoPago; (c) enviar comunicaciones relacionadas con los servicios contratados; (d) mejorar nuestros servicios mediante análisis estadístico agregado.',
          },
          {
            titulo: '4. Base legal',
            texto: 'El tratamiento de sus datos se basa en: (a) su consentimiento expreso al completar nuestros formularios; (b) la ejecución de un contrato de servicios cuando realiza una compra; (c) nuestro interés legítimo en mejorar la experiencia del usuario.',
          },
          {
            titulo: '5. Destinatarios de los datos',
            texto: 'Sus datos pueden ser compartidos con: Resend (servicio de envío de correo electrónico), MercadoPago (procesamiento de pagos) y servicios de análisis web. No vendemos ni cedemos sus datos personales a terceros con fines comerciales.',
          },
          {
            titulo: '6. Conservación de los datos',
            texto: 'Conservamos sus datos durante el tiempo necesario para prestar los servicios contratados y cumplir con las obligaciones legales aplicables, o hasta que solicite su eliminación.',
          },
          {
            titulo: '7. Sus derechos',
            texto: 'De acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada (Chile), usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, escríbanos a cse.coordinacion@gmail.com.',
          },
          {
            titulo: '8. Seguridad',
            texto: 'Adoptamos medidas técnicas y organizativas razonables para proteger sus datos contra acceso no autorizado, pérdida o destrucción. Las transmisiones de datos se realizan mediante cifrado SSL/TLS.',
          },
          {
            titulo: '9. Cambios en esta política',
            texto: 'Podemos actualizar esta política periódicamente. La versión vigente estará siempre disponible en esta página con la fecha de última actualización.',
          },
          {
            titulo: '10. Contacto',
            texto: 'Para cualquier consulta sobre privacidad, escríbanos a: cse.coordinacion@gmail.com',
          },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#0F0E0D', marginBottom: 10 }}>{s.titulo}</h2>
            <p style={{ fontSize: 15, lineHeight: '26px', color: 'rgba(15,14,13,0.6)' }}>{s.texto}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid rgba(15,14,13,0.1)', paddingTop: 32, marginTop: 48 }}>
          <Link href="/terminos" style={{ fontSize: 14, color: 'rgba(15,14,13,0.5)', marginRight: 24, textDecoration: 'none' }}>
            Términos de Uso →
          </Link>
          <Link href="/" style={{ fontSize: 14, color: 'rgba(15,14,13,0.5)', textDecoration: 'none' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
