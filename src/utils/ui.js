const ANSI = {
	reset: "\x1b[0m",
	dim: "\x1b[2m",
	bold: "\x1b[1m",
	cyan: "\x1b[36m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	gray: "\x1b[90m",
};

const colorize = (text, ...styles) => `${styles.join("")}${text}${ANSI.reset}`;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isInteractiveTerminal = () => Boolean(process.stdout.isTTY);

export const printBanner = async (title, subtitle) => {
	if (!isInteractiveTerminal()) {
		console.log(title);
		if (subtitle) {
			console.log(subtitle);
		}
		return;
	}

	const lines = [
		colorize("  ____  ____   ___ __  _________  ___ ", ANSI.cyan, ANSI.bold),
		colorize(" / __ \\/ __ \\ / _ \\  |/  /  _/  |/  / ", ANSI.blue, ANSI.bold),
		colorize("/ /_/ / /_/ // ___/ /|_/ // // /|_/ /  ", ANSI.magenta, ANSI.bold),
		colorize("\\____/ .___//_/  /_/  /_/___/_/  /_/   ", ANSI.cyan, ANSI.bold),
		colorize("    /_/                                  ", ANSI.blue, ANSI.bold),
		"",
		colorize(`  ${title}`, ANSI.bold),
		subtitle ? colorize(`  ${subtitle}`, ANSI.gray) : "",
	].filter(Boolean);

	for (const line of lines) {
		console.log(line);
		await sleep(45);
	}

	console.log("");
};

export const printStep = (label, detail) => {
	if (!isInteractiveTerminal()) {
		console.log(`- ${label}${detail ? `: ${detail}` : ""}`);
		return;
	}

	const prefix = colorize("[step]", ANSI.blue, ANSI.bold);
	const text = detail ? `${label} ${colorize(detail, ANSI.gray)}` : label;
	console.log(`${prefix} ${text}`);
};

export const printSuccess = (title, lines = []) => {
	const prefix = colorize("[done]", ANSI.green, ANSI.bold);
	console.log(`${prefix} ${title}`);

	for (const line of lines) {
		console.log(`${colorize("       ", ANSI.green)}${line}`);
	}
};

export const printInfo = (message) => {
	const prefix = colorize("[info]", ANSI.yellow, ANSI.bold);
	console.log(`${prefix} ${message}`);
};
