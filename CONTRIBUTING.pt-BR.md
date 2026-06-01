# Contribuindo

Obrigado pelo interesse neste projeto. E um monorepo de portifolio pessoal, entao as contribuicoes sao leves. Este guia mantem a consistencia.

---

## Primeiros passos

As instrucoes de setup estao no [README em Portugues](README.pt-BR.md). Siga as secoes de Pre-requisitos e Setup.

Em resumo:

```bash
npm install
npx prisma generate --schema=apps/api/prisma/schema.prisma
```

---

## Comandos uteis

Todos os comandos usam Nx. Execute-os da raiz do projeto.

| Comando                             | O que faz                         |
| ----------------------------------- | --------------------------------- |
| `npx nx serve api`                  | Inicia API NestJS (porta 3000)    |
| `npx nx serve portfolio-public`     | Inicia portfolio publico (porta 4200) |
| `npx nx serve admin`                | Inicia dashboard admin (porta 4201) |
| `npx nx serve <projeto>`            | Inicia qualquer app ou lib        |
| `npx nx build <projeto>`            | Compila um projeto                |
| `npx nx test <projeto>`             | Roda testes de um projeto         |
| `npx nx run-many -t test`           | Roda todos os testes              |
| `npx nx run-many -t test --coverage`| Roda todos os testes com cobertura|
| `npx nx typecheck <projeto>`        | Verificacao de tipos TypeScript   |
| `npx nx lint <projeto>`             | Lint em um projeto                |
| `npx nx graph`                      | Mostra grafico de dependencias Nx |

Veja [nx.json](nx.json) para a configuracao completa dos targets.

---

## Padroes de codigo

### TypeScript strict mode

O projeto usa modo estrito em [tsconfig.base.json](tsconfig.base.json):

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters` (inferido do strict)
- `noImplicitOverride: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

Nao desabilite estas opcoes. Se um erro estrito te forcAR a afrouxar uma regra, adicione um comentario explicando o motivo.

### Conventional Commits

Todos os commits devem seguir o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descricao>
```

Tipos: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`.

Exemplos:

```
feat(api): adiciona endpoints CRUD de projetos
fix(admin): corrige redirecionamento com token expirado
docs: atualiza README com variaveis de ambiente
```

Este projeto nao tem hooks de commit (sem Husky, sem lint-staged). A disciplina e manual.

### Abordagem TDD

Testes sao escritos com Jest. Cada app e lib tem seu proprio target `test`. O objetivo e escrever testes antes ou junto com o codigo de implementacao.

- Coloque os arquivos de teste ao lado do codigo que testam: `componente.spec.ts` ou `servico.spec.ts`
- Use nomes de teste descritivos que indiquem o comportamento esperado
- Execute `npx nx test <projeto>` antes de abrir um PR para confirmar que nada esta quebrado
- Novas funcionalidades devem incluir testes para caminhos de sucesso e erro

---

## Processo de Pull Request

1. Crie um branch a partir do `main` com um nome curto e descritivo:

   ```
   feat/project-crud
   fix/expired-token
   docs/contributing-guide
   ```

2. Faca suas alteracoes. Mantenha os commits atomicos e siga Conventional Commits.
3. Antes de abrir o PR, passe por esta lista de verificacao:

   - [ ] Testes passam: `npx nx run-many -t test`
   - [ ] Verificacao de tipos passa: `npx nx run-many -t typecheck`
   - [ ] Lint passa: `npx nx run-many -t lint`
   - [ ] Sem artefatos de debug (console.log, codigo comentado, .only nos testes)
   - [ ] Mensagens de commit seguem Conventional Commits
   - [ ] Branch esta atualizado com o `main`

4. Abra um pull request contra o `main`. Como e um projeto pessoal, o unico revisor e o mantenedor. Espere revisao em alguns dias.
5. Responda aos feedbacks da revisao. Squash nos commits se solicitado.

---

## Ambiente de desenvolvimento

Setup recomendado:

- **Editor**: VSCode
- **Extensoes**:
  - Angular Language Service (nativo com Nx)
  - ESLint
  - Prettier
  - Jest
  - Prisma
  - Tailwind CSS IntelliSense (se estiver usando sintaxe v3)
- **Terminal**: Terminal integrado do VSCode ou seu shell preferido

O repositorio inclui um `.vscode/settings.json` com configuracoes basicas do workspace. Voce pode estende-lo, mas nao commit preferencias pessoais.

---

## Duvidas?

Abra uma issue ou entre em contato direto. Este e um projeto pequeno, entao mantenha as coisas simples.

---

[🇺🇸 View in English](CONTRIBUTING.md)
