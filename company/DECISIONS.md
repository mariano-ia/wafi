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

### ADR-0008 — Modos de QR: estático imprimible (default) + dinámico rotativo (opcional)
**Contexto:** balance entre simplicidad ("imprimí y pegá") y anti-fraude.
**Decisión:** el QR **estático imprimible es el default**; el comercio puede activar en su panel un **QR dinámico rotativo** (opcional) para máximo blindaje. Backend: `wafi.stamp_cards.qr_mode ∈ {static, dynamic}`.
**Estado:** ✅ Vigente · CEO · 2026-06-05

### ADR-0009 — Presencia física obligatoria (hard), no opcional
**Contexto:** el CEO exige que el cliente NO pueda sumar sellos desde casa.
**Decisión:** la verificación de **presencia es obligatoria** (`require_presence=true` por default): sin geo dentro del radio del local, **no hay sello**. Supera la postura "geocerca soft/cosmética" del PRD §15. **Salvedad honesta:** con QR estático la geocerca GPS es spoofeable por un usuario técnico; lo único airtight es el **QR dinámico** (ADR-0008) o el **sello atado al pago MP** (roadmap). Para blindaje total, usar QR dinámico.
**Estado:** ✅ Vigente · CEO · 2026-06-05

### ADR-0010 — Free trial de 30 días, cobro automático al día 31
**Contexto:** producto de hábito (café diario); generar dependencia antes de cobrar.
**Decisión:** **trial de 30 días**; al día 31 se cobra la suscripción vía Mercado Pago. **Decisión final (CEO):** **sin tarjeta upfront** — valor primero, fricción mínima. La tarjeta se pide **al día 31** (al chocar el paywall). Apuesta: lock-in por sellos acumulados + precio no-brainer. Backend: `subscriptions.trial_days=30`, `trial_ends_at`.
**Estado:** ✅ Vigente · CEO · 2026-06-05

### ADR-0011 — Soft-paywall del día 31: congelar, no borrar
**Contexto:** cómo bloquear el impago sin castigar al cliente final.
**Decisión:** al día 31 sin pago el programa se **congela** (el QR deja de dar sellos nuevos → presión inmediata sobre el dueño), pero **los sellos y vouchers ganados se preservan** y los vouchers se pueden seguir canjeando; al pagar, **se restaura todo al instante**. Backend: `wafi.merchant_can_stamp()` + gate en `register_scan` (estado `subscription_inactive`). Customer Success es dueño de que el local enganche clientes reales durante el trial (sin eso, no hay palanca el día 31).
**Estado:** ✅ Vigente · CEO · 2026-06-05

### ADR-0012 — Apple Wallet desbloqueado
**Contexto:** el CEO ya tiene cuenta/suscripción Apple Developer.
**Decisión:** Apple Wallet va, no es bloqueante. Google Wallet sigue requiriendo solicitud de Issuer (arrancar ya por el lead time).
**Estado:** ✅ Vigente · CEO · 2026-06-05
