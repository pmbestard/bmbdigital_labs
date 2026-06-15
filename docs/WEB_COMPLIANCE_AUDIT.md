# Web compliance audit

Fecha: 15 de junio de 2026.

## Segunda pasada de auditoría externa

Resultado: apto como base técnica/editorial para teaser y presentación prudente, pendiente de completar datos legales reales y revisión jurídica.

- `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/terminos/` y `/seguridad/` existen como rutas HTML estáticas.
- La versión inglesa dispone de rutas legales equivalentes: `/en/legal-notice/`, `/en/privacy/`, `/en/cookies/`, `/en/terms/` y `/en/security/`.
- La landing ES, landing EN, página pública de proyecto y páginas legales enlazan el bloque legal completo desde el footer.
- La landing EN enlaza a páginas legales en inglés desde la primera capa del formulario, el checkbox de privacidad y el footer.
- El formulario principal incluye primera capa informativa, campos requeridos, email de tipo `email`, honeypot, checkbox obligatorio de privacidad y botón deshabilitado hasta aceptación.
- No se detectan promesas afirmativas de seguridad absoluta, invulnerabilidad, anonimato total ni cifrado extremo a extremo. Las menciones a esos términos aparecen como negaciones o cautelas legales.
- Proveedor de hosting público detectado: GitHub Pages. El formulario usa `mailto:` mediante cliente de correo de la persona usuaria.
- Los marcadores `TODO_` se han retirado de las páginas públicas para evitar apariencia de incumplimiento o publicación a medias; quedan solo como tareas internas/documentales.
- No se detectan scripts de tracking no declarados. Los scripts cargados en la web pública son propios (`src/main.js`) y JSON-LD de schema.org.
- No hay build de framework: el sitio compila como estático. Se verificó sintaxis de `src/main.js`, parseo de `manifest.webmanifest`, parseo de `sitemap.xml`, enlaces relativos y `git diff --check`.
- El diseño mantiene identidad BMB Digital Labs: logo, paleta grafito/naranja, estética espacial, tipografía de misión, NASA credits y lenguaje premium prudente.
- Mobile: la web tiene `viewport`, breakpoints, grids a una columna, `flex-wrap`, tamaños con `clamp` y tablas legales con scroll horizontal en pantallas pequeñas.
- Los textos legales usan capas, frases cortas y advertencias prudentes para usuarios no técnicos.

## Stack detectado

- Sitio HTML/CSS/JS estático.
- Página principal: `index.html`.
- Versión inglesa: `en/index.html`.
- Estilos: `src/styles.css`.
- JavaScript propio: `src/main.js`.
- No se detecta `package.json`, Next.js, Vite, Astro, Netlify config ni Vercel config.
- Despliegue probable: estático con dominio propio (`CNAME`) y compatibilidad GitHub Pages (`.nojekyll`). Proveedor definitivo pendiente de confirmar.

## Rutas existentes

- `/`
- `/en/`
- `/en/legal-notice/`
- `/en/privacy/`
- `/en/cookies/`
- `/en/terms/`
- `/en/security/`
- `/admin/`
- `/private-office/`
- `/proyectos/gestor-alquileres/`
- Rutas legales creadas: `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/terminos/`, `/seguridad/`.

## Formularios existentes

- Formulario de contacto en `index.html`.
- Formulario equivalente en `en/index.html`.
- El formulario prepara un correo con `mailto:` usando datos de email codificados en atributos `data-*`.
- No se detecta envío directo a Formspree, EmailJS, Resend, Supabase, Firebase u otro proveedor de formularios.

## Cookies y scripts detectados

- No se detecta `document.cookie`.
- No se detectan Google Analytics, gtag, Meta Pixel, Hotjar, Plausible, Umami, YouTube embeds ni Google Maps en la web principal.
- Se detecta `localStorage` en `private-office/office.js`, fuera de la landing pública principal.
- JavaScript propio usa canvas, eventos de ratón/táctiles y preparación de correo.

## Proveedores técnicos detectados

- Dominio público: `www.bmbdigitallabs.com`.
- Hosting: GitHub Pages.
- Formulario: `mailto:` mediante cliente de correo del usuario; si se cambia a servicio externo, actualizar política de privacidad y cookies.
- Analítica/publicidad: ninguno detectado.
- Imágenes: NASA / GSFC / JPL.

## Riesgos legales y comerciales encontrados

- Faltaban rutas legales separadas para aviso legal, privacidad, cookies, términos y seguridad. Quedan creadas y enlazadas desde el footer de la landing y la página pública de proyecto.
- Faltaban NIF, domicilio profesional/fiscal y correos legales definitivos.
- El formulario tenía consentimiento básico, pero faltaba primera capa completa y botón bloqueado hasta aceptación.
- El footer no enlazaba páginas legales completas.
- SEO técnico incompleto: faltaban canonical, Open Graph, Twitter Card, manifest, robots y sitemap. Quedan añadidos para la web principal.
- Cabeceras de seguridad no configuradas en el repositorio. Se añade `_headers` para despliegues compatibles, pendiente de confirmar proveedor.

## Resultado de comprobación solicitada

1. `/aviso-legal/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/legal-notice/`.
2. `/privacidad/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/privacy/`.
3. `/cookies/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/cookies/`.
4. `/terminos/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/terms/`.
5. `/seguridad/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/security/`.
6. Formulario: primera capa informativa presente.
7. Checkbox de privacidad: obligatorio y bloquea envío hasta aceptación.
8. Seguridad absoluta: no se promete; solo se menciona para negarla.
9. Cifrado extremo a extremo: no se promete; se indica que no debe afirmarse salvo implementación documentada.
10. Proveedores técnicos: identificados cuando existen o marcados como `TODO`.
11. Tracking: no se detectan scripts de tracking no declarados.
12. Compilación: sitio estático sin pipeline; validaciones técnicas superadas.
13. Diseño: mantiene BMB Digital Labs.
14. Mobile: estructura responsive revisada y reforzada en tablas legales.
15. Claridad: textos legales y comerciales reescritos en tono prudente y comprensible.

## Promesas técnicas delicadas

- La web usa lenguaje de privacidad y cifrado. Se ha mantenido el posicionamiento, pero se han suavizado varias frases para evitar promesas absolutas y dejar claro que cifrado, borrado local, trazabilidad e integridad dependen de cada producto concreto.
- No se ha detectado promesa de "seguridad absoluta", salvo una negación expresa: "no a garantizar seguridad absoluta".

## Cambios recomendados

- Completar los datos fiscales reales antes de captación comercial seria, contratación, facturación o prestación continuada.
- Confirmar proveedor de hosting real.
- Revisar textos legales con asesoría profesional antes de contratación formal.
- Revisar también la versión inglesa con asesoría profesional si se va a captar público internacional.
- Probar formulario en móvil y escritorio.
- Si se activa analítica, píxeles, mapas, vídeos o formularios externos, añadir consentimiento y actualizar la tabla de cookies.
