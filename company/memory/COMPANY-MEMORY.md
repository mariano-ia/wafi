# Memoria Global — Wafi

> Autoeditable y perpetua. Nunca borrar: superar o anotar. Hechos, convenciones y aprendizajes que toda la org debe conocer.

## Estado actual (2026-06-04)
Bootstrapping. Producto definido (PRD v2.0). Backend Supabase vivo (schema `wafi`). Sistema operativo de la compañía montado. Esperando tokens externos del CEO. Sin código de producto corriendo aún (no hay node local).

## Hechos fijos
- **Producto:** SaaS de fidelización con sellos digitales para **cafeterías de Argentina**. Reemplaza la tarjeta de cartón.
- **CEO:** Mariano Noceti (`marianonoceti@gmail.com`). Primer "startup AI". Quiere autonomía con seguimiento.
- **Backend:** Supabase proyecto **`elpantano`** (id `ajqjicwuqbxpgkrrnryn`, región sa-east-1) — es el blog de yacaré, reutilizado. Wafi vive en el **schema `wafi`** aislado; el blog (schema `public`) NO se toca. **No usar ningún otro proyecto Supabase** (instrucción del CEO).
  - URL: `https://ajqjicwuqbxpgkrrnryn.supabase.co` · anon key publishable: `sb_publishable_PCi1fINjoAxKD6VtvNs3Lg_6NHjBs2C`
  - Schema `wafi` expuesto a PostgREST; RPCs en `public.wafi_*` (get_merchant_public, register_scan, issue_redeem_token, redeem_voucher).
  - Comercio demo: slug `cafe-roma`.
- **Mecánica:** cliente escanea QR → sello server-side con anti-fraude por capas (cooldown 15min, tope diario, presencia dura, geocerca soft, anomalías). Voucher con código + token rotativo 3min para canje (ADR-0007).
- **Cliente:** Wallet pass + PWA. **PRD recomienda MVP-0 = PWA primero, wallets en MVP-1** (decisión CEO pendiente).
- **Monetización:** suscripción al comercio vía Mercado Pago desde el día uno. Precios ARS pendientes (decisión CEO).

## Convenciones
- **Idioma producto:** español rioplatense (voseo). Enemigo = tarjeta de cartón, nunca un competidor. Palabra "plataforma" vetada en copy público.
- **Léxico:** registro INTERNO (técnico) ≠ registro PÚBLICO (BRAND-VOICE). Ver PRD §4.4.
- **Repo:** `company/` = la compañía; `product/` = el producto; `docs/` = specs; `old/` = referencia (no producción).
- **Skills:** Superpowers (método) + awesome-claude-skills (capacidades). Ver [../OPERATING-MODEL.md](../OPERATING-MODEL.md).

## Aprendizajes
- El entorno local **no tiene node/npm** (sí git y supabase CLI, y MCP de Supabase autenticado). Builds/instalación quedan para cuando haya toolchain.
- El competidor más directo en AR es **FIU** (wallet-pass, QR, sin registro); **Loyalz Club** es el de más tracción regional.
- Fee real de Mercado Pago: usar **4-6% conservador**, no 1,49%.
- "Sin app" NO es moat (table-stake de la categoría wallet). Los moats: MP nativo, voz AR, anti-fraude presencia dura, precio en pesos.

## Glosario
- **Sello / scan:** evento de sumar un punto. Fuente de verdad = tabla `wafi.scans` (inmutable).
- **Membresía:** progreso de un cliente en un comercio (`wafi.memberships`).
- **Voucher:** premio canjeable al completar la tarjeta.
- **Presencia dura:** verificación server-side de que el cliente está físicamente en el local (IP/geo/horario), capa anti-fraude central.
