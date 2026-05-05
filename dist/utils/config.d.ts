import type { ComponentsConfig } from "../types.js";
export declare const CONFIG_FILE_NAME = "components.json";
export declare const DEFAULT_COMPONENTS_CONFIG: ComponentsConfig;
export declare const hasComponentsConfig: (cwd: string) => boolean;
export declare const createComponentsConfig: (cwd: string) => boolean;
export declare const readComponentsConfig: (cwd: string) => ComponentsConfig;
