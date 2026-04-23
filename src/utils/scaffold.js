import fs from "node:fs";
import path from "node:path";
import { CN_TEMPLATE } from "../templates/cn.js";
import { TSCONFIG_TEMPLATE } from "../templates/tsconfig.js";

export const hasCnUtility = (cwd) => {
	const cnPath = path.join(cwd, "src", "utils", "lib", "cn.ts");
	return fs.existsSync(cnPath);
};

export const ensureCnUtility = (cwd) => {
	const cnPath = path.join(cwd, "src", "utils", "lib", "cn.ts");
	fs.mkdirSync(path.dirname(cnPath), { recursive: true });

	if (fs.existsSync(cnPath)) {
		return false;
	}

	fs.writeFileSync(cnPath, CN_TEMPLATE);
	return true;
};

export const writeTsConfig = (cwd) => {
	const tsconfigPath = path.join(cwd, "tsconfig.json");
	fs.writeFileSync(tsconfigPath, TSCONFIG_TEMPLATE);
	return tsconfigPath;
};
