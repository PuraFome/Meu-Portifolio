# Visão Geral do Frontend

> **Idioma:** Português &mdash; [Read in English](overview.md)

## Stack

| Tecnologia    | Versão   |
| ------------- | -------- |
| Angular       | 21.2     |
| Tailwind CSS  | 4.3.0    |
| Nx            | 22.7.5   |
| TypeScript    | ~5.9     |

## Estrutura do Projeto

```
apps/
├── portfolio-public/       # Site público do portfólio (porta 4200)
│   └── src/app/
│       └── projects/
│           ├── project-list/    # Página de listagem (esboço)
│           └── project-detail/  # Página de detalhes (esboço)
└── admin/                  # Painel administrativo (porta 4201)
    └── src/app/
        ├── login/                # Página de login (esboço)
        ├── projects/
        │   ├── project-list/     # Listagem admin (esboço)
        │   └── project-form/     # Formulário criar/editar (esboço)
        ├── services/
        │   └── auth.service.ts   # Gerenciamento de token (frontend)
        └── guards/
            └── auth.guard.ts     # Guarda de rota (frontend apenas)
libs/
├── shared-types/           # Interfaces TypeScript e DTOs
│   └── src/lib/
│       ├── project.interface.ts  # Project, CreateProjectDto, UpdateProjectDto
│       └── auth.interface.ts     # LoginDto, AuthResponse
└── shared-ui/              # Componentes de UI reutilizáveis
    └── src/lib/
        ├── project-card/         # Cartão de projeto
        ├── loading-spinner/      # Indicador de carregamento
        ├── empty-state/          # Estado vazio
        └── error-message/        # Exibição de erro
```

## Funcionalidades Implementadas

Estas partes estão funcionando:

### Componentes Compartilhados (shared-ui)
Os quatro componentes estão exportados e prontos para uso:

- **`ProjectCardComponent`** &mdash; Exibe miniatura do projeto com título, tags de tecnologia e links.
- **`LoadingSpinnerComponent`** &mdash; Indicador de carregamento animado.
- **`EmptyStateComponent`** &mdash; Placeholder para quando não há dados.
- **`ErrorMessageComponent`** &mdash; Exibe mensagens de erro.

### Tipos Compartilhados (shared-types)
A biblioteca exporta todas as interfaces necessárias:

- `Project` &mdash; Entidade completa do projeto.
- `CreateProjectDto` &mdash; Dados para criar um projeto.
- `UpdateProjectDto` &mdash; Tipo parcial para atualizações.
- `LoginDto` &mdash; Dados de email + senha.
- `AuthResponse` &mdash; Resposta esperada do token `{ access_token, user }`.

### Aplicativo Público (portfolio-public)
- Aplicação Angular standalone servida na porta 4200.
- Duas rotas definidas em `app.routes.ts`:
  - `/projects` &mdash; `ProjectListComponent` (lazy loading)
  - `/projects/:id` &mdash; `ProjectDetailComponent` (lazy loading)
- Redirecionamento padrão de `/` para `/projects`.

### Aplicativo Admin (admin)
- Aplicação Angular standalone servida na porta 4201.
- Rotas definidas em `app.routes.ts`:
  - `/login` &mdash; `LoginComponent` (público)
  - `/projects` &mdash; `ProjectListComponent` (protegido por `AuthGuard`)
  - `/projects/new` &mdash; `ProjectFormComponent` (protegido)
  - `/projects/:id/edit` &mdash; `ProjectFormComponent` (protegido)
  - Redirecionamento padrão de `/` para `/projects`.

### AuthService
- Gerencia um token `admin_token` no `localStorage`.
- Fornece os métodos `getToken()`, `isAuthenticated()` e `logout()`.
- **Frontend apenas** &mdash; não existe endpoint JWT no backend ainda.

### AuthGuard
- Guarda de rota que verifica `AuthService.isAuthenticated()`.
- Redireciona para `/login` se não houver token.
- **Frontend apenas** &mdash; não valida o token contra o servidor.

## Conteúdo Placeholder (Esboços)

Estes componentes existem mas mostram apenas texto placeholder. Não estão conectados a nenhuma API:

| Componente            | App               | Conteúdo do Template      |
|-----------------------|-------------------|---------------------------|
| ProjectListComponent  | portfolio-public  | `Carregando projetos...`  |
| ProjectDetailComponent| portfolio-public  | `Carregando projeto...`   |
| LoginComponent        | admin             | `login works!`            |
| ProjectListComponent  | admin             | `project-list works!`     |
| ProjectFormComponent  | admin             | `project-form works!`     |

## Funcionalidades Planejadas

Estes itens ainda não foram implementados:

### Integração com API
- `ProjectListComponent` e `ProjectDetailComponent` no app público não buscam dados reais.
- Nenhuma chamada HTTP existe para qualquer endpoint.
- Estados de carregamento, erro e vazio não estão conectados a fontes de dados reais.

### Autenticação no Backend
- `AuthService` pode armazenar um token mas não tem método `login()` que chame uma API.
- `AuthGuard` verifica apenas `localStorage`. Não verifica expiração ou validade do token.
- `LoginComponent` é um esboço sem formulário ou lógica de submit.
- A interface `AuthResponse` está definida mas nunca é produzida por nenhum endpoint.

### CRUD de Projetos no Admin
- `ProjectListComponent` no admin exibe um placeholder estático.
- `ProjectFormComponent` não tem campos de formulário, validação ou handler de submit.
- Não existe camada de serviço HTTP para operações de projeto.

### Testes
- Não existe cobertura de testes significativa para nenhum componente ou serviço do frontend.

## Executando o Frontend

```bash
# Portfólio público (porta 4200)
npx nx serve portfolio-public

# Painel admin (porta 4201)
npx nx serve admin
```

---

[🇺🇸 English Version](overview.md)
