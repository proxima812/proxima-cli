# Test in Template

After a CLI release, install the latest published version into `template/` and verify all registry components work end-to-end.

## Instructions

1. **Get current version** — read `package.json` to find the version just released (e.g. `0.1.5`).

2. **Reset template's CLI installation** — inside `template/`:
   ```bash
   cd template
   # Remove any previously installed component files so we test a clean install
   node ../dist/bin/ui_proxima.js reset --skip-install
   ```

3. **Re-initialize template** with the local build:
   ```bash
   node ../dist/bin/ui_proxima.js init --skip-install
   ```

4. **Add every registry component** one by one:
   ```bash
   for each component in registry/:
     node ../dist/bin/ui_proxima.js add <component-name> --skip-install --overwrite
   ```
   Record which ones succeed and which fail.

5. **Run Astro build** to catch any import/type errors:
   ```bash
   cd template && npm run build 2>&1
   ```

6. **Report results**:
   - List each component with ✅ added or ❌ failed
   - Show the full Astro build output (errors only if build failed)
   - If any component failed, show the exact error and suggest a fix

> Note: This skill tests using the **local dist build**, not the published npm package. To test the exact published package, run `npm install -g ui_proxima@<version>` first and swap the command path.
