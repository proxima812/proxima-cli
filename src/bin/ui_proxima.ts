#!/usr/bin/env node

import { runCli } from "../cli.js";

runCli(process.argv).catch((error: unknown) => {
	const message = error instanceof Error ? error.message : "Unknown error";
	console.error(`[ui_proxima] ${message}`);
	process.exit(1);
});
