import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SPINNER_FRAMES = ["|", "/", "-", "\\"];

const hasFile = (cwd, fileName) => fs.existsSync(path.join(cwd, fileName));

const detectPackageManager = (cwd) => {
	if (hasFile(cwd, "bun.lock") || hasFile(cwd, "bun.lockb")) {
		return {
			command: "bun",
			args: ["add"],
		};
	}

	if (hasFile(cwd, "pnpm-lock.yaml")) {
		return {
			command: "pnpm",
			args: ["add"],
		};
	}

	if (hasFile(cwd, "package-lock.json")) {
		return {
			command: "npm",
			args: ["install"],
		};
	}

	return {
		command: "npm",
		args: ["install"],
	};
};

const readProjectDependencies = (cwd) => {
	const packageJsonPath = path.join(cwd, "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

	return {
		...(packageJson.dependencies ?? {}),
		...(packageJson.devDependencies ?? {}),
	};
};

const createSpinner = (label) => {
	if (!process.stdout.isTTY) {
		console.log(label);
		return {
			succeed(message) {
				console.log(message);
			},
			fail(message) {
				console.error(message);
			},
		};
	}

	let frameIndex = 0;
	process.stdout.write(`${SPINNER_FRAMES[frameIndex]} ${label}`);

	const timer = setInterval(() => {
		frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
		process.stdout.write(`\r${SPINNER_FRAMES[frameIndex]} ${label}`);
	}, 80);

	return {
		succeed(message) {
			clearInterval(timer);
			process.stdout.write(`\r[done] ${message}\n`);
		},
		fail(message) {
			clearInterval(timer);
			process.stdout.write(`\r[fail] ${message}\n`);
		},
	};
};

export const getMissingDependencies = (cwd, dependencies) => {
	const existingDependencies = readProjectDependencies(cwd);
	return dependencies.filter((dependency) => !existingDependencies[dependency]);
};

export const installDependencies = async (cwd, dependencies, options = {}) => {
	const missingDependencies = getMissingDependencies(cwd, dependencies);

	if (missingDependencies.length === 0) {
		return {
			installed: [],
			skipped: dependencies,
		};
	}

	const packageManager = detectPackageManager(cwd);
	const spinner = createSpinner(
		options.label ?? `Installing ${missingDependencies.join(", ")}`,
	);

	await new Promise((resolve, reject) => {
		const child = spawn(packageManager.command, [...packageManager.args, ...missingDependencies], {
			cwd,
			stdio: ["ignore", "pipe", "pipe"],
		});

		let stdout = "";
		let stderr = "";

		child.stdout.on("data", (chunk) => {
			stdout += String(chunk);
		});

		child.stderr.on("data", (chunk) => {
			stderr += String(chunk);
		});

		child.on("error", (error) => {
			spinner.fail(`Failed to run ${packageManager.command}`);
			reject(error);
		});

		child.on("close", (code) => {
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
