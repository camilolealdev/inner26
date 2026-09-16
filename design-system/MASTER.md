# Inner Spirit Design System

## Visual Direction

Inner Spirit uses an editorial wellness premium language: night-sky immersion in the hero, warm mineral surfaces, thin ritual line work, and calm motion. The visual system should feel grounded, tactile, and quiet rather than decorative.

## Semantic Tokens

Core tokens live in `index.css` under the additive `--is-*` layer.

| Role | Token | Usage |
| --- | --- | --- |
| Page paper | `--is-color-paper` | Light sections and cards |
| Warm paper | `--is-color-paper-warm` | Media blocks and soft surfaces |
| Sand | `--is-color-sand` | Brand background and light text on dark |
| Clay | `--is-color-clay` | Accent rules and restrained highlights |
| Teal | `--is-color-teal` | Primary actions, active states, focus |
| Deep teal | `--is-color-teal-deep` | Hover/pressed states |
| Ink | `--is-color-ink` | Primary readable text |
| Night | `--is-color-night` | Immersive dark sections |
| Night panel | `--is-color-night-panel` | `.is-surface--dark` background inside night sections |
| Muted | `--is-color-muted` | Body copy (`.is-copy`) |
| Muted soft | `--is-color-muted-soft` | Page lead paragraphs (`.is-page-lead`) |
| Soft line | `--is-line-soft` | Borders and dividers |
| Sage *(reserved, unused)* | `--is-color-sage` | Declared in `index.css` but not consumed anywhere yet |
| Olive *(reserved, unused)* | `--is-color-olive` | Declared in `index.css` but not consumed anywhere yet |
| Warm line *(reserved, unused)* | `--is-line-warm` | Declared in `index.css` but not consumed anywhere yet |

## Component Recipes

- Sections use `.is-section` plus a surface modifier: `.is-section--paper`, `.is-section--sand`, or `.is-section--night`.
- Layout width uses `.is-shell` instead of repeating container classes in new work.
- Editorial headers use `EditorialHeader` from `src/components/ui/DesignPrimitives.tsx`.
- Reusable surfaces use `Surface` and `.is-surface`, with `interactive` only when the whole region is clickable.
- Primary actions use `.is-action`; text links remain underlined or paired with the shared `ArrowIcon`.

## Responsive Rules

- 375px: single-column content, no horizontal scroll, touch targets at least 44px.
- 768px: two-column grids only when cards remain readable.
- 1024px: full navigation can appear; tablet keeps mobile navigation.
- 1440px: content remains capped at `80rem`.

## Motion Rules

- Hero may use one full-viewport WebGL effect.
- Newsletter may use one canvas ribbon background.
- Cards use CSS transitions only.
- Reduced motion must replace canvas/WebGL motion with static visuals.

