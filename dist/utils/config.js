import * as fs from "node:fs";
import * as path from "node:path";
export const CONFIG_FILE_NAME = "components.json";
export const DEFAULT_COMPONENTS_CONFIG = {
    componentsPath: "src/components/ui",
    utilsPath: "src/lib",
    aliases: {
        components: "@/components",
        utils: "@/lib/utils",
    },
};
const configPath = (cwd) => path.join(cwd, CONFIG_FILE_NAME);
export const hasComponentsConfig = (cwd) => fs.existsSync(configPath(cwd));
export const createComponentsConfig = (cwd) => {
    const targetPath = configPath(cwd);
    if (fs.existsSync(targetPath)) {
        return false;
    }
    fs.writeFileSync(targetPath, `${JSON.stringify(DEFAULT_COMPONENTS_CONFIG, null, 2)}\n`);
    return true;
};
export const readComponentsConfig = (cwd) => {
    const targetPath = configPath(cwd);
    if (!fs.existsSync(targetPath)) {
        throw new Error('Missing components.json. Run "ui_proxima init" first.');
    }
    return JSON.parse(fs.readFileSync(targetPath, "utf8"));
};
