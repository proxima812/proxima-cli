import { installDependencies } from "../utils/install.js";
import { readComponentsConfig } from "../utils/config.js";
import { ensureAstroProject } from "../utils/project.js";
import { copyRegistryFiles, resolveRegistryComponent } from "../utils/registry.js";
import { hasCnUtility } from "../utils/scaffold.js";
import { printBanner, printInfo, printStep, printSuccess } from "../utils/ui.js";

import type { CommandContext } from "../types.js";

const SHARED_DEPENDENCIES = ["clsx", "tailwind-merge"];

type AddOptions = {
	name?: string;
	overwrite: boolean;
	skipInstall: boolean;
	dryRun: boolean;
};

const parseOptions = (args: string[]): AddOptions => {
	const flags = new Set(args.filter((arg) => arg.startsWith("--")));
	const name = args.find((arg) => !arg.startsWith("--"));

	return {
		name,
		overwrite: flags.has("--overwrite"),
		skipInstall: flags.has("--skip-install"),
		dryRun: flags.has("--dry-run"),
	};
};

export const runAdd = async ({ cwd, args = [] }: CommandContext): Promise<void> => {
	const { name, overwrite, skipInstall, dryRun } = parseOptions(args);

	if (!name) {
		throw new Error('Component name is required. Usage: "ui_proxima add <name>"');
	}

	await printBanner(`add ${name} — copying registry files`);
	printStep("Checking project", cwd);
	ensureAstroProject(cwd);
	const config = readComponentsConfig(cwd);

	if (!hasCnUtility(cwd, config.utilsPath)) {
		throw new Error(`Missing ${config.utilsPath}/utils.ts. Run "ui_proxima init" first.`);
	}

	const componentSet = resolveRegistryComponent(name);

	printInfo(`Resolved component "${name}"`);

	if (dryRun) {
		for (const file of componentSet.files) {
			printStep("Would copy", file.targetPath);
		}

		const dependencies = [...componentSet.dependencies, ...componentSet.devDependencies];
		if (dependencies.length > 0) {
			printStep("Would install", dependencies.join(", "));
		}
		return;
	}

	const copiedFiles = copyRegistryFiles(cwd, componentSet.files, { overwrite });

	for (const file of copiedFiles.created) {
		printStep("Created", file);
	}

	for (const file of copiedFiles.skipped) {
		printStep("Skipped", `${file} already exists`);
	}

	if (skipInstall) {
		printStep("Skipped", "dependency installation");
		return;
	}

	const result = await installDependencies(cwd, [...SHARED_DEPENDENCIES, ...componentSet.dependencies], {
		label: `Installing dependencies for ${name}`,
	});

	const devResult =
		componentSet.devDependencies.length > 0
			? await installDependencies(cwd, componentSet.devDependencies, {
					label: `Installing dev dependencies for ${name}`,
					dev: true,
				})
			: { installed: [], skipped: [] };

	if (result.installed.length === 0 && devResult.installed.length === 0) {
		printStep("Skipped", "all required dependencies already installed");
		return;
	}

	printSuccess(`Component "${name}" installed`, [
		"Registry files copied successfully",
		"Dependencies are ready",
	]);
};
