# Informe de valoración interna

Proyecto: Web corporativa BMB Digital Labs  
Dominio: bmbdigitallabs.com  
Fecha: 31/05/2026  
Estado: Publicada en GitHub Pages y actualizada con enfoque de privacidad, oficina portable y personalización visual

## 1. Objetivo del proyecto

Crear una primera presencia corporativa para BMB Digital Labs como empresa raíz, separada de productos concretos como Tu Gestor de Alquileres, pero capaz de mostrar la dirección real de la marca.

La web debía comunicar:

- Identidad de marca.
- Visión empresarial centrada en privacidad práctica.
- Oficinas virtuales y herramientas local-first.
- Archivos cifrados y portabilidad de datos.
- Trabajo desde cualquier ordenador con internet.
- Proyectos propios y demostraciones iniciales.
- Personalización visual mediante colores favoritos del cliente.
- Principios morales: autonomía, soberanía, independencia, privacidad y seguridad.
- Contacto y mínimos legales.
- Base futura para una oficina documental privada.

## 2. Alcance realizado

### Web pública

- Diseño visual completo de landing corporativa.
- Integración de logotipo BMB y sello de cabecera.
- Hero interactivo con esfera magnética vectorial.
- Fondo narrativo tipo misión Tierra/Marte.
- Secciones:
  - Visión.
  - Funcionamiento.
  - Proyectos.
  - Enfoque.
  - Principios.
  - Contacto.
  - Legal.
- Footer con derechos reservados y créditos NASA.
- Formulario de contacto mediante correo.
- Ajustes responsive para móvil.
- Enlace interno a la vista pública de bienvenida de Tu Gestor de Alquileres.
- Mejora visual de tarjetas tipo cristal oscuro, contraste y movimiento ligero al pasar el ratón.
- Textos revisados con acentos y preparados para traducción automática.

### Infraestructura

- Repositorio GitHub: `pmbestard/bmbdigital_labs`.
- Publicación con GitHub Pages.
- Dominio personalizado `bmbdigitallabs.com`.
- Configuración DNS en Arsys hacia GitHub Pages.
- Preparación de paquete alternativo para Arsys.

### Seguridad y soberanía

- Auditoría anti-phishing inicial:
  - SPF revisado.
  - DKIM revisado.
  - DMARC identificado como pendiente.
  - HTTPS identificado como pendiente de finalizar certificado.
- Creación de carpeta privada local `private-office/` excluida de Git.
- Preparación de panel `/admin/` con bóveda cifrada local `.bmbvault`.
- Exportación/importación de datos cifrados para USB.
- Respaldo opcional por correo mediante adjunto cifrado.

## 3. Valor aportado

La web no es solo una página de presentación. Es la primera pieza operativa de BMB Digital Labs:

- Define imagen de empresa raíz.
- Presenta capacidad creativa y técnica.
- Ordena discurso comercial.
- Separa marca empresarial de productos concretos.
- Introduce principios de privacidad, soberanía y mínimo servidor.
- Crea base para controlar documentos, propuestas y costes.
- Presenta un enfoque diferencial frente a webs genéricas: herramientas privadas, portables y personalizadas.
- Permite explicar la empresa en web y en papel mediante documentos internos actualizados.

## 4. Estimación de esfuerzo

| Concepto | Horas estimadas | Valor/hora | Subtotal |
| --- | ---: | ---: | ---: |
| Dirección creativa y estrategia de marca | 6 h | 45 € | 270 € |
| Diseño UI/UX y responsive | 10 h | 45 € | 450 € |
| Desarrollo HTML/CSS/JS | 12 h | 45 € | 540 € |
| Animaciones, esfera magnética y fondos | 7 h | 45 € | 315 € |
| Legal básico, contacto y footer | 3 h | 45 € | 135 € |
| GitHub Pages, DNS y publicación | 3 h | 45 € | 135 € |
| Oficina privada y bóveda cifrada inicial | 8 h | 45 € | 360 € |
| Revisión seguridad anti-phishing | 2 h | 45 € | 90 € |
| Reenfoque de privacidad, textos y dossier papel | 4 h | 45 € | 180 € |

Subtotal estimado actualizado: 2.475 €

## 5. Costes externos pendientes de registrar

- Dominio y servicios Arsys.
- Hosting o servicios adicionales contratados.
- Coste Netlify si se mantiene para otros proyectos.
- Cualquier licencia, herramienta o servicio de correo.

## 6. Riesgos y pendientes

- Activar HTTPS en GitHub Pages cuando el certificado esté listo.
- Añadir DMARC en modo observación.
- Definir correos oficiales: `contacto@`, `legal@`, `dmarc@`.
- No almacenar documentación sensible en GitHub Pages.
- Evolucionar `/admin/` hacia autenticación real si se gestionan datos sensibles online.
- Completar aviso legal, política de privacidad y política de cookies antes de actividad comercial plena.
- Preparar condiciones de servicio y límites profesionales: BMB crea herramientas de apoyo, no sustituye asesoría legal, fiscal o contable.

## 7. Conclusión

Valor interno recomendado para registrar como desarrollo inicial de activo digital:

**2.475 € + IVA simbólico si se emite factura proforma interna.**

Este importe sirve como referencia de coste de creación, no como factura fiscal real hasta que exista emisor legal con datos fiscales completos.
