// Edge Function: mp-webhook — webhooks de Mercado Pago (suscripción del comercio).
// Verifica x-signature + GET canónico, actualiza wafi.subscriptions. Ver PRD §10.3.
// TODO(tokens): MP_ACCESS_TOKEN, MP_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY.

Deno.serve(async (req) => {
  const signature = req.headers.get('x-signature') ?? ''
  const body = await req.json().catch(() => ({}))

  // 1) Validar firma HMAC (x-signature + x-request-id) contra MP_WEBHOOK_SECRET — TODO
  // 2) GET canónico al recurso (/v1/payments/{id} o /preapproval/{id}) con MP_ACCESS_TOKEN — TODO
  // 3) Mapear estado MP → wafi.subscriptions.status (trialing/active/past_due/cancelled) — TODO
  console.log('[mp-webhook] tipo:', body?.type, 'sig?', !!signature)

  return new Response('ok', { status: 200 }) // responder 200 rápido; procesar idempotente
})
