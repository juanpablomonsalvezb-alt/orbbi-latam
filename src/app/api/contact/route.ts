import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { escapeHtml, sanitize, isValidEmail } from '@/lib/security'

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Validación e input sanitization
  const nombre    = sanitize(raw.nombre, 100)
  const email     = sanitize(raw.email, 254)
  const profesion = sanitize(raw.profesion, 100)
  const pais      = sanitize(raw.pais, 100)
  const motivo    = sanitize(raw.motivo, 2000)
  const objetivo  = sanitize(raw.objetivo, 2000)
  const msg       = sanitize(raw.msg, 2000)
  const slot      = sanitize(raw.slot, 200)
  const source    = sanitize(raw.source, 50)

  if (!nombre || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const isPago    = source === 'pago'
  const isAgendar = source === 'agendar'
  const badgeColor = isPago ? '#1A6B3A' : isAgendar ? '#1A3A6B' : '#1E383E'
  const badgeLabel = isPago ? '💳 CLIENTE — ya pagó' : isAgendar ? '📅 DIAGNÓSTICO — slot solicitado' : '📋 Consulta desde el landing'

  // Todos los inputs van escapados
  const eNombre    = escapeHtml(nombre)
  const eEmail     = escapeHtml(email)
  const eProfesion = escapeHtml(profesion)
  const ePais      = escapeHtml(pais)
  const eMotivo    = escapeHtml(motivo)
  const eMsg       = escapeHtml(msg || objetivo)
  const eSlot      = escapeHtml(slot)

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
          <tr><td style="padding:10px 0 2px;font-size:11px;color:#7A7871;font-family:system-ui;width:140px">Nombre</td><td style="padding:10px 0 2px;font-size:16px">${eNombre || '—'}</td></tr>
          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Email</td><td style="padding:2px 0;font-size:16px"><a href="mailto:${eEmail}" style="color:#1E383E">${eEmail || '—'}</a></td></tr>
          <tr><td style="padding:2px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">País</td><td style="padding:2px 0 14px;font-size:16px">${ePais || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">Perfil</td></tr>
          <tr><td style="padding:10px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">Profesión</td><td style="padding:10px 0 14px;font-size:16px">${eProfesion || '—'}</td></tr>

          ${eSlot ? `
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">Slot solicitado</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:18px;font-weight:bold;color:#1E383E">${eSlot}</td></tr>
          ` : ''}
          ${eMotivo ? `
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">¿Qué lo motivó a contactarnos?</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:16px;line-height:1.75;color:#1E383E">${eMotivo}</td></tr>
          ` : ''}
          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">¿Qué quiere lograr con IA?</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:16px;line-height:1.75;color:#1E383E">${eMsg || '—'}</td></tr>

        </table>
      </div>
      <div style="padding:20px 40px;background:${badgeColor};text-align:center">
        <p style="color:rgba(255,255,255,0.35);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · cse.coordinacion@gmail.com</p>
      </div>
    </div>
  `

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
          Hola ${eNombre || 'ahí'},<br/><br/>
          ${isAgendar
            ? `Recibimos tu solicitud para la <strong>sesión de orientación</strong>${eSlot ? ` el <strong>${eSlot}</strong>` : ''}. Te confirmamos el horario en menos de 24 horas.`
            : 'Recibimos tu mensaje. Te respondemos en menos de 24 horas con toda la información que necesitas.'}
        </p>
        ${eSlot ? `
        <div style="background:#fff;border-radius:8px;padding:16px 20px;margin-bottom:24px;border-left:3px solid #0F0E0D">
          <p style="font-size:12px;color:#7A7871;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;font-family:system-ui">Horario solicitado</p>
          <p style="font-size:16px;font-weight:500;color:#0F0E0D;margin:0">${eSlot}</p>
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
    await resend.emails.send({
      from: 'Orbbi Latam <contacto@orbbilatam.com>',
      to: process.env.RESEND_TO!,
      replyTo: email,
      subject: `${isPago ? '💳 CLIENTE' : isAgendar ? '📅 DIAGNÓSTICO' : '📋 Contacto'}: ${nombre}${slot ? ` — ${slot}` : ` — ${profesion || 'Orbbi Latam'}`}`,
      html,
    })
    if (!isPago && isValidEmail(email)) {
      await resend.emails.send({
        from: 'Orbbi Latam <contacto@orbbilatam.com>',
        to: email,
        subject: isAgendar ? 'Recibimos tu solicitud de sesión — Orbbi' : 'Recibimos tu mensaje — Orbbi',
        html: htmlConfirmacion,
      })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
