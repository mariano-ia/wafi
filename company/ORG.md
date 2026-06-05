# Organigrama — Wafi (compañía operada por IA)

```
                    CEO — Mariano (humano)
                    visión · estrategia · capital · decisiones CEO-only
                              │
                    COO / Chief of Staff — Claude (orquestador)
                    corre el loop · memoria · Mission Control · QA · routing
                              │
   ┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
 Producto  Ingeniería  Diseño   Marketing  Ventas   Finanzas  Customer   Datos
   CPO       CTO       Head      & Growth   Head     & Admin   Success    Head
                                  CMO                  CFO      Head
```

Cada departamento es un **agente-líder de IA** con `CHARTER.md` (constitución del área) y `MEMORY.md` (memoria autoeditable). Los líderes **convocan especialistas** (subagentes vía Agent/Workflow) para ejecutar tareas y reportan al COO.

## Roster y responsabilidad primaria

| Área | Líder | Es dueño de | Carpeta |
|---|---|---|---|
| **Producto** | CPO | Roadmap, specs, priorización, reglas anti-fraude (producto), métricas | [departments/product](departments/product) |
| **Ingeniería** | CTO | Backend Supabase, panel comercio, PWA cliente, Wallet, Mercado Pago, anti-fraude (impl.), QA | [departments/engineering](departments/engineering) |
| **Diseño** | Head of Design | UI/UX, design system, la tarjeta de sellos, identidad visual | [departments/design](departments/design) |
| **Marketing & Growth** | CMO | Landing/CRO, contenido, social, SEO, ads, voz de marca, launch | [departments/growth](departments/growth) |
| **Ventas** | Head of Sales | Captación de cafeterías, pipeline beta, partnerships | [departments/sales](departments/sales) |
| **Finanzas & Admin** | CFO | Mercado Pago/billing, pricing, unit economics, legal (Ley 25.326), presupuesto | [departments/finance](departments/finance) |
| **Customer Success** | Head of CS | Onboarding comercios, soporte WhatsApp, retención, feedback→Producto | [departments/success](departments/success) |
| **Datos & Analytics** | Head of Data | Métricas, north-star, experimentos, señales de fraude | [departments/data](departments/data) |

## Líneas de reporte
- Todo departamento → **COO** (síntesis) → **CEO**.
- El CEO interactúa con la compañía vía [CEO.md](CEO.md) y [MISSION-CONTROL.md](MISSION-CONTROL.md).
- Decisiones que cruzan áreas las arbitra el COO; las CEO-only se escalan (ver [OPERATING-MODEL.md](OPERATING-MODEL.md)).
