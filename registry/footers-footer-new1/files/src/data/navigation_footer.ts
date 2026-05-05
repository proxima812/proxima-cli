import { navigation } from "@/data/navigation";
import { getCollection } from "astro:content";

const posts = await getCollection("posts");

export const navigation_footer = [
	{
		category: "Ссылки из navigation",
		colunm1: navigation,
	},

	{
		category: "Категория из коллекции",
		colunm1: posts.map((post) => ({
			label: post.data.title,
			href: `/posts/${post.id}/`,
			// target: "_blank",
			icon: "mdi:progress-pencil",
			style: "",
		})),
	},

	{
		category: "Категория 2",
		colunm2: [
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
		],
	},
];
