import { installDependencies } from "../utils/install.js";
import { createComponentsConfig, DEFAULT_COMPONENTS_CONFIG } from "../utils/config.js";
import { ensureAstroProject } from "../utils/project.js";
import { ensureCnUtility } from "../utils/scaffold.js";
import { printBanner, printStep, printSuccess } from "../utils/ui.js";

import type { CommandContext } from "../types.js";

const SHARED_DEPENDENCIES = ["clsx", "tailwind-merge"];

export const runInit = async ({ cwd, args = [] }: CommandContext): Promise<void> => {
	const skipInstall = args.includes("--skip-install");

	await printBanner("init — preparing the project for registry components");
	printStep("Checking project", cwd);
	ensureAstroProject(cwd);

	const configCreated = createComponentsConfig(cwd);
	if (configCreated) {
		printStep("Created", "components.json");
	} else {
		printStep("Skipped", "components.json already exists");
	}

	const created = ensureCnUtility(cwd, DEFAULT_COMPONENTS_CONFIG.utilsPath);
	if (created) {
		printStep("Created", `${DEFAULT_COMPONENTS_CONFIG.utilsPath}/utils.ts`);
	} else {
		printStep("Skipped", `${DEFAULT_COMPONENTS_CONFIG.utilsPath}/utils.ts already exists`);
	}

	if (skipInstall) {
		printStep("Skipped", "dependency installation");
		return;
	}

	const result = await installDependencies(cwd, SHARED_DEPENDENCIES, {
		label: "Installing shared dependencies",
	});

	if (result.installed.length === 0) {
		printStep("Skipped", "shared dependencies already installed");
	}

	printSuccess("Initialization complete", [
		"Project is ready for ui_proxima add <name>",
		"Config: components.json",
		`Shared utility: ${DEFAULT_COMPONENTS_CONFIG.utilsPath}/utils.ts`,
	]);
};
