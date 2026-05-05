import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

import type { DependencyInstallOptions, DependencyInstallResult, PackageManager } from "../types.js";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const hasFile = (cwd: string, fileName: string): boolean => fs.existsSync(path.join(cwd, fileName));

const packageManagerArgs = (command: string, dev: boolean): string[] => {
	if (command === "npm") {
		return dev ? ["install", "--save-dev"] : ["install"];
	}

	return dev ? ["add", "-D"] : ["add"];
};

const detectPackageManager = (cwd: string, dev: boolean): PackageManager => {
	if (hasFile(cwd, "bun.lock") || hasFile(cwd, "bun.lockb")) {
		return {
			command: "bun",
			args: packageManagerArgs("bun", dev),
		};
	}

	if (hasFile(cwd, "pnpm-lock.yaml")) {
		return {
			command: "pnpm",
			args: packageManagerArgs("pnpm", dev),
		};
	}

	if (hasFile(cwd, "package-lock.json")) {
		return {
			command: "npm",
			args: packageManagerArgs("npm", dev),
		};
	}

	return {
		command: "npm",
		args: packageManagerArgs("npm", dev),
	};
};

const readProjectDependencies = (cwd: string): Record<string, string> => {
	const packageJsonPath = path.join(cwd, "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
		dependencies?: Record<string, string>;
		devDependencies?: Record<string, string>;
	};

	return {
		...(packageJson.dependencies ?? {}),
		...(packageJson.devDependencies ?? {}),
	};
};

const createSpinner = (label: string) => {
	if (!process.stdout.isTTY) {
		console.log(label);
		return {
			succeed(message: string) {
				console.log(message);
			},
			fail(message: string) {
				console.error(message);
			},
		};
	}

	const cyan = "\x1b[36m";
	const gray = "\x1b[90m";
	const green = "\x1b[1;32m";
	const red = "\x1b[1;31m";
	const reset = "\x1b[0m";

	let frameIndex = 0;
	process.stdout.write(`  ${cyan}${SPINNER_FRAMES[frameIndex]}${reset} ${gray}${label}${reset}`);

	const timer = setInterval(() => {
		frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
		process.stdout.write(`\r  ${cyan}${SPINNER_FRAMES[frameIndex]}${reset} ${gray}${label}${reset}`);
	}, 80);

	return {
		succeed(message: string) {
			clearInterval(timer);
			process.stdout.write(`\r  ${green}✓${reset} ${message}\n`);
		},
		fail(message: string) {
			clearInterval(timer);
			process.stdout.write(`\r  ${red}✗${reset} ${red}${message}${reset}\n`);
		},
	};
};

export const getMissingDependencies = (cwd: string, dependencies: string[]): string[] => {
	const existingDependencies = readProjectDependencies(cwd);
	return dependencies.filter((dependency) => !existingDependencies[dependency]);
};

export const installDependencies = async (
	cwd: string,
	dependencies: string[],
	options: DependencyInstallOptions = {},
): Promise<DependencyInstallResult> => {
	const missingDependencies = getMissingDependencies(cwd, dependencies);

	if (missingDependencies.length === 0) {
		return {
			installed: [],
			skipped: dependencies,
		};
	}

	const packageManager = detectPackageManager(cwd, options.dev ?? false);
	const spinner = createSpinner(options.label ?? `Installing ${missingDependencies.join(", ")}`);

	await new Promise<void>((resolve, reject) => {
		const child = spawn(packageManager.command, [...packageManager.args, ...missingDependencies], {
			cwd,
			stdio: ["ignore", "pipe", "pipe"],
		});

		let stdout = "";
		let stderr = "";

		child.stdout.on("data", (chunk: Buffer | string) => {
			stdout += String(chunk);
		});

		child.stderr.on("data", (chunk: Buffer | string) => {
			stderr += String(chunk);
		});

		child.on("error", (error: Error) => {
			spinner.fail(`Failed to run ${packageManager.command}`);
			reject(error);
		});

		child.on("close", (code: number | null) => {
			if (code === 0) {
				spinner.succeed(`Installed ${missingDependencies.join(", ")}`);
				resolve();
				return;
			}

			spinner.fail(`Failed to install ${missingDependencies.join(", ")}`);
			if (stdout.trim()) {
				console.log(stdout.trim());
			}
			if (stderr.trim()) {
				console.error(stderr.trim());
			}
			reject(new Error(`Dependency installation failed with exit code ${code}`));
		});
	});

	return {
		installed: missingDependencies,
		skipped: dependencies.filter((dependency) => !missingDependencies.includes(dependency)),
	};
};
