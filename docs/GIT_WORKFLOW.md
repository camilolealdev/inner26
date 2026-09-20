# Git Workflow

> **Última actualización: 2026-09-20** — estado verificado contra el
> repositorio local (`git branch -a`, `git log`, `git tag`).

## Estado Actual Del Repositorio

| Elemento | Estado |
| --- | --- |
| Rama activa | `main` |
| Sincronización | `main` == `origin/main` (`f25de2f`) |
| Total de commits | 65 |
| Tags | `v1-cpanel-php` — baseline desplegable cPanel (backend PHP + .htaccess + specs) |
| Hooks | Husky `pre-commit`: `npx tsc --noEmit` + `npm run lint` |

## Branches

Rama de integración (protegida de facto):

```text
main
```

Ramas del historial reciente:

| Rama | Estado |
| --- | --- |
| `events-ig-booking` | Ya fusionada en `main`. El remoto `origin/events-ig-booking` fue borrado el 2026-09-20; queda copia local pendiente de limpiar. |
| `chore/optimize-bundle-and-security` | **Cerrada el 2026-09-20**: su contenido (lazy loading de páginas) ya estaba implementado y superado en `main`. El commit `290f969` quedó archivado en el tag `archive/optimize-bundle-and-security` por si se necesita el patrón `manualChunks` de three.js. |

Flujo recomendado (GitHub flow liviano):

1. Partir siempre de `main` actualizado.
2. Mantener la rama acotada a una feature, fix o pasada de docs.
3. Correr checks localmente antes de pushear.
4. Abrir PR contra `main` (aunque también se han usado pushes
   directos a `main` para cambios pequeños; evitarlo para cambios de
   pagos o deploy).

Ejemplo:

```bash
git checkout main
git pull
git checkout -b docs/git-workflow-refresh
```

## Commit Style

El historial (65 commits) usa Conventional Commits de forma consistente.
Ejemplos reales recientes:

```text
feat(raffle): support scroll percentage trigger and global pages visibility
feat(seo): add llms.txt for agent/LLM discoverability
fix(cpanel): fix Windows tar drive-letter bug, add git-native cPanel deploy
feat(php): backend cPanel Apache+MySQL (puerto 1:1 de api/*.ts)
refactor(structure): reorganize root source files into src and docs
chore: add speckit configuration and update claude settings
```

Scopes vistos en el historial: `payments`, `ui`, `seo`, `security`,
`cpanel`, `php`, `portugal`, `content`, `legal`, `header`, `footer`,
`hero`, `uiux`, `raffle`, `leads`, `review`, `structure`, `branding`,
`launch`, `dev`, `ux`, `branch` opcional.

Tipos recomendados:

| Type | Use for |
| --- | --- |
| `feat` | New behavior or visible capability |
| `fix` | Bug fixes and regressions |
| `refactor` | Code movement or simplification without behavior change |
| `docs` | README, docs and comments |
| `test` | Test changes |
| `chore` | Tooling, dependencies or repo maintenance |
| `ci` | CI/CD and deployment automation |
| `perf` | Performance improvements (usar en la rama de bundle optimization) |

## Antes De Commit

El hook Husky `pre-commit` corre automáticamente:

```bash
npx tsc --noEmit
npm run lint
```

Los errores de TypeScript bloquean el commit antes de que Git lo grabe.

Antes de pushear o abrir PR, correr además:

```bash
npm run build
npm run test:run
```

## Deploy

El deploy a producción no es automático con `git push`. Existen dos vías
documentadas:

- **Vercel:** config en `vercel.json`; los deploys de producción se han
  disparado con commits `ci: trigger Vercel production deploy`.
- **cPanel vía Git:** flujo documentado en
  [docs/DEPLOY_CPANEL_GIT.md](DEPLOY_CPANEL_GIT.md) con `.cpanel.yml`
  y el packager `npm run pack:cpanel`. El tag `v1-cpanel-php` marca el
  baseline desplegable de esa vía.

Regla: ningún push a `main` de código de pagos, seguridad o deploy sin
haber corrido `npm run lint`, `npm run build` y `npm run test:run`.

## Pull Request Checklist

- Scope is clear and limited.
- README/docs updated when behavior, setup, env vars, API or schema changes.
- `.env`, `.env.local`, logs and `dist/` are not committed.
- Payment changes document any required provider dashboard or webhook setting.
- API changes update `docs/API_ENDPOINTS.md`.
- DB changes update `docs/DATABASE_SCHEMA.md`.
- UI system changes update `design-system/MASTER.md`.
- Cambios de deploy (Vercel/cPanel) documentados en
  `docs/DEPLOY_CPANEL_GIT.md` o en la descripción del PR.

## Suggested PR Description

```markdown
## Summary
- What changed
- Why it changed

## Verification
- npm run lint
- npm run build
- npm run test:run

## Notes
- Env vars, migrations, provider setup or follow-up work
```

## Release Notes

Para cambios que impactan producción, mencionar:

- User-visible behavior.
- Payment or checkout impact.
- Required environment variables.
- Any manual Vercel, Mercado Pago, Wompi, SMTP or database step.

## Mantenimiento De Este Documento

Actualizar la fecha y las tablas de este documento cuando:

- Se fusione o borre una rama.
- Se cree un tag de release.
- Cambie el hook pre-commit o la lista de checks.

Comando rápido para refrescar el estado:

```bash
git branch -a && git log --oneline -10 && git tag -n1
```

## Archivo De Ramas Cerradas

Las ramas cerradas se marcan con un tag `archive/<nombre>` apuntando a su
último commit antes de borrarlas, para poder rescatar trabajo sin mantener
ramas vivas:

| Tag | Rama original | Motivo del cierre |
| --- | --- | --- |
| `archive/optimize-bundle-and-security` | `chore/optimize-bundle-and-security` | Lazy loading y chunking ya presentes en `main`; patrón `manualChunks` rescatable desde el tag si se necesita |
