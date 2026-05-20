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

    const appUrl = process.env.BUILD_APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://orbbilatam.com'
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
        success: `${appUrl}/pago/exitoso?plan=${plan_id}&ref=${ref}`,
        failure: `${appUrl}/pago/fallido?plan=${plan_id}`,
        pending: `${appUrl}/pago/pendiente?plan=${plan_id}`,
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
      return NextResponse.json({
        error: 'Error creando pago',
        detail: err,
        sent_body: body,
        mp_token_len: process.env.MP_ACCESS_TOKEN?.length || 0,
        mercadopago_token_len: process.env.MERCADOPAGO_ACCESS_TOKEN?.length || 0,
        all_env_keys: Object.keys(process.env).filter(k => k.includes('MP') || k.includes('MERCADO') || k.includes('RESEND') || k.includes('APP')),
        app_url: appUrl,
      }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ init_point: data.init_point })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
