# Feature Specification: Migración del backend a PHP/cPanel

**Feature Branch**: `001-cpanel-php-migration`

**Created**: 2026-09-01

**Status**: Draft

**Input**: User description: "Formalizar la migración del backend de Vercel/TypeScript a PHP plano para correr en el hosting compartido cPanel de Latinoamérica Hosting (innerspirit.net, Apache + MySQL, sin Node.js). El código ya fue escrito en server-php/ (puerto 1:1 de api/*.ts: checkout, leads, orders/confirm|pdf|status, webhooks/mercadopago|wompi, con MySQL vía PDO en vez de Postgres, PDF generado a mano, PHPMailer para email, y firmas HMAC-SHA256 idénticas a las del código Node original). El spec debe cubrir: objetivo y criterios de éxito, qué queda pendiente para pasar a producción (vendorizar PHPMailer, crear config.php real con secretos, crear la base MySQL, subir a cPanel, verificar firmas criptográficas con verify_crypto.php, probar los endpoints con curl), y boundaries (nunca commitear secretos reales, nunca tocar la lógica de pagos sin verificar la firma antes)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cliente completa una compra (Priority: P1)

Un cliente del estudio agrega productos/clases al carrito y paga con Mercado Pago o Wompi. El sitio corre enteramente en el hosting compartido (sin ningún servicio Node externo), y el cliente recibe confirmación y su comprobante igual que antes de la migración.

**Why this priority**: Es la ruta de dinero real; si falla, el negocio pierde ventas o cobra mal.

**Independent Test**: Completar un checkout de extremo a extremo contra el hosting ya desplegado (sandbox de cada pasarela) y confirmar que la orden queda pagada, con email y PDF entregados.

**Acceptance Scenarios**:

1. **Given** un carrito válido, **When** el cliente paga con Mercado Pago o Wompi, **Then** la pasarela redirige a la página de confirmación y el webhook firmado marca la orden como pagada.
2. **Given** una orden pagada, **When** el webhook llega, **Then** el cliente recibe un email con el PDF del comprobante adjunto (o el sistema registra por qué no se envió, sin romper el flujo).

---

### User Story 2 - Visitante deja sus datos de contacto (Priority: P2)

Un visitante llena el formulario de contacto o newsletter. El dato queda guardado en la base de datos del hosting aunque el visitante también sea redirigido a WhatsApp.

**Why this priority**: Es la segunda fuente de leads del sitio; menor riesgo que el dinero pero sigue siendo negocio perdido si falla en silencio.

**Independent Test**: Enviar un lead de prueba al endpoint y confirmar la fila en la tabla `leads` vía phpMyAdmin.

**Acceptance Scenarios**:

1. **Given** un email válido y consentimiento marcado, **When** se envía el formulario, **Then** el lead queda guardado y la respuesta indica éxito.
2. **Given** la base de datos no disponible, **When** se envía el formulario, **Then** el sitio no muestra error al usuario (el canal de WhatsApp sigue funcionando).

---

### User Story 3 - El operador del sitio despliega y verifica el backend (Priority: P1)

Quien administra el hosting (no necesariamente el desarrollador original) sigue una guía para: crear la base MySQL, cargar los secretos reales, subir los archivos, y confirmar que todo responde antes de anunciar el sitio en producción.

**Why this priority**: Sin esto, el código correcto nunca llega a producción o queda con secretos mal puestos.

**Independent Test**: Seguir `server-php/README.md` desde cero en una cuenta cPanel limpia y llegar a "todos los curl de verificación responden 2xx" sin ayuda adicional.

**Acceptance Scenarios**:

1. **Given** una cuenta cPanel nueva sin nada desplegado, **When** se sigue la guía de principio a fin, **Then** los tres `curl` de verificación (`leads`, `checkout`, `orders/status`) responden con éxito.
2. **Given** `verify_crypto.php` subido y visitado una vez, **When** se compara el JSON contra los valores esperados documentados, **Then** coinciden byte a byte (o se detiene el despliegue si no).

---

### Edge Cases

- ¿Qué pasa si un webhook de pago llega duplicado (reintento de la pasarela)? → Debe responder éxito sin re-procesar ni reenviar el email (idempotencia por `event_id`).
- ¿Qué pasa si `secure_config/config.php` no existe o le faltan claves? → Cada endpoint debe fallar con un mensaje claro (500/error genérico al cliente), nunca con una traza que exponga rutas del servidor o secretos.
- ¿Qué pasa si dos requests de checkout llegan con el mismo `Idempotency-Key` pero datos distintos? → Debe rechazarse explícitamente en vez de crear una orden con datos mezclados.
- ¿Qué pasa si el monto que reporta la pasarela no coincide con el de la orden guardada? → El webhook debe rechazar el evento (409) y no marcar la orden como pagada.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE aceptar pagos vía Mercado Pago y Wompi sirviendo únicamente PHP + MySQL (sin Node.js ni Postgres en producción).
- **FR-002**: El sistema DEBE producir el mismo resultado observable (JSON de respuesta, códigos de estado, contenido del PDF y del email) que la versión Node/Vercel original, para las mismas entradas.
- **FR-003**: El sistema DEBE verificar la firma/checksum de cada webhook de pago antes de marcar una orden como pagada.
- **FR-004**: El sistema DEBE ser idempotente: mismo `Idempotency-Key` de checkout o mismo `event_id` de webhook no debe duplicar órdenes ni reenvíos de email.
- **FR-005**: El sistema DEBE mantener todos los secretos (credenciales DB, llaves de pago, SMTP) fuera del directorio servido públicamente (`public_html`).
- **FR-006**: El sistema DEBE seguir generando el comprobante en PDF sin depender de una librería externa de PDF.
- **FR-007**: El sistema DEBE seguir capturando leads de contacto/newsletter aunque la base de datos no esté disponible, sin mostrar error al visitante.

### Key Entities

- **Orden (order)**: compra de productos/clases/eventos; incluye estado de pago, proveedor, monto, cliente, items, token firmado.
- **Item de orden (order_item)**: línea individual de una orden (producto, clase o evento) con precio y cantidad.
- **Evento de webhook (webhook_event)**: registro de cada notificación de pago procesada, usado para evitar reprocesar duplicados.
- **Entrega de email (email_delivery)**: estado del envío de confirmación por orden, para no reenviar de más ni perder el envío.
- **Lead**: contacto capturado desde el formulario de contacto o newsletter.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un cliente completa una compra de principio a fin (carrito → pago → confirmación con PDF) en menos de 5 minutos, igual que antes de la migración.
- **SC-002**: 100% de los webhooks con firma inválida son rechazados; 100% de los webhooks válidos y con monto correcto marcan la orden como pagada en un solo intento.
- **SC-003**: Cero pagos duplicados o emails de confirmación duplicados ante reintentos de la pasarela de pago.
- **SC-004**: El operador del sitio completa el despliegue completo (base de datos, secretos, subida, verificación) siguiendo únicamente la guía escrita, sin intervención adicional del desarrollador.
- **SC-005**: Ningún secreto real (contraseñas, llaves de API, tokens) queda accesible públicamente ni committeado al repositorio.

## Assumptions

- El hosting cPanel ofrece PHP 8.0+ y MySQL, sin acceso a Node.js ni a Postgres (confirmado: plan compartido, sin SSH funcional).
- El volumen de tráfico es bajo (estudio de yoga/bienestar local), por lo que no se requiere optimizar para alta concurrencia.
- Las pasarelas de pago (Mercado Pago, Wompi) y el proveedor SMTP ya existen y solo cambian las credenciales de entorno, no la integración en sí.
- El código PHP en `server-php/` es la fuente de verdad del backend de producción; `api/*.ts` (Vercel) queda como referencia histórica, no se despliega más.

## Boundaries

- **Nunca** commitear secretos reales (contraseñas DB, llaves de Mercado Pago/Wompi, credenciales SMTP) al repositorio — solo plantillas con placeholders (`secure_config.example.php`).
- **Nunca** modificar la lógica de verificación de firma/checksum de un webhook de pago sin antes correr `verify_crypto.php` y confirmar que coincide con los vectores de referencia.
- **Siempre** que se toque `api/_lib/payments.php`, `api/_lib/orders.php` o los webhooks, re-verificar manualmente contra los mismos vectores de prueba antes de subir a producción.
