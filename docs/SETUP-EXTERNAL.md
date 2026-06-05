# Setup externo — qué necesito de vos (CEO) para conectar Wafi con el mundo

> Dejé **todo el código y el backend armados**. Esto es lo único que falta: credenciales que solo vos podés generar. Ordenado por prioridad. Cuando me pases cada token, lo enchufo y avanzo solo.

## 0. Toolchain local (para correr/buildear)
Esta máquina **no tiene Node/pnpm**. Para que pueda correr y verificar las apps:
- Instalá **Node 20+** y **pnpm** (`brew install node` + `corepack enable`), o decime que use otra máquina/entorno.

## 1. 🔴 Crítico para el MVP-0 (cobrar + identidad)

| Servicio | Qué necesito | Dónde se saca | Variable |
|---|---|---|---|
| **Supabase service role** | La *service_role key* del proyecto `elpantano` | Dashboard Supabase → Project Settings → API | `SUPABASE_SERVICE_ROLE_KEY` |
| **Mercado Pago** | Crear app en MP Developers → Access Token + Public Key (prod, tras KYC) + secret de webhook | mercadopago.com.ar/developers | `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY`, `MP_WEBHOOK_SECRET` |
| **WhatsApp OTP** | Meta Business verificado + número + token de Cloud API (o cuenta 360dialog/Twilio) | developers.facebook.com (WhatsApp) | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` |
| **Email transaccional** | API key de Resend (o el que prefieras) | resend.com | `RESEND_API_KEY` |
| **Cloudflare Turnstile** | Site + secret (anti-bot en alta/primer escaneo) | dash.cloudflare.com → Turnstile | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |

> Tramites con lead time (arrancar YA en paralelo): **KYC de Mercado Pago** y **verificación de Meta/WhatsApp** tardan días-semanas. Son el camino crítico real, no el código.

## 2. 🟡 Para deploy y código
| Servicio | Qué necesito | Variable / acción |
|---|---|---|
| **GitHub** | Repo vacío `wafi` (o decime el nombre) + que me des acceso/token, o lo creo con `gh` si lo dejás logueado | push del repo |
| **Vercel** | Cuenta/token para deployar `customer`, `merchant`, `landing` | deploy |
| **Dominio** | Registrar **wafi.com.ar** (nic.ar) — el PRD recomienda dejar wafi.us | DNS |

## 3. 🟢 MVP-1 (Wallets — no urgente, ~semanas 9-14)
| Servicio | Qué necesito | Variable |
|---|---|---|
| **Apple Wallet** | Apple Developer (USD 99/año) + cert **Pass Type ID** + WWDR | `APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID` |
| **Google Wallet** | Google Cloud → Wallet API → Issuer ID + service account JSON | `GOOGLE_WALLET_ISSUER_ID` |

## Cómo me los pasás
Pegámelos cuando hablemos y los cargo en `.env` (que está en `.gitignore`, no se commitean). Para los archivos (certs, JSON de service account) decime y te indico dónde dejarlos.

> Todo esto está pre-cableado en [product/.env.example](../product/.env.example) y en los stubs de [product/supabase/functions](../product/supabase/functions).
