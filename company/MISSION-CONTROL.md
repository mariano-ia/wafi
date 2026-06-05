# 🛰️ Mission Control — Wafi

> La pantalla del CEO. Actualizada por la org cada ciclo. Última actualización: **2026-06-05, mañana** (ciclo 1).

## 🎯 North-star
**Clientes activos recurrentes** (≥1 sello verificado en 30 días) — `0` (pre-lanzamiento).

## 🔄 Ciclo actual
**Ciclo 1 — Definición y piezas.** Producto, backend y materiales avanzando en autónomo. Construcción de las apps en pausa hasta tener **Node local + tokens** (Mercado Pago en el día).

## ✅ Hecho
**Bootstrap (04/06):** producto definido (PRD v2.0), backend Supabase vivo (schema `wafi` aislado), compañía montada (8 áreas con memoria), scaffold del producto.
**Hoy (05/06):**
- **5 entregables del equipo:** [spec MVP-0](../docs/specs/MVP-0-SPECS.md), [copy de landing](../docs/marketing/LANDING-COPY.md), [design system](../docs/design/DESIGN-SYSTEM.md), [kit de ventas](../docs/sales/OUTBOUND-KIT.md), [guía Wallet](../docs/WALLET-SETUP.md).
- **Backend evolucionado:** modos de QR (`qr_mode`), **presencia obligatoria hard**, y **soft-paywall del día 31 (freeze, no delete)** ya implementado (`merchant_can_stamp` + gate en `register_scan`).
- **Modelo de negocio cerrado:** trial 30 días **sin tarjeta** → freeze día 31 → pago. Apple Wallet desbloqueado. Decisiones [ADR-0008..0012](DECISIONS.md). Spec y landing **parcheados** a este modelo.

## 🚧 En curso / ⏭️ Próximo
- ✅ **Marketing entregado:** [plan de marketing](../docs/marketing/MARKETING-PLAN.md) + 6 piezas en [docs/marketing/pieces/](../docs/marketing/pieces/) (Instagram, LinkedIn/X, emails, WhatsApp, contenido/SEO, ads), aprobadas por [QA de marca](../docs/marketing/BRAND-QA.md) (7/7 OK).
- ⏭️ Construir las apps (reconectar a Supabase, auth comercio, OTP, cobro MP) cuando haya **Node + tokens**.
→ [MILESTONES.md](MILESTONES.md).

## 🚩 Bloqueos
- **Sin Node/pnpm local** → no puedo correr/buildear las apps.
- **Tokens externos** (Mercado Pago en el día; resto en [SETUP-EXTERNAL](../docs/SETUP-EXTERNAL.md)).

## 📥 Inbox del CEO
Decisiones grandes ya resueltas (staging, escaneo, QR, presencia, trial/freeze, Apple).
**Lo que necesito para construir las apps (mañana):**
1. **Mercado Pago** — access token + public key + webhook secret.
2. **Supabase service_role key** (proyecto `elpantano`).
3. **GitHub** repo + acceso. 4. **Vercel** acceso. (Con esto buildeo en la nube — no hace falta Node local.)
Luego: WhatsApp Cloud API, Turnstile, Resend. Detalle → [docs/SETUP-EXTERNAL.md](../docs/SETUP-EXTERNAL.md).
**Decisiones de negocio que quedan:** precio final ARS, límite del Free, dominio wafi.com.ar, alcance de mensajería → [docs/CEO-PENDING-DECISIONS.md](../docs/CEO-PENDING-DECISIONS.md).

## 📊 Métricas
Sin datos de uso (pre-lanzamiento).

## 🏢 Estado por área
Producto ✅ spec MVP-0 · Ingeniería 🟡 backend avanzado, apps pendientes (Node) · Diseño ✅ design system · Marketing ✅ plan + 6 piezas entregadas (QA 7/7) · Ventas ✅ kit outbound · Finanzas 🟡 modelo cerrado, precio final a confirmar · Customer Success ⬜ (dueño del enganche en el trial) · Datos ⬜ (arranca con escaneos reales).
