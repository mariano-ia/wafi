import { createClient } from '@supabase/supabase-js'

// Cliente Supabase de la app del cliente. La URL y la anon key son PÚBLICAS por diseño
// (la anon/publishable key viaja en el bundle; los datos los protege RLS). Por eso van
// como fallback embebido y se pueden sobreescribir con VITE_*. El service_role NUNCA va acá.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://ajqjicwuqbxpgkrrnryn.supabase.co'
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PCi1fINjoAxKD6VtvNs3Lg_6NHjBs2C'

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})
