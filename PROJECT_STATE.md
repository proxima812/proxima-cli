# PROJECT_STATE.md

## Purpose

This file is the living project registry for `ui_proxima`.

Update this file whenever the project gets a new component, command, feature, workflow, generated output, or other meaningful capability.

## Project

- Package name: `ui_proxima`
- Purpose: CLI for bootstrapping Proxima UI in Astro projects.
- Runtime format: ESM.
- Source language: TypeScript.
- Build output: `dist/`.
- Published CLI binary: `ui_proxima`.

## Commands

### `init`

Initializes Proxima UI in the current Astro project.

- Creates `components.json`.
- Creates `src/lib/utils.ts`.
- Installs shared dependencies: `clsx`, `tailwind-merge`.
- Supports `--skip-install`.

### `add <name>`

Copies a registry component into the current Astro project.

- Requires `components.json` and `src/lib/utils.ts` to exist.
- Reads project paths and aliases from `components.json`.
- Resolves registry dependencies recursively.
- Copies files from `registry/<name>/files/` into the target project.
- Installs shared dependencies plus component `dependencies` and `devDependencies`.
- Supports `--overwrite`.
- Supports `--dry-run`.
- Supports `--skip-install`.

### `list`

Shows available registry components.

- Reads component names from registry directories with `manifest.json`.
- Prints names in sorted order.

### `reset`

Removes files created by `init`.

- Deletes `components.json`.
- Deletes `src/lib/utils.ts`.
- Removes empty parent directories left by `src/lib/utils.ts`.
- Does not delete copied registry components.
- Does not uninstall dependencies.

## Source Structure

- `components/`: root staging area for new components that should later be turned into registry entries.
- `src/bin/ui_proxima.ts`: executable CLI entrypoint.
- `src/cli.ts`: command parser and dispatcher.
- `src/commands/init.ts`: `init` command.
- `src/commands/add.ts`: `add` command.
- `src/commands/list.ts`: `list` command.
- `src/commands/reset.ts`: `reset` command.
- `src/templates/cn.ts`: `cn.ts` file template.
- `src/types.ts`: shared TypeScript types.
- `src/utils/config.ts`: `components.json` defaults, creation, and reading.
- `src/utils/install.ts`: package manager detection and dependency installation.
- `src/utils/project.ts`: Astro project validation.
- `src/utils/registry.ts`: registry manifest resolution and file copying.
- `src/utils/scaffold.ts`: init artifact creation and removal.
- `src/utils/ui.ts`: CLI output helpers.

## Registry Components

- Imported from `/Users/samgold/Desktop/Проекты/starters/starter-astro-6.1`: `animate-morph-text`, `box`, `chroma-word`, `chroma-word-rotator`, `colors`, `footers-footer-new1`, `glass-block`, `glass-buttons`, `motion-blocks`, `motion-blocks-scene`, `partials-big-word-bottom`, `partials-container`, `partials-header-shadcn`, `partials-logo`, `partials-smart-container`, `portrait-accordion`, `processing-text`, `scroll-top-button`, `seo-analytics-yandex-metrika`, `seo-seo`, `sticky-height-screen`, `sticky-list`, `sticky-list-effects-sticky-list-scroll-story`, `sticky-list-effects-sticky-list-stack-effect`, `stories`, `style-box`, `svg`, `ui-link`, `ui-react-sparkles-text`, `under-rounded`, `widgets-social-button`, `widgets-socials`, `widgets-tech-stacks`, `yoo-button`, `yoo-button-variant`, `yoo-kassa-heading`, `yoo-num-stats`.
  Purpose: ready Astro UI/source components from the Astro 6.1 starter.
  Files copied:
  component source files under `src/components/`, with recursive local helper/data files where imported by the component.
  Dependencies:
  manifests declare package dependencies such as `astro-icon`, `motion`, `split-type`, `react`, `react-dom`, `@astrojs/react`, and `@toolwind/corner-shape` only when detected from component source.
  Registry dependencies: none; local component/data dependencies are included as files in each manifest.

- `markdown`
  Purpose: Markdown renderer component set copied as a folder.
  Files copied:
  `src/components/markdown/A.astro`, `Blockquote.astro`, `Code.astro`, `Pre.astro`, `index.ts`
  Dependencies: `astro-icon`
  Registry dependencies: none

- `icon-components`
  Purpose: reusable social and tech icon components plus shared icon types/helpers.
  Files copied:
  `src/components/IconComponents/Icon.shared.ts`, `IconSocial.astro`, `IconSocial.data.ts`, `IconTech.astro`, `IconTech.data.ts`
  Dependencies: `astro-icon`
  Registry dependencies: none

- `brand-text`
  Purpose: gradient brand heading component with responsive inline text fitting.
  Files copied:
  `src/components/BrandText.astro`
  Dependencies: none
  Registry dependencies: none

## Documentation

- `README.md`: public usage docs.
- `CLAUDE.md`: implementation guidance for Claude Code.
- `AGENTS.md`: instructions for Codex/agent sessions.
- `MEMORY.md`: short dated memory log.
- `PROJECT_STATE.md`: living project registry.

## Maintenance Rule

After every meaningful project change, update:
- `PROJECT_STATE.md` if commands, components, features, workflows, source structure, or shipped outputs changed.
- `MEMORY.md` with a short dated note.
- `README.md` if user-facing CLI behavior changed.
- `AGENTS.md` if agent workflow rules changed.

When new components are prepared for the registry, treat the root `components/` directory as the default source location unless the user explicitly says otherwise.
