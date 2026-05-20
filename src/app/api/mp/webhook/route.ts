import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { MP_API, getHeaders } from '@/lib/mercadopago'

/**
 * Verifica la firma del webhook MP según
 * https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
 *
 * Formato del header x-signature: "ts=TIMESTAMP,v1=HASH"
 * Manifest: id:DATA_ID;request-id:REQUEST_ID;ts:TIMESTAMP;
 */
function verificarFirmaMP(req: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) return true // Sin secret configurado → no validar (modo permisivo durante setup)

  const xSignature = req.headers.get('x-signature') || ''
  const xRequestId = req.headers.get('x-request-id') || ''

  const parts = Object.fromEntries(
    xSignature.split(',').map(p => p.trim().split('='))
  )
  const ts = parts.ts
  const v1 = parts.v1
  if (!ts || !v1) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const expected = createHmac('sha256', secret).update(manifest).digest('hex')

  return expected === v1
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type !== 'payment') return NextResponse.json({ received: true })

    const paymentId = data?.id
    if (!paymentId) return NextResponse.json({ received: true })

    // Validar firma (si hay secret configurado)
    if (!verificarFirmaMP(request, String(paymentId))) {
      console.warn('Webhook MP: firma inválida')
      return NextResponse.json({ received: false }, { status: 401 })
    }

    const paymentRes = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
      headers: getHeaders(),
    })

    if (!paymentRes.ok) return NextResponse.json({ received: true })

    const payment = await paymentRes.json()

    if (payment.status === 'approved') {
      const ref = String(payment.external_reference || '').slice(0, 200)
      const planId = ref.split('_')[0]
      const email = String(payment.payer?.email || 'no informado').slice(0, 254)
      const monto = Number(payment.transaction_amount) || 0

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Orbbi Pagos <contacto@orbbilatam.com>',
          to: process.env.RESEND_TO || 'cse.coordinacion@gmail.com',
          subject: `✅ Pago aprobado — Plan ${planId} · $${monto} USD`,
          html: `
            <h2>Nuevo pago aprobado</h2>
            <p><strong>Plan:</strong> ${planId}</p>
            <p><strong>Monto:</strong> $${monto} USD</p>
            <p><strong>Email cliente:</strong> ${email}</p>
            <p><strong>ID de pago MP:</strong> ${paymentId}</p>
            <p><strong>Referencia:</strong> ${ref}</p>
            <hr/>
            <p>Agenda la sesión con el cliente a la brevedad.</p>
          `,
        }),
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ received: true })
  }
}
