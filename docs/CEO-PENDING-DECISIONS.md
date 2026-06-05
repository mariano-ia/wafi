# Decisiones pendientes del CEO + discrepancias resueltas

> Generado por el equipo (workflow de definición de producto, 2026-06-04). Material para la reunión semanal.


## Decisiones que requieren al CEO (5)


### 1. Staging del MVP: native wallet passes en el dia uno o en MVP-1 (toca tu decision #1)

Opciones:
- A) MVP unico tal cual la decision #1: PWA + Apple Wallet + Google Wallet nativos desde el lanzamiento, asumiendo ~4-6 meses por las 5-6 integraciones pesadas y certificados Apple/Google en el camino critico.
- B) Staging MVP-0 (PWA como la tarjeta, sin wallet nativo, vendible en ~6-8 semanas, valida cliente-escanea + cobro MP) y MVP-1 (Apple+Google Wallet, semanas 9-14). El propio PRD ya establece que nada critico requiere el pass.
- C) Hibrido: MVP-0 con solo UNO de los dos wallets (el mas barato de aprobar, probablemente Google) y el otro en MVP-1.

**Recomendación del equipo:** B. El staging no contradice la decision #1 (los wallet passes siguen siendo core del producto), solo difiere su entrega para sacar los certificados Apple/Google del camino critico y validar el modelo cliente-escanea + el cobro por Mercado Pago antes de invertir en la parte mas burocratica. Reduce el riesgo de un lanzamiento de 4-6 meses a uno de 6-8 semanas. Si preferis honrar la decision #1 al pie de la letra, A es viable pero hay que aceptar el calendario y arrancar HOY los tramites de Apple Developer y Google Wallet Issuer.


### 2. QR dinamico rotativo en tablet del mostrador: default, opcional o roadmap

Opciones:
- A) Mantenerlo en roadmap (como el borrador original): el sticker estatico es el unico modo en el MVP.
- B) Subirlo a MVP-opcional por comercio: sticker estatico es el default, pero los locales que prioricen anti-fraude pueden activar el QR dinamico en una tablet/celular viejo (es la unica capa que ata el escaneo a la presencia fisica sin tocar al cajero).
- C) Hacerlo el default para todos.

**Recomendación del equipo:** B. Es la unica capa que de verdad cierra el agujero del 'QR fotografiado y reenviado por WhatsApp' sin trabajo del cajero, pero agrega un dispositivo en el mostrador, por eso no debe ser obligatorio. C friccionaria a los cafes mas chicos (que no quieren poner una tablet). La presencia dura (geo+IP) ya cubre el caso base; el QR dinamico es el endurecimiento para quien lo quiera.


### 3. Permiso de geolocalizacion obligatorio en el primer sello (trade-off anti-fraude vs conversion de activacion)

Opciones:
- A) Pedir ubicacion una vez en el primer sello y usarla como presencia dura (sin permiso/fuera de radio -> sello pending que no cuenta para el voucher). Baja un poco la conversion de alta pero es la palanca anti-fraude mas barata.
- B) No pedir geo y depender solo de IP server-side + horario (menos friccion, defensa de presencia mas debil; IP de barrio es menos precisa que GPS).
- C) Pedir geo pero NO bloquear (solo marcar sospechoso) — equivale a la geocerca soft del borrador original, que la revision de fraude demostro que es cero proteccion real.

**Recomendación del equipo:** A. Es el corazon de la defensa anti-fraude del MVP: sin presencia dura, el modelo cliente-escanea con sticker estatico es indefendible contra el escaneo casero. El costo (un prompt de permiso una vez) es bajo y se mide como KPI. C esta descartada por la revision adversarial. Decision tuya por el trade-off de conversion.


### 4. Titular legal de la cuenta cobradora de Mercado Pago (gate de lanzamiento)

Opciones:
- A) CUIT personal del CEO (mas rapido de habilitar, pero mezcla patrimonio personal con el del negocio).
- B) Sociedad/empresa (mas prolijo y separa responsabilidad, pero requiere constituir la sociedad antes y puede demorar el KYC).
- C) Monotributo a nombre del CEO como puente hasta constituir la sociedad.

**Recomendación del equipo:** No tengo datos de tu situacion fiscal/societaria para recomendar con certeza, asi que lo dejo como decision tuya con asesoramiento contable. Lo critico para el PRD es que ESTE gate (KYC + credenciales de produccion de MP) se resuelva ANTES del piloto, porque sin cuenta habilitada no se puede cobrar el dia uno. Recomendacion operativa: arrancar el tramite ya con la opcion que tu contador valide como mas rapida sin comprometer la prolijidad.


### 5. Oferta de lanzamiento: 14 dias de trial vs 3 meses gratis para los primeros 50

Opciones:
- A) Solo trial de 14 dias con tarjeta tokenizada (cobra al dia 15). Conversion mas alta, menos regalado.
- B) Solo promo 'Pro gratis 3 meses, primeros 50 cafes' (reencuadrada como cupo de beta honesto, sin urgencia fabricada). Mas atractivo para sumar beta-testers, mas revenue diferido.
- C) Ambas como preapproval_plan separados: la promo de 3 meses para el cupo de beta inicial, y el trial de 14 dias como oferta estandar despues.

**Recomendación del equipo:** C. La promo de 3 meses te consigue los primeros beta-testers reales (que necesitas para data y testimonios honestos) y el trial de 14 dias es la oferta sostenible despues. Ambas son tecnicamente posibles con free_trial de MP; hay que validarlas en sandbox y comunicar el micro-cargo de validacion reembolsable. Importante de marca: la promo se comunica como cupo limitado por capacidad de soporte, NUNCA como 'ultimas horas' o escasez de presion.


## Discrepancias resueltas (16)


**1. Contradiccion central de la capa 4: el borrador decia a la vez que el QR es un sticker ESTATICO y que el server emite un token HMAC rotativo de 60-120s que defiende contra 'QR fotografiado y reenviado por WhatsApp'. Un sticker estatico codifica una URL fija, asi que el token no puede rotar ni autenticar presencia; la URL base es un secreto publico.**  
→ Aceptado y reescrito (seccion 8.1). El PRD ahora reconoce que la URL del QR es un secreto publico y que el token NO defiende contra reenvio. La defensa central pasa a ser PRUEBA DE PRESENCIA (capa 5). La tabla baja la capa 4 de 'Alta' a 'Media' (solo evita adivinar URLs y detecta reenvio por reuso). Ademas el token corto de 60-120s se alarga a varios minutos, porque la expiracion corta penalizaba al cliente real (alta+OTP) y no al atacante (recarga la URL).


**2. Geocerca 'soft/senal, no bloqueante' = cero proteccion real: el sello se acreditaba igual y el cliente podia hasta negar el permiso de geo. La red humana (feed+anular) no escala.**  
→ Aceptado. La geocerca pasa a PRESENCIA DURA (capa 5, seccion 8.2): en el primer sello de sesion/device, sin permiso/fuera de radio/IP de VPN/fuera de horario -> el sello entra como 'pending' y NO cuenta para el voucher (reusa el shadow-limit). El defraudador casero ve 'sumado' pero nunca completa. Cero trabajo del cajero. Se resuelve la contradiccion tecnica camara-nativa-vs-geo (seccion 12.1): la geo se pide una vez y se cachea; cuando no hay geo, se usa IP server-side.


**3. El comercio tramposo casi no estaba contemplado: podia auto-escanearse con N telefonos para inflar 'clientes activos', y los parametros anti-fraude (cooldown, tope) eran configurables por el comercio. Las metricas agregadas quedaban envenenadas.**  
→ Aceptado, nueva seccion 8.4. Parametros anti-fraude NO configurables por el comercio (solo configura premio y N). Definicion anti-inflado de 'activo' para el limite Free (>=2 dias distintos + presencia verificada). Device/IP fingerprint a nivel plataforma para detectar granjas (panel interno de Wafi). Cooldown/tope tambien por device e IP. Wafi nunca publica agregados sin filtro anti-inflado.


**4. Hueco de canje multiple: el borrador hacia el voucher 're-activable infinito' al vencer el timer, y la confirmacion del comercio era opcional. En cafes sin confirmacion, el cliente podia llevarse el premio varias veces.**  
→ Aceptado, seccion 5.2. El re-escaneo del QR en modo canje pasa a ser el camino DEFAULT (cierra server-side con prueba de presencia, sin cajero). Re-activacion acotada a 1 ante vencimiento accidental, luego cierra. Voucher activado >2 veces se loggea y marca sospechoso. Nuevo estado 'en_uso' y campo activation_count.


**5. OTP de 4-6 digitos sin rate-limit es fuerza-bruteable, y WhatsApp OTP no es 'Alta vs granjas' porque los numeros virtuales reciben el SMS de fallback.**  
→ Aceptado (seccion 8.5). OTP de 6 digitos, rate-limit por telefono e IP, limite de reenvios (anti toll-fraud), forzar WhatsApp REAL (SMS solo si el numero no tiene WhatsApp), bloqueo de ASN de datacenter/VPN, Turnstile invisible. La tabla baja la capa 1 de 'Alta' a 'Media' contra granjas.


**6. FingerprintJS open-source corre en el cliente y el atacante controla su salida; el borrador lo trataba como senal dura. El endpoint es scriptable con numeros/IPs/GPS rotados.**  
→ Aceptado (seccion 8.3). Fingerprint y GPS se tratan como datos NO confiables; se cruzan siempre server-side con IP real/ASN/geo-IP/cadencia/horario. GPS perfecto sin jitter = senal de spoofing. Turnstile + rate-limit contra scripts headless. Anomalia dura por fp+IP+timing en N membresias -> shadow-limit automatico.


**7. Dunning inventado ('3 reintentos en 7 dias') que no coincide con el comportamiento real de MP, que corre ~4 reintentos en ~10 dias y auto-cancela el preapproval.**  
→ Aceptado (seccion 10.3). Wafi NO define cadencia propia: reacciona a los webhooks reales de MP (preapproval authorized/paused/cancelled + authorized_payments), mapea a past_due/canceled y degrada a Free sin borrar data cuando MP cancela.


**8. 'Conectar Mercado Pago' en el onboarding era enganoso: el preapproval EXIGE tokenizar una tarjeta (card_token_id + status=authorized), no es un connect de cuenta.**  
→ Aceptado. El paso 3 del wizard se renombra a 'Cargar tarjeta para la suscripcion' e implementa tokenizacion via SDK/Bricks de MP (PCI-safe, PAN nunca toca el server de Wafi). La pantalla de captura de tarjeta entra al alcance IN del MVP (secciones 7, 10.3, 12).


**9. Faltaba el gate de cuenta vendedor de Wafi verificada + credenciales de produccion (KYC, datos fiscales ARCA, cuenta bancaria) como prerrequisito de dia uno.**  
→ Aceptado, nueva seccion 10.4 y riesgo en seccion 15. Gate explicito con buffer de dias-semanas, definicion del titular legal cobrador (escalado a ceo_decisions). El comercio-pagador no necesita cuenta MP.


**10. Ancla de fee MP de 1,49% irreal para suscripciones; la realidad es 4-6% efectivo y varia por provincia (Ingresos Brutos desde jul-2025, +3% tarjetas extranjeras).**  
→ Aceptado (seccion 10.3). Se quita el 1,49%; unit economics se recalcula con 4-6% conservador. Margen sigue >85%. Se indica verificar el costo exacto logueado en el panel de MP por provincia.


**11. Confusion entre 'Orders API' y 'QR interoperable' en el roadmap del sello-atado-al-pago.**  
→ Aceptado (seccion 10.5). Se separan: Orders API + QR de cobro + webhook payment.approved = factible y suficiente para el moat (requiere cuenta MP cobradora del COMERCIO, otro KYC). 'QR interoperable' (lectura cross-wallet) = capacidad aparte con aprobacion propia, NO necesaria.


**12. Webhooks de MP tratados como 'webhook notifica' generico, sin validacion de firma ni reconciliacion.**  
→ Aceptado (seccion 10.3). Validar x-signature, idempotencia por id de MP, GET al recurso para estado canonico, mapeo deterministico de estados a {trial|active|past_due|canceled}.


**13. Scope del MVP demasiado grande para equipo chico: 5-6 integraciones de terceros pesadas en paralelo, ~4-6 meses, no 8 semanas.**  
→ Aceptado parcialmente con escalado al CEO. Se propone staging MVP-0 (PWA como tarjeta, sin wallet nativo, 6-8 semanas) / MVP-1 (Apple+Google Wallet). Como toca la decision #1 del CEO (wallet passes core), se deja como ceo_decision con recomendacion B. Se mueven a v2: Indice de Fidelizacion 0-100, categorias ricas, capa 6 completa, Supabase Realtime (polling en MVP), versionado complejo.


**14. Faltaban transversales criticos: cumplimiento de datos (Ley 25.326/AAIP), auth del comercio, rate-limit del OTP, empty states, flujo offline, migracion por cambio de numero, comportamiento con comercio past_due, a11y.**  
→ Aceptado e incorporado al IN del MVP (seccion 13). Privacidad + consentimiento en el OTP (comercio=responsable, Wafi=encargado, derecho de supresion); auth Supabase + recuperacion; OTP 6 dig + rate-limit; empty states en voseo; flujo offline ('necesitas conexion'); migracion manual por cambio de numero; escaneo sigue sumando si el comercio esta canceled; a11y minima (AA, prefers-reduced-motion, no-solo-color, targets 44px).


**15. Contradiccion 'reusar ScanModal/Customers tal cual': el prototipo tiene cooldown de 1 HORA hardcodeado, merchant 'Cafe Roma' hardcodeado, divisor /8 hardcodeado y birthday enabled:false.**  
→ Aceptado y verificado en codigo. ScanModal se REESCRIBE (no reusa): pasa a pantalla de resultado; cooldown 1h->15min. Customers.jsx: /8 -> program.stamps_required. Birthday default ON. mock 'Cafe Roma' se descarta. LAUNCH-PLAYBOOK y LANDING-CRO se marcan SUPERSEDED; meta baja a 10-20 cafes de beta.


**16. Violacion de BRAND-VOICE: 'plataforma' (palabra vetada l.195) usada como mensaje central; 'urgencia' explicita en la oferta (vetada l.139/297); voseo sin acentos en el positioning ('haces/Cobras/integras/pagas'); jerga en labels de UI; wafi.us heredado; ejemplos multi-vertical; acentos faltantes en notificaciones.**  
→ Aceptado integramente (seccion 4 y 9). Dos registros (interno tecnico vs publico). 'Plataforma' fuera del copy publico; frase ancla -> 'sin sistema detras'. Oferta reencuadrada como cupo de beta honesto, sin urgencia. Copy de ejemplo corregida a voseo acentuado (hacés/Cobrás/integrás/pagás; pasá/pasás). Labels: 'Primeros pasos', 'Panel', 'Actividad en vivo' (mantiene 'Pulso semanal'). wafi.us purgado a wafi.com.ar. Tarea de reescribir samples multi-vertical a cafeterias. Regla de 1 exclamacion por push + lint de tildes.
