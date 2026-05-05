import * as fs from "node:fs";
import * as path from "node:path";

import type { ComponentsConfig } from "../types.js";

export const CONFIG_FILE_NAME = "components.json";

export const DEFAULT_COMPONENTS_CONFIG: ComponentsConfig = {
	componentsPath: "src/components/ui",
	utilsPath: "src/lib",
	aliases: {
		components: "@/components",
		utils: "@/lib/utils",
	},
};

const configPath = (cwd: string): string => path.join(cwd, CONFIG_FILE_NAME);

export const hasComponentsConfig = (cwd: string): boolean => fs.existsSync(configPath(cwd));

export const createComponentsConfig = (cwd: string): boolean => {
	const targetPath = configPath(cwd);

	if (fs.existsSync(targetPath)) {
		return false;
	}

	fs.writeFileSync(targetPath, `${JSON.stringify(DEFAULT_COMPONENTS_CONFIG, null, 2)}\n`);
	return true;
};

export const readComponentsConfig = (cwd: string): ComponentsConfig => {
	const targetPath = configPath(cwd);

	if (!fs.existsSync(targetPath)) {
		throw new Error('Missing components.json. Run "ui_proxima init" first.');
	}

	return JSON.parse(fs.readFileSync(targetPath, "utf8")) as ComponentsConfig;
};
