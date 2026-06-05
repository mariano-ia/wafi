# Wafi — Design System

**Version:** 1.0 · **Fecha:** 2026-06-05 · **Autor:** Head of Design · **Idioma de copy:** espanol rioplatense (voseo)
**Stack objetivo:** React 18 + Vite + Tailwind CSS 3 (mobile-first). Reusa la paleta `wafi` ya definida en los `tailwind.config.js` del prototipo (`old/apps/customer` y `old/apps/merchant`).

> Este documento es la fuente de verdad visual del MVP-0 (PWA-como-tarjeta) y MVP-1 (wallet). No contradice `company/DECISIONS.md` ni el PRD canonico (`docs/PRODUCT-DEFINITION.md`, secciones 6 y 7). El enemigo es la tarjeta de carton. La palabra "plataforma" esta VETADA en todo string visible por cliente o comercio. Voseo con tildes obligatorio en copy publica (hacés, sumás, pasá, canjeá, escaneá).
>
> **Registros:** los nombres tecnicos de token (`wafi-500`, `state-warning`) son lexico interno y nunca se muestran. Todo lo que el usuario LEE va en registro publico on-brand.

---

## 1. Filosofia visual

1. **La tarjeta de sellos es el heroe.** Todo el sistema existe para que esa tarjeta se vea mejor que un carton: viva, glanceable, con el progreso obvio de un vistazo.
2. **Calma, no urgencia.** Sin contadores de escasez, sin rojo de alarma salvo error real. El estado "casi completa" se celebra, no se presiona (BRAND-VOICE: sin urgencia fabricada).
3. **Color con respaldo.** El color del comercio (`card.color`) es protagonista en la tarjeta, pero la marca Wafi (purple) ancla navegacion, CTAs de sistema y estados. Nunca dependemos solo del color para comunicar estado (a11y).
4. **Una accion por pantalla.** El cliente escanea con la camara nativa; la app es read-mostly. CTA primario unico y claro por vista.
5. **Mobile-first real.** Cliente = PWA en pulgar. Comercio = panel que arranca en celular y escala a desktop.

---

## 2. Tokens

### 2.1 Paleta de marca — wafi purple (ya existente, NO cambiar)

Escala canonica reusada tal cual del prototipo. Es el lila de marca.

| Token | Hex | Uso |
|-------|-----|-----|
| `wafi-50` | `#f3f0ff` | fondos suaves, chips, empty-state surfaces |
| `wafi-100` | `#e9e3ff` | hovers suaves, bordes activos |
| `wafi-200` | `#d5cbff` | bordes, dividers de acento |
| `wafi-300` | `#b5a1ff` | iconos secundarios, ilustracion |
| `wafi-400` | `#9b6fff` | iconos en empty states |
| `wafi-500` | `#8b3dff` | **color de marca primario** (acentos, links, badge) |
| `wafi-600` | `#7c1aff` | hover de CTA de marca, gradientes |
| `wafi-700` | `#6d0eef` | active/pressed de CTA de marca |
| `wafi-800` | `#5b0ec8` | texto sobre fondos claros lila si hace falta contraste |
| `wafi-900` | `#4c10a3` | fondos profundos, gradiente hero |
| `wafi-950` | `#2d066f` | fondo mas oscuro de gradiente |

> **Contraste:** `wafi-500` (#8b3dff) sobre blanco da ratio ~4.9:1 — pasa AA para texto >=18.66px bold o como fill de boton con texto blanco (blanco sobre `wafi-500` ~4.3:1, suficiente para texto >=18px bold / iconos). Para texto normal pequeño en lila usar `wafi-700` o superior sobre blanco. Ver 2.10.

### 2.2 Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| `dark` | `#32373c` | texto principal (titulos, body) |
| `surface` | `#f8f9fb` | fondo de app |
| blanco | `#ffffff` | cards, superficies elevadas |
| `gray-100` | `#f3f4f6` | bordes de card, tracks de barra |
| `gray-200` | `#e5e7eb` | bordes mas marcados, estado deshabilitado |
| `gray-400` | `#9ca3af` | texto terciario, captions, hints |
| `gray-500` | `#6b7280` | texto secundario / subtitulos |

Texto: `dark` para primario, `gray-500` para secundario, `gray-400` para terciario/captions. `gray-500` sobre blanco = ~5.9:1 (AA ok). `gray-400` sobre blanco = ~3.1:1 → SOLO para texto >=18.66px o decorativo, nunca para info critica.

### 2.3 Colores de estado (nuevos — agregar al theme)

Semanticos, mismos en ambas apps. Se nombran por funcion, no por color.

| Token | Hex (fill) | Hex (texto-sobre-claro) | Bg suave | Uso |
|-------|-----------|-------------------------|----------|-----|
| `state-success` | `#059669` (emerald-600) | `#047857` | `#ecfdf5` | sello sumado, voucher disponible, suscripcion activa |
| `state-warning` | `#d97706` (amber-600) | `#b45309` | `#fffbeb` | voucher por vencer, "sello a revisar", trial por terminar |
| `state-danger` | `#dc2626` (red-600) | `#b91c1c` | `#fef2f2` | error, voucher vencido, suscripcion past_due, timer agotado |
| `state-info` | `#0693e3` | `#0a6bb0` | `#eff6ff` | sellos del dia, informativo neutro |
| `state-pending` | `#6b7280` (gray-500) | `#4b5563` | `#f3f4f6` | estado neutro/en espera visible al comercio (nunca al cliente para sellos `pending` anti-fraude) |

> **Regla anti-fraude (PRD 8.2/8.3):** el estado `pending` de un sello por falta de presencia **NUNCA se muestra al cliente** ni con color ni con texto — es indistinguible de `valid`. El color `state-pending` se usa solo en superficies del comercio (Actividad en vivo) o en estados de UI neutros (ej. boton cargando), jamas para revelar que un sello no conto.

> **Texto sobre fills de estado:** para texto/iconos pequeños usar la columna "texto-sobre-claro" sobre el `bg suave`. Para badges de fill solido con texto blanco, todos los `*-600` pasan AA con blanco a >=14px bold.

### 2.4 Tipografia

Familia unica: **Inter** (`font-sans` ya configurada con fallback `system-ui, -apple-system, sans-serif`). Cargar Inter 400/500/600/700/800 (variable font ideal). `font-mono` del sistema solo para codigos de voucher y timer.

Escala (Tailwind, mobile-first):

| Rol | Clase | Tamaño | Peso | Line-height | Uso |
|-----|-------|--------|------|-------------|-----|
| Display | `text-4xl`/`text-5xl` | 36–48px | 800 (`extrabold`) | tight | numero gigante (Pulso, timer hero) |
| H1 | `text-2xl` | 24px | 700 (`bold`) | snug | titulo de pantalla |
| H2 | `text-xl` | 20px | 700 | snug | titulo de seccion/card grande |
| H3 | `text-lg` | 18px | 600 (`semibold`) | snug | subtitulo, recompensa |
| Body | `text-sm` | 14px | 400/500 | normal/relaxed | texto principal en mobile |
| Body-lg | `text-base` | 16px | 400 | relaxed | desktop body / inputs (evita zoom iOS) |
| Caption | `text-xs` | 12px | 400/500 | normal | metadatos, fechas |
| Micro | `text-[10px]`/`text-[11px]` | 10–11px | 500/600 | tight | labels de card, overlines |
| Overline | `text-xs` `uppercase tracking-wider` | 12px | 600 | — | "MIS TARJETAS", "PARA CANJEAR" |
| Codigo voucher | `font-mono text-3xl tracking-widest` | 30px | 800 | — | codigo de canje (ver 2.10 contraste) |

> **Inputs:** en mobile, los `<input>` van a **16px** (`text-base`) minimo para que iOS no haga zoom. Labels siempre presentes (a11y, PRD 13: "labels en inputs OTP").

### 2.5 Espaciado

Escala base **4px** (Tailwind default). Tokens de uso:

| Token | px | Uso |
|-------|----|----|
| `1` | 4 | gaps minimos entre dots/iconos |
| `1.5` | 6 | gap de tira de sellos |
| `2` | 8 | padding de chips |
| `3` | 12 | gap de grilla de sellos, padding interno chico |
| `4` | 16 | padding de card estandar, gap de secciones |
| `5` | 20 | padding de card de tarjeta (`p-5`) |
| `6` | 24 | padding de modales/headers, margen entre bloques |
| `8` | 32 | separacion mayor de secciones, margen de header |

Padding de pantalla (PWA): `px-4` (16px) lateral, contenido en columna. Panel comercio: `max-w-5xl mx-auto` con `px-4 md:px-6`.

### 2.6 Radios

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-md` | 6px | barras de progreso, chips chicos |
| `rounded-xl` | 12px | iconos contenedores, inputs, codigo de voucher inline |
| `rounded-2xl` | 16px | **card estandar y tarjeta de sellos** (default del sistema) |
| `rounded-3xl` | 24px | modales, overlays grandes |
| `rounded-pill` / `rounded-full` | 9999px | botones CTA, badges, dots de sello, avatars |

La tarjeta de sellos usa `rounded-2xl` (16px) — replica el radio de una tarjeta fisica sin ser demasiado redonda.

### 2.7 Sombras

Definir como tokens (agregar a `boxShadow` del theme). Sombras suaves, nunca duras.

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-card` | `0 1px 3px rgba(50,55,60,0.06), 0 1px 2px rgba(50,55,60,0.04)` | cards de contenido (alternativa al borde `border-gray-100`) |
| `shadow-elevated` | `0 4px 16px rgba(50,55,60,0.08)` | dropdowns, popovers, sticky CTA bar |
| `shadow-modal` | `0 12px 40px rgba(50,55,60,0.16)` | modales, RedeemScreen |
| `shadow-stamp-card` | dinamica: `0 8px 20px {card.color}35` | **tarjeta de sellos** — sombra tintada con el color del comercio (ya en el prototipo) |

La sombra de la tarjeta de sellos se tinta con el color del comercio al 35% alpha (`{card.color}35`), creciendo con el indice de stack en Home. Esto le da vida sin pesar.

### 2.8 Iconografia

**lucide-react** (ya en uso). Tamaños: 14–18px inline, 20px en nav, 28–40px en empty/success states. Stroke 2. Iconos firma:
- `Coffee` ☕ — marca cafetera, sello lleno conceptual, empty states.
- `Gift` — recompensa/voucher.
- `Stamp` — sellos (panel comercio).
- `ShieldCheck` — "verificado por Wafi" (voucher, anti-fraude visible al cliente como confianza).
- `Sparkles` — completitud/celebracion.
- `Check` — sello lleno (ver tarjeta).

> El sello ☕ es conceptual: el glifo de cafe representa el sello. En la tarjeta usamos `Check`/`Coffee` segun densidad (ver 3.2). Para a11y nunca el icono solo: siempre acompaña numero o texto.

### 2.9 Movimiento

Reusar animaciones del prototipo (ya en `tailwind.config.js` de customer):

| Animacion | Curva/duracion | Uso |
|-----------|----------------|-----|
| `animate-stamp-pop` | `0.4s cubic-bezier(0.34,1.56,0.64,1)` | aparicion del sello recien sumado (overshoot tipo "sello") |
| `animate-card-complete` | `0.5s ease-in-out` | latido de la tarjeta al completarse / modales |
| `animate-confetti-burst` | `0.6s ease-out` | celebracion al completar (acotada, una vez) |
| `animate-scan-line` | `2s ease-in-out infinite` | linea de la pantalla de resultado de escaneo |

Transiciones estandar: `transition-all duration-200/300`. Press feedback: `active:scale-[0.97]`.

> **`prefers-reduced-motion` (PRD 13, obligatorio):** envolver toda animacion no esencial. Con reduced-motion: sin `stamp-pop`/`confetti`/`scan-line`; el sello aparece con fade simple; la barra de progreso salta sin transicion larga. Implementar con `motion-reduce:` de Tailwind o media query:
> ```css
> @media (prefers-reduced-motion: reduce) {
>   .animate-stamp-pop, .animate-confetti-burst, .animate-scan-line, .animate-card-complete {
>     animation: none !important;
>   }
> }
> ```

### 2.10 Accesibilidad (transversal, NO opcional — PRD 13)

- **Contraste WCAG AA obligatorio en: CTAs y codigo de voucher.** El codigo de canje se renderiza con el color del comercio sobre su tint claro; si el `card.color` elegido por el comercio no alcanza **4.5:1** contra el fondo del bloque, el sistema **degrada el codigo a `dark` (#32373c) sobre blanco/`gray-100`** para garantizar legibilidad. La identidad de color queda en la barra/borde de la tarjeta, no en el texto critico. (Funcion `accessibleCodeColor(cardColor)` — ver 6.)
- **CTAs:** texto blanco sobre fill de color solo si el fill alcanza AA. Para colores claros de comercio, el CTA usa fondo `dark` o `wafi-600` con texto blanco, no el color claro. CTA de sistema (no del comercio) siempre `wafi-600`/`dark`.
- **Targets >=44×44px** en todo lo tocable: botones, nav, toggles, items de lista accionables, boton "Anular sello". Botones full-width van a `py-3.5` (~52px alto).
- **No depender solo del color:** todo estado lleva **icono + texto** ademas del color (Disponible+`Check`, Vencido+texto rojo+icono, Anular+icono). Los sellos llenos llevan glifo (`Check`/☕), no solo relleno.
- **Foco visible:** `focus-visible:ring-2 ring-wafi-500 ring-offset-2` en todo control interactivo. Nunca `outline:none` sin reemplazo.
- **Labels y roles:** inputs con `<label>` asociado (OTP, edicion de tarjeta); modales con `role="dialog"` + `aria-modal` + foco atrapado; timer con `aria-live="polite"`; iconos decorativos `aria-hidden`, iconos con significado con `aria-label`.
- **Idioma:** `<html lang="es-AR">`.

---

## 3. La tarjeta de sellos (componente heroe)

La pieza central del sistema. Reemplaza emocionalmente al carton.

### 3.1 Proporcion y anatomia

- **Proporcion credit-card real:** 85.6mm × 53.98mm → **aspect-ratio 1.586** (`style={{ aspectRatio: '1.586' }}`). Ancho = 100% del contenedor (mobile: ancho de pantalla menos `px-4`). No fijar alto: deriva del ratio.
- **Radio:** `rounded-2xl` (16px). **Fondo:** `card.color` solido (color del comercio). **Texto:** blanco con opacidades (60–90%).
- **Overlay sutil:** dos `radial-gradient` blancos a `opacity-[0.07]` para textura (esquinas), del prototipo. **Watermark Wafi:** logo blanco abajo-derecha a `opacity-[0.15]`.
- **Sombra:** `shadow-stamp-card` tintada (`0 8px 20px {card.color}35`).

**Zonas (de arriba a abajo), dentro de `relative h-full flex flex-col justify-between`:**
1. **Top:** nombre del comercio (`font-bold text-base`) + sub "{N} consumos = 1 premio" (`text-[11px] opacity-60`). A la derecha: avatar/inicial del comercio en chip `bg-white/15 backdrop-blur` `rounded-xl`.
2. **Middle:** **la tira de sellos** (ver 3.2) — barras o circulos segun vista.
3. **Bottom:** recompensa con `Gift` (`text-[11px] opacity-70`, truncada) a la izquierda; a la derecha el contador grande `X/N` (`text-xl extrabold`) o el badge de estado.

### 3.2 La tira de sellos (llenos / vacios ☕)

Dos representaciones segun densidad de la vista:

**A) Tira compacta (en la tarjeta credit-card, Home y CardView header):** barras horizontales `flex gap-1.5`, cada sello `flex-1 h-2.5 rounded-full`. Lleno = `rgba(255,255,255,0.9)`; vacio = `rgba(255,255,255,0.15)`. Transicion `duration-500`. Funciona hasta N=12 sin romper.

**B) Grilla de sellos (CardView, detalle — el "carton" digital):** `grid grid-cols-4 gap-3`, cada sello un circulo `w-12 h-12 rounded-full border-2` (>=44px, tocable/legible). Estados del circulo:
- **Vacio:** borde `card.color` al 40% alpha (`card.color + '40'`), fondo transparente, **numero de posicion** dentro en `card.color` al 80% (ej. "3"). El numero asegura que no dependa solo del color.
- **Lleno:** fondo `card.color`, borde `card.color`, **glifo blanco**: `Check` ✓ (o ☕ `Coffee` para reforzar marca cafetera). El recien sumado dispara `animate-stamp-pop`.
- **Sello-premio (ultima posicion, vacia):** icono `Gift` en `card.color` al 60% en vez de numero — comunica "este es el que te da el premio".

> **Eleccion glifo lleno:** default `Check` (claridad universal). Variante de marca: `Coffee` ☕ para cafeterias que quieran el sello tematico. Definir por `program` (no expuesto al cliente como opcion en MVP; default `Check`).

### 3.3 Estados de la tarjeta

Cuatro estados visuales. **Cada uno se comunica con color + icono + texto** (nunca solo color).

| Estado | Disparador | Tratamiento visual | Copy (voseo) |
|--------|-----------|--------------------|--------------|
| **En progreso** | `0 < stamps < N-1` | tarjeta full color; tira con llenos/vacios; contador `X/N`; subtexto neutro | `Faltan {n} sellos para tu {recompensa}` |
| **Casi** | `stamps === N-1` (falta 1) | acento sutil: subtexto en `text-[10px]` mas marcado; **sin urgencia/rojo**; badge calido opcional con `Sparkles` | `Te falta 1 sello para tu {recompensa}` / en card: `¡Falta 1!` (1 exclamacion max) |
| **Completa** | `stamps === N` | latido `animate-card-complete` al entrar; badge `state-success` con `Sparkles`+texto; CompletionOverlay 1 vez; tira 100% blanca | en card: `¡Completa!` · overlay: `Completaste tu tarjeta. Tu {recompensa} te espera.` |
| **Vencida** | voucher/tarjeta expirada sin canje | tarjeta **desaturada** (`grayscale` / opacidad reducida) + barra/borde gris; badge `state-danger` con icono + texto "Vencida"; NO solo gris | `Esta tarjeta venció. Empezá una nueva en tu próxima visita.` |

> **"Casi" sin urgencia (BRAND-VOICE):** "casi" es celebracion ("ya casi"), no presion. Prohibido "apurate / ultimas horas". Un solo signo de exclamacion.
> **Vencida + a11y:** desaturar comunica visualmente, pero SIEMPRE acompañar con badge de texto "Vencida" e icono, porque el color/saturacion solo no es accesible.

### 3.4 Spec de implementacion (resumen)

```jsx
// Tarjeta credit-card (Home / header de CardView)
<div className="rounded-2xl p-5 text-white relative overflow-hidden shadow-stamp-card"
     style={{ backgroundColor: card.color, aspectRatio: '1.586',
              boxShadow: `0 8px 20px ${card.color}35` }}>
  {/* overlay textura + watermark + 3 zonas (top / tira / bottom) */}
</div>

// Sello de grilla (CardView detalle)
<div className="w-12 h-12 rounded-full border-2 flex items-center justify-center
                text-sm font-bold motion-safe:animate-stamp-pop"
     style={{ borderColor: filled ? color : color+'40',
              backgroundColor: filled ? color : 'transparent',
              color: filled ? '#fff' : color+'80' }}>
  {isReward && !filled ? <Gift/> : filled ? <Check/> : index+1}
</div>
```

---

## 4. Pantallas del cliente (PWA)

Estructura PWA: layout mobile con contenido `px-4`, `BottomNav` fija (Home / Vouchers / Perfil) con targets >=44px y `safe-bottom` para notch. Header por pantalla.

### 4.1 Home / Wallet — stack de tarjetas

**Objetivo:** ver todas mis tarjetas de un vistazo, como un mazo.

- **Header:** "Hola, {nombre}" (`text-2xl bold`), campana de notificaciones (chip `rounded-full` 40px, badge `wafi-500` con contador) a la derecha.
- **Overline:** `Coffee` + "MIS TARJETAS" (`uppercase tracking-wider text-xs gray-400`).
- **Stack:** tarjetas credit-card apiladas con `marginTop: -80px` (overlap) y `zIndex` creciente; sombra crece con el indice. `active:scale-[0.97]` al tocar → navega a CardView. Cada tarjeta muestra su estado (3.3) en el badge/contador.
- **A11y:** cada tarjeta es un `<Link>` con `aria-label="Tarjeta de {comercio}, {stamps} de {N} sellos"`. El stack apilado debe seguir siendo navegable por teclado en orden.

**Estado vacio (sin tarjetas):**
> Icono `Coffee` en circulo `wafi-50`.
> **"Todavía no tenés tarjetas"**
> "Escaneá el QR del local en tu café de siempre y empezás a juntar sellos. Chau tarjetas de cartón."

### 4.2 CardView — detalle de una tarjeta

**Objetivo:** ver el progreso real, sello a sello.

- **Volver** (`ArrowLeft` + "Volver", target >=44px).
- **Header de tarjeta** (color del comercio, `rounded-2xl p-6`): comercio, nombre de tarjeta, recompensa, **barra de progreso** (`X/N sellos` + `%`) sobre track `bg-white/20`.
- **Grilla de sellos** (3.2.B) en card blanca `rounded-2xl border-gray-100 p-6`, titulo "Tus sellos". El ultimo sumado anima `stamp-pop`.
- **Subtexto de estado** (3.3) centrado, en voseo, segun progreso.
- **Si completa:** badge `state-success` con `Sparkles` + "¡Tarjeta completada!" y, al entrar, `CompletionOverlay` (una vez): "Completaste tu tarjeta. Tu {recompensa} te espera." → CTA "Ver mi voucher" (`wafi-600`/color, full-width `py-3.5 rounded-pill`).
- **Footer:** "Último sello: {fecha larga es-AR}" (`text-xs gray-400`).

**Estado vacio (0 sellos, recien creada):** tarjeta con todos los circulos vacios numerados + "Tu primer sello te espera. Mostrá el QR del local y empezás." No es un empty-state aparte: la grilla vacia ya comunica.

### 4.3 Voucher + canje (RedeemScreen con codigo)

**Lista de Vouchers** (`Vouchers`):
- Titulo "Mis vouchers" + sub "Activá tu voucher y canjealo en el local."
- Secciones overline: "PARA CANJEAR" / "CANJEADOS".
- **VoucherCard:** barra superior de color, comercio + recompensa, **badge de estado con icono+texto**: Disponible (`state-success` + `Check`), Por vencer (`state-warning` + `Clock`), Vencido (`state-danger`), Canjeado (gris + `Check`). Bloque de **codigo** (`font-mono extrabold tracking-wider`, color accesible — ver 2.10). Fechas (ganado / vence con `Clock`). CTA "Canjear ahora" (full-width, solo si disponible).
- **ConfirmModal** antes de activar: "¿Canjear ahora? Una vez activado, tenés **5 minutos** para mostrarlo en el local." → "Sí, canjear ahora" / "Todavía no".

**RedeemScreen (fullscreen, el canje):**
- Fondo blanco fullscreen, header "Mostrá esto en el local" + cerrar (chip 36px → subir a >=44px de area tactil).
- **Timer circular** (SVG `-rotate-90`, r=45) **5 min** (PRD 5.2): trazo en `card.color`, pasa a `state-danger` (#dc2626) cuando quedan <60s. Centro: `M:SS` (`font-mono extrabold`), "restantes". `aria-live="polite"` que anuncia minuto a minuto.
- Comercio + recompensa (`H1`).
- **Codigo de canje** en bloque `rounded-2xl p-6` con tint `card.color + '10'`: label "Código de canje", codigo **`font-mono text-3xl tracking-widest extrabold`**. **Contraste AA forzado** (2.10): si el color del comercio no alcanza 4.5:1 sobre el tint, el codigo se renderiza en `dark`. Este es el string mas critico de la app para legibilidad.
- **Badge de confianza:** `ShieldCheck` (`state-success`) + "Voucher verificado por Wafi".
- **Canje por re-escaneo (PRD 5.2, camino default):** texto-guia "Pedile al cajero que escanee, o **volvé a escanear el QR del local** para cerrarlo." (sin cargar al cajero). Barra de timer inferior.
- **Timer agotado:** texto `state-danger` "Se acabó el tiempo. Volvé a activar el voucher para canjearlo." (re-activacion acotada: 1 vez, PRD 5.2). Sin culpar al usuario.

**Estado vacio (sin vouchers):**
> Icono `Gift` en circulo `wafi-50`.
> **"Todavía no tenés vouchers"**
> "Completá una tarjeta de sellos y tu primera recompensa aparece acá."

### 4.4 Resultado de escaneo (reemplaza ScanModal — pantalla de RESULTADO)

> No es escaner: la camara nativa abre la URL `/s/{merchant}/{branch}`; esta pantalla muestra el **resultado** server-side (PRD 6.3 — ScanModal se REESCRIBE).

- **Sello sumado (exito):** animacion `stamp-pop` del nuevo sello sobre el preview de la tarjeta; `animate-scan-line` decorativa opcional; titulo "¡Sumaste tu sello!" (1 exclamacion), "Te faltan {n} para tu {recompensa}". CTA primario (MVP-1) "Agregar a Apple/Google Wallet" (deteccion de plataforma) + secundario "Instalar la app". En MVP-0 solo "Instalar la app".
- **Cooldown / tope:** mensaje calmo, sin alarma: "Ya sumaste tu sello hace un rato. Volvé en tu próxima visita." (NUNCA revelar reglas anti-fraude ni el estado `pending`).
- **Sin conexion (PRD 13, offline):** "Necesitás conexión para sumar el sello. Probá de nuevo cuando tengas señal." con icono de wifi y reintentar (>=44px).
- **Permiso de ubicacion (primer sello, PRD 6.2):** hoja explicativa: "Para confirmar que estás en el local, necesitamos tu ubicación una vez." + "Permitir ubicación" (primario) / "Ahora no". Lenguaje claro, sin tecnicismo.

---

## 5. Pantallas del comercio (panel)

Layout: sidebar/topbar con marca Wafi, contenido `max-w-5xl mx-auto px-4 md:px-6`. Labels on-brand (PRD 4.4): "Inicio", "Mi tarjeta", "Actividad en vivo", "Clientes", "Notificaciones", "Suscripción", "Primeros pasos". Nada de "Dashboard"/"Onboarding"/"plataforma" visibles.

### 5.1 Inicio (Panel)

Reusa `Dashboard.jsx` con correcciones de PRD 7.2.

- **Header:** "Inicio" + "{Comercio} · Resumen de actividad" (reemplazar "Café Roma" hardcodeado por dato real).
- **Hero "Pulso semanal"** (RENOMBRAR el card "Índice de Fidelización" → **"Pulso semanal"**, PRD 5.4): card gradiente `from-wafi-500 via-wafi-600 to-wafi-900`, numero gigante `text-5xl`, delta semana vs anterior con flecha **+ icono + signo** (no solo color verde/rojo): `ArrowUp`/`ArrowDown`/`Minus`. **Tooltip** que explica "sellos de esta semana vs la anterior". Quitar "Powered by Wafi" si suena a jerga; dejar limpio.
- **Stat cards (4):** Clientes, Sellos hoy, Completadas, Sellos totales. Cada una con icono en chip de color tenue (`color + '15'`), valor `text-2xl bold`, label. Color por metrica (`wafi-500`, `state-info`, naranja, rosa).
- **Actividad en vivo (NUEVO, PRD 7.2):** ultimos 5–10 sellos con hora, cliente y **badge de riesgo** (geo rara / ráfaga / dispositivo nuevo / fuera de horario) usando `state-warning`/`state-pending` con **icono+texto**. Badge "Sellos a revisar esta semana" si hay. Polling 10–15s (Realtime = roadmap).
- **Grafico 8 semanas** (mini bar), **Por categoría** (Nuevo/Regular/Frecuente/VIP con badge de color + texto), **preview de tu tarjeta** (link "Editar"), **Top 5 clientes**.

**Estado vacio (0 clientes / 0 sellos):**
> "Todavía no entró ningún cliente."
> "En cuanto pegues el QR en el mostrador y alguien sume su primer sello, lo vas a ver acá en vivo. ¿Ya imprimiste tu QR?" → CTA "Ver mi QR".

### 5.2 Mi tarjeta (editor + QR)

Reusa `MyCard.jsx` con correcciones (PRD 7.3).

- **Editor:** nombre, **recompensa** (texto), **N de sellos** (selector {4,6,8,10,12}, default 8), **color** del comercio (paleta de swatches; **validar contraste** del color elegido para el codigo de voucher — preview en vivo con la regla de 2.10). **Upload de logo** (hoy es TODO — implementar drag/drop o file input >=44px).
- **Preview en vivo** de la tarjeta de sellos (componente real de seccion 3) reflejando cambios al instante.
- **QR para el mostrador:** bloque con el QR estatico + "Descargar / Imprimir QR". Copy anti-abuso a **15 min** (corregir, PRD 7.3). Convencion (no verificacion): "Escaneá después de tu compra".
- **Reglas congeladas en beta:** si ya se emitio un voucher, N y recompensa quedan en read-only con aviso "Tu tarjeta está activa: estas reglas quedan fijas mientras corre la beta." (PRD 5.1).

**Estado vacio (sin tarjeta creada):** wizard "Primeros pasos" inline o CTA "Creá tu primera tarjeta" — pero en el MVP el wizard la crea, asi que aca casi siempre hay tarjeta.

### 5.3 Actividad en vivo (con anular)

Pantalla dedicada (PRD 7.4) — ultima capa anti-fraude humana.

- **Lista de eventos:** cada sello = fila con hora, cliente (inicial+nombre), comercio/sucursal, y **nivel de riesgo** como badge icono+texto (`state-success` "OK" / `state-warning` "A revisar" con motivo: geo rara, ráfaga, dispositivo nuevo, fuera de horario). El motivo se nombra en lenguaje claro, no en jerga interna.
- **Boton "Anular sello"** por fila (`state-danger` outline, >=44px): descuenta progreso, queda auditado. Confirmacion: "¿Anular este sello? Se le descuenta al cliente y queda registrado."
- **Filtros** (todos / a revisar / anulados) + **paginacion**. Polling 10–15s.
- Nota honesta de diseño: es complemento, no sustituto, de las barreras automaticas (no escala revisar 200/dia). El badge de riesgo prioriza visualmente lo que merece ojo humano.

**Estado vacio (sin actividad):**
> "Acá vas a ver cada sello apenas pasa."
> "Todavía no hay movimientos hoy. En cuanto alguien escanee tu QR, aparece en vivo."

### 5.4 Suscripcion / Facturacion (apoyo)

Estado de suscripcion (`trial` / `active` / `past_due` / `canceled`) con badge de estado (icono+texto), proximo cobro, metodo de pago (tarjeta tokenizada via MP), proxima fecha. `past_due` usa `state-danger` con copy claro y sin alarmismo: "Tu pago no se pudo procesar. Actualizá tu tarjeta para seguir con Pro." (PRD 10.3). Trial por terminar = `state-warning`.

### 5.5 Estados vacios — patron comun (comercio y cliente)

Componente `<EmptyState icon title body cta?>`:
- Icono en circulo `wafi-50` (`w-16 h-16 rounded-2xl`, icono `wafi-400`).
- Titulo `text-lg semibold dark`.
- Body `text-sm gray-500 leading-relaxed`, **en voseo, sin urgencia, con el enemigo (carton) cuando suma**.
- CTA opcional `wafi-600`/`dark` (>=44px) que apunta a la accion obvia.

---

## 6. Notas de implementacion (React + Tailwind)

1. **Theme compartido:** extraer el bloque `colors.wafi` + `dark` + `surface` + `borderRadius.pill` + `keyframes`/`animation` a un preset Tailwind unico (`packages/config/tailwind-preset`) y consumirlo desde `merchant`, `customer` y `landing`. Hoy esta duplicado en dos configs identicos.
2. **Agregar al theme:** los tokens `state-*` (2.3), `boxShadow.{card,elevated,modal}` (2.7). La sombra de tarjeta de sellos queda inline (depende de `card.color`).
3. **Helper de contraste (load-bearing para a11y del codigo de voucher):**
   ```js
   // Devuelve un color de texto AA para el codigo sobre fondo tint.
   function accessibleCodeColor(cardColor, bgHex = '#ffffff') {
     return contrastRatio(cardColor, bgHex) >= 4.5 ? cardColor : '#32373c' // dark fallback
   }
   ```
   Usar en RedeemScreen, VoucherCard y preview de Mi tarjeta. Misma idea para CTAs: si el fill no alcanza AA con blanco, usar `wafi-600`/`dark`.
4. **Reduced motion:** preferir utilidades `motion-safe:` / `motion-reduce:` de Tailwind sobre `animate-*` para que el opt-out sea automatico.
5. **Componentes reusables:** `<StampCard>` (3), `<StampGrid>`, `<VoucherCode>`, `<StatusBadge variant>`, `<EmptyState>`, `<RiskBadge>`, `<Timer>`. El estado de la tarjeta (en progreso/casi/completa/vencida) se deriva de datos, no se pasa a mano.
6. **Reusar tal cual (PRD 6.3):** CardView (grilla + `stamp-pop` + CompletionOverlay), Home (stack), Vouchers/RedeemScreen (timer 5 min + codigo). **Reescribir:** ScanModal → pantalla de Resultado (4.4). **Corregir:** divisor `/8` hardcodeado → `program.stamps_required`; cooldown "1 hora" → 15 min; label "Índice de Fidelización" → "Pulso semanal".
7. **Copy:** todo string visible pasa por checklist BRAND-VOICE (Vos test, Jargon test, 1 exclamacion, sin "plataforma", sin urgencia, tildes de voseo). Lint de tildes para strings de copy (PRD 4.2).

---

## 7. Checklist de QA visual / a11y (antes de congelar una pantalla)

- [ ] CTA primario unico, fill AA con su texto, target >=44px.
- [ ] Codigo de voucher: contraste >=4.5:1 (fallback `dark` aplicado si hace falta).
- [ ] Todo estado comunica con icono + texto, no solo color.
- [ ] Sellos llenos llevan glifo (`Check`/☕), vacios llevan numero.
- [ ] `prefers-reduced-motion` respetado (sin pop/confetti/scan-line).
- [ ] Foco visible (`focus-visible:ring`) en todo control.
- [ ] Inputs con `<label>`, mobile 16px (sin zoom iOS).
- [ ] Empty state en voseo, sin urgencia, sin "plataforma".
- [ ] Estado `pending` anti-fraude NO visible al cliente.
- [ ] 1 signo de exclamacion como maximo por mensaje.
- [ ] `lang="es-AR"`, `safe-bottom` en nav, area tactil del cerrar >=44px.
