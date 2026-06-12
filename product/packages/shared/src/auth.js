import { supabase } from './supabase.js'

// Auth del cliente. Interino: OTP por EMAIL (Supabase nativo, sin proveedor externo).
// Producción: se swapea el canal a SMS (Twilio Verify) sin cambiar este contrato (ADR-0013).

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
  return () => data.subscription.unsubscribe()
}

/** Envía un código de 6 dígitos por email (crea la cuenta si no existe). */
export async function sendEmailOtp(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  })
  if (error) throw error
}

/** Verifica el código y deja la sesión iniciada. */
export async function verifyEmailOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
  if (error) throw error
  return data.session
}

export async function signOut() {
  await supabase.auth.signOut()
}
