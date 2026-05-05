# MEMORY.md

## Purpose

This file stores short project memory for `ui_proxima` so future work can continue without rebuilding context from scratch.

## Update Rule

After each meaningful change in this repository, append a short note with:
- date
- changed area
- what was done
- current status if relevant

Also update `PROJECT_STATE.md` whenever a new component, command, feature, workflow, generated output, or other meaningful project capability appears.

## History

### 2026-04-23
- Rewrote the CLI source from JavaScript to TypeScript and added a `tsc` build pipeline that outputs to `dist/`.
- Added `reset` command to remove `init` artifacts (`src/utils/lib/cn.ts` and `tsconfig.json`) safely from target projects.
- Updated local development and architecture docs to match the new TypeScript + build workflow.
- Added `PROJECT_STATE.md` as the living project registry and restored `AGENTS.md` with instructions to read project instructions before new-session work.
- Removed `tsconfig.json` rewriting from `init`; `reset` now leaves project `tsconfig.json` untouched.

### 2026-04-25
- Added new registry components: `markdown`, `icon-components`, and `brand-text`.
- Updated `README.md` and `PROJECT_STATE.md` to document the new component set and copied files.
- Added a standing rule that future components will be staged in the root `components/` folder before being added to the registry.

### 2026-05-05
- Updated agent instructions with lightweight development skills, registry-driven CLI rules, safety hooks, and the `components.json` contract.
- Added `components.json` initialization, `src/lib/utils.ts` utility creation, `list` command, `add --dry-run`, and dev dependency install support.
- Updated `README.md` and `PROJECT_STATE.md` to document the registry-driven Astro component CLI behavior.
- Imported 37 Astro/React components from `/Users/samgold/Desktop/Проекты/starters/starter-astro-6.1` into the CLI registry with JSON manifests, copied local helper/data files, normalized `cn` imports, and dependency metadata.
- Removed deprecated explicit `esModuleInterop: false` from `tsconfig.json` so `npm publish` prepack builds pass on newer TypeScript versions.
