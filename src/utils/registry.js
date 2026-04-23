import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(CURRENT_FILE);
const REGISTRY_DIR = path.resolve(CURRENT_DIR, "../../registry");

const readManifest = (name) => {
	const manifestPath = path.join(REGISTRY_DIR, name, "manifest.json");

	if (!fs.existsSync(manifestPath)) {
		throw new Error(`Component "${name}" was not found in the registry`);
	}

	return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
};

export const resolveRegistryComponent = (name) => {
	const visited = new Set();
	const files = new Map();
	const dependencies = new Set();

	const visit = (componentName) => {
		if (visited.has(componentName)) {
			return;
		}

		visited.add(componentName);

		const manifest = readManifest(componentName);
		const registryDependencies = manifest.registryDependencies ?? [];
		for (const dependencyName of registryDependencies) {
			visit(dependencyName);
		}

		for (const dependency of manifest.dependencies ?? []) {
			dependencies.add(dependency);
		}

		for (const file of manifest.files ?? []) {
			const sourcePath = path.join(REGISTRY_DIR, componentName, "files", file.source);
			files.set(file.target, {
				sourcePath,
				targetPath: file.target,
			});
		}
	};

	visit(name);

	return {
		name,
		dependencies: [...dependencies],
		files: [...files.values()],
	};
};

export const copyRegistryFiles = (cwd, files, { overwrite = false } = {}) => {
	const created = [];
	const skipped = [];

	for (const file of files) {
		const destinationPath = path.join(cwd, file.targetPath);
		fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

		if (fs.existsSync(destinationPath) && !overwrite) {
			skipped.push(file.targetPath);
			continue;
		}

		fs.copyFileSync(file.sourcePath, destinationPath);
		created.push(file.targetPath);
	}

	return {
		created,
		skipped,
	};
};
