export const ICON_BASE_CLASS =
	"inline-flex shrink-0 items-center justify-center text-current [&_svg]:block [&_svg]:h-full [&_svg]:w-full";

export const ICON_SIZE_CLASS = {
	xs: "size-3",
	sm: "size-4",
	md: "size-5",
	lg: "size-6",
	xl: "size-8",
} as const;

export type IconSize = keyof typeof ICON_SIZE_CLASS;

export type IconSource =
	| {
			type: "svg";
			value: string;
	  }
	| {
			type: "iconify";
			value: string;
	  };

export interface IconEntity<Name extends string = string> {
	name: Name;
	label: string;
	source: IconSource;
}
