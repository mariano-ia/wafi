# Backend Wafi (Supabase)

**Proyecto:** `elpantano` · id `ajqjicwuqbxpgkrrnryn` · región sa-east-1 (es el blog de yacaré; Wafi vive aislado en el **schema `wafi`**, no toca el blog).

## Estado: migraciones aplicadas ✅
Aplicadas vía MCP (en el historial de migraciones del proyecto):
- `wafi_0001_schema_tables` — schema `wafi`, tipos enum, 11 tablas, índices, triggers `updated_at`.
- `wafi_0002_rls_policies` — RLS + políticas (comercio ve lo suyo, cliente ve lo suyo).
- `wafi_0003_functions_rpc` — anti-fraude y canje:
  - `public.wafi_get_merchant_public(slug)` — branding para la landing (anon).
  - `public.wafi_register_scan(slug, lat, lng, fingerprint)` — suma sello con capas anti-fraude (cooldown 15min, tope diario, geocerca, presencia). Cliente = `auth.uid()`.
  - `public.wafi_issue_redeem_token(voucher)` — token rotativo de canje (3 min).
  - `public.wafi_redeem_voucher(voucher, token)` — quema el voucher (ADR-0007).

Para materializar las migraciones en este repo: `supabase link --project-ref ajqjicwuqbxpgkrrnryn && supabase db pull`.

## Datos demo
Comercio `cafe-roma` (8 sellos = "Un café con leche gratis") para probar.

## Pendiente (necesita tokens — ver docs/SETUP-EXTERNAL.md)
- Edge Functions: `wafi-stamp` (autoridad del sello + rate-limit + Turnstile), `mp-webhook` (Mercado Pago), `wallet-pass` (MVP-1).
- Refinamientos del PRD §11: tabla `consent` (Ley 25.326), estado `pending` en scans, `program_version`.
