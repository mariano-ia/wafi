# Modelo Operativo — cómo trabaja Wafi (loop infinito + cadencia)

## El loop infinito (cada ciclo de trabajo)

```
1. LEER ESTADO   → MISSION-CONTROL.md, COMPANY-MEMORY.md, MILESTONES.md
2. ELEGIR        → el hito de mayor valor NO bloqueado del ledger
3. PLANIFICAR    → skill superpowers:writing-plans → docs/plans/YYYY-MM-DD-<hito>.md
4. EJECUTAR      → skill superpowers:subagent-driven-development (un subagente por tarea
                   + review de spec + review de calidad) con TDD donde aplica
5. VERIFICAR     → skill superpowers:verification-before-completion (funciona de verdad)
6. REGISTRAR     → actualizar MEMORY del área + JOURNAL.md + MILESTONES + MISSION-CONTROL
7. REPETIR       → volver a 1
```

**Continuidad:** no se frena entre tareas a "pedir permiso". Solo se frena por (a) decisión CEO-only, (b) bloqueo externo irresoluble, (c) ambigüedad que impide avanzar. Lo demás se ejecuta.

**Definition of Done:** funciona + testeado/verificado + memoria + journal + Mission Control actualizados. Nada se marca ✅ sin verificación real.

## Cadencia de gobierno (acordada con el CEO — ADR-0005)
- **Reunión semanal de visión** (CEO + COO): el COO lleva una página de *estado + decisiones abiertas* (sale de Mission Control + CEO-PENDING-DECISIONS). Salida: dirección de la semana → tope del ledger.
- **Email al CEO** (`marianonoceti@gmail.com`) **solo** cuando: algo está bloqueado esperándolo, o hay algo que amerita su atención. Nunca para updates de rutina (eso vive en Mission Control). La primera vez que se manda un email real, se pide OK.

## Escalación — decisiones CEO-only (se encolan en el inbox del CEO, el resto sigue)
1. **Plata:** gastar, suscripciones pagas, presupuesto de ads, compra de dominios.
2. **Marca/legal:** cambios de identidad, postura legal/privacidad (Ley 25.326), claims públicos.
3. **Pricing:** precios finales en ARS, límites de planes, modelo freemium/trial.
4. **Estrategia:** pivots, cambio de ICP, nuevos verticales/mercados.
5. **Irreversible / cara al mundo:** publicar, mandar emails masivos, deploys a producción de cara al cliente, tocar credenciales externas.

Todo lo demás (construir, diseñar, escribir, refactorizar, planificar, investigar) es autónomo.

## Cómo se usan las skills (Superpowers + Awesome)
- **Antes de planear algo nuevo:** `superpowers:brainstorming`.
- **Para planes:** `superpowers:writing-plans`. **Para ejecutar:** `superpowers:subagent-driven-development` / `executing-plans`.
- **Calidad/seguridad:** `test-driven-development`, `verification-before-completion`, `requesting-code-review`, `using-git-worktrees`.
- **Paralelizar:** `dispatching-parallel-agents` o la tool `Workflow` (fan-out + verificación adversarial) para trabajo grande.
- **Capacidades de negocio:** `brand-guidelines`, `canvas-design`, `content-research-writer`, `competitive-ads-extractor`, `lead-research-assistant`, `webapp-testing`, `mcp-builder`, `invoice-organizer`, `meeting-insights-analyzer`, `internal-comms`.

## Memoria (autoeditable y perpetua)
- **Global:** `memory/COMPANY-MEMORY.md`. **Por área:** `departments/<área>/MEMORY.md`.
- Regla: nunca borrar historia. Se *supera* o se *anota*. Las decisiones van a `DECISIONS.md` (ADRs). Lo que pasó, al `JOURNAL.md` (append-only).

## Motor de "trabajar todo el tiempo" (cuando el producto funcione)
- Modo construcción (ahora): correr el loop hasta que el MVP funcione end-to-end.
- Modo mejora continua (post-MVP): re-invocar el loop en cadencia con `/loop` (auto-ritmo o intervalo) o una rutina agendada (`/schedule`), eligiendo siempre el hito de mayor valor. Cada corrida deja rastro en JOURNAL + Mission Control para que el CEO tenga seguimiento.
