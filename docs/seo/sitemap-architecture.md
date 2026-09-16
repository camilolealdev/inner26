# Arquitectura de Sitemap y URLs — Inner Spirit (Colombia / Portugal / Chicago)

Fecha: 2026-09-11
Alcance: `public/sitemap.xml`, `src/context/NavigationContext.tsx`, `src/App.tsx`, `index.html`, `public/.htaccess`, y estado real en línea de `innerspirit.net` / `innerspirit.co`.

---

## 0. Hallazgo crítico (bloqueante) — antes de hablar de clusters

**El dominio canónico hardcodeado en el código nuevo (`innerspirit.co`) NO es el sitio de Inner Spirit.**

Verificado en vivo (2026-09-11):

| URL | Resultado |
|---|---|
| `http://innerspirit.co/` | HTTP 200, pero sirve una landing parqueada de **1&1 IONOS** en alemán (`lang="de-DE"`), `<meta name="robots" content="noindex,nofollow">`, sin ninguna relación con Inner Spirit. |
| `https://innerspirit.co/` | Falla de conexión (sin dueño confirmado del certificado en este entorno). |
| `https://innerspirit.net/` | 301 → `https://www.innerspirit.net/` (200 OK). Este es **el sitio real y en producción**: WordPress + WooCommerce + Dokan (marketplace) + Eventin (eventos) + Rank Math SEO. |

Sin embargo, todo el código nuevo (`index.html`, `App.tsx` → objeto `pageSEO`, `public/sitemap.xml`, `public/robots.txt`) apunta a `innerspirit.co` como canonical/OG/sitemap `Sitemap:` — es decir, **el sitio nuevo se está preparando para lanzar en un dominio que hoy es un parking page ajeno, no en el dominio que el negocio realmente opera**. Esto no es un detalle de "cambio de marca" pendiente: si se publica tal cual, todo el `<link rel="canonical">`, Open Graph y el propio sitemap apuntarán a una URL que Google ve como noindex/no relacionada, y ningún backlink/autoridad histórica de `innerspirit.net` se transferirá.

**Acción obligatoria antes de cualquier otro paso:** confirmar con el negocio (a) si `.co` es un dominio nuevo que van a comprar/activar y migrar tráfico vía 301 desde `.net`, o (b) si `.net` sigue siendo el dominio de marca y el canonical en el código es un error de placeholder que hay que corregir a `innerspirit.net`. Todo lo que sigue en este documento asume que se resolverá esta ambigüedad antes de tocar sitemaps de producción; las recomendaciones de arquitectura son válidas para cualquiera de los dos dominios, pero **deben aplicarse sobre el dominio real**, no sobre `.co` sin verificar.

---

## 1. Auditoría del sitemap actual del repo (`public/sitemap.xml`)

```
https://innerspirit.co/                (priority 1.0, changefreq weekly)
https://innerspirit.co/nosotros
https://innerspirit.co/clases
https://innerspirit.co/eventos
https://innerspirit.co/consultorio
https://innerspirit.co/tienda
https://innerspirit.co/blog
https://innerspirit.co/contacto
https://innerspirit.co/portugal        (único indicio de internacionalización)
```

| Check | Resultado |
|---|---|
| XML válido | ✅ Bien formado, un solo `<urlset>`, sin namespace roto. |
| Límite 50k URLs / 50MB | ✅ 9 URLs, muy por debajo. |
| `priority` / `changefreq` | ⚠️ Info: presentes en todas las entradas. Google los ignora desde hace años; no son error pero son ruido a limpiar quirúrgicamente (no urgente). |
| `lastmod` | 🛑 **Todas las páginas comparten `2026-07-01`** excepto `/portugal` con `2026-09-11`. Un lastmod idéntico en 8 de 9 URLs es la señal clásica de "fecha de deploy", no de "última edición significativa de contenido" — Google la descuenta como no confiable. |
| Falta `/espacio` | 🛑 `EspacioPage` existe en el código (`App.tsx`, `PageName: 'espacio'`) y tiene ruta `/espacio`, pero **no está en el sitemap**. Página huérfana de sitemap. |
| Falta `/privacidad` | ⚠️ Falta también, aunque es de bajo valor SEO (correcto omitirla, pero decisión debe ser explícita, no accidental). |
| Dominio | 🛑 Ver Hallazgo 0 — `innerspirit.co` no es el dominio en producción real. |
| `hreflang` | 🛑 No existe ningún mecanismo de `hreflang` (ni en el sitemap ni en `<head>`). `/portugal` está en portugués pero no hay `hreflang="pt"` ni `x-default`. Con solo 1 URL alterna hoy no rompe nada, pero **no hay ninguna infraestructura para agregarlo** cuando crezcan los clusters. |
| Consistencia de idioma en la URL | ⚠️ `/portugal` es un nombre de página en español para contenido en portugués (debería ser algo como `/pt/` si se usa subdirectorio de idioma, o mantenerse como cluster de país `/portugal/...` si el idioma se maneja aparte — ver sección 3). |
| robots.txt → Sitemap: | Apunta a `https://innerspirit.co/sitemap.xml`, coherente con el canonical roto del Hallazgo 0. |

**Conclusión de la auditoría del repo:** el sitemap es técnicamente válido pero (a) apunta a un dominio no confirmado/no controlado, (b) tiene fechas falsas, (c) tiene una página huérfana (`/espacio`), y (d) no tiene ninguna base de i18n/hreflang para escalar a 3 países.

---

## 2. Estado real en línea: `innerspirit.net` (WordPress, hoy indexado)

`robots.txt` de `www.innerspirit.net` declara:
```
Sitemap: https://www.innerspirit.net/sitemap_index.xml
```

Índice de sitemaps de Rank Math (`sitemap_index.xml`) con 7 sub-sitemaps:

| Sub-sitemap | URLs | Contenido / hallazgo |
|---|---|---|
| `page-sitemap.xml` | 24 | Mezcla páginas reales (`/`, `/contacto/`, `/tienda/`, `/consultorio/`, `/eventos/`, `/clases-semanales/`, `/studio/`, `/sobre-nosotros/`, `/proximos-eventos/`, `/politica-privacidad/`) **con páginas transaccionales/boilerplate de WooCommerce y Dokan** que no deberían estar indexadas: `/carrito/`, `/finalizar-compra/`, `/mi-cuenta/`, `/dashboard/`, `/my-orders/`, `/store-listing/`, `/request-quote/`, `/reembolso_devoluciones/`, `/event/`, `/etn_category/`, `/etn-tags/`, `/etn-speaker-category/`. |
| `post-sitemap.xml` | 1 | Solo el post placeholder de WordPress `/hola-mundo/` (200 OK) — contenido de instalación por defecto, nunca borrado. No hay blog real publicado hoy en `.net`. |
| `product-sitemap.xml` | 8 | 7 productos + la URL `/tienda/` duplicada dentro del sitemap de productos. |
| `etn-sitemap.xml` (Eventin) | 2 | Un evento (`InnerDance`) y su duplicado con slug. |
| `etn-schedule-sitemap.xml` | 1 | Un horario de evento. |
| `category-sitemap.xml` | 1 | `/category/sin-categoria/` — categoría por defecto sin usar, indexable por error. |
| `local-sitemap.xml` (Rank Math Local SEO) | 1 | Un `.kml` de ubicaciones — no es HTML indexable, cuestionable que esté en un sitemap de sitemap.org. |

**Lectura:** el sitio en línea real tiene ~38 URLs "vivas" en sitemap, de las cuales una fracción significativa es ruido técnico de plugins (carrito, cuentas, categorías vacías, marketplace multi-vendor Dokan que no parece corresponder al modelo de negocio de un estudio de yoga). Esto confirma la premisa del proyecto: la estructura actual es "antigua"/heredada de un stack de comercio genérico, no diseñada para clusters de contenido ni para escalar a 3 países.

**Mapeo de slugs (para el plan de redirects 301 cuando se lance el sitio nuevo):**

| Página nueva (React) | Slug equivalente en `.net` (WordPress) |
|---|---|
| `/nosotros` | `/sobre-nosotros/` |
| `/clases` | `/clases-semanales/` |
| `/espacio` | `/studio/` |
| `/eventos` | `/eventos/` y `/proximos-eventos/` (duplicado a consolidar) |
| `/consultorio` | `/consultorio/` |
| `/tienda` | `/tienda/` + productos individuales `/producto/*` |
| `/contacto` | `/contacto/` |
| `/privacidad` | `/politica-privacidad/` |
| `/blog` | no existe contenido real hoy (`hola-mundo` es placeholder) |
| `/portugal` | no existe en `.net` (404 confirmado) |

Sin este mapeo, migrar de `.net` al sitio React sin 301s por slug perderá el poco equity que existe hoy (reseñas, cualquier enlace externo, indexación local).

---

## 3. Restricción técnica que condiciona toda la arquitectura: no hay router real

`src/context/NavigationContext.tsx` es un enum (`PageName`) + `pushState` manual, sin `react-router`, sin rutas anidadas, sin parámetros dinámicos (`/colombia/bogota/:experiencia`). Consecuencias verificadas:

- **SPA 100% cliente** (`package.json`: `vite build` puro, sin SSR/prerender/`react-router`). El HTML servido es siempre el mismo `index.html` — confirmado en `public/.htaccess`, regla 7: `RewriteRule ^ /index.html [L]` para cualquier ruta no estática. Esto es correcto como *fallback* de SPA, pero significa que **todo el `<head>` inicial (title, description, canonical, OG) es idéntico para todas las URLs hasta que React monta y `App.tsx` lo reescribe vía `useEffect`**. Crawlers/bots que no ejecutan JS (la mayoría de previsualizadores de redes sociales, algunos bots de IA) siempre verán el meta de Colombia/Home, nunca el de Portugal ni de futuros países.
- **`/portugal` es prácticamente huérfana en el grafo de enlaces internos**: no aparece en `Footer.tsx` (0 coincidencias), y en `Header.tsx` el enlace "Portugal Hub" solo se renderiza `{location === 'pt' && ...}` — es decir, **solo es visible después de que el usuario ya eligió Portugal**. `LocationGateModal.tsx` (el selector de país en el primer render) usa `<button onClick>`, no `<a href="/portugal">` — cero enlaces `<a href>` reales hacia `/portugal` en el modal. Hoy la única vía de descubrimiento orgánico de `/portugal` es el propio `sitemap.xml`. Este patrón se replicará para Chicago si no se corrige antes.
- El enum `PageName` no tiene noción de jerarquía (`colombia/bogota/monserrate`), namespace por país, ni slugs por idioma — cualquier URL con `/` interno (`/colombia/wellness-tourism/`) requiere primero introducir un router real o extender manualmente `pathToPage`/`PAGE_TO_PATH` con parsing de segmentos, lo cual hoy no existe.

**Esto es el verdadero cuello de botella para escalar a clusters**, más que el propio sitemap.xml: el sitemap se puede generar en minutos; lo que falta es (a) un dominio confirmado, (b) meta tags que reflejen la URL real en el HTML servido, y (c) un router con rutas anidadas y enlaces `<a href>` reales entre clusters.

---

## 4. Alternativas de arquitectura de dominio/i18n

Todas parten de: 3 mercados (Colombia/es, Portugal/pt, Chicago-EE.UU./en), 5 pilares transversales (MOVE, SOUND, CONNECT, EXPLORE, GROW) que en algún momento querrán cruzarse con país (ej. `/colombia/wellness-tourism/` bajo EXPLORE).

### Alternativa A — Subdirectorios por país en un solo dominio (recomendada)

```
innerspirit.<tld>/colombia/
innerspirit.<tld>/colombia/bogota/monserrate/
innerspirit.<tld>/colombia/wellness-tourism/
innerspirit.<tld>/portugal/
innerspirit.<tld>/portugal/wellness-events/
innerspirit.<tld>/chicago/
innerspirit.<tld>/chicago/static-dance/
```
Idioma: o bien se infiere por país (CO=es, PT=pt, Chicago=en) sin segmento de idioma explícito, o se añade un segundo nivel `/colombia/es/...` si en el futuro Portugal necesita servir inglés a turistas además de portugués.

- **SEO/i18n**: toda la autoridad de dominio (backlinks, historial, confianza de Google) se acumula en un solo dominio — la opción de consolidación de autoridad más eficiente con marca joven/pequeña. `hreflang` se declara fácil entre subdirectorios del mismo host. Un solo `sitemap_index.xml` con un sub-sitemap por cluster (`sitemap-colombia.xml`, `sitemap-portugal.xml`, `sitemap-chicago.xml`) escala sin fricción.
- **Costo técnico**: requiere el router real que hoy no existe (rutas anidadas, parsing de segmentos multi-nivel), pero es el único camino que además sirve para el resto del negocio (URLs de producto, blog, etc.) — no es trabajo "extra" solo para esto.
- **Riesgo**: si Colombia, Portugal y Chicago llegan a necesitar gobiernos de contenido/equipos de marketing completamente independientes (dominios .co vendidos por separado, marcas legales separadas), un solo dominio los ata operativamente.
- **Gestión de marca dual (`innerspirit.co` vs `innerspirit.net`)**: bajo esta alternativa, el dominio elegido (idealmente `.net`, que es el que tiene historial real) se convierte en el canonical único; el otro dominio (si se compra) se configura como **301 permanente al dominio ganador**, nunca como sitio espejo.

### Alternativa B — Subdominios por país

```
colombia.innerspirit.<tld>
portugal.innerspirit.<tld>
chicago.innerspirit.<tld>
```
- **SEO/i18n**: Google trata subdominios como entidades semi-independientes a efectos de rastreo/indexación (aunque hoy comparten más señales que hace 10 años, siguen sin heredar automáticamente la autoridad del dominio raíz con la misma fuerza que un subdirectorio). Para una marca nueva que necesita consolidar autoridad rápido, esto diluye el efecto.
- **Ventaja real**: permite stacks técnicos distintos por país sin acoplar despliegues (útil si, por ejemplo, Chicago/Static Dance termina siendo una marca casi independiente con su propio dueño de producto). También facilita hosting geográfico distinto si algún país requiere requisitos legales de datos separados.
- **Costo**: hreflang sigue siendo manejable (funciona igual entre subdominios), pero exige gestionar 3 propiedades separadas en Search Console, 3 certificados/CDN, y sitemaps independientes referenciados cada uno en su propio `robots.txt`.
- **Encaje con el problema actual**: no resuelve el problema del router — igual se necesita build/deploy separado por subdominio, y la SPA plana actual tendría que triplicarse o parametrizarse por entorno.

### Alternativa C — ccTLD/dominio separado por país (ej. seguir con `innerspirit.co` para Colombia + un `.pt` o `.com` propio para Portugal + `.com`/`.us` para Chicago)

- **SEO/i18n**: es la señal geográfica más fuerte para Google (un ccTLD `.pt` señala país-objetivo Portugal sin necesidad de configuración adicional en Search Console). Pero **cada dominio empieza desde cero en autoridad** — para una marca pequeña y nueva en 2 de los 3 mercados (Portugal conceptual, Chicago conceptual), esto es la opción más lenta y costosa en term de tiempo-a-ranking.
- **Costo operativo**: 3 dominios, 3 certificados, 3 sitemaps, 3 propiedades en GSC, sin ningún apalancamiento cruzado de autoridad entre mercados — y es la peor opción dado que hoy la marca ya tiene confusión de dominio (`.co` vs `.net`) sin resolver; añadir un tercer o cuarto TLD antes de resolver eso multiplica el riesgo de fragmentación.
- **Cuándo tendría sentido**: solo si cada hub (Colombia/Portugal/Chicago) va a operar legal y comercialmente como negocios distintos con marketing 100% independiente — no es lo que describe el contexto del proyecto (marca única, pilares transversales MOVE/SOUND/CONNECT/EXPLORE/GROW compartidos).

### Recomendación

**Alternativa A (subdirectorios por país en un solo dominio)**, condicionada a resolver primero el Hallazgo 0 (elegir `.net` o `.co` como dominio único real). Es la que mejor centraliza autoridad para una marca en expansión temprana, la más barata operativamente, la que mejor soporta hreflang/sitemap-index, y la única que aprovecha el trabajo de introducir un router real que de todos modos hace falta para los pilares (MOVE/SOUND/CONNECT/EXPLORE/GROW) cruzados con país.

No se recomienda decidir subdominios (B) o ccTLDs (C) todavía — son válidas solo si el negocio confirma que Portugal o Chicago tendrán operación/marketing completamente separados de Colombia; hoy el contexto no lo indica.

---

## 5. Arquitectura de sitemap objetivo (compatible con Alternativa A, sin romper lo actual)

```
/sitemap_index.xml
  ├── /sitemap-core.xml        (home, nosotros, contacto, privacidad — páginas de marca global)
  ├── /sitemap-colombia.xml    (/colombia/, /colombia/bogota/*, /colombia/clases, /colombia/eventos, /colombia/consultorio, /colombia/tienda, /colombia/wellness-tourism/)
  ├── /sitemap-portugal.xml    (/portugal/, /portugal/wellness-events/, ...)
  ├── /sitemap-chicago.xml     (/chicago/, /chicago/static-dance/, ... — solo cuando exista contenido real, ver quality gates)
  └── /sitemap-blog.xml        (si el blog crece más allá de unas pocas decenas de posts)
```

- Cada sub-sitemap se mantiene muy por debajo de 50.000 URLs/50MB — separar por cluster es una decisión de **organización y mantenibilidad**, no de límite técnico todavía; sí importa para poder invalidar/regenerar el sitemap de un país sin tocar los demás (ej. Chicago sigue "no publicado" mientras Colombia y Portugal ya están live).
- Migración sin romper lo actual: mientras el router plano siga vigente, `/nosotros`, `/clases`, etc. (namespace Colombia implícito de hoy) pueden mantenerse como alias 1:1 de `/colombia/nosotros`, `/colombia/clases`, etc., con **redirect 301 del slug viejo al nuevo namespace** una vez exista el cluster — nunca al revés (no dejar que ambas URLs sirvan 200 simultáneamente, para evitar contenido duplicado).
- `lastmod`: reemplazar la fecha de deploy compartida por fecha real del último commit/edición de contenido de cada página (se puede automatizar leyendo `git log -1 --format=%aI -- <archivo-de-contenido>` en el script de build, o desde el CMS si se migra a uno).
- `priority`/`changefreq`: se pueden eliminar sin impacto (Google los ignora); mantenerlos no es un error, solo ruido.
- `hreflang`: implementar en `<head>` (vía `App.tsx`/futuro router) y opcionalmente en el sitemap con `xhtml:link` una vez exista el segundo idioma real desplegado (Portugal). Con un solo país-idioma alterno activo, `hreflang` recíproco es simple: `es` (default `/colombia/...` o raíz), `pt` (`/portugal/...`), `x-default` apuntando a home global.

---

## 6. Quality gates antes de lanzar cada cluster

### Gates generales (aplican a los 3 países)
1. **Dominio confirmado**: no publicar `sitemap.xml`/canonical apuntando a un dominio no verificado (bloqueante hoy — ver Hallazgo 0).
2. **Meta tags dinámicos en el HTML servido** (no solo post-mount): como mínimo, prerender o inyectar server-side el `<title>`/`<meta description>`/`canonical`/OG correctos por ruta antes de publicar rutas adicionales — hoy todas comparten el `<head>` de Home hasta que JS corre.
3. **Enlaces internos reales (`<a href>`) entre clusters**: cada cluster nuevo debe tener al menos un enlace crawleable desde Home/Footer/nav global, no solo entrada en sitemap. Corregir el patrón actual de `/portugal` (huérfana salvo sitemap) antes de replicarlo a Chicago.
4. **Router con rutas anidadas**: necesario antes de introducir cualquier URL con más de un segmento (`/colombia/bogota/monserrate/`).
5. **hreflang** entre versiones de idioma equivalentes, una vez haya 2+ idiomas con contenido real.
6. **Redirects 301 del slug WordPress viejo al nuevo** (ver tabla de mapeo, sección 2) para no perder el poco equity indexado hoy en `.net`.
7. **Limpieza del ruido de `.net`**: si `.net` sigue operando durante la transición, noindexar o eliminar del sitemap las páginas transaccionales/boilerplate (carrito, mi-cuenta, categorías vacías, `hola-mundo`) — ahora mismo están indexables y diluyen la relevancia temática del dominio.

### Gate específico — Páginas de ubicación / experiencias tipo "ciudad + actividad"
Aplica directamente a patrones como `/colombia/bogota/monserrate/`, `/colombia/wellness-tourism/`, o cualquier futura expansión "Inner Spirit en [ciudad]":

- ⚠️ **WARNING a partir de 30+ páginas de ubicación**: exigir 60%+ de contenido único por página (texto real y específico del lugar/experiencia: horarios reales, testimonios locales, fotos propias, contexto cultural — no solo la plantilla con el nombre de la ciudad cambiado).
- 🛑 **HARD STOP a partir de 50+ páginas de ubicación**: requiere justificación explícita del negocio antes de publicar/indexar el lote completo.
- Hoy el proyecto está muy lejos de estos umbrales (0 páginas de ubicación reales publicadas), pero el patrón de nombres propuesto (`/colombia/bogota/monserrate/`, y potencialmente otros puntos de interés turístico-wellness) es exactamente el tipo de estructura programática que dispara el algoritmo de "doorway pages" de Google si se generan en bloque sin contenido diferenciado. Recomendación: tratar cada página de "ciudad/lugar" como contenido editorial 1:1 (escrita a mano, con fotos y detalles reales de esa experiencia), no como plantilla con variables.
- **Seguro a escala** (según las guías del negocio): páginas de glosario de prácticas (200+ palabras reales por término, ej. "qué es sound healing"), páginas de integración/documentación de eventos con detalle real, páginas de producto con specs/reseñas únicas.
- **Riesgo de penalización**: páginas de ubicación con solo el nombre de la ciudad cambiado, "mejores retiros de yoga en [ciudad]" sin valor real, contenido generado en masa por IA sin edición humana verificable.

### Gate específico por hub
| Hub | Estado hoy | Qué falta antes de publicar el cluster |
|---|---|---|
| Colombia | En línea (dominio `.net`, estructura vieja) | Migrar a nueva estructura `/colombia/...`, mapa de 301 desde slugs WordPress, limpiar sitemap de ruido transaccional. |
| Portugal | Código construido, sin publicar, sin dominio confirmado | Resolver Hallazgo 0; añadir enlaces internos reales (Header/Footer) hacia `/portugal` en vez de solo el modal con botones; añadir `hreflang`; decidir si vive en `/portugal/` (país) o si necesita separación idioma/país explícita. |
| Chicago / Static Dance | Conceptual, sin página | No debe entrar al sitemap hasta tener contenido real (ni siquiera 1 página) — publicar una URL vacía o "coming soon" en sitemap antes de tener contenido genera una señal de baja calidad desde el día uno. |

---

## 7. Checklist de acciones concretas (orden sugerido)

1. Confirmar con el negocio el dominio único ganador (`.net` vs `.co`) — bloqueante para todo lo demás.
2. Corregir `index.html`, `App.tsx` (`pageSEO`), `public/sitemap.xml` y `public/robots.txt` para apuntar todos al dominio confirmado.
3. Añadir `/espacio` al sitemap (hoy huérfana) y decidir explícitamente sobre `/privacidad`.
4. Reemplazar `lastmod` idéntico por fechas reales por página.
5. Introducir un router con soporte de rutas anidadas (base para `/colombia/`, `/portugal/`, `/chicago/` + sub-rutas).
6. Añadir enlaces `<a href>` reales entre Home/Footer y `/portugal` (y cualquier cluster futuro) — eliminar la dependencia exclusiva del sitemap para descubrimiento.
7. Mover a meta tags server-rendered/prerenderizados por ruta (evita que todo bot vea siempre el `<head>` de Home).
8. Diseñar el mapa de redirects 301 desde los slugs actuales de `.net` hacia las nuevas rutas.
9. Solo entonces: dividir el sitemap en `sitemap_index.xml` + sub-sitemaps por cluster, y activar `hreflang` cuando Portugal tenga contenido real y enlaces internos.
10. Chicago entra al sitemap solo cuando exista al menos una página real y publicada (no antes).

---

**Nota de proceso**: No fue posible ejecutar `claude-seo run sitemap_discovery.py` (el runtime reportó "Claude SEO runtime is not ready. Run `/seo setup` and retry."). En su lugar se verificó manualmente vía `curl` contra `innerspirit.net`, `www.innerspirit.net` y `innerspirit.co`, incluyendo el `robots.txt`, `sitemap_index.xml` y los 7 sub-sitemaps de Rank Math del sitio en producción.
