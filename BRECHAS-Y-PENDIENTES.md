# Brechas y pendientes — Inner Spirit Studio

> Revisión y **resolución** de brechas realizada el **2026-07-01**. Rama: `main`.
> Estado: la mayoría se resolvió en código (ver ✅). Quedan pendientes solo los puntos que
> requieren **datos del negocio** o **validación en un deploy real** (ver 🟡 PENDIENTE).

---

## ✅ Resuelto en esta sesión

### 1. Cabeceras de seguridad en producción (CSP / HSTS / Permissions-Policy) — `vercel.json`
Se añadieron a la regla `/(.*)`:
- `Content-Security-Policy` completa (`default-src 'self'`, `script-src 'self'`, `worker-src 'self' blob:` — necesario para la galaxia WebGL —, `frame-ancestors 'none'`, `object-src 'none'`, etc.).
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **Verificado:** el build de producción genera un único `<script src="/assets/…">` (sin inline), por lo que `script-src 'self'` no rompe el sitio. `npm run build` → OK.
- ⚠️ **Falta validar en preview** (ver PENDIENTE A): confirmar que el widget de pago y la galaxia cargan con el CSP activo antes de promover a producción.

### 2. Tests del *money-path* — `tests/catalog.test.ts`, `tests/orders.test.ts`, `tests/payments.test.ts`
Cobertura nueva (23 tests en verde):
- **catalog:** ignora el precio del cliente y usa el del servidor; rechaza producto/reserva no permitidos; limita cantidad 1–10; valida tipo.
- **orders:** firma/verifica token; rechaza firma manipulada, token malformado y **token caducado**; deriva `amount`/`amountInCents`.
- **payments:** `verifyMercadoPagoSignature` y `verifyWompiEvent` (firma válida vs inválida); `signature:integrity` determinista de Wompi.

### 3. Expiración de tokens de orden — `api/_lib/orders.ts`
`verifyOrderToken` ahora rechaza tokens con más de **90 días** (configurable con `ORDER_TOKEN_MAX_AGE_DAYS`). También se endureció la comparación de firma con guardia de longitud antes de `timingSafeEqual`.

### 4. Imagen Open Graph / Twitter rota — `index.html`
`og:image` y `twitter:image` apuntaban a `og-banner.jpg` (inexistente). Ahora usan una foto real del estudio (`/images/studio/yoga-clase-grupal.jpg`).
- 🔸 Mejora opcional futura: crear un banner dedicado 1200×630 en vez de reutilizar la foto.

### 6. Formularios: popup de WhatsApp bloqueado — `ContactSection.tsx`, `ContactPage.tsx`, `NewsletterSection.tsx`
El `window.open` estaba dentro de un `setTimeout(…, 500)`, fuera del gesto del usuario → lo bloqueaban los popup blockers. Ahora se abre de forma síncrona y con `noopener,noreferrer`.
- 🔸 Gap de producto pendiente (ver PENDIENTE C): los formularios siguen sin **persistir el lead** en servidor; solo redirigen a WhatsApp.

### 7. Webhooks: orden desconocida → reintentos infinitos — `api/webhooks/mercadopago.ts`, `api/webhooks/wompi.ts`
`getOrderById` para una referencia inexistente lanzaba → respuesta 500 → la pasarela reintentaba sin fin. Ahora una orden desconocida responde **202** (recibido, no procesado).
- Nota de diseño: **no** se reordenó el registro de idempotencia. Registrar el evento *antes* del fulfillment habría creado una regresión (pago aprobado + email fallido = orden marcada como procesada que nunca se reintenta). El fulfillment ya es idempotente (claim de email + `markOrderStatus`).

### 9. `sitemap.xml` con fechas estáticas
`lastmod` actualizado de `2026-03-30` a `2026-07-01` en las 8 URLs.

### 10. Captura real de leads (contacto + newsletter)  *(antes pendiente C)*
- **Backend:** `api/leads.ts` (POST) valida email, honeypot anti-bot y **consentimiento explícito**; persiste en la tabla `leads` (Postgres) vía `recordLead`/`ensureLeadsSchema` en `api/_lib/db.ts`. Degrada con elegancia: si no hay `DATABASE_URL`, responde 200 `{stored:false}` sin romper nada.
- **Frontend:** `ContactSection`, `ContactPage` y `NewsletterSection` ahora envían el lead con `submitLead()` (`src/utils/leads.ts`, *fire-and-forget*, no bloquea la UX) y añaden una **casilla de consentimiento obligatoria** que enlaza a `/privacidad`. Se mantiene el redirect a WhatsApp como canal principal.
- ⚠️ **Dependencia legal:** el almacenamiento de datos personales solo debe activarse en producción **cuando la política de privacidad esté completa** (ver PENDIENTE B). La casilla ya referencia `/privacidad`.

---

## 🟡 PENDIENTE (requieren tu input o un deploy real)

### A. ~~Validar el CSP~~ ✅ VALIDADO EN VIVO (local)
Se sirvió el `dist/` con **exactamente** las cabeceras de `vercel.json` y se cargó en Chrome:
- ✅ La galaxia WebGL (worker `blob:`) **renderiza** (campo de estrellas del hero).
- ✅ Las fuentes de Google cargan (tipografía Cormorant serif visible).
- ✅ **Cero errores de consola / cero violaciones de CSP**.
- El checkout usa `window.location.assign` (navegación de página completa), no afectado por el CSP.
- ⚠️ Pendiente menor: repetir la comprobación en un **preview real de Vercel** antes de producción (confirma que la plataforma emite las cabeceras). Y si en el futuro se activa Google Analytics (`VITE_GA_MEASUREMENT_ID`) o el feed de Instagram (`VITE_IG_FEED_ENDPOINT`), añadir esos dominios a `script-src`/`connect-src` del CSP.

### B. Placeholders legales de privacidad — `src/pages/PrivacyPage.tsx`  *(no puedo resolverlo sin datos)*
Faltan datos reales del negocio: `[RAZÓN SOCIAL]`, `[NIT]`, `[CORREO HABEAS DATA]`, `[DIRECCIÓN LEGAL]`. Obligatorio para Habeas Data (Colombia). **Necesito que me pases estos datos** y los completo. (No los invento por ser información legal.)

### C. ~~Captura de leads~~ ✅ RESUELTO — ver punto 10 arriba
Implementada sobre la BD Postgres existente. Pendiente opcional: si prefieres además un proveedor externo (Mailchimp/Brevo) o un evento de analítica, dímelo y lo integro.

### D. Dominio `.co` vs `.net`  *(decisión consciente — recordatorio)*
`canonical`, `sitemap.xml`, `robots.txt`, OG y `.env.example` usan `innerspirit.co` **a propósito** (per memoria del proyecto). Recordatorio: al lanzar en `innerspirit.net`, alinear estos valores o el SEO se resiente. No es un bug.

---

## ✅ Verificado y correcto (sin acción)
- Secretos: `.env*` correctamente ignorados; nada commiteado; `dist/` no trackeado.
- Pagos: precios forzados desde el catálogo del servidor; firmas con `crypto.timingSafeEqual`; idempotencia por `idempotency_key` + `payload_hash`; `ORDER_TOKEN_SECRET`/`DATABASE_URL` obligatorios en producción.
- SQL parametrizado ($1, $2…) → sin SQLi. `confirm.ts` escapa HTML. Sin `dangerouslySetInnerHTML`/`eval`.

## Verificación ejecutada
- `npm run test:run` → **23/23** en verde (4 archivos).
- `npm run lint` (`tsc --noEmit`) → **sin errores**.
- `npm run build` → **OK**; `dist/index.html` sin scripts inline (compatible con `script-src 'self'`).

> Los cambios están en el working tree, **sin commitear**. Dime si quieres que los commitee.
