# Guia de autorizacion y setup — Apple Wallet + Google Wallet (Wafi MVP-1)

**Version:** 1.0 · **Fecha:** 2026-06-05 · **Autor:** CTO/Ops · **Para:** CEO (Mariano)
**Idioma:** espanol rioplatense · **Alcance:** SETUP de credenciales de cuenta, NO review de app.

> **Lee esto antes que nada.** Esto NO es un "app review" (no hay app nativa en la tienda — ver ADR-0001: la tarjeta vive en Wallet + PWA, sin app que descargar). Lo que vas a tramitar aca es **acceso de emisor de pases/credenciales**: un certificado en Apple y una cuenta de emisor (Issuer) en Google. Nadie revisa una app. Apple te da el certificado casi al toque; **Google te tiene que aprobar el Issuer y eso es el lead time real** — por eso arrancas ESE primero (ver seccion "Que arrancar YA").
>
> **Encaje con el staging del PRD (seccion 13):** los wallet passes son **MVP-1** (semanas 9-14), NO MVP-0. En MVP-0 la PWA ES la tarjeta y nada critico (sumar sello, canjear) necesita el pass. Pero **los tramites de cuenta tienen lead time burocratico**, asi que conviene tenerlos resueltos ANTES de llegar a la semana 9. Tramitar credencial no obliga a construir nada todavia: es destrabar el camino critico (PRD 13, "Dependencias externas con lead time").

---

## 0. TL;DR para el CEO (lo minimo que tenes que decidir y arrancar hoy)

| # | Que | Donde | Costo | Lead time | Arranca |
|---|-----|-------|-------|-----------|---------|
| 1 | **Google Wallet Issuer account + aprobacion** | Google Pay & Wallet Console | **Gratis** | **DIAS A SEMANAS (requiere aprobacion de Google)** | **HOY — es el cuello de botella** |
| 2 | **Apple Developer Program** (membresia) | developer.apple.com | **USD 99/ano** | Horas a ~2 dias (verificacion de identidad/pago) | **Esta semana** |
| 3 | **Apple Pass Type ID + certificado** | Apple Developer (Identifiers + Certificates) | Incluido en los USD 99 | Minutos una vez que (2) esta activa | Despues de (2), antes de semana 9 |

**Decision que solo vos podes tomar (bloqueante de (1) y (2)):** quien es el **titular legal** de las cuentas — vos como persona (CUIT personal) o una sociedad. Es la misma decision de titularidad que el gate de Mercado Pago (PRD 10.4). Recomendacion: definilo de una para no re-tramitar despues. Para Apple Developer, **organizacion** requiere D-U-N-S Number (gratis pero suma dias); **individual** es mas rapido pero figura tu nombre.

**Si haces una sola cosa hoy:** crear/loguear la **Google Pay & Wallet Console**, crear el Issuer y mandar la solicitud de produccion (el "Business Profile" / acceso de emisor). Todo lo demas tolera esperar; eso no.

---

## 1. Contexto tecnico (que credencial alimenta que)

Las dos plataformas funcionan distinto, y eso define que credencial necesitas:

- **Apple Wallet** = vos generas un archivo `.pkpass` (un zip firmado) **del lado del server** con tu **certificado Pass Type ID**. El telefono lo agrega a Wallet. Para que el pass se **actualice solo** (sellos nuevos, "recompensa lista"), tenes que exponer un **web service de updates** + enviar push por **APNs** (ver ADR-0006: el pass es vidriera viva, se regenera por push). La firma del `.pkpass` necesita: certificado Pass Type ID (.pem/.p12) + clave privada + el **Apple WWDR cert** (intermedio publico de Apple).
- **Google Wallet** = NO generas un archivo. Defines una **clase** (el molde de la tarjeta de sellos) y un **objeto** (la tarjeta de un cliente puntual) via API, y le das al cliente un **"Save to Google Wallet" link** = un **JWT firmado** con la **clave privada de una Service Account**. El update se hace llamando a la API de Google (PATCH del objeto) — Google empuja el cambio al telefono. La firma del JWT necesita: **Issuer ID** + **Service Account JSON** (con su private key).

Ambos caminos viven en la Edge Function `wallet-pass` (ver seccion 5).

---

## 2. APPLE WALLET — setup paso a paso

### 2.1 Que cuenta/credencial hace falta
1. **Apple Developer Program** (la membresia paga, USD 99/ano). Sin esto no podes crear el certificado.
2. **Pass Type ID** (un Identifier del tipo `pass.com.wafi.loyalty`, lo elegis vos).
3. **Pass Type ID Certificate** (el certificado de firma asociado a ese Pass Type ID).
4. **Apple WWDR Certificate** (Apple Worldwide Developer Relations) — es publico, gratis, lo bajas del sitio de Apple. Se incluye en la cadena de firma del `.pkpass`.
5. **(Para updates automaticos) APNs** — usando el mismo Pass Type ID cert (passes usan el cert del Pass Type ID para APNs, no un APNs key separado en el flujo clasico).

### 2.2 Pasos exactos
1. **Inscribirse en el Apple Developer Program** en https://developer.apple.com/programs/ → "Enroll".
   - Elegir **Individual** (mas rapido, figura tu nombre) u **Organization** (requiere **D-U-N-S Number** de la sociedad — gratis via Dun & Bradstreet pero suma dias). Ver decision de titularidad en seccion 0.
   - Pagar USD 99. Apple verifica identidad/pago. **Lead time: horas a ~2 dias.**
2. **Anotar el Team ID.** En developer.apple.com → "Membership" figura el **Team ID** (10 caracteres alfanumericos). Lo vas a necesitar como variable de entorno (`APPLE_TEAM_ID`).
3. **Crear el Pass Type ID.** developer.apple.com → "Certificates, Identifiers & Profiles" → **Identifiers** → "+" → **Pass Type IDs** → elegir un identificador, ej. `pass.com.wafi.loyalty`. Ese string es tu `APPLE_PASS_TYPE_ID`.
4. **Generar el certificado de ese Pass Type ID.**
   - Desde una Mac: Keychain Access → "Certificate Assistant" → "Request a Certificate from a Certificate Authority" → genera un **CSR** (Certificate Signing Request) y, de paso, te queda la **clave privada** en el llavero.
   - En el portal: en el Pass Type ID → "Create Certificate" → subir el CSR → descargar el `.cer`.
   - Importar el `.cer` al llavero y **exportar como `.p12`** (esto empaqueta cert + clave privada). Anotar la passphrase del `.p12`.
5. **Bajar el Apple WWDR cert** (publico) desde https://www.apple.com/certificateauthority/ — se necesita en la cadena de firma.
6. **Convertir a PEM para el server** (la Edge Function de Deno firma con estos):
   - `openssl pkcs12 -in wafi-pass.p12 -clcerts -nokeys -out pass_cert.pem`
   - `openssl pkcs12 -in wafi-pass.p12 -nocerts -nodes -out pass_key.pem` (o con passphrase segun como firmes)
   - El WWDR como `wwdr.pem`.
7. **Guardar los secretos como variables de entorno de la Edge Function** (NO en el repo, NO en el front). Ver seccion 4.

### 2.3 Costos y lead time
- **USD 99/ano** (renovacion anual; si caduca, los passes existentes siguen pero no podes firmar nuevos ni rotar el cert).
- **Lead time inscripcion:** horas a ~2 dias. **Certificado:** minutos una vez activa la cuenta.
- **Caveat operativo:** el **certificado Pass Type ID caduca (~1 ano)**. Hay que renovarlo y re-desplegar el secreto. Anotalo como tarea recurrente de Ops (calendario).

---

## 3. GOOGLE WALLET — setup paso a paso (EL DEL LEAD TIME — arrancar primero)

### 3.1 Que cuenta/credencial hace falta
1. **Cuenta Google** (la de la empresa, no personal idealmente — coherente con titularidad).
2. **Google Pay & Wallet Console** con un **Issuer account** creado.
3. **Aprobacion de Google para publicar en produccion** (acceso de emisor / "request publishing access"). **ESTO es lo que demora** — Google revisa el perfil de negocio antes de habilitarte a emitir pases a usuarios reales. En modo demo/test podes emitir a cuentas de prueba sin esperar, pero para clientes reales necesitas la aprobacion.
4. **Service Account** (en Google Cloud) con su **JSON key**, vinculada al Issuer, para firmar los JWT de "Save to Google Wallet" y llamar a la Wallet API.

### 3.2 Pasos exactos
1. **Entrar a la Google Pay & Wallet Console:** https://pay.google.com/business/console — loguear con la cuenta Google de la empresa.
2. **Crear el Issuer account** (perfil de negocio: nombre "Wafi", contacto, etc.). Te asignan un **Issuer ID** (numerico). Ese es tu `GOOGLE_WALLET_ISSUER_ID`.
3. **Solicitar acceso de publicacion a produccion** ("request publishing access" / acceso de emisor). **ACA ARRANCA EL RELOJ DE LA APROBACION.** Cuanto antes lo mandes, antes te aprueban. **Lead time: dias a semanas, depende de Google, no de Wafi** (mismo patron que el gate KYC de MP — burocracia secuencial, PRD 13).
4. **Crear/seleccionar un proyecto en Google Cloud** y **habilitar la Google Wallet API**.
5. **Crear una Service Account** en Google Cloud (IAM & Admin → Service Accounts), generar una **key JSON**, y descargarla. Esa Service Account es la que firma.
6. **Vincular la Service Account al Issuer** en la Wallet Console (darle permiso de emisor sobre tu Issuer ID).
7. **Mientras esperas la aprobacion:** podes desarrollar contra el **entorno demo** (emitir pases a cuentas marcadas como test) — asi el codigo de la Edge Function queda probado y listo, sin estar bloqueado por la aprobacion.
8. **Definir la Loyalty Class** (el molde: logo, colores Wafi, programa "tarjeta de sellos") via API o consola; los **objects** (tarjeta por cliente) se crean por API en runtime.

### 3.3 Costos y lead time
- **Costo: gratis** (no hay fee de emisor en Google Wallet para loyalty passes).
- **Lead time: dias a semanas para la aprobacion de produccion.** Es el unico cuello de botella real de toda esta guia. **Por eso es lo PRIMERO que arrancas** (seccion 0).

---

## 4. Variables de entorno — mapeo exacto (`product/.env.example`)

Hoy `product/.env.example` ya tiene placeholders, todos en `__PENDIENTE_CEO__`:

```
# Apple / Google Wallet (MVP-1, no urgente)
APPLE_PASS_TYPE_ID=__PENDIENTE_CEO__
APPLE_TEAM_ID=__PENDIENTE_CEO__
GOOGLE_WALLET_ISSUER_ID=__PENDIENTE_CEO__
```

**Mapeo de cada credencial → variable:**

| Credencial obtenida | Variable de entorno | Donde vive | De donde sale |
|---------------------|---------------------|------------|---------------|
| Pass Type ID (string `pass.com.wafi.loyalty`) | `APPLE_PASS_TYPE_ID` | Edge Function (secret) | Apple Developer → Identifiers → Pass Type IDs |
| Apple Team ID (10 chars) | `APPLE_TEAM_ID` | Edge Function (secret) | Apple Developer → Membership |
| Issuer ID (numerico) | `GOOGLE_WALLET_ISSUER_ID` | Edge Function (secret) | Google Pay & Wallet Console |

**Faltan 4 secretos que NO estan todavia en `.env.example` y hay que AGREGAR** (son los que de verdad firman; sin ellos no se genera ningun pass). Recomiendo sumarlos asi al `.env.example`:

```
# Apple Wallet — material de firma (NO al front, solo Edge Function)
APPLE_PASS_CERT=__PENDIENTE_CEO__        # pass_cert.pem (PEM del cert Pass Type ID), base64
APPLE_PASS_KEY=__PENDIENTE_CEO__         # pass_key.pem (clave privada), base64
APPLE_PASS_KEY_PASSPHRASE=__PENDIENTE_CEO__  # passphrase del .p12 si la clave va cifrada
# (el WWDR cert se puede embeber en el codigo de la function o sumar como APPLE_WWDR_CERT)

# Google Wallet — Service Account que firma el JWT (NO al front)
GOOGLE_WALLET_SA_JSON=__PENDIENTE_CEO__  # service account JSON completo, base64
```

> **Regla de seguridad (no negociable):** los certificados/keys NO van en `VITE_*` (esas se exponen al browser). Van como **secrets de la Edge Function** (`supabase secrets set ...`). El PAN/cert nunca toca el front, igual que el principio de MP (PRD 10.3). Para PEM/JSON multilinea, guardar en **base64** y decodificar dentro de la function.

---

## 5. Encaje con la Edge Function `product/supabase/functions/wallet-pass`

Estado actual del archivo `wallet-pass/index.ts` (verificado): es un **stub** que devuelve `501` y tiene el TODO de los tokens:

```ts
// TODO(tokens): APPLE_PASS_TYPE_ID + cert, GOOGLE_WALLET_ISSUER_ID + service account.
...
return Response.json({ todo: 'wallet-pass MVP-1', platform }, { status: 501 })
```

Cuando tengas las credenciales, la function lee los secrets via `Deno.env.get(...)` y bifurca por `?platform=apple|google`:

- **`platform=apple`:** arma el `pass.json` con los sellos de la membresia, lo mete en un zip con las imagenes, firma con `APPLE_PASS_CERT` + `APPLE_PASS_KEY` + WWDR, y devuelve el `.pkpass` (`Content-Type: application/vnd.apple.pkpass`). Usa `APPLE_PASS_TYPE_ID` y `APPLE_TEAM_ID` dentro del `pass.json`. El **web service de updates** (registrar device, push por APNs cuando cambia la membresia) es un endpoint aparte que tambien vive en Supabase Functions.
- **`platform=google`:** crea/actualiza el Loyalty object via Wallet API con la Service Account (`GOOGLE_WALLET_SA_JSON`), genera el **JWT "Save to Google Wallet"** firmado, y devuelve el save-link. Usa `GOOGLE_WALLET_ISSUER_ID`.

La function lee del backend (fuente de verdad, PRD 6.1: pass y PWA son proyecciones read-mostly) los datos de la membresia y regenera la representacion. El push de "sello nuevo / recompensa lista" se dispara cuando un Scan `valid` actualiza `current_stamps` (ADR-0006).

**Comando para cargar los secrets cuando los tengas:**
```
supabase secrets set APPLE_PASS_TYPE_ID="pass.com.wafi.loyalty" APPLE_TEAM_ID="XXXXXXXXXX" \
  GOOGLE_WALLET_ISSUER_ID="3388000000022XXXXXX" \
  APPLE_PASS_CERT="$(base64 -i pass_cert.pem)" APPLE_PASS_KEY="$(base64 -i pass_key.pem)" \
  GOOGLE_WALLET_SA_JSON="$(base64 -i sa.json)"
```

---

## 6. Que arrancar YA — checklist priorizado por lead time

1. **[HOY] Google Wallet Issuer + solicitud de produccion** → es el unico paso que depende de aprobacion externa con lead time de **dias a semanas**. Crear Issuer en la Wallet Console y mandar el "request publishing access" de una. (Bloqueante real de MVP-1.)
2. **[HOY, misma sesion] Definir titularidad legal** (vos persona vs sociedad) — bloquea Apple Developer (Individual vs Organization+D-U-N-S) y es la misma decision del gate MP (PRD 10.4). No la repitas en cada tramite.
3. **[Esta semana] Apple Developer Program** (USD 99). Una vez activa, el Pass Type ID + certificado salen en minutos. No tiene aprobacion que espere; depende solo de que pagues e ingreses identidad.
4. **[Despues, antes de semana 9] Generar cert Apple + Service Account Google + cargar secrets** en la Edge Function. Esto ya es trabajo de Ops/dev, sin espera externa.

**Resumen del razonamiento:** Apple = plata + minutos (sin aprobacion). Google = gratis pero **con aprobacion que demora**. Por eso, aunque Apple sea el que cuesta plata, **Google es el que arrancas primero**. Lo mismo que el resto de los gates con lead time del PRD (MP KYC, Meta WhatsApp): son burocracia secuencial de 2-4 semanas y conviene dispararlos en paralelo al codigo, no cuando el codigo esta listo.

---

## 7. Aclaracion final (que es esto y que NO es)

- **ES** setup de **credenciales de emisor de pases**: un certificado de firma (Apple) y una cuenta de emisor aprobada (Google). Te habilitan a generar/actualizar las tarjetas de sellos en la billetera del cliente.
- **NO ES** un **app review**: Wafi no publica una app nativa en App Store ni Play Store (ADR-0001 — "sin app que descargar"). No hay binario que Apple/Google revisen. Nadie te va a rechazar "la app" porque no hay app.
- **El unico "review" real** es la **aprobacion del Issuer de Google** (perfil de negocio para emitir a produccion). Es de cuenta/emisor, no de aplicacion. Por eso se arranca primero.
