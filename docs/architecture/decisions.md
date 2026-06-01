# Architecture Decision Records

> Architecture decisions for Meu Portifolio.
>
> [Leia em Português](decisions.pt-BR.md)

---

## ADR-001: Monorepo with Nx

- **Status:** Accepted
- **Date:** 2026-06-01

### Context

The project has multiple applications (Angular frontend, NestJS API) that share domain models, utility functions, and TypeScript types. Without a monorepo tool, sharing code requires complex relative imports, manual versioning of shared packages, or a separate build pipeline. Different parts of the stack also need consistent linting, testing, and formatting rules.

### Decision

Use Nx workspace with the Angular, NestJS, and Jest plugins. Leverage Nx project graph to manage dependencies, enable computation caching across team members, and generate code consistently. Version used: Nx 22.7.5 (Angular 21.2, NestJS 11).

### Consequences

- **Positive.** Nx caches build outputs, test results, and lint runs, making CI and local iteration faster. The dependency graph enforces a clean architecture and prevents circular imports. Code generation (generators) creates consistent files across the workspace.
- **Positive.** Shared libraries for domain models and utilities live in `libs/`, consumed by both apps via TypeScript path aliases.
- **Negative.** Nx adds CLI overhead and a learning curve for new contributors. The workspace config (`nx.json`, project.json files) increases project complexity.
- **Negative.** Upgrading Nx major versions can require migration scripts and config changes.

---

## ADR-002: Angular Standalone Components

- **Status:** Accepted
- **Date:** 2026-06-01

### Context

The Angular frontend has multiple feature modules that load on demand (lazy loading). Traditional NgModule-based architecture requires a module file per feature, a routing module, and manual declarations of every component. This creates boilerplate and makes refactoring harder because moving a component between modules requires updating declarations and imports.

### Decision

Build all components, directives, and pipes as standalone (no NgModule wrapper). Use standalone bootstrap for the root application and standalone routing configuration. Angular version: 21.2.

### Consequences

- **Positive.** Less boilerplate: no NgModule classes, no `declarations`, no `entryComponents`. Each component imports only what it needs.
- **Positive.** Smaller production bundles because tree-shaking works more effectively without module wrappers.
- **Positive.** Lazy loading is simpler: routes point directly to standalone components, no `loadChildren: () => import(...).then(m => m.Module)` pattern.
- **Negative.** Some third-party libraries may not fully support standalone components yet, requiring wrapper modules or workarounds.
- **Negative.** Developers must be disciplined about `imports` arrays to avoid duplication across components.

---

## ADR-003: Tailwind v4 CSS-first

- **Status:** Accepted
- **Date:** 2026-06-01

### Context

The project needs consistent, maintainable styling without committing to a heavy CSS framework like Bootstrap or Material Design (which adds component-specific opinions). Tailwind utility classes offer flexibility, but older versions (v2, v3) required a JavaScript config file (`tailwind.config.js`), PostCSS setup, and complex customization.

### Decision

Use Tailwind v4 with the CSS-first configuration approach: `@import "tailwindcss"` in `styles.css`. No JavaScript config file. Custom design tokens are defined via `@theme` directives in CSS. Build via native CSS `@import` and Lightning CSS (Tailwind v4 default).

### Consequences

- **Positive.** Zero JavaScript configuration: no `tailwind.config.js`, no PostCSS setup, no plugins in a config file. Everything is in CSS.
- **Positive.** `@theme` tokens replace the JS `theme.extend` pattern, keeping design decisions in one place (CSS).
- **Positive.** Faster build times due to Lightning CSS integration and incremental builds.
- **Negative.** Tailwind v4 is newer, so community resources and third-party plugin compatibility are still catching up.
- **Negative.** CSS-first configuration means no dynamic theme generation via JS (e.g., programmatic token computation). Trade-off accepted for simplicity.

---

## ADR-004: CockroachDB + Prisma

- **Status:** Accepted
- **Date:** 2026-06-01

### Context

The portfolio application stores relational data (projects, skills, experiences, blog posts). Requirements: PostgreSQL compatibility for rich querying, horizontal scaling for low operational overhead, and type-safe database access from the NestJS API. The database must handle low traffic reliably, but the option to scale is valuable.

### Decision

Use CockroachDB (distributed SQL, PostgreSQL-wire compatible) as the database, with Prisma as the ORM. Use `@prisma/adapter-pg` for the database driver. The single Prisma schema lives at `apps/api/prisma/schema.prisma`.

### Consequences

- **Positive.** CockroachDB provides PostgreSQL compatibility (SQL dialect, protocol) so Prisma and existing PG tooling work with minimal changes.
- **Positive.** Prisma generates TypeScript types from the schema, giving compile-time safety for all database queries. Migrations are declarative and version-controlled.
- **Positive.** Horizontal scaling and fault tolerance: CockroachDB handles node failures automatically, useful if the project grows or moves to a production cluster.
- **Negative.** CockroachDB has subtle differences from PostgreSQL (e.g., serializable isolation, limited stored procedures). Some Prisma features (e.g., `createMany`) may have limitations.
- **Negative.** Running CockroachDB locally for development requires more resources than SQLite or a simple Postgres container.

---

> Decisions are recorded as Architecture Decision Records (ADRs) following the [MADR](https://adr.github.io/madr/) format.
