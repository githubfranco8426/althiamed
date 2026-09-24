# Althia Med · Landing de revisión

Sitio estático en español de Chile, sin dependencias en producción. Todo el contenido público está en `dist/`. Las fuentes Manrope e Inter se sirven localmente en WOFF2; no hay consultas a Google Fonts durante la navegación. Peso inicial aproximado: 112 KB sin compresión, incluidos ambos archivos de fuentes. El mapa se solicita solo mediante una acción explícita.

## Vista previa

Con Node.js instalado, ejecutar `node server.mjs` desde esta carpeta y abrir http://127.0.0.1:4173. Para alojamiento estático, entregar únicamente `dist/`.

## Contenido pendiente y publicación

Esta entrega es una vista previa, no un sitio publicado. `noindex, nofollow` impide la indexación mientras se valida. El título, descripción, Open Graph y datos estructurados MedicalClinic están preparados con los datos del brief. El dominio sugerido no se presume aprobado: no se inventó una URL canónica ni una ficha de Google Business.

Antes de publicar:

- Validar dirección, número, titularidad de WhatsApp Business y atención efectiva de cada servicio y grupo de edad.
- Incorporar logo y fotografías reales; la marca tipográfica actual es provisional y no se ha utilizado una foto de stock como si fuera el centro.
- Añadir profesionales, fotos, credenciales y textos aprobados; confirmar horarios, precios, medios de pago, convenios y accesibilidad física.
- Sustituir búsqueda geográfica por ficha de Google Business verificada cuando esté disponible. Verificar el resultado y la ruta en un teléfono real.
- Aprobar la política de privacidad y completar responsable legal, contacto y conservación. Actualizarla si se incorpora un proveedor de medición o alojamiento que registre datos.
- Validar los enlaces con las aplicaciones de WhatsApp, llamadas y Maps en teléfonos reales. La prueba automatizada comprueba URLs y eventos, no la recepción del mensaje ni la cuenta Business.
- Confirmar dominio, añadir canonical y og:url, retirar `noindex, nofollow` y generar sitemap con la URL definitiva.
- Configurar compresión Brotli/gzip y HTTPS en el alojamiento. Mantener disponible la revisión semanal de horarios por una persona responsable del centro.

## Atribución

El enlace sin parámetros utiliza exactamente: «Hola, quiero agendar una hora médica en Althia Med.»

Los siguientes enlaces relativos cambian el mensaje al texto de origen indicado en el brief:

| Canal | Enlace |
| --- | --- |
| Instagram | `/?canal=instagram` |
| Google | `/?canal=google` |
| Pendón / QR | `/?canal=pendon` |
| Campaña de Medicina General | `/?canal=medicina_general` |

También se admiten `utm_source=instagram`, `utm_source=google`, `utm_source=pendon` y `utm_campaign=medicina_general`. La campaña de Medicina General tiene prioridad; `canal` tiene prioridad sobre `utm_source`. Valores desconocidos vuelven al mensaje general. No se guardan parámetros arbitrarios, identificadores publicitarios ni URL completa. Los botones de atención añaden la categoría solicitada al mensaje del canal; no afirman disponibilidad ni una especialidad médica adicional.

## Eventos implementados

| Evento | Acción |
| --- | --- |
| `page_view` | Carga de la página |
| `whatsapp_click` | Cualquier enlace de reserva |
| `call_click` | Enlace telefónico |
| `map_click` | Cómo llegar o carga del mapa integrado |
| `specialty_click` | Consulta de cada categoría de atención |

Cada evento incluye únicamente `channel`, `location` y, cuando corresponde, `service` de un conjunto fijo. Un clic en una categoría produce `specialty_click` y `whatsapp_click`; no sumar ambos como dos consultas. Los eventos se almacenan en `window.dataLayer` y se emiten como `althiamed:analytics`. No existe un servicio de analítica conectado, envío de eventos, cookies ni persistencia; recargar los elimina. No representan reservas ni pacientes asistidos.

La integración de un proveedor requiere configuración posterior y revisión de privacidad. No activar captura automática, grabaciones de sesión, parámetros libres, contenido de chats ni datos clínicos.

## Panel mensual

`medicion-mensual.csv` es una plantilla sin datos ficticios. Completar únicamente cifras agregadas por canal desde la operación del centro, sin información identificable ni clínica. Costo por paciente asistido = gasto publicitario / pacientes asistidos; dejar sin calcular cuando no hay pacientes asistidos. Las consultas calificadas, reservas, asistencias y horas vacías ocupadas requieren confirmación operativa: no se infieren de los clics. Responsable y criterio de consulta calificada: Por confirmar.

## Verificación

Pruebas de navegador incluidas en `verify.cjs`, usando el runtime de Playwright disponible en este entorno y Microsoft Edge. Para otro equipo, ajustar la importación a su instalación de Playwright.

Se verificaron anchos de 320, 390, 768 y 1440 px sin desbordamiento horizontal; menú móvil y Escape; preguntas desplegables; acceso a privacidad; enlace de WhatsApp y mensaje exactos; eventos de conversión; atribución de los cuatro canales y fallback; carga del iframe solo al solicitarlo; enlaces de reserva sin JavaScript. Sin errores JavaScript. La carga externa del mapa se simuló en la prueba automatizada: pendiente verificar visualmente el punto con la ficha oficial. No se atribuye una puntuación Lighthouse ni certificación WCAG a estas pruebas.

Accesibilidad: HTML semántico, una cabecera H1, navegación con nombres, enlace para saltar al contenido, foco visible, controles táctiles, respeto a movimiento reducido y texto oscuro en botones turquesa para preservar contraste. El borrador de privacidad no constituye una política legal aprobada.
