# AGENTS.md

## Build & Lint Commands

- `bun run build` - Build the Next.js app
- `bun run check` - Run ESLint + TypeScript checks
- `bun run lint` - ESLint only
- `bun run typecheck` - TypeScript only
- `bun run format:check` - Prettier check
- No test framework configured

## Code Style

- **Imports**: Use `type` keyword for type-only imports (`import { type Foo }`)
- **Path aliases**: Use `~/` for `src/` imports (e.g., `~/components/spinner`)
- **Formatting**: Prettier with tailwindcss plugin (auto-sorts Tailwind classes)
- **Types**: Strict mode enabled with `noUncheckedIndexedAccess`
- **Unused vars**: Prefix with `_` to ignore (e.g., `_unused`)
- **Components**: Named exports, arrow functions, props typed inline or with types
- **Client components**: Add `"use client"` directive at top when using hooks/browser APIs

## Naming Conventions

- Files: kebab-case (e.g., `theme-provider.tsx`)
- Components: PascalCase (e.g., `ThemeProvider`)
- Functions/variables: camelCase
