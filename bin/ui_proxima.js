#!/usr/bin/env node

import { runCli } from "../src/cli.js";

runCli(process.argv).catch((error) => {
	const message = error instanceof Error ? error.message : "Unknown error";
	console.error(`[ui_proxima] ${message}`);
	process.exit(1);
});
