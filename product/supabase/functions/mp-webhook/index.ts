import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Webhook de Mercado Pago (suscripción del comercio). Público (verify_jwt=false):
// MP no manda JWT de Supabase; la autenticidad se valida por firma HMAC (x-signature).
// Los secrets (MP_WEBHOOK_SECRET, MP_ACCESS_TOKEN) se cargan como secrets de la función
// en el dashboard de Supabase. Responde 200 rápido; procesa idempotente.
// Ver docs/specs/MVP-0-SPECS.md Feature 7.
// Desplegada en: https://ajqjicwuqbxpgkrrnryn.supabase.co/functions/v1/mp-webhook

async function hmacHex(key: string, msg: string): Promise<string> {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(msg));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // MP a veces valida la URL con un GET → 200.
  if (req.method === "GET") return new Response("wafi mp-webhook ok", { status: 200 });

  const xSig = req.headers.get("x-signature") ?? "";
  const xReqId = req.headers.get("x-request-id") ?? "";
  // deno-lint-ignore no-explicit-any
  let body: any = {};
  try { body = await req.json(); } catch { /* sin body */ }

  const secret = Deno.env.get("MP_WEBHOOK_SECRET");
  const type = body?.type ?? url.searchParams.get("type") ?? "unknown";
  const dataId = String(url.searchParams.get("data.id") ?? body?.data?.id ?? "");

  // Validación de firma (modo log por ahora: NO rechaza hasta confirmar con eventos reales)
  let sigValid: boolean | null = null;
  if (secret && xSig) {
    const parts: Record<string, string> = {};
    for (const p of xSig.split(",")) { const i = p.indexOf("="); if (i > 0) parts[p.slice(0, i).trim()] = p.slice(i + 1).trim(); }
    const ts = parts["ts"]; const v1 = parts["v1"];
    if (ts && v1) {
      const manifest = `id:${dataId};request-id:${xReqId};ts:${ts};`;
      const expected = await hmacHex(secret, manifest);
      sigValid = expected === v1;
    }
  }

  console.log(JSON.stringify({ at: "mp-webhook", type, dataId, reqId: xReqId, sigValid, secretConfigured: !!secret }));

  // TODO: si sigValid, GET canónico al recurso (/v1/payments/{id} o /preapproval/{id}) con
  // MP_ACCESS_TOKEN y update idempotente de wafi.subscriptions (mapeo de estados).
  return new Response("ok", { status: 200 });
});
