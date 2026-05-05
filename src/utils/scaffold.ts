// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as fs from "node:fs";
// @ts-ignore Node built-in types may be unavailable in publish-only environments.
import * as path from "node:path";

import { CN_TEMPLATE } from "../templates/cn.js";
import { CONFIG_FILE_NAME } from "./config.js";

const defaultCnRelativePath = (): string => path.join("src", "lib", "utils.ts");

const removeIfExists = (absolutePath: string): boolean => {
	if (!fs.existsSync(absolutePath)) {
		return false;
	}

	fs.rmSync(absolutePath, { force: true });
	return true;
};

const removeEmptyParents = (startPath: string, stopPath: string): void => {
	let currentPath = path.dirname(startPath);

	while (currentPath.startsWith(stopPath) && currentPath !== stopPath) {
		if (!fs.existsSync(currentPath)) {
			currentPath = path.dirname(currentPath);
			continue;
		}

		if (fs.readdirSync(currentPath).length > 0) {
			return;
		}

		fs.rmdirSync(currentPath);
		currentPath = path.dirname(currentPath);
	}
};

export const hasCnUtility = (cwd: string, utilsPath = "src/lib"): boolean => {
	const cnPath = path.join(cwd, utilsPath, "utils.ts");
	return fs.existsSync(cnPath);
};

export const ensureCnUtility = (cwd: string, utilsPath = "src/lib"): boolean => {
	const cnPath = path.join(cwd, utilsPath, "utils.ts");
	fs.mkdirSync(path.dirname(cnPath), { recursive: true });

	if (fs.existsSync(cnPath)) {
		return false;
	}

	fs.writeFileSync(cnPath, CN_TEMPLATE);
	return true;
};

export const removeInitArtifacts = (cwd: string): string[] => {
	const removed: string[] = [];
	const componentsConfigPath = path.join(cwd, CONFIG_FILE_NAME);
	const cnPath = path.join(cwd, defaultCnRelativePath());

	if (removeIfExists(componentsConfigPath)) {
		removed.push(CONFIG_FILE_NAME);
	}

	if (removeIfExists(cnPath)) {
		removed.push(defaultCnRelativePath());
		removeEmptyParents(cnPath, cwd);
	}

	return removed;
};
