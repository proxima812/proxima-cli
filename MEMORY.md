# MEMORY.md

## Purpose

This file stores short project memory for `ui_proxima` so future work can continue without rebuilding context from scratch.

## Update Rule

After each meaningful change in this repository, append a short note with:
- date
- changed area
- what was done
- current status if relevant

## History

### 2026-04-07
- Initialized `ui_proxima` as an npm CLI package for Astro projects.
- Added `init` command that creates `src/utils/lib/cn.ts`, installs `clsx` and `tailwind-merge`, and now rewrites `tsconfig.json` to Proxima defaults.
- Added registry architecture with manifest-driven component copying.
- Added `socials` registry component:
  - `src/components/social/Socials.astro`
  - `src/components/social/SocialButton.astro`
  - `src/data/social-icons.ts`
- Added `AGENTS.md` with instructions for using `ui_proxima` and the current registry component list.
- Improved CLI output with banner, step logs, and spinner-style install feedback.
- Published npm package versions up to `ui_proxima@0.1.2`.
