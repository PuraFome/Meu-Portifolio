# Changelog

Todas as alteracoes notaveis neste projeto serao documentadas neste arquivo.

O formato e baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semantico](https://semver.org/spec/v2.0.0.html).

## [Nao Lancado]

### Planejado

- Autenticacao JWT com Passport.js
- Endpoints CRUD de projetos
- Configuracao do Docker Compose
- Scripts de seed e migracoes do banco
- Componente de login e interface de gerenciamento de projetos
- Pipeline CI/CD

## [0.0.0] - 2026-06-01

### Adicionado

- Monorepo Nx com 3 apps (`api`, `admin`, `portfolio-public`) e 2 libs (`shared-types`, `shared-ui`)
- API NestJS com `PrismaModule` e `PrismaService` configurada para CockroachDB
- Schema Prisma com modelos `User` e `Project`, adaptador para CockroachDB via `@prisma/adapter-pg`
- Apps Angular 21 usando componentes standalone (`portfolio-public` na porta 4200, `admin` na porta 4201)
- Tailwind v4 CSS-first (`@import "tailwindcss"`) com tokens de tema personalizados em ambos os apps Angular
- Biblioteca `shared-types`: interfaces `Project`, `CreateProjectDto`, `UpdateProjectDto`, `LoginDto`, `AuthResponse`
- Biblioteca `shared-ui`: componentes `ProjectCard`, `LoadingSpinner`, `EmptyState`, `ErrorMessage`
- App admin: `AuthService` (gerenciamento de token no frontend), `AuthGuard` (guarda de rota), `LoginComponent` placeholder
- README com visao geral do projeto, stack, instrucoes de configuracao e variaveis de ambiente

[308d288](https://github.com/Pura-Fome/Meu-Portifolio/commit/308d288) - Initial commit
[975831f](https://github.com/Pura-Fome/Meu-Portifolio/commit/975831f) - docs(readme): add complete README with project overview and stack
