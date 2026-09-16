# Auditoría Técnica SEO — Inner Spirit (sitio en línea)

**Fecha:** 2026-09-11
**Sitio auditado:** https://www.innerspirit.net (WordPress + Rank Math PRO + WooCommerce/Dokan + Eventin Pro)
**Dominio del código nuevo (no publicado):** https://innerspirit.co (React/Vite/Tailwind)
**Método:** fetch directo (curl/requests con distintos User-Agents, incluido Googlebot), inspección de HTML/headers, `openssl s_client`, DNS/TLS handshake nativo. No se usó Lighthouse/CrUX (fuera de alcance); las observaciones de Core Web Vitals son estimaciones de laboratorio basadas en inspección de fuente.
**Páginas cubiertas:** `/` (home), `/studio/`, `/eventos/`, `/consultorio/`, `/clases-semanales/`, `/tienda/`, `/contacto/` + nivel de dominio para `innerspirit.net` e `innerspirit.co`.

---

## Hallazgo #1: Dominio dividido — el código nuevo apunta a un dominio muerto

**Estado: CRITICAL**

- `https://innerspirit.co` (dominio canónico configurado en el repo nuevo) **no sirve el sitio**. Diagnóstico con `openssl s_client -connect innerspirit.co:443`:
  ```
  9C3B0000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
  ```
  El servidor resuelve por DNS (`217.160.0.223`, IPv6 `2001:8d8:100f:f000::200`) pero **aborta el handshake TLS con `internal_error`** — típico de un host que no tiene certificado configurado para ese SNI (dominio aparcado/sin sitio real desplegado). `www.innerspirit.co` ni siquiera resuelve (`Non-existent domain`).
  - Por HTTP (puerto 80, sin cifrar) el dominio SÍ responde, pero sirve la **página por defecto de 1&1 IONOS** (registrador/hosting alemán): `<html lang="de-DE">`, `<title></title>` vacío, `<meta name="robots" content="noindex,nofollow">`, `copyright: 1&1 IONOS SE`. Esto confirma que `.co` está registrado pero **no tiene el hosting del sitio nuevo conectado**, ni certificado SSL emitido — es un placeholder de registrador, no un servidor con errores intermitentes.
- Mientras tanto, `https://innerspirit.net` (y su alias `www.innerspirit.net`) está en línea, con certificado Let's Encrypt válido (`*.innerspirit.net`, vigente hasta 2026-11-14), y sirve una versión **antigua** del sitio: WordPress con nav Home/Studio/Events/Consultory/Shop/Contact, contacto `contacto@innerspirit.net`, sin relación de código con el repo React/Vite en desarrollo.

**Impacto:**
1. Todo el trabajo de SEO on-page, metadatos, JSON-LD, `sitemap.xml`, etc. que se configure en el repo nuevo (apuntando a `.co`) **es invisible para Google hasta que exista un servidor real detrás de ese dominio con TLS válido**. Ahora mismo, publicar el nuevo sitio en `.co` fallaría inmediatamente por el mismo error TLS que ve cualquier crawler.
2. Google, usuarios y redes sociales seguirán viendo `.net` (contenido desactualizado: nombre de marca distinto, nav distinta, sin mención de Portugal/Chicago) como la única versión real del sitio.
3. Si en algún momento se lanza `.co` sin plan de migración (redirects 301 histórico `.net` → `.co`, actualización de Search Console, `Sitemap` cruzado, backlinks), se corre el riesgo de un **"domain split" permanente**: autoridad de enlaces y posicionamiento histórico acumulados en `.net` no transferirán a `.co`, y ambos dominios podrían competir/canibalizarse si `.net` sigue en línea después del lanzamiento.

**Recomendación:**
- Decidir **un solo dominio canónico** antes de publicar el sitio nuevo (recomendado: mantener `innerspirit.net` si ya tiene autoridad/backlinks, o ejecutar una migración formal 301 `.net → .co` con actualización de GSC "Cambio de dirección", sitemap, hreflang y backlinks conocidos).
- Si se conserva `.co`, hay que: (a) apuntar el DNS al hosting real del sitio nuevo, (b) emitir certificado TLS válido para `innerspirit.co` y `www.innerspirit.co`, (c) verificar que `www.innerspirit.co` también resuelva (hoy no existe registro DNS).
- No dejar ambos dominios sirviendo contenido en paralelo sin `rel=canonical`/301 entre ellos — eso genera contenido duplicado a nivel de dominio.

---

## Hallazgo relacionado — el sitio HOY EN LÍNEA (.net) tiene `noindex, nofollow` en TODAS las páginas revisadas

**Estado: CRITICAL**

Verificado en las 7 páginas descargadas (home, studio, eventos, consultorio, clases-semanales, tienda, contacto), con User-Agent normal **y** con User-Agent `Googlebot/2.1` explícito (mismo resultado, sin cloaking):

```html
<meta name="robots" content="nofollow, noindex"/>
```

Generado por Rank Math PRO (comentario `<!-- Search Engine Optimization by Rank Math PRO -->` visible en el `<head>`), consistente en todo tipo de contenido (Página estática, Página de tienda WooCommerce, Contacto) → indica una **regla global** en Rank Math (Títulos y Meta) marcando el tipo de contenido "Páginas" (y probablemente el sitio entero) como no indexable, no una directiva accidental de una sola página.

**Impacto:** Si esta directiva lleva tiempo activa, Google **eliminará progresivamente estas URLs de su índice** en los próximos rastreos — el sitio "vivo" que hoy aparentemente aún posiciona puede perder visibilidad orgánica antes de que el sitio nuevo esté listo para reemplazarlo. Esto convierte el problema de "dominio dividido" en un riesgo de **doble pérdida**: ni `.net` va a seguir indexado, ni `.co` está operativo.

**Recomendación (urgente, antes que cualquier otra tarea SEO):**
1. Confirmar en Google Search Console (cobertura del dominio `innerspirit.net`) cuántas URLs siguen indexadas hoy vs. excluidas por "noindex".
2. Si el noindex fue intencional (p. ej. preparando el apagado de `.net`), documentarlo y coordinar el timing con el lanzamiento de `.co`. Si fue accidental, quitar la regla global de Rank Math inmediatamente (Rank Math → Títulos y Meta → Páginas / Ajustes globales → Robots Meta).
3. Revisar también `robots.txt` (ver sección Crawlability) — no bloquea el rastreo, así que Google puede seguir viendo el `noindex` en cada visita y confirmar la exclusión.

---

## Resumen ejecutivo

| Categoría | Estado |
|---|---|
| Crawlability (robots.txt, sitemap) | Pass parcial — sitemap correcto, pero ver noindex arriba |
| Indexability (canonical, noindex, duplicados) | **Fail crítico** |
| Seguridad (HTTPS, headers) | Fail — TLS ok en `.net`, headers de seguridad ausentes; `.co` sin TLS funcional |
| Estructura de URL / redirects | Pass con observación menor |
| Mobile-friendliness | Pass (viewport correcto) |
| Core Web Vitals (estimado de fuente) | Fail — bloat masivo de CSS/JS render-blocking |
| Datos estructurados | Parcial — presentes pero con uso incorrecto de tipo `Article` |
| Renderizado JS | Pass — SSR/HTML completo en el HTML inicial (no es SPA) |
| IndexNow | No implementado |

**Score técnico estimado: 32/100** (dominado por noindex site-wide + dominio de destino inoperante; sin esos dos hallazgos el resto del sitio rondaría ~65/100).

---

## CRITICAL

1. **Dominio dividido `.net` vs `.co`** — ver Hallazgo #1 arriba. `innerspirit.co` sin TLS operativo / sin hosting conectado.
2. **`meta robots: noindex, nofollow` en las 7 páginas auditadas de `innerspirit.net`** (verificado con UA normal y Googlebot). Ver hallazgo relacionado arriba.
3. **Ausencia total de `rel=canonical`** en las 7 páginas revisadas. Confirmado por inspección directa del `<head>` (no solo por regex): ni Rank Math ni el tema inyectan `<link rel="canonical">` en ninguna página. Combinado con el noindex, deja al sitio sin ninguna señal de indexación válida. WooCommerce (`/tienda/`) es especialmente sensible a duplicados de parámetros de filtro sin canonical.

## HIGH

4. **62 hojas de estilo CSS bloqueantes de render + 86 `<script>` en `<head>` (solo 5 con `defer`/`async`) en la home.** Ejemplo de conteo real sobre `home.html`:
   - `CSS FILES IN HEAD: 62`
   - `SCRIPTS IN <HEAD>: 86` (81 sin `defer`/`async`)
   - HTML de la home pesa 724 KB sin comprimir (gzip lo reduce en tránsito, pero el DOM y el trabajo de parseo/CSSOM siguen siendo pesados).
   Esto es consistente con degradación de **LCP** (bloqueo de render antes del primer pintado) e **INP** (129 scripts incluyendo jQuery, jQuery Migrate, React 18 + React-DOM completos cargados en el frontend — normalmente reservados al editor Gutenberg del admin, no deberían cargarse en páginas públicas — más Dokan/iziModal/SweetAlert2/Swiper). Alto riesgo de "Needs Improvement" a "Poor" en LCP e INP en campo real.
5. **Contenido delgado (thin content) en varias páginas clave**, medido como texto visible real (excluyendo `<script>`/`<style>`):
   | Página | Palabras visibles (aprox.) |
   |---|---|
   | Home | 471 |
   | Studio | 254 |
   | Tienda | 246 |
   | Eventos | 204 |
   | Consultorio | 165 |
   | Contacto | 136 |
   | Clases semanales | 102 |
   Páginas de servicio con menos de ~200 palabras (Consultorio, Contacto, Clases semanales) son candidatas típicas a bajo desempeño orgánico incluso si se resuelve el noindex.
6. **Ausencia de `<h1>` en 5 de las 7 páginas auditadas** (Studio, Eventos, Consultorio, Clases-semanales, Tienda no tienen ningún `<h1>`; Home y Contacto sí lo tienen, pero ambas reutilizan el mismo texto `"Ven y Visitanos!"` como H1 en dos páginas distintas — señal de plantilla compartida sin ajuste por página).
7. **Sin cabeceras de seguridad en ninguna respuesta HTTP revisada**: no hay `Strict-Transport-Security` (HSTS), `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` ni `Permissions-Policy` en home ni en contacto (verificado con `curl -D -`). Riesgo de clickjacking/MIME-sniffing y pérdida de puntos en auditorías de seguridad que también afectan confianza/EEAT indirectamente.

## MEDIUM

8. **Título y meta description con comillas literales incrustadas** (bug de plantilla, presente en las 7 páginas): p. ej. `<title>&quot;Yoga y Meditación en La Candelaria Bogotá | Inner Spirit Studio&quot;</title>` — el texto se pegó en Rank Math incluyendo las comillas del output de un asistente de IA. Esto se ve en SERP como: `"Yoga y Meditación en La Candelaria Bogotá | Inner Spirit Studio"` con comillas visibles, dañando CTR y apariencia profesional. Mismo patrón en `og:title`, `twitter:title` y meta description de las 7 páginas.
9. **Longitud de título excesiva**: home = 75 caracteres (con comillas), tienda = 92 caracteres — Google truncará varios de estos en SERP (~60 car. recomendados).
10. **Esquema `Article` aplicado a páginas que no son artículos/blog** (home, studio, etc. incluyen `"@type":"Article"` en el JSON-LD generado por Rank Math, con `headline`, `author`, `datePublished`), cuando el contenido real es una página de servicio/landing, no contenido editorial. Riesgo de advertencias en Search Console ("Elementos no válidos" en Article/Rich Results) y de que Google ignore el schema.
11. **Cadena de redirección duplicada para la variante HTTP sin `www`**: `http://innerspirit.net/` → `https://innerspirit.net/` (301) → `https://www.innerspirit.net/` (301) = 2 saltos. Se puede colapsar a un solo 301 directo a `https://www.innerspirit.net/`.
12. **`robots.txt` con dos bloques `User-agent: *` separados** (uno del CMS/Rank Math con `Sitemap:` y disallows de WooCommerce, y otro añadido aparentemente por una capa de seguridad del hosting con `Disallow: /imunify-bot-check`). Funcionalmente no bloquea nada crítico, pero es una señal de configuración no centralizada; conviene consolidar en un solo bloque para evitar ambigüedad de parseo entre crawlers.
13. **Cero hreflang** en las páginas revisadas — irrelevante para el `.net` actual (mono-idioma `es`), pero **crítico a futuro**: el repo nuevo ya contempla Portugal (`src/pages/PortugalPage.tsx`) y mercado Chicago/EE.UU. Cuando se publique el sitio internacional, se necesitará una estrategia de `hreflang`/subcarpetas de idioma coordinada con el dominio canónico único (ver sub-skill `seo-hreflang` para detalle de implementación).

## LOW

14. **6 de 17 imágenes en la home sin `width`/`height` explícitos** → riesgo de **CLS** (layout shift) mientras cargan; 8 de 17 sin atributo `loading` (aunque el sitio sí usa `loading="lazy"` en varias imágenes, no es consistente).
15. **`Cache-Control: no-store, no-cache, must-revalidate` en el HTML de todas las páginas** — correcto para HTML dinámico de WordPress, pero confirma que no hay capa de cache de página (ej. LiteSpeed Cache a nivel de página) activa, lo que puede empeorar TTFB bajo carga y por ende LCP.
16. **IndexNow no implementado** (sin archivo de clave IndexNow ni plugin detectado) — de bajo impacto inmediato, pero fácil de añadir (plugin Rank Math ya soporta integración, o plugin dedicado) para notificar a Bing/Yandex/Naver de cambios sin esperar rastreo.
17. **`og:locale` = `es_MX`** en vez de `es_CO` en todas las páginas — inconsistencia menor de localización dado que la marca opera en Bogotá, Colombia.

---

## Verificación de sitemap y crawlability (positivo)

- `robots.txt` (`https://www.innerspirit.net/robots.txt`) declara correctamente `Sitemap: https://www.innerspirit.net/sitemap_index.xml` y esta URL responde `200 OK` con un índice válido generado por Rank Math (7 sub-sitemaps: post, page, product, eventin, eventin-schedule, category, local), con `lastmod` recientes (jun-2025). Esta es la única señal "Pass" fuerte de la auditoría — pero queda neutralizada en la práctica por el `noindex` global (Hallazgo relacionado arriba): Google puede descubrir las URLs vía sitemap pero las excluirá del índice de todas formas.
- `sitemap.xml` (sin sufijo) y `wp-sitemap.xml` devuelven 301 (redirigen a rutas canónicas de WP/Rank Math) — comportamiento correcto, no hay declaración "stale" de sitemap en robots.txt.

## Renderizado / JavaScript

- El sitio es **server-rendered por WordPress** (no SPA): el HTML inicial ya contiene todo el contenido visible y el marcado semántico completo; no depende de hidratación de React/Vue en el cliente para ser indexable. No se detectaron contenedores vacíos tipo `#root`/`#app`. El `render_page.py --mode auto` no debería activar Playwright aquí.
- El repo nuevo (React/Vite) sí deberá revisarse aparte una vez publicado en un dominio funcional, para confirmar si usa SSR/SSG (recomendado) o CSR puro (que sí requeriría verificación con Playwright para indexabilidad).

---

## Evidencia técnica cruda (para referencia)

- TLS `.co`: `openssl s_client -connect innerspirit.co:443 -servername innerspirit.co` → `SSL alert number 80` (internal_error), `Verify return code: 0 (ok)` pero sin certificado de par entregado.
- HTTP `.co` (puerto 80): responde con página de IONOS, `<html lang="de-DE">`, `<meta name="robots" content="noindex,nofollow">`, `copyright 1&1 IONOS SE`.
- TLS `.net`: `CN=*.innerspirit.net`, emisor Let's Encrypt (`YR1`), válido `2026-08-16` a `2026-11-14`.
- `curl -A Googlebot https://www.innerspirit.net/` → mismo `<meta name="robots" content="nofollow, noindex"/>` que con UA estándar (sin cloaking).
- Sitemap index: `https://www.innerspirit.net/sitemap_index.xml` (200 OK, 7 sub-sitemaps).
- Páginas descargadas y analizadas: home, `/studio/`, `/eventos/`, `/consultorio/`, `/clases-semanales/`, `/tienda/`, `/contacto/` (todas HTTP 200, sin redirects internos).

## Próximos pasos recomendados (orden de prioridad)

1. Confirmar en Search Console el estado real de indexación de `innerspirit.net` y decidir si el `noindex` fue intencional.
2. Definir el dominio canónico único para el relanzamiento (`.net` vs `.co`) y plan de migración 301 si aplica.
3. Conectar hosting + emitir TLS válido para `innerspirit.co` (y `www.innerspirit.co`) antes de considerar cualquier cambio de DNS de producción.
4. Si se decide seguir operando `.net` mientras se termina el sitio nuevo: quitar el `noindex` global, añadir `rel=canonical` autoreferencial en cada plantilla, corregir el bug de comillas en título/descripción, y añadir un `<h1>` único por página.
5. Auditar y reducir el bundle CSS/JS de WordPress (deshabilitar carga de assets de Gutenberg/React en frontend si no se usan bloques que los requieran, combinar/differ CSS, `defer` en scripts no críticos) antes de medir Core Web Vitals con herramientas de lab (PageSpeed Insights/Lighthouse).
6. Añadir cabeceras de seguridad (HSTS, CSP, X-Content-Type-Options, Referrer-Policy) a nivel de servidor/CDN.
