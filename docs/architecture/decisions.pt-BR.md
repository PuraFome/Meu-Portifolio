# Registros de Decisão de Arquitetura

> Decisões de arquitetura para o Meu Portifolio.
>
> [Read in English](decisions.md)

---

## ADR-001: Monorepo com Nx

- **Status:** Aceito
- **Data:** 2026-06-01

### Contexto

O projeto possui múltiplas aplicações (frontend Angular, API NestJS) que compartilham modelos de domínio, funções utilitárias e tipos TypeScript. Sem uma ferramenta de monorepo, o compartilhamento de código exige imports relativos complexos, versionamento manual de pacotes compartilhados ou um pipeline de build separado. Diferentes partes da stack também precisam de regras consistentes de lint, teste e formatação.

### Decisão

Usar o workspace Nx com os plugins Angular, NestJS e Jest. Utilizar o grafo de projetos do Nx para gerenciar dependências, habilitar cache de computação entre membros do time e gerar código de forma consistente. Versão utilizada: Nx 22.7.5 (Angular 21.2, NestJS 11).

### Consequências

- **Positivas.** O Nx armazena em cache saídas de build, resultados de teste e execuções de lint, tornando CI e iteração local mais rápidos. O grafo de dependências reforça uma arquitetura limpa e previne imports circulares. A geração de código (generators) cria arquivos consistentes em todo o workspace.
- **Positivas.** Bibliotecas compartilhadas para modelos de domínio e utilitários ficam em `libs/`, consumidas por ambas as apps via aliases de caminho do TypeScript.
- **Negativas.** O Nx adiciona sobrecarga de CLI e uma curva de aprendizado para novos contribuidores. A configuração do workspace (`nx.json`, arquivos project.json) aumenta a complexidade do projeto.
- **Negativas.** Atualizar versões principais do Nx pode exigir scripts de migração e mudanças de configuração.

---

## ADR-002: Componentes Standalone Angular

- **Status:** Aceito
- **Data:** 2026-06-01

### Contexto

O frontend Angular possui múltiplos módulos de funcionalidade que carregam sob demanda (lazy loading). A arquitetura tradicional baseada em NgModule exige um arquivo de módulo por funcionalidade, um módulo de roteamento e declarações manuais de cada componente. Isso gera boilerplate e dificulta refatorações, pois mover um componente entre módulos exige atualizar declarações e imports.

### Decisão

Construir todos os componentes, diretivas e pipes como standalone (sem wrapper NgModule). Usar bootstrap standalone para a aplicação raiz e configuração de roteamento standalone. Versão Angular: 21.2.

### Consequências

- **Positivas.** Menos boilerplate: sem classes NgModule, sem `declarations`, sem `entryComponents`. Cada componente importa apenas o que precisa.
- **Positivas.** Bundles de produção menores porque o tree-shaking funciona de forma mais eficaz sem wrappers de módulo.
- **Positivas.** Lazy loading é mais simples: rotas apontam diretamente para componentes standalone, sem o padrão `loadChildren: () => import(...).then(m => m.Module)`.
- **Negativas.** Algumas bibliotecas de terceiros podem não suportar totalmente componentes standalone ainda, exigindo módulos wrapper ou workarounds.
- **Negativas.** Desenvolvedores precisam ser disciplinados com os arrays `imports` para evitar duplicação entre componentes.

---

## ADR-003: Tailwind v4 CSS-first

- **Status:** Aceito
- **Data:** 2026-06-01

### Contexto

O projeto precisa de estilização consistente e sustentável sem comprometer com um framework CSS pesado como Bootstrap ou Material Design (que adicionam opiniões específicas de componentes). As classes utilitárias do Tailwind oferecem flexibilidade, mas versões anteriores (v2, v3) exigiam um arquivo de configuração JavaScript (`tailwind.config.js`), setup PostCSS e customização complexa.

### Decisão

Usar Tailwind v4 com a abordagem de configuração CSS-first: `@import "tailwindcss"` no `styles.css`. Sem arquivo de configuração JavaScript. Tokens de design personalizados são definidos via diretivas `@theme` no CSS. Build via `@import` CSS nativo e Lightning CSS (padrão do Tailwind v4).

### Consequências

- **Positivas.** Zero configuração JavaScript: sem `tailwind.config.js`, sem setup PostCSS, sem plugins em arquivo de configuração. Tudo está no CSS.
- **Positivas.** Tokens `@theme` substituem o padrão JS `theme.extend`, mantendo decisões de design em um só lugar (CSS).
- **Positivas.** Tempos de build mais rápidos graças à integração com Lightning CSS e builds incrementais.
- **Negativas.** Tailwind v4 é mais novo, então recursos da comunidade e compatibilidade com plugins de terceiros ainda estão em evolução.
- **Negativas.** Configuração CSS-first significa que não há geração dinâmica de temas via JS (ex.: computação programática de tokens). Trade-off aceito por simplicidade.

---

## ADR-004: CockroachDB + Prisma

- **Status:** Aceito
- **Data:** 2026-06-01

### Contexto

A aplicação de portfólio armazena dados relacionais (projetos, habilidades, experiências, posts de blog). Requisitos: compatibilidade com PostgreSQL para consultas ricas, escalabilidade horizontal para baixa sobrecarga operacional e acesso type-safe ao banco de dados a partir da API NestJS. O banco precisa lidar com baixo tráfego de forma confiável, mas a opção de escalar é valiosa.

### Decisão

Usar CockroachDB (SQL distribuído, compatível com wire protocol do PostgreSQL) como banco de dados, com Prisma como ORM. Usar `@prisma/adapter-pg` como driver de banco. O schema único do Prisma está em `apps/api/prisma/schema.prisma`.

### Consequências

- **Positivas.** CockroachDB oferece compatibilidade com PostgreSQL (dialeto SQL, protocolo), então Prisma e ferramentas PG existentes funcionam com mudanças mínimas.
- **Positivas.** Prisma gera tipos TypeScript a partir do schema, fornecendo segurança em tempo de compilação para todas as consultas ao banco. Migrações são declarativas e versionadas.
- **Positivas.** Escalabilidade horizontal e tolerância a falhas: CockroachDB lida com falhas de nós automaticamente, útil se o projeto crescer ou migrar para um cluster de produção.
- **Negativas.** CockroachDB tem diferenças sutis em relação ao PostgreSQL (ex.: isolamento serializável, procedimentos armazenados limitados). Alguns recursos do Prisma (ex.: `createMany`) podem ter limitações.
- **Negativas.** Executar CockroachDB localmente para desenvolvimento requer mais recursos que SQLite ou um container Postgres simples.

---

> As decisões são registradas como Architecture Decision Records (ADRs) seguindo o formato [MADR](https://adr.github.io/madr/).
