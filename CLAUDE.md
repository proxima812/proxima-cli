# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- **`template`** - Template — an Astro-based website used as a testing environment for the CLI and its components.
- `components/`: root staging area for new components that should later be turned into registry entries.

## Commands

```bash
# Build and run the CLI locally
npm install
npm run build
node ./dist/bin/ui_proxima.js init
node ./dist/bin/ui_proxima.js add <component-name>
node ./dist/bin/ui_proxima.js add <component-name> --overwrite
node ./dist/bin/ui_proxima.js reset

# Flags available on both commands
--skip-install    # Skip npm/bun dependency installation
--overwrite       # (add only) Overwrite existing files
```

The package is now authored in TypeScript and compiled to `dist/` before publishing.

## Architecture

The CLI is structured as follows:

- **`src/bin/ui_proxima.ts`** — CLI entry point, calls `runCli(process.argv)`
- **`src/cli.ts`** — parses `argv`, dispatches to `runInit`, `runAdd`, or `runReset`
- **`src/commands/`** — one file per command (`init.ts`, `add.ts`, `reset.ts`)
- **`src/utils/`** — shared helpers:
  - `project.ts` — detects Astro projects
  - `scaffold.ts` — writes/removes `cn.ts`
  - `registry.ts` — resolves and copies registry components
  - `install.ts` — installs npm dependencies
  - `ui.ts` — banner/step/spinner output helpers
- **`src/templates/`** — static file templates (`cn.ts`)
- **`dist/`** — compiled CLI output shipped in the npm package
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

## Deploy Trigger

If the user says **"деплой"**, **"запушить"**, **"deploy"**, or **"release"** — treat it as a release command:

1. Run `npm run build` — verify it passes
2. Run `npm run release` — this bumps the patch version, pushes the commit, and pushes the git tag (which triggers the GitHub Actions npm publish)
3. Report the new version number and the git tag that was pushed
4. Optionally offer to run `/test-template` to verify the release in the Astro test site

Do NOT ask for confirmation unless the build fails or there are uncommitted changes that aren't part of the CLI source.

## Local Skills

- `/stage-components` — scans `components/` and registers new items into `registry/`
- `/test-template` — runs all CLI commands against `template/` and checks Astro build

## Key Constraints

- `add` requires `src/utils/lib/cn.ts` to exist in the target project — enforce with `hasCnUtility()` check before any file copying.
- `init` does not rewrite the user's `tsconfig.json`.
- `reset` intentionally removes only current `init` artifacts; it does not delete copied registry components, `tsconfig.json`, or uninstall packages.
- After any meaningful change, append a short dated entry to `MEMORY.md` and update `AGENTS.md` if the registry component list changes.
- When publishing a new version, bump `package.json` version; existing installs won't receive registry file updates unless users re-run `add --overwrite`.
