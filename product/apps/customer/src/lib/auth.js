import { supabase } from './supabase.js'

// Auth del cliente. Interino: OTP por EMAIL (Supabase nativo). Producción: canal SMS
// (Twilio Verify) sin cambiar este contrato (ADR-0013).

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
  return () => data.subscription.unsubscribe()
}

export async function sendEmailOtp(email) {
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
  if (error) throw error
}

export async function verifyEmailOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
  if (error) throw error
  return data.session
}

export async function signOut() {
  await supabase.auth.signOut()
}
