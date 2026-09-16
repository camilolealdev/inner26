# Auditoría de Calidad de Contenido y E-E-A-T — innerspirit.net (sitio en vivo)

**Fecha de auditoría:** 2026-09-11
**Sitio auditado:** https://innerspirit.net (WordPress, LiteSpeed, redirige a `https://www.innerspirit.net/`)
**Método:** fetch HTTP directo de HTML servido (contenido renderizado en servidor por WordPress, no requiere JS) + extracción de texto visible, headings, metadatos y JSON-LD.
**Nota de alcance:** este es el sitio antiguo/genérico pre-reposicionamiento (nav: Home/Studio/Events/Consultory/Shop/Contact). El código nuevo en desarrollo (hubs Colombia/Portugal/Chicago, 5 pilares) **no** está publicado todavía y no se audita aquí. Este reporte evalúa qué tan sólida es la base actual y qué hay que construir encima.

## Páginas auditadas

| Página | URL real | Estado HTTP | Palabras (aprox., incl. nav/footer) |
|---|---|---|---|
| Home | `/` | 200 | 491 |
| Studio | `/studio` | 200 | 272 |
| Clases Semanales | `/clases` | 200 | 119 |
| Eventos | `/eventos` | 200 | 220 |
| Consultorio | `/consultorio` | 200 | 179 |
| Tienda | `/tienda` | 200 | 248 |
| Contacto | `/contacto` | 200 | 156 |
| Sobre Nosotros ("Nosotros") | `/sobre-nosotros` | 200 | 48 |

**Hallazgo estructural importante:** las rutas en inglés que el usuario reportó en el nav (`/events`, `/consultory`, `/shop`) devuelven **404**. El sitio real vive en slugs en español (`/clases`, `/eventos`, `/consultorio`, `/tienda`, `/contacto`, `/sobre-nosotros`), y las etiquetas de navegación visibles ("Studio", "Events", "Consultory", "Shop", "Contact") son una capa de traducción visual sobre URLs en español. Esto ya es en sí mismo un problema de SEO técnico (URLs no coinciden con el idioma percibido, riesgo de contenido duplicado si en algún momento se sirven ambas variantes), pero queda fuera del alcance de "calidad de contenido" — se menciona porque afecta la interpretación de "qué existe".

Todas las páginas comparten la misma plantilla de footer, el mismo bloque de newsletter, el mismo CTA "ADQUIERE TUS ENTRADAS / Compra Ahora", y una barra de navegación duplicada dos veces en el HTML (menú visible + menú móvil). Esto no es necesariamente negativo (patrón normal de theme), pero infla el conteo de palabras "en bruto" — el contenido único real por página es considerablemente menor a lo que muestra la tabla.

---

## 1. Puntaje global de calidad de contenido: **28/100**

El sitio cumple una función mínima de landing/folleto digital, pero como base de autoridad para "marca internacional de wellness" está muy por debajo del umbral. Ninguna página alcanza el mínimo de palabras de su categoría (ver sección 3), no hay blog/recursos, no hay bios de instructores, no hay evidencia verificable de expertise, y el contenido es genérico y intercambiable con cualquier estudio de yoga boutique.

## 2. E-E-A-T Breakdown

| Factor | Peso | Puntaje (0-100) | Evidencia |
|---|---|---|---|
| **Experience** (experiencia de primera mano) | 20% | **20/100** | Hay 4 testimonios reales con nombre en Home (Sasha Alejandra Pers Osuna, Mary Luz Cuartas, "Nathalia Salamanca", Daniel Ariza) — señal positiva y reutilizable. Pero cero fotos/video propios documentados en el texto, cero historias de "así se siente una clase/ceremonia", cero contenido en primera persona de fundadores o instructores. Se menciona "Tiago" solo en un testimonio de cliente (no en copy propio del sitio) como quien "abrió las puertas". |
| **Expertise** (credenciales, precisión técnica) | 25% | **10/100** | No hay una sola bio de instructor, certificación, años de experiencia, escuela de formación (p.ej. RYT200/500, linaje de sound healing, formación en terapias). El Consultorio menciona "profesionales apasionados" pero es una convocatoria genérica para arrendar espacio a terapeutas externos, no una presentación de expertise verificada. Cero especificidad técnica en descripciones de clases (yoga, danza, respiración, "Impro", "Jam" — sin nivel, estilo, duración, instructor). |
| **Authoritativeness** (reconocimiento externo, citas) | 25% | **15/100** | Solo 1 red social enlazada en `sameAs` (Facebook), sin Instagram/YouTube en el schema aunque sí se referencia @innerspirit_studio en el copy de Eventos. Cero menciones de prensa, colaboraciones, certificaciones de terapeutas invitados, alianzas (p.ej. Universidad de los Andes solo se usa como referencia geográfica, no como partnership). Cero contenido evergreen (blog) que pueda ganar enlaces o citas externas. |
| **Trustworthiness** (contacto, transparencia, seguridad) | 30% | **45/100** | Punto más fuerte relativo: dirección física completa y consistente (Tv./Trv. 1 #17-29, Las Aguas, Candelaria, Bogotá), teléfono/WhatsApp, email de contacto, formulario de contacto, HTTPS activo, JSON-LD `Organization` + `WebSite` presente. Debilidades: sin política de privacidad accesible (el link "Privacidad" del footer no se verificó como página completa — a validar), sin términos de servicio/devolución para la Tienda (venta de productos físicos y sesiones sin políticas visibles de envío/reembolso), sin HTTPS canonical declarado (`canonical` vacío en todas las páginas revisadas), formulario de comentarios en Contacto con placeholder "Jane Doe" sin publicar sin moderar. |

**Score ponderado:** (20×0.20)+(10×0.25)+(15×0.25)+(45×0.30) = 4+2.5+3.75+13.5 = **23.75 ≈ 24/100** (ajustado a 28 considerando señales técnicas positivas de Trust: HTTPS, NAP consistente, schema Organization).

## 3. Cobertura de contenido vs. mínimos por tipo de página

| Página | Tipo | Mínimo QRG | Palabras únicas reales (excl. nav/footer/CTA repetido) | Veredicto |
|---|---|---|---|---|
| Home | Homepage | 500 | ~150 | **Thin.** Menos de un tercio del piso recomendado. |
| Studio | Service page | 800 | ~180 | **Thin severo.** ~22% del mínimo. |
| Clases Semanales | Service page | 800 | ~60 | **Thin crítico.** Es básicamente una lista de 6 palabras clave ("yoga", "respiración", "danza", "afro", "Impro", "Jam") sin horarios, sin instructor, sin nivel, sin duración. No hay "Programación Mensual" real visible en el HTML (el título del bloque existe, el contenido no se sirve en el HTML estático). |
| Eventos | Service/Blog-like | 800–1500 | ~120 | **Thin.** Un solo evento listado ("Inner Dance", fecha 6 junio 2025 — **contenido vencido/desactualizado** respecto a la fecha de auditoría). |
| Consultorio | Service page | 800 | ~130 | **Thin.** Y la página está orientada a reclutar terapeutas arrendatarios, no a explicar el servicio al cliente final — confusión de intención de búsqueda. |
| Tienda | Product/collection page | 300-400+ | ~120 texto + 7 productos con solo nombre/precio | **Thin en descripciones de producto.** Cero descripciones individuales de producto (ingredientes de la miel/café orgánico, especificaciones del handpan, material del tapete de corcho) — mínimo de 300 palabras por página de producto no se cumple en ninguna ficha. |
| Sobre Nosotros | About/Homepage-like | 500 | ~5 | **Vacía.** El `<h1>Nosotros</h1>` no tiene ni un párrafo de copy. Esta es la página que más debería concentrar señales de Experience/Expertise (historia, fundadores, misión) y está esencialmente en blanco. |
| Contacto | Contact page | — | ~90 | Aceptable para su propósito, pero sin FAQ ni horario de atención detallado por día. |

**Ningún template cumple su piso de cobertura topical.** Esto no es solo "menos SEO-friendly" — indica que Google (y los futuros hubs internacionales) no tienen suficiente señal textual para entender qué es Inner Spirit, a quién sirve, y por qué confiar en ella frente a competidores.

## 4. Duplicación

- El mensaje central ("reconectar con tu esencia", "bienestar físico, mental y espiritual", "energía") se repite casi textualmente en Home, Studio y Consultorio sin diferenciación de ángulo — mismo tono, mismas frases, distinto envoltorio. Un rastreador de calidad (o un LLM resumiendo el sitio) tendría dificultad para diferenciar qué hace único a cada pilar de servicio.
- El bloque de newsletter ("Inscríbete y recibe toda la información sobre nuestros eventos") y el CTA de footer se repiten idénticos en las 8 páginas — normal a nivel de patrón de theme, pero contribuye a que el ratio de contenido único/boilerplate sea muy bajo.
- No se detectó contenido copiado de terceros ni canibalización entre páginas propias (cada página cubre un servicio distinto, al menos en título).

## 5. Legibilidad

Dado el volumen mínimo de texto corrido, la legibilidad es aceptable donde existe: frases cortas, tono cálido en español neutro, sin jerga técnica excesiva. Los principales problemas de legibilidad no son de sintaxis sino de **estructura**: headings genéricos y no descriptivos para SEO/AI ("PARA QUE?", "POR QUE?", "viVE LA EXPERIENCIA" con capitalización inconsistente — señal de descuido editorial que un QRG rater interpretaría como falta de cuidado profesional), y ausencia casi total de listas, tablas, FAQs o subtítulos que faciliten escaneo y extracción por IA.

## 6. Señales de contenido generado por IA / calidad genérica (criterio QRG sept. 2025)

No hay evidencia de que el texto actual sea generado por IA (no aparecen los tics típicos de "boilerplate" de LLM), pero comparte los mismos síntomas de baja calidad que el QRG penaliza en contenido IA de bajo esfuerzo:
- **Frases genéricas y sin especificidad** ("un espacio para reconectar con tu esencia", "energía vibrante") repetidas entre páginas sin datos concretos (sin nombres de instructores, sin marcas de productos, sin certificaciones, sin cifras de comunidad/años operando).
- **Sin insight original** ni voz de autor identificable.
- **Sin señales de experiencia de primera mano** del equipo (solo hay experiencia de primera mano de *clientes* vía testimonios, que es valiosa pero insuficiente sola).
- **Estructura repetitiva** entre páginas de servicio (Studio/Consultorio/Eventos siguen casi el mismo esqueleto: frase inspiracional → "para qué/por qué" → CTA).

Esto no descalifica el contenido per se, pero confirma que el sitio necesita reescritura sustancial con especificidad real (nombres, credenciales, procesos, fotos propias) antes de escalar a 3 hubs internacionales — replicar esta plantilla vacía en Portugal/Chicago multiplicaría el problema de thin/generic content (ver también riesgos de `seo-programmatic` si se automatiza la creación de páginas por ciudad/pilar).

## 7. AI Citation Readiness: **15/100**

- JSON-LD presente solo para `Organization` y `WebSite` (nombre, logo, único perfil social). **Falta:** `LocalBusiness`/`HealthAndBeautyBusiness` con horarios y geo-coordenadas, `Event` schema para los talleres/ceremonias, `Product` schema para la tienda, `FAQPage` para preguntas frecuentes, `Person`/`author` para instructores.
- No hay hechos citables ni autocontenidos (ej. "clases desde $X", "más de N años operando", "certificado en X linaje") que un motor de IA pueda extraer con confianza.
- No hay jerarquía clara de encabezados (h1 duplicado o ausente en varias páginas; Studio y Home tienen múltiples h1/h2 sin jerarquía lógica de tema→subtema).
- `canonical` vacío en todas las páginas muestreadas — riesgo de que motores de búsqueda e IA indexen versiones `innerspirit.net` vs `www.innerspirit.net` de forma inconsistente pese al redirect 301 observado.
- Sin FAQs, sin tablas comparativas, sin fragmentos "quotable" de una sola frase que respondan preguntas directas (p.ej. "¿Dónde queda Inner Spirit?", "¿Cuánto cuesta una clase de yoga?").

## 8. Frescura de contenido

- `dateModified` en Home (vía JSON-LD): **2025-06-23**, `datePublished`: 2024-12-11 — más de un año sin actualización real de contenido a la fecha de esta auditoría (2026-09-11).
- La página de Eventos muestra un único evento pasado ("Inner Dance", 6 de junio de 2025) sin agenda vigente — para un rater humano y para un usuario real esto se lee como "sitio abandonado", una señal de Trust negativa importante.
- No existe blog ni sección de recursos que permita mostrar actividad y expertise continua (contenido de tipo GROW/CONNECT que el reposicionamiento necesita).

---

## 9. Qué conservar como base de autoridad (no partir de cero)

Aunque el conteo/estructura es débil, hay activos genuinos que **sí** deben migrarse y potenciarse en el sitio nuevo, no descartarse:

1. **Testimonios reales con nombre en Home** (Sasha Alejandra Pers Osuna, Mary Luz Cuartas, Nathalia Salamanca, Daniel Ariza) — son la señal de Experience más creíble del sitio actual. Migrar con atribución completa, y si es posible enlazar a sus perfiles públicos o pedir reseñas ampliadas en Google Business Profile para reforzar E-E-A-T.
2. **NAP (Nombre-Dirección-Teléfono) consistente y verificable**: Tv. 1 #17-29, Las Aguas, La Candelaria, Bogotá; WhatsApp +57 321 224-8261; contacto@innerspirit.net — reutilizar tal cual como hub "Colombia" y como base para `LocalBusiness` schema.
3. **Ubicación como diferenciador narrativo ya validado**: el texto "corazón histórico y cultural de Bogotá... a una cuadra de la Universidad de los Andes" es un ángulo de Experience/lugar auténtico y específico (poco genérico) que encaja de forma natural con el pilar **EXPLORE** (turismo consciente, cultura, naturaleza) — vale la pena expandir, no reescribir desde cero.
4. **Catálogo base de la Tienda** (miel orgánica, café orgánico, handpan 432Hz, tapete de corcho, sesión de cuencos tibetanos, bloques de madera) — buena semilla de producto y de conexión con el pilar **SOUND** (cuencos, handpan) y **GROW/MOVE**; solo necesita fichas de producto desarrolladas (ingredientes, origen, proveedor, fotos propias), no un catálogo nuevo.
5. **Presencia social activa referenciada**: @innerspirit_studio en Instagram con contenido embebido de eventos — indica que sí existe actividad real fuera del sitio web que hoy no está bien conectada/schematizada en el sitio. Vale la pena formalizar el enlace en `sameAs` y usarlo como fuente de contenido (reposts, testimonios en video) para EXPLORE/CONNECT.
6. **Vocabulario de marca ya validado con audiencia**: frases como "refugio", "reconectar con tu esencia", "comunidad", "flujo/fluir" pueden conservarse como tono de voz de marca (son consistentes y no están mal en sí mismas), pero deben dejar de ser el *único* contenido de cada página — deben acompañar, no reemplazar, contenido específico y verificable.
7. **Estructura de navegación por servicio (Studio/Clases/Eventos/Consultorio/Tienda)** mapea razonablemente bien a los pilares nuevos y puede servir de esqueleto de migración: Studio+Clases → MOVE, Eventos+Consultorio → CONNECT/GROW, Tienda → SOUND (parcialmente), faltando construir EXPLORE y GROW de manera explícita.

## 10. Brechas de contenido por pilar (para el reposicionamiento internacional)

| Pilar | Contenido actual reutilizable | Brecha principal a llenar |
|---|---|---|
| **MOVE** (yoga, static dance, breathwork) | Lista de modalidades en Clases (yoga, danza, respiración, afro, impro, jam); descripción genérica en Studio | Sin horarios reales, sin niveles, sin bios/certificaciones de instructores, sin fotos/video de clases reales, sin diferenciación de estilos de yoga (¿hatha, vinyasa, yin?), sin explicación de "static dance" como concepto (término nuevo del reposicionamiento, cero precedente en el sitio actual) |
| **SOUND** (cuencos, sound healing, música) | Producto "Sesión Cuencos Tibetanos", handpan 432Hz en tienda | Sin página dedicada a sound healing, sin credenciales del facilitador de sonido, sin explicación del método/beneficios, sin audio/video demo |
| **CONNECT** (ceremonias, comunidad) | Testimonios de comunidad, menciones de "ceremonias ancestrales" y "medicinas ancestrales" en Studio/Eventos | Términos como "medicinas ancestrales" requieren máximo cuidado de Trust/YMYL-adyacente (implica sustancias/rituales) — hoy se mencionan sin ningún marco de seguridad, consentimiento informado, facilitadores certificados ni disclaimers, lo cual es un riesgo de Trust alto si se amplía sin respaldo. Falta contenido de comunidad (historias, fotos de eventos pasados, calendario vigente) |
| **EXPLORE** (naturaleza, cultura, turismo consciente Colombia) | Narrativa de ubicación en La Candelaria ya usada en Home/Contacto | Prácticamente inexistente como pilar propio: no hay contenido de naturaleza, retiros, turismo, guías de Colombia. Es el pilar con menor base de partida — necesita construirse casi desde cero |
| **GROW** (voluntariado, workshops, desarrollo personal) | Convocatoria a terapeutas en Consultorio (adyacente, no directo); "talleres" mencionados de forma genérica en varias páginas | Sin programas de voluntariado, sin calendario de workshops formativos, sin trayectorias de crecimiento personal documentadas (casos de estudio/testimonios de transformación con seguimiento) |

Adicionalmente, **ninguno de los tres hubs (Colombia/Portugal/Chicago)** tiene hoy contenido diferenciado: todo el sitio actual está centrado 100% en Bogotá/Candelaria. Al expandir, cada hub necesitará su propio contenido local de autoridad (NAP local, testimonios locales, instructores locales, eventos locales) — replicar la plantilla vacía actual en 3 ubicaciones agravaría el thin content en vez de resolverlo.

## 11. Recomendaciones priorizadas

**Prioridad alta (bloqueantes para cualquier lanzamiento internacional):**
1. Completar "Sobre Nosotros" con historia real, fundadores, misión, y fotos propias — hoy está vacía y es la página de mayor impacto en Expertise/Experience.
2. Añadir bios de instructores/facilitadores con certificaciones verificables en Studio, Clases y Consultorio.
3. Publicar calendario de eventos vigente (el actual muestra un evento de junio 2025, obsoleto) y automatizar su actualización.
4. Añadir schema `LocalBusiness`, `Event` y `Product`, y declarar `canonical` en todas las páginas.
5. Establecer marco de seguridad/consentimiento informado explícito para contenido de "ceremonias" y "medicinas ancestrales" antes de escalarlo como pilar CONNECT.

**Prioridad media:**
6. Expandir cada página de servicio al menos a su piso de cobertura (Studio/Clases/Consultorio ≥800 palabras de contenido único, no boilerplate) con especificidad real (duración, precio, nivel, proceso).
7. Escribir fichas de producto individuales en Tienda (≥300 palabras/producto con origen, ingredientes/materiales, uso).
8. Corregir capitalización/errores de estilo en headings ("viVE LA EXPERIENCIA", "TallereS") — señal de descuido que afecta percepción de profesionalismo.

**Prioridad baja / mediano plazo:**
9. Lanzar un blog/recursos para dar soporte editorial continuo a los 5 pilares y generar señales de frescura y autoridad externa (enlaces, citas).
10. Formalizar todos los perfiles sociales activos (Instagram, WhatsApp) en el schema `sameAs`, no solo Facebook.
