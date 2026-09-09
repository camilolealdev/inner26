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

### 11. Reorganización de estructura del frontend (`src/` y `docs/`)
- Se movieron `App.tsx`, `index.tsx` e `index.css` dentro de `src/`.
- Se corrigieron los alias en `tsconfig.json`, `vite.config.ts`, `vitest.config.ts` y las referencias en `index.html`.
- Se sincronizaron tipos de React 18 (`@types/react-dom: 18.3.7`).

### 12. Endurecimiento de seguridad en Apache / cPanel
- Regla en `public/.htaccess`: bloqueo de acceso web directo a `api/_lib/`, `api/vendor/` y `_setup/` (`RewriteRule ^(api/(_lib|vendor)|_setup)(/.*)?$ - [F,L]`).
- Añadidos `.htaccess` dedicados con `Require all denied` en `server-php/api/_lib/` y `server-php/api/vendor/`.

### 13. Automatización de despliegue para cPanel
- Creado `scripts/pack-cpanel.js` ejecutable mediante `npm run pack:cpanel` y `make deploy:cpanel`.
- Regenerado el paquete listo para producción: `deploy/innerspirit-deploy.zip` (2.91 MB) con paridad 1:1 de frontend compilado, backend PHP nativo, dependencias PHPMailer y scripts SQL/guías de setup.

---

## 🟡 PENDIENTE (requieren tu input o un deploy real)

### A. ~~Validar el CSP~~ ✅ VALIDADO EN VIVO (local)
Se sirvió el `dist/` con **exactamente** las cabeceras de `vercel.json` y se cargó en Chrome:
- ✅ La galaxia WebGL (worker `blob:`) **renderiza** (campo de estrellas del hero).
- ✅ Las fuentes de Google cargan (tipografía Cormorant serif visible).
- ✅ **Cero errores de consola / cero violaciones de CSP**.
- El checkout usa `window.location.assign` (navegación de página completa), no afectado por el CSP.
- ⚠️ Pendiente menor: al lanzar en producción, si en el futuro se activa Google Analytics (`VITE_GA_MEASUREMENT_ID`) o el feed de Instagram (`VITE_IG_FEED_ENDPOINT`), añadir esos dominios a `script-src`/`connect-src` del CSP.

### B. Placeholders legales de privacidad — `src/pages/PrivacyPage.tsx`  *(requiere datos del negocio)*
Faltan datos reales del negocio: `[RAZÓN SOCIAL]`, `[NIT]`, `[CORREO HABEAS DATA]`, `[DIRECCIÓN LEGAL]`. Obligatorio para cumplimiento estricto de Habeas Data (Colombia).

### C. ~~Captura de leads~~ ✅ RESUELTO — ver punto 10 arriba
Implementada sobre MySQL/Postgres. Si además requieres integración con Mailchimp o Brevo, indícalo para activarlo.

### D. Dominio `.co` vs `.net`  *(decisión consciente — recordatorio)*
`canonical`, `sitemap.xml`, `robots.txt`, OG y `.env.example` usan `innerspirit.co` **a propósito** (per memoria del proyecto). Recordatorio: al lanzar en `innerspirit.net`, alinear estos valores o configurar redirección 301.

### E. Pasos de activación en cPanel (checklist de subida)
1. **PHP:** En cPanel → *MultiPHP Manager*, seleccionar `innerspirit.net` y asignar PHP 8.1 u 8.2 (ver `server-php/multiphp.md`).
2. **Base de Datos:** En cPanel → *MySQL Databases*, crear base de datos y usuario con privilegios totales.
3. **Secretos:** Copiar `_setup/secure_config.example.php` a `/home/<usuario_cpanel>/secure_config/config.php` y rellenar credenciales de BD y pasarelas.
4. **Archivos web:** Descomprimir `deploy/innerspirit-deploy.zip` directamente dentro de `public_html/`.

---

## ✅ Verificado y correcto (sin acción)
- Secretos: `.env*` correctamente ignorados; nada commiteado; `dist/` no trackeado.
- Pagos: precios forzados desde el catálogo del servidor; firmas con `crypto.timingSafeEqual`; idempotencia por `idempotency_key` + `payload_hash`; `ORDER_TOKEN_SECRET` obligatorio en producción.
- SQL parametrizado ($1, $2… en Node / PDO bindings en PHP) → sin SQLi. `confirm.php` escapa HTML. Sin `dangerouslySetInnerHTML`/`eval`.
- Backend PHP paridad 1:1 con Node.

## Verificación ejecutada
- `npm run test:run` → **23/23** en verde (4 archivos).
- `npm run lint` (`tsc --noEmit`) → **sin errores**.
- `npm run build` → **OK**; `dist/index.html` sin scripts inline (compatible con CSP `script-src 'self'`).
- `npm run pack:cpanel` → **OK**; `deploy/innerspirit-deploy.zip` (2.91 MB) listo para subida.
