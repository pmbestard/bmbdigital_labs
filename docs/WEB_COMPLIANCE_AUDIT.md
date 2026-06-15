# Web compliance audit

Fecha: 15 de junio de 2026.

## Segunda pasada de auditoría externa

Resultado: apto como base técnica/editorial para teaser y presentación prudente, pendiente de completar datos legales reales y revisión jurídica.

- `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/terminos/` y `/seguridad/` existen como rutas HTML estáticas.
- La versión inglesa dispone de rutas legales equivalentes: `/en/legal-notice/`, `/en/privacy/`, `/en/cookies/`, `/en/terms/` y `/en/security/`.
- La landing ES, landing EN, página pública de proyecto y páginas legales enlazan el bloque legal completo desde el footer.
- La landing EN enlaza a páginas legales en inglés desde el panel informativo de contacto y el footer.
- El formulario público se ha retirado por modo prelanzamiento y porque el envío `mailto:` podía fallar según navegador, dispositivo o cliente de correo.
- No se detectan promesas afirmativas de seguridad absoluta, invulnerabilidad, anonimato total ni cifrado extremo a extremo. Las menciones a esos términos aparecen como negaciones o cautelas legales.
- Proveedor de hosting público detectado: GitHub Pages. No hay proveedor externo de formularios ni envío directo de consultas desde la web pública principal.
- Los marcadores `TODO_` se habían retirado de las páginas públicas; en modo prelanzamiento se reintroduce expresamente `TODO_EMAIL_CORPORATIVO` para no inventar buzones corporativos no confirmados.
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

- No hay formulario de contacto activo en `index.html`.
- No hay formulario de contacto activo en `en/index.html`.
- Se ha retirado el flujo `mailto:` que dependía del cliente de correo del usuario.
- No se detecta envío directo a Formspree, EmailJS, Resend, Supabase, Firebase u otro proveedor de formularios.

## Cookies y scripts detectados

- No se detecta `document.cookie`.
- No se detectan Google Analytics, gtag, Meta Pixel, Hotjar, Plausible, Umami, YouTube embeds ni Google Maps en la web principal.
- Se detecta `localStorage` en `private-office/office.js`, fuera de la landing pública principal.
- JavaScript propio usa canvas y eventos de ratón/táctiles. La preparación de correo queda sin superficie activa al retirar los formularios públicos.

## Proveedores técnicos detectados

- Dominio público: `www.bmbdigitallabs.com`.
- Hosting: GitHub Pages.
- Formulario: retirado. Si se activa un proveedor externo o un nuevo `mailto:`, actualizar política de privacidad, cookies y proveedores.
- Correos corporativos previstos: contacto@bmbdigitallabs.com, privacidad@bmbdigitallabs.com, legal@bmbdigitallabs.com y seguridad@bmbdigitallabs.com. Pendiente confirmar buzones; mientras tanto la web usa `TODO_EMAIL_CORPORATIVO`.
- Analítica/publicidad: ninguno detectado.
- Imágenes: NASA / GSFC / JPL.

## Riesgos legales y comerciales encontrados

- Faltaban rutas legales separadas para aviso legal, privacidad, cookies, términos y seguridad. Quedan creadas y enlazadas desde el footer de la landing y la página pública de proyecto.
- Faltaban NIF, domicilio profesional/fiscal y correos corporativos definitivos.
- El formulario anterior dependía de `mailto:` y se retira durante el modo prelanzamiento.
- El footer no enlazaba páginas legales completas.
- SEO técnico incompleto: faltaban canonical, Open Graph, Twitter Card, manifest, robots y sitemap. Quedan añadidos para la web principal.
- Cabeceras de seguridad no configuradas en el repositorio. Se añade `_headers` para despliegues compatibles, pendiente de confirmar proveedor.

## Resultado de comprobación solicitada

1. `/aviso-legal/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/legal-notice/`.
2. `/privacidad/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/privacy/`.
3. `/cookies/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/cookies/`.
4. `/terminos/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/terms/`.
5. `/seguridad/`: existe y está enlazado en footers públicos. Equivalente EN: `/en/security/`.
6. Formulario: retirado durante el modo prelanzamiento; no hay recogida directa de consultas desde la web pública.
7. Checkbox de privacidad: no aplica mientras no exista formulario activo.
8. Seguridad absoluta: no se promete; solo se menciona para negarla.
9. Cifrado extremo a extremo: no se promete; se indica que no debe afirmarse salvo implementación documentada.
10. Proveedores técnicos: identificados cuando existen o marcados como `TODO`; correos corporativos pendientes como `TODO_EMAIL_CORPORATIVO`.
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
- Confirmar buzones corporativos antes de sustituir `TODO_EMAIL_CORPORATIVO`.
- Confirmar proveedor de hosting real.
- Revisar textos legales con asesoría profesional antes de contratación formal.
- Revisar también la versión inglesa con asesoría profesional si se va a captar público internacional.
- No reactivar formulario hasta confirmar buzón corporativo o proveedor externo documentado.
- Si se activa analítica, píxeles, mapas, vídeos o formularios externos, añadir consentimiento y actualizar la tabla de cookies.
