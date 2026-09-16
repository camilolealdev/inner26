# Inner Spirit — SEO Master Map & Brand Architecture

> **Consolidado estratégico:** Síntesis de 4 auditorías técnicas y de contenido (`docs/seo/`) + estrategia de marca internacional para Colombia, Portugal y Chicago.  
> **Fecha:** 11 de septiembre de 2026  
> **Dominio canónico único:** `https://innerspirit.net` (Decidido)  
> **Sitios auditados:** `innerspirit.net` (Producción en vivo / WordPress) y `innerspirit.co` (Dominio parqueado IONOS sin SSL).

---

## 1. Diagnóstico Ejecutivo & Estado Actual

Actualmente Google clasifica a Inner Spirit como un estudio de yoga urbano en Bogotá. La oportunidad real validada es convertirla en una marca global de experiencias conscientes (*Global Wellness & Conscious Experiences*), conservando y protegiendo el activo local de Bogotá.

### Métricas de la auditoría en línea:
* **SEO Técnico:** `32 / 100` (Penalizado por noindex global en WP y dominio previo dividido).
* **Calidad de Contenido:** `28 / 100` (Thin content en páginas de servicio; requiere expansión con E-E-A-T).
* **AI Citation Readiness:** `15 / 100` (Falta de JSON-LD LocalBusiness / Hechos estructurados).
* **Trust (E-E-A-T):** `45 / 100` (Fuerte en reseñas 4.9★ y NAP físico; débil en bios y certificaciones).

---

## 2. 🚨 Hallazgos Críticos & Acciones Inmediatas (Fase 0)

| Hallazgo | Impacto | Acción requerida | Estado en Repo |
| :--- | :--- | :--- | :--- |
| **`noindex, nofollow` global en WordPress (.net)** | Google está desindexando el sitio en vivo. | **Manual en WP:** Desactivar en Rank Math (Títulos y Meta → Ajustes Globales → Robots Meta). | ⚠️ Requiere acción manual en panel WP |
| **Dominio dividido (.co vs .net)** | .co está en IONOS parking sin SSL; el tráfico y reputación viven en .net. | Corregir todo el código a `https://innerspirit.net`. | ✅ **Resuelto en código** |
| **Canibalización de Portugal vs Colombia** | `PortugalPage.tsx` vendía clases de yoga y sonido iguales a Bogotá. | Reescribir copy de Portugal hacia **CONNECT** (Comunidad y Voluntariado). | ✅ **Resuelto en `PortugalPage.tsx`** |
| **Página huérfana en sitemap** | `/espacio` existía en el código pero no en `sitemap.xml`. | Añadir `/espacio` al `sitemap.xml` con dominio .net. | ✅ **Resuelto en `sitemap.xml`** |
| **Bug de comillas en títulos de WP** | Títulos pegados con `&quot;` en Rank Math. | Limpiar comillas en WordPress y asegurar títulos limpios en React. | ✅ **Garantizado en React** |

---

## 3. Arquitectura de Marca: 5 Pilares y 3 Expresiones Locales

Inner Spirit no opera como tres marcas aisladas ni como una agencia de viajes. Opera como una red de bienestar y experiencias conscientes con 5 pilares transversales:

```
                                INNER SPIRIT GLOBAL
                     Global Wellness & Conscious Experiences
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
      🇨🇴 COLOMBIA                  🇵🇹 PORTUGAL                  🇺🇸 CHICAGO
     Pilar: EXPLORE               Pilar: CONNECT               Pilar: MOVE
    Destino & Turismo            Comunidad, Círculos,         Static & Ecstatic Dance,
   Consciente + Bogotá           Voluntariado Nómoda            Movimiento Somático
```

### Los 5 Pilares Transversales:
1. **MOVE:** Yoga · Static Dance · Ecstatic Dance · Movimiento Somático · Breathwork.
2. **SOUND:** Cuencos Tibetanos · Sound Healing · Viajes Sonoros · Frecuencias 432Hz.
3. **CONNECT:** Círculos Comunitarios · Ceremonias de Cacao · Encuentros Conscientes.
4. **EXPLORE:** Naturaleza · Cultura Ancestral · Turismo Consciente (Monserrate, Guatavita).
5. **GROW:** Programas de Voluntariado · Workshops · Formaciones de Facilitadores.

---

## 4. Secuenciación Estratégica de Mercados

1. **Prioridad 1 — 🇨🇴 Colombia (Pilar EXPLORE):**
   * *Activo existente:* Dominio indexado, 158 reseñas (4.9★), ubicación física en La Candelaria.
   * *Diferenciador:* Fusión de sonoterapia, breathwork, cacao y turismo consciente de naturaleza (Monserrate, Guatavita, Catedral de Sal).
2. **Prioridad 2 — 🇵🇹 Portugal (Pilar CONNECT):**
   * *Activo:* Página `/portugal` construida y enlazada.
   * *Diferenciador:* Red comunitaria nómada y programa de voluntariado consciente en Lisboa, Sintra y Ericeira sin la necesidad de arrancar con un local comercial de alto costo fijo.
3. **Prioridad 3 — 🇺🇸 Chicago (Pilar MOVE):**
   * *Activo:* Nicho de danza consciente.
   * *Diferenciador:* Educación de la categoría propia *Static Dance* apalancándose en el término de búsqueda consolidado *Ecstatic Dance Chicago*.

---

## 5. Mapeo de Slugs y Redirecciones 301 (WordPress → React)

Cuando se promueva el nuevo frontend a producción en `innerspirit.net`, se deben ejecutar las siguientes redirecciones 301 permanentes:

| URL Histórica en WordPress (.net) | URL Nueva en React | Intención |
| :--- | :--- | :--- |
| `/sobre-nosotros/` | `/nosotros` | Historia, propósito y facilitadores |
| `/clases-semanales/` | `/clases` | Catálogo de prácticas regulares |
| `/studio/` | `/espacio` | Alquiler para talleres y certificaciones |
| `/eventos/`, `/proximos-eventos/` | `/eventos` | Calendario de experiencias y rituales |
| `/consultorio/` | `/consultorio` | Sesiones individuales 1:1 |
| `/tienda/`, `/producto/*` | `/tienda` | Objetos conscientes y herramientas |
| `/contacto/` | `/contacto` | Ubicación, WhatsApp y formulario |
| `/politica-privacidad/` | `/privacidad` | Cumplimiento legal Habeas Data |
| *(Nueva ruta internacional)* | `/portugal` | Hub Portugal (Comunidad & Voluntariado) |
| *(Futura ruta internacional)* | `/chicago` | Hub Chicago (Static Dance) |

---

## 6. Roadmap Priorizado de Ejecución

### Fase 0: Detener el Sangrado (Esta Semana)
- [x] Unificar canónicos, sitemap y robots a `https://innerspirit.net`.
- [x] Corregir copy de `PortugalPage.tsx` hacia el pilar CONNECT.
- [x] Añadir enlace crawlable `<a href="/portugal">` en Header y Footer.
- [x] Resolver página huérfana `/espacio` en `sitemap.xml`.
- [ ] **Acción manual de usuario en WP:** Desactivar `noindex` en Rank Math de `innerspirit.net`.

### Fase 1: Fundación Técnica y E-E-A-T (0–30 Días)
- [x] Inyección de Schema.org `Organization` + `HealthAndBeautyBusiness` en `index.html`.
- [ ] Completar página `/nosotros` con historia real de fundadores y linaje de facilitadores.
- [ ] Conectar bios de facilitadores con certificaciones verificables.
- [ ] Migrar el listado de eventos a fechas activas 2026.

### Fase 2: Lanzamiento Colombia / Explore (30–60 Días)
- [ ] Crear el cluster de turismo consciente (Guías conscientes de Monserrate, Guatavita y Cacao).
- [ ] Añadir páginas de experiencias turísticas combinadas.
- [ ] Ejecutar redirecciones 301 desde Apache `.htaccess`.

### Fase 3: Activación Portugal / Connect (60–90 Días)
- [ ] Publicar formulario de aplicación de voluntarios y facilitadores en Portugal.
- [ ] Implementar etiquetas `hreflang` (`es`, `pt`, `x-default`).
- [ ] Generar sub-sitemaps modulares.

### Fase 4: Chicago / Move (90–180 Días)
- [ ] Publicar `/chicago` enfocado en *Static Dance — Ecstatic & Conscious Movement*.
- [ ] Vincular comunidad y tickets vía Event Schema.

---

## 7. Referencia a Documentos Técnicos Fuente

Para detalles técnicos pormenorizados y evidencia cruda de auditoría, consultar la suite en `docs/seo/`:
* [`docs/seo/technical-audit.md`](file:///g:/Nueva%20carpeta/Documentos/inner/docs/seo/technical-audit.md): Rendimiento, cabeceras, Core Web Vitals y diagnóstico TLS.
* [`docs/seo/sitemap-architecture.md`](file:///g:/Nueva%20carpeta/Documentos/inner/docs/seo/sitemap-architecture.md): Mapeo completo de URLs, plugins de WP y arquitectura i18n.
* [`docs/seo/keyword-competitor-analysis.md`](file:///g:/Nueva%20carpeta/Documentos/inner/docs/seo/keyword-competitor-analysis.md): Estudio de palabras clave y teardown de competidores en CO, PT y US.
* [`docs/seo/content-audit.md`](file:///g:/Nueva%20carpeta/Documentos/inner/docs/seo/content-audit.md): Evaluación E-E-A-T, conteo de palabras y AI citation readiness.
