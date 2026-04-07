# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- **Build:** `npm run build` (clean + tsc + webpack + publish artifacts)
- **Dev build:** `npm run build-dev` (includes source maps)
- **TypeScript only:** `npm run build:tsc`
- **Lint:** `npm run lint` / `npm run lint:fix`
- **Test:** `npm test` (runs lint then mocha)
- **Run single test file:** `npx mocha --require ts-node/register src/path/to/file.test.ts`
- **Local CLI:** `npm link` then `skysync-cli --help`

## Architecture

This is a TypeScript CLI tool and SDK for the SkySync file sync/migration platform. Three layers:

**CLI Layer** (`src/commands/`) — Yargs command modules organized by domain (users/, jobs/, connections/, etc.). Parent commands use `.commandDir()` to auto-load subcommands. Commands export `{command, desc, builder, handler}`. The `runCommand(argv, handler)` utility in `src/util/command.ts` creates the SDK client and output formatter.

**SDK Layer** (`src/sdk/`) — `SkySyncClient` (`src/sdk/client.ts`) is the facade with lazy-loaded resource getters. 60+ resource classes in `src/sdk/resources/` inherit from `Resource<T>` or `PagedResource<T>` (base class in `resource.ts`). Models live in `src/sdk/models/`.

**HTTP Layer** (`src/sdk/http/`) — `HttpClient` handles auth, errors, and request construction. `FetchClient` is the production implementation using node-fetch. `TestHttpClient` is the mock for unit tests.

**Entry point:** `bin/skysync.js` → `src/cli.ts` (Liftoff bootstraps config loading, Yargs parses commands).

**SDK bundling:** Webpack bundles `src/sdk/index.ts` into `publish/sdk.js` as a separate `@skysync/sdk` package.

## Code Style

- **Indentation:** Tabs (enforced by ESLint)
- **Quotes:** Single quotes
- **Semicolons:** Required
- **Member delimiters:** Semicolons (not commas) in interfaces/types
- **Brace style:** 1tbs (one true brace style)
- **No `console.log`** — use `console.warn`, `console.error`, etc.
- **No `var`** — use `const`/`let`
- **Strict equality** (`===`/`!==`) with smart exceptions
- **No bitwise operators**
- **TypeScript:** `noUnusedLocals` and `noUnusedParameters` are enabled

## Testing

- **Framework:** Mocha + expect.js
- **Test files:** Co-located as `*.test.ts` alongside source files
- **Mock HTTP:** Use `TestHttpClient` from `src/sdk/http/test-client.ts` — call `addPendingResponse()` to queue responses, `expectLastRequest()` to verify requests
- **Test tsconfig:** `src/tsconfig.test.json` (includes test files; main tsconfig excludes them)

## Configuration

CLI options can come from (in precedence order):
1. Command-line arguments
2. Environment variables (`SKYSYNC_*` prefix)
3. `skysync-cli.json` file (searched up the directory hierarchy via Liftoff)

## CI

Azure DevOps pipeline (`azure-pipelines.yml`).
