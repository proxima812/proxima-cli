import { installDependencies } from "../utils/install.js";
import { ensureAstroProject } from "../utils/project.js";
import { copyRegistryFiles, resolveRegistryComponent } from "../utils/registry.js";
import { hasCnUtility } from "../utils/scaffold.js";
import { printBanner, printInfo, printStep, printSuccess } from "../utils/ui.js";

const SHARED_DEPENDENCIES = ["clsx", "tailwind-merge"];

const parseOptions = (args) => {
	const flags = new Set(args.filter((arg) => arg.startsWith("--")));
	const name = args.find((arg) => !arg.startsWith("--"));

	return {
		name,
		overwrite: flags.has("--overwrite"),
		skipInstall: flags.has("--skip-install"),
	};
};

export const runAdd = async ({ cwd, args = [] }) => {
	const { name, overwrite, skipInstall } = parseOptions(args);

	if (!name) {
		throw new Error('Component name is required. Usage: "ui_proxima add <name>"');
	}

	await printBanner(`Add ${name}`, "Copying registry files into the current Astro project");
	printStep("Checking project", cwd);
	ensureAstroProject(cwd);

	if (!hasCnUtility(cwd)) {
		throw new Error('Missing src/utils/lib/cn.ts. Run "ui_proxima init" first.');
	}

	const componentSet = resolveRegistryComponent(name);
	const copiedFiles = copyRegistryFiles(cwd, componentSet.files, { overwrite });

	printInfo(`Resolved component "${name}"`);

	if (copiedFiles.created.length > 0) {
		for (const file of copiedFiles.created) {
			printStep("Created", file);
		}
	}

	if (copiedFiles.skipped.length > 0) {
		for (const file of copiedFiles.skipped) {
			printStep("Skipped", `${file} already exists`);
		}
	}

	if (skipInstall) {
		printStep("Skipped", "dependency installation");
		return;
	}

	const result = await installDependencies(cwd, [...SHARED_DEPENDENCIES, ...componentSet.dependencies], {
		label: `Installing dependencies for ${name}`,
	});

	if (result.installed.length === 0) {
		printStep("Skipped", "all required dependencies already installed");
		return;
	}

	printSuccess(`Component "${name}" installed`, [
		"Registry files copied successfully",
		"Dependencies are ready",
	]);
};
