import { createClient } from '@supabase/supabase-js'

// Cliente Supabase compartido por las apps (merchant, customer).
// Las variables vienen de Vite (VITE_*). Ver product/.env.example.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // No rompemos el build, pero avisamos fuerte en dev.
  console.warn('[wafi] Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Ver .env.example')
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: true, autoRefreshToken: true },
})
