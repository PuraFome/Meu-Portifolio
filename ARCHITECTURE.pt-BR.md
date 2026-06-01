# Arquitetura

> Arquitetura do monorepo do Meu Portfolio.

🇬🇧 [View in English](ARCHITECTURE.md)

---

## Visao geral

Este e um monorepo Nx que gerencia tres aplicacoes e duas bibliotecas compartilhadas. O workspace usa Nx 22.7.5 com plugins dedicados para Angular, NestJS e Jest. TypeScript ~5.9 em todo o codigo com modo strict ativado.

### Resumo da stack

| Camada       | Tecnologia                        |
| ------------ | --------------------------------- |
| Monorepo     | Nx 22.7.5                         |
| Frontend     | Angular 21.2 standalone           |
| Estilizacao  | Tailwind v4 CSS-first             |
| Backend      | NestJS 11                         |
| Banco        | CockroachDB via Prisma 7.8        |
| Linguagem    | TypeScript ~5.9 (strict)          |

---

## Estrutura de pastas

```
meu-portifolio/
├── apps/
│   ├── api/                         # API REST NestJS
│   │   ├── prisma/
│   │   │   └── schema.prisma        # Modelos User + Project
│   │   └── src/
│   │       ├── main.ts              # Bootstrap, porta 3000, prefixo global /api
│   │       ├── app/
│   │       │   ├── app.module.ts    # Modulo raiz (importa PrismaModule)
│   │       │   ├── app.controller.ts # GET /api → { message: "Hello API" }
│   │       │   ├── app.service.ts
│   │       │   └── prisma/
│   │       │       ├── prisma.module.ts
│   │       │       └── prisma.service.ts  # PrismaClient + adapter PrismaPg
│   │       └── generated/prisma/    # Cliente Prisma (gitignored)
│   │
│   ├── admin/                       # Painel admin Angular
│   │   └── src/
│   │       ├── main.ts              # bootstrapApplication (standalone)
│   │       ├── styles.css           # @import "tailwindcss" + tokens @theme
│   │       └── app/
│   │           ├── app.ts           # Componente raiz standalone
│   │           ├── app.config.ts    # Router + error listeners
│   │           ├── app.routes.ts    # /login, /projects, /projects/new, /projects/:id/edit
│   │           ├── guards/
│   │           │   └── auth.guard.ts      # Guard frontend (checa localStorage)
│   │           ├── services/
│   │           │   └── auth.service.ts    # Get/set/logout token (sem API real)
│   │           ├── login/
│   │           │   └── login.component.ts # Stub: <p>login works!</p>
│   │           └── projects/
│   │               ├── project-list/
│   │               │   └── project-list.component.ts  # Stub
│   │               └── project-form/
│   │                   └── project-form.component.ts  # Stub
│   │
│   └── portfolio-public/            # Portfolio publico Angular
│       └── src/
│           ├── main.ts              # bootstrapApplication (standalone)
│           ├── styles.css           # @import "tailwindcss" + tokens @theme
│           └── app/
│               ├── app.ts
│               ├── app.config.ts
│               ├── app.routes.ts    # /projects, /projects/:id
│               └── projects/
│                   ├── project-list/
│                   │   └── project-list.component.ts   # Stub: "Carregando projetos..."
│                   └── project-detail/
│                       └── project-detail.component.ts # Stub: "Carregando projeto..."
│
├── libs/
│   ├── shared-types/                # Interfaces TypeScript e DTOs
│   │   └── src/lib/
│   │       └── project.interface.ts # Project, CreateProjectDto, UpdateProjectDto, LoginDto, AuthResponse
│   │
│   └── shared-ui/                   # Componentes Angular standalone reutilizaveis
│       └── src/lib/
│           ├── project-card/
│           │   └── project-card.component.ts      # Card com imagem, badges, links
│           ├── loading-spinner/
│           │   └── loading-spinner.component.ts    # Spinner SVG (sm/md/lg)
│           ├── empty-state/
│           │   └── empty-state.component.ts        # Estado vazio com mensagem
│           └── error-message/
│               └── error-message.component.ts      # Banner de erro estilo alerta
│
├── nx.json                         # Config Nx: plugins, caching, generators
├── package.json                    # Dependencias e scripts
├── tsconfig.base.json              # Config TS compartilhada com path aliases
├── prisma.config.ts                # Config do CLI Prisma
└── .env                            # DATABASE_URL (uma variavel)
```

---

## Fluxo de dados (atual)

```
                  ┌──────────────────┐
                  │  CockroachDB     │
                  │  localhost:26257 │
                  └────────┬─────────┘
                           │
                  ┌────────▼─────────┐
                  │  API (NestJS)    │
                  │  localhost:3000  │
                  │  GET /api apenas │
                  └────────┬─────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
┌─────────▼──────────┐          ┌──────────▼─────────┐
│  portfolio-public   │          │  admin              │
│  localhost:4200     │          │  localhost:4201     │
│  Portfolio publico  │          │  Painel admin       │
│  Sem auth           │          │  Com auth guard     │
└────────────────────┘          └────────────────────┘
```

A API expoe um unico endpoint `GET /api` que retorna `{ message: "Hello API" }`. Nao existem endpoints CRUD ainda. Ambos os apps Angular exibem conteudo placeholder. Nenhum dado real trafega entre o banco e os frontends.

---

## Decisoes de arquitetura

### Por que Nx

- **Builds incrementais e cache**: o Nx armazena em cache as saidas de `build`, `test` e `lint`. Reexecutar um target em codigo nao alterado retorna instantaneamente do cache.
- **Grafo de dependencias**: `nx graph` mostra as relacoes entre apps e libs, deixando claro quando uma alteracao em `shared-types` afeta ambos os apps Angular.
- **Geracao de codigo**: os generators do Nx criam apps, libs e componentes Angular de forma consistente com defaults preconfigurados (standalone, CSS, Jest, ESLint).
- **Ferramentas unificadas**: um unico `nx.json` controla todos os targets, entradas e politicas de cache em todo o monorepo.

### Angular standalone (sem NgModules)

Ambos os frontends usam `bootstrapApplication` em vez de `platformBrowserDynamic` com um `AppModule`. Todos os componentes sao `standalone: true`.

- **Modelo mental mais simples**: nao e necessario declarar componentes em NgModules. Cada componente importa exatamente o que precisa.
- **Bundles menores**: tree-shaking funciona melhor sem os wrappers de NgModule. O framework pode descartar diretivas e pipes nao utilizados em tempo de build.
- **Lazy loading com `loadComponent`**: as rotas apontam diretamente para classes de componente, reduzindo boilerplate.

### Tailwind v4 CSS-first (sem config JS)

- **`@import "tailwindcss"`**: o Tailwind v4 move a configuracao do `tailwind.config.js` para o CSS nativo. A unica configuracao e um unico `@import` na folha de estilo.
- **Tokens `@theme`**: tokens de design personalizados (cores, fontes) sao declarados como variaveis CSS em blocos `@theme`. Nenhum arquivo JavaScript de configuracao para manter.
- **Sem complexidade PostCSS**: o Tailwind v4 funciona como um plugin Vite/Angular sem configuracao adicional de PostCSS.

Tanto `admin` quanto `portfolio-public` compartilham a mesma configuracao de tema:

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #1e293b;
  --font-family-sans: "Inter", sans-serif;
}
```

### CockroachDB com Prisma

- **CockroachDB**: compativel com PostgreSQL, horizontalmente escalavel, resiliente. Roda localmente em `localhost:26257` via um cluster de unico no.
- **Prisma ORM**: acesso type-safe ao banco com cliente auto-gerado. O schema define os modelos `User` e `Project`.
- **`@prisma/adapter-pg`**: o Prisma 7.8 usa um padrao de adapter. O adapter `PrismaPg` se conecta ao protocolo wire PostgreSQL do CockroachDB.
- **PrismaModule e global**: `PrismaService` e registrado como um modulo `@Global()` no NestJS, entao qualquer modulo de funcionalidade pode injeta-lo sem reimportar.

---

## Referencia de portas

| Aplicacao        | Porta | Framework |
| ---------------- | ----- | --------- |
| portfolio-public | 4200  | Angular   |
| admin            | 4201  | Angular   |
| api (NestJS)     | 3000  | NestJS    |
| CockroachDB      | 26257 | CockroachDB |

---

## Path aliases

Definidos no `tsconfig.base.json`:

| Alias                           | Resolve para                          |
| ------------------------------- | ------------------------------------- |
| `@meu-portifolio/shared-types`  | `libs/shared-types/src/index.ts`      |
| `@meu-portifolio/shared-ui`     | `libs/shared-ui/src/index.ts`         |

---

## 🚧 Evolucao planejada

Estes sao os proximos passos do projeto. Eles **nao estao implementados ainda**.

### Autenticacao JWT (lado da API)

- Adicionar `@nestjs/passport` e `@nestjs/jwt` a API.
- Criar um `AuthController` com `POST /api/auth/login` e `POST /api/auth/register`.
- Implementar `LocalStrategy` (email + senha) e `JwtStrategy` (token bearer).
- Retornar um JWT assinado no login. Proteger endpoints de projeto com `@UseGuards(AuthGuard('jwt'))`.
- O frontend admin ja tem `AuthService` e `AuthGuard` prontos no lado do cliente. Eles chamarao os endpoints reais quando a API estiver pronta.

### Endpoints CRUD de projetos

- `GET /api/projects` - listar todos os projetos (publico).
- `GET /api/projects/:id` - obter um projeto (publico).
- `POST /api/projects` - criar projeto (admin apenas, JWT obrigatorio).
- `PUT /api/projects/:id` - atualizar projeto (admin apenas, JWT obrigatorio).
- `DELETE /api/projects/:id` - deletar projeto (admin apenas, JWT obrigatorio).
- O schema Prisma ja tem o modelo `Project`. O `PrismaService` esta pronto para ser injetado em um `ProjectsController`.

### Docker Compose

- Um `docker-compose.yml` vai definir dois servicos: `api` (NestJS) e `cockroachdb`.
- O container da API usara a saida compilada de `dist/apps/api`.
- O CockroachDB usara a imagem oficial `cockroachdb/cockroach` com um volume persistente.
- Variaveis de ambiente serao injetadas via arquivo `.env`.

### Pipeline CI/CD

- Um workflow do GitHub Actions (`.github/workflows/ci.yml`) sera executado a cada push.
- Etapas: instalar dependencias, lint, testar, compilar.
- Deploy para um provedor cloud sera adicionado depois.

---

## Licenca

MIT
