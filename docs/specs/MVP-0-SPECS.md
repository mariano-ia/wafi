# Wafi — Spec del MVP-0 (feature por feature)

**Version:** 1.0 · **Fecha:** 2026-06-05 · **Autor:** CPO (Producto) · **Idioma:** espanol rioplatense (voseo)
**Audiencia:** Ingenieria (construible) · **Registro:** este doc es INTERNO (vale "plataforma", "dashboard", "webhook", "shadow-limit"). Todo string que el usuario LEE va marcado como COPY PUBLICA y respeta BRAND-VOICE (voseo con tildes, sin "plataforma", sin urgencia fabricada, 1 exclamacion max).

> **Fuentes y jerarquia de verdad.** Esta spec implementa el PRD canonico (`docs/PRODUCT-DEFINITION.md`, secciones 5,6,7,8,10,13) **subordinado a las DECISIONS vigentes** (`company/DECISIONS.md`). Donde el PRD y una ADR difieren, **manda la ADR**. Diferencias resueltas asi:
> - **Trial:** 30 dias **sin pedir tarjeta** (cero friccion); al **dia 31** sin pago el programa se **congela** y recien ahi se pide la tarjeta para reactivar (**ADR-0010 final + ADR-0011**), NO los "14 dias" del PRD §10.2.
> - **Canje:** codigo rotativo valido **3 min** (**ADR-0007**), NO los "5 min" del PRD §5.2/§6.2.
> - **Cooldown:** **15 min** por (cliente, local) + (device, local) + (IP, local) (**ADR-0004** y PRD §7).
> - **Presencia OBLIGATORIA hard:** sin geo dentro del radio del local, **no hay sello** (**ADR-0009**), supera la postura "soft/pending cosmetico" del PRD §8.2. En MVP-0 el sello que no prueba presencia se rechaza (no se acredita) en vez de acreditarse como `pending` invisible. Ver Feature 3 para el detalle y el fallback IP.
>
> **Alcance global del documento:** SOLO MVP-0 (PWA como la tarjeta, **sin wallet passes nativos**). Wallet Apple/Google, capa 6 de anomalias rica, Actividad/anular como red humana completa, email transaccional y push robusto son **MVP-1** salvo lo que se marque explicitamente IN.
> **Tablas `wafi.*` ya existen** (PRD §11). Esta spec referencia columnas; no define DDL nuevo salvo notas de "si falta columna".

---

## 0. Convenciones transversales (aplican a TODAS las features)

- **Autoridad del sello y de estado:** TODO cambio de progreso, voucher y suscripcion se decide **server-side** (Edge Function / RPC). El cliente nunca escribe sellos ni estados. La tabla `wafi.stamp_event` es **inmutable** y fuente de verdad; contadores se materializan desde ella (PRD §11).
- **RLS:** todo dato se aisla por `merchant_id`. RLS NO cubre auth, rate-limit ni DoS: son requisitos aparte por endpoint (PRD §12).
- **Idempotencia:** toda RPC que muta estado acepta un `request_id`/clave natural y es idempotente (re-tap, doble submit, reintento de red no duplican).
- **Realtime:** NO se usa Supabase Realtime en MVP-0. Donde haga falta "en vivo" -> **polling 10-15s** (PRD §7).
- **Copy publica:** voseo con tildes (hacés, pasá, cobrás), "plataforma" vetada, 1 exclamacion max por mensaje, sin urgencia fabricada. Empty states en voseo obligatorios donde haya listas vacias.
- **a11y minima (IN):** contraste WCAG AA en codigo de voucher y CTAs, `prefers-reduced-motion`, no depender solo de color, targets >=44px, labels en inputs OTP (PRD §13).
- **Offline (IN):** si no hay conexion al sumar/canjear, mensaje claro (COPY PUBLICA): "Necesitás conexión para sumar el sello." Nunca acreditar local sin confirmacion del server.
- **Estados de suscripcion del comercio y su efecto en el cliente:** con comercio `past_due`/`canceled`, **el cliente sigue sumando sellos**; lo que se corta es el acceso del dueno al panel (PRD §13). Esto se valida en cada RPC de sello.

---

## Feature 1 — Auth del comercio + wizard "Primeros pasos"

### 1.1 Objetivo
Que el dueno de la cafeteria pueda crear su cuenta, entrar, recuperarla, y quedar operativo (tarjeta creada + tarjeta de pago cargada/trial activado + QR listo para imprimir) en una sola sesion guiada.

### 1.2 Flujo
**Auth**
1. **Alta:** Supabase Auth con **email + password** (magic link como alternativa). Al confirmar email se crea `wafi.merchant` con `subscription_status='trial'` provisorio hasta completar Primeros pasos.
2. **Login:** email+password o magic link. Sesion persistente (refresh token de Supabase).
3. **Recuperacion:** "Olvidé mi contraseña" -> email con link de reset (flujo nativo Supabase). Cambio de password invalida sesiones previas.
4. **Logout** disponible en todo el panel.

**Wizard "Primeros pasos" (4 pasos, label on-brand; NUNCA "Onboarding")**
- **Paso 1 — Datos del local:** nombre, email de contacto, logo (upload real, no TODO), `opening_hours`, y **ubicacion del local** (`lat`, `lng`) capturada por mapa/autocomplete o pin. La ubicacion es **obligatoria** porque alimenta la presencia (Feature 3).
- **Paso 2 — Primera tarjeta:** `stamps_required` ∈ {4,6,8,10,12} (default 8), `reward_text` (premio), `color`. Crea `wafi.loyalty_program` 1:1 con `active=true`, `version=1`.
- **Paso 3 — Listo, a usar:** el comercio arranca el **trial de 30 días SIN cargar tarjeta** (cero friccion). El medio de pago se pide **recien al día 31**, cuando el programa se congela (ver Feature 7). NO se pide tarjeta ni "connect de cuenta MP" en el alta.
- **Paso 4 — QR del mostrador:** generar y permitir **descargar/imprimir** el QR estatico que apunta a `https://app.wafi.com.ar/s/{slug}` (ver Feature 3 y 6 para `slug` y modos).
- Al terminar -> cae en **Inicio** (Feature 6).

### 1.3 Datos (`wafi.*`)
- `wafi.merchant`: `id, nombre, email, logo, opening_hours, lat, lng, plan, subscription_status, mp_preapproval_id, current_period_end, created_at`. `auth_id` vincula a Supabase Auth (si no existe la columna, agregarla).
- `wafi.loyalty_program`: `id, merchant_id, stamps_required, reward_text, color, category_thresholds(json), active, version, created_at`.
- Estado del wizard: `merchant.onboarding_step` (int) o flag `onboarding_completed_at` para reanudar (si no existe, agregar). El wizard debe ser **reanudable**.

### 1.4 Criterios de aceptacion (checklist)
- [ ] Puedo registrarme con email+password y recibo confirmacion por email.
- [ ] Puedo entrar con email+password y con magic link.
- [ ] "Olvidé mi contraseña" me manda link de reset; al cambiarla, mis sesiones viejas se invalidan.
- [ ] Sin sesion valida no accedo a ninguna ruta del panel (redirige a login).
- [ ] El wizard tiene exactamente 4 pasos en orden y **se puede reanudar** si lo cierro a mitad.
- [ ] Paso 1 exige nombre, email, `lat/lng` y `opening_hours`; el **upload de logo funciona** (no es TODO) y se ve la preview.
- [ ] Paso 2 solo permite N ∈ {4,6,8,10,12} (default 8) y crea 1 programa activo (`version=1`).
- [ ] Paso 3 tokeniza la tarjeta via Bricks (el PAN nunca llega al server) y deja la suscripcion en `trial` (ver Feature 7).
- [ ] Paso 4 genera un QR descargable/imprimible que abre `/s/{slug}` correcto.
- [ ] Al completar el wizard, `onboarding_completed_at` queda seteado y aterrizo en Inicio.
- [ ] Todos los textos del wizard son COPY PUBLICA en voseo con tildes; labels usan "Primeros pasos", "Inicio".
- [ ] Inputs con labels, targets >=44px, contraste AA.

### 1.5 Fuera de alcance (MVP-0)
2FA del comercio; roles/staff/multi-usuario; multi-sucursal; SSO. (Roadmap, PRD §7/§13.)

---

## Feature 2 — Identidad del cliente por SMS OTP (Supabase Auth + Twilio Verify) + consentimiento (Ley 25.326)

### 2.1 Objetivo
Crear/identificar al cliente con la **minima friccion** (solo telefono verificado) y dejar registrado el **consentimiento informado** de datos personales, con **OTP por SMS** (telefono verificado) como primera capa anti-fraude. Login via **Supabase Auth (phone) + Twilio Verify**, canal **SMS** ahora y **WhatsApp** como swap de canal futuro sin tocar codigo (ADR-0013).

### 2.2 Flujo
1. Disparado desde el primer sello (Feature 3) cuando el cliente no tiene cuenta: pantalla **"Para guardar tu sello, ingresá tu número."** (COPY PUBLICA).
2. **Consentimiento (en la MISMA pantalla):** checkbox/aviso con links a **Política de Privacidad** y **Términos**. Texto claro de que el comercio es responsable y Wafi encargado del tratamiento; derecho de acceso, rectificacion y **supresion/baja de cuenta**. Sin aceptar, no se envia OTP.
3. **Envio OTP:** Supabase Auth dispara un **OTP de 6 dígitos por SMS** via **Twilio Verify** (Twilio gestiona generacion, entrega, reintentos y fraude). El canal se configura en el Verify Service: hoy SMS; se agrega WhatsApp cuando la cuenta de Meta este aprobada, sin tocar codigo.
4. **Verificacion:** el cliente ingresa los 6 digitos. OK -> se crea/recupera `wafi.customer` (solo telefono) y se persiste `wafi.consent`.
5. **Sello pendiente:** el sello que disparo el alta no se pierde; se acredita al cerrar el alta (manejo de "sello pendiente").
6. Nombre, email y cumple quedan **opcionales para despues** (no bloquean).

### 2.3 Anti-fraude / rate-limit (IN, capa 1 del PRD §8.5)
- OTP de **6 digitos** (no 4), expiracion **5-10 min**.
- **Rate-limit por telefono e IP** (ej. 5 intentos, luego lockout temporal).
- **Limite de reenvios** por telefono (anti toll-fraud de SMS).
- **Rate-limit de creacion de cuentas por IP/ASN**; bloqueo de rangos ASN de datacenter/VPN en el alta.
- **Turnstile invisible** en el endpoint de alta.
- Telefono real verificado por SMS encarece las granjas de cuentas; **Twilio Verify Fraud Guard** + bloqueo de ASN datacenter/VPN filtran virtuales y toll-fraud.

### 2.4 Datos (`wafi.*`)
- `wafi.customer`: `id, nombre(null), email(null), birthday(null), auth_id, phone(verificado), created_at`. Global a Wafi. `UNIQUE(phone)`.
- `wafi.consent`: `customer_id, policy_version, accepted_at` (Ley 25.326).
- Estado efimero del OTP (codigo hasheado, intentos, expiracion, reenvios) en tabla/almacen con TTL — NO se persiste el codigo en claro.

### 2.5 Criterios de aceptacion (checklist)
- [ ] No se envia OTP sin aceptar el consentimiento; los links a Privacidad y Términos abren y funcionan.
- [ ] El OTP llega por **SMS** (Twilio Verify via Supabase Auth) en segundos; el canal es configurable (SMS hoy, WhatsApp futuro).
- [ ] El codigo es de **6 dígitos** y expira entre 5 y 10 min.
- [ ] Tras 5 intentos fallidos por telefono o IP, hay **lockout temporal**; los reenvios estan limitados.
- [ ] Alta desde IP/ASN de datacenter/VPN es bloqueada o desafiada por Turnstile.
- [ ] Verificado el OTP, existe `wafi.customer` con `phone` y un registro en `wafi.consent` con `policy_version` y `accepted_at`.
- [ ] El **sello que disparo el alta no se pierde** (se acredita al cerrar el alta, sujeto a presencia de Feature 3).
- [ ] Un mismo telefono no crea dos clientes (`UNIQUE(phone)`); reingresar reusa la cuenta.
- [ ] El codigo OTP nunca se persiste en claro; inputs OTP tienen labels y son accesibles.
- [ ] Toda la copy esta en voseo con tildes.

### 2.6 Fuera de alcance (MVP-0)
Login del cliente por email/password; flujo self-service de cambio de numero (en MVP la **migracion por cambio de numero es manual via WhatsApp**, PRD §6.4); WhatsApp como canal de notificaciones (fase 2).

---

## Feature 3 — Escaneo con PRESENCIA OBLIGATORIA (hard)

### 3.1 Objetivo
Que el cliente sume **1 sello por visita** escaneando el QR del local con la **camara nativa del SO**, garantizando **presencia fisica** (ADR-0009): sin prueba de presencia, **no hay sello**. Cero trabajo del cajero.

### 3.2 Flujo
1. **Descubrir:** el cliente apunta la **camara nativa** al QR pegado al lado de la caja -> abre `https://app.wafi.com.ar/s/{slug}`. (La PWA **no** usa `getUserMedia`; el escaneo lo hace el SO.)
2. **Alta liviana** si no tiene cuenta -> Feature 2 (SMS OTP + consentimiento), con manejo de "sello pendiente".
3. **Permiso de ubicacion (una sola vez):** en el primer sello de la sesion / primer sello de un device nuevo en ese local se pide geolocalizacion **una vez**, con copy claro (COPY PUBLICA): **"Para confirmar que estás en el local, necesitamos tu ubicación una vez."** Se **cachea** la geo (al instalar la PWA / primer escaneo) para no re-promptear en cada visita.
4. **Llamada al server:** la PWA llama **RPC `wafi_register_scan`** con: `slug`, `token` (de la URL del QR), `device_id` (FingerprintJS, tratado como senal), geo declarada (si hay), `request_id`.
5. **Decision server-side** (orden de validacion):
   a. resolver `merchant`/`program` por `slug`; validar `token` (HMAC, vida de varios minutos; deteccion de reuso).
   b. **cooldown 15 min** por (cliente, local) **y** (device, local) **y** (IP, local).
   c. **tope diario duro** por usuario, device e IP/local (1-2 sellos/local/dia).
   d. **PRESENCIA OBLIGATORIA (hard):** evaluar geo GPS (cuando hay) dentro de **radio 150-300m** del `merchant.lat/lng` **+** IP/ASN server-side (no VPN/datacenter, geo-IP coherente) **+** horario dentro de `opening_hours`. Por ADR-0009: si la presencia **no se prueba, el sello se RECHAZA** (no se acredita). Cuando la geo GPS no esta disponible, la presencia se evalua con **IP server-side + horario** (fallback explicito, PRD §12.1) — si tampoco eso pasa, se rechaza.
   e. anomalias simples (shadow-limit version simple: ">N sellos en X min", "mismo fp+IP+timing en N membresias").
6. **Resultado:** si pasa, insert en `wafi.stamp_event` con `status='valid'`, se materializa `current_stamps += 1` en la membresia, y se muestra pantalla **RESULTADO de exito** (reusando la animacion success del viejo ScanModal, que se **REESCRIBE**: hoy es camara falsa con cooldown 1h y "Cafe Roma" hardcodeados — eso se elimina). Si no pasa, mensaje neutro segun `result`.
7. Si el sello completa la tarjeta -> emite voucher (Feature 4/5).

### 3.3 Reglas de presencia (ADR-0009, hard) — explicito
- **Default `require_presence=true`.** No configurable por el comercio.
- **Rechazo (no acreditacion)** si: sin permiso de geo Y sin senal IP valida; o geo fuera de radio; o IP de VPN/datacenter; o geo-IP de otra ciudad; o GPS "perfecto" sin jitter inconsistente con geo-IP; o fuera de `opening_hours`.
- **Salvedad honesta documentada (ADR-0009):** con QR estatico la geocerca GPS es spoofeable por un usuario tecnico; el blindaje airtight es el **QR dinamico** (Feature 6) o el sello-atado-al-pago (roadmap). La presencia hard sube el costo y la friccion del fraude; no lo hace imposible.
- El **motivo** por el que un sello fue rechazado por presencia **no se detalla** al cliente mas alla de un mensaje neutro (no dar pistas al defraudador).

### 3.4 Datos (`wafi.*`)
- `wafi.stamp_event` (inmutable): `id, membership_id, merchant_id, customer_id, program_version, created_at, source('qr'), device_id, ip, asn, geo(null), geo_ip(null), risk_level('ok'|'sospechoso'), risk_reasons[], status('valid'|'pending'|'voided'), result('ok'|'cooldown'|'cap'|'invalid_token'|'no_presence'), voided_by, voided_at`.
- `wafi.membership`: `UNIQUE(customer_id, merchant_id)`; `current_stamps, stamps_earned, last_visit_at` materializados desde scans `valid`.
- `wafi.merchant`: `lat, lng, opening_hours` (alimentan presencia).

### 3.5 Criterios de aceptacion (checklist)
- [ ] El QR estatico abre `https://app.wafi.com.ar/s/{slug}` desde la **camara nativa**; la PWA NO pide permiso de camara para el flujo principal.
- [ ] El primer sello sin cuenta dispara Feature 2 y luego acredita el "sello pendiente".
- [ ] El permiso de ubicacion se pide **una sola vez** por sesion/device con el copy exacto, y se cachea (no re-promptea en visitas siguientes).
- [ ] El sello se otorga **siempre server-side** via `wafi_register_scan`; el cliente nunca lo escribe.
- [ ] **Cooldown 15 min** rechaza un segundo escaneo por (cliente, local), (device, local) e (IP, local).
- [ ] **Tope diario duro** corta al 2do (o 3er) sello del dia en el mismo local por usuario/device/IP.
- [ ] **Presencia hard:** un escaneo fuera de radio / con IP VPN-datacenter / fuera de horario **NO acredita sello** (se rechaza), y el cliente ve un mensaje neutro.
- [ ] Cuando no hay geo GPS, la presencia se evalua con **IP+horario**; si eso falla, se rechaza.
- [ ] Cada escaneo (pase o no) deja un `stamp_event` con `result` y `risk_level/risk_reasons` correctos.
- [ ] `current_stamps` se materializa solo desde scans `valid` (un rechazo no incrementa progreso).
- [ ] `wafi_register_scan` es idempotente por `request_id` (re-tap no duplica).
- [ ] El endpoint tiene rate-limit y proteccion DoS (RLS no lo cubre).
- [ ] El comercio NO puede tocar cooldown, tope, radio de presencia ni horario via UI.

### 3.6 Fuera de alcance (MVP-0)
Wallet pass como canal de progreso (MVP-1); fallback de escaner in-app `getUserMedia`; geocerca rica con multiples radios; capa 6 de anomalias con ML; bloqueo visible duro al cliente.

---

## Feature 4 — Tarjeta + progreso + voucher

### 4.1 Objetivo
Que el cliente vea su tarjeta de sellos, su progreso animado por cada cafe, y que al completar N se emita un voucher.

### 4.2 Flujo
1. **Home (PWA):** stack de tarjetas (una por cafe / membresia). Reusar `Home` + `CardView` del prototipo (grilla + `animate-stamp-pop` + `CompletionOverlay`).
2. **Progreso:** cada sello valido refleja `current_stamps / program.stamps_required` con animacion (respetando `prefers-reduced-motion`). **Sin divisor hardcodeado:** usar `program.stamps_required` (NO `/8`).
3. **Completar:** al llegar a N, server **emite 1 voucher** (`wafi.voucher`, `status='emitido'`), **reinicia** la tarjeta a 0, e incrementa `vouchers_earned`. Se muestra `CompletionOverlay` (COPY PUBLICA, 1 exclamacion max): "Completaste tu tarjeta. Tu {recompensa} te espera."
4. **Voucher visible:** aparece en la seccion de Vouchers de la PWA, listo para canjear (Feature 5).
5. **Vencimiento:** el voucher vence a **~30 dias** (configurable).

### 4.3 Datos (`wafi.*`)
- `wafi.membership`: `current_stamps, stamps_earned, stamps_redeemed, vouchers_earned, category(derivada), first_seen_at, last_visit_at`.
- `wafi.voucher`: `id, membership_id, customer_id, merchant_id, program_version, code, reward_text, status('emitido'|...), activation_count, issued_at, expires_at, ...`. `UNIQUE(code)`.
- `wafi.loyalty_program`: `stamps_required` (fuente del divisor), `reward_text`, `color`.

### 4.4 Criterios de aceptacion (checklist)
- [ ] La PWA muestra una tarjeta por membresia con progreso correcto contra `program.stamps_required` (sin `/8` hardcodeado).
- [ ] Cada sello valido anima el sello y actualiza el contador; respeta `prefers-reduced-motion`.
- [ ] Al llegar a N se **emite exactamente 1 voucher** (`status='emitido'`), la tarjeta **se reinicia a 0** y sube `vouchers_earned`.
- [ ] La emision es idempotente: completar no genera dos vouchers ante reintentos.
- [ ] El voucher aparece en la seccion de Vouchers con su `reward_text` y `expires_at` (~30d).
- [ ] El overlay de completado respeta 1 exclamacion max y voseo.
- [ ] Empty state en voseo cuando el cliente no tiene tarjetas/vouchers.

### 4.5 Fuera de alcance (MVP-0)
Multi-programa/multi-nivel por comercio; categorias con logica rica (en beta son **cosmeticas** por `stamps_earned`); Wallet pass mostrando progreso (MVP-1).

---

## Feature 5 — Canje por codigo rotativo 3 min (ADR-0007)

### 5.1 Objetivo
Canjear el voucher de un solo uso con **friccion minima y bajo fraude**: la PWA muestra un **codigo rotativo valido 3 min** y el cierre real se hace por **re-escaneo del QR en modo canje** (default), sin trabajo del cajero.

### 5.2 Flujo
1. El cliente abre el voucher en la PWA y toca **"Canjear"** (reusar `RedeemScreen`: codigo grande + **timer 3 min**, ADR-0007).
2. Al activar -> server pasa el voucher `emitido -> activado` y luego `en_uso`; arranca la ventana de **3 min** verificada server-side.
3. **Cierre (camino DEFAULT):** el cliente **re-escanea el QR del local en modo canje** -> server cierra el voucher con la **misma prueba de presencia** que un sello (Feature 3), sin que el cajero toque nada. Tras los 3 min pasa a `consumido` por default.
4. **Confirmacion manual opcional:** el cajero puede marcar `consumido` desde su panel (Feature 6) para cafes que lo quieran. No obligatoria.
5. **Re-activacion acotada:** se permite **maximo 1 re-activacion** ante vencimiento accidental; luego se cierra. Todo voucher activado **>2 veces** se loggea y marca `sospechoso` (via `activation_count`).
6. **Estados** persistidos e idempotentes: `emitido -> activado -> en_uso -> consumido / vencido`. Canjeable **una sola vez** (`UNIQUE(code)`).

### 5.3 Datos (`wafi.*`)
- `wafi.voucher`: `status('emitido'|'activado'|'en_uso'|'consumido'|'vencido'), activation_count, issued_at, activated_at, consumed_at, expires_at, code(UNIQUE)`.
- El "codigo rotativo 3 min" es una proyeccion verificada server-side (token corto con TTL 3 min ligado al `voucher.id`), no un nuevo registro persistido por rotacion.
- `wafi.membership`: `stamps_redeemed` se actualiza al consumir.

### 5.4 Criterios de aceptacion (checklist)
- [ ] "Canjear" muestra un codigo rotativo con **timer de 3 min** (ADR-0007) verificado por el server.
- [ ] El cierre **default** es por **re-escaneo del QR en modo canje**, que aplica la misma presencia hard que un sello.
- [ ] Un voucher solo se puede consumir **una vez** (`UNIQUE(code)`); un segundo intento falla.
- [ ] Las transiciones de estado son server-side e idempotentes (`emitido->activado->en_uso->consumido/vencido`).
- [ ] Vencida la ventana de 3 min sin cierre, el voucher pasa a `consumido` (default) o queda re-activable (1 vez).
- [ ] Se permite **maximo 1 re-activacion**; un voucher activado >2 veces queda `sospechoso` y loggeado (`activation_count`).
- [ ] El cajero puede, opcionalmente, marcar `consumido` desde el panel; no es obligatorio.
- [ ] Codigo de voucher con contraste AA y target >=44px; copy en voseo.

### 5.5 Fuera de alcance (MVP-0)
QR rotativo criptografico avanzado; canje con confirmacion obligatoria del cajero; reactivaciones ilimitadas (explicitamente prohibido por PRD §5.2).

---

## Feature 6 — Panel del comercio

### 6.1 Objetivo
Dar al dueno un panel con 6 secciones operativas (+ Suscripcion) para ver su negocio, sus clientes, su tarjeta/QR, la actividad reciente, y configurar el modo de QR.

### 6.2 Secciones (labels on-brand)
1. **Inicio (Panel):** reusar `Dashboard.jsx`. 4 stat cards; grafico de 8 semanas; breakdown por categoria; preview de tarjeta; top 5 clientes. **Renombrar el card "Indice de Fidelizacion" a "Pulso semanal"** (sellos de esta semana vs la anterior) con tooltip que explica el calculo. Sumar **"Actividad en vivo"** (ultimos 5-10 sellos, **polling 10-15s**) y badge "sellos a revisar esta semana". **Empty states en voseo** para 0 clientes / 0 sellos.
2. **Clientes:** reusar `Customers.jsx`. **Corregir el bug del divisor `/8` hardcodeado** -> usar `membership.program.stamps_required`. Empty state en voseo.
3. **Mi Tarjeta + QR:** reusar `MyCard.jsx`. **Implementar el upload de logo** (hoy TODO). Corregir copy anti-abuso a **15 min**. Copy de QR que no promete atadura al pago ("Escaneá después de tu compra" como convencion, no verificacion).
4. **Actividad (Actividad en vivo + anular):** cada sello = evento con hora, cliente y **nivel de riesgo** (geo rara, rafaga, dispositivo nuevo, fuera de horario). Boton **"Anular sello"** que descuenta progreso y queda auditado (`status='voided'`, `voided_by`, `voided_at`). Filtros + paginacion. Es complemento humano, no sustituto de las barreras automaticas.
5. **Notificaciones:** reusar `Notifications.jsx` (toggles de almost/lapsed/birthday; ventana lapsed [7,14,30] default 14; **birthday default ON**; preview en voseo). En MVP-0 la entrega real de push amplia es MVP-1; los toggles persisten config.
6. **Config de QR estatico/dinamico (ADR-0008):** el comercio elige `qr_mode ∈ {static, dynamic}`. **Estatico imprimible = default.** El **dinamico rotativo es opcional por comercio** (requiere un dispositivo —tablet/celu viejo— en el mostrador mostrando un QR que rota). UI para activar/desactivar y, en dinamico, la pantalla del QR que rota.

**Suscripcion / Facturacion MP (pantalla aparte):** estado de suscripcion, proximo cobro, metodo de pago (ver Feature 7). Reemplaza `merchant.plan='Gratis'` por `{plan, subscription_status, mp_preapproval_id, current_period_end}`.

### 6.3 Parametros NO configurables por el comercio (anti comercio-tramposo)
Cooldown, tope diario duro por device, ventana/radio de presencia, reglas de anomalia. El comercio **solo** configura premio, N de sellos, modo de QR y los toggles de notificaciones.

### 6.4 Datos (`wafi.*`)
- `wafi.stamp_card`/`loyalty_program`: `qr_mode ∈ {static, dynamic}` (ADR-0008; si la columna no existe en la tabla del programa, agregarla donde corresponda).
- `wafi.stamp_event`: alimenta Actividad en vivo y la anulacion (`voided_*`).
- `wafi.merchant`: `plan, subscription_status, mp_preapproval_id, current_period_end`.

### 6.5 Criterios de aceptacion (checklist)
- [ ] Inicio muestra el card renombrado **"Pulso semanal"** con tooltip; ya NO dice "Indice de Fidelizacion".
- [ ] Inicio incluye "Actividad en vivo" actualizada por **polling 10-15s** (sin Realtime) y el badge de sellos a revisar.
- [ ] Clientes calcula progreso con `program.stamps_required` (bug `/8` corregido) y tiene empty state en voseo.
- [ ] Mi Tarjeta permite **subir logo** (no TODO) y el copy anti-abuso dice **15 min**; el copy del QR no promete atadura al pago.
- [ ] Actividad lista eventos con hora, cliente y nivel de riesgo; **"Anular sello"** descuenta progreso y deja auditoria (`voided_by/at`).
- [ ] Notificaciones persiste toggles; **birthday viene ON** por default; ventana lapsed default 14.
- [ ] El comercio puede cambiar `qr_mode` entre estatico (default) y dinamico; en dinamico se muestra un QR que rota.
- [ ] El comercio **no** puede editar cooldown, tope, presencia ni anomalias desde ninguna pantalla.
- [ ] Pantalla de Suscripcion muestra plan, estado, proximo cobro y metodo de pago reales.
- [ ] Todos los labels y empty states en voseo con tildes; sin "plataforma" en copy publica.

### 6.6 Fuera de alcance (MVP-0)
Supabase Realtime; multi-sucursal; roles/staff; export CSV; segmentacion avanzada; QR firmado/rotativo como infra base (solo el modo dinamico opcional en tablet del local entra).

---

## Feature 7 — Cobro Mercado Pago: trial 30 días SIN tarjeta, freeze + pago al día 31

### 7.1 Objetivo
Cobrar la suscripcion al comercio via **MP `/preapproval`**, con **trial de 30 días sin pedir tarjeta** (cero friccion). Al **día 31**, si el comercio no agrego medio de pago, el programa se **congela** (no se suman sellos nuevos; nada se borra) hasta que pague; al pagar se **reactiva al instante**. Estado sincronizado por **webhooks** reaccionando al comportamiento real de MP (ADR-0010 final, ADR-0011, ADR-0002, PRD §10.3).

### 7.2 Flujo
1. **Alta SIN tarjeta:** al crear el comercio se crea `wafi.subscriptions` con `status='trialing'` y `trial_ends_at = now()+30d` (trigger `set_trial_end`, ya implementado). **No se pide medio de pago en el alta.**
2. **Trial (días 1-30):** todo habilitado; `merchant_can_stamp()` = true. Customer Success empuja que el local enganche clientes reales (de eso depende la palanca del día 31).
3. **Día 31 sin pago → FREEZE (ADR-0011):** `merchant_can_stamp()` = false → `wafi_register_scan` devuelve `subscription_inactive` (el QR deja de dar sellos nuevos). **Sellos y vouchers ya ganados se preservan**; los vouchers se pueden **seguir canjeando**. El panel muestra "Reactivá tu programa" con el flujo de pago.
4. **Pago (recien acá se pide la tarjeta):** SDK/Bricks de MP tokeniza la tarjeta del lado cliente (`card_token_id`; el PAN nunca toca el server). El back crea un `preapproval` por comercio (`card_token_id`+`payer_email`+`status=authorized`). MP cobra mensual desde ese momento.
5. **Restauracion instantanea:** webhook `authorized`/`payment.approved` → `status='active'` → `merchant_can_stamp()` = true → **todo se reactiva al instante** (nunca se borro nada).
6. **Webhooks:** validar **`x-signature`**; **idempotencia** por id de MP; ante cada webhook hacer **GET canonico** del recurso (`GET /preapproval/{id}` y/o `authorized_payments`), no confiar solo en el payload; mapeo deterministico MP → `{trialing|active|past_due|paused|cancelled}`.
7. **Dunning = comportamiento real de MP:** ~4 reintentos en ~10 dias; fallos → `past_due`; auto-cancel de MP → `cancelled`. En `past_due`/`cancelled` el programa queda **congelado** (no se borra data) y se reactiva al regularizar. Wafi NO define su propia cadencia de reintentos.

### 7.3 Datos (`wafi.*`) — ya implementado
- `wafi.subscriptions`: `merchant_id, plan, status('trialing'|'active'|'past_due'|'paused'|'cancelled'), trial_days(30), trial_ends_at, mp_preapproval_id, current_period_end`. Trigger `set_trial_end` setea `trial_ends_at`.
- `wafi.merchant_can_stamp(merchant_id)` (gate) + gate dentro de `wafi_register_scan` → estado `subscription_inactive`.
- Log de webhooks con idempotencia (id de MP, tipo, estado resuelto, recibido_at).

### 7.4 Criterios de aceptacion (checklist)
- [ ] El alta **no pide tarjeta**; se crea `subscriptions` con `status='trialing'` y `trial_ends_at=+30d`.
- [ ] Durante el trial el comercio opera normal y ve "Te quedan N días gratis".
- [ ] Al día 31 sin pago, `wafi_register_scan` devuelve `subscription_inactive` (no suma sellos nuevos), pero los **vouchers ya ganados se pueden canjear** y **nada se borra**.
- [ ] Al pagar (tarjeta recien en este punto, tokenizada por Bricks; el server **nunca** recibe el PAN), el estado pasa a `active` y **todo se reactiva al instante**.
- [ ] Cada webhook **valida `x-signature`**, es **idempotente** por id de MP, y hace **GET canonico** antes de decidir.
- [ ] El mapeo de estados MP es deterministico y queda logueado; el dunning sigue el comportamiento real de MP (sin cron propio).
- [ ] Wafi NO ejecuta su propia cadencia de reintentos (reacciona a MP).
- [ ] Con comercio `past_due`/`canceled`, el cliente **sigue sumando sellos**; el dueno pierde acceso al panel.
- [ ] La pantalla de Suscripcion refleja estado, proximo cobro y metodo de pago consistentes con MP.

### 7.5 Fuera de alcance (MVP-0)
Sello-atado-al-pago (Orders API + webhook `payment.approved`); QR interoperable cross-wallet; MP Point; planes Multi-local con API; promos como `preapproval_plan` adicionales (modelar cuando se active la oferta de beta). El **gate de cuenta vendedor habilitada (KYC + credenciales de produccion, PRD §10.4)** es prerrequisito operativo, no codigo de esta feature.

---

## Apendice A — Mapa feature -> tablas `wafi.*`

| Feature | Tablas principales |
|---|---|
| 1 Auth + Primeros pasos | `merchant`, `loyalty_program` |
| 2 Identidad cliente | `customer`, `consent` (+ store efimero OTP) |
| 3 Escaneo presencia | `stamp_event`, `membership`, `merchant` |
| 4 Tarjeta/progreso/voucher | `membership`, `voucher`, `loyalty_program` |
| 5 Canje 3 min | `voucher`, `membership` |
| 6 Panel | `merchant`, `loyalty_program`/`stamp_card`(`qr_mode`), `stamp_event` |
| 7 Cobro MP | `merchant` (+ log de webhooks) |

## Apendice B — Diferencias PRD vs DECISIONS resueltas en esta spec
| Tema | PRD dice | Vigente (manda) | Aplicado aca |
|---|---|---|---|
| Trial | 14 días | **30 días SIN tarjeta; freeze + se pide tarjeta al día 31 (ADR-0010/0011)** | Feature 7 |
| Canje | timer 5 min | **3 min (ADR-0007)** | Feature 5 |
| Presencia | soft/`pending` cosmetico | **hard: sin presencia no hay sello (ADR-0009)** | Feature 3 |
| Cooldown | 15 min | **15 min (ADR-0004)** | Feature 3 |
| QR | estatico+dinamico | **estatico default + dinamico opcional (ADR-0008)** | Feature 6 |
