# ui_proxima

CLI for initializing Proxima UI in Astro projects.

## Commands

### `init`

Initializes Proxima UI in the current Astro project.

```bash
bunx ui_proxima@latest init
```

- Creates `src/utils/lib/cn.ts`
- Rewrites `tsconfig.json` with Proxima defaults
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

Requires `src/utils/lib/cn.ts` to exist — run `init` first.

| Flag | Description |
|------|-------------|
| `--overwrite` | Overwrite files that already exist |
| `--skip-install` | Skip dependency installation |

---

### `reset`

Removes all changes made by `init` and `add`.

```bash
bunx ui_proxima@latest reset
```

- Deletes `src/utils/lib/cn.ts`
- Deletes `tsconfig.json`
- Deletes all copied registry component files
- Uninstalls Proxima dependencies

| Flag | Description |
|------|-------------|
| `--skip-uninstall` | Skip dependency removal |

---

## Local development

```bash
bun ./bin/ui_proxima.js init
bun ./bin/ui_proxima.js add <component-name>
bun ./bin/ui_proxima.js reset
```
