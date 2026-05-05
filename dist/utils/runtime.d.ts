type RuntimeProcess = {
    argv: string[];
    cwd: () => string;
    exit: (code?: number) => never;
    stdout: {
        isTTY?: boolean;
        write: (chunk: string) => void;
    };
};
export declare const nodeProcess: NodeJS.Process & RuntimeProcess;
export {};
