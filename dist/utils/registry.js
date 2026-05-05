// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as fs from "node:fs";
// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as path from "node:path";
// @ts-ignore Node built-in types may be unavailable in publish-only environments.
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
export const listRegistryComponents = () => {
    return fs
        .readdirSync(REGISTRY_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => fs.existsSync(path.join(REGISTRY_DIR, name, "manifest.json")))
        .sort();
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
        for (const dependencyName of manifest.registryDependencies ?? []) {
            visit(dependencyName);
        }
        for (const dependency of manifest.dependencies ?? []) {
            dependencies.add(dependency);
        }
        const devDependencies = manifest.devDependencies ?? [];
        for (const file of manifest.files ?? []) {
            const source = file.source ?? file.path;
            if (!source) {
                throw new Error(`Component "${componentName}" has a registry file without source/path`);
            }
            const sourcePath = path.join(REGISTRY_DIR, componentName, "files", source);
            files.set(file.target, {
                sourcePath,
                targetPath: file.target,
            });
        }
        for (const dependency of devDependencies) {
            dependencies.add(`dev:${dependency}`);
        }
    };
    visit(name);
    return {
        name,
        dependencies: [...dependencies].filter((dependency) => !dependency.startsWith("dev:")),
        devDependencies: [...dependencies]
            .filter((dependency) => dependency.startsWith("dev:"))
            .map((dependency) => dependency.slice(4)),
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
