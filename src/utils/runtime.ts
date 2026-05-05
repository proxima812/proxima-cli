type RuntimeProcess = {
	argv: string[];
	cwd: () => string;
	exit: (code?: number) => never;
	stdout: {
		isTTY?: boolean;
		write: (chunk: string) => void;
	};
};

export const nodeProcess = (globalThis as typeof globalThis & { process: RuntimeProcess }).process;
