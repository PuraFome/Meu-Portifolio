# Meu Portfólio

![Nx](https://img.shields.io/badge/Nx-22.7.5-blue)
![Angular](https://img.shields.io/badge/Angular-21.2-red)
![NestJS](https://img.shields.io/badge/NestJS-11-ea2845)
![Prisma](https://img.shields.io/badge/Prisma-7.8-2d3748)
![Tailwind](https://img.shields.io/badge/Tailwind-4.3.0-06b6d4)
![License](https://img.shields.io/badge/License-MIT-green)

Monorepo de portfólio pessoal em estágio MVP. Construído com Nx, API NestJS, frontends Angular, Prisma + CockroachDB.

---

## ✨ Destaques

O que já funciona:

- **Monorepo Nx** com 3 apps e 2 libs
- **API NestJS** (porta 3000) com prefixo global `/api`, `PrismaModule` + `PrismaService` configurados para CockroachDB
- **Schema Prisma** com modelos `User` e `Project`, adaptador para CockroachDB via `@prisma/adapter-pg`
- **Apps Angular 21** usando componentes standalone (`portfolio-public` na porta 4200, `admin` na porta 4201)
- **Tailwind v4** CSS-first (`@import "tailwindcss"`) com tokens de tema customizados
- **Lib shared-types**: interfaces `Project`, `CreateProjectDto`, `UpdateProjectDto`, `LoginDto`, `AuthResponse`
- **Lib shared-ui**: componentes `ProjectCard`, `LoadingSpinner`, `EmptyState`, `ErrorMessage`
- **App Admin**: `AuthService` (gerenciamento de token no frontend), `AuthGuard` (guarda de rota), `LoginComponent` placeholder

---

## 🚧 Em desenvolvimento

Status honesto do que ainda está faltando:

- **Autenticação JWT** não está implementada no lado da API. Sem Passport, sem controller de autenticação, sem geração de token. O app admin tem um guard de frontend e um `LoginComponent` de esboço, mas não há para onde fazer login.
- **Endpoints CRUD** para projetos não existem. A API só tem um `GET /api` que retorna `{ message: "Hello API" }`.
- **Dados reais de projetos** não estão sendo carregados. `ProjectListComponent` e `ProjectDetailComponent` exibem texto placeholder.
- **Configuração Docker Compose** ainda não existe.
- **Scripts de seed** e **migrations** não foram configurados.
- **Testes** existem apenas como scaffolding gerado, sem cobertura real.

---

## Stack

| Camada       | Tecnologia                            |
| ------------ | ------------------------------------- |
| Monorepo     | Nx 22.7.5                             |
| Frontend     | Angular 21.2, Tailwind 4.3.0          |
| Backend      | NestJS 11                              |
| Banco de dados | CockroachDB via Prisma 7.8             |
| Linguagem    | TypeScript ~5.9                        |

---

## Estrutura do monorepo

```
apps/
├── api/                    # API REST NestJS
├── admin/                  # Dashboard admin Angular
└── portfolio-public/       # Portfólio público Angular
libs/
├── shared-types/           # Interfaces TypeScript e DTOs
└── shared-ui/              # Componentes de UI reutilizáveis
```

---

## Pré-requisitos

- **Node.js** 20+
- **npm** (já vem com o Node)
- **Docker** (para rodar CockroachDB localmente)

---

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
# Crie um arquivo .env na raiz do projeto com:
# DATABASE_URL="postgresql://root@localhost:26257/defaultdb?sslmode=disable"
# JWT_SECRET=your-secret-key
# PORT=3000

# 3. Gerar cliente Prisma
npx prisma generate --schema=apps/api/prisma/schema.prisma

# 4. Iniciar a API (porta 3000)
npx nx serve api

# 5. Em outro terminal, iniciar o portfólio público (porta 4200)
npx nx serve portfolio-public

# 6. Ou iniciar o dashboard admin (porta 4201)
npx nx serve admin
```

---

## Scripts disponíveis

| Script                           | Descrição                     |
| -------------------------------- | ----------------------------- |
| `npx nx serve api`               | Iniciar API NestJS            |
| `npx nx serve portfolio-public`  | Iniciar portfólio público     |
| `npx nx serve admin`             | Iniciar dashboard admin       |
| `npx nx test <project>`          | Rodar testes de um projeto    |
| `npx nx run-many -t test`        | Rodar todos os testes         |

---

## Variáveis de ambiente

| Variável       | Obrigatória | Padrão | Descrição                                  |
| -------------- | ----------- | ------ | ------------------------------------------ |
| `DATABASE_URL` | Sim         | -      | String de conexão do CockroachDB           |
| `JWT_SECRET`   | Não         | -      | Chave secreta para JWT (ainda não implementado) |
| `PORT`         | Não         | 3000   | Porta do servidor API                      |

---

## Deploy

Em breve. Configuração Docker Compose está planejada. Nenhuma URL ativa ainda.

---

## Licença

[MIT](LICENSE)

---

🇺🇸 [View in English](README.md)
