# Privacy tech map

## Datos recogidos

- Formulario de contacto: nombre, correo electrónico, tipo de proyecto, mensaje y aceptación de privacidad.
- Datos técnicos básicos del alojamiento: IP, agente de usuario, fecha/hora, URL solicitada y registros necesarios para seguridad/operación, sujetos al proveedor real.
- Honeypot antispam: campo oculto `empresa_web`, usado solo para descartar envíos automatizados.

## Finalidad

- Responder consultas recibidas.
- Evaluar encaje del proyecto.
- Preparar, en su caso, una propuesta de servicios o productos digitales.
- Mantener seguridad y disponibilidad básica del sitio.

## Base jurídica probable

- Consentimiento del usuario para consultas.
- Interés legítimo para seguridad técnica básica del sitio.
- Ejecución contractual y obligaciones legales solo si se formaliza una relación comercial posterior.

## Proveedores

- Hosting: `TODO_PROVEEDOR_HOSTING`.
- Formulario: actualmente `mailto:` mediante cliente de correo del usuario; completar `TODO_PROVEEDOR_FORMULARIO` si se sustituye por un proveedor externo.
- Analítica/publicidad: ninguno detectado.

## Conservación

- Consultas: tiempo necesario para gestionar la solicitud y seguimiento razonable.
- Registros técnicos: según política del proveedor de hosting pendiente de confirmar.

## Riesgos

- Faltan NIF, domicilio profesional/fiscal y correos legales definitivos.
- Hosting no confirmado documentalmente.
- Si se añade analítica, mapas, vídeos o formularios externos, habrá que actualizar cookies, privacidad y proveedores.
- La carpeta `private-office` usa `localStorage`; debe mantenerse como entorno de demo/oficina privada y no confundirse con la web pública de captación.

## Medidas técnicas

- Formulario con campos requeridos, email válido, consentimiento obligatorio y honeypot.
- Sin envío automático a terceros desde navegador en la web principal.
- Sin cookies analíticas/publicitarias detectadas en la web principal.
- Cabeceras propuestas en `_headers` para despliegues compatibles.

## Campos pendientes

- `TODO_NOMBRE_LEGAL_COMPLETO`
- `TODO_NIF`
- `TODO_DOMICILIO_PROFESIONAL`
- `TODO_LEGAL_EMAIL`
- `TODO_PRIVACIDAD_EMAIL`
- `TODO_SEGURIDAD_EMAIL`
- `TODO_PROVEEDOR_HOSTING`
- `TODO_PROVEEDOR_FORMULARIO`
