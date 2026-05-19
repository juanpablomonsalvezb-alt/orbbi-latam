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
        <p style="color:rgba(255,255,255,0.35);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · cseplataforma@gmail.com</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'Orbbi Latam <contacto@orbbilatam.com>',
      to: process.env.RESEND_TO!,
      replyTo: d.email,
      subject: `${isPago ? '💳 CLIENTE' : isAgendar ? '📅 DIAGNÓSTICO' : '📋 Contacto'}: ${d.nombre}${d.slot ? ` — ${d.slot}` : ` — ${d.profesion || 'Orbbi Latam'}`}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
