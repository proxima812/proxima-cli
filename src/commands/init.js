import { installDependencies } from "../utils/install.js";
import { ensureAstroProject } from "../utils/project.js";
import { ensureCnUtility, writeTsConfig } from "../utils/scaffold.js";
import { printBanner, printStep, printSuccess } from "../utils/ui.js";

const SHARED_DEPENDENCIES = ["clsx", "tailwind-merge"];

export const runInit = async ({ cwd, args = [] }) => {
	const skipInstall = args.includes("--skip-install");

	await printBanner("Proxima UI Init", "Preparing the project for registry components");
	printStep("Checking project", cwd);
	ensureAstroProject(cwd);

	const created = ensureCnUtility(cwd);
	if (created) {
		printStep("Created", "src/utils/lib/cn.ts");
	} else {
		printStep("Skipped", "src/utils/lib/cn.ts already exists");
	}

	writeTsConfig(cwd);
	printStep("Updated", "tsconfig.json");

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
		"Shared utility: src/utils/lib/cn.ts",
		"TypeScript config reset to Proxima defaults",
	]);
};
