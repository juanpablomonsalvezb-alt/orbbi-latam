export const MP_API = 'https://api.mercadopago.com'

export function getHeaders() {
  return {
    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export const PLANES = {
  diagnostico: {
    nombre: 'Sesión de Diagnóstico',
    descripcion: 'Videollamada 1:1 de 30 minutos · Plan de aprendizaje personalizado',
    precio: 40,
  },
  sesion: {
    nombre: '1 Sesión de Mentoría IA',
    descripcion: 'Sesión individual 1:1 de 60 minutos aplicada a tu trabajo real',
    precio: 90,
  },
  programa: {
    nombre: 'Programa 4 Sesiones',
    descripcion: '4 sesiones de 60 min (1 por semana) · Soporte WhatsApp incluido',
    precio: 299,
  },
} as const

export type PlanId = keyof typeof PLANES
