# Wafi — Coming Soon

Página de pre-lanzamiento de [Wafi](https://wafi.us). Oscura, animada y mobile-first,
sobre la estética real de la marca (gradiente violeta → magenta → rosa, motivo mágico
de la varita). **100% vanilla** (HTML + CSS + JS), sin build ni dependencias: subís los
archivos a cualquier hosting estático y funciona.

## Estructura

```
coming-soon/
  index.html      ← marcado + logo real de Wafi inline
  styles.css      ← sistema visual, animaciones, responsive, reduced-motion
  script.js       ← cursor mágico, partículas, tilt 3D, sellos, formulario
  assets/
    wafi-logo.svg ← logo oficial (favicon)
  README.md
```

## Probar local

Cualquier servidor estático sirve. Por ejemplo:

```bash
cd coming-soon
python3 -m http.server 4321
# abrí http://localhost:4321
```

(También funciona abriendo `index.html` directo en el navegador.)

## Deploy

- **GitHub Pages:** subí esta carpeta al repo y activá Pages sobre la rama/carpeta.
- **Vercel / Netlify / Cloudflare Pages:** importás el repo, sin build command,
  output = la carpeta `coming-soon` (o la raíz si subís solo este contenido).

## Conectar el formulario (capturar emails de verdad)

Por defecto, el form valida el email, muestra el estado de éxito y guarda una copia
en `localStorage` (no se pierde el lead). Para enviarlos a un servicio real:

1. Abrí `script.js`.
2. Buscá `const ENDPOINT = '';`
3. Pegá tu URL de [Formspree](https://formspree.io), Beehiiv, Mailchimp, etc.

```js
const ENDPOINT = 'https://formspree.io/f/xxxxxx';
```

## Detalles

- **Accesibilidad:** respeta `prefers-reduced-motion` (apaga partículas, parallax y
  animaciones), foco visible, `lang="es-AR"`, inputs a 16px (sin zoom en iOS).
- **Voz de marca:** español rioplatense (voseo), el enemigo es la tarjeta de cartón,
  sin urgencia fabricada, sin la palabra "plataforma".
- **Pendiente opcional:** generar `assets/og.png` (1200×630) para la preview al
  compartir el link en redes/WhatsApp.

---
Hecho para Wafi · Buenos Aires · Argentina
