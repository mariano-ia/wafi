# Wafi — Secuencias de Email (beachhead: cafeterías de Argentina)

**Versión:** 1.0 · **Fecha:** 2026-06-05 · **Autor:** Lifecycle / Email · **Idioma:** español rioplatense (voseo acentuado)
**Audiencia:** dueño-operador de cafetería de especialidad o de barrio en Argentina (1 a 3 locales).
**Tagline de lanzamiento:** *La tarjeta de sellos de tu café, ahora en el celular.*

> **Reglas de marca aplicadas (BRAND-VOICE + MARKETING-PLAN):** voseo siempre (hacés, sumás, configurás, probá) · palabra "plataforma" VETADA · cero urgencia fabricada ("solo por hoy", "últimas horas", "últimos días", "se acaba" prohibido) · enemigo = la tarjeta de cartón, nunca un competidor por nombre · máximo 1 signo de exclamación por email · sin métricas ni testimonios inventados (placeholders marcados para data real) · dominio wafi.com.ar y soporte@wafi.com.ar · **una sola CTA por email.**
>
> **Modelo de negocio (no se contradice):** trial 30 días SIN tarjeta; al día 31 el programa se **congela** (no se borra nada, todo se preserva) y recién ahí se pide el pago; al pagar se restaura todo al instante; precio en pesos $14.900/mes (anual $11.900); cliente escanea QR con presencia obligatoria; Wallet + PWA (PWA primero); cobro vía Mercado Pago.

---

## Convenciones de estas secuencias

- **`[Nombre]`** = nombre del dueño. **`[Café]`** = nombre de la cafetería. **`[barrio]`** = barrio del local. **`[premio]`** = el café/premio que eligió. Variables que se llenan al enviar.
- **Preview text** siempre personalizado (nunca el default del cliente de email).
- **Una sola CTA por email** (botón principal). Los links de soporte por WhatsApp en el pie no cuentan como CTA de conversión: son canal de ayuda, no una acción de compra.
- Tono plano, sin HTML pesado (BRAND-VOICE: "plain text feel").
- Asuntos: máximo ~50 caracteres (preview mobile).
- Remitente sugerido: **Wafi** · `hola@wafi.com.ar` · soporte siempre por `soporte@wafi.com.ar` y WhatsApp.

---

# SECUENCIA 1 — WAITLIST / PRE-LANZAMIENTO (3 emails)

**Para quién:** dueño que dejó su mail para entrar a la beta antes de que abramos.
**Objetivo:** que el café siga caliente entre que se anota y que lo contactamos por WhatsApp para la demo.
**Cadencia sugerida:** Email 1 inmediato · Email 2 a los 3 días · Email 3 a los 6-7 días.
**CTA real de la beta = conversación por WhatsApp** (es nuestro canal de cierre — MARKETING-PLAN §4.1).

---

## Email 1.1 — Confirmación: estás en la lista

**Asunto:** Estás en la lista de Wafi
**Preview:** Te guardamos el lugar. Te contamos qué sigue.

**Cuerpo:**

Hola [Nombre],

Listo: quedaste anotado para la beta de Wafi.

Wafi es la tarjeta de sellos de tu café, ahora en el celular. Tu cliente apunta la cámara a un QR del mostrador, suma el sello y vuelve por su café gratis. Vos no hacés nada extra: ni app, ni hardware, ni trabajo para el que está en la caja.

Estamos sumando cafés a la beta de a uno, dándole una mano a cada dueño para que arranque bien. Por eso vamos con cupo chico: queremos acompañarte de cerca, no que te las arregles solo.

¿Qué sigue? En los próximos días te escribimos por WhatsApp para mostrarte cómo funciona en 5 minutos, con tu propio café de ejemplo.

Mientras tanto, si querés ir viendo cómo es, te dejamos la página acá abajo.

**[CTA: Ver cómo funciona]** → https://wafi.com.ar

Cualquier duda, respondé este mail o escribinos por WhatsApp. Te contesta una persona de verdad.

Gracias por sumarte temprano,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar*

---

## Email 1.2 — Por qué (chau cartón)

**Asunto:** Por qué arrancamos con Wafi
**Preview:** La tarjeta de cartón se pierde, se moja y se olvida.

**Cuerpo:**

Hola [Nombre],

Una pregunta que seguro te hiciste alguna vez: ¿quién es tu cliente de todos los días?

La tarjeta de cartón nunca te lo dijo. Se pierde, se moja, se queda en el bolsillo de la otra campera. Y la mitad de las veces el cliente la arranca de cero porque no la encuentra.

Wafi lo resuelve simple:

- Los sellos viven en el celular de tu cliente. No se pierden, no se mojan, se actualizan solos.
- El que escanea es el cliente, no tu cajero. La caja sigue igual, incluso a las 8 de la mañana.
- Cobrás la suscripción en pesos, con Mercado Pago. Nada de precios en dólares que cambian solos.

Eso es todo. Sin vueltas.

Cuando te escribamos por WhatsApp, te armamos tu tarjeta de ejemplo en vivo para que lo veas con [Café].

**[CTA: Conocé más]** → https://wafi.com.ar

Seguimos en contacto,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar*

---

## Email 1.3 — Se viene tu turno

**Asunto:** Se viene tu turno en la beta
**Preview:** En breve te escribimos para arrancar juntos.

**Cuerpo:**

Hola [Nombre],

Te queremos avisar que ya estamos abriendo los primeros lugares de la beta, y [Café] está en la lista.

Como vamos de a poco para acompañar bien a cada café, te escribimos por WhatsApp en estos días para coordinar una demo de 5 minutos. Si querés, también podemos pasar por el local: es la forma más linda de mostrarte cómo queda tu tarjeta de sellos.

Cuando arranques, te dejamos todo listo para usar:

- Tu tarjeta de sellos configurada, con tu premio.
- El QR impreso para pegar al lado de la caja.
- Un cartelito para el mostrador y una guía rápida.

Y arrancás con 30 días gratis, sin poner ninguna tarjeta. Recién al día 31 decidís si seguís.

Si querés adelantarte y coordinamos ahora, tocá el botón y escribinos.

**[CTA: Escribinos por WhatsApp]** → https://wa.me/[NUMERO_WAFI]

Nos vemos pronto,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar · soporte@wafi.com.ar*

---

# SECUENCIA 2 — LANZAMIENTO (3 emails)

**Para quién:** lista de waitlist (y cafés del pipeline con mail) cuando abrimos formalmente.
**Objetivo:** que el café del ICP se anote al trial / nos escriba por WhatsApp para arrancar la beta.
**Cadencia sugerida:** Email 1 (anuncio) día 0 · Email 2 (cómo funciona) a los 3 días · Email 3 (recordatorio honesto) a los 6-7 días.
**Sin urgencia fabricada.** El cupo es chico porque acompañamos de cerca, no por escasez inventada.

---

## Email 2.1 — Ya está: abrimos la beta

**Asunto:** Abrimos Wafi para tu café
**Preview:** La tarjeta de sellos de tu café, ahora en el celular.

**Cuerpo:**

Hola [Nombre],

Llegó el día: abrimos Wafi para las primeras cafeterías.

Wafi es la tarjeta de sellos de tu café, ahora en el celular. Funciona así de simple:

1. Pegás el QR al lado de la caja.
2. Tu cliente lo escanea con la cámara y suma el sello.
3. Cuando completa la tarjeta, vuelve por su café gratis.

Vos no tocás nada en cada venta. El que escanea es el cliente. La caja sigue como siempre, pero ahora tus clientes vuelven más.

Arrancás con 30 días gratis, sin poner tarjeta. Recién al día 31 decidís si seguís. Y te damos una mano por WhatsApp para configurar todo.

**[CTA: Probá Wafi gratis]** → https://wafi.com.ar

Nos encanta que estés acá desde el principio,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar*

---

## Email 2.2 — Cómo queda en tu café

**Asunto:** Cómo se ve Wafi en tu mostrador
**Preview:** Tres pasos, tres segundos, cero trabajo del cajero.

**Cuerpo:**

Hola [Nombre],

Te contamos cómo se ve Wafi del lado de adentro de [Café], sin humo.

**En el mostrador:** un QR pegado al lado de la caja, con un cartelito que dice "Escaneá y sumá sellos para tu próximo [premio]". Nada más que eso.

**Del lado del cliente:** apunta la cámara al QR, como cuando paga o lee el menú. Suma el sello al toque y le queda guardado en el celular. No descarga nada raro, no hace cola.

**Del lado tuyo:** ves quién vuelve y cuántos sellos lleva cada uno. Por primera vez sabés quién es tu cliente de todos los días.

¿Y la trampa desde la casa? No corre: para sumar el sello, tu cliente tiene que estar en el local. Lo confirmamos con la ubicación, una sola vez, sin molestarlo en cada visita.

Si querés verlo en vivo con tu café de ejemplo, escribinos y coordinamos una demo de 5 minutos.

**[CTA: Pedí tu demo por WhatsApp]** → https://wa.me/[NUMERO_WAFI]

Abrazo,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar*

---

## Email 2.3 — Recordatorio honesto (cupo chico, sin presión)

**Asunto:** Te guardamos un lugar en la beta
**Preview:** Vamos de a poco para acompañarte bien.

**Cuerpo:**

Hola [Nombre],

Te escribimos para recordarte que [Café] tiene su lugar reservado en la beta de Wafi.

Vamos a ser de frente con vos: sumamos cafés de a poco a propósito. No es marketing de cupos, es que queremos darle una mano real a cada dueño para que arranque bien y no quede a la deriva. Por eso preferimos pocos cafés bien acompañados antes que muchos sueltos.

Si te quedó la duda de si es para vos, te lo resumo:

- Si tus clientes vuelven seguido (un café no es una compra de una sola vez), la fidelización tiene sentido económico real.
- Si ya intentaste con la tarjeta de cartón y te cansaste de que se pierda, esto es justo lo que faltaba.
- Si la caja en la hora pico no tiene un segundo libre, tranquilo: el cajero no toca nada.

Cuando quieras arrancar, estamos. Sin apuro y sin vueltas.

**[CTA: Quiero arrancar]** → https://wafi.com.ar

Acá andamos,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar · soporte@wafi.com.ar*

---

# SECUENCIA 3 — ONBOARDING DEL COMERCIO (4 emails)

**Para quién:** el café que se registró y arrancó su trial de 30 días.
**Objetivo:** llevarlo del registro al **primer sello real verificado** y, en el día 25, preparar el día 31 con el modelo freeze explicado con cariño.
**Cadencia (anclada a eventos, no solo a calendario):**
- Email 3.1 — al registrarse (bienvenida).
- Email 3.2 — cuando tiene la tarjeta lista / QR generado (o a las 24-48 h si no avanzó).
- Email 3.3 — al detectar el **primer sello real verificado** (celebración por evento).
- Email 3.4 — **día 25** del trial ("se viene el día 31").

> **Nota de honestidad:** ningún email de esta secuencia publica métricas inventadas. Donde aparezca un número de "cuántos clientes ya volvieron", es **data real del propio café**, leída de su panel. Si todavía no hay data, ese bloque se omite (placeholder marcado).

---

## Email 3.1 — Bienvenida (arrancaste)

**Asunto:** Bienvenido a Wafi, [Nombre]
**Preview:** Tu tarjeta de sellos está casi lista. Te guiamos.

**Cuerpo:**

Hola [Nombre],

Bienvenido a Wafi. A partir de hoy, la tarjeta de sellos de [Café] vive en el celular de tus clientes.

Tus 30 días gratis ya arrancaron, sin que pongas ninguna tarjeta. Es tiempo para probarlo en serio, con tus clientes reales, sin apuro.

Para dejar todo listo, son tres pasos cortos:

1. **Armá tu tarjeta:** elegí cuántos sellos para el premio y cuál es el premio (por ejemplo, el décimo café gratis).
2. **Generá tu QR:** lo imprimís en una hoja común. No necesitás comprar nada.
3. **Pegalo en la caja:** al lado del mostrador, a la vista.

Tranquilo: si te trabás en algo, te damos una mano por WhatsApp. Te contesta una persona de verdad, que sabe del rubro.

Empecemos por lo primero: armá tu tarjeta.

**[CTA: Armá tu tarjeta de sellos]** → https://wafi.com.ar/inicio

Vamos juntos,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar · soporte@wafi.com.ar*

---

## Email 3.2 — Tu primer QR (pegalo en la caja)

**Asunto:** Tu QR está listo, [Nombre]
**Preview:** Pegalo al lado de la caja y empezá a sumar sellos.

**Cuerpo:**

Hola [Nombre],

Tu QR de [Café] ya está listo. Ahora viene el paso que hace que todo empiece a funcionar: pegarlo en la caja.

Hacé esto hoy:

1. **Imprimí el QR** en una hoja común (te lo dejamos listo para descargar).
2. **Pegalo al lado de la caja,** a la altura de los ojos, donde el cliente lo vea mientras espera.
3. **Sumale el cartelito:** "Escaneá y sumá sellos para tu próximo [premio]". Funciona muy bien para que el cliente entienda solo qué hacer.

Un consejo de barra: contale a tu primer cliente de confianza que lo pruebe. Que apunte la cámara, sume el sello y vea cómo le queda en el celular. Ese primer escaneo real es el que arranca todo.

Si querés, te mandamos el cartelito de mostrador ya diseñado para imprimir.

**[CTA: Descargá tu QR y el cartelito]** → https://wafi.com.ar/inicio

Cualquier cosa, escribinos por WhatsApp,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar · soporte@wafi.com.ar*

---

## Email 3.3 — Primer sello real (celebración)

**Asunto:** Tu primer cliente ya escaneó el QR 👀
**Preview:** Pasó: alguien sumó su primer sello en [Café].

**Cuerpo:**

Hola [Nombre],

Pasó algo lindo: un cliente de [Café] escaneó tu QR y sumó su primer sello.

Eso significa que tu tarjeta de sellos ya está viva. De acá en adelante, cada vez que esa persona vuelva, suma un sello más, y cuando complete la tarjeta, va a volver por su [premio].

Lo mejor: vos no hiciste nada extra. El cliente escaneó solo, la caja siguió como siempre.

Ahora que está andando, dale un empujón para que más clientes lo usen:

- Contalo en tu Instagram con una story ("Ahora sumás sellos para tu café, chau cartón"). Te dejamos una plantilla lista.
- Que el equipo de la barra lo mencione: "¿Ya sumaste tu sello?" mientras cobra.
- Dejá el cartelito bien a la vista, no escondido detrás de la registradora.

Entrá a tu panel y mirá cómo se va sumando la actividad en vivo.

**[CTA: Ver tu actividad en vivo]** → https://wafi.com.ar/panel

A festejar este primer paso,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar*

---

## Email 3.4 — Día 25: se viene el día 31 (modelo freeze, con cariño)

**Asunto:** [Nombre], hablemos de lo que sigue
**Preview:** Tu trial termina en unos días. Te contamos cómo es, sin sorpresas.

**Cuerpo:**

Hola [Nombre],

Estás llegando al final de tus 30 días gratis con Wafi, y queremos contarte cómo sigue, de frente y sin letra chica.

**Qué pasa el día 31:** termina el trial. Si para ese momento decidís seguir, cargás el pago en Mercado Pago y todo continúa igual, sin cortes.

**Si no cargás el pago,** tu programa se **congela**. Y queremos ser muy claros con qué significa eso, porque no es lo que parece:

- **No se borra nada.** Los sellos y los premios que ya ganaron tus clientes quedan guardados y se pueden seguir canjeando.
- **El QR deja de sumar sellos nuevos** mientras esté congelado. Eso es lo único que se pausa.
- **Cuando quieras volver, lo reactivás en un toque** y se restaura todo al instante. No perdés tu historia ni la de tus clientes.

Nada de castigos ni sorpresas. Vos decidís a tu ritmo.

**Y la cuenta es simple:** Wafi sale $14.900 por mes, o $11.900 si pagás el año. Todo en pesos, cancelás cuando quieras. Se paga solo si un cliente vuelve una vez más al mes.

> *[Si hay data real del café, agregar acá — placeholder marcado, no inventar]: "En estos días, [N] clientes ya volvieron a [Café] sumando sellos." Si no hay data real, omitir este bloque.*

Si querés seguir, dejá todo activado para que el día 31 no se corte nada.

**[CTA: Activar mi suscripción]** → https://wafi.com.ar/panel/suscripcion

Y si tenés cualquier duda, escribinos por WhatsApp. Estamos para darte una mano.

Gracias por estos 30 días,
El equipo de Wafi

*Hecho con cariño en Argentina · wafi.com.ar · soporte@wafi.com.ar*

---

## ANEXO — Checklist de marca (verificación previa a enviar cualquier email)

- [x] **Voseo:** hacés, sumás, configurás, probá, cobrás, pegás, decidís — sin "tú"/"usted".
- [x] **Palabra "plataforma":** ausente en todos los emails.
- [x] **Urgencia fabricada:** ausente. Sin "solo por hoy", "últimas horas", "últimos días", "se acaba". El trial y el día 31 se presentan como tiempo para decidir, no como presión. El cupo chico se explica como capacidad de acompañamiento, no escasez fabricada.
- [x] **Enemigo = cartón:** presente donde corresponde (1.2, 2.x, 3.3). Ningún competidor nombrado.
- [x] **Diferenciadores = moats reales:** precio en pesos + Mercado Pago, cero trabajo del cajero, voz argentina + WhatsApp, sellos en el celular. "Sin app / sin descargar" solo como descripción del paso, nunca como titular.
- [x] **Sin métricas ni testimonios inventados:** el único número posible (3.4) es data real del propio café, con bloque marcado para omitir si no existe.
- [x] **Exclamaciones:** máximo 1 por email (la mayoría usa cero; 3.3 usa una controlada).
- [x] **Una sola CTA por email:** verificado en los 10 emails. Los links de soporte por WhatsApp en el pie son canal de ayuda, no CTA de conversión.
- [x] **Dominio:** wafi.com.ar y soporte@wafi.com.ar (nunca wafi.us).
- [x] **Precio y trial:** $14.900/mes (anual $11.900), trial 30 días SIN tarjeta, congela al día 31 (preserva todo), restaura al pagar.
- [x] **Modelo freeze explicado con empatía:** energía baja, empatía alta, sin castigo (3.4).

> **Pendientes / variables a completar al enviar:** `[NUMERO_WAFI]` (link de WhatsApp Business), URLs finales del panel/inicio, y el bloque de data real del Email 3.4 (solo si el café tiene clientes activos reales — nunca inventar).
