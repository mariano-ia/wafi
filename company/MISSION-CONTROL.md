# 🛰️ Mission Control — Wafi

> La pantalla del CEO. Actualizada por la org cada ciclo. Última actualización: **2026-06-04, noche** (ciclo 0 · bootstrap).

## 🎯 North-star
**Clientes activos recurrentes** (≥1 sello verificado en 30 días) — `0` (pre-lanzamiento).

## 🔄 Ciclo actual
**Ciclo 0 — Bootstrap.** La compañía se montó sola y dejó el producto definido y el backend vivo. En pausa de construcción pesada hasta tener **Node local + tokens externos** (mañana).

## ✅ Hecho (esta noche, en autónomo)
- Producto **definido**: PRD v2.0 verificado adversarialmente → [docs/PRODUCT-DEFINITION.md](../docs/PRODUCT-DEFINITION.md)
- **Backend vivo** en Supabase (proyecto del blog de yacaré, schema `wafi` aislado): 11 tablas, RLS, y RPC anti-fraude (`register_scan` con cooldown 15min/tope/geocerca/presencia + canje por token rotativo). Probado con comercio demo `cafe-roma`.
- **Compañía montada**: constitución, org, modelo operativo (loop infinito + cadencia), 8 departamentos con memoria autoeditable.
- **Scaffold del producto** (`product/`): monorepo reusando `old/` + capa de datos `@wafi/shared` cableada a los RPC reales + stubs de Edge Functions (stamp/MP/wallet).
- Setup externo documentado: [docs/SETUP-EXTERNAL.md](../docs/SETUP-EXTERNAL.md) + `.env.example`.

## 🚧 En curso / ⏭️ Próximo (cuando haya Node + tokens)
1. Reconectar las apps de `old/` a `@wafi/shared/api` (hoy usan mock).
2. Auth del comercio + WhatsApp OTP + cobro Mercado Pago.
3. Edge Function `wafi-stamp` (rate-limit + Turnstile + presencia dura).
4. Beta cerrada con 5-10 cafeterías.
→ Detalle en [MILESTONES.md](MILESTONES.md).

## 🚩 Bloqueos
- **Sin Node/pnpm local** → no puedo correr/buildear las apps. (Pedido en SETUP-EXTERNAL §0.)
- **Sin tokens externos** (Supabase service role, Mercado Pago, WhatsApp, etc.) → billing/OTP/deploy esperan.

## 📥 Inbox del CEO (decisiones que te esperan)
1. **Staging del MVP:** el equipo recomienda **MVP-0 = PWA como la tarjeta, wallets nativos a MVP-1** (los wallets son la integración más lenta/riesgosa y nada crítico los requiere). ¿Lo aprobás? *(toca tu decisión ADR-0001).*
2. **5 decisiones de producto/negocio** (pricing en ARS, límite del Free, trial con/sin tarjeta, dominio wafi.com.ar, alcance de mensajería) → [docs/CEO-PENDING-DECISIONS.md](../docs/CEO-PENDING-DECISIONS.md).
3. **Tokens externos** para destrabar billing/OTP/deploy → [docs/SETUP-EXTERNAL.md](../docs/SETUP-EXTERNAL.md).
4. **Nota:** el proyecto Supabase del blog de yacaré tiene **RLS desactivado en 4 tablas del blog** (tema de seguridad de yacaré, no de Wafi). Te lo señalo por si querés que lo arreglemos.

## 📊 Métricas
Sin datos de uso todavía (pre-lanzamiento). Datos & Analytics arranca tracking apenas haya escaneos reales.

## 🏢 Estado por área
Producto ✅ definió el MVP · Ingeniería 🟡 backend listo, apps pendientes · Diseño ⬜ · Marketing ⬜ · Ventas ⬜ · Finanzas 🟡 pricing a definir (CEO) · Customer Success ⬜ · Datos ⬜ — todas instanciadas, esperando arrancar su primer ciclo.
