# Visão Geral do Backend

> **Idioma:** Português &mdash; [Read in English](overview.md)

## Stack

| Tecnologia    | Versão   |
| ------------- | -------- |
| NestJS        | 11       |
| Prisma        | 7.8      |
| CockroachDB   | (driver) |
| Nx            | 22.7.5   |
| TypeScript    | ~5.9     |

## Estrutura do Projeto

```
apps/api/src/app/
├── app.controller.ts      # Controller raiz (GET /api)
├── app.module.ts          # Módulo raiz
├── app.service.ts         # Service raiz
└── prisma/
    ├── prisma.module.ts   # Módulo global do Prisma
    └── prisma.service.ts  # Wrapper do PrismaClient (CockroachDB)
```

O schema do banco fica em `apps/api/prisma/schema.prisma`. O cliente Prisma gerado está em `apps/api/src/generated/prisma/`.

## Funcionalidades Implementadas

Estas partes estão funcionando:

### AppModule + PrismaModule
- `AppModule` importa `PrismaModule` e registra `AppController` + `AppService`.
- `PrismaModule` é um módulo global que fornece `PrismaService` (estende `PrismaClient`) configurado com o adaptador CockroachDB (`@prisma/adapter-pg`).

### Endpoint Raiz
- **`GET /api`** retorna `{ "message": "Hello API" }`.
- A API tem prefixo global `/api` definido no `main.ts`.

### Schema do Prisma
Dois modelos estão definidos:

**User**
| Campo     | Tipo     | Observações          |
|-----------|----------|----------------------|
| id        | String   | UUID (automático)    |
| email     | String   | Único                |
| senha     | String   | Hash bcrypt (planejado)|
| createdAt | DateTime | Automático           |
| updatedAt | DateTime | Automático           |

**Project**
| Campo        | Tipo     | Observações          |
|--------------|----------|----------------------|
| id           | String   | UUID (automático)    |
| titulo       | String   |                      |
| descricao    | String   |                      |
| tecnologias  | String[] | Lista de tecnologias |
| imagemUrl    | String?  | Opcional             |
| linkDemo     | String?  | Opcional             |
| linkRepo     | String?  | Opcional             |
| destaque     | Boolean  | Padrão false         |
| createdAt    | DateTime | Automático           |
| updatedAt    | DateTime | Automático           |

## Funcionalidades Planejadas

Estes itens ainda não foram implementados:

### AuthModule
- Autenticação JWT com Passport.
- Endpoint `POST /api/auth/login` para validar credenciais e retornar token.
- Decorator `@UseGuards(JwtAuthGuard)` para rotas protegidas.
- O `AuthService` do frontend já espera resposta no formato `{ access_token, user }`.

### ProjectsModule
- CRUD completo para projetos:
  - `GET /api/projects` &mdash; listar projetos
  - `GET /api/projects/:id` &mdash; buscar projeto por ID
  - `POST /api/projects` &mdash; criar projeto (admin apenas)
  - `PUT /api/projects/:id` &mdash; atualizar projeto (admin apenas)
  - `DELETE /api/projects/:id` &mdash; deletar projeto (admin apenas)
- Validação de entrada com `class-validator` e `class-transformer`.

### UsersModule
- Endpoints de gerenciamento de usuários.
- Criação de usuários admin e gerenciamento de papéis.

### Migrações e Seed
- Migrações do Prisma ainda não foram criadas.
- Não existe script de seed para dados de desenvolvimento.

### Docker Compose
- Nenhum setup Docker Compose para CockroachDB ou a API.

## Design da API

- **Estilo:** RESTful
- **Prefixo:** `/api` (definido globalmente)
- **Validação:** `class-validator` / `class-transformer` disponíveis porém não configurados
- **Estratégia de autenticação:** JWT via `@nestjs/jwt` + `@nestjs/passport` (planejado)

## Variáveis de Ambiente

| Variável       | Obrigatório | Padrão | Descrição                               |
| -------------- | ----------- | ------ | --------------------------------------- |
| `DATABASE_URL` | Sim         | -      | String de conexão do CockroachDB        |
| `JWT_SECRET`   | Não         | -      | Chave secreta JWT (ainda não implementada)|
| `PORT`         | Não         | 3000   | Porta do servidor API                   |

## Executando a API

```bash
npx nx serve api
```

O servidor inicia em `http://localhost:3000`.

---

[🇺🇸 English Version](overview.md)
