import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";

const HELP_TEXT = `Usage:
  ui_proxima init
  ui_proxima add <name>

Commands:
  init    Initialize Proxima UI in the current Astro project
  add     Add a registry component to the current Astro project`;

export const runCli = async (argv) => {
	const [, , command, ...args] = argv;

	if (!command || command === "--help" || command === "-h") {
		console.log(HELP_TEXT);
		return;
	}

	if (command === "init") {
		await runInit({
			cwd: process.cwd(),
			args,
		});
		return;
	}

	if (command === "add") {
		await runAdd({
			cwd: process.cwd(),
			args,
		});
		return;
	}

	throw new Error(`Unknown command "${command}"`);
};
