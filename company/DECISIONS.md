# Registro de Decisiones (ADRs)

> Decisiones de la compañía, append-only. No se borran; si una cambia, se agrega una nueva que la supera y se marca la anterior como *Reemplazada*. Formato: contexto → decisión → estado.

---

### ADR-0001 — Mobile del cliente = Wallet passes + PWA (sin app nativa en el MVP)
**Contexto:** el cliente necesita junta-sellos en el celular; la marca promete "sin app que descargar" y la competencia ganadora usa Wallet.
**Decisión:** la tarjeta vive en **Apple Wallet + Google Wallet** y en una **PWA web instalable**. No se construye app nativa de tienda en el MVP (posible fast-follow).
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0002 — Primer foco = plataforma completa con Mercado Pago
**Contexto:** se priorizó vendibilidad desde el lanzamiento.
**Decisión:** construir el core **con Mercado Pago desde el día uno** (cobro de la suscripción SaaS al comercio). Sello-atado-al-pago vía MP queda en roadmap.
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0003 — Compañía operada por IA + producto en paralelo
**Contexto:** primer "startup AI" del CEO; quiere equipos por área que le reporten.
**Decisión:** se monta la estructura `company/` (8 áreas, memoria autoeditable, loop infinito) **y** se construye el producto en paralelo. CEO = Mariano; COO/orquestador = Claude.
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0004 — Modelo de escaneo = el cliente escanea (cero fricción del cajero)
**Contexto:** target cafeterías donde el cajero está al lado del QR.
**Decisión:** **el cliente escanea** el QR con la cámara nativa. Anti-fraude en capas: cooldown **15 min** por usuario/local, cuenta real (WhatsApp), geocerca, tope diario, detección de anomalías server-side, y a futuro **sello automático atado al pago de Mercado Pago**.
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0005 — Cadencia de gobierno = reunión semanal + email en bloqueos
**Contexto:** el CEO quiere autonomía con seguimiento.
**Decisión:** **reunión semanal de visión** (CEO + COO) y **email al CEO** solo cuando algo está bloqueado esperándolo o amerita su atención. El resto vive en Mission Control y no lo interrumpe.
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0006 — Reparto Wallet ↔ Web
**Contexto:** definir qué hace cada superficie del cliente.
**Decisión:** el **Wallet pass** es vidriera viva (muestra tarjeta + sellos vía campo numérico e imagen regenerada por push, y notifica). Las **acciones** (sumar sello al escanear, ver historial y **canjear**) pasan por la **PWA/web**. El pase incluye un link "Canjear en Wafi →" al dorso.
**Estado:** ✅ Vigente · CEO · 2026-06-04

### ADR-0007 — Flujo de canje = Opción A (auto-canje con código rotativo)
**Contexto:** el canje es el punto de mayor valor/riesgo; balancear fraude vs fricción.
**Decisión:** al completar la tarjeta el cliente recibe un **voucher de un solo uso**; lo canjea desde la web tocando "Canjear", que muestra un **código/QR rotativo válido 2-3 min**. Sin trabajo del cajero (solo lo verifica de vista). Vencimiento corto + single-use evitan reuso.
**Estado:** ✅ Vigente · CEO · 2026-06-04
