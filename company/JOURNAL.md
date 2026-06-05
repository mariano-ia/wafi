# Bitácora — Wafi

> Append-only. Qué pasó cada ciclo. Lo más nuevo arriba.

## 2026-06-04 · Ciclo 0 — Bootstrap (sesión nocturna, autónoma)

**Contexto:** primera sesión. El CEO definió la visión (fidelización con sellos digitales para gastronómicos AR, Mercado Pago, compañía operada por IA), aprobó el equipo y la cadencia, y delegó avanzar en autónomo durante la noche.

**Decisiones tomadas (ADR-0001..0007):** Wallet+PWA; plataforma completa con MP; compañía AI + producto en paralelo; cliente-escanea con anti-fraude por capas; cadencia semanal + email en bloqueos; reparto Wallet↔web; canje por código rotativo (Opción A).

**Hecho:**
- Investigación de competencia (FIU, Loyalz, Loopy, Boomerangme, Gastuki, etc.) y del material `old/`.
- **PRD v2.0** producido por un workflow de 14 agentes (855k tokens) con verificación adversarial (fraude/MP/scope/marca). Guardado en `docs/`.
- **Backend Supabase**: identifiqué el proyecto del blog de yacaré (`elpantano`/`ajqjicwuqbxpgkrrnryn`) y le apliqué el schema `wafi` aislado (3 migraciones: tablas, RLS, funciones anti-fraude/canje). Probado con `cafe-roma`.
- **Sistema operativo de la compañía**: `CLAUDE.md`, `company/` (north-star, org, modelo operativo, CEO, Mission Control, milestones, decisiones, memoria global) + 8 departamentos con memoria autoeditable.
- **Scaffold del producto**: monorepo `product/` reusando `old/`, capa `@wafi/shared` cableada a los RPC, stubs de Edge Functions, `.env.example`, `SETUP-EXTERNAL.md`.

**Aprendizajes:** entorno sin Node/pnpm (builds pendientes); el equipo recomienda staging MVP-0 (PWA) / MVP-1 (wallets); fee MP real 4-6%; "sin app" no es moat.

**Bloqueos para el CEO:** aprobar staging, 5 decisiones de producto, y entregar tokens externos.

**Próximo ciclo:** reconectar apps a Supabase, auth comercio + OTP + cobro MP (cuando haya Node + tokens).
