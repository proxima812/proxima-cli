export type SweepFrom = "left" | "right" | "top" | "bottom";

export type ChromaPreset =
	| "prism"
	| "sunset"
	| "aurora"
	| "ocean"
	| "ember"
	| "ultraviolet"
	| "rose-gold"
	| "lime-flash"
	| "chrome"
	| "candy";

export const chromaPresets: Record<ChromaPreset, string> = {
	prism: "linear-gradient(90deg, #111827 0, #111827 33.33%, #c679c4 40%, #fa3d1d 45%, #ffb005 50%, #e1e1fe 55%, #0358f7 60%, transparent 66.67%, transparent 100%)",
	sunset: "linear-gradient(90deg, #22130c 0, #22130c 34%, #ff7a59 40%, #ff9f43 48%, #ffd166 56%, #fff1bf 62%, transparent 68%, transparent 100%)",
	aurora: "linear-gradient(90deg, #0b132b 0, #0b132b 34%, #80ffdb 40%, #56cfe1 48%, #72efdd 55%, #6930c3 61%, transparent 68%, transparent 100%)",
	ocean: "linear-gradient(90deg, #0f172a 0, #0f172a 34%, #38bdf8 40%, #22d3ee 47%, #14b8a6 54%, #99f6e4 61%, transparent 68%, transparent 100%)",
	ember: "linear-gradient(90deg, #1c1917 0, #1c1917 34%, #ef4444 40%, #f97316 47%, #fb7185 54%, #fde68a 61%, transparent 68%, transparent 100%)",
	ultraviolet: "linear-gradient(90deg, #18181b 0, #18181b 34%, #8b5cf6 40%, #d946ef 48%, #60a5fa 56%, #e9d5ff 62%, transparent 68%, transparent 100%)",
	"rose-gold": "linear-gradient(90deg, #2a211d 0, #2a211d 34%, #fda4af 40%, #fb7185 47%, #f59e0b 54%, #fde68a 61%, transparent 68%, transparent 100%)",
	"lime-flash": "linear-gradient(90deg, #111827 0, #111827 34%, #84cc16 40%, #a3e635 47%, #4ade80 54%, #dcfce7 61%, transparent 68%, transparent 100%)",
	chrome: "linear-gradient(90deg, #09090b 0, #09090b 34%, #fafafa 40%, #d4d4d8 47%, #71717a 54%, #ffffff 61%, transparent 68%, transparent 100%)",
	candy: "linear-gradient(90deg, #2e1065 0, #2e1065 34%, #f472b6 40%, #fb7185 47%, #f9a8d4 54%, #67e8f9 61%, transparent 68%, transparent 100%)",
};

export const chromaPositions: Record<SweepFrom, { size: string; from: string; to: string }> = {
	left: {
		size: "300% 100%",
		from: "100% 0",
		to: "0 0",
	},
	right: {
		size: "300% 100%",
		from: "0 0",
		to: "100% 0",
	},
	top: {
		size: "100% 300%",
		from: "0 100%",
		to: "0 0",
	},
	bottom: {
		size: "100% 300%",
		from: "0 0",
		to: "0 100%",
	},
};
