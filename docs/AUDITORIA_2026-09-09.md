# Auditoría full-stack — diseño, backend, frontend, deploy

> **2026-09-09.** Rama `main` (post-merge de `feat(php): backend cPanel
> Apache+MySQL` y del deploy vía Git nativo de cPanel). No repite lo ya
> verificado en `REVISION-PROFUNDA.md` (a11y/SEO/perf, 2026-07-02) ni en
> `BRECHAS-Y-PENDIENTES.md` (seguridad de pagos, 2026-07-01) salvo para
> confirmar que sigue vigente. Foco especial en **diseño**.

---

## 1. Diseño

### 1.1 Confirmado: cero cambios visuales desde julio
El commit que agregó el backend PHP (`c08643c`) tocó 2 líneas de
`CheckoutModal.tsx` (un `fetch()` con URL relativa al mismo origen) y nada
más en `src/`. `design-system/MASTER.md`, componentes de `ui/`,
`sections/`, `layout/` y todo el CSS siguen intactos. Las conclusiones de
`REVISION-PROFUNDA.md` (CLS, SEO por ruta, `prefers-reduced-motion`, a11y)
**siguen vigentes tal cual**.

### 1.2 ✅ Reparado — `design-system/MASTER.md` estaba desactualizado frente al código real
La tabla de "Semantic Tokens" documentaba 9 tokens; `src/index.css` define
16. Al verificar uso real (`grep` en `src/`), resultó que de los 7 tokens
faltantes, **4 sí se usan** (`--is-color-night-panel` en
`.is-surface--dark`, `--is-color-muted` en `.is-copy`,
`--is-color-muted-soft` en `.is-page-lead`) y **3 están declarados pero
nunca consumidos** en ningún `.css`/`.tsx` del proyecto:
`--is-color-sage`, `--is-color-olive`, `--is-line-warm`.

Actualicé la tabla con los 4 usos reales documentados y marqué los 3
tokens muertos como *(reserved, unused)* en vez de inventarles un uso.
Quedan como decisión abierta para quien toque el design system: usarlos
pronto o eliminarlos de `index.css` si no hay plan para ellos.

### 1.3 Verificado — adopción real de los primitivos del design system
`is-section`, `is-shell`, `is-action`, `is-surface` y `EditorialHeader`
aparecen **119 veces en 35 archivos** de `src/` — todas las páginas y
secciones principales los usan (`HomePage`, `AboutPage`, `ClassesPage`,
`ContactPage`, `ShopSection`, `EspacioPage` y sus subsecciones, etc.). No
hay evidencia de secciones "huérfanas" reinventando layout con Tailwind
crudo en vez de los primitivos compartidos. Buena disciplina de sistema.

### 1.4 Sin acción — solapamiento Section↔Page ya identificado
`ClassesSection`↔`ClassesPage` y `AboutSection`↔`AboutPage` siguen
compartiendo marcado similar sin extraerlo (ya señalado como refactor
opcional en `REVISION-PROFUNDA.md` #2). Sigue siendo bajo riesgo/bajo
valor tocarlo ahora; solo hazlo si vuelves a esas páginas por otra razón.

---

## 2. Backend (Node/Vercel + PHP/cPanel)

### 2.1 Verificado — paridad criptográfica 1:1 real, no solo documentada
Comparé línea por línea `api/_lib/payments.ts` vs
`server-php/api/_lib/payments.php`:
- Firma Wompi (`signature:integrity`, SHA-256) — idéntica.
- Verificación de webhook Mercado Pago (`HMAC-SHA256` sobre
  `id:...;request-id:...;ts:...;`) — idéntica, incluye el mismo parseo
  manual de `data.id` para evitar que PHP/Node conviertan `.`→`_` en query
  params.
- Verificación de evento Wompi (checksum SHA-256 sobre propiedades
  anidadas + timestamp + secreto) — idéntica.
- Ambas usan comparación en tiempo constante (`crypto.timingSafeEqual` /
  `hash_equals`), no `===`/`==`.

### 2.2 Verificado — bootstrap de esquema consistente (no es un gap)
`db.php` bootstrapea las tablas con `CREATE TABLE IF NOT EXISTS` en
runtime (igual patrón que `db.ts` para Postgres), y `schema.sql` es una
copia explícita para poder correrla a mano en MySQL si el usuario de BD
no tiene privilegio `CREATE TABLE` en cPanel. Ambos caminos definen las
mismas 5 tablas (`orders`, `order_items`, `webhook_events`,
`email_deliveries`, `leads`) con las mismas columnas. Redundancia
intencional, no duplicación accidental.

### 2.3 Verificado — manejo de errores no filtra internals al cliente
Los 7 endpoints PHP (`checkout`, `leads`, `orders/{confirm,pdf,status}`,
`webhooks/{mercadopago,wompi}`) tienen un `catch (Throwable ...)` de tope
que responde con mensajes genéricos o sanitizados
(`checkout_client_message()`), nunca `$e->getMessage()` crudo. Los
webhooks devuelven `202`/`500` genéricos sin detalle interno — coherente
con el fix de reintentos infinitos ya documentado en
`BRECHAS-Y-PENDIENTES.md` #7.

### 2.4 🟡 No verificable desde el repo — `display_errors` del hosting real
Ningún script PHP fija `ini_set('display_errors', '0')` ni
`error_reporting()` explícitamente; dependen 100% del `php.ini` del
hosting. El `catch (Throwable)` de tope cubre las excepciones normales,
pero un **fatal error de PHP** (p. ej. sintaxis, tipo incompatible antes
de llegar al `try`) sí respetaría `display_errors` del servidor. Si el
host lo trae en `On` (común en cPanel compartido por defecto "developer
friendly"), un fatal filtraría rutas de archivo del servidor. Súmalo al
checklist de activación (`multiphp.md`): confirmar `display_errors = Off`
en producción vía MultiPHP INI Editor.

---

## 3. Frontend

### 3.1 Verificado
- `npm run build` → OK, sin warnings.
- `npm run lint` (`tsc --noEmit`) → sin errores.
- `npm run test:run` → **23/23 en verde** (4 archivos), igual que en julio.

### 3.2 🟡 Hallazgo — flakiness del pool de Vitest en este entorno (Windows)
Durante `test:run` en esta máquina, Vitest reportó 3 "Unhandled Error"
(`Failed to start forks worker` / `Timeout waiting for worker to
respond`) para `navigation.test.tsx`, `orders.test.ts` y `payments.test.ts`
antes de que los 4 archivos terminaran en verde vía reintento automático.
No es un bug de la suite — es overhead de spawnear procesos hijo en
Windows (antivirus/IO) con el pool `forks` por defecto de Vitest. Si algún
día corre esto en CI (GitHub Actions con runner Windows, o local
consistentemente lento), puede causar falsos rojos intermitentes. Mitigación
si se vuelve molesto: `test.pool: 'threads'` en `vitest.config.ts`, o subir
`testTimeout`/`hookTimeout`.

---

## 4. Deploy

| Vía | Estado |
| --- | --- |
| **Vercel** (`vercel.json`, primaria) | Documentada y funcional; es el host de referencia en `docs/ARCHITECTURE.md`. |
| **cPanel manual** (`npm run pack:cpanel` → zip) | Corregido esta sesión (bug de `tar` con letra de unidad en Windows); regenerado y verificado (`deploy/innerspirit-deploy.zip`, contenido completo confirmado). |
| **cPanel vía Git nativo** (`.cpanel.yml`, nuevo) | Agregado esta sesión. **Sin verificar en un hosting real** — asume que el host ofrece "Setup Node.js App" para poder correr `npm run build` en el deploy. Ver `docs/DEPLOY_CPANEL_GIT.md` sección 0. |

### Pendientes de negocio (no técnicos, ya conocidos)
- `PrivacyPage.tsx`: 5 placeholders legales sin rellenar (`[RAZÓN SOCIAL]`, `[NIT]`, etc.).
- Mismatch de dominio `innerspirit.co` (sitemap/canonical/`.env.example`) vs `innerspirit.net` (`secure_config.example.php`, `multiphp.md`).

---

## Resumen ejecutivo

| Área | Estado |
| --- | --- |
| Diseño | ✅ Sin cambios ni regresiones. ✅ Doc del design system reparada (tabla de tokens sincronizada; 3 tokens resultaron muertos, no solo sin documentar). |
| Backend | ✅ Paridad Node/PHP verificada a nivel de código, no solo de intención. 🟡 `display_errors` del hosting real sin confirmar. |
| Frontend | ✅ Build/lint/tests en verde. 🟡 Flakiness de infraestructura de test en Windows, no del código. |
| Deploy | ✅ Vercel y zip manual funcionales (bug de Windows corregido). 🟡 Deploy vía Git de cPanel es nuevo, pendiente de probar contra un hosting real. |

Nada de lo anterior es bloqueante. Los tres 🟡 son de bajo esfuerzo: sincronizar una tabla de markdown, confirmar un flag de PHP en el panel del hosting, y ajustar el pool de Vitest si el flakiness se repite.
