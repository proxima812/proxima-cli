export type CommandContext = {
    cwd: string;
    args?: string[];
};
export type ResetContext = {
    cwd: string;
};
export type DependencyInstallOptions = {
    label?: string;
    dev?: boolean;
};
export type DependencyInstallResult = {
    installed: string[];
    skipped: string[];
};
export type PackageManager = {
    command: string;
    args: string[];
};
export type RegistryManifestFile = {
    source: string;
    path?: string;
    target: string;
};
export type RegistryManifest = {
    name: string;
    type?: "component";
    dependencies?: string[];
    devDependencies?: string[];
    registryDependencies?: string[];
    files?: RegistryManifestFile[];
};
export type RegistryFile = {
    sourcePath: string;
    targetPath: string;
};
export type RegistryComponent = {
    name: string;
    dependencies: string[];
    devDependencies: string[];
    files: RegistryFile[];
};
export type ComponentsConfig = {
    componentsPath: string;
    utilsPath: string;
    aliases: {
        components: string;
        utils: string;
    };
};
