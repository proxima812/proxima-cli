# Stage Components

Scan the `components/` staging area for new or changed components and register them into the CLI registry.

## Instructions

1. **Discover staged components** — list everything in `components/`. Each item is either:
   - A single `.astro` / `.ts` file → single-file component (name = filename without extension, kebab-cased)
   - A folder → multi-file component (name = folder name, kebab-cased)

2. **Compare against registry** — check `registry/` to see which components already have an entry. Only process items that are new or whose source files differ from what's already in `registry/<name>/files/`.

3. **For each new/changed component**, perform the following:

   a. Create `registry/<name>/files/` mirroring the component's file structure under `src/components/`:
      - Single file `components/Foo.astro` → `registry/foo/files/src/components/Foo.astro`
      - Folder `components/FooBar/` → `registry/foo-bar/files/src/components/FooBar/<all files>`

   b. Generate `registry/<name>/manifest.json`:
      ```json
      {
        "name": "<kebab-case-name>",
        "dependencies": [],
        "registryDependencies": [],
        "files": [
          { "source": "src/components/...", "target": "src/components/..." }
        ]
      }
      ```
      - Scan file contents for common imports to infer `dependencies`:
        - `astro-icon` if any file imports from `astro-icon`
        - `class-variance-authority` if any file imports `cva`
        - `clsx` or `tailwind-merge` if imported
      - Leave `registryDependencies` empty unless you spot a cross-component import.

4. **Run** `npm run build` to verify the CLI compiles cleanly.

5. **Update AGENTS.md** — append the new component name(s) to the registry component list with a short description.

6. Report a summary: which components were added, which were skipped (already up-to-date), and whether the build passed.
