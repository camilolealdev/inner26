# Revisión profunda — a11y, SEO, rendimiento y calidad

> Auditoría manual del frontend (`src/`, `App.tsx`, `index.html`, `index.css`) — **2026-07-02**.
> No cubre seguridad de pagos (ya tratada en `BRECHAS-Y-PENDIENTES.md`).
> Conclusión: el sitio está bien construido; hay **pocas** brechas reales, todas de prioridad media/baja.

---

## ✅ Resuelto en esta sesión

### 2. Duplicación de lógica en los formularios de contacto — RESUELTO (parcial)
- **Antes:** la lógica de envío (estado, consentimiento, `submitLead`, redirect a WhatsApp) estaba **duplicada** en `ContactSection.tsx` y `ContactPage.tsx` — y el bug del popup había estado triplicado.
- **Ahora:** extraída al hook `src/hooks/useContactForm.ts` (única fuente de verdad del comportamiento). Ambos componentes lo consumen; el marcado/estilo queda en cada uno. Se eliminaron ~40 líneas duplicadas y el riesgo de divergencia.
- 🔸 **Opcional futuro:** las parejas `ClassesSection`↔`ClassesPage` y `AboutSection`↔`AboutPage` también solapan marcado, pero divergen más (distinto layout), así que un merge es más arriesgado y de menor valor. Dejar como refactor futuro si se vuelve a tocar esas páginas.

### 3. `BlogPage`: dos `<h1>` coexistían con el modal abierto — RESUELTO
- El título del `ArticleModal` (`BlogPage.tsx:155`) pasó de `<h1>` a `<h2>`. Ahora solo hay un `<h1>` por página.

---

## ✅ Verificado — NO era un problema

### 1. Imágenes y CLS
- **Sospecha inicial:** imágenes sin `width`/`height` → Cumulative Layout Shift.
- **Verificado:** **falso**. Todas las `<img>` viven en contenedores que **ya reservan el espacio** con `aspect-ratio` o `min-height` + `object-cover` (`AboutSection` `aspect-[3/4]`, `StudioSection` `aspect-[3/4]`, `EventInstagramFeed` `aspect-[4/5]`, `EventsSection`/`EventsPage` `min-h-[…]`, `ClassesPage` `absolute inset-0`). No hay CLS. Sin acción.

---

## ✅ Verificado y correcto (sin acción) — lo que ya está bien hecho
- **Rutas lazy-loaded** con `React.lazy` + `Suspense` (`App.tsx:78-86`) → bundles por página, buen tiempo de carga inicial.
- **SEO por ruta completo**: `App.tsx:150-186` actualiza `title`, `meta description`, Open Graph, Twitter Card **y `<link rel=canonical>`** en cada navegación. (Mi sospecha inicial de "meta estática en SPA" era infundada.)
- **Imágenes con `alt`**: todas lo tienen; el logo del header usa `alt=""` **correctamente** (decorativo, junto al texto de marca "INNER SPIRIT").
- **`prefers-reduced-motion` respetado**: `HeroSection.tsx:20` sustituye la galaxia WebGL por un fondo estático (`.is-hero-static`, existe en `index.css:451`); también en `Ribbons`, `SplashCursor`.
- **Listeners con cleanup**: `Galaxy.tsx:206-209` (removeEventListener + `cancelAnimationFrame`), `Header`, modales y hooks (`useScroll`, `useMediaQuery`…) limpian correctamente. Listeners de mouse con `{ passive: true }`.
- **Sin `console.log`** dejados, **sin `div`/`span` clickables** (no hay botones falsos inaccesibles).

---

## Estado final
- **#1 (CLS):** verificado — no era un problema, sin acción.
- **#2 (duplicación de lógica de formularios):** resuelto con `useContactForm`. Merge de marcado de Classes/About queda como refactor opcional futuro.
- **#3 (h1 del blog):** resuelto.

## Verificación
- `npm run lint` (tsc, con `noUnusedLocals`) → sin errores.
- `npm run test:run` → 23/23 en verde.
- `npm run build` → OK.
- Smoke test en navegador: `/contacto` renderiza el formulario + casilla de consentimiento, **cero errores de consola**.
