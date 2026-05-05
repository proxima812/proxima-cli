import { nodeProcess } from "./runtime.js";

const ANSI = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	cyan: "\x1b[36m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
	gray: "\x1b[90m",
	white: "\x1b[37m",
	brightWhite: "\x1b[97m",
} as const;

const colorize = (text: string, ...styles: string[]): string => `${styles.join("")}${text}${ANSI.reset}`;

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const isInteractiveTerminal = (): boolean => Boolean(nodeProcess.stdout.isTTY);

// PROXIMA in 5-row pixel art — each pixel = "██", each empty = "  "
// Letters: P(4px) R(4px) O(4px) X(5px) I(3px) M(5px) A(4px), 2px gaps, 2px leading indent
const BANNER_ROWS = [
	"  ██████    ██████      ████    ██      ██  ██████  ██      ██    ████  ",
	"  ██    ██  ██    ██  ██    ██    ██  ██    ████    ████  ████  ██    ██",
	"  ██████    ██████    ██    ██      ██    ████    ██  ██  ██  ████████  ",
	"  ██        ██  ██  ██    ██    ██  ██    ████    ██      ██  ██    ██  ",
	"  ██        ██    ██    ████    ██      ██  ██████  ██      ██  ██    ██",
];

// Gradient: bright white (top) → dark gray (bottom), matching the layered block style
const BANNER_COLORS: string[][] = [
	[ANSI.bold, ANSI.brightWhite],
	[ANSI.brightWhite],
	[ANSI.white],
	[ANSI.dim, ANSI.white],
	[ANSI.gray],
];

export const printBanner = async (subtitle?: string): Promise<void> => {
	if (!isInteractiveTerminal()) {
		console.log("PROXIMA");
		if (subtitle) console.log(subtitle);
		return;
	}

	for (let i = 0; i < BANNER_ROWS.length; i++) {
		console.log(colorize(BANNER_ROWS[i], ...BANNER_COLORS[i]));
		await sleep(35);
	}

	console.log("");
	if (subtitle) {
		console.log(colorize(`  ${subtitle}`, ANSI.gray));
		console.log("");
	}
};

export const printStep = (label: string, detail?: string): void => {
	if (!isInteractiveTerminal()) {
		console.log(`- ${label}${detail ? `: ${detail}` : ""}`);
		return;
	}

	const prefix = colorize("  ◆", ANSI.cyan);
	const text = detail
		? `${colorize(label, ANSI.bold)} ${colorize(detail, ANSI.gray)}`
		: colorize(label, ANSI.bold);
	console.log(`${prefix} ${text}`);
};

export const printSuccess = (title: string, lines: string[] = []): void => {
	const prefix = colorize("  ✓", ANSI.green, ANSI.bold);
	console.log(`${prefix} ${colorize(title, ANSI.green, ANSI.bold)}`);

	for (const line of lines) {
		console.log(`    ${colorize(line, ANSI.gray)}`);
	}
	console.log("");
};

export const printInfo = (message: string): void => {
	if (!isInteractiveTerminal()) {
		console.log(`- ${message}`);
		return;
	}

	const prefix = colorize("  ◇", ANSI.cyan);
	console.log(`${prefix} ${message}`);
};

export const printError = (message: string): void => {
	if (!isInteractiveTerminal()) {
		console.log(`[ui_proxima] ${message}`);
		return;
	}

	const prefix = colorize("  ✗", ANSI.red, ANSI.bold);
	console.log(`${prefix} ${colorize(message, ANSI.red)}`);
};
