// Edge Function: wafi-stamp — autoridad del sello (MVP-0).
// Envuelve el RPC wafi_register_scan agregando rate-limit, Turnstile y presencia
// dura server-side (IP/ASN/horario) que el RPC solo no puede ver. Ver PRD §8 y §12.
// TODO(tokens): TURNSTILE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY.
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const { slug, lat, lng, fingerprint, turnstileToken } = await req.json().catch(() => ({}))

  // 1) Anti-bot (Turnstile) — TODO: validar turnstileToken contra TURNSTILE_SECRET_KEY
  // 2) Rate-limit por IP/fingerprint (DoS) — TODO: usar tabla/Upstash
  // 3) Presencia dura: cruzar IP server-side (req headers) + horario antes de delegar

  const authHeader = req.headers.get('Authorization') ?? ''
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  )
  const { data, error } = await supabase.rpc('wafi_register_scan', {
    p_slug: slug, p_lat: lat ?? null, p_lng: lng ?? null, p_fingerprint: fingerprint ?? null,
  })
  if (error) return Response.json({ status: 'invalid', reason: error.message }, { status: 400 })
  return Response.json(data)
})
