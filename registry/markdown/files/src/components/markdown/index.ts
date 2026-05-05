import A from "./A.astro";
import Blockquote from "./Blockquote.astro";
import Code from "./Code.astro";
import Pre from "./Pre.astro";

export { A, Blockquote, Code, Pre };

export const markdownComponents = {
	a: A,
	blockquote: Blockquote,
	code: Code,
	pre: Pre,
};
