import { animate, stagger } from "motion";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

type ProcessingTextProps = {
	text?: string;
	className?: string;
};

export default function ProcessingText({
	text = "PROCESSING",
	className = "",
}: ProcessingTextProps) {
	const textRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		const element = textRef.current;

		if (!element) {
			return;
		}

		const split = new SplitType(element, {
			types: "chars",
			tagName: "span",
		});

		const chars = split.chars ?? [];

		if (!chars.length) {
			split.revert();
			return;
		}

		for (const char of chars) {
			char.style.display = "inline-block";
			char.style.willChange = "transform, opacity, filter";
			char.style.transformOrigin = "50% 60%";
		}

		const controls = animate(
			chars,
			{
				opacity: [1, 0.18, 1],
				scale: [1, 0.78, 1],
				filter: ["blur(0px)", "blur(9px)", "blur(0px)"],
				x: [0, 10, 0],
			},
			{
				duration: 1.15,
				delay: stagger(0.07),
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 0.18,
			},
		);

		return () => {
			controls.cancel();
			split.revert();
		};
	}, [text]);

	return (
		<div className={`px-5 py-24 ${className}`}>
			<h2
				ref={textRef}
				className="text-center text-5xl font-black uppercase  text-neutral-950"
				style={{

					lineHeight: 0.9,
				}}
			>
				{text}
			</h2>
		</div>
	);
}
