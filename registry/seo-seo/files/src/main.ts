export const config = {
	indexNow: {
		// Генерация рандомного ключа
		// https://www.bing.com/indexnow/getstarted
		key: "",
	},
	site: {
		url: "https://site.kz/",
		OG: {
			title: "",
			description: "",
			author: "",
			// Вообще нужно бы писать так:
			// — 🇷🇺 Россия → ru-RU
			// - Татарстан - ru-TT
			// — 🇰🇿 Казахстан → ru-KZ
			locale: "ru-KZ",
			site_name: "",
			// preview на всех страницах
			// 1200x630
			defaultImage: "og.png",
			// по факту не нужная хрень, но можно заполнить
			keywords: "",
		},
		verifications: [
			{ name_verification: "yandex-verification", content: "" }, // Подтверждение владения сайтом в Яндекс.Вебмастере
			{ name_verification: "p:domain_verify", content: "" }, // Проверка домена Pinterest
			{ name_verification: "google-site-verification", content: "" }, // Подтверждение сайта в Google Search Console
			{ name_verification: "msvalidate.01", content: "" }, // Верификация для Bing Webmaster Tools
			// ====
			// Остальное по факту, не так важно. Смотря какой проект.
			// ====
			{ name_verification: "facebook-domain-verification", content: "" }, // Верификация домена Facebook
			{ name_verification: "baidu-site-verification", content: "" }, // Подтверждение сайта в поисковике Baidu
			{ name_verification: "apple-site-verification", content: "" }, // Верификация для сервисов Apple
			{ name_verification: "norton-safeweb-site-verification", content: "" }, // Верификация сайта в Norton Safe Web
			{ name_verification: "twitter-site-verification", content: "" }, // Верификация сайта в Twitter
			{ name_verification: "linkedin-site-verification", content: "" }, // Верификация сайта в LinkedIn
			{ name_verification: "adobe-site-verification", content: "" }, // Подтверждение владения сайтом для Adobe
			{ name_verification: "mail.ru-verification", content: "" }, // Верификация для сервисов Mail.ru
			{ name_verification: "tumblr-site-verification", content: "" }, // Подтверждение домена в Tumblr
			{ name_verification: "shopify-site-verification", content: "" }, // Верификация в Shopify
			{ name_verification: "weebly-site-verification", content: "" }, // Подтверждение сайта в Weebly
			{ name_verification: "whatsapp-site-verification", content: "" }, // Верификация сайта для WhatsApp Business
			{ name_verification: "stripe-site-verification", content: "" }, // Подтверждение сайта в платёжной системе Stripe
		],
	},
};
