import type { RegistryComponent, RegistryFile } from "../types.js";
export declare const listRegistryComponents: () => string[];
export declare const resolveRegistryComponent: (name: string) => RegistryComponent;
export declare const copyRegistryFiles: (cwd: string, files: RegistryFile[], { overwrite }?: {
    overwrite?: boolean;
}) => {
    created: string[];
    skipped: string[];
};
