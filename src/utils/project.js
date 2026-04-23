import fs from "node:fs";
import path from "node:path";

export const ensureAstroProject = (cwd) => {
	const packageJsonPath = path.join(cwd, "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		throw new Error("package.json not found. Run this command inside an Astro project.");
	}

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
	const dependencies = {
		...(packageJson.dependencies ?? {}),
		...(packageJson.devDependencies ?? {}),
	};

	if (!dependencies.astro) {
		throw new Error('Astro dependency not found. Current directory is not an Astro project.');
	}
};
