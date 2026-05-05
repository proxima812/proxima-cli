#!/usr/bin/env node

import { runCli } from "../cli.js";
import { nodeProcess } from "../utils/runtime.js";

runCli(nodeProcess.argv).catch((error: unknown) => {
	const message = error instanceof Error ? error.message : "Unknown error";
	console.error(`[ui_proxima] ${message}`);
	nodeProcess.exit(1);
});
