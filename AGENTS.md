# AGENTS.md

## Proxima UI Registry

This repository contains the `ui_proxima` CLI and its component registry.

When working with a user project that should receive Proxima UI components:

1. If the project does not have `src/utils/lib/cn.ts`, run:
   `bunx ui_proxima@latest init`

2. To add a registry component, run:
   `bunx ui_proxima@latest add <component-name>`

3. If a component already exists in the target project and should be refreshed, prefer:
   `bunx ui_proxima@latest add <component-name> --overwrite`

## Available Components

### `socials`
- Purpose: social links block with reusable social button items.
- Adds:
  - `src/components/social/Socials.astro`
  - `src/components/social/SocialButton.astro`
  - `src/data/social-icons.ts`
- Use when the user wants a list of social links, icon buttons, brand icons, or reusable social CTA elements.

3. To remove all Proxima UI changes from a project, run:
   `bunx ui_proxima@latest reset`

## Notes

- Registry components are copied into the target project. They are not live-linked to the npm package.
- If registry files change, publish a new `ui_proxima` version and re-run `add <component-name> --overwrite` in the target project.
- Keep this file updated when new registry components are added.
- After each meaningful change in this repository, append a short entry to `MEMORY.md` describing what changed.
