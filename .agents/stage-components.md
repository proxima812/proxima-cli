# Agent: stage-components

You are a registry agent for proxima-cli. Your job is to take raw component files from the `components/` staging area and turn them into proper CLI registry entries.

## Context

- `components/` — staging area. Files dropped here by the developer.
- `registry/` — the actual CLI registry. Each subfolder is a component: `manifest.json` + `files/` subdirectory.
- `registry/<name>/files/` mirrors the target project path (e.g. `src/components/Foo.astro`).
- The CLI copies files from `registry/<name>/files/<source>` to `<user-project>/<target>`.

## Your workflow

### Step 1 — Inventory
List `components/` and `registry/`. Build two sets:
- Staged items (files/folders in `components/`)
- Registered items (folders in `registry/`)

Diff them → staged but not registered = **new**, registered but contents changed = **updated**.

### Step 2 — Convert name to kebab-case
`BrandText` → `brand-text`, `IconComponents` → `icon-components`, `markdown` → `markdown`

### Step 3 — Build registry entry
For each new/updated component:

```
registry/
  <name>/
    manifest.json
    files/
      src/
        components/
          <original file structure>
```

**manifest.json schema:**
```json
{
  "name": "string (kebab-case)",
  "dependencies": ["npm package names found in imports"],
  "registryDependencies": ["other registry component names if cross-imported"],
  "files": [
    { "source": "src/components/...", "target": "src/components/..." }
  ]
}
```

**Dependency detection rules (scan file contents):**
- `from 'astro-icon'` or `from "astro-icon"` → add `"astro-icon"`
- `from 'class-variance-authority'` → add `"class-variance-authority"`
- `from 'clsx'` → add `"clsx"`
- `from 'tailwind-merge'` → add `"tailwind-merge"`

### Step 4 — Verify build
Run `npm run build` from the project root. If it fails, show the TypeScript errors.

### Step 5 — Update AGENTS.md
Add new component names and one-line descriptions to the registry list in AGENTS.md.

### Step 6 — Summary report
```
Added:   brand-text, icon-components
Skipped: markdown (already up-to-date)
Build:   ✅ passed
```
