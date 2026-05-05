import type { DependencyInstallOptions, DependencyInstallResult } from "../types.js";
export declare const getMissingDependencies: (cwd: string, dependencies: string[]) => string[];
export declare const installDependencies: (cwd: string, dependencies: string[], options?: DependencyInstallOptions) => Promise<DependencyInstallResult>;
