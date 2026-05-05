# ui_proxima

Registry-driven CLI for copying Proxima Astro UI component source into user projects.

## Commands

### `init`

Initializes Proxima UI in the current Astro project.

```bash
bunx ui_proxima@latest init
```

- Creates `components.json`
- Creates `src/lib/utils.ts`
- Installs `clsx` and `tailwind-merge`

| Flag | Description |
|------|-------------|
| `--skip-install` | Skip dependency installation |

---

### `add <name>`

Copies a registry component into the current project.

```bash
bunx ui_proxima@latest add <component-name>
```

Requires `components.json` and `src/lib/utils.ts` to exist — run `init` first.

| Flag | Description |
|------|-------------|
| `--overwrite` | Overwrite files that already exist |
| `--dry-run` | Preview copied files and dependencies without changing the project |
| `--skip-install` | Skip dependency installation |

---

### `list`

Shows available registry components.

```bash
bunx ui_proxima@latest list
```

### Available components

Run `bunx ui_proxima@latest list` for the current registry. The registry includes imported Astro starter components such as `box`, `style-box`, `yoo-button`, `chroma-word`, `glass-block`, `widgets-socials`, `widgets-tech-stacks`, `processing-text`, `ui-react-sparkles-text`, `seo-seo`, `partials-header-shadcn`, plus the earlier `markdown`, `icon-components`, and `brand-text` components.

---

### `reset`

Removes files created by `init`.

```bash
bunx ui_proxima@latest reset
```

- Deletes `components.json`
- Deletes `src/lib/utils.ts`

---

## Local development

```bash
npm install
npm run build
node ./dist/bin/ui_proxima.js init
node ./dist/bin/ui_proxima.js add <component-name>
node ./dist/bin/ui_proxima.js list
node ./dist/bin/ui_proxima.js reset
```

![Alt](https://repobeats.axiom.co/api/embed/3c8eaf32f56e02148a102971f43e3e56b1c33401.svg "Repobeats analytics image")
