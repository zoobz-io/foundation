# Foundation

A layered design system for Vue 3 + Nuxt. Foundation provides a composable architecture of elements, components, and widgets — from zero-behavior HTML wrappers up to fully stateful, generic data widgets.

## Architecture

```
┌─────────────────────────────────────────────┐
│  foundry — app shell (workspace, layout)    │
├─────────────────────────────────────────────┤
│  forge — stateful widgets (table, form...)  │
├─────────────────────────────────────────────┤
│  alloy — stateless components (select...)   │
├─────────────────────────────────────────────┤
│  ore — behavior-free HTML elements          │
└─────────────────────────────────────────────┘
```

Each layer extends the one below it. Consumers import from the highest layer they need.

### Ore

Semantic HTML wrappers with a modifier system (`variant`, `size`, `color`, `radius`, `density`, `elevation`). No JavaScript behavior — if it needs JS, it belongs in alloy.

### Alloy

Composes ore elements and [reka-ui](https://reka-ui.com) primitives into stateless functional components. Full passthrough and slotthrough for consumer control. No owned state — if it needs `useState` or generics, it belongs in forge.

### Forge

Factory-driven, stateful widgets with generics. Each widget has a factory (`createTable`, `createForm`, ...) that returns a reactive interface. Components accept that interface as a prop.

**Available widgets:**
- `DataTable` — paginated, sortable, filterable data grid
- `DataForm` — programmatic form over `T` with zod validation
- `DataChart` — configurable chart visualizations
- `DataPreview` — code/markdown content viewer
- `DataDeck` — infinite-scroll card feeds

### Foundry

App shell layer providing workspace layouts and page-level composition.

## Quick Start

```bash
pnpm install
make dev        # start example app
make check      # lint + typecheck + test
```

## Development

```bash
make help       # show all available commands
```

| Command          | Description                          |
|------------------|--------------------------------------|
| `make install`   | Install dependencies                 |
| `make dev`       | Start example app dev server         |
| `make lint`      | Run ESLint                           |
| `make lint-fix`  | Run ESLint with auto-fix             |
| `make typecheck` | Type check all packages              |
| `make test`      | Run all tests                        |
| `make coverage`  | Run tests with coverage              |
| `make check`     | Lint + typecheck + test              |
| `make ci`        | Full CI simulation                   |
| `make clean`     | Remove generated files               |

## Project Structure

```
apps/
  example/          — demo app showcasing all widgets
layers/
  ore/              — HTML element wrappers
  alloy/            — stateless composed components
  forge/            — stateful widget factories + components
  foundry/          — app shell and layout
packages/
  iconic/           — icon alias system
  untheme/          — design token engine
  testing/          — shared test utilities
```

## Contributing

- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- Tests required for all new code
- `make check` must pass before opening a PR
- Node 22.22.0, pnpm 9.10.0

## License

MIT
