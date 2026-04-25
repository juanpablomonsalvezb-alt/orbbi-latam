import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1E383E">
      <div style="background:#1E383E;padding:32px 40px">
        <h1 style="color:white;font-size:24px;font-weight:400;margin:0">Nuevo mensaje — Orbbi Latam</h1>
      </div>
      <div style="padding:40px;background:#f9f7f4">

        <table style="width:100%;border-collapse:collapse">
          <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #DEDAD3;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">01 — Datos de contacto</td></tr>
          <tr><td style="padding:12px 0 4px;font-size:11px;color:#7A7871;font-family:system-ui;width:160px">Nombre</td><td style="padding:12px 0 4px;font-size:16px">${data.nombre || '—'}</td></tr>
          <tr><td style="padding:4px 0;font-size:11px;color:#7A7871;font-family:system-ui">Email</td><td style="padding:4px 0;font-size:16px"><a href="mailto:${data.email}" style="color:#1E383E">${data.email || '—'}</a></td></tr>
          <tr><td style="padding:4px 0;font-size:11px;color:#7A7871;font-family:system-ui">Teléfono</td><td style="padding:4px 0;font-size:16px">${data.telefono || '—'}</td></tr>
          <tr><td style="padding:4px 0 16px;font-size:11px;color:#7A7871;font-family:system-ui">País</td><td style="padding:4px 0 16px;font-size:16px">${data.pais || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #DEDAD3;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">02 — Perfil profesional</td></tr>
          <tr><td style="padding:12px 0 4px;font-size:11px;color:#7A7871;font-family:system-ui">Cargo</td><td style="padding:12px 0 4px;font-size:16px">${data.cargo || '—'}</td></tr>
          <tr><td style="padding:4px 0;font-size:11px;color:#7A7871;font-family:system-ui">Sector</td><td style="padding:4px 0;font-size:16px">${data.sector || '—'}</td></tr>
          <tr><td style="padding:4px 0 16px;font-size:11px;color:#7A7871;font-family:system-ui">Experiencia</td><td style="padding:4px 0 16px;font-size:16px">${data.experiencia || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #DEDAD3;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">03 — Relación con la IA</td></tr>
          <tr><td style="padding:12px 0 16px;font-size:11px;color:#7A7871;font-family:system-ui">Nivel actual</td><td style="padding:12px 0 16px;font-size:16px">${data.nivel_ia || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #DEDAD3;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">04 — Qué busca</td></tr>
          <tr><td style="padding:12px 0 4px;font-size:11px;color:#7A7871;font-family:system-ui">Para quién</td><td style="padding:12px 0 4px;font-size:16px">${data.para || '—'}</td></tr>
          <tr><td style="padding:4px 0 16px;font-size:11px;color:#7A7871;font-family:system-ui">Servicios</td><td style="padding:4px 0 16px;font-size:16px">${data.servicios || '—'}</td></tr>

          <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #DEDAD3;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7871;font-family:system-ui">05 — Desafío</td></tr>
          <tr><td colspan="2" style="padding:12px 0 16px;font-size:16px;line-height:1.6">${data.desafio || '—'}</td></tr>

          <tr><td style="padding:4px 0;font-size:11px;color:#7A7871;font-family:system-ui">Nos encontró por</td><td style="padding:4px 0;font-size:15px">${data.como_nos_encontro || '—'}</td></tr>
        </table>

      </div>
      <div style="padding:24px 40px;background:#1E383E;text-align:center">
        <p style="color:rgba(255,255,255,0.4);font-size:11px;font-family:system-ui;margin:0">Orbbi Latam · contacto@orbbi.lat</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Orbbi Latam Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: data.email,
      subject: `Nuevo contacto: ${data.nombre} — ${data.cargo || data.sector || 'Orbbi Latam'}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
