import { runAdd } from "./commands/add.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runReset } from "./commands/reset.js";

const HELP_TEXT = `Usage:
  ui_proxima init
  ui_proxima add <name>
  ui_proxima list
  ui_proxima reset

Commands:
  init    Initialize Proxima UI in the current Astro project
  add     Add a registry component to the current Astro project
  list    Show available registry components
  reset   Remove files created by ui_proxima init`;

export const runCli = async (argv: string[]): Promise<void> => {
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

	if (command === "list") {
		await runList({
			cwd: process.cwd(),
			args,
		});
		return;
	}

	if (command === "reset") {
		await runReset({
			cwd: process.cwd(),
		});
		return;
	}

	throw new Error(`Unknown command "${command}"`);
};
