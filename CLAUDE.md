# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lina Find is an offline-first, installable PWA "find-the-object" game for young children, built for Android tablets in landscape. A scene image is shown with a side list of items to find; tapping an item marks it found and speaks its name. The UI is trilingual (Portuguese default, English, Ukrainian). The original design spec lives at `docs/superpowers/specs/2026-05-19-find-object-game-design.md` (written in Russian).

Stack: Vue 3 (`<script setup>`) + Vite + TypeScript, Pinia, vue-router, Vitest, `vite-plugin-pwa`. Requires Node >= 22.12.

## Commands

```bash
npm run dev          # Vite dev server on 0.0.0.0:5173
npm run build        # type-check (vue-tsc --noEmit) THEN vite build
npm run preview      # serve the production build
npm test             # vitest run (single pass, no watch)

npx vitest                                  # watch mode
npx vitest run src/domain/__tests__/levelLogic.test.ts   # one file
npx vitest run -t "completes the level"     # one test by name
```

Docker is the supported way to develop without a local Node 22 toolchain: `docker compose up` runs the dev server on port 5173 (file watching uses polling via `CHOKIDAR_USEPOLLING`).

There is no linter or formatter configured; `npm run build` is the type-check gate.

## Architecture

The codebase deliberately separates **pure domain logic** from **Vue/Pinia/rendering** so the game rules are unit-testable without mounting components.

- `src/domain/levelLogic.ts` — the canonical type definitions (`Level`, `SceneItem`, `LanguageCode`, etc.) and all pure game-rule functions (progress tracking, completion, hit-testing, label/thumbnail helpers). Functions are immutable (e.g. `markItemFound` returns a new progress object). **Add new game logic here, with a test, not in components.**
- `src/domain/assets.ts` — `resolveAssetPath` prefixes `import.meta.env.BASE_URL` onto level/asset paths and passes through absolute URLs/`data:`/`blob:`. Always route asset paths through this; do not hardcode `/assets/...` into `src` attributes.
- `src/domain/audio.ts` — `speakItem` plays a per-language local audio file if the item has one, else falls back to the Web Speech API, else stays silent. Maps language codes to BCP-47 voices.
- `src/data/levels.ts` — the 5 built-in levels as plain data + `findLevelById`. This is the content source of truth.
- `src/stores/gameStore.ts` — the only Pinia store. Holds current level, language, found-progress, and last-touched item; wraps the domain functions. Persists the chosen language to `localStorage` (`lina-find-language`).
- `src/views/` — `HomeView` (level grid), `GameView` (orchestrates the play screen + toolbar), `AdminLevelEditor` (level authoring tool).
- `src/components/` — `SceneCanvas` (the tappable scene), `SearchPanel`, `ItemThumbnail`, `CompleteBanner`, `LanguageSwitcher`.
- `src/router/index.ts` — routes: `/` → home, `/level/:id` → game, `/admin/levels` → editor.

### Coordinate system (the key cross-file convention)

Every `targetArea` and `thumbnailArea` (`x`, `y`, `width`, `height`) is a **percentage 0–100 of the scene image**, never pixels. `SceneCanvas` converts a pointer event into percentage coordinates via `getBoundingClientRect`, item hit-testing compares against these percentages, and `getThumbnailCropStyle` converts a percentage area into CSS `background-size`/`background-position` to crop the side-panel thumbnail straight out of the full scene image. When adding or editing items, keep everything in percentages.

### Item roles

`SceneItem.role` drives behavior:
- `search-target` — appears in the search panel, counts toward completion, can have a cropped `thumbnailSrc`/`thumbnailArea`.
- `learning-only` — tappable and spoken for vocabulary, but does **not** appear in the panel or affect completion.

A level is complete only when every `search-target` is found. Misses (taps outside any item) are intentionally not penalized.

### Localization

`LocalizedText` is `Record<'pt'|'en'|'uk', string>`. Use `getLabel(text, language)`, which falls back to Portuguese. Default language is `pt`. Flags live in `public/assets/flags/`.

## Authoring levels

`/admin/levels` is a hidden dev tool (not part of the child-facing flow). Load a scene image, drag rectangles to define item areas, set role/labels/`showLabelOnImage`, and it produces level JSON to paste into `src/data/levels.ts`. Scene images and per-item thumbnails go under `public/assets/levels/<level-id>/`.

`GameView` supports `?debug=areas` to overlay the defined target areas on the scene — useful when tuning coordinates.

## PWA & deployment

`vite-plugin-pwa` (autoUpdate) precaches the app shell and all level images/thumbnails/audio so the game runs offline after first load; the manifest installs it as a standalone landscape app.

`base` depends on the environment: it is `/linaFind/` when `GITHUB_PAGES=true`, otherwise `/`. The GitHub Pages workflow (`.github/workflows/deploy-pages.yml`) runs tests, builds with `GITHUB_PAGES=true`, and deploys — but **only triggers on push to the `codex/find-object-game` branch** (or manual dispatch). Pushing to other branches does not deploy.

## Tests

Tests use Vitest with the `happy-dom` environment and live in `__tests__/` folders next to the code they cover (domain, data, and components). `vitest/globals` is enabled, so `describe`/`it`/`expect` need no import in `.test.ts`, though existing domain tests import them explicitly. Component tests use `@vue/test-utils`.
