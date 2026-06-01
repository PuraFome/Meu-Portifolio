# Contributing

Thanks for your interest in this project. Its a personal portfolio monorepo, so contributions are light touch. This guide keeps things consistent.

---

## Getting started

Setup instructions are in the [README](README.md). Follow the Prerequisites and Setup sections there.

In short:

```bash
npm install
npx prisma generate --schema=apps/api/prisma/schema.prisma
```

---

## Useful commands

All commands use Nx. Run them from the project root.

| Command                             | What it does                     |
| ----------------------------------- | -------------------------------- |
| `npx nx serve api`                  | Start NestJS API (port 3000)     |
| `npx nx serve portfolio-public`     | Start public portfolio (port 4200) |
| `npx nx serve admin`                | Start admin dashboard (port 4201) |
| `npx nx serve <project>`            | Serve any app or lib             |
| `npx nx build <project>`            | Build a project                  |
| `npx nx test <project>`             | Run tests for one project        |
| `npx nx run-many -t test`           | Run all tests                    |
| `npx nx run-many -t test --coverage`| Run all tests with coverage      |
| `npx nx typecheck <project>`        | TypeScript type check            |
| `npx nx lint <project>`             | Lint a project                   |
| `npx nx graph`                      | Show Nx dependency graph         |

See [nx.json](nx.json) for the full target configuration.

---

## Code patterns

### TypeScript strict mode

The project uses strict mode in [tsconfig.base.json](tsconfig.base.json):

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters` (inferred from strict)
- `noImplicitOverride: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

Do not disable these. If a strict error forces you to loosen a rule, add a comment explaining why.

### Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`.

Examples:

```
feat(api): add project CRUD endpoints
fix(admin): handle expired token redirect
docs: update README with env vars
```

This project has no commit hooks (no Husky, no lint-staged). Discipline is manual.

### TDD approach

Tests are written with Jest. Each app and lib has its own `test` target. The goal is to write tests before or alongside implementation code.

- Place test files next to the code they test: `component.spec.ts` or `service.spec.ts`
- Use descriptive test names that state the expected behavior
- Run `npx nx test <project>` before opening a PR to confirm nothing is broken
- New features should include tests for success and error paths

---

## Pull Request process

1. Create a branch from `main` with a short descriptive name:

   ```
   feat/project-crud
   fix/expired-token
   docs/contributing-guide
   ```

2. Make your changes. Keep commits atomic and follow Conventional Commits.
3. Before opening the PR, run through this checklist:

   - [ ] Tests pass: `npx nx run-many -t test`
   - [ ] Type checks pass: `npx nx run-many -t typecheck`
   - [ ] Lint passes: `npx nx run-many -t lint`
   - [ ] No debug artifacts (console.log, commented code, .only in tests)
   - [ ] Commit messages follow Conventional Commits
   - [ ] Branch is up to date with `main`

4. Open a pull request against `main`. Since this is a personal project, the only reviewer is the maintainer. Expect review within a few days.
5. Address any review feedback. Squash commits if requested.

---

## Development environment

Recommended setup:

- **Editor**: VSCode
- **Extensions**:
  - Angular Language Service (built-in with Nx)
  - ESLint
  - Prettier
  - Jest
  - Prisma
  - Tailwind CSS IntelliSense (if using v3 syntax)
- **Terminal**: VSCode integrated terminal or your preferred shell

The repo includes a `.vscode/settings.json` with basic workspace settings. You can extend it, but dont commit personal preferences.

---

## Questions?

Open an issue or reach out directly. This is a small project, so keep it simple.

---

[🇧🇷 Ler em Português](CONTRIBUTING.pt-BR.md)
