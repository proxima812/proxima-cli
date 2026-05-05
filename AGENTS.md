# AGENTS.md

## Session Start

Before doing any work in a new session, read the project instructions first and then follow them.

Required files to check:
- `AGENTS.md`
- `MEMORY.md`
- `PROJECT_STATE.md`
- `README.md`
- `CLAUDE.md` if implementation context is needed

## Mission

Solve the user's exact task with minimum unnecessary action, high code quality, and clean professional implementation.

## Project

This repository contains the `ui_proxima` CLI and its component registry.

The CLI is authored in TypeScript and compiled to `dist/`.

## Core Rules

- Do not touch unrelated files.
- Make the smallest correct change.
- Preserve current structure, naming, and conventions.
- Do not redesign UI/UX unless explicitly requested.
- Do not add dependencies unless genuinely required.
- Prefer lightweight validation over full builds unless a build is directly relevant.
- After every meaningful change, update `MEMORY.md`.
- After any new command, component, feature, workflow, or shipped output, update `PROJECT_STATE.md`.

## Proxima UI Registry

`ui_proxima` follows a shadcn/ui-style, registry-driven model for Astro UI components.

Core contract:
- The CLI is TypeScript.
- The CLI does not attach a runtime component library to the user project.
- The CLI copies component source files into the user project.
- After installation, the user owns the copied component code.
- Components are resolved from registry JSON manifests.
- Never overwrite user files unless the user explicitly requests `--overwrite`.
- Prefer `--dry-run` before risky component additions.

Supported commands:
- `ui_proxima init`: create project config and shared utility.
- `ui_proxima add <component>`: add a registry component.
- `ui_proxima list`: show available registry components.
- `ui_proxima reset`: remove files created by `init`.

Default `components.json`:

```json
{
  "componentsPath": "src/components/ui",
  "utilsPath": "src/lib",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Registry manifests must use JSON:

```json
{
  "name": "button",
  "type": "component",
  "files": [
    {
      "path": "button.astro",
      "target": "src/components/ui/button.astro"
    }
  ],
  "dependencies": [],
  "devDependencies": []
}
```

CLI behavior requirements:
- Read `components.json` before adding components.
- Find the requested component in `registry/`.
- Copy component files to the declared target paths.
- Install `dependencies` and `devDependencies` when needed.
- Skip existing files unless `--overwrite` is present.
- Support `--dry-run` without writing files or installing packages.
- Print clear, friendly errors with the next action when possible.

When working with a user project that should receive Proxima UI components:

1. If the project does not have `components.json` or `src/lib/utils.ts`, run:
   `bunx ui_proxima@latest init`

2. To add a registry component, run:
   `bunx ui_proxima@latest add <component-name>`

3. If a component already exists in the target project and should be refreshed, prefer:
   `bunx ui_proxima@latest add <component-name> --overwrite`

4. To preview a component install, run:
   `bunx ui_proxima@latest add <component-name> --dry-run`

5. To list registry components, run:
   `bunx ui_proxima@latest list`

6. To remove files created by `init`, run:
   `bunx ui_proxima@latest reset`

## Agent Skills And Hooks

Use these operating modes as lightweight skills for AI-assisted development:

- Easy development: prefer the smallest understandable change, keep docs synchronized, and choose explicit code over abstractions unless repetition is already painful.
- Fast development: inspect only the files needed for the requested feature, implement the direct path first, then run one lightweight validation command.
- Registry work: treat `components/` as staging input, `registry/<name>/manifest.json` as the install contract, and `registry/<name>/files/` as the copied source.
- CLI work: keep commands predictable, errors readable, and flags composable; update help text whenever command behavior changes.
- Safety hook before edits: verify the target files are related to the request.
- Safety hook before copy/install logic: ensure existing user files are skipped unless `--overwrite` is explicit.
- Validation hook after CLI changes: run `npm run build` when TypeScript command behavior changes.
- Documentation hook after meaningful changes: update `README.md`, `PROJECT_STATE.md`, and `MEMORY.md` as required.

## Component Documentation Rule

When a new registry component is added, update `PROJECT_STATE.md` with:
- component name
- purpose
- copied files
- dependencies
- registry dependencies

Also update public docs when the component should be visible to users.

## New Component Source Rule

The root `components/` folder is the staging source for future registry components.

Workflow:
- the user places new component files or folders into `components/`
- the user tells the agent which component to add
- the agent creates or updates the matching `registry/<component-name>/` entry from files inside `components/`
- the agent then updates `README.md`, `PROJECT_STATE.md`, and `MEMORY.md` if the component is meaningfully added or changed

Do not assume future new components come from random root files if `components/` exists; prefer `components/` as the source of truth.
