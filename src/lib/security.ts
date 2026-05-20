/**
 * Escapa HTML para evitar XSS en interpolaciones de templates de email.
 * Todos los inputs del usuario que se inserten en HTML deben pasar por aquí.
 */
export function escapeHtml(unsafe: unknown): string {
  if (unsafe === null || unsafe === undefined) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Trunca y normaliza strings. Devuelve string vacío si excede el límite.
 */
export function sanitize(input: unknown, maxLen = 500): string {
  if (input === null || input === undefined) return ''
  const s = String(input).trim().slice(0, maxLen)
  return s
}

/**
 * Valida email con regex estricta.
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false
  if (email.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
