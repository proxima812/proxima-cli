import type { IconEntity } from "./Icon.shared";

export type TechIconName =
	| "astro"
	| "react"
	| "solid"
	| "svelte"
	| "supabase"
	| "vercel"
	| "cloudflare"
	| "claudecode"
	| "codex"
	| "openai"
	| "tailwind"
	| "svg"
	| "figma"
	| "vite"
	| "gmail"
	| "yandex"
	| "google"
	| "markdown"
	| "mdx"
	| "javascript"
	| "typescript"
	| "json"
	| "python"
	| "appstore"
	| "googlemarket"
	| "playmarket";

export const TECH_ICON_BY_NAME: Record<TechIconName, IconEntity<TechIconName>> = {
	astro: {
		name: "astro",
		label: "Astro",
		source: { type: "iconify", value: "ri:planet-line" },
	},
	react: {
		name: "react",
		label: "React",
		source: { type: "iconify", value: "ri:reactjs-line" },
	},
	solid: {
		name: "solid",
		label: "Solid",
		source: { type: "iconify", value: "ri:triangle-fill" },
	},
	svelte: {
		name: "svelte",
		label: "Svelte",
		source: { type: "iconify", value: "ri:shapes-fill" },
	},
	supabase: {
		name: "supabase",
		label: "Supabase",
		source: { type: "iconify", value: "ri:database-2-line" },
	},
	vercel: {
		name: "vercel",
		label: "Vercel",
		source: { type: "iconify", value: "ri:triangle-fill" },
	},
	cloudflare: {
		name: "cloudflare",
		label: "Cloudflare",
		source: { type: "iconify", value: "ri:cloudy-2-fill" },
	},
	claudecode: {
		name: "claudecode",
		label: "Claude Code",
		source: { type: "iconify", value: "ri:braces-line" },
	},
	codex: {
		name: "codex",
		label: "Codex",
		source: { type: "iconify", value: "ri:terminal-box-line" },
	},
	openai: {
		name: "openai",
		label: "OpenAI",
		source: { type: "iconify", value: "ri:sparkling-2-fill" },
	},
	tailwind: {
		name: "tailwind",
		label: "Tailwind CSS",
		source: { type: "iconify", value: "ri:tailwind-css-fill" },
	},
	svg: {
		name: "svg",
		label: "SVG",
		source: { type: "iconify", value: "ri:shape-2-line" },
	},
	figma: {
		name: "figma",
		label: "Figma",
		source: { type: "iconify", value: "ri:figma-fill" },
	},
	vite: {
		name: "vite",
		label: "Vite",
		source: { type: "iconify", value: "ri:flashlight-fill" },
	},
	gmail: {
		name: "gmail",
		label: "Gmail",
		source: { type: "iconify", value: "ri:mail-fill" },
	},
	yandex: {
		name: "yandex",
		label: "Yandex",
		source: { type: "iconify", value: "ri:search-eye-line" },
	},
	google: {
		name: "google",
		label: "Google",
		source: { type: "iconify", value: "ri:google-fill" },
	},
	markdown: {
		name: "markdown",
		label: "Markdown",
		source: { type: "iconify", value: "ri:markdown-fill" },
	},
	mdx: {
		name: "mdx",
		label: "MDX",
		source: { type: "iconify", value: "ri:markdown-fill" },
	},
	javascript: {
		name: "javascript",
		label: "JavaScript",
		source: { type: "iconify", value: "ri:javascript-fill" },
	},
	typescript: {
		name: "typescript",
		label: "TypeScript",
		source: { type: "iconify", value: "ri:typescript-fill" },
	},
	json: {
		name: "json",
		label: "JSON",
		source: { type: "iconify", value: "ri:braces-fill" },
	},
	python: {
		name: "python",
		label: "Python",
		source: { type: "iconify", value: "ri:code-s-slash-line" },
	},
	appstore: {
		name: "appstore",
		label: "App Store",
		source: { type: "iconify", value: "ri:app-store-fill" },
	},
	googlemarket: {
		name: "googlemarket",
		label: "Google Play",
		source: { type: "iconify", value: "ri:google-play-fill" },
	},
	playmarket: {
		name: "playmarket",
		label: "Play Market",
		source: { type: "iconify", value: "ri:google-play-fill" },
	},
};
