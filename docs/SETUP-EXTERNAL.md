# Setup externo — qué necesito de vos (CEO) para conectar Wafi con el mundo

> Dejé **todo el código y el backend armados**. Esto es lo único que falta: credenciales que solo vos podés generar. Cuando me pasés cada token, lo enchufo y avanzo solo. Estado al 2026-06-12.

## ✅ Ya resuelto
- **Supabase service_role key** — cargada en `product/.env` (no se commitea).
- **GitHub** — repo `mariano-ia/wafi` creado y `gh` logueado.

## 0. Toolchain
**No hace falta Node local:** las Edge Functions se deployan por el MCP de Supabase y el front-end buildea en **Vercel** (nube). Si igual querés correr local, instalá Node 20+ y pnpm.

## 1. 🔴 Crítico para el MVP-0
| Servicio | Qué necesito | Dónde | Variables |
|---|---|---|---|
| **Mercado Pago** | App en MP Developers → Access Token + Public Key (prod, tras KYC) + secret de webhook | mercadopago.com.ar/developers | `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY`, `MP_WEBHOOK_SECRET` |
| **Twilio (SMS OTP)** | Cuenta Twilio → un **Verify Service** → Account SID + Auth Token + Verify Service SID | twilio.com → Verify | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID` |
| **Vercel** | Cuenta/token para deployar `customer`, `merchant`, `landing` | vercel.com | deploy |

**Login del cliente = SMS OTP** (Supabase Auth + Twilio Verify). Canal SMS ahora; WhatsApp se agrega como canal en el mismo Verify Service más adelante, sin tocar código (ADR-0013). Pasos del lado Supabase: Authentication → Providers → **Phone** → habilitar → proveedor **Twilio Verify** → pegar los 3 SIDs.

> Lead time: **KYC de Mercado Pago** puede tardar días. Es el camino crítico. Twilio y Vercel son inmediatos.

## 2. 🟢 Secundarios (mejoran, no bloquean)
| Servicio | Qué necesito | Variable |
|---|---|---|
| **Cloudflare Turnstile** | Site + secret (anti-bot en alta/primer escaneo) | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| **Resend** | API key (email transaccional) | `RESEND_API_KEY` |

## 3. 🔵 MVP-1 (Wallets — no urgente)
| Servicio | Qué necesito | Variable |
|---|---|---|
| **Apple Wallet** | Ya tenés cuenta ✓ → cert **Pass Type ID** + WWDR | `APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID` |
| **Google Wallet** | Issuer ID (requiere aprobación — pedir ya) + service account JSON | `GOOGLE_WALLET_ISSUER_ID` |

> WhatsApp Business (Meta) ya **no** es necesario para el login. Queda como canal opcional de marketing/soporte y como swap futuro del Verify Service.

## Cómo me los pasás
Pegámelos en el chat y los cargo en `product/.env` (gitignored). Para archivos (cert `.p12` de Apple, JSON de Google) decime y te indico dónde dejarlos.
