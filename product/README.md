# Wafi — Producto (monorepo)

Monorepo pnpm. Reusa el prototipo de `old/` como base de UI.

## Estructura
```
apps/
  customer/   PWA del cliente (junta-sellos, voucher, canje)
  merchant/   Panel web del comercio
  landing/    Landing de marketing
packages/
  shared/     Cliente Supabase + capa de datos (api.js) compartida
supabase/
  migrations/ (aplicadas al proyecto; pull con `supabase db pull`)
  functions/  Edge Functions (wafi-stamp, mp-webhook, wallet-pass)
```

## Arrancar (cuando haya Node/pnpm)
```bash
cd product
cp .env.example .env   # completar con los tokens (ver ../docs/SETUP-EXTERNAL.md)
pnpm install
pnpm -r --parallel dev
```

## Estado
- ✅ Backend Supabase vivo (schema `wafi`, RLS, RPC anti-fraude). Ver [supabase/README.md](supabase/README.md).
- ✅ Capa de datos `@wafi/shared` con los RPC reales cableados.
- 🟡 **Pendiente de la próxima iteración (necesita Node + tokens):** reconectar las apps de `old/` (hoy usan `src/data/mock.js`) a `@wafi/shared/api`, auth del comercio, OTP WhatsApp, cobro MP, corregir `/8`→`program.stamps_required` y cooldown 1h→15min, reescribir `ScanModal`.

> Definición de producto: [../docs/PRODUCT-DEFINITION.md](../docs/PRODUCT-DEFINITION.md).
