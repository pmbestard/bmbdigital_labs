# Privacy tech map

## Datos recogidos

- No hay formulario activo en la web pública principal tras el ajuste de modo prelanzamiento.
- Datos técnicos básicos del alojamiento: IP, agente de usuario, fecha/hora, URL solicitada y registros necesarios para seguridad/operación, sujetos al proveedor real.
- Honeypot antispam: campo oculto `empresa_web`, usado solo para descartar envíos automatizados.

## Finalidad

- Mantener una web informativa de prelanzamiento.
- Presentar principios, prototipos y líneas de producto sin activar contratación ni venta directa.
- Mantener seguridad y disponibilidad básica del sitio.

## Base jurídica probable

- Interés legítimo para mantener la web informativa.
- Consentimiento del usuario solo cuando exista un canal de contacto activo.
- Interés legítimo para seguridad técnica básica del sitio.
- Ejecución contractual y obligaciones legales solo si se formaliza una relación comercial posterior.

## Proveedores

- Hosting: GitHub Pages.
- Formulario: retirado. No hay envío `mailto:` ni proveedor externo de formularios en la web pública principal.
- Correos corporativos previstos: contacto@bmbdigitallabs.com, privacidad@bmbdigitallabs.com, legal@bmbdigitallabs.com y seguridad@bmbdigitallabs.com. Pendiente confirmar buzones; mientras tanto usar `TODO_EMAIL_CORPORATIVO`.
- Analítica/publicidad: ninguno detectado.

## Conservación

- Consultas: no aplica mientras no exista canal activo.
- Registros técnicos: según política del proveedor de hosting pendiente de confirmar.

## Riesgos

- Faltan NIF, domicilio profesional/fiscal y confirmación de correos corporativos definitivos.
- Hosting no confirmado documentalmente.
- Si se añade analítica, mapas, vídeos o formularios externos, habrá que actualizar cookies, privacidad y proveedores.
- La carpeta `private-office` usa `localStorage`; debe mantenerse como entorno de demo/oficina privada y no confundirse con la web pública de captación.

## Medidas técnicas

- Sin formulario activo ni recogida directa de consultas desde navegador en la web principal.
- Sin cookies analíticas/publicitarias detectadas en la web principal.
- Cabeceras propuestas en `_headers` para despliegues compatibles.

## Campos pendientes

- Nombre legal completo para contratación formal.
- NIF para contratación/facturación.
- Domicilio profesional/fiscal para contratación/facturación.
- Confirmar contacto@bmbdigitallabs.com.
- Confirmar privacidad@bmbdigitallabs.com.
- Confirmar legal@bmbdigitallabs.com.
- Confirmar seguridad@bmbdigitallabs.com.
