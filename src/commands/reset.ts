import { ensureAstroProject } from "../utils/project.js";
import { removeInitArtifacts } from "../utils/scaffold.js";
import { printBanner, printStep, printSuccess } from "../utils/ui.js";

import type { ResetContext } from "../types.js";

export const runReset = async ({ cwd }: ResetContext): Promise<void> => {
	await printBanner("reset — removing files created by init");
	printStep("Checking project", cwd);
	ensureAstroProject(cwd);

	const removedFiles = removeInitArtifacts(cwd);

	if (removedFiles.length === 0) {
		printStep("Skipped", "no init files found");
		return;
	}

	for (const file of removedFiles) {
		printStep("Removed", file);
	}

	printSuccess("Reset complete", [
		"Removed files created by ui_proxima init",
	]);
};
