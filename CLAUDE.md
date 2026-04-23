# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run the CLI locally
bun ./bin/ui_proxima.js init
bun ./bin/ui_proxima.js add <component-name>
bun ./bin/ui_proxima.js add <component-name> --overwrite

# Flags available on both commands
--skip-install    # Skip npm/bun dependency installation
--overwrite       # (add only) Overwrite existing files
```

No build step required — the package is pure ESM and runs directly with Node/Bun.

## Architecture

The CLI is structured as follows:

- **`bin/ui_proxima.js`** — entry point, calls `runCli(process.argv)`
- **`src/cli.js`** — parses `argv`, dispatches to `runInit` or `runAdd`
- **`src/commands/`** — one file per command (`init.js`, `add.js`)
- **`src/utils/`** — shared helpers:
  - `project.js` — detects Astro projects
  - `scaffold.js` — writes `cn.ts` and `tsconfig.json`
  - `registry.js` — resolves and copies registry components
  - `install.js` — installs npm dependencies
  - `ui.js` — banner/step/spinner output helpers
- **`src/templates/`** — static file templates (`cn.js`, `tsconfig.js`)
- **`registry/`** — component definitions; each component is a folder with a `manifest.json` and a `files/` subdirectory

## Registry Component Format

Each component lives at `registry/<name>/` and requires:

```json
// manifest.json
{
  "name": "component-name",
  "dependencies": ["npm-package"],
  "registryDependencies": ["other-registry-component"],
  "files": [
    { "source": "src/...", "target": "src/..." }
  ]
}
```

`resolveRegistryComponent` in `registry.js` walks `registryDependencies` recursively before collecting files, so shared components are always installed first. Files map from `registry/<name>/files/<source>` to `<cwd>/<target>` in the user's project.

## Key Constraints

- `add` requires `src/utils/lib/cn.ts` to exist in the target project — enforce with `hasCnUtility()` check before any file copying.
- `init` always overwrites `tsconfig.json` (by design — Proxima defaults).
- After any meaningful change, append a short dated entry to `MEMORY.md` and update `AGENTS.md` if the registry component list changes.
- When publishing a new version, bump `package.json` version; existing installs won't receive registry file updates unless users re-run `add --overwrite`.
