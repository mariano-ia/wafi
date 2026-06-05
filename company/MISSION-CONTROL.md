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
- 🟡 **Equipo de Marketing produciendo** (corriendo ahora): plan de marketing + 6 piezas (Instagram, LinkedIn/X, emails, WhatsApp, contenido/SEO, ads) + QA de marca.
- ⏭️ Construir las apps (reconectar a Supabase, auth comercio, OTP, cobro MP) cuando haya **Node + tokens**.
→ [MILESTONES.md](MILESTONES.md).

## 🚩 Bloqueos
- **Sin Node/pnpm local** → no puedo correr/buildear las apps.
- **Tokens externos** (Mercado Pago en el día; resto en [SETUP-EXTERNAL](../docs/SETUP-EXTERNAL.md)).

## 📥 Inbox del CEO
Decisiones grandes ya resueltas hoy (staging, escaneo, QR, presencia, trial/freeze, Apple). **Queda por definir** (negocio): número final de precio en ARS, límite exacto del Free, compra del dominio wafi.com.ar, y alcance de mensajería → [docs/CEO-PENDING-DECISIONS.md](../docs/CEO-PENDING-DECISIONS.md). Y **pasarme los datos de Mercado Pago**.

## 📊 Métricas
Sin datos de uso (pre-lanzamiento).

## 🏢 Estado por área
Producto ✅ spec MVP-0 · Ingeniería 🟡 backend avanzado, apps pendientes (Node) · Diseño ✅ design system · Marketing 🟡 plan + piezas en producción · Ventas ✅ kit outbound · Finanzas 🟡 modelo cerrado, precio final a confirmar · Customer Success ⬜ (dueño del enganche en el trial) · Datos ⬜ (arranca con escaneos reales).
