import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const d = await req.json()

  const isPago    = d.source === 'pago'
  const isAgendar = d.source === 'agendar'
  const badgeColor = isPago ? '#1A6B3A' : isAgendar ? '#1A3A6B' : '#1E383E'
  const badgeLabel = isPago ? '💳 CLIENTE — ya pagó' : isAgendar ? '📅 DIAGNÓSTICO — slot solicitado' : '📋 Consulta desde el landing'

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1E383E">
      <div style="background:${badgeColor};padding:28px 40px">
        <p style="color:rgba(255,255,255,0.6);font-size:11px;font-family:system-ui;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">${badgeLabel}</p>
        <h1 style="color:white;font-size:22px;font-weight:400;margin:0">
          ${isPago ? 'Nuevo cliente — Orbbi Latam' : 'Nuevo contacto — Orbbi Latam'}
        </h1>
      </div>
      <div style="padding:40px;background:#f9f7f4">
        <table style="width:100%;border-collapse:collapse">

          <tr><td colspan="2" style="padding:0 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">Datos de contacto</td></tr>
          <tr><td style="padding:10px 0 2px;font-size:11px;color:#7A7871;font-family:system-ui;width:140px">Nombre</td><td style="padding:10px 0 2px;font-size:16px">${d.nombre || '—'}</td></tr>
          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Email</td><td style="padding:2px 0;font-size:16px"><a href="mailto:${d.email}" style="color:#1E383E">${d.email || '—'}</a></td></tr>
          <tr><td style="padding:2px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">País</td><td style="padding:2px 0 14px;font-size:16px">${d.pais || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">Perfil</td></tr>
          <tr><td style="padding:10px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">Profesión</td><td style="padding:10px 0 14px;font-size:16px">${d.profesion || '—'}</td></tr>

          ${d.slot ? `
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">Slot solicitado</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:18px;font-weight:bold;color:#1E383E">${d.slot}</td></tr>
          ` : ''}
          ${d.motivo ? `
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">¿Qué lo motivó a contactarnos?</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:16px;line-height:1.75;color:#1E383E">${d.motivo}</td></tr>
          ` : ''}
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">¿Qué quiere lograr con IA?</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:16px;line-height:1.75;color:#1E383E">${d.msg || d.objetivo || '—'}</td></tr>

        </table>
      </div>
      <div style="padding:20px 40px;background:${badgeColor};text-align:center">
        <p style="color:rgba(255,255,255,0.35);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · cse.coordinacion@gmail.com</p>
      </div>
    </div>
  `

  // Email de confirmación al cliente
  const htmlConfirmacion = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1E383E">
      <div style="background:#0F0E0D;padding:32px 40px">
        <p style="color:#FAFAF9;font-size:24px;font-weight:400;margin:0;font-family:Georgia,serif;letter-spacing:-0.5px">Orbbi</p>
      </div>
      <div style="padding:40px;background:#f9f7f4">
        <h2 style="font-size:22px;font-weight:400;color:#0F0E0D;margin:0 0 16px;font-family:Georgia,serif">
          ${isAgendar ? 'Solicitud de sesión recibida.' : 'Mensaje recibido.'}
        </h2>
        <p style="font-size:16px;line-height:1.7;color:#5A5550;margin:0 0 24px">
          Hola ${d.nombre || 'ahí'},<br/><br/>
          ${isAgendar
            ? `Recibimos tu solicitud para la <strong>sesión de orientación</strong>${d.slot ? ` el <strong>${d.slot}</strong>` : ''}. Te confirmamos el horario en menos de 24 horas.`
            : 'Recibimos tu mensaje. Te respondemos en menos de 24 horas con toda la información que necesitas.'}
        </p>
        ${d.slot ? `
        <div style="background:#fff;border-radius:8px;padding:16px 20px;margin-bottom:24px;border-left:3px solid #0F0E0D">
          <p style="font-size:12px;color:#7A7871;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;font-family:system-ui">Horario solicitado</p>
          <p style="font-size:16px;font-weight:500;color:#0F0E0D;margin:0">${d.slot}</p>
        </div>` : ''}
        <p style="font-size:14px;line-height:1.7;color:#7A7871;margin:0 0 32px">
          Si tienes alguna duda urgente, escríbenos directamente a <a href="mailto:cse.coordinacion@gmail.com" style="color:#0F0E0D">cse.coordinacion@gmail.com</a>
        </p>
        <a href="https://orbbilatam.com" style="display:inline-block;background:#0F0E0D;color:#FAFAF9;padding:12px 24px;border-radius:4px;font-size:14px;font-family:system-ui;text-decoration:none;font-weight:500">
          Volver a Orbbi →
        </a>
      </div>
      <div style="padding:20px 40px;background:#0F0E0D;text-align:center">
        <p style="color:rgba(255,255,255,0.3);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · cse.coordinacion@gmail.com</p>
      </div>
    </div>
  `

  try {
    // Email a JP
    await resend.emails.send({
      from: 'Orbbi Latam <contacto@orbbilatam.com>',
      to: process.env.RESEND_TO!,
      replyTo: d.email,
      subject: `${isPago ? '💳 CLIENTE' : isAgendar ? '📅 DIAGNÓSTICO' : '📋 Contacto'}: ${d.nombre}${d.slot ? ` — ${d.slot}` : ` — ${d.profesion || 'Orbbi Latam'}`}`,
      html,
    })
    // Confirmación al cliente (solo si no es pago — ese ya tiene su propia página)
    if (!isPago && d.email) {
      await resend.emails.send({
        from: 'Orbbi Latam <contacto@orbbilatam.com>',
        to: d.email,
        subject: isAgendar ? 'Recibimos tu solicitud de sesión — Orbbi' : 'Recibimos tu mensaje — Orbbi',
        html: htmlConfirmacion,
      })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
