// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as fs from "node:fs";
// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as path from "node:path";

type PackageJson = {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
};

export const ensureAstroProject = (cwd: string): void => {
	const packageJsonPath = path.join(cwd, "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		throw new Error("package.json not found. Run this command inside an Astro project.");
	}

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
	const dependencies = {
		...(packageJson.dependencies ?? {}),
		...(packageJson.devDependencies ?? {}),
	};

	if (!dependencies.astro) {
		throw new Error('Astro dependency not found. Current directory is not an Astro project.');
	}
};
