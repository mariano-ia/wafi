# Ledger de Hitos — Wafi

> Infinito y autoeditable. La org elige siempre el hito de mayor valor NO bloqueado. Estados: ⬜ pendiente · 🟡 en curso · ✅ hecho · ⛔ bloqueado (CEO/externo). Staging según PRD §13 (MVP-0 PWA-como-tarjeta → MVP-1 wallets).

## Fase 0 — Bootstrap de la compañía
- ✅ Investigar competencia y material `old/`
- ✅ Tomar decisiones fundacionales (ADR-0001..0007)
- ✅ Definir producto (PRD verificado adversarialmente)
- ✅ Montar sistema operativo de la compañía (org, loop, memoria, Mission Control)
- ✅ Backend Supabase: schema `wafi` + RLS + RPC anti-fraude (scan/canje) aplicado
- 🟡 Instanciar los 8 departamentos con memoria autoeditable
- 🟡 Scaffold del producto (monorepo) + capa de datos contra Supabase
- ⛔ Tokens/credenciales externas (CEO entrega mañana) → ver [docs/SETUP-EXTERNAL.md](../docs/SETUP-EXTERNAL.md)

## Fase 1 — MVP-0 (PWA como la tarjeta, sin wallets nativos) · ~6-8 semanas
- ⬜ Auth del comercio (Supabase Auth) + recuperación + "Primeros pasos" (wizard)
- ⬜ Identidad del cliente por **SMS OTP** (Supabase Auth + Twilio Verify; WhatsApp futuro) + consentimiento (Ley 25.326)
- ⬜ Edge Function de sello server-side con capas 1+2+3+5 (**presencia dura**) + rate-limit
- ⛔ Flujo cámara-nativa real `/s/{merchant}` (depende de dominio + deploy)
- ⬜ PWA cliente: tarjeta, progreso, voucher + timer 5min + **canje por re-escaneo** (ADR-0007)
- ⬜ Panel comercio: Inicio, Clientes, Mi tarjeta, Actividad en vivo (reusar `old/`, corregir `/8` y cooldown→15min)
- ⛔ Cobro suscripción **Mercado Pago** preapproval + webhook `x-signature` + pantalla Suscripción (depende tokens MP)
- ⬜ Transversales: empty states en voseo, flujo offline/sin-wifi, a11y mínima, comportamiento past_due
- ⬜ Beta cerrada con 5-10 cafeterías reales

## Fase 2 — MVP-1 (Wallets + notificaciones) · ~semanas 9-14
- ⛔ Apple Wallet `.pkpass` + web service de updates (depende cert Apple Pass Type ID)
- ⛔ Google Wallet objects + push (depende Google Issuer)
- ⬜ Link "Canjear →" destacado en el pase cuando la tarjeta está completa (idea CEO)
- ⬜ Email transaccional (voucher emitido, resumen) + capa anti-fraude 6 (anomalías) + Actividad/anular (capa 7)

## Fase 3 — Lanzamiento
- ⛔ Dominio wafi.com.ar + migrar landing (WordPress→Astro/Next) — CEO-only (compra)
- ⬜ Ejecutar launch playbook (adaptado a cafeterías AR)
- ⬜ Pipeline de ventas: outbound a cafeterías (CABA/Córdoba/Rosario/Mendoza)

## Fase 4+ — Mejora continua (loop infinito post-MVP)
- ⬜ **Sello atado al pago Mercado Pago** (Orders API + webhook) — el moat anti-fraude definitivo
- ⬜ Índice de Fidelización 0-100, categorías dinámicas, segmentación
- ⬜ WhatsApp como canal de notificación, web push
- ⬜ Multi-sucursal, roles/staff, otros verticales, expansión LATAM
- ⬜ Wafi Mission Control como dashboard web (render de estos archivos para el CEO)

> Decisiones del CEO que desbloquean hitos: [docs/CEO-PENDING-DECISIONS.md](../docs/CEO-PENDING-DECISIONS.md).
