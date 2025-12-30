# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev              # Start dev server with Turbopack
bun build            # Production build
bun start            # Start production server
bun preview          # Build and start (for local prod testing)
bun lint             # Run ESLint
bun lint:fix         # Run ESLint with auto-fix
bun typecheck        # TypeScript type checking
bun check            # Run both lint and typecheck
bun format:write     # Format code with Prettier
bun format:check     # Check code formatting
```

## Architecture

This is an Agni Labs portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.

### Key Patterns

- **Path alias**: Use `~/` to import from `src/` (e.g., `import { cn } from "~/lib/utils"`)
- **Environment validation**: Uses `@t3-oss/env-nextjs` with Zod schemas in `src/env.js`. Set `SKIP_ENV_VALIDATION=true` to bypass during Docker builds
- **Required env vars**: `NODE_ENV`, `URL`

### Source Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components (theme provider, nav, footer, endeavours grid)
- `src/config/` - Site configuration (`site.ts`) and project data (`endavours.ts`)
- `src/lib/` - Utilities (includes `cn()` for Tailwind class merging)
- `src/styles/` - Global CSS with Tailwind

### Endeavours System

Projects are defined in `src/config/endavours.ts` as an array with properties: `title`, `icon`, `description`, `url`, `status`, `activity` ("active"/"inactive"), and `disabled`. The `Endeavours` component renders active projects in a grid with scramble text animations, and inactive projects in a collapsible "back burner" section.

## Git Configuration

This repo pushes to two remotes: `@adiadd/agnilabs-www` (primary, Vercel builds) and `@agnilabs/www` (org repo). See README.md for setup instructions.
