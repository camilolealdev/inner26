# Contributing

This repo uses a lightweight GitHub flow around `main`.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure payment, database and SMTP variables only when you need to test the
serverless commerce flow.

## Before Opening A PR

The Husky `pre-commit` hook runs `npx tsc --noEmit` and `npm run lint`
automatically. Before pushing, run:

```bash
npm run build
npm run test:run
```

## Commit Messages

Use Conventional Commits:

```text
feat(scope): short description
fix(scope): short description
docs(scope): short description
refactor(scope): short description
```

More details: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md).

## Documentation Rules

- Update `README.md` when setup, scripts, deploy or project scope changes.
- Update `docs/API_ENDPOINTS.md` when adding or changing an API route.
- Update `docs/DATABASE_SCHEMA.md` when changing tables, constraints or status values.
- Update `design-system/MASTER.md` when changing shared design tokens or UI primitives.
- Update `docs/GIT_WORKFLOW.md` (branches, tags, hooks) when repo structure changes.
- Update `docs/DEPLOY_CPANEL_GIT.md` when changing `.cpanel.yml` or the cPanel deploy flow.
- Update `server-php/ROUTES.md` when adding or changing a mirrored PHP endpoint.
