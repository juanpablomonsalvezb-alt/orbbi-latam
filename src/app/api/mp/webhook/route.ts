import { NextRequest, NextResponse } from 'next/server'
import { MP_API, getHeaders } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type === 'payment') {
      const paymentId = data?.id
      if (!paymentId) return NextResponse.json({ received: true })

      const paymentRes = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
        headers: getHeaders(),
      })

      if (!paymentRes.ok) return NextResponse.json({ received: true })

      const payment = await paymentRes.json()

      if (payment.status === 'approved') {
        const ref = payment.external_reference || ''
        const planId = ref.split('_')[0]
        const email = payment.payer?.email || 'no informado'
        const monto = payment.transaction_amount

        // Notificar por email al equipo
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Orbbi Pagos <onboarding@resend.dev>',
            to: 'cse.coordinacion@gmail.com',
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
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ received: true })
  }
}
