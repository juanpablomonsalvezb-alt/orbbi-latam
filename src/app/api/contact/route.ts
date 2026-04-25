import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const d = await req.json()

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1E383E">
      <div style="background:#1E383E;padding:32px 40px">
        <h1 style="color:white;font-size:22px;font-weight:400;margin:0">Nuevo contacto — Orbbi Latam</h1>
      </div>
      <div style="padding:40px;background:#f9f7f4">
        <table style="width:100%;border-collapse:collapse">

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">01 — Datos de contacto</td></tr>
          <tr><td style="padding:10px 0 2px;font-size:11px;color:#7A7871;font-family:system-ui;width:140px">Nombre</td><td style="padding:10px 0 2px;font-size:16px">${d.nombre || '—'}</td></tr>
          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Email</td><td style="padding:2px 0;font-size:16px"><a href="mailto:${d.email}" style="color:#1E383E">${d.email || '—'}</a></td></tr>
          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Teléfono</td><td style="padding:2px 0;font-size:16px">${d.telefono || '—'}</td></tr>
          <tr><td style="padding:2px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">País</td><td style="padding:2px 0 14px;font-size:16px">${d.pais || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">02 — Perfil profesional</td></tr>
          <tr><td style="padding:10px 0 2px;font-size:11px;color:#7A7871;font-family:system-ui">Cargo</td><td style="padding:10px 0 2px;font-size:16px">${d.cargo || '—'}</td></tr>
          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Sector</td><td style="padding:2px 0;font-size:16px">${d.sector || '—'}</td></tr>
          <tr><td style="padding:2px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">Experiencia</td><td style="padding:2px 0 14px;font-size:16px">${d.experiencia || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">03 — Relación con la IA</td></tr>
          <tr><td style="padding:10px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">Nivel actual</td><td style="padding:10px 0 14px;font-size:16px">${d.nivel_ia || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">04 — Qué busca</td></tr>
          <tr><td style="padding:10px 0 2px;font-size:11px;color:#7A7871;font-family:system-ui">Para quién</td><td style="padding:10px 0 2px;font-size:16px">${d.para || '—'}</td></tr>
          <tr><td style="padding:2px 0 14px;font-size:11px;color:#7A7871;font-family:system-ui">Servicios</td><td style="padding:2px 0 14px;font-size:16px">${d.servicios || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0 8px;border-bottom:1px solid #DEDAD3;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">05 — Desafío</td></tr>
          <tr><td colspan="2" style="padding:10px 0 14px;font-size:16px;line-height:1.7">${d.desafio || '—'}</td></tr>

          <tr><td style="padding:2px 0;font-size:11px;color:#7A7871;font-family:system-ui">Nos encontró por</td><td style="padding:2px 0;font-size:15px">${d.como_nos_encontro || '—'}</td></tr>
        </table>
      </div>
      <div style="padding:20px 40px;background:#1E383E;text-align:center">
        <p style="color:rgba(255,255,255,0.35);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · contacto@orbbilatam.com</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'Orbbi Latam <contacto@orbbilatam.com>',
      to: process.env.RESEND_TO!,
      replyTo: d.email,
      subject: `Nuevo contacto: ${d.nombre} — ${d.cargo || d.sector || 'Orbbi Latam'}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
