# Documento de Definicion de Producto (PRD) — Wafi

**Version:** 2.0 (canonica, post-verificacion adversarial) · **Fecha:** 2026-06-04 · **Autor:** CPO · **Idioma:** espanol rioplatense (voseo)

> Documento integrador, endurecido contra 4 revisiones adversariales (fraude, factibilidad Mercado Pago, scope, marca). Construido sobre las decisiones ya tomadas por el CEO. Orientado a un MVP construible por un equipo chico. Donde algo no se sabe con certeza, se dice explicitamente. **Nota de registros:** este PRD distingue lexico INTERNO (tecnico, vale "plataforma", "dashboard", "shadow-limit") de COPY PUBLICA de cara al comercio/cliente (donde rige BRAND-VOICE: esas palabras estan vetadas). Cada frase de ejemplo marca su registro.

---

## 1. Resumen ejecutivo y vision de producto

**Wafi es la tarjeta de sellos de tu cafe, ahora en el celular.** Reemplaza la tarjeta de carton de las cafeterias argentinas por una tarjeta de sellos digital que vive en la billetera del celular del cliente (Apple Wallet / Google Wallet) y en una PWA instalable. El cliente escanea un QR del local con la camara nativa, suma sellos solo, y al completar la tarjeta canjea su premio. El comercio no toca nada: ni app, ni hardware, ni trabajo extra para el cajero.

**Vision:** que volver a tu cafe de siempre tenga premio, sin friccion para nadie. Wafi es el "carnet de cliente fiel" que no se moja, no se pierde y se actualiza solo.

**Que es Wafi (MVP):**
- Producto SaaS B2B completo: backend + panel web del comercio + experiencia del cliente en Wallet/PWA. *(Nota interna: "sin app que descargar" no significa "sin sistema detras"; hay backend y web completos. Esta frase NO se publica con la palabra "plataforma" — ver seccion 4.)*
- Cobro de la suscripcion al comercio via **Mercado Pago desde el dia uno**.
- Modelo **cliente-escanea**: cero trabajo del cajero, con anti-fraude en capas y **prueba de presencia dura**.
- Foco unico: **cafeterias en Argentina**, voz 100% rioplatense.

**Que NO es (MVP):** no es una app nativa de tienda, no es un POS, no es multi-vertical, no ata todavia el sello al pago real (eso es roadmap).

**Los moats reales de Wafi** (orden de defendibilidad; honestidad sobre que es moat y que es table stake):
1. **Mercado Pago nativo** — cobro de suscripcion (dia uno) y, a futuro, sello atado al pago real. Ningun competidor de sellos en AR lo integra de fabrica.
2. **Voz 100% argentina** — voseo, cero traduccion robotica. Moat cultural que un SaaS global no replica con traduccion.
3. **UX cliente-escanea + anti-fraude por capas con presencia dura** — cero trabajo del cajero, a diferencia del estandar de la categoria.
4. **Precio en pesos** — frente a competidores que cobran en USD.
5. **Wallet + PWA + soporte por WhatsApp** — table stake util para onboarding, NO moat (Loopy, Boomerangme, Loyalz, FIU ya estan en wallet). Se comunica para claridad, no como diferenciador.

---

## 2. El problema y por que ahora

**El problema (del comercio):** la tarjeta de carton se pierde, se moja, se olvida. El comercio no sabe quien es su cliente fiel, no puede reactivarlo, no tiene datos. Imprimir tarjetas cuesta y no fideliza de verdad.

**El problema (del cliente):** junta sellos en un carton que nunca tiene a mano; pierde el progreso; no se entera de que le falta un sello.

**El enemigo es la tarjeta de carton, no un competidor.** (Regla de marca: nunca nombrar competidores en copy publico.)

**Por que ahora:** la billetera del celular ya es habito masivo en AR; Mercado Pago es el riel universal de cobro; WhatsApp es el canal del dueno de cafeteria. Ningun player local combina precio en pesos + MP nativo + cliente-escanea + voz rioplatense.

---

## 3. ICP / segmento objetivo (cafeterias AR)

**ICP-beachhead (el mensaje de lanzamiento habla SOLO a esto):** cafeteria de especialidad o de barrio en **Argentina**, **1 a 3 locales**, dueno-operador presente, ticket recurrente (cafe diario), cajero fisicamente al lado del QR.

**Geo de arranque:** CABA (Palermo, Villa Crespo, Caballito), Cordoba capital, Rosario, Mendoza.

**Roles:** *buyer/usuario del panel* = dueno de la cafeteria; *usuario final* = cliente cafetero recurrente.

**Fuera del mensaje de lanzamiento (roadmap, NO MVP):** heladerias, panaderias, peluquerias, food trucks, retail general, expansion LATAM. El protocolo LATAM del material viejo se guarda como anexo de roadmap, no se comunica.

> **Tarea de marca (seccion 4):** los copy samples, value props y boilerplate de BRAND-VOICE usan ejemplos multi-vertical (heladeria/peluqueria/food truck). Para el beachhead hay que **reescribirlos todos a cafeterias** (cafe de especialidad, cafe de barrio) y archivar los multi-vertical como version post-expansion.

---

## 4. Propuesta de valor, posicionamiento y moats

### 4.1 Positioning statement (ARTEFACTO INTERNO, NO se publica tal cual)
> *Interno (formato Moore):* "Para duenos de cafeterias en Argentina que quieren que sus clientes vuelvan, Wafi reemplaza la tarjeta de carton por una tarjeta de sellos digital que vive en la billetera del celular."

Este statement es herramienta de alineacion interna. **La copy publica NO abre por la mecanica (QR) sino por el beneficio (que volver tenga premio)** y reusa las frases firma aprobadas de BRAND-VOICE.

### 4.2 Copy publica (voseo acentuado obligatorio)
- **Tagline corporativo:** "Fidelizacion simple. Clientes que vuelven."
- **Lanzamiento (recomendado):** **"La tarjeta de sellos de tu cafe, ahora en el celular."**
- **Frases firma aprobadas:** "Un QR. Eso es todo." / "Chau tarjetas de carton." / "Tus clientes vuelven. Vos ganas."
- **Descriptor de valor (publico, voseo):** "Tu cliente escanea un QR y suma sellos solo. Vos no hacés nada: ni app, ni hardware, ni trabajo extra para el cajero. Cobrás y te integrás con Mercado Pago, y te damos una mano por WhatsApp."

> **Correccion de voseo (era un defecto del borrador):** las formas correctas son **hacés, Cobrás, integrás, pagás** — no "haces/Cobras/integras/pagas". Todo string de ejemplo en este PRD que sea copy publica va con tildes y voseo. Fijar un lint de tildes para strings de copy en el codigo.

### 4.3 Donde gana Wafi (4 ejes reales)
1. Precio en pesos. 2. Mercado Pago nativo. 3. UX cliente-escanea (cero trabajo del cajero). 4. Nativo rioplatense + soporte por WhatsApp.

**Donde NO competir:** no posicionar "el que esta en el wallet" ni "sin app" como moat; no competir con POS/gestion integral. Wafi es loyalty puro y liviano.

### 4.4 Reglas de voz (ratifican BRAND-VOICE con ajustes)
- **Dos registros:** lexico INTERNO/tecnico (en docs de ingenieria valen "plataforma", "dashboard", "churn", "engagement", "onboarding", "shadow-limit", "feed", "device fingerprint") vs **lexico PUBLICO** (vetado por BRAND-VOICE). Toda superficie que el usuario LEE usa solo el registro publico.
- **"Plataforma" esta VETADA en copy publico** (BRAND-VOICE l.195). Reescribir la frase ancla a: "Sin app que descargar no significa sin sistema detras."
- **Sin urgencia fabricada** (BRAND-VOICE l.139/239/297). Prohibido "ultimas horas / solo por hoy / ultimos dias". La oferta de lanzamiento se reencuadra como **cupo de beta honesto** (ver seccion 10.2), nunca como escasez de presion.
- **Un (1) signo de exclamacion por mensaje/push** (BRAND-VOICE l.283). Pasar toda la copy heredada de mock.js por el checklist (Vos test, Jargon test, Length test) antes de congelarla.
- Enemigo unico = tarjeta de carton; nunca nombrar competidores en copy publico.
- **Labels de UI de cara al comercio** respetan la lista de palabras vetadas: "Onboarding wizard" -> **"Primeros pasos"**; "Dashboard/Inicio" -> **"Panel"** / **"Inicio"**; "feed en vivo" -> **"Actividad en vivo"**; mantener **"Pulso semanal"** (ya on-brand). "shadow-limit", "device fingerprint", "churn", "engagement" quedan SOLO en docs internos.

### 4.5 Higiene de honestidad
Quitar o etiquetar como ilustrativos los testimonios y metricas inventados del material viejo (Cafe Roma/Orinoco, Estilo Lucia, "+45 comercios", "73%/89%/34%"). Hasta tener data real: prueba social honesta ("Hecho en Argentina", "En beta con cafeterias de [barrio]"). **Wafi nunca publica metricas agregadas de un comercio sin filtro anti-inflado** (ver seccion 8.4). Recolectar testimonios reales desde el dia 1.

### 4.6 Dominio
**Barrer wafi.us** en BRAND-VOICE, LANDING-CRO y LAUNCH-PLAYBOOK y reemplazarlo por **wafi.com.ar** (y soporte@wafi.us -> soporte@wafi.com.ar) antes de cualquier publicacion. Ver seccion 12.

### 4.7 Vigilancia competitiva
FIU (#1: wallet-pass AR sin registro; la diferencia de fondo es el modelo de escaneo) y Loyalz (#2: mas traccion regional). Tracking trimestral de pricing/features/wallet.

---

## 5. Mecanica de fidelizacion (sellos, premios, vouchers, categorias, indice)

### 5.1 Mecanica canonica (MVP)
- **N consumos = 1 premio**. Cada escaneo valido suma **exactamente 1 sello, sin importar el monto**.
- **N lo define el comercio** entre {4, 6, 8, 10, 12}, **default 8**.
- Al llegar a N: se emite **1 Voucher** y la tarjeta se reinicia a 0.
- **Una sola tarjeta/programa activo por comercio** en el MVP. **En beta las reglas del programa se congelan** (no se editan N ni premio una vez emitido un voucher); el versionado existe como columna pero sin logica compleja (ver seccion 11). Multi-programa/multi-nivel = roadmap.
- Un cliente puede tener varias **membresias** (una por cafe).

### 5.2 Vouchers / canje (HUECO DE CANJE MULTIPLE CERRADO)
- Estados persistidos server-side e idempotentes: **emitido -> activado -> en_uso -> consumido / vencido**. Canjeable **una sola vez** (constraint sobre `code`).
- UX: codigo grande + timer de **5 min** (reutilizar RedeemScreen del prototipo) como ventana de validez verificada por el server.
- **Cierre del canje sin cargar al cajero (NUEVO, corrige el hueco del borrador):** el **camino por DEFAULT es que el cliente re-escanee el QR del local en modo canje**, lo que cierra el voucher server-side con la MISMA prueba de presencia que el sello, sin que el cajero toque nada. Al activar el voucher pasa a `en_uso`; tras los 5 min pasa a `consumido` por default.
- **Re-activacion acotada:** se permite **como maximo 1 re-activacion** ante un vencimiento accidental; luego el voucher se cierra. Todo voucher activado **>2 veces** se loggea y se marca `sospechoso`. (Esto reemplaza el "re-activable infinito" del borrador, que permitia llevarse el premio varias veces en cafes sin confirmacion.)
- Confirmacion manual del comercio: opcional, para cafes que la quieran (el cajero marca consumido en su panel). No obligatoria. El default de re-escaneo ya cubre la prueba de uso.
- **Vencimiento del voucher: ~30 dias**, configurable.

### 5.3 Categorias (Nuevo / Regular / Frecuente / VIP)
- **Por-membresia**, no globales a Wafi.
- **MVP minimo:** por `stamps_earned` historico (defaults **0-10 / 11-30 / 31-60 / 61+**, guardados como config del Programa). **No aportan valor con 0 historia**, por eso son cosmeticas en beta y la logica rica se difiere.
- **v2:** recencia/score para que un VIP inactivo baje de categoria.

### 5.4 Indice de Fidelizacion vs Pulso semanal
- **Pulso semanal** (renombrar el actual "Indice de Fidelizacion" del panel — confirmado: el label hardcodeado vive en `Dashboard.jsx` l.28): metrica de **momentum del comercio** = sellos de esta semana vs la anterior. Solo se renombra; con tooltip que explique el calculo. **Entra al MVP.**
- **Indice de Fidelizacion** (score 0-100 por cliente/membresia, recencia+frecuencia+completitud, sin ML): **se difiere a v2/post-PMF** — requiere historia que el dia 1 no existe. El concepto de marca se reserva; alimentara categorias dinamicas y re-engagement cuando haya datos.

---

## 6. Experiencia del cliente (Wallet + PWA + escaneo + flujo end-to-end)

### 6.1 Reparto de roles
- **PWA instalable = la tarjeta y el centro de gestion.** Es la fuente de cobertura total: alta, progreso, vouchers, historial, multiples tarjetas, perfil. **Nada critico (sumar sello, canjear) requiere el wallet pass.**
- **Wallet pass (Apple + Google) = canal de RETENCION y glanceabilidad.** Vive en la billetera, aparece en lockscreen, se actualiza solo por push, sin abrir nada. Es comodidad y reemplazo emocional del carton.
- **Regla de diseno:** la fuente de verdad es siempre el backend; pass y PWA son proyecciones read-mostly. Esto habilita el staging de scope (seccion 13): la PWA puede ser la tarjeta desde el dia uno aunque el wallet pass nativo llegue despues.

### 6.2 Flujo end-to-end (MVP)
1. **Descubrir:** el cliente apunta la **camara nativa** del SO al QR pegado al lado de la caja -> abre `https://app.wafi.com.ar/s/{merchant}/{branch}`. (La camara nativa abre una URL; la PWA no escanea ni pide permiso de camara para el flujo principal.)
2. **Alta liviana:** si no tiene cuenta -> "Para guardar tu sello, ingresa tu numero" -> **WhatsApp OTP de 6 digitos** (ver seccion 8.5 para rate-limit y anti toll-fraud) -> cuenta creada (solo telefono). Nombre y cumple opcionales despues. **Consentimiento de datos:** checkbox/aviso con link a Politica de Privacidad y Terminos en esta pantalla (seccion 13). Manejar **"sello pendiente"** para no perder el primer sello durante el alta.
3. **Permiso de ubicacion (NUEVO, clave anti-fraude):** en el primer sello de la sesion se pide permiso de geolocalizacion **una sola vez**. Se explica en lenguaje claro: "Para confirmar que estas en el local, necesitamos tu ubicacion una vez." El cliente real, parado en el mostrador, lo da y no lo vuelve a ver. Ver seccion 8.2 para que pasa si lo niega.
4. **Primer sello + Wallet:** se confirma el sello #1 (pantalla de RESULTADO, reusando el success de ScanModal) y se ofrece CTA primario **"Agregar a Apple/Google Wallet"** (deteccion de plataforma) + CTA secundario "Instalar la app" (PWA).
5. **Sumar sellos:** en cada visita re-escanea el mismo QR -> backend valida cooldown + presencia + capas -> empuja sello a PWA (y al pass si esta agregado).
6. **Progreso:** visible en la PWA (grilla animada) y en el pass (lockscreen).
7. **Voucher:** al completar -> notif PWA + push al pass; la PWA/el pass muestran el codigo de canje.
8. **Canje:** el cliente abre el voucher (RedeemScreen, timer 5 min) y **re-escanea el QR del local en modo canje** (camino default) para cerrarlo server-side; opcionalmente el cajero confirma en su panel.

### 6.3 Que se reutiliza del prototipo / que se REESCRIBE (verificado en codigo)
- **Se reutiliza:** CardView (grilla + `animate-stamp-pop` + CompletionOverlay), Home (stack de tarjetas), Vouchers/RedeemScreen (timer + codigo), copy en voseo de mock.js (auditada por checklist y por la regla de 1 exclamacion).
- **Se REESCRIBE (no "reusa"):** **ScanModal** — es una camara falsa con **cooldown de 1 hora hardcodeado** ("Tiene que pasar 1 hora...", verificado en `ScanModal.jsx`) y **merchant "Cafe Roma" hardcodeado**. Casi nada se reusa salvo la animacion de success. Pasa a ser pantalla de RESULTADO del flujo camara-nativa. El "QR personal" de Profile como mecanismo de sello se descarta.

### 6.4 Identidad
- **Alta = solo telefono + SMS OTP** (Supabase Auth + Twilio Verify; WhatsApp futuro — ADR-0013). El telefono verificado es identidad y primera capa anti-fraude. Email opcional.
- **Migracion por cambio de numero (NUEVO, hueco de retencion serio en AR):** como identidad = telefono, cambiar de SIM = perder sellos. MVP: soporte manual de migracion via WhatsApp (el dueno o Wafi vinculan el numero viejo al nuevo). v2: flujo self-service.

---

## 7. Experiencia del comercio (panel, config, notificaciones, control anti-fraude)

**MVP del panel = 6 secciones + pantalla de Suscripcion.** Labels de UI on-brand (registro publico).

1. **Primeros pasos (wizard 4 pasos, NUEVO; antes "Onboarding"):** (1) datos del local (nombre, email, logo) -> (2) primera tarjeta (sellos requeridos + premio + color) -> (3) **Cargar tarjeta para la suscripcion** (tokenizacion via SDK/Bricks de MP — NO es un "connect de cuenta"; ver seccion 10/12) o activar trial -> (4) descargar/imprimir el QR para el mostrador. Al terminar, cae en Inicio.
2. **Inicio (Panel):** reusar Dashboard.jsx (4 stat cards; grafico de 8 semanas; breakdown por categoria; preview de tarjeta; top 5 clientes). **Renombrar el card "Indice de Fidelizacion" a "Pulso semanal"** (con tooltip). Sumar **Actividad en vivo** (ultimos 5-10 sellos) y badge "sellos a revisar esta semana". **Empty states en voseo** para comercio con 0 clientes/0 sellos (ver seccion 13).
3. **Mi Tarjeta + QR:** reusar MyCard.jsx. **Implementar el upload de logo** (hoy es TODO). Corregir copy anti-abuso a **15 min**. Ajustar copy para no prometer atadura al pago ("Escaneá despues de tu compra" como convencion, no verificacion).
4. **Actividad (Actividad en vivo + anular, NUEVO):** cada sello = evento con hora, cliente y nivel de riesgo (geo rara, rafaga, dispositivo nuevo, fuera de horario). Boton **"Anular sello"** que descuenta el progreso y queda auditado. Filtros + paginacion. Es la ultima capa anti-fraude humana, **complemento, no sustituto** de las barreras automaticas (no escala revisar 200 eventos/dia a mano).
5. **Clientes:** reusar Customers.jsx. **Corregir el bug del divisor `/8` hardcodeado** (verificado en `Customers.jsx` l.148/153/206) -> usar `membership.program.stamps_required`. Empty state en voseo.
6. **Notificaciones:** reusar Notifications.jsx (toggles + ventana de lapsed + preview en voseo). Ver seccion 9.

**Pantalla de Suscripcion / Facturacion MP:** estado de suscripcion, proximo cobro, metodo de pago. Reemplazar `merchant.plan = 'Gratis'` (verificado en mock) por `{plan, subscription_status: trial|active|past_due|canceled, mp_preapproval_id, current_period_end}`.

**Auth del comercio (NUEVO, estaba sub-especificado):** Supabase Auth con email+password o magic link; recuperacion de cuenta; sesiones. RLS no cubre auth ni rate-limiting — son requisitos aparte. 2FA = roadmap.

**Parametros que el comercio NO puede tocar (anti comercio-tramposo, seccion 8.4):** cooldown, tope diario duro por device, ventana de presencia, reglas de anomalia. El comercio **solo** configura premio, N de sellos, y los toggles cosmeticos de notificaciones.

**Actividad en vivo (tecnico):** Supabase Realtime es **roadmap**; en MVP usar **polling cada 10-15s** (suficiente, menos complejidad).

**Roadmap (NO MVP):** multiples tarjetas/sucursales, roles/staff, export CSV, segmentacion avanzada, sello atado al pago MP, QR firmado/rotativo en pantalla.

---

## 8. Anti-fraude (diseno en capas; honesto sobre que protege cada una)

**Principio rector:** defensa en capas. El fraude se hace **friccionado y de bajo rendimiento**, no imposible. El sello se otorga **SIEMPRE server-side** (Edge Function); el cliente nunca lo escribe. **La defensa central contra "escaneo desde casa" es la PRUEBA DE PRESENCIA, no la criptografia del QR.** Se instrumenta y mide desde el dia uno.

### 8.1 Verdad incomoda sobre el QR estatico (corrige la contradiccion del borrador)
Un sticker QR **estatico** codifica una URL FIJA. No puede llevar un token que rote cada 60-120s. Por lo tanto **la URL base del QR es un secreto publico**: cualquiera que la fotografie y la reenvie por WhatsApp puede abrirla desde su casa, y el server le emite un token fresco al hacer GET. **Conclusion honesta: el token NO defiende contra "QR fotografiado y compartido".** Esa defensa tiene que venir de la presencia (8.2), no del token. El token corto solo evita que adivinen URLs y detecta reenvio por reuso (8.3).

### 8.2 Prueba de presencia dura (LA capa anti-fraude principal del MVP)
En el **primer sello de cada sesion / primer sello de un device nuevo en ese local**, el sello entra como `pending` (mostrado al cliente como "sumado", indistinguible) y **NO cuenta para el voucher** si se cumple cualquiera de:
- no hay permiso de geolocalizacion, o geo fuera de radio **150-300m** del local;
- IP de VPN/datacenter (ASN conocido) o geo-IP de otra ciudad;
- GPS "perfecto" sin jitter (senal de spoofing) inconsistente con la geo-IP;
- escaneo fuera del horario de apertura del local (el server conoce el horario).

El cliente real, parado en el mostrador, da permiso una vez y suma normal. El defraudador casero ve "sumado" pero **nunca completa la tarjeta**. **Cero trabajo del cajero.** Trade-off documentado: pedir ubicacion la primera vez baja un poco la conversion de activacion, pero es la palanca anti-fraude mas barata. *Nota de factibilidad (seccion 12.1):* en el primer escaneo via camara nativa la geo puede no estar disponible; por eso la presencia combina GPS (cuando hay) + IP server-side (siempre), y la geo se cachea al instalar la PWA / agregar el pass.

### 8.3 Datos del cliente = NO confiables
GPS declarado y FingerprintJS corren en el cliente y el atacante los CONTROLA y puede falsificarlos. Se cruzan SIEMPRE server-side contra senales que el atacante NO controla: **IP real (ASN/geo-IP), cadencia temporal, horario del local, consistencia geo-declarada vs geo-IP**. Reuso del mismo token desde IPs/devices distintos = senal de reenvio por WhatsApp. El motivo por el que un sello quedo `pending` **nunca se expone** al cliente (indistinguible de `valid`).

### 8.4 El comercio tramposo (NUEVA seccion; el agujero mas grande)
El incentivo del comercio es inflar "clientes activos" (para el techo del plan Free, o para parecer exitoso ante un inversor). Mitigaciones:
- **Parametros anti-fraude no configurables por el comercio** (cooldown, tope duro por device, ventana de presencia, anomalias). Solo configura premio y N.
- **Definicion de "activo" anti-inflado** para el limite Free: cuenta solo clientes con **>=2 visitas en dias distintos** Y con al menos un sello que **paso la verificacion de presencia dura**. Cuentas de un solo dia o sin presencia no cuentan para el techo.
- **Device/IP fingerprint a nivel PLATAFORMA (interno de Wafi):** si N membresias del mismo comercio comparten pocos devices/IPs (granja de auto-escaneo), baja el score del comercio y se marca en un panel interno de Wafi (no del comercio).
- **Cooldown/tope tambien por DEVICE y por IP**, no solo por cuenta: 3 cuentas en 3 telefonos del mismo dueno escaneando el mismo QR chocan entre si.
- **Regla de honestidad:** Wafi nunca publica agregados de un comercio sin filtro anti-inflado.

### 8.5 Granja de cuentas: OTP es barrera MEDIA, no Alta
Conseguir multiples numeros virtuales en AR es barato; el SMS de fallback llega igual a numeros descartables. Por eso:
- **Forzar el primer OTP por WhatsApp REAL** (SMS solo si el numero no tiene WhatsApp, lo que ya filtra muchos virtuales).
- **OTP de 6 digitos** (no 4: 4 digitos = 10.000 combinaciones, fuerza-bruteable). **Rate-limit por telefono e IP** (ej. 5 intentos, lockout), expiracion 5-10 min, **limite de reenvios** (anti toll-fraud de SMS que vacia presupuesto).
- **Rate-limit de creacion de cuentas por IP/ASN**; bloqueo de rangos ASN de datacenter/VPN en el alta.
- **Turnstile invisible** (CAPTCHA) en el endpoint de alta y en el primer escaneo por device para frenar scripts headless / proxies residenciales.

### 8.6 Tabla de capas (efectividades HONESTAS)

| # | Capa | Como | MVP | Efectividad real |
|---|------|------|-----|------------------|
| 1 | **Identidad (WhatsApp OTP real, 6 digitos, rate-limit)** | 1 cuenta = 1 numero con WhatsApp | **SI** | **Media** vs granjas con numeros virtuales (no "Alta"); friccion al casual |
| 2 | **Cooldown 15 min** por (cliente, local) **y por (device, local) y (IP, local)** | Backend, no localStorage | **SI** | Media |
| 3 | **Tope diario duro** por usuario, **device** e IP/local | Max 1-2 sellos/local/dia + tope global; no configurable por comercio | **SI** | Media-alta |
| 4 | **Token server-side** sobre URL del QR | Nonce HMAC con vida **de varios minutos** (no 60-120s, para no frustrar el alta+OTP); deteccion de reuso (mismo token N veces / desde IPs-devices distintos = reenvio) | **SI** | **Media** — evita adivinar URLs y detecta reenvio; NO defiende contra QR fotografiado por si solo |
| 5 | **Presencia dura** (geo GPS + IP/ASN + horario) | En primer sello de sesion/device: fuera de radio/sin permiso/VPN/fuera de horario -> `pending`, no cuenta para voucher | **SI (DURA, no soft)** | **Alta** vs escaneo casero (la capa principal) |
| 6 | **Velocidad/anomalias + shadow-limit** (version simple) | 2-3 reglas duras (ej. ">N sellos en X min", "mismo fp+IP+timing en N membresias") -> `pending` automatico, sin intervencion humana. Fingerprint = senal, no atestacion | **SI (simple)** | Media; sube con datos |
| 7 | **Actividad en vivo + anular** (comercio) | Panel con senal de riesgo y boton anular/bloquear | **SI** | Media (red humana; no escala sola) |
| 8 | **Sello atado al pago MP** (MOAT) | Webhook `payment.approved` de Orders API dispara el sello solo si hubo pago real | **ROADMAP** | Maxima (fraude antieconomico) |

**Stack duro del MVP:** **1+2+3+5** como barreras; **4** como anti-adivinanza/anti-reenvio; **6** shadow-limit automatico; **7** red humana. Honesto: contra el QR estatico fotografiado, la defensa real es **5 (presencia)** + 2/3, no el token.

### 8.7 Techo economico explicito del fraude (NUEVO)
Sin atadura al pago, el costo maximo del fraude **por cuenta verificada y presente es 1 premio cada N escaneos verificados** (default N=8). Es **aceptable porque el premio es un cafe**. Con presencia dura, el "farmeo lento desde casa" desaparece; solo queda "voy todos los dias y no compro", que es socialmente raro y visible para el dueno. **No se afirma que las capas 1-7 hacen el fraude imposible; lo hacen antieconomico y visible.**

### 8.8 Endurecimiento opcional subido a MVP-OPCIONAL (decision del comercio)
**QR dinamico rotativo en tablet / celular viejo del mostrador** sube de roadmap a **MVP-opcional por comercio**: es la **unica** capa que ata el escaneo a la presencia fisica real sin tocar al cajero. El **sticker estatico sigue siendo el default**, reconociendo su techo; los locales que prioricen anti-fraude sobre maxima simplicidad activan el QR dinamico. (Requiere un dispositivo en el mostrador, por eso es opcional.)

### 8.9 Postura ante falsos positivos
Permisiva en lo cosmetico, dura en lo que cuenta: `pending`/shadow-limit en vez de bloqueo visible, comercio con boton anular. En cafeterias el costo de un sello fraudulento es bajo; el de frustrar a un cliente real, alto.

---

## 9. Mensajeria y notificaciones (canales + triggers + cuales configurables)

### 9.1 Canales
- **Wallet push (Apple/Google) = canal automatico primario** cuando el cliente agrego el pass. Gratis, al lockscreen, sin abrir nada.
- **PWA (notif in-app + web push donde funcione) = cobertura para quien no agrego el pass.** En MVP-0 (seccion 13), la PWA es el canal de entrega; web push iOS es flojo, asi que el feed in-app queda como historial.
- **Email transaccional = secundario** (voucher emitido, recibo; respaldo si el pass falla). No usar email para "nuevo sello".
- **WhatsApp = fase 2** (NO MVP): solo triggers de alto valor, plantillas aprobadas por Meta, opt-in explicito, costo por mensaje (verificar tarifas AR con Meta).

### 9.2 Los 6 triggers (voseo acentuado corregido)
**Transaccionales (siempre ON):**
1. `stamp_added` — "Sumaste tu sello #N en {comercio}. Te faltan X para tu {recompensa}."
2. `card_completed` — "Completaste tu tarjeta. Tu {recompensa} te espera." *(1 exclamacion max si se usa)*
3. `voucher_expiring` — 48-72h antes: "Tu {recompensa} vence el {fecha}, **pasá** a buscarla."

**Retencion/marketing (configurables ON/OFF):**
4. `almost_complete` — "Te falta 1 sello en {comercio} para tu {recompensa}."
5. `lapsed` — "Hace {days} dias que no **pasás** por {comercio}." (ventana [7,14,30], **default 14**)
6. `birthday` — "Feliz cumple, te tenemos un regalo." (**default ON** — corregir el `enabled:false` del prototipo, verificado en mock.js l.182)

> **Correccion de voseo (defecto del borrador):** "pasa a buscarla" -> **"pasá a buscarla"**; "no pasas por" -> **"no pasás por"**. Todos los strings de notificacion son copy publica con tildes.

### 9.3 Configurable por el comercio (acotado)
ON/OFF solo de almost/lapsed/birthday; ventana de lapsed [7,14,30] default 14; el comercio personaliza **solo la oferta/recompensa**, no reescribe el mensaje (protege la voz, evita spam).

### 9.4 Guardrails anti-spam / anti-fraude
- `stamp_added` solo se dispara cuando el sello **se acredita de verdad** y **pasa presencia** (un `pending` o un re-escaneo bloqueado NO genera push — coherente con 8.2).
- Cap de **1 push de retencion** por comercio-cliente/dia, ~3-4/semana.
- `almost_complete` y `card_completed` se de-duplican por tarjeta.
- **Max 1 signo de exclamacion por push.**

---

## 10. Monetizacion y Mercado Pago (planes, precios ARS, billing, roadmap sello-pago)

**Modelo:** B2B SaaS, suscripcion mensual al **comercio**. Free es gancho de adquisicion; el revenue viene de Pro/Multi-local.

### 10.1 Estructura de planes (anclas ajustables por CEO)
| Plan | Precio (ARS 2026) | Incluye |
|------|-------------------|---------|
| **Free** (gratis para siempre, gancho) | $0 | 1 tarjeta, hasta **150 clientes activos/mes** (definicion anti-inflado: >=2 dias distintos + presencia verificada, seccion 8.4), passes con marca Wafi, anti-fraude base, metricas basicas, sin tarjeta para registrarse |
| **Pro** | **$14.900/mes** ($11.900/mes anual, ~2 meses off) | Tarjetas/clientes ilimitados, passes branded del comercio, push ilimitado, anti-fraude reforzado, metricas avanzadas, soporte WhatsApp prioritario |
| **Multi-local** | **$34.900/mes** | Todo Pro + multiples sucursales, roles/usuarios, panel consolidado, API |

Ancla: Pro ≈ 3-4 cafes. Mensaje publico (voseo): "Wafi se paga solo si un solo cliente vuelve una vez mas al mes."

### 10.2 Prueba gratis (reencuadrada sin urgencia)
- Pro con **14 dias gratis**, recomendado **con tarjeta tokenizada via MP** (MP hace un micro-cargo de validacion reembolsable de fabrica; cobra recien al dia 15). Mejor conversion trial->pago.
- Oferta de lanzamiento **reencuadrada como cupo de beta honesto** (sin escasez de presion, BRAND-VOICE l.139/297): "Estamos sumando los primeros 50 cafes a la beta; los que entran ahora tienen **Pro sin cargo 3 meses**. El cupo es limitado por nuestra capacidad de soporte." Modelar trial 14d y promo 3 meses como **preapproval_plan separados**.

### 10.3 Billing con Mercado Pago (MVP) — corregido a la realidad de MP
- **Suscripciones de MP via `/preapproval` con plan asociado.** El preapproval **EXIGE `card_token_id` + `payer_email` + `status=authorized`**: el comercio **carga y tokeniza una tarjeta** (SDK/Bricks de MP del lado cliente, PCI-safe; el PAN nunca toca el server de Wafi). **NO es un "connect de cuenta MP".** El back de Wafi crea el `preapproval_plan` una vez y el `preapproval` por comercio. **La pantalla de captura/tokenizacion de tarjeta entra al alcance IN del MVP.**
- **Dunning = comportamiento real de MP (NO inventado):** MP corre **~4 reintentos automaticos en ~10 dias**; cada fallo corre el debito un dia; tras rechazos consecutivos **MP auto-cancela el preapproval** y notifica al vendedor. **Wafi NO define su propia cadencia de reintentos:** reacciona a los webhooks de estado. Flujo: escuchar webhooks de `preapproval` (authorized/paused/cancelled) y de `authorized_payments`; al detectar fallos -> `subscription_status=past_due`; cuando MP cancela -> `canceled` + downgrade a Free **sin borrar data**. Opcional: antes de que MP cancele, Wafi puede pausar/recrear el preapproval o pedir nueva tarjeta.
- **Webhooks (especificacion):** validar **`x-signature`**, idempotencia por id de MP, y ante cada webhook hacer **GET al recurso** (`GET /preapproval/{id}`) para leer el estado canonico (no confiar solo en el payload). Mapeo deterministico de estados MP -> {trial|active|past_due|canceled}.
- **Fees MP (corregido):** **NO usar el ancla optimista de 1,49%.** Para suscripciones (debito recurrente de tarjeta) usar un **fee efectivo conservador de 4-6%**, +IVA, hasta verificar en el panel real **por provincia** (desde jul-2025 MP diferencia comisiones por Ingresos Brutos; +3% si la tarjeta es extranjera/Sucredito). **El precio de lista absorbe el fee.** Verificar el costo exacto **logueado** en el panel (la pagina de ayuda de MP bloquea acceso anonimo).
- **Unit economics (con fee conservador 6%):** Pro neto ~$14.000/mes; costos variables por comercio (Supabase, passes, push, WhatsApp/SMS OTP) estimados <$1.500/mes; **margen bruto >85% aun a 6%**. El riesgo real es churn y conversion Free->Pro, no el fee.

### 10.4 Gate de lanzamiento MP (NUEVO, prerrequisito dia uno)
Para cobrar de verdad, la **cuenta vendedor de Wafi debe estar verificada y habilitada**: KYC del titular (persona/empresa), datos fiscales (CUIT/condicion ARCA), cuenta bancaria, y **credenciales de produccion (Access Token) aprobadas**. Esto es un gate que depende del KYC de MP, no de Wafi: **estimar buffer de dias-semanas y arrancarlo ya**. Definir el **titular legal de la cuenta cobradora** (riesgo si es CUIT personal vs sociedad). El comercio-pagador NO necesita cuenta MP (paga con tarjeta).

### 10.5 Roadmap sello-atado-al-pago (terminologia corregida)
- **Fase 0 (MVP):** cliente escanea QR -> sello. Anti-fraude = capas 1-7 con presencia dura.
- **Fase 2 (post-PMF):** **Orders API + QR de cobro del comercio + webhook `payment.approved`** dispara el sello solo si hubo pago real. **Factible y suficiente para el moat.** Requiere que el **COMERCIO tenga su propia cuenta MP cobradora habilitada** (otro KYC, el del comercio), distinto del preapproval donde el comercio solo carga tarjeta. Re-introduce dependencia del medio de pago (por eso no es dia uno).
- **NO confundir con "QR interoperable"** (lectura cross-wallet entre billeteras): es una capacidad aparte con aprobacion propia (issuer flow) y **NO es necesaria** para atar el sello al pago.
- **Fase 3:** MP Point (lector) y/o monto minimo para sumar sello.

### 10.6 Reconciliacion con el material viejo
Unificar LAUNCH-PLAYBOOK y LANDING-CRO: mismo limite Free (150 activos, definicion anti-inflado), mismo precio Pro ($14.900). Reemplazar todos los "$X/mes" y metricas inventadas por numeros reales. **Marcar LAUNCH-PLAYBOOK y LANDING-CRO como SUPERSEDED por este PRD** y bajar la meta de "100 comercios/30 dias" a **beta de 10-20 cafes reales**.

---

## 11. Modelo de datos (entidades y relaciones)

**Entidades:**
- **Comercio (merchant):** `id, nombre, email, logo, plan, subscription_status(trial|active|past_due|canceled), mp_preapproval_id, current_period_end, opening_hours, lat, lng, created_at`.
- **Programa (loyalty_program):** `id, merchant_id (1:1 activo en MVP), stamps_required, reward_text, color, category_thresholds(json), active, version, created_at`. Versionar como columna; **en beta las reglas se congelan** (sin logica de versionado compleja).
- **Cliente (customer):** `id, nombre, email, birthday, auth_id, phone(verificado), created_at`. Global a Wafi.
- **Membresia (membership):** `id, customer_id, merchant_id, program_id, current_stamps, stamps_earned, stamps_redeemed, vouchers_earned, category(derivada), first_seen_at, last_visit_at`. **UNIQUE(customer_id, merchant_id).** Corazon del modelo.
- **Scan (stamp_event):** `id, membership_id, merchant_id, customer_id, program_version, created_at, source('qr'), device_id, ip, asn, geo(nullable), geo_ip(nullable), risk_level('ok'|'sospechoso'), risk_reasons[], status('valid'|'pending'|'voided'), result('ok'|'cooldown'|'cap'|'invalid_token'|'no_presence'), voided_by, voided_at`. **Tabla de eventos inmutable = fuente de verdad.** Cooldown/presencia se validan antes del insert; `pending` no cuenta para el voucher.
- **Voucher:** `id, membership_id, customer_id, merchant_id, program_version, code, reward_text, status('emitido'|'activado'|'en_uso'|'consumido'|'vencido'), activation_count, issued_at, activated_at, consumed_at, expires_at`. **UNIQUE(code).** `activation_count` habilita la regla de re-activacion acotada (5.2).
- **Notificacion / EventLog** para campanas.
- **Consentimiento (consent):** `customer_id, policy_version, accepted_at` (Ley 25.326, seccion 13).

**Relaciones:** Comercio 1—N Membresia · Cliente 1—N Membresia · Membresia 1—N Scan · Membresia 1—N Voucher · Comercio 1—1 Programa activo · Programa 1—N Voucher (via version).

**Derivacion de contadores:** `current_stamps`, `stamps_earned`, `last_visit_at` se **materializan a partir de Scans `valid`** (no `pending`, no `voided`; no se editan a mano). Esto da auditoria, permite recomputar y hace que **anular** y la presencia dura sean consistentes.

> Bugs corregidos: `stamps_earned/redeemed/current` dejan de vivir en Cliente y pasan a Membresia; el divisor `/8` hardcodeado (verificado en merchant `Customers.jsx`) pasa a `program.stamps_required`.

---

## 12. Arquitectura tecnica de alto nivel (stack)

- **Frontend (reusar prototipo):** monorepo pnpm, React 18 + Vite 5 + Tailwind 3. Apps: `merchant` (panel), `customer` (PWA instalable), `landing`.
- **Backend:** **Supabase** — Postgres + Auth + **Edge Functions** + **Row Level Security** (aislar datos por comercio). **Realtime = roadmap; en MVP polling 10-15s.**
- **Autoridad del sello:** una Edge Function otorga SIEMPRE el sello tras validar TODAS las capas (cooldown por cuenta/device/IP, presencia dura, token, anomalias). **Rate-limit y proteccion DoS del endpoint** (RLS no cubre esto).
- **Identidad:** **SMS OTP via Supabase Auth + Twilio Verify** (canal SMS ahora, WhatsApp como swap futuro del mismo Verify Service — **ADR-0013**); 6 digitos + rate-limit + limite de reenvios + Twilio Fraud Guard.
- **Pagos:** Mercado Pago `/preapproval` (suscripcion) con **tokenizacion de tarjeta via SDK/Bricks** + webhooks con `x-signature` + GET canonico (seccion 10.3). Roadmap: Orders API + webhook `payment.approved` para sello-atado-al-pago.
- **Anti-fraude:** FingerprintJS open source **tratado como senal, no atestacion**; cruce server-side con IP/ASN/geo-IP/horario; Turnstile invisible en alta y primer escaneo; token HMAC con vida de varios minutos.
- **Wallet passes (cuando entren — MVP-1):** `.pkpass` (Apple, requiere cert Pass Type ID + web service de updates) y Google Wallet objects (Issuer account + JWT firmado + push). El mismo pass muta a "recompensa lista".
- **Dominios:** registrar **wafi.com.ar** (via nic.ar) como principal de cara al mercado AR; verificar wafi.ar; **usewafi.com** confirmado libre como respaldo. **NO usar wafi.us de cara al cliente** (purgar de todos los artefactos, seccion 4.6). Email soporte -> soporte@wafi.com.ar. Migrar la landing de WordPress a Next.js/Astro.

### 12.1 Contradiccion tecnica resuelta: camara nativa vs geo
La camara nativa abre la URL sin sesion de PWA y sin contexto JS hasta que carga; pedir geo ahi dispara un prompt de OS en cada escaneo (o falla si fue negado). **Decision:** la geo se pide **una vez** (al primer escaneo / al instalar la PWA / al agregar el pass) y se **cachea**; cuando la geo no esta disponible en un escaneo, la presencia se evalua con **IP server-side** (siempre disponible) + horario. No se vende "geocerca GPS en cada escaneo" como capa que el flujo no entrega.

---

## 13. Alcance del MVP (IN / OUT) + staging + fases post-MVP

> **Realidad de partida (verificada):** el prototipo es **solo frontend** (~2.300 lineas React + mock.js): sin Supabase, sin auth, sin `.pkpass`/Google Wallet, sin MP, sin OTP. El "IN" del borrador apila **5-6 integraciones pesadas de terceros en paralelo** (Apple Wallet, Google Wallet, MP, WhatsApp BSP, RLS, anti-fraude), cada una con su propia aprobacion/certificado. **Eso no es un MVP de equipo chico; son ~4-6 meses, no 8 semanas.** Por eso se propone STAGING (decision del CEO, seccion ceo_decisions, porque toca la decision #1 de wallet passes).

### Staging recomendado
- **MVP-0 (vendible, ~6-8 semanas): PWA como la tarjeta, SIN wallet passes nativos.** Backend Supabase + auth comercio + WhatsApp/SMS OTP con rate-limit + escaneo server-side con capas **1+2+3+5** (presencia dura) + panel + cobro MP preapproval. Justificacion: el propio PRD dice que **nada critico requiere el pass**. Saca del camino critico las dos integraciones mas riesgosas (certificados Apple + Issuer Google + web service de updates) y valida modelo cliente-escanea + cobro **antes**.
- **MVP-1 (~semanas 9-14): Apple Wallet `.pkpass` + web service de updates, Google Wallet, push, email transaccional, capa 6 simple + Actividad/anular (capa 7).**

### IN (MVP, total a lo largo de MVP-0 + MVP-1)
- Tarjeta unica configurable (N ∈ {4,6,8,10,12}, default 8); 1 programa activo; reglas congeladas en beta.
- Sello por escaneo del QR con camara nativa; sello server-side; **presencia dura**.
- Voucher con codigo + timer 5 min + vencimiento ~30d; **canje por re-escaneo (default) con re-activacion acotada**.
- Categorias por sellos (cosmeticas en beta); **Pulso semanal** (Indice de Fidelizacion 0-100 = v2).
- Anti-fraude capas 1-7 (OTP real 6 dig + cooldown por cuenta/device/IP + tope diario duro + token + **presencia dura** + anomalias simples + Actividad/anular). **QR dinamico = MVP-opcional por comercio.**
- PWA instalable (tarjeta + gestion). Wallet passes Apple + Google **en MVP-1**.
- Cobro de suscripcion via MP (`preapproval` con tokenizacion de tarjeta) desde el dia uno; webhooks con `x-signature`.
- Identidad por WhatsApp OTP real.
- **Transversales que faltaban (ahora IN):** auth del comercio + recuperacion; **Politica de Privacidad + consentimiento (Ley 25.326/AAIP: comercio=responsable, Wafi=encargado, derecho de supresion/baja de cuenta)**; empty states en voseo (0 clientes/0 sellos/0 tarjetas/0 vouchers); **flujo offline/sin-wifi** ("Necesitas conexion para sumar el sello" — objeccion #1 del playbook viejo); migracion de cuenta por cambio de numero (manual via WhatsApp); **comportamiento del escaneo con comercio past_due/canceled** (recomendado: el cliente sigue sumando sellos; el dueno pierde acceso al panel); a11y minima (contraste WCAG AA en codigo de voucher/CTAs, `prefers-reduced-motion`, no depender solo de color, targets >=44px, labels en inputs OTP).

### OUT (roadmap, NO construir en MVP)
- Sello atado al pago via MP (Orders API + webhook) — moat anti-fraude definitivo.
- QR firmado/rotativo en pantalla dinamica como infra base (el QR dinamico en tablet del local es MVP-opcional, no esta).
- Multi-programa / multi-nivel / multi-sucursal; roles/staff.
- WhatsApp como canal de notificacion; web push robusto.
- **Indice de Fidelizacion 0-100**; categorias dinamicas por score; geocerca como bloqueo visible duro; segmentacion avanzada.
- **Supabase Realtime** (usar polling en MVP).
- Versionado de programa con logica compleja (columna si, logica no, en beta).
- 2FA del comercio; flujo self-service de cambio de numero.
- Expansion a otros verticales y LATAM.
- Fallback de escaner in-app (getUserMedia): despues (casi todos usan camara nativa).

### Dependencias externas con lead time (arrancar YA, en paralelo al codigo)
Apple Developer (USD 99/ano + cert Pass Type ID), Google Wallet Issuer (aprobacion), Meta Business verification + plantillas WhatsApp (dias-semanas), app + KYC de MP para credenciales de produccion (seccion 10.4). **Son burocracia secuencial de 2-4 semanas: el camino critico real, no el codigo.** Tener SMS OTP de fallback listo por si la verificacion de WhatsApp se demora.

### Secuencia de entrega propuesta (MVP-0)
(S1-2) Supabase + schema + RLS + auth comercio + WhatsApp/SMS OTP con rate-limit + consentimiento/privacidad; (S3-4) Edge Function de sello con capas 1+2+3+5 + flujo camara-nativa real (`/s/{merchant}/{branch}`) + wizard Primeros pasos; (S5-6) PWA: tarjeta, progreso, voucher + timer + canje por re-escaneo; panel reusando Dashboard/Customers/MyCard con datos reales (corregir `/8` y cooldown 1h->15min, reescribir ScanModal); (S7-8) cobro MP preapproval + webhook + dunning reactivo + pantalla Suscripcion + empty states + offline. Beta cerrada con 5-10 cafes reales.

---

## 14. Metricas (north-star + KPIs por area)

**North-star:** **clientes activos recurrentes** = clientes que suman ≥1 sello **verificado por presencia** en los ultimos 30 dias (la definicion anti-inflado de 8.4 protege la metrica de la inflacion del comercio).

**KPIs por area:**
- **Adquisicion comercio:** altas, % que completa Primeros pasos, tiempo a primer QR impreso.
- **Monetizacion:** % Free->Pro, conversion trial->pago, churn mensual Pro, MRR, **costo MP real por provincia** (verificable en panel).
- **Activacion cliente:** % de primeros escaneos que terminan en cuenta creada (OTP), **% que da permiso de ubicacion** (palanca anti-fraude), % que agrega el Wallet pass (MVP-1), sellos/cliente/semana.
- **Retencion/loyalty:** tarjetas completadas, vouchers emitidos vs consumidos, distribucion de categorias, lapsed reactivados.
- **Comercio (engagement panel):** Pulso semanal, sellos/dia, DAU/WAU del panel.
- **Anti-fraude (desde dia 1):** sellos `pending` por falta de presencia, sellos anulados, % bloqueados por cooldown/tope, cuentas por device fingerprint, **comercios marcados por granja en el panel interno de Wafi**.
- **Mensajeria:** entrega de push, opt-out, fatiga (caps gatillados).

---

## 15. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigacion |
|--------|---------|-----------|
| **Fraude del modelo cliente-escanea** | Sellos regalados | **Presencia dura (capa 5)** como defensa central + capas 1-7; techo economico explicito (1 premio cada N por cuenta presente); roadmap sello-atado-al-pago |
| **QR estatico fotografiado y reenviado por WhatsApp** | Sumar desde casa | **Presencia dura** (no el token, que es un secreto publico) + cooldown por cuenta/device/IP + tope diario; QR dinamico MVP-opcional para locales de riesgo |
| **Comercio tramposo infla "clientes activos"** | Metricas envenenadas | Parametros anti-fraude no configurables; definicion anti-inflado de "activo"; fingerprint a nivel plataforma; Wafi no publica agregados sin filtro |
| **Granja de cuentas con numeros virtuales** | Vaciar el valor del programa | OTP WhatsApp real + 6 dig + rate-limit; bloqueo ASN datacenter/VPN; Turnstile; cap de cuentas/device |
| **Script/automatizacion del endpoint** | Farmeo a escala | Tratar fp/geo como no confiables; cruce server-side IP/ASN/horario; Turnstile; shadow-limit automatico por fp+IP+timing |
| **Cuenta vendedor MP no habilitada a tiempo** | No se puede cobrar dia uno | Gate explicito (seccion 10.4): KYC + credenciales de produccion antes del piloto; buffer dias-semanas; definir titular legal |
| **Dunning/billing desincronizado con MP** | Estado de suscripcion erroneo | Reaccionar a webhooks reales de MP (no cadencia propia); `x-signature` + GET canonico + idempotencia |
| **Scope demasiado grande para equipo chico** | Lanzamiento se atrasa 4-6 meses | Staging MVP-0 (PWA-como-tarjeta) / MVP-1 (wallet); mover scoring/realtime/categorias-ricas a v2; arrancar tramites en paralelo |
| **Cumplimiento de datos (Ley 25.326/AAIP)** | Riesgo legal, bloquea comercios serios | Consentimiento en el OTP + Politica de Privacidad; comercio=responsable, Wafi=encargado; derecho de supresion; evaluar registro de base ante AAIP |
| **Cambio de numero = perdida de sellos** | Churn de cliente | Migracion manual via WhatsApp en MVP; self-service en v2 |
| **Friccion del permiso de ubicacion baja activacion** | Menos altas completadas | Pedirlo una sola vez con copy claro; medir % que lo da; fallback a IP server-side cuando no hay geo |
| **Baja conversion Free->Pro** (riesgo de negocio #1) | MRR insuficiente | Limite Free anti-inflado a 150 activos; trial con tarjeta; ancla "3 cafes" |
| **Churn del comercio** | Pierde base | Primeros pasos asistidos por WhatsApp; plan anual (cashflow + lock-in); valor visible (Actividad, Pulso) |
| **Inflacion AR erosiona precios** | Margen | Plan anual adelantado; revisar precios cada 3-6 meses; atar a ancla (% de un cafe) |
| **Fee MP mal estimado** | Unit economics optimista | Usar 4-6% conservador, no 1,49%; verificar logueado por provincia; margen sigue >85% |
| **Dependencia de Apple/Google Wallet** | Canal afectado | PWA como cobertura completa; nada critico requiere el pass |
| **Falsos positivos anti-fraude frustran reales** | Mala experiencia | Postura permisiva cosmetica: `pending`/shadow-limit en vez de bloqueo visible; comercio anula |
| **Competidor (FIU/Loyalz) cierra el gap** | Pierde diferenciacion | Vigilancia trimestral; acelerar sello-atado-al-pago como respuesta defensiva |
| **Promesas no verificables en marketing** | Riesgo legal/marca | Higiene de honestidad; prueba social honesta; sin urgencia fabricada; sin "plataforma" en copy publico |
| **Sobre-construir el MVP** | Retraso | Alcance IN/OUT estricto; staging; congelar reglas en beta |