export declare const sleep: (ms: number) => Promise<void>;
export declare const isInteractiveTerminal: () => boolean;
export declare const printBanner: (subtitle?: string) => Promise<void>;
export declare const printStep: (label: string, detail?: string) => void;
export declare const printSuccess: (title: string, lines?: string[]) => void;
export declare const printInfo: (message: string) => void;
export declare const printError: (message: string) => void;
