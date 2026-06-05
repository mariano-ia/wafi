# Wafi — Plataforma de fidelización con tarjetas de sellos digitales

## Stack
- **Monorepo** pnpm workspaces con 3 apps:
  - `apps/merchant` (puerto 3000) — Dashboard del comercio
  - `apps/customer` (puerto 3001) — App mobile-first del consumidor (PWA)
  - `apps/landing` (puerto 3002) — Landing page de marketing
- React 18 + Vite 5 + Tailwind CSS 3
- Sin backend aún — datos mock en `src/data/mock.js`

## Comandos
```bash
pnpm dev              # Todas las apps en paralelo
pnpm dev:merchant     # Solo dashboard comercio
pnpm dev:customer     # Solo app consumidor
pnpm dev:landing      # Solo landing page
pnpm build            # Build de todas
```

## Estructura
```
apps/merchant/src/pages/   → Dashboard, MyCard, Customers, Notifications
apps/customer/src/pages/   → Home, CardView, Vouchers, Profile, Notifications
apps/landing/src/          → Single-page con scroll animations
```

## Colores y diseño
- Paleta custom `wafi` (purple 50-950) definida en cada `tailwind.config.js`
- `dark: '#32373c'`, `surface: '#f8f9fb'`
- Font: Inter
- Customer app tiene animaciones custom: `stamp-pop`, `confetti-burst`, `card-complete`, `scan-line`

## Estado actual
- Prototipo funcional con datos mock
- PWA configurado en customer app
- Sin base de datos, auth, ni API
- Próximo paso: integración con Supabase

## Docs de marketing
- `BRAND-VOICE.md` — Guía de voz de marca
- `LANDING-CRO.md` — Optimización de landing
- `LAUNCH-PLAYBOOK.md` — Estrategia de lanzamiento
