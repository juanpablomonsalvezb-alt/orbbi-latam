import { NextRequest, NextResponse } from 'next/server'
import { PLANES, PlanId, MP_API, getHeaders } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    const { plan_id, email, nombre } = await request.json()

    if (!plan_id) {
      return NextResponse.json({ error: 'Plan requerido' }, { status: 400 })
    }

    const plan = PLANES[plan_id as PlanId]
    if (!plan) {
      return NextResponse.json({ error: 'Plan no válido' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbbi-latam.vercel.app'
    const ref = `${plan_id}_${Date.now()}`

    const body: Record<string, unknown> = {
      items: [
        {
          title: `Orbbi · ${plan.nombre}`,
          description: plan.descripcion,
          quantity: 1,
          unit_price: plan.precio,
          currency_id: 'USD',
        },
      ],
      back_urls: {
        success: `${appUrl}/pago/exitoso`,
        failure: `${appUrl}/pago/fallido`,
        pending: `${appUrl}/pago/pendiente`,
      },
      auto_return: 'approved',
      external_reference: ref,
    }

    if (email || nombre) {
      body.payer = {
        ...(email ? { email } : {}),
        ...(nombre ? { name: nombre } : {}),
      }
    }

    const response = await fetch(`${MP_API}/checkout/preferences`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('MercadoPago error:', response.status, JSON.stringify(err))
      return NextResponse.json({ error: 'Error creando pago', detail: err, mp_status: response.status }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ init_point: data.init_point })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
